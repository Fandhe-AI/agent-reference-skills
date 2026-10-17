---
source: https://docs.expo.dev/eas/workflows/syntax/
---

# Syntax for EAS Workflows

Reference for the EAS Workflows configuration file syntax (`.eas/workflows/*.yml`).

## Signature / Usage

Workflow files use YAML, must have a `.yml` or `.yaml` extension, must be 16 KiB or smaller, and live in `.eas/workflows/` next to `eas.json`.

```yaml
name: Deploy
run_name: Deploy ${{ inputs.environment }}

on:
  push:
    branches: ['main']
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options:
          - preview
          - production
        required: true

defaults:
  tools:
    node: latest

concurrency:
  cancel_in_progress: true
  group: ${{ workflow.filename }}-${{ github.ref }}

jobs:
  test:
    steps:
      - uses: eas/checkout
      - uses: eas/use_npm_token
      - uses: eas/install_node_modules
      - name: tsc
        run: yarn tsc
  build:
    needs: [test] # only runs if 'test' succeeds
    type: build
    params:
      platform: ios
```

## Options / Props

### Top-level keys

| Key | Description |
| --- | --- |
| `name` | Human-friendly workflow name shown on the EAS dashboard |
| `run_name` | Title of an individual run; string with `${{ }}` expressions (contexts `github`, `app_store_connect`, `inputs`, `workflow`, `app`, `account`; no `success()`, `failure()`, `hashFiles()`); rendered text over 255 characters is truncated to 254 plus an ellipsis; an unsupported context makes the run store an error and no custom title |
| `on` | Triggers. Any workflow can also be run with `eas workflow:run` regardless of `on` |
| `jobs` | One or more jobs |
| `defaults` | Defaults for all jobs: `hooks`, `image`, `run.working_directory`, `tools` |
| `concurrency` | `cancel_in_progress` (boolean or expression; cancels in-progress runs for the same branch) and `group` (placeholder; custom groups not supported yet) |

### Triggers (`on`)

| Trigger | Properties |
| --- | --- |
| `push` | `branches` (default `['*']` if neither `branches` nor `tags`), `tags` (default `[]`), `paths`, `if`. Globs supported; `!` prefix ignores (need at least one non-negated pattern) |
| `ref_delete` | `branches`, `tags`, `if`. Requires a linked GitHub repository; the workflow file is read from the default branch HEAD at deletion time |
| `pull_request` | `branches` (default `['*']`), `types` (default `opened`, `reopened`, `synchronize`; supported: `opened`, `edited`, `base_ref_changed`, `ready_for_review`, `reopened`, `synchronize`, `labeled`), `paths`, `if`. Fork PRs do not trigger runs |
| `pull_request_labeled` | `labels` (default `[]`; may also be given directly as a list), `if` |
| `pull_request_comment` | `types` (default `['created']`; `created`, `edited`, `deleted`), `if`. Open, unmerged PRs only; no `branches` / `paths` filter; fork PRs do not trigger |
| `app_store_connect` | At least one domain: `app_version.states`, `build_upload.states` (`complete`, `failed`, `processing`, `awaiting_upload`), `external_beta.states`, `beta_feedback.types` (`crash`, `screenshot`); each domain accepts `if`. Filter values are lowercase and case-sensitive. Requires the App Store Connect connection in the EAS dashboard |
| `schedule` | `cron` list (unix-cron). Paid plans; only runs from the default branch; GMT time zone; may be delayed under high load |
| `workflow_dispatch` | `inputs` (see below) |

`app_version.states`: `accepted`, `developer_rejected`, `in_review`, `invalid_binary`, `metadata_rejected`, `pending_apple_release`, `pending_developer_release`, `prepare_for_submission`, `processing_for_distribution`, `ready_for_distribution`, `ready_for_review`, `rejected`, `replaced_with_new_version`, `waiting_for_export_compliance`, `waiting_for_review`.

`external_beta.states`: `processing`, `processing_exception`, `missing_export_compliance`, `ready_for_beta_testing`, `in_beta_testing`, `expired`, `ready_for_beta_submission`, `in_export_compliance_review`, `waiting_for_beta_review`, `in_beta_review`, `beta_rejected`, `beta_approved`.

