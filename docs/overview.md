# Mattermost

## Overview

This package contains an installation of Mattermost using a helm chart built by Big Bang that leverages the operator.

## Mattermost

[Mattermost](https://mattermost.com/) is an open-source, self-hostable online chat service with file sharing, search, and integrations.
This repo provides an implementation of Mattermost for Big Bang. Installation requires that the [Mattermost Operator](https://repo1.dso.mil/platform-one/big-bang/apps/collaboration-tools/mattermost-operator) be installed in your cluster as a prerequisite.

## How it works

Mattermost is a single pane for collaboration, installed and configured via a `mattermost` CustomResource and reconciled by the operator. You can visit your installation via browser or connect through one of their Desktop apps available for many operating systems.

Please review the BigBang [Architecture Document](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/master/charter/packages/mattermost/Architecture.md) for more information about it's role within BigBang.

## Granting Egress to Blocked Services

When Istio hardening is enabled through the settings `istio.enabled` and `istio.enabled.hardened`, a sidecar is injected into the `mattermost` namespace. This sidecar limits network traffic to 'REGISTRY_ONLY', effectively blocking access to external services.

> **Note:** Access to external services will be blocked.

This restriction commonly affects cloud provider services and secret stores configured in the Mattermost UI. To resolve this, you'll need to identify the hosts blocked by Istio and add a `customServiceEntry` for each one to your Big Bang `values.yaml` file.

### Discovering Blocked Hosts

To find out which hosts are being blocked, inspect the `istio-proxy` logs from the `mattermost` pod using the following commands:

```bash
export SOURCE_POD=$(kubectl -n mattermost get pod -l name=app=mattermost -o jsonpath={.items..metadata.name})
kubectl -n mattermost logs "$SOURCE_POD" -c istio-proxy | grep -i "BlackHoleCluster"
```

Here is an example of a `customServiceEntry` that can be added to your Big Bang `values.yaml`
```yaml
istio:
  enabled: true
  hardened:
    enabled: true
    customServiceEntries:
     - name: "allow-amazonaws"
       enabled: true
       spec:
         hosts:
           - "cloudfront.amazonaws.com"
           - "ec2.us-gov-east-1.amazonaws.com"
           - "ec2.us-gov-west-1.amazonaws.com"
           - "lambda.us-gov-west-1.amazonaws.com"
           - "secretsmanager.us-gov-east-1.amazonaws.com"
           - "sts.amazonaws.com"
           - "sts.us-gov-east-1.amazonaws.com"
         location: MESH_EXTERNAL
         exportTo:
         - "."
         ports:
         - name: https
           number: 443
           protocol: TLS
         resolution: DNS
```


