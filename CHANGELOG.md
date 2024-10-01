# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [10.0.0-bb.3] - 2024-09-26
### Changed
- ironbank/opensource/kubernetes/kubectl updated from v1.29.6 to v1.30.5

## [10.0.0-bb.2] - 2024-09-26
### Changed
- Add netpol for waitjob pod

## [10.0.0-bb.1] - 2024-09-24
### Changed
- add wait job

## [10.0.0-bb.0] - 2024-09-19
### Changed
- ironbank/opensource/mattermost/mattermost updated from 9.11.1 to 10.0.0

## [9.11.1-bb.1] - 2024-09-13
### Changed
- gluon updated from 0.5.3 to 0.5.4
- minio-instance updated from 6.0.2 to 6.0.3

## [9.11.1-bb.0] - 2024-08-29
### Changed
- ironbank/opensource/mattermost/mattermost updated from 9.10.1 to 9.11.1
- ironbank/opensource/postgres/postgresql updated from 15.7 to 16.2
- ironbank/opensource/postgres/postgresql12 updated from 12.19 to 12.20

## [9.10.1-bb.5] - 2024-08-13

### Removed

- Removed monitoring-authz Authorization Policy after adding to main chart

## [9.10.1-bb.4] - 2024-08-13

### Changed

- Update usage of podLabels in mattermost chart

## [9.10.1-bb.3] - 2024-08-13

### Added

- Added minio-operator-authz-policy.yaml to allow minio-operator access to monitor the tenant

## [9.10.1-bb.2] - 2024-08-12

### Changed

- Upgrade builtin postgresql 10.3.5 -> 12.12.10

This reverts commit ab114666beb025a7b4e9399501a522ca168332b8.

## [9.10.1-bb.1] - 2024-08-09

### Changed

- gluon updated from 0.5.2 to 0.5.3

## [9.10.1-bb.0] - 2024-07-30

### Changed

- gluon updated from 0.5.0 to 0.5.2
- ironbank/opensource/mattermost/mattermost updated from 9.10.0 to 9.10.1

## [9.10.0-bb.3] - 2024-07-25

### Changed

- Documentation updates to move release notes from a README item to a chart annotation

## [9.10.0-bb.2] - 2024-07-24

### Changed

- Adding the init container back

## [9.10.0-bb.1] - 2024-07-23

### Changed

- Added integration testing instructions for External Secrets Operator

## [9.10.0-bb.0] - 2024-07-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.9.1 to 9.10.0

## [9.9.1-bb.1] - 2024-07-12

### Changed

- Removing shared auth policies

## [9.9.1-bb.0] - 2024-07-09

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.9.0 to 9.9.1

## [9.9.0-bb.4] - 2024-07-08

### Changed

- Reverted postgresql 15 to prior v10/v12

## [9.9.0-bb.3] - 2024-06-28

### Changed

- Corrected postgresl pod security context settings for kyverno

## [9.9.0-bb.2] - 2024-06-26

### Changed

- update "postgresql" from "master" (c2ac165a579a8f06dede2b6fede2f4ec2bfea495) to "postgresql/12.12.10" (d278c2b6792e02c5f327e96df4f031cab7bc0819)
- Update postgresql ironbank image to 15.7
- remove postgresql(Username|Password|Database) settings in favor of auth.\* settings

## [9.9.0-bb.1] - 2024-06-18

### Changed

- Only enable the postgresql peer exception when installing postgresql

## [9.9.0-bb.0] - 2024-06-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.8.1 to 9.9.0
- postgresql chart newline change (DOS -> UNIX newlines)

## [9.8.1-bb.0] - 2024-06-05

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.8.0 to 9.8.1

## [9.8.0-bb.0] - 2024-05-23

### Changed

- gluon updated from 0.4.10 to 0.5.0
- ironbank/opensource/mattermost/mattermost updated from 9.7.3 to 9.8.0
- ironbank/opensource/postgres/postgresql12 updated from 12.18 to 12.19

## [9.7.3-bb.3] - 2024-05-22

### Added

- IAM Roles for Service Accounts (IRSA) using fileStore.roleARN

## [9.7.3-bb.2] - 2024-05-03

### Changed

- Added ./tests/images.txt to include postgres12 image

## [9.7.3-bb.1] - 2024-05-03

### Fixed

- Duplicate Istio ServiceEntry name for SSO

