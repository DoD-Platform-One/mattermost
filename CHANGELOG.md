# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
- Added Elastic Search declaritive coniguration. 

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