---
source: https://docs.cloud.google.com/secure-source-manager/docs/create-triggers-file
---

# Create a Secure Source Manager triggers file

A triggers YAML file automates Cloud Build builds on push and pull request events in a Secure Source Manager repository. It must be named `.cloudbuild/triggers.yaml` and committed to the repository's default branch; each trigger points at a Cloud Build build configuration file that lives in the branch being built.

## Signature / Usage

### `.cloudbuild/triggers.yaml`

```yaml
triggers:
- name: TRIGGER_NAME
  project: PROJECT_ID
  configFilePath: CLOUD_BUILD_CONFIG_PATH
  eventType: EVENT_TYPE
  ignoredGitRefs: IGNORED_GIT_REFS
  includedGitRefs: INCLUDED_GIT_REFS
  serviceAccount: SERVICE_ACCOUNT
  includedFiles: INCLUDED_FILES
  ignoredFiles: IGNORED_FILES
  disabled: DISABLED_BOOL
  substitutions:
    _VARIABLE_NAME: VARIABLE_VALUE
    OVERRIDE_VARIABLE_NAME: OVERRIDE_VARIABLE_VALUE
```

Steps: create the Cloud Build build config file in each branch you build from; switch to the default branch; create `.cloudbuild/triggers.yaml`; commit it to the default branch. Builds then start from the configuration in the file.

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `TRIGGER_NAME` | Alphanumeric characters and dashes; cannot start or end with a dash; fewer than 64 characters. |
| `PROJECT_ID` | Project where Cloud Build is enabled. Optional; default is the Secure Source Manager project. |
| `CLOUD_BUILD_CONFIG_PATH` | Build config file for the trigger. Optional; default `.cloudbuild/cloudbuild.yaml`. |
| `EVENT_TYPE` | `push` (push to the specified branches) or `pull_request` (pull request to the specified branches). Optional; default `push`. |
| `INCLUDED_GIT_REFS` | Optional RE2 regular expression for Git refs that trigger a build. Empty means no restriction. |
| `IGNORED_GIT_REFS` | Optional RE2 regular expression for Git refs that do not trigger a build. Empty means no restriction. Checked before `includedGitRefs`. |
| `SERVICE_ACCOUNT` | Service account for the build, `projects/PROJECT_ID/serviceAccounts/ACCOUNT` (`ACCOUNT` is the email or unique ID). The default Cloud Build service account or a user-managed service account can be used; the legacy Cloud Build service account cannot. |
| `INCLUDED_FILES` | Optional RE2 expression. A build starts if any changed file does not match `ignoredFiles` and the changed files match `includedFiles`. Empty means no restriction. |
| `IGNORED_FILES` | Optional RE2 expression. If all changed files in a commit match, no build starts. Empty means no restriction. |
| `DISABLED_BOOL` | `true` disables the trigger, `false` enables it. Optional; default `false`. |
| `_VARIABLE_NAME` / `OVERRIDE_VARIABLE_NAME` | User-defined substitution (starts with `_`) or an override of a Secure Source Manager default substitution variable. |

### Build status values shown in the web interface

| Status | Meaning |
|--------|---------|
| SUCCESS | The build completed successfully. |
| WARNING | A problem occurred when trying to build. |
| FAILURE | The build failed during execution. |

## Notes

- Required roles: `roles/securesourcemanager.instanceAccessor` on the instance and `roles/securesourcemanager.repoWriter` on the repository.
- For `push` events Secure Source Manager reads the commit SHA or Git ref when the push completes; for `pull_request` events it reads the commit SHA or Git ref the pull request changes are pulled from.
- Build status appears next to the commit SHA (push) or in the pull request checks section (**All checks were successful** / **Some checks reported warnings**). A branch protection rule can require successful status checks from triggers in this file.
- The triggers file schema page marks `serviceAccount` as required; supply it. Prefer a user-managed service account with least privilege; builds run with its permissions.
- Cloud Build itself (build config schema, service accounts, substitutions) is described in the Cloud Build pages of `gcp-devops`.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/create-triggers-file (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers-file-schema.md](./triggers-file-schema.md)
- [configure-branch-protection.md](./configure-branch-protection.md)
- [create-repository.md](./create-repository.md)