## [9.7.3-bb.0] - 2024-05-02

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.7.2 to 9.7.3
- minio-instance updated from 5.0.12-bb.1 to 5.0.12-bb.12
- minio image updated from RELEASE.2024-02-09T21-25-16Z to RELEASE.2024-03-30T09-41-56Z
- mc image updated from RELEASE.2024-02-09T22-18-24Z to RELEASE.2024-04-29T09-56-05Z

## [9.7.2-bb.0] - 2024-04-27

### Changed

- gluon updated from 0.4.9 to 0.4.10
- ironbank/opensource/mattermost/mattermost updated from 9.7.1 to 9.7.2

## [9.7.1-bb.0] - 2024-04-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.6.1 to 9.7.1

## [9.6.1-bb.1] - 2024-04-15

### Changed

- Added Istio Sidecar to restrict egress traffic to REGISTRY_ONLY
- Added Istio ServiceEntry to explicitly allow egress
- Added static ServiceEntry for mattermost hosts and keycloak

## [9.6.1-bb.0] - 2024-04-06

### Changed

- gluon updated from 0.4.8 to 0.4.9
- ironbank/opensource/mattermost/mattermost updated from 9.6.0 to 9.6.1

## [9.6.0-bb.0] - 2024-03-19

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.5.2 to 9.6.0
- helm release updated from 1.x.x to 2.x

## [9.5.2-bb.0] - 2024-03-12

### Changed

- gluon updated from 0.4.7 to 0.4.8
- ironbank/opensource/mattermost/mattermost updated from 9.5.1 to 9.5.2

## [9.5.1-bb.2] - 2024-03-05

### Changed

- Added Openshift updates for deploying mattermost into Openshift cluster

## [9.5.1-bb.1] - 2024-02-22

### Changed

- Added auth policy for kyverno-reporter
- Added auth policy for cluster-auditor

## [9.5.1-bb.1] - 2024-02-22

### Changed

- Updated renovate.json to account for gluon updates

## [9.5.1-bb.0] - 2024-02-20

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.4.2 to 9.5.1
- ironbank/opensource/postgres/postgresql12 updated from 12.17 to 12.18
- updated postgresql subchart to 10.3.5
- minio-instance updated from 5.0.11-bb.3 to 5.0.12-bb.1
- minio image updated from minio:RELEASE.2024-01-18T22-51-28Z to minio:RELEASE.2024-02-09T21-25-16Z
- mc image updated from 2024-01-18T07-03-39Z to RELEASE.2024-02-09T22-18-24Z

## [9.4.2-bb.1] - 2024-02-08

### Changed

- disabling the db probe init container if istio is hardened

## [9.4.2-bb.0] - 2024-02-07

### Changed

- registry1.dso.mil/ironbank/opensource/mattermost/mattermost v9.3.0 -> 9.4.2
- minio-instance updated from 5.0.11-bb.1 to 5.0.11-bb.3
- updated gluon form 0.4.5 to 0.4.7
- minio image updated from RELEASE.2023-11-20T22-40-07Z to RELEASE.2024-01-18T22-51-28Z
- mc image updated from RELEASE.2023-11-20T16-30-59Z to RELEASE.2024-01-18T07-03-39Z

## [9.3.0-bb.3] - 2024-02-02

### Updated

- allow-intranamespace authz policy added
- allow-nothing authz policy added
- monitoring authz policy added
- template authz policy added

## [9.3.0-bb.2] - 2024-01-16

### Changed

- minio-instance updated to 5.0.11-bb.1
- minio image updated to RELEASE.2023-11-20T22-40-07Z
- mc updated to RELEASE.2023-11-20T16-30-59Z

## [9.3.0-bb.1] - 2023-12-21

### Changed

- cypress resource allocation

## [9.3.0-bb.0] - 2023-12-21

### Changed

- registry1.dso.mil/ironbank/opensource/mattermost/mattermost v9.2.3 -> v9.3.0
- registry1.dso.mil/ironbank/opensource/postgres/postgresql12 12.16 -> 12.17
- Updated gluon from 0.4.1 to 0.4.5

## [9.2.3-bb.2] - 2023-12-19

### Changed

- Added an additionalPolicies value under networkPolicies to allow for additional custom policies to be specified

## [9.2.3-bb.1] - 2023-11-27

### Changed

- Values has mattermost bucket passed to minio chart

### Removed

- default-minio-bucket-creation Job

## [9.2.3-bb.0] - 2023-12-01

### Changed

- ironbank/opensource/mattermost/mattermost updated from v9.2.2 to v9.2.3

