---
source: https://docs.expo.dev/eas/workflows/environment/
---

# Environment variables in EAS Workflows

Reference for the environment variables available inside EAS Workflows jobs, including the `env` context and additional worker variables.

## Signature / Usage

Read variables with `${{ env.NAME }}` interpolation, or as shell variables (`$NAME`) or `process.env.NAME` from a `run` step.

Adapted (not in the official docs): `run` uses a block scalar because the official one-line form contains ': ' inside a plain scalar, which YAML parsers reject.

```yaml
name: Print environment

jobs:
  print:
    steps:
      # Interpolated before the command runs.
      - run: |
          echo "Project: ${{ env.EAS_BUILD_PROJECT_ID }}"
      # Read from the shell environment at runtime.
      - run: |
          echo "Project: $EAS_BUILD_PROJECT_ID"
```

Define variables on a job and share a value with later steps:

```yaml
jobs:
  my_job:
    env:
      APP_VARIANT: staging
      COMMIT: ${{ github.sha }}
    steps:
      - run: set-env GENERATED_TAG "v$(date +%Y%m%d)"
      # `set-env` only affects later steps, so the value is available here.
      - run: echo "Tag is $GENERATED_TAG"
```

## Options / Props

### Precedence (highest first)

| Source | Description |
| --- | --- |
| Job `env` | Plain text variables set on the job with the `env` key |
| eas.json build profile `env` | For `build` jobs, the `env` of the profile selected by `params.profile` |
| EAS environment variables | Variables stored on EAS for the job's environment (`production`, `preview`, or `development`) |

### Contexts available through `${{ ... }}`

| Context | Description |
| --- | --- |
| `env` | Record of environment variables by name; available within a job's context, not at top level (not in `on` triggers) |
| `github` | Fields from the triggering GitHub event: `triggering_actor`, `event_name` (`pull_request`, `push`, `schedule`, `workflow_dispatch`), `sha`, `ref`, `ref_name`, `ref_type`, `commit_message`, `label`, `repository`, `repository_owner`, `event` (full GitHub webhook payload). With `eas workflow:run`, `event_name` is `workflow_dispatch` and other fields are empty |
| `inputs` | Inputs provided on manual `workflow_dispatch` runs; empty otherwise |
| `needs` | Upstream jobs listed in `needs`; each has `status` (`success`, `failure`, `skipped`) and `outputs` |
| `after` | Upstream jobs listed in `after` (whether or not they succeeded); same `status` and `outputs` shape |
| `steps` | Steps in the current job keyed by step `id`, exposing `outputs` set with `set-output`; only available within a job's steps |
| `metadata` | Build metadata for `build` jobs (`buildProfile`, `appVersion`, `appBuildVersion`, `sdkVersion`, `runtimeVersion`, `gitCommitHash`, `distribution`); empty object for jobs without build metadata |
| `workflow` | Current run: `id`, `name`, `filename`, `url` |
| `app_store_connect` | Present only for App Store Connect-triggered runs: `app`, `build_upload`, `app_version`, `external_beta`, `beta_feedback` |

Examples:

Adapted (not in the official docs): `run` uses a block scalar because the official one-line form contains ': ' inside a plain scalar, which YAML parsers reject.

```yaml
jobs:
  notify:
    needs: [build]
    steps:
      - run: |
          echo "Build status: ${{ needs.build.status }}"
```

```yaml
jobs:
  my_job:
    steps:
      - id: step_1
        run: set-output my_greeting "hello"
      - run: echo "${{ steps.step_1.outputs.my_greeting }}"
```

## Notes

- The official examples write these `run` values unquoted.
- The job environment decides which EAS environment variables a job can read: `build` jobs infer it from the build profile's `environment` in eas.json; `submit` jobs inherit it from the submitted build; `maestro` and `maestro-cloud` jobs default to `preview`; other jobs default to `production`. Override with `jobs.<job_id>.environment`.
- Job configuration (`params`, `if`, `outputs`, and the value of `env`) is interpolated before dispatch to a worker, where `env` contains only the EAS environment variables for the resolved environment. `run` commands are interpolated on the worker, where `env` reflects the full runtime environment. Read variables like `EAS_BUILD_ID` inside a `run` step, not in `params`.
- Values from secret or sensitive EAS environment variables are redacted in workflow logs.
- Avoid naming your own variables with the `EAS_` prefix so they do not shadow worker variables such as `EAS_BUILD_ID`, `EAS_BUILD_PROJECT_ID`, and `CI`. Workers also expose toolchain variables such as `HOME`, `PATH`, `LANG`, `ANDROID_HOME`, `ANDROID_SDK_ROOT`, and `JAVA_HOME`, whose values depend on the worker image and may change.
- `set-env` is on the worker `PATH`; it is the environment-variable counterpart of `set-output`.
- To inspect a context at runtime, pass it through the job `env` and print it quoted. Adapted (not verbatim): the official page uses `run: echo '${{ toJSON(github) }}'`, which interpolates untrusted event text such as commit messages directly into the shell, so a value containing `'` can break out of the quoting. Do not interpolate `${{ }}` values straight into `run`.

  ```yaml
  jobs:
    inspect:
      env:
        GITHUB_CONTEXT: ${{ toJSON(github) }}
      steps:
        - run: printf '%s\n' "${GITHUB_CONTEXT}"
  ```
- Source modificationDate: September 17, 2026 (fetched 2026-10-17). Distinct from GitHub Actions: the `github` context here mirrors GitHub event fields but the workflow syntax is EAS-specific; see github-docs for GitHub Actions.

## Related

- [Syntax for EAS Workflows](./workflows-syntax.md)
- [Using environment variables in EAS](./eas-environment-variables-usage.md)
- [Pre-packaged jobs in EAS Workflows](./workflows-pre-packaged-jobs.md)
