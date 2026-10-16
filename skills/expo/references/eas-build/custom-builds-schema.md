---
source: https://docs.expo.dev/custom-builds/schema/
---

# Custom build configuration schema

A reference of configuration options for custom builds with EAS Build.

## Signature / Usage

Custom build config files are stored inside the **.eas/build** directory. They use YAML syntax and must have a `.yml` or `.yaml` extension. Top-level keys are `build`, `functions` and `import`.

```yaml
build:
  name: Run tests
  steps:
    - eas/checkout
    - run:
        name: Install dependencies
        command: npm install
    - run:
        name: Run tests
        working_directory: assets
        shell: /bin/sh
        command: |
          echo "Running tests..."
          npm test

functions:
  greetings:
    name: Say Hi!
    supported_platforms: [darwin]
    inputs:
      - name: name
        type: string
        default_value: Hello world
        allowed_values: [Hi, Hello, Hey]
        required: false
    outputs:
      - name: value
        required: false
    command: echo "${ inputs.name }!"

import:
  - common-functions.yml
```

Reference it from a build profile in **eas.json** with `config`:

```json
{
  "build": {
    "developmentBuild": {
      "distribution": "internal",
      "android": { "config": "development-build-android.yml" },
      "ios": { "simulator": true, "config": "development-build-ios.yml" }
    }
  }
}
```

## Options / Props

### `build`

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | Name of the custom build, shown in build logs and the dashboard. |
| `steps` | list | Required; at least one step. Executed sequentially. Each step is a `run` object, a function call, or a shell string (`- run: echo "Hello world"`). |
| `steps[].run.name` | string | Name displayed in build logs. |
| `steps[].run.command` | string | Required. Shell command (can be multiline). |
| `steps[].run.working_directory` | string | Existing directory relative to the project root; changes the current directory for the step. |
| `steps[].run.shell` | string | Default executable shell for the step (for example `/bin/sh`). |
| `steps[].run.inputs` | map | Input values for the step; read with `${ inputs.name }`. |
| `steps[].run.outputs` | list | Outputs expected from the step (strings, or objects with `name` and `required: false`). Produced with `set-output <name> <value>`. |
| `steps[].run.id` | string | Allows calling the same function multiple times and reading outputs from other steps with `${ steps.<id>.<output> }`. |

### `functions.[function_name]`

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | Name displayed in build logs. |
| `inputs[].name` | string | Identifier of the input value. |
| `inputs[].required` | boolean | Whether the input is required. |
| `inputs[].type` | string | `string`, `num` or `json`. Default is `string`. Values, `default_value` and `allowed_values` are validated against the type. |
| `inputs[].default_value` | any | Default value. |
| `inputs[].allowed_values` | array | Allowed values. |
| `outputs[].name` | string | Identifier of the output value. |
| `outputs[].required` | boolean | Whether the output is required. |
| `command` | string | Shell script to run. Each function must define either `command` or `path`. |
| `path` | string | Path to a JavaScript/TypeScript module implementing the function. |
| `shell` | string | Default executable shell for the step. |
| `supported_platforms` | array | Allowed: `darwin`, `linux`. Defaults to all platforms. |

### `import`

A list of config file paths used to import functions from other config files. Imported files cannot have the `build` section.

### Overriding values in a call

`working_directory`, `name` and `shell` can be overridden when calling a function:

```yaml
build:
  name: List files
  steps:
    - eas/checkout
    - list_files:
        working_directory: /a/b/c
```

### Built-in EAS functions

Built-in functions must start with the `eas/` prefix.

