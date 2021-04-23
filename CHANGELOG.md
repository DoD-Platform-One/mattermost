# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