`on.<trigger>.if`: boolean or an expression string (with or without `${{ }}`), at most 250 characters, in one `${{ }}` block; a false condition means no run starts (retries skip the check). Example: `if: ${{ !github.event.pull_request.draft }}`.

### `workflow_dispatch.inputs`

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `string` | yes | `string`, `boolean`, `number`, `choice`, or `environment` |
| `description` | `string` | no | Description for the input |
| `required` | `boolean` | no | Defaults to `false` |
| `default` | varies | no | Must match the input type |
| `options` | `string[]` | yes for `choice` | Available options |

Provide inputs with `-F key=value` flags, JSON via stdin, or interactive prompts:

```sh
eas workflow:run .eas/workflows/deploy.yml -F environment=production -F debug=true -F version=1.2.3
```

### Job keys

| Key | Description |
| --- | --- |
| `jobs.<job_id>` | Unique ID within the workflow (alphanumerics and underscores) |
| `name` | Human-friendly job name |
| `type` | Pre-packaged job type: `build`, `deploy`, `fingerprint`, `get-build`, `submit`, `testflight`, `update`, `update-rollout`, `branch-delete`, `maestro`, `maestro-cloud`, `slack`, `github-comment`, `apple-device-registration-request`, `require-approval`, `doc`, `repack` |
| `params` | Parameters of the pre-packaged job |
| `environment` | EAS environment: `production`, `preview`, or `development` |
| `env` | Job environment variables (not available on `apple-device-registration-request`, `branch-delete`, `doc`, `get-build`, `github-comment`, `require-approval`, `slack`, `update-rollout`) |
| `hooks` | Steps before/after the main action for `build`, `deploy`, `fingerprint`, `maestro`, `maestro-cloud`, `repack`, `submit`, `testflight`, `update`; hook names are job-specific. `defaults.hooks` sets defaults; a job-level key overrides the same default key; an empty array opts a job out |
| `needs` | Job IDs that must succeed first |
| `after` | Job IDs that must finish (success or not) first |
| `if` | Skips the job when false; downstream jobs that list it in `needs` do not run |
| `steps` | Only on custom jobs and `build` jobs |
| `outputs` | Outputs for downstream jobs: `needs.<job_id>.outputs.<name>` / `after.<job_id>.outputs.<name>` |
| `image` | VM image, `auto` by default (`sdk-XX` tags recommended) |
| `runs_on` | Custom jobs and `build`, `maestro`, `maestro-cloud`, `repack`: `linux-medium` (default), `linux-large`, `linux-medium-nested-virtualization`, `linux-large-nested-virtualization`, `macos-medium`, `macos-large` |
| `defaults.run.working_directory` | Directory for all steps in the job |

Workers: `linux-medium` 4 vCPU / 16 GiB / 14 GiB SSD; `linux-large` 8 vCPU / 32 GiB / 28 GiB; `linux-medium-nested-virtualization` 4 vCPU / 16 GiB / 14 GiB; `linux-large-nested-virtualization` 4 vCPU / 32 GiB / 28 GiB; `macos-medium` 5 efficiency cores / 20 GiB / 125 GiB; `macos-large` 10 / 40 GiB / 125 GiB. Android Emulator jobs need a `linux-*-nested-virtualization` worker; iOS builds and simulator jobs need a `macos-*` worker.

### `defaults.tools`

| Tool | Description |
| --- | --- |
| `node` | Node.js version installed via `nvm` |
| `yarn` | Yarn version installed via `npm -g` |
| `corepack` | `true` enables corepack at the start of the build; defaults to false |
| `pnpm` | pnpm version installed via `npm -g` |
| `bun` | Bun version installed by passing `bun-v$VERSION` to the Bun install script |
| `ndk` | Android NDK version installed through `sdkmanager` |
| `bundler` | Version passed to `gem install -v` |
| `fastlane` | Version passed to `gem install -v` |
| `cocoapods` | Version passed to `gem install -v` |

### Steps (custom jobs and build jobs)

| Key | Description |
| --- | --- |
| `id` | References the step (`steps.<id>.outputs.<name>`) |
| `name` | Display name in logs; the `run` command if omitted |
| `run` | Shell command |
| `shell` | Defaults to `bash` |
| `working_directory` | Overrides the job's `defaults.run.working_directory` |
| `uses` | Built-in `eas/*` function, or a custom function path starting with `./` or `../` |
| `with` | Inputs for the function |

