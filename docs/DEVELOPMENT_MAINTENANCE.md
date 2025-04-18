# How to upgrade the Mattermost Package chart

Mattermost is a Big Bang built chart. As a result there is no `Kptfile` to handle any automatic updates from upstream. The below details the steps required to update to a new version of the Mattermost package.

1. Checkout the branch created by renovate.  This branch will typically include the image tag and other version updates necessary for upgrade.  You can either work off of this branch or create a new branch off of this one.
1. Review the [upstream changelog](https://docs.mattermost.com/deploy/mattermost-changelog.html) for the update you are going to, as well as any versions skipped over between the last BB release and this one. Note any breaking changes and new features.
1. Based on the upstream changelog review from earlier, make any changes required to resolve breaking changes.
1. Verify the `image.tag` value in `chart/values.yaml` is pointed to the newest version of Mattermost.
1. Update the `version` in `Chart.yaml` - this is a BigBang built and owned chart so we sync the chart version with the appVersion (ex: appVersion `6.6.0` -> chart version `6.6.0-bb.0`). Also verify the `appVersion` and the `bigbang.dev/applicationVersions` match the version used in the mattermost image tag.
1. Check the latest version of `minio-instance` within `Chart.yaml` then run `helm dependency update chart` if applicable.
1. make sure that the `helm.sh/images` in `chart.yaml` to point to the correct images for `minio` and `postgresql`
1. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Mattermost to x.x.x`).
1. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).
1. Open an MR in "Draft" status (or check the one that Renovate creates for the issue) and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't. Follow the steps below for manual testing.
1. Once all manual testing is complete take your MR out of "Draft" status, add the review label, add any necessary upgrade notices (if none you will need to put N/A), add any screenshots/logs/etc. as proof that your changes work (these are required), assign yourself as the assignee, and add reviewers.

# Testing new Mattermost version

New mattermost version should be manually tested on botch a clean install and an upgrade from BB master.

## Branch/Tag Config

If you'd like to install from a specific branch or tag, then the code block under mattermost needs to be uncommented and used to target your changes.

```
addons:
  mattermost:
    <other config/labels>
    ...
    ...

    # Add git branch or tag information to test against a specific branch or tag instead of using `main`
    # Must set the unused label to null
    git:
      tag: null
      branch: "renovate/ironbank"
```

If you would like to install with the enterprise enabled you can either enter the license into the enterprise/license field in the mattermost.yaml or navigate to the [System Console](system-console.png) after install to start a trial. You can generate a license by starting the free trial. You can recover your license by running the following command. This is not necessary unless you wish to re-use the license on subsequent installs.
    `kubectl exec -n mattermost mattermost-postgresql-0 -- bash -c 'PGPASSWORD=bigbang psql -t -U mattermost -c "select bytes from licenses;"' > encoded.mattermost-license`
        - Note: this is a base64 file that you can decode to read parts of the json (though it contains other data that does not come out correctly as json), but Mattermost expects the encoded file

This example shows enterprise enabled.

```
addons:
  mattermost:
    <other config/labels>
    ...
    ...

    # Add git branch or tag information to test against a specific branch or tag instead of using `main`
    # Must set the unused label to null
    git:
      tag: null
      branch: "renovate/ironbank"
    enterprise:
      enabled: true
      license: ""
```

To install with Elasticsearch/Kibana enabled the monitoring/enabled field will need to be added to the example mattermost.yaml.

```
monitoring:
  enabled: true

addons:
  mattermost:
    <other config/labels>
    ...
    ...

    # Add git branch or tag information to test against a specific branch or tag instead of using `main`
    # Must set the unused label to null
    git:
      tag: null
      branch: "renovate/ironbank"
    elasticsearch:
      enabled: true
```

## Cluster setup

⚠️ Always make sure your local bigbang repo is current before deploying.

1. Export your Ironbank/Harbor credentials (this can be done in your `~/.bashrc` or `~/.zshrc` file if desired). These specific variables are expected by the `k3d-dev.sh` script when deploying metallb, and are referenced in other commands for consistency:
    ```
    export REGISTRY_USERNAME='<your_username>'
    export REGISTRY_PASSWORD='<your_password>'
    ```
1. Export the path to your local bigbang repo (without a trailing `/`):

  	⚠️ Note that wrapping your file path in quotes when exporting will break expansion of `~`.
    ```
    export BIGBANG_REPO_DIR=<absolute_path_to_local_bigbang_repo>
    ```
    e.g.
    ```
    export BIGBANG_REPO_DIR=~/repos/bigbang
    ```
1. Run the [k3d_dev.sh](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/assets/scripts/developer/k3d-dev.sh) script to deploy a dev cluster with Mattermost:
    ```
    "${BIGBANG_REPO_DIR}/docs/assets/scripts/developer/k3d-dev.sh"
    ```
    For Mattermost with elasticsearch/kibana it is recommended to use the -b flag:
    ```
    "${BIGBANG_REPO_DIR}/docs/assets/scripts/developer/k3d-dev.sh -b"
    ```
1. Export your kubeconfig:
    ```
    export KUBECONFIG=~/.kube/<your_kubeconfig_file>
    ```
    e.g.
    ```
    export KUBECONFIG=~/.kube/Sam.Sarnowski-dev-config
    ```
1. [Deploy flux to your cluster](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/scripts/install_flux.sh):
    ```
    "${BIGBANG_REPO_DIR}/scripts/install_flux.sh -u ${REGISTRY_USERNAME} -p ${REGISTRY_PASSWORD}"
    ```

## Deploy Bigbang
From the root of this repo, run the following deploy command to deploy Mattermost:

For `chat.dev.bigbang.mil` Mattermost:
  ```
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/dev-sso-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/policy-overrides-k3d.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/mattermost-testing.yaml
  ```

For `chat.dev.bigbang.mil` Mattermost with Elasticsearch enabled:
  ```
  helm upgrade -i bigbang ${BIGBANG_REPO_DIR}/chart/ -n bigbang --create-namespace \
  --set registryCredentials.username=${REGISTRY_USERNAME} --set registryCredentials.password=${REGISTRY_PASSWORD} \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/tests/test-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/chart/ingress-certs.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/dev-sso-values.yaml \
  -f https://repo1.dso.mil/big-bang/bigbang/-/raw/master/docs/assets/configs/example/policy-overrides-k3d.yaml \
  -f docs/dev-overrides/minimal.yaml \
  -f docs/dev-overrides/mattermost-testing.yaml
  ```

This will deploy the following apps for testing:

- Mattermost, Mattermost Operator, Minio

## Validation/Testing Steps

⚠️ For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point mattermost to your branch. For an upgrade do an install with mattermost pointing to the latest tag, then perform a helm upgrade with mattermost pointing to your branch.

Testing Steps:
1. Navigate to Mattermost (https://chat.dev.bigbang.mil/)
1. Log in with SSO via your `login.dso.mil` account.
1. Follow the initial setup to create a team and send an initial chat.
1. Under account settings, upload a profile picture. Validate the upload is successful and your profile picture is visible.
1. Navigate to prometheus and validate that the Mattermost target shows as up (make sure you are on enterprise and have started a trial).
1. If elasticsearch is enabled, under system console -> elastic -> index now and validate success (make sure you are on enterprise and have started a trial).
    - NOTE: This doesn't seem to be working at the moment.
1. Check Grafana for data in the `Mattermost Performance Monitoring v2` dashboard (Ensure you change the server on the dashboard to point to the mattermost pod ip)

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Chart Additions

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads). 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

# Files that require integration testing

If you modify any of these things, you should perform an integration test with your branch against the rest of bigbang. Some of these files have automatic tests already defined, but those automatic tests may not model corner cases found in full integration scenarios.

* `./chart/templates/bigbang/*`
* `./chart/templates/peer-authentication/*`
* `./chart/templates/role.yaml`
* `./chart/templates/role-binding.yaml`
* `./chart/values.yaml` if it involves any of:
  * monitoring changes
  * network policy changes
  * kyverno policy changes
  * istio hardening rule changes
  * service definition changes
  * TLS settings

Follow [the standard process](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/docs/developer/test-package-against-bb.md?ref_type=heads) for performing an integration test against bigbang.
