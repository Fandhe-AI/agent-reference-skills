---
source: https://docs.cloud.google.com/secure-source-manager/docs/triggers-file-schema
---

# Secure Source Manager triggers file schema

A triggers file tells Secure Source Manager to run the steps of a Cloud Build config file on a push or pull request event. It is written in YAML and must be created in the default branch of the repository. Each trigger is identified by `name`.

## Signature / Usage

### Structure

```text
triggers:
- name: string
  project: string
  configFilePath: string
  eventType: string
  includedGitRefs: string
  ignoredGitRefs: string
  includedFiles: string
  ignoredFiles: string
  serviceAccount: string
  disabled: bool
  substitutions: map[string]string
- name: string
...
```

### Example

```yaml
triggers:
- name: presubmit-test
  project: my-project
  configFilePath: test.yaml
  eventType: pull_request
  includedGitRefs: ^main$
  ignoredGitRefs: .*log
  serviceAccount: projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
  includedFiles: .*
  ignoredFiles: my-file.txt
  disabled: false
- name: postsubmit-run
  project: my-project
  configFilePath: run.yaml
  eventType: push
  includedGitRefs: ^main$
  ignoredGitRefs: dev-branch
  serviceAccount: projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
  disabled: false
  substitutions:
    _NODE_VERSION_1: v6.9.1
    REPO_NAME: dev
```

## Options / Props

### Fields

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `name` | Required | | Alphanumeric characters and dashes; cannot start or end with a dash; fewer than 64 characters. |
| `project` | Optional | The Secure Source Manager project | Project where Cloud Build is enabled. |
| `configFilePath` | Optional | `.cloudbuild/cloudbuild.yaml` | Path to the Cloud Build configuration file. |
| `eventType` | Optional | `push` | `push` or `pull_request`, for the selected branches. |
| `includedGitRefs` | Optional | Empty (no restriction) | RE2 regular expression matching Git refs that trigger a build. If the ref is not excluded by `ignoredGitRefs`, it is checked here; if this field is non-empty and the ref does not match, no build starts. |
| `ignoredGitRefs` | Optional | Empty (no restriction) | RE2 regular expression matching Git refs that must not trigger a build. Checked first; a match means no build. |
| `serviceAccount` | Required | | Cloud Build service account for the build, format `projects/PROJECT_ID/serviceAccounts/ACCOUNT` (`ACCOUNT` is the email or unique ID). |
| `includedFiles` | Optional | Empty (no restriction) | RE2 regular expression matching changed files that trigger a build, if the changed files are not in `ignoredFiles`. |
| `ignoredFiles` | Optional | Empty (no restriction) | RE2 regular expression; commits that only include matching files do not trigger a build. |
| `disabled` | Optional | `false` | `true` or `false`. |
| `substitutions` | Optional | | Variables substituted into the Cloud Build config file at build time. |

### Default substitution variables

| Variable | Value |
|----------|-------|
| `TRIGGER_NAME` | Name associated with the trigger. |
| `COMMIT_SHA` | Commit ID associated with the trigger. |
| `REVISION_ID` | Commit ID associated with the trigger. |
| `SHORT_SHA` | First seven characters of `COMMIT_SHA`. |
| `REPO_NAME` | Name of the repository, for example `my-repo`. |
| `REPO_FULL_NAME` | Resource path of the repository, for example `projects/my-project/locations/us-central/repositories/test-repo`. |
| `REF_NAME` | Name of the branch or tag associated with the trigger. |
| `TRIGGER_BUILD_CONFIG_PATH` | Path to the build configuration file used during the build. |

## Notes

- Substitution names must begin with an underscore and contain only uppercase letters, underscores and numbers, or be one of the Secure Source Manager substitution variables above.
- The example overrides the default `REPO_NAME` through `substitutions`, as in the source.
- Branch protection rules can require successful status checks from specific triggers.
- Cloud Build config file fields and how substitutions are used in builds are in the Cloud Build pages of `gcp-devops` (Build configuration file schema, Substituting variable values).
- Source: https://docs.cloud.google.com/secure-source-manager/docs/triggers-file-schema (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-triggers-file.md](./create-triggers-file.md)
- [configure-branch-protection.md](./configure-branch-protection.md)