| Function | Platform | Purpose and inputs (as documented) |
| --- | --- | --- |
| `eas/build` | both | All-in-one function encapsulating the whole EAS Build process, resolved from the build profile in eas.json. Accepts no inputs and is not configurable. |
| `eas/maestro_test` | both | Installs Maestro, prepares an emulator/simulator and tests the app. Inputs: `flow_path` (required), `app_path` (default `android/app/build/outputs/**/*.apk` or `ios/build/Build/Products/*simulator/*.app`). Android Emulator requires the old Build Infrastructure (project settings). |
| `eas/checkout` | both | Checks out project source files. Input `ref`: Git branch, tag (`refs/tags/v1.2.3`) or full commit SHA; works only with Git-based project sources; place before `eas/build`. |
| `eas/use_npm_token` | both | Configures package managers for private packages by writing **.npmrc** from the `NPM_TOKEN` secret. |
| `eas/install_node_modules` | both | Installs node_modules with the detected package manager (bun, npm, pnpm, Yarn). Works with monorepos. |
| `eas/restore_build_cache` | both | Inputs: `key` (required), `restore_keys`, `path` (required). |
| `eas/save_build_cache` | both | Inputs: `key` (required), `path` (required). |
| `eas/resolve_build_config` | both | Resolves and prints the build configuration; run after installing dependencies. Run automatically by `eas/build`. |
| `eas/get_credentials_for_build_triggered_by_github_integration` | both | Deprecated. Replace with `eas/resolve_build_config`. |
| `eas/resolve_apple_team_id_from_credentials` | iOS | Input `credentials` (json, default `${ eas.job.secrets.buildCredentials }`). Output `apple_team_id`. |
| `eas/prebuild` | both | Runs `expo prebuild`. Inputs: `clean` (boolean, default false), `apple_team_id`. |
| `eas/configure_eas_update` | both | Requires EAS Update. Inputs: `runtime_version`, `channel`. |
| `eas/inject_android_credentials` | Android | Configures the keystore and injects the signing config into Gradle. Input `credentials`. |
| `eas/configure_ios_credentials` | iOS | Assigns provisioning profiles to Xcode targets. Inputs: `build_configuration`, `credentials`. |
| `eas/configure_android_version` | Android | Sets version for remote app version management. Inputs: `version_code`, `version_name`. |
| `eas/configure_ios_version` | iOS | Sets version for remote app version management. Inputs: `build_number`, `app_version`, `build_configuration`, `credentials`. |
| `eas/run_gradle` | Android | Runs a Gradle command. Input `command` (for example `:app:bundleRelease`). |
| `eas/generate_gymfile_from_template` | iOS | Generates a Fastlane `Gymfile` from a template. Inputs: `template`, `credentials`, `build_configuration`, `scheme`, `clean` (default true), `extra`. |
| `eas/run_fastlane` | iOS | Runs `fastlane gym` against the Gymfile in the `ios` directory. |
| `eas/find_and_upload_build_artifacts` | both | Finds and uploads the application archive, additional artifacts (via `buildArtifactPaths`) and Xcode logs. |
| `eas/upload_embedded_bundle` | both | Uploads the embedded bundle for EAS Update patches. Input `ignore_error` (default false). Skipped when EAS Update is not configured, for development builds, and for iOS Simulator builds. |
| `eas/upload_artifact` | both | Inputs: `path` (required), `type` (default `other` in custom jobs, `application-archive` in build jobs), `name`, `metadata`, `ignore_error`. Output `artifact_id`. |
| `eas/install_maestro` | both | Input `maestro_version`. |
| `eas/start_android_emulator` | Android | Inputs: `device_name`, `system_image_package` (for example `system-images;android-30;default;x86_64`). |
| `eas/start_ios_simulator` | iOS | Input `device_identifier`. |
| `eas/send_slack_message` | both | Inputs: `message` or `payload` (Slack Block Kit; exactly one), `slack_hook_url` (or the `SLACK_HOOK_URL` environment variable). |
| `eas/posthog_capture_event` | both | Inputs: `event` (required), `distinct_id`, `properties`, `api_key`, `host`, `ignore_error`. |
| `eas/posthog_flag_rollout` | both | Inputs: `flag` (required), `active`, `rollout_percentage`, `payload`, `variant`, `api_key`, `project_id`, `ignore_error`. |
| `eas/posthog_wait_for_metric` | both | Inputs: `query`, `operator` (`lt`, `lte`, `gt`, `gte`, `eq`), `threshold`, `timeout_seconds` (600), `interval_seconds` (30), `api_key`, `project_id`. Output `value`. |
| `eas/posthog_wait_for_query` | both | Inputs: `query`, `timeout_seconds` (600), `interval_seconds` (30), `api_key`, `project_id`. |
| `eas/posthog_annotation` | both | Inputs: `content` (required), `date_marker`, `api_key`, `project_id`, `ignore_error`. |
| `eas/posthog_upload_sourcemaps` | both | Inputs: `directory` (default `dist`), `api_key`, `project_id`, `ignore_error`. |

Example calls:

```yaml
build:
  name: Build and test
  steps:
    - eas/build
    - eas/maestro_test:
        inputs:
          flow_path: |
            maestro/sign_in.yml
            maestro/create_post.yml
    - eas/upload_artifact:
        name: Upload test artifact
        if: ${ always() }
        inputs:
          type: build-artifact
          path: ${ eas.env.HOME }/.maestro/tests
```

## Notes

- Environment variables exported with `export` in one step are not available in other steps. Use the `set-env <name> <value>` executable to share a variable with following steps; variables shared with `set-env` are not automatically exported locally.
- You can currently upload each artifact type only once per build job. If `eas/find_and_upload_build_artifacts` uploads artifacts while `buildArtifactPaths` is configured in the profile, a following `eas/upload_artifact` step fails; remove `buildArtifactPaths` from custom build profiles and upload manually.
- `eas/build` steps differ by platform and credentials (for example Android with `withoutCredentials`, and iOS with `simulator`, omit credential-injection and version steps). Do not add `eas/upload_embedded_bundle` to a config that uses `eas/build` while the upload is enabled; a second upload of the same bundle fails the step.
- iOS Gymfile template placeholders: `CLEAN`, `SCHEME`, `BUILD_CONFIGURATION`, `EXPORT_METHOD`, `PROFILES`, `ICLOUD_CONTAINER_ENVIRONMENT`, `KEYCHAIN_PATH`, `LOGS_DIRECTORY`, `OUTPUT_DIRECTORY`, `DERIVED_DATA_PATH`, `SCHEME_SIMULATOR_DESTINATION`.
- Maestro tests often time out on images with Xcode 15.0 or 15.2; use the `latest` image.
- PostHog functions read variables set by `eas integrations:posthog:connect`. `eas/posthog_upload_sourcemaps` with `ignore_error: true` also hides authentication and scope errors.
- This page documents the built-in functions in condensed form; the full per-function source links are in the official page (github.com/expo/eas-cli, packages/build-tools).
- Source modificationDate: October 07, 2026 (fetched 2026-10-17).

## Related

- [TypeScript functions](./custom-builds-functions.md)
- [Configure EAS Build with eas.json](./build-eas-json.md)
- [App version management](./app-versions.md)
