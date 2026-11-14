---
source: https://docs.expo.dev/eas/workflows/pre-packaged-jobs/
---

# Pre-packaged jobs in Expo Workflows

Ready-to-use workflow jobs (`type:` values) that automate common tasks such as building, submitting, updating, and testing an app.

## Signature / Usage

```yaml
name: Build and submit iOS

on:
  push:
    branches: ['main']

jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production
  submit_ios:
    name: Submit iOS
    needs: [build_ios]
    type: submit
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
```

Syntax skeletons of each job (`params` and hooks):

```yaml
jobs:
  build_app:
    type: build
    runs_on: string # optional
    params:
      platform: android | ios # required
      profile: string # optional - default: production
      message: string # optional
      refresh_ad_hoc_provisioning_profile: boolean # optional
    hooks:
      before_install_node_modules: step[]
      after_install_node_modules: step[]

  deploy_web:
    type: deploy
    params:
      alias: string # optional
      prod: boolean # optional
      source_maps: boolean # optional

  publish_update:
    type: update
    environment: production | preview | development # optional, defaults to production
    params:
      message: string
      platform: string # android | ios | all, defaults to all
      branch: string
      channel: string # cannot be used with branch
      rollout_percentage: number # 0 to 100, defaults to 100
      private_key_path: string
      upload_sentry_sourcemaps: boolean

  testflight_distribution:
    type: testflight
    params:
      build_id: string # required (or asc_build_id)
      internal_groups: string[]
      external_groups: string[]
      changelog: string
      submit_beta_review: boolean
```

## Options / Props

### Build (`type: build`)

| Parameter | Type | Description |
| --- | --- | --- |
| platform | string | Required. `android` or `ios` |
| profile | string | Build profile. Defaults to `production` |
| message | string | Message attached to the build (`--message` of `eas build`) |
| refresh_ad_hoc_provisioning_profile | boolean | Refresh the managed ad hoc provisioning profile before an iOS internal build (`--refresh-ad-hoc-provisioning-profile`) |

Outputs: `build_id`, `app_build_version`, `app_identifier`, `app_version`, `channel`, `distribution` (`internal` or `store`), `fingerprint_hash`, `git_commit_hash`, `platform`, `profile`, `runtime_version`, `sdk_version`, `simulator`. Hooks: `before_install_node_modules`, `after_install_node_modules`. Environment variables come from the `env` of the eas.json profile, pulled from Expo Services environment variables. Prerequisite: eas.json contains the profile and signing credentials are configured (`eas credentials:configure-build -p <platform> -e <profile>`).

### Deploy (`type: deploy`, Expo Hosting)

| Parameter | Type | Description |
| --- | --- | --- |
| alias | string | Alias to deploy to |
| prod | boolean | Deploy to production |
| source_maps | boolean | Upload source maps with the deployment |

Outputs: `deploy_json` (output of `npx eas-cli deploy --json`), `deploy_url`, `deploy_alias_url`, `deploy_deployment_url`, `deploy_identifier`, `deploy_dashboard_url`. Hooks: `after_checkout`, `before_install_node_modules`, `after_install_node_modules`.

### Fingerprint (`type: fingerprint`)

Calculates a fingerprint of the project. Only supports CNG workflows (committed `android` / `ios` directories break it). Use the same `environment` as the build profile so fingerprints match; prefer Expo Services environment variables over inline `env`.

| Parameter | Type | Description |
| --- | --- | --- |
| unstable_skip_cng_check | boolean | Skip the CNG compatibility check. Defaults to `false` |

Outputs: `android_fingerprint_hash`, `ios_fingerprint_hash`. Hooks: `after_checkout`, `before_install_node_modules`, `after_install_node_modules`.

### Get Build (`type: get-build`)

Retrieves an existing build matching the parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| platform | string | `ios` or `android` |
| profile | string | Build profile |
| distribution | string | `store`, `internal`, or `simulator` |
| channel | string | Update channel |
| app_identifier | string | Bundle identifier or package name |
| app_build_version | string | Build version |
| app_version | string | App version |
| git_commit_hash | string | Git commit hash |
| fingerprint_hash | string | Fingerprint hash |
| sdk_version | string | SDK version |
| runtime_version | string | Runtime version |
| simulator | boolean | Get a simulator build |
| wait_for_in_progress | boolean | Wait for a matching in-progress build if no successful one exists. Default `false`. If the matched build fails, the job still succeeds with empty outputs |