## [9.2.2-bb.0] - 2023-11-15

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.2.1 to v9.2.2
- Modified cypress test to account for button class change
- Updated minio chart/images

## [9.2.1-bb.0] - 2023-11-07

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.1.1 to 9.2.1

## [9.1.1-bb.0] - 2023-10-31

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.1.0 to 9.1.1

## [9.1.0-bb.0] - 2023-10-17

### Changed

- ironbank/opensource/mattermost/mattermost updated from 9.0.0 to 9.1.0

## [9.0.0-bb.1] - 2023-10-05

### Changed

- Updated Renovate to include postgres values entry

## [9.0.0-bb.0] - 2023-09-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 8.1.2 to 9.0.0
- Updated gluon from 0.4.0 to 0.4.1
- Modified cypress test structure to allow for cypress 13.X testing

## [8.1.2-bb.0] - 2023-09-11

### Changed

- ironbank/opensource/mattermost/mattermost updated from 8.1.0 to 8.1.2

## [8.1.0-bb.1]

### Changed

- Hide sign up and sign in forms by default when sso is enabled.
- Sign up and sign in forms can be enabled, even when sso is enabled, with new values.yaml settings.

## [8.1.0-bb.0] - 2023-08-26

### Changed

- ironbank/opensource/mattermost/mattermost updated from 8.0.1 to 8.1.0
- ironbank/opensource/postgres/postgresql12 updated from 12.15 to 12.16

## [8.0.1-bb.3] - 2023-08-18

### Changed

- Setting new variable for cypress test timeout
- If no value is given it will use default timeout value.

## [8.0.1-bb.2] - 2023-08-17

### Changed

- Updated Cypress tests to allow for SSO login

## [8.0.1-bb.1] - 2023-08-16

### Changed

- Updated dependency.yaml to point towards bigbang URL

## [8.0.1-bb.0] - 2023-08-02

### Changed

- ironbank/opensource/mattermost/mattermost updated from 8.0.0 to 8.0.1
- Updated Cypress to include new intro page

## [8.0.0-bb.0] - 2023-07-15

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.10.3 to 8.0.0
- minio-instance updated from 5.0.4-bb.1 to 5.0.5-bb.0

## [7.10.5-bb.0] - 2023-07-28

### Changed

- update ironbank/opensource/mattermost/mattermost from 7.10.3 to 7.10.5

## [7.10.3-bb.1] - 2023-06-30

### Changed

- update securityContext for podExtension to run as non-root

## [7.10.3-bb.0] - 2023-06-20

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.10.2 to 7.10.3
- minio-instance updated from 4.5.8-bb.0 to 5.0.4-bb.1
- mc updated from RELEASE.2022-08-23T05-45-20Z to RELEASE.2023-06-23T18-12-07Z

## [7.10.2-bb.2] - 2023-06-15

### Changed

- Modified securityContext for minio-bucket-creation job to run as non root user/group

## [7.10.2-bb.1] - 2023-06-15

### Changed

- ServiceMonitor tlsConfig indent bug fix

## [7.10.2-bb.0] - 2023-06-07

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.10.0 to 7.10.2
- ironbank/opensource/postgres/postgresql12 updated from 12.14 to 12.15

## [7.10.0-bb.3] - 2023-05-24

### Added

- Added mTLS to mattermost

## [7.10.0-bb.2] - 2023-05-17

### Updated

- Updated chart/values.yaml hostname key to domain

## [7.10.0-bb.1] - 2023-05-10

### Added

- Added a networkpolicy for egress from minio to the controlplane

## [7.10.0-bb.0] - 2023-04-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.9.1 to 7.10.0
- Updated minio subchart to latest 4.5.8-bb.0

## [7.9.1-bb.0] - 2023-03-21

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.8.1 to 7.9.1

## [7.8.1-bb.0] - 2023-03-07

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.8.0 to 7.8.1

## [7.8.0-bb.0] - 2023-03-01

### Changed

- ironbank/opensource/postgres/postgresql12 updated from 12.13 to 12.14
- ironbank/opensource/mattermost/mattermost updated from 7.7.1 to 7.8.0

## [7.7.1-bb.0] - 2023-01-24

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.5.1 to 7.7.1

## [7.5.1-bb.4] - 2022-01-17

### Changed

- Update gluon to new registry1 location + latest version (0.3.2)

## [7.5.1-bb.3] - 2022-01-11

### Changed

- Add support for istio injection via network policies / pod annotation value support
- Disable update job for MM to prevent upgrade issues

