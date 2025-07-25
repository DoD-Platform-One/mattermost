<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# mattermost

![Version: 10.10.1-bb.1](https://img.shields.io/badge/Version-10.10.1--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 10.10.1](https://img.shields.io/badge/AppVersion-10.10.1-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

Deployment of mattermost

## Upstream Release Notes

This package has no upstream release note links on file. Please add some to [chart/Chart.yaml](chart/Chart.yaml) under `annotations.bigbang.dev/upstreamReleaseNotesMarkdown`.
Example:
```yaml
annotations:
  bigbang.dev/upstreamReleaseNotesMarkdown: |
    - [Find our upstream chart's CHANGELOG here](https://link-goes-here/CHANGELOG.md)
    - [and our upstream application release notes here](https://another-link-here/RELEASE_NOTES.md)
```

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Kubernetes: `>=1.12.0-0`

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install mattermost chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| domain | string | `"bigbang.dev"` |  |
| istio.enabled | bool | `false` | Toggle istio integration |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.clusterAuditor.enabled | bool | `false` |  |
| istio.hardened.clusterAuditor.namespace | string | `"cluster-auditor"` |  |
| istio.hardened.minioOperator.enabled | bool | `true` |  |
| istio.hardened.minioOperator.namespaces[0] | string | `"minio-operator"` |  |
| istio.hardened.minioOperator.principals[0] | string | `"cluster.local/ns/minio-operator/sa/minio-operator"` |  |
| istio.hardened.monitoring.enabled | bool | `true` |  |
| istio.hardened.monitoring.namespaces[0] | string | `"monitoring"` |  |
| istio.hardened.monitoring.principals[0] | string | `"cluster.local/ns/monitoring/sa/monitoring-grafana"` |  |
| istio.hardened.monitoring.principals[1] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-alertmanager"` |  |
| istio.hardened.monitoring.principals[2] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-operator"` |  |
| istio.hardened.monitoring.principals[3] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus"` |  |
| istio.hardened.monitoring.principals[4] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-state-metrics"` |  |
| istio.hardened.monitoring.principals[5] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-prometheus-node-exporter"` |  |
| istio.hardened.kyvernoReporter.enabled | bool | `false` |  |
| istio.hardened.kyvernoReporter.namespace | string | `"kyverno-reporter"` |  |
| istio.mtls | object | `{"mode":"STRICT"}` | Default peer authentication |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| istio.chat.enabled | bool | `true` |  |
| istio.chat.annotations | object | `{}` |  |
| istio.chat.labels | object | `{}` |  |
| istio.chat.gateways[0] | string | `"istio-system/main"` |  |
| istio.chat.hosts[0] | string | `"chat.{{ .Values.domain }}"` |  |
| istio.injection | string | `"disabled"` |  |
| ingress | object | `{"annotations":{},"enabled":false,"host":"","tlsSecret":""}` | Specification to configure an Ingress with Mattermost |
| monitoring.enabled | bool | `false` |  |
| monitoring.namespace | string | `"monitoring"` |  |
| monitoring.serviceMonitor.scheme | string | `"http"` |  |
| monitoring.serviceMonitor.tlsConfig | object | `{}` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.controlPlaneCidr | string | `"0.0.0.0/0"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| sso.enabled | bool | `false` |  |
| sso.client_id | string | `"platform1_a8604cc9-f5e9-4656-802d-d05624370245_bb8-mattermost"` |  |
| sso.client_secret | string | `"nothing"` |  |
| sso.auth_endpoint | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth"` |  |
| sso.token_endpoint | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/token"` |  |
| sso.user_api_endpoint | string | `"https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/userinfo"` |  |
| sso.enable_sign_up_with_email | bool | `false` |  |
| sso.enable_sign_in_with_email | bool | `false` |  |
| sso.enable_sign_in_with_username | bool | `false` |  |
| image.name | string | `"registry1.dso.mil/ironbank/opensource/mattermost/mattermost"` |  |
| image.tag | string | `"10.10.1"` |  |
| image.imagePullPolicy | string | `"IfNotPresent"` |  |
| global.imagePullSecrets[0].name | string | `"private-registry"` |  |
| replicaCount | int | `1` |  |
| users | string | `nil` |  |
| enterprise.enabled | bool | `false` |  |
| enterprise.license | string | `""` |  |
| nameOverride | string | `""` |  |
| updateJob.disabled | bool | `true` | Must be disabled when Istio injected |
| updateJob.labels | object | `{}` |  |
| updateJob.annotations | object | `{}` |  |
| resources.limits.cpu | int | `2` |  |
| resources.limits.memory | string | `"4Gi"` |  |
| resources.requests.cpu | int | `2` |  |
| resources.requests.memory | string | `"4Gi"` |  |
| affinity | object | `{}` |  |
| nodeSelector | object | `{}` |  |
| tolerations | object | `{}` |  |
| mattermostEnvs | object | `{}` |  |
| existingSecretEnvs | object | `{}` |  |
| volumes | object | `{}` |  |
| volumeMounts | object | `{}` |  |
| podLabels | object | `{}` | Pod labels for Mattermost server pods |
| podAnnotations | object | `{}` | Pod annotations for Mattermost server pods |
| securityContext | object | `{"runAsGroup":2000,"runAsNonRoot":true,"runAsUser":2000}` | securityContext for Mattermost server pods |
| containerSecurityContext | object | `{"capabilities":{"drop":["ALL"]},"runAsGroup":2000,"runAsNonRoot":true,"runAsUser":2000}` | containerSecurityContext for Mattermost server containers |
| minio.install | bool | `false` |  |
| minio.bucketCreationImage | string | `"registry1.dso.mil/ironbank/opensource/minio/mc:RELEASE.2025-01-17T23-25-50Z"` |  |
| minio.service.nameOverride | string | `"minio.mattermost.svc.cluster.local"` |  |
| minio.tenant.pools[0].name | string | `"pool-0"` |  |
| minio.tenant.pools[0].labels.app | string | `"minio"` |  |
| minio.tenant.pools[0].labels."app.kubernetes.io/name" | string | `"minio"` |  |
| minio.tenant.configSecret.name | string | `"minio-creds-secret"` |  |
| minio.tenant.configSecret.accessKey | string | `"minio"` |  |
| minio.tenant.configSecret.secretKey | string | `"minio123"` |  |
| minio.tenant.metrics.enabled | bool | `false` |  |
| minio.tenant.metrics.port | int | `9000` |  |
| minio.tenant.buckets[0].name | string | `"mattermost"` |  |
| minio.waitJob.enabled | bool | `false` |  |
| postgresql.install | bool | `false` |  |
| postgresql.image.registry | string | `"registry1.dso.mil/ironbank"` |  |
| postgresql.image.repository | string | `"opensource/postgres/postgresql"` |  |
| postgresql.image.tag | string | `"17.5"` |  |
| postgresql.image.pullSecrets[0] | string | `"private-registry"` |  |
| postgresql.auth.username | string | `"mattermost"` |  |
| postgresql.auth.password | string | `"bigbang"` |  |
| postgresql.auth.database | string | `"mattermost"` |  |
| postgresql.fullnameOverride | string | `"mattermost-postgresql"` |  |
| postgresql.securityContext.fsGroup | int | `26` |  |
| postgresql.containerSecurityContext.runAsUser | int | `26` |  |
| postgresql.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| postgresql.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| postgresql.volumePermissions.enabled | bool | `false` |  |
| postgresql.volumePermissions.securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| postgresql.postgresqlConfiguration.listen_addresses | string | `"*"` |  |
| postgresql.pgHbaConfiguration | string | `"local all all md5\nhost all all all md5"` |  |
| database.secret | string | `""` |  |
| database.readinessCheck.disableDefault | bool | `true` |  |
| database.readinessCheck.image | string | `"registry1.dso.mil/ironbank/opensource/postgres/postgresql:17.5"` |  |
| database.readinessCheck.command[0] | string | `"/bin/sh"` |  |
| database.readinessCheck.command[1] | string | `"-c"` |  |
| database.readinessCheck.command[2] | string | `"until pg_isready --dbname=\"$DB_CONNECTION_CHECK_URL\"; do echo waiting for database; sleep 5; done;"` |  |
| database.readinessCheck.env[0].name | string | `"DB_CONNECTION_CHECK_URL"` |  |
| database.readinessCheck.env[0].valueFrom.secretKeyRef.key | string | `"DB_CONNECTION_CHECK_URL"` |  |
| database.readinessCheck.env[0].valueFrom.secretKeyRef.name | string | `"{{ .Values.database.secret \| default (printf \"%s-dbcreds\" (include \"mattermost.fullname\" .)) }}"` |  |
| fileStore.secret | string | `""` |  |
| fileStore.url | string | `""` |  |
| fileStore.bucket | string | `""` |  |
| fileStore.roleARN | string | `""` |  |
| elasticsearch.enabled | bool | `false` |  |
| elasticsearch.connectionurl | string | `"https://logging-ek-es-http.logging.svc.cluster.local:9200"` |  |
| elasticsearch.username | string | `""` |  |
| elasticsearch.password | string | `""` |  |
| elasticsearch.enableindexing | bool | `true` |  |
| elasticsearch.indexprefix | string | `"mm-"` |  |
| elasticsearch.skiptlsverification | bool | `true` |  |
| elasticsearch.bulkindexingtimewindowseconds | int | `3600` |  |
| elasticsearch.sniff | bool | `false` |  |
| elasticsearch.enablesearching | bool | `true` |  |
| elasticsearch.enableautocomplete | bool | `true` |  |
| openshift | bool | `false` |  |
| resourcePatch | object | `{}` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://mattermost.mattermost.svc.cluster.local:8065"` |  |
| bbtests.cypress.envs.cypress_mm_email | string | `"test@bigbang.dev"` |  |
| bbtests.cypress.envs.cypress_mm_user | string | `"bigbang"` |  |
| bbtests.cypress.envs.cypress_mm_password | string | `"Bigbang#123"` |  |
| bbtests.cypress.envs.cypress_waittime | string | `"5000"` |  |
| bbtests.cypress.envs.cypress_tnr_username | string | `"cypress"` |  |
| bbtests.cypress.envs.cypress_tnr_password | string | `"tnr_w!G33ZyAt@C8"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"2"` |  |
| bbtests.cypress.resources.requests.memory | string | `"1500M"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"2"` |  |
| bbtests.cypress.resources.limits.memory | string | `"1500M"` |  |
| waitJob.enabled | bool | `true` |  |
| waitJob.scripts.image | string | `"registry1.dso.mil/ironbank/opensource/kubernetes/kubectl:v1.32.7"` |  |
| waitJob.permissions.apiGroups[0] | string | `"installation.mattermost.com"` |  |
| waitJob.permissions.resources[0] | string | `"mattermosts"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