All parameters are optional. Outputs: same set as the build job (`build_id`, `app_build_version`, `app_identifier`, `app_version`, `channel`, `distribution`, `fingerprint_hash`, `git_commit_hash`, `platform`, `profile`, `runtime_version`, `sdk_version`, `simulator`).

### Submit (`type: submit`)

| Parameter | Type | Description |
| --- | --- | --- |
| build_id | string | Required. ID of the build to submit |
| profile | string | Submit profile. Defaults to `production` |
| groups | string[] | TestFlight internal group names to add the build to |

Outputs: `apple_app_id`, `ios_bundle_identifier`, `android_package_id`. Hooks: `after_checkout`, `before_install_node_modules`, `after_install_node_modules`, `before_submit`, `after_submit`. Prerequisite: CI/CD submission configuration (see the Android and iOS submit pages).

### TestFlight (`type: testflight`)

Alternative to the iOS submit job for controlling groups, changelog, and Beta App Review. Provide exactly one of `build_id` or `asc_build_id`.

| Parameter | Type | Description |
| --- | --- | --- |
| build_id | string | Required for the upload variant. ID of the iOS Expo Build (must be `distribution: store`) |
| asc_build_id | string | Required for the already-uploaded variant. ID of a build in App Store Connect |
| profile | string | Upload variant only. Submit profile; defaults to `production` |
| internal_groups | string[] | Internal group names; only groups without automatic distribution |
| external_groups | string[] | External group names |
| changelog | string | "What to Test" notes |
| submit_beta_review | boolean | Defaults to `true` when `external_groups` is provided, otherwise `false` |
| wait_processing_timeout_seconds | number | Upload variant only. Default `1800`; applies when distributing via groups or changelog |

Outputs (upload variant): `apple_app_id`, `ios_bundle_identifier`; (already-uploaded variant): also `asc_build_id`. Hooks (upload variant only): `after_checkout`, `before_install_node_modules`, `after_install_node_modules`. External distribution requires TestFlight test information to be completed in App Store Connect. The already-uploaded variant needs the App Store Connect connection under Project settings > General > Connections.

### Update (`type: update`)

| Parameter | Type | Description |
| --- | --- | --- |
| message | string | Update message; the commit message if omitted |
| platform | string | `android`, `ios`, or `all` (default) |
| branch | string | Branch; defaults to the workflow run branch. If the run has no branch (for example a run that `eas workflow:run` starts from local project files without `--git-branch`), provide one, e.g. `${{ github.ref_name \|\| 'testing' }}`. Provide either branch or channel |
| channel | string | Channel. Provide either branch or channel |
| rollout_percentage | number | Integer 0 to 100 (`--rollout-percentage`) |
| private_key_path | string | PEM private key path for code signing (`--private-key-path`); a file-type Expo Services environment variable can be referenced as `"$VARIABLE_NAME"` |
| upload_sentry_sourcemaps | boolean | `true` uploads and fails if upload fails; `false` skips; unset tries when `@sentry/react-native` is installed and does not fail on error |

Outputs: `first_update_group_id`, `updates_json`. Hooks: `after_checkout`, `before_install_node_modules`, `after_install_node_modules`, `before_update`, `after_update`. Prerequisite: `npx eas-cli@latest update:configure` and new builds.

### Update rollout (`type: update-rollout`)

| Parameter | Type | Description |
| --- | --- | --- |
| update_group_id | string | Required. Typically `first_update_group_id` of a preceding `update` job; must have an in-progress rollout |
| rollout_percentage | number | Integer 0 to 100, not less than the current percentage; default `100` (completes the rollout) |

Outputs: `update_group_id`, `rollout_percentage`, `updates_json`.

### Branch delete (`type: branch-delete`)

| Parameter | Type | Description |
| --- | --- | --- |
| branch_name | string | Required. Expo Update branch to delete (same as `eas branch:delete`) |
| fail_on_missing | boolean | `false` (default): succeed if missing; `true`: fail if missing |

Outputs: `branch_id` (null if missing and `fail_on_missing` is false), `branch_name`.

### Maestro (`type: maestro`, alpha)

