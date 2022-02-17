# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