Built-in functions: `eas/checkout` (input `ref`: branch, qualified tag, or full commit SHA; shallow fetch; set on the job's first checkout step only; needs a Git-based project source), `eas/install_node_modules`, `eas/download_build`, `eas/prebuild`, `eas/restore_cache`, `eas/save_cache`, `eas/send_slack_message`, `eas/use_npm_token`, `eas/upload_artifact`, `eas/download_artifact`, `eas/posthog_capture_event`, `eas/posthog_flag_rollout`, `eas/posthog_wait_for_metric`, `eas/posthog_wait_for_query`, `eas/posthog_annotation`, `eas/posthog_upload_sourcemaps`.

### Interpolation contexts and functions

Use `${{ expression }}`. Contexts: `after`, `needs`, `steps`, `inputs`, `github`, `workflow` (`id`, `name`, `filename`, `url`), `app` (`id`, `slug`), `account` (`id`, `name`), `app_store_connect`, `env`. `steps`, `env`, and `hashFiles` are only available within a job.

| Function | Description |
| --- | --- |
| `success()` / `failure()` | Whether all previous jobs succeeded / any previous job failed |
| `fromJSON(value)` / `toJSON(value)` | `JSON.parse` / `JSON.stringify` |
| `contains(value, substring)`, `startsWith(value, prefix)`, `endsWith(value, suffix)` | String checks |
| `hashFiles(...globs)` | Hash of files matching globs (useful for cache keys); only within a job's steps |
| `replaceAll(input, stringToReplace, replacementString)` | Replace all occurrences |
| `substring(input, start, end)` | Uses `String#substring`; `end` is optional |

### Custom function schema (`function.yml`)

Top-level properties: `name`, `description`, `inputs`, `outputs`, `runs` (unknown properties are rejected). `runs.steps` is required with at least one step.

| `inputs` property | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | yes | Read as `${{ inputs.<name> }}` (shorthand: list of names → optional string inputs) |
| `type` | `string` | no | `string`, `boolean`, `number`, or `json`; default `string` |
| `default_value` | varies | no | Must match `type` |
| `allowed_values` | array | no | Allowed values |
| `required` | `boolean` | no | Default `false` |

`outputs` is a map: `value` (required expression) and `description`.

### Built-in shell functions

```sh
set-output <name> <value>
set-env <name> <value>
```

`set-output` sets an output readable by other steps (`steps.<id>.outputs.<name>`) or, via the job's `outputs`, by other jobs. `set-env` exposes an environment variable to subsequent steps in the same job only (not the current step; call `export` yourself if needed). To share a value between jobs, use job `outputs` and pass it via `env` on the receiving job:

```yaml
jobs:
  job_1:
    outputs:
      my_value: ${{ steps.step_1.outputs.my_value }}
    steps:
      - id: step_1
        run: set-output my_value "value from job_1"

  job_2:
    needs: [job_1]
    env:
      MY_VALUE: ${{ needs.job_1.outputs.my_value }}
    steps:
      - run: echo "MY_VALUE: $MY_VALUE"  # prints: value from job_1
```

## Notes

- Distinct from GitHub Actions: this syntax is specific to EAS Workflows. The `github` context exists to ease migration from GitHub Actions. See github-docs for GitHub Actions workflow syntax.
- Skip `push` and `pull_request` triggered runs by including `[eas skip]`, `[skip eas]`, or `[no eas]` in the commit message.
- Custom function call steps accept `id`, `name`, `with`, `if`, `env`; the path must be a static literal without `${{ }}` or backslashes; do not set `working_directory` on the call step.
- Per-job parameters and outputs of the pre-packaged jobs are documented in the pre-packaged jobs page. The `github` and `app_store_connect` context field lists are in the environment page; this page lists them only by name.
- The built-in function details for `eas/*` (inputs of cache, artifact, Slack, npm token, and PostHog functions) are not reproduced here; see the official page.
- Source modificationDate: October 12, 2026 (fetched 2026-10-17).

## Related

- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
- [Custom functions in EAS Workflows](./workflows-custom-functions.md)
- [Environment variables in EAS Workflows](./workflows-environment.md)
- [EAS Workflows limitations](./workflows-limitations.md)