Runs Maestro tests on an Android Emulator or iOS Simulator build. `environment` defaults to `preview`. Use a `linux-*-nested-virtualization` worker for Android Emulator tests.

| Parameter | Type | Description |
| --- | --- | --- |
| build_id | string | Required. Build to test |
| flow_path | string or string[] | Required. Maestro flow file(s) or directory |
| shards | number | Optional and experimental. Default 1 |
| retries | number | Default 0 |
| retry_failed_only | boolean | Default `true` |
| record_screen | boolean | Default `false`; may impact emulator performance |
| include_tags / exclude_tags | string or string[] | Passed to Maestro as `--include-tags` / `--exclude-tags` |
| maestro_version | string | Defaults to the version preinstalled on the runner image when found, otherwise the latest. Set `latest` to always install the newest |
| android_system_image_package | string | Emulator system image (choose an `x86_64` variant), e.g. `system-images;android-36;google_apis;x86_64` |
| device_identifier | string or `{ android?: string, ios?: string }` | Device to use, e.g. `pixel_6`, `iPhone 16 Plus` |
| output_format | string | Report format passed as `--format`; default `junit` |
| skip_build_check | boolean | Skip validating that an iOS build is a simulator build. Default `false` |

Hooks: `after_checkout`, `before_maestro_tests`, `after_maestro_tests`.

### Maestro Cloud (`type: maestro-cloud`)

Requires a Maestro Cloud account and Cloud Plan subscription. `environment` defaults to `preview`. Set `maestro_api_key` or the `MAESTRO_CLOUD_API_KEY` environment variable.

| Parameter | Type | Description |
| --- | --- | --- |
| build_id | string | Required. Build to test |
| maestro_project_id | string | Required. Maestro Cloud project ID, e.g. `proj_01jw6hxgmdffrbye9fqn0pyzm0` |
| flows | string | Required. Flow file or directory (`--flows`) |
| maestro_api_key | string | Defaults to `$MAESTRO_CLOUD_API_KEY` |
| include_tags / exclude_tags | string or string[] | Tag filters |
| maestro_version | string | Maestro version, for example `1.30.0`. Defaults to the version preinstalled on the image when found, otherwise the latest. Use `latest` to always install the newest |
| maestro_config | string | Path to Maestro `config.yaml` (`--config`) |
| device_locale / device_model / device_os | string | Device settings (`maestro list-cloud-devices` lists supported values) |
| skip_build_check | boolean | Default `false` |
| name | string | Name for the upload (`--name`) |
| branch | string | Override of the originating branch (`--branch`) |
| async | boolean | If true, job status only denotes upload success (`--async`) |

Outputs: `maestro_cloud_url`, `total_flows_count`, `successful_flows_count`, `failed_flows_count`, `successful_flow_names_json`, `failed_flow_names_json` (with `async: true` only `maestro_cloud_url` is guaranteed valid). Hooks: `after_checkout`, `before_maestro_cloud`, `after_maestro_cloud`.

### Slack (`type: slack`)

| Parameter | Type | Description |
| --- | --- | --- |
| webhook_url | string | Required. Slack webhook URL, e.g. `${{ env.SLACK_WEBHOOK_URL }}` |
| message | string | Required if `payload` is not provided |
| payload | object | Required if `message` is not provided. Slack Block Kit payload |

### Email (`type: email`)

Sends a plain-text email to members of the account that owns the project; each email ends with a footer linking to the workflow run. Recipients who are not account members or have no verified email address are skipped, which fails the job and lists them (other recipients still receive the email). Hourly limits: each account can send up to 100 emails and each member can receive up to 10 (1,000 and 60 on the Production and Enterprise plans); a recipient who would exceed a limit is skipped. `env` is not available on this job.

| Parameter | Type | Description |
| --- | --- | --- |
| usernames | string[] | Required if `emails` is not provided. Usernames of account members; up to 50 recipients across `usernames` and `emails` |
| emails | string[] | Required if `usernames` is not provided. Email addresses of account members; up to 50 recipients in total |
| subject | string | Required. Up to 255 characters |
| body | string | Required. Plain-text body, up to 20,000 characters |

```yaml
jobs:
  send_email:
    type: email
    params:
      usernames: [alice, bob]
      subject: 'Maestro tests failed'
      body: |
        Maestro tests failed for build ${{ needs.build_ios_simulator.outputs.build_id }}.
```