## [7.5.1-bb.2] - 2022-01-11

### Changed

- Changed minio subchart to utilize OCI
- Updated minio subchart to latest 4.5.4-bb.2

## [7.5.1-bb.1] - 2022-12-15

### Changed

- Set capabilities to drop all

## [7.5.1-bb.0] - 2022-11-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.4.0 to 7.5.1

## [7.4.0-bb.0] - 2022-10-18

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.3.0 to 7.4.0

## [7.3.0-bb.1] - 2022-10-05

### Updated

- updated minio and gluon dependencies

## [7.3.0-bb.0] - 2022-09-27

### Changed

- ironbank/opensource/mattermost/mattermost updated from 7.2.0 to 7.3.0

## [7.2.0-bb.1] - 2022-09-28

### Changed

- Change default SSO auth endpoints to use direct Keycloak endpoints.

## [7.2.0-bb.0] - 2022-08-23

### Changed

- Upgraded MM to 7.2.0

## [7.1.2-bb.1] - 2022-08-09

### Added

- Added grafana dashboard configmap and dashboard json when `monitoring.enabled` and `enterprise.enabled`

## [7.1.2-bb.0] - 2022-07-29

### Changed

- Upgraded MM to 7.1.2

## [7.0.1-bb.1] - 2022-07-11

### Changed

- Upgraded cypress test to reduce inconsistent/flaky behavior with a conditional check

## [7.0.1-bb.0] - 2022-07-06

### Changed

- Upgraded MM to 7.0.1
- Updated tests to resolve cypress test failures from updated application html/css

## [6.7.0-bb.0] - 2022-05-19

### Changed

- Upgraded MM to 6.7.0

## [6.6.0-bb.0] - 2022-04-22

### Changed

- Upgrade Mattermost to application version 6.6.0

## [0.7.0-bb.1] - 2022-03-28

### Added

- NetworkPolicy Template to allow metrics scraping of minio tenants

## [0.7.0-bb.0] - 2022-03-03

### Changed

- Updated MM to 6.4.1

## [0.6.0-bb.1] - 2022-02-28

### Changed

- Updated Minio to 4.4.10

## [0.6.0-bb.0] - 2022-02-22

### Changed

- Upgrade Mattermost to application version 6.3.4

## [0.5.0-bb.0] - 2022-02-07

### Changed

