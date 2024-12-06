# Upgrading to a new version

Mattermost is a Big Bang built chart. As a result there is no `Kptfile` to handle any automatic updates from upstream. The below details the steps required to update to a new version of the Mattermost package.

1. Review the [upstream changelog](https://docs.mattermost.com/deploy/mattermost-changelog.html) for the update you are going to, as well as any versions skipped over between the last BB release and this one. Note any breaking changes and new features.

2. Modify the `image.tag` value in `chart/values.yaml` to point to the newest version of Mattermost.

3. Based on the upstream changelog review from earlier, make any changes required to resolve breaking changes.

4. Modify the `version` in `Chart.yaml` - this is a BigBang built and owned chart so we sync the chart version with the appVersion (ex: appVersion `6.6.0` -> chart version `6.6.0-bb.0`). Also modify the `appVersion` and the `bigbang.dev/applicationVersions` to the new upstream version of Mattermost (same version you put in for the image tag value).

5. You should check the latest version of `minio-instance` within `Chart.yaml` then run `helm dependency update chart` if applicable.

6. make sure that the `helm.sh/images` in `chart.yaml` to point to the correct images for `minio` and `postgresql`

7. Update `CHANGELOG.md` adding an entry for the new version and noting all changes (at minimum should include `Updated Mattermost to x.x.x`).

8. Generate the `README.md` updates by following the [guide in gluon](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

9. Validate that `tests/dependencies.yaml` points to the latest tag for `mattermost-operator`. If it doesn't, update it.

10. Open an MR in "Draft" status and validate that CI passes. This will perform a number of smoke tests against the package, but it is good to manually deploy to test some things that CI doesn't. Follow the steps below for manual testing.

11. Once all manual testing is complete take your MR out of "Draft" status and add the review label.

# Deploying

## Prerequisites:
- Make sure to do git pull to get the latest code from bigbang
- Determine what kind of database you will use behind mattermost. Mattermost requires a postgresql database. You can use any postgresql database. Set your postgresql database connection information in your values:

```
postgresql:
  auth:
    database: "database name"
    host: "fqdn of postgres instance"
    username: "username of mattermost postgres user"
    password: "password of mattermost postgres user"
```

For development use on your local cluster you can enable a built-in postgresql database that will auto-configure the user, password, host and database without further intervention:

```
# in your values.yaml file
postgresql:
  install: true
  auth:
    sslmode: disable

# or on the helm command line
--set postgresql.install=true --set postgresql.auth.sslmode=disable
```

The builtin postgresql is NOT a supported configuration outside of a local dev environment, and by default, it is NOT enabled.

## Deployment Steps:
- [Mattermost example values override](mattermost.example.yaml) is an example override file.
- consider `-b` on the k3d script (only if you intend to enable elasticsearch/kibana)
- [Download the example overrides file here](https://repo1.dso.mil/andrewshoell/overrides/-/blob/main/mattermost.yaml?ref_type=heads) and place it in a local override directory
- (from the root of the bigbang repo) `helm upgrade chart -f <registryCredentials overrides> -f chart/ingress-certs.yaml -f docs/assets/configs/example/dev-sso-values.yaml -f docs/assets/configs/example/policy-overrides-k3d.yaml -f <mattermost override file>`
- Verify /etc/hosts file contains `chat.bigbang.dev` targeting your K3D instance's public IP
- [Enterprise enabled](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/7b14b4739b26b900cf7e6f1c075edc33c271eca6/chart/values.yaml#L962) - if you do not have a license key leave `enterprise` disabled in the `ignore/mattermost.yaml` until you generate one
    - if you do not pass a license in, navigate to the [System Console](system-console.png) after install to start a trial
    - You can generate a license by starting the free trial.
    - You can recover your license by running the following command. This is not necessary unless you wish to re-use the license on subsequent installs.
    `kubectl exec -n mattermost mattermost-postgresql-0 -- bash -c 'PGPASSWORD=bigbang psql -t -U mattermost -c "select bytes from licenses;"' > encoded.mattermost-license`
        - Note: this is a base64 file that you can decode to read parts of the json (though it contains other data that does not come out correctly as json), but Mattermost expects the encoded file
- Elasticsearch enabled + [integration enabled](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/blob/7b14b4739b26b900cf7e6f1c075edc33c271eca6/chart/values.yaml#L1038)
- [Elasticsearch/kibana values](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/tests/test-values.yaml#L749)
- Monitoring enabled

# Testing for updates

NOTE: For these testing steps it is good to do them on both a clean install and an upgrade. For clean install, point mattermost to your branch. For an upgrade do an install with mattermost pointing to the latest tag, then perform a helm upgrade with mattermost pointing to your branch.

Testing Steps:
- Log in with SSO via your `login.dso.mil` account.
- Follow the initial setup to create a team and send an initial chat.
- Under account settings, upload a profile picture. Validate the upload is successful and your profile picture is visible.
- Navigate to prometheus and validate that the Mattermost target shows as up (make sure you are on enterprise and have started a trial).
- Under system console -> elastic -> index now and validate success (make sure you are on enterprise and have started a trial).
    - NOTE: This doesn't seem to be working at the moment.
- Check Grafana for data in the `Mattermost Performance Monitoring v2` dashboard (Ensure you change the server on the dashboard to point to the mattermost pod ip)

When in doubt with any testing or upgrade steps ask one of the CODEOWNERS for assistance.

# Chart Additions

### automountServiceAccountToken
The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads). 

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.

# Files that need integration testing

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