### GitHub Comment (`type: github-comment`)

Posts reports of completed builds, updates, and deployments to GitHub pull requests. Requires a connected GitHub repository. Two mutually exclusive modes.

| Mode | Parameter | Type | Description |
| --- | --- | --- | --- |
| Auto-with-overrides | message | string | Message at the top of the comment |
| Auto-with-overrides | build_ids / update_group_ids / deployment_ids | string[] | Specific IDs; unset auto-discovers from the workflow; `[]` excludes |
| Payload | payload | string | Raw markdown or HTML for the comment; supports interpolation; no other parameters allowed |

Output: `comment_url`.

### Apple device registration request (`type: apple-device-registration-request`)

Pauses the run (`action-required`) until an iOS device enrolls for an Apple team and a team member approves on expo.dev.

| Parameter | Type | Description |
| --- | --- | --- |
| apple_team_identifier | string | Apple Team ID, e.g. `ABCDE12345`. Required when the account has no or two or more Apple teams |

Outputs after approval: `apple_device_id`, `identifier` (UDID), `name`, `model`, `device_class` (`iphone`, `ipad`, `mac`), `software_version`. A rejection fails the job without outputs.

### Require Approval (`type: require-approval`)

No parameters. A user approves (success) or rejects (failure). Approve within 30 days after the workflow run was created; later approval makes the run fail before its next job starts (a called run uses the same window as the run that calls it). Jobs after approval use the access of the user or robot that started the run, not the approver's; if that access is lost, the run fails. To continue after such a failure, re-run the workflow from its failed jobs (the new run reuses the approval); see Manage workflow runs.

### Doc (`type: doc`)

| Parameter | Type | Description |
| --- | --- | --- |
| md | string | Required. Markdown shown in the workflow logs; supports `${{ ... }}` interpolation |

### Repack (`type: repack`)

Repackages an app's metadata and JavaScript bundle from an existing build without a full native rebuild. Not suitable for production builds that need the complete pipeline for correct symbolication and app signing.

| Parameter | Type | Description |
| --- | --- | --- |
| build_id | string | Required. Source build ID (use `get-build` with `wait_for_in_progress: true` if it may still be running) |
| profile | string | Defaults to the source build's profile |
| embed_bundle_assets | boolean | Determined from the source build by default |
| js_bundle_only | boolean | Only repack the JS bundle. Default `false` |
| message | string | Message attached to the build |
| repack_version | string | `@expo/repack-app` version; default latest |
| repack_package | string | npm package; default `@expo/repack-app` |
| ios_signing_use_source_app_entitlements | boolean | fastlane resign `use_app_entitlements` behavior. Default `false` |
| ios_signing_app_entitlements_path | string | Entitlements file path; exclusive with the previous option |

Hooks: `after_checkout`, `before_install_node_modules`, `after_install_node_modules`.

## Notes

- Distinct from GitHub Actions: pre-packaged jobs are Expo Workflows YAML job types, not GitHub Actions actions. See github-docs for GitHub Actions.
- Maestro tests are alpha per the official page.
- General hook syntax (`jobs.<job_id>.hooks`) is in the syntax page. Custom builds are described in the official Custom builds docs.
- The Email example is a verbatim fragment from the official page: `needs.build_ios_simulator` refers to a `build_ios_simulator` job defined elsewhere in the same workflow, so `send_email` must list it under `needs` (and use `after` with a failure condition if the email is only a failure notification) when assembled into a full workflow.
- Only the syntax, parameters, outputs, and hooks sections are reproduced; the official page also has example workflows for each job (build with environment variables, deploy on merges, get-build lookups, Slack Block Kit, GitHub comment modes, approval flows, fingerprint with repack).
- Source: https://docs.expo.dev/eas/workflows/pre-packaged-jobs/ (docs/pages/eas/workflows/pre-packaged-jobs.mdx at tag expo@58.0.25). The Email job, Maestro `maestro_version` defaults, update `branch` default, and the require-approval 30-day window come from this page.

## Related

- [Syntax for Expo Workflows](./workflows-syntax.md)
- [Custom functions in Expo Workflows](./workflows-custom-functions.md)
- [Manage workflow runs](./workflows-manage-runs.md)
- [Environment variables in Expo Workflows](./workflows-environment.md)
- [Distribute an iOS app with TestFlight](./testflight.md)