- Upgrade Mattermost to application version 6.3.3
  1. v5 -> v6 has some major migrations and upstream notes long migration times, they have provided analysis on the time these take - [see here](https://docs.mattermost.com/upgrade/important-upgrade-notes.html#:~:text=Longer%20migration%20times,70%2B%20million%20posts.)
  2. v5 servers cannot run with v6 servers, i.e. upgrade WILL have downtime - [see here](https://docs.mattermost.com/upgrade/important-upgrade-notes.html#:~:text=The%20field%20type,a%20large%20extent.)
  3. v6.1 has additional schema changes, MM has provided analysis on these changes as well - [see here](https://docs.mattermost.com/upgrade/important-upgrade-notes.html#:~:text=Please%20refer%20to%20the%20schema%20migration%20analysis%20when%20upgrading%20to%20v6.1.)
  4. v6.2 has modified autocomplete to include private channels, which requires re-indexing if using Elastic - [see here](https://docs.mattermost.com/upgrade/important-upgrade-notes.html#:~:text=Channel%20results%20in,in%20autocomplete%20results.)

## [0.4.0-bb.4] - 2022-02-15

### Changed

- Update mino dependency chart to 4.4.3-bb.3

## [0.4.0-bb.3] - 2022-02-14

### Changed

- Fixed bug with ENV for SITE_URL not being set in certain cases

## [0.4.0-bb.2] - 2022-02-02

### Updated

- Update minio dependency chart to 4.4.3-bb.2

## [0.4.0-bb.1] - 2022-01-31

### Updated

- Update Chart.yaml to follow new standardization for release automation
- Added renovate check to update new standardization

## [0.4.0-bb.0] - 2022-01-25

### Changed

- Relocated `bbtests` to `values.yaml`

## [0.3.0-bb.0] - 2021-12-06

### Changed

- Added a conditional addition of tolerations to mattermost.yaml
- Added a spot for tolerations in values.yaml

## [0.2.4-bb.0] - 2021-11-02

### Changed

- Disabled ingress by default
- Disabled readiness container by default, added default initcontainer with IB postgres image

## [0.2.3-bb.0] - 2021-10-27

### Changed

- Fixed minio operator ingress networkpolicy labels

## [0.2.2-bb.0] - 2021-09-30

### Changed

- Updated Mattermost to 5.39.0

## [0.2.1-bb.0] - 2021-09-29

### Changed

- Updated Minio and Minio-operator to 4.2.3-bb.2

## [0.2.0-bb.2] - 2021-09-14

### Changed

- Updated Minio, and Minio-operator

## [0.2.0-bb.1] - 2021-09-01

### Fixed

- Missing appVersion update in Chart.yaml

## [0.2.0-bb.0] - 2021-08-27

### Changed

- Updated to latest IB 5.38.2
- Modified tests to remove buggy "site name" test and accomodate the new "tutorial" setup

## [0.1.8-bb.0] - 2021-08-19

### Fix

- Fixes issue with default bucket creation already existing

## [0.1.8-bb.0] - 2021-08-18

### Added

- default user value set to null
- Set replica count to 1
- Resource requests and limits for all containers
- Updated to latest Minio and Minio Operator dependency
- Updated Gluon test library

## [0.1.7-bb.1] - 2021-07-23

### Changed

- Updated to latest IronBank image 5.37.0
- Updated to latest Minio 4.1.2 package as dependency
- Moved to Gluon test library
- Pulled in changes from main-minio2 branch

### Added

- Added BigBang networkPolicies

## [0.1.7-bb.0] - 2021-05-17

### Changed

- Updated to latest Minio package as dependency

## [0.1.6-bb.8] - 2021-07-21

### Changed

- Add openshift toggle, conditionally add port 5353 egress. Changing "openshift:" to true in values.yaml will enable.

## [0.1.6-bb.7] - 2021-07-08

### Changed

- Update Mattermost to version 5.36.1

## [0.1.6-bb.6] - 2021-06-22

### Changed

- Update Mattermost to version 5.36.0

## [0.1.6-bb.5] - 2021-06-21

### Fixed

- NetworkPolicy blocking an init container, added policy to allow postgres egress for the init container
- Redo of test egress
- Move around DNS policy

## [0.1.6-bb.4] - 2021-06-07

### Added

- Ability to pass volumes / volumeMounts to MM pods

## [0.1.6-bb.3] - 2021-06-04

### Added

- Add IPS with new operator
- Switch to the IB image being used directly

## [0.1.6-bb.2] - 2021-06-02

### Changed

- Restricted test policy to just cluster

## [0.1.6-bb.1] - 2021-06-01

### Changed

- Moved tests to gluon library

### Added

- Default NetworkPolicies added

## [0.1.6-bb.0] - 2021-05-11

### Changed

- Migrated Cypress tests to Helm tests
- Added additional testing of file storage and settings modification

## [0.1.5-bb.0] - 2021-05-06

### Changed

- Updated to 5.34.2
- Cleaned up values and test-values

## [0.1.4-bb.0] - 2021-04-23

### Added

- Added Elastic Search declarative configuration.

## [0.1.3-bb.2] - 2021-04-19

### Changed

- Pulled in official BB Minio via kpt
- Refactored the Minio connection secret

## [0.1.3-bb.1] - 2021-04-15

### Added

- Added Minio security context

## [0.1.3-bb.0] - 2021-04-08

### Added

- Values passthroughs for secret env values
- Moved all envs to a secret that chart creates

## [0.1.2-bb.0] - 2021-04-05

### Changed

- Modified the way affinity is passed to simplify and standardize

## [0.1.1-bb.3] - 2021-03-25

### Fixed

- Minio virtualservice disabled by default

## [0.1.1-bb.2] - 2021-03-25

### Changed

- Updated Cypress test to handle upgrades
- Added a test to make sure chats can send

## [0.1.1-bb.1] - 2021-03-24

### Changed

- Refactored the Minio dependency to use the BB upstream with kpt

## [0.1.1-bb.0] - 2021-03-15

### Changed

- Bumped Mattermost image to 5.32.1
- Added a ENV to set S3 connection to insecure when using the built-in minio (due to an operator change)

## [0.1.0-bb.2] - 2021-02-26

### Fixed

- Bumped Minio image version to the newest IB image to fix an issue

## [0.1.0-bb.1] - 2021-02-25

### Fixed

- Fixed issue with the dependency listing in the chart, Flux did not properly install

## [0.1.0-bb.0] - 2021-02-24

### Added

- Initial chart built from operator v1.12.0 using Ironbank images
