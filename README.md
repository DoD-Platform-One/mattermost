# Mattermost

Mattermost is an open source, private cloud, Slack-alternative from https://mattermost.com. It is used for enterprise collaboration/chat within P1 and for Big Bang.

This repo provides an implementation of Mattermost for Big Bang. Installation requires that the [Mattermost Operator](https://repo1.dso.mil/platform-one/big-bang/apps/collaboration-tools/mattermost-operator) be installed in your cluster as a prerequisite. 

Several of the important values to take note of when installing include:
- `istio.enabled`: This will enable istio networking for Mattermost within your cluster.
- `replicaCount`: The desired number of replicas for your instance. Defaults to 1 with the `chart/values.yaml` - more than 1 requires enterprise license.
- `enterprise.enabled`: Enable enterprise features (if you don't also specify a license this only affects monitoring).
- `enterprise.license`: Value to add your license (entire license file contents - format shown in values). You can also manually add your license via the system console in Mattermost.
- `minio.install`: Install a minio instance standalone for Mattermost development, for production you should specify a `fileStore` url, secret, and bucket.
- `postgresql.install`: Install a postgres instance standalone for Mattermost development, for production you should specify a `database` secret
- `sso.enabled`: Enable SSO integration w/ Keycloak, requires additional config/values to point to your Keycloak.
- `monitoring.enabled`: Enable Prometheus monitoring integration with Mattermost, this will only work if you toggle `enterprise.enabled` to true as well.
- `networkPolicies.enabled`: Enable networkPolicies to lock down traffic to/from Mattermost.
