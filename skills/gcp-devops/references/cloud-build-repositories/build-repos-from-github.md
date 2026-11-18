---
source: https://docs.cloud.google.com/build/docs/automating-builds/github/build-repos-from-github
---

# Build repositories from GitHub (2nd gen triggers)

Create Cloud Build triggers that run builds on pushes to a branch, new tags, or pull requests of a GitHub repository linked through a Cloud Build repositories (2nd gen) connection. This page covers the 2nd gen tab; the source also has 1st gen and Developer Connect tabs.

## Signature / Usage

### Create a GitHub trigger

Adapted (not in the official docs): the source writes `--branch-pattern=BRANCH_PATTERN # or --tag-pattern=TAG_PATTERN \`, where the `#` comments out the line continuation and breaks the command. Use `--tag-pattern=TAG_PATTERN` in place of `--branch-pattern` for tag triggers. `SERVICE-ACCOUNT` is written `SERVICE_ACCOUNT`.

```bash
gcloud builds triggers create github \
  --name=TRIGGER_NAME \
  --repository=projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME \
  --branch-pattern=BRANCH_PATTERN \
  --build-config=BUILD_CONFIG_FILE \
  --region=REGION \
  --service-account=SERVICE_ACCOUNT
```

## Options / Props

### Console trigger settings

| Setting | Description |
|---|---|
| Region | Region of the trigger. If the build config specifies a private pool, the region must match the pool's region; otherwise the default pool in the trigger's region is used. The repository's region must match the trigger's region. |
| Event | Push to a branch; Push new tag; Pull request. |
| Repository generation | Select **2nd generation**. |
| Branch / Tag | RE2 regular expression (https://github.com/google/re2/wiki/Syntax). |
| Configuration type | Autodetected (`cloudbuild.yaml` or `Dockerfile`), Cloud Build configuration file (yaml or json), Dockerfile, Buildpacks. Inline config is not available for `Dockerfile`. |
| Substitution variables | Optional trigger-specific substitutions for config-file builds. |
| Build logs | Optional; send build logs to GitHub. |
| Service account | Service account used when invoking the trigger. |

### Pull request comment control

| Console option | Behavior | `--comment-control` / API `commentControl` |
|---|---|---|
| Required except for owners and collaborators | Builds run automatically for owner or collaborator PRs; for external contributors only after an owner or collaborator comments `/gcbrun`. | `COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY` |
| Required | Builds run for any contributor only after an owner or collaborator comments `/gcbrun`, each time the PR changes. | `COMMENTS_ENABLED` |
| Not required | Builds run automatically for any contributor. | `COMMENTS_DISABLED` |

### gcloud flags for pull request triggers

| Flag | Description |
|---|---|
| `--pull-request-pattern=REGEX` | RE2 regex matched against the PR base branch. |
| `--comment-control=COMMENT_CONTROL` | One of the enum values above; default `COMMENTS_ENABLED`. |
| `--[no-]require-approval` | Require manual approval for triggered builds. |
| `--service-account=SERVICE_ACCOUNT` | Format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}`. |
| `--region=REGION` | Required for 2nd gen repositories; `global` is not supported. |

### GitHub-based trigger types

| Feature | Legacy triggers | GitHub triggers | GitHub Enterprise triggers |
|---|---|---|---|
| Builds on pushes | Yes | Yes | Yes |
| Builds on pull requests | No | Yes | Yes |
| Create via console | Yes | Yes | Yes |
| Create via Cloud Build API | No | Yes | Yes |
| Create via Cloud Build GitHub app | No | Yes | Yes |
| Build status in Google Cloud console | Yes | Yes | Yes |
| Build status on GitHub | No | Yes | Yes |

## Notes

- WARNING from the source: any user with read access to the repository can submit a pull request, which may execute a build that includes changes to the source code in the pull request. Gate builds on public repositories with manual approvals (https://docs.cloud.google.com/build/docs/automating-builds/approve-builds). Builds run with the trigger's service account (https://docs.cloud.google.com/build/docs/cloud-build-service-account#build_triggers); do not choose "Not required" for forks or public repositories.
- Only the service account specified on the trigger is used for triggered builds; a service account in the build config is ignored. If your organization policy allows the legacy Cloud Build service account you can leave the field blank, otherwise you must select a specific one; prefer a dedicated user-specified service account.
- Running builds started by a GitHub App pull request trigger are canceled when the pull request is closed. Running or not-yet-started builds are not canceled when a pull request is merged.
- The REST trigger example in the source (a `repository_event_config` JSON body POSTed to `v1/projects/PROJECT_ID/triggers`) is omitted: it contains a `//` comment and a stray `&quot;`. Per the Discovery document the API fields are `repositoryEventConfig.repository` (resource name of the repository), `repositoryEventConfig.pullRequest` / `push` (only one filter; `branch`, `invertRegex`, `tag` for push; `commentControl` for pull requests), and `repositoryType` is output only. Regional triggers are created at `v1/projects/PROJECT_ID/locations/REGION/triggers`; the legacy global path creates only global triggers.
- Data sharing with GitHub: project ID, trigger name, and build logs (only if the trigger sends logs). Projects with triggers created before August 2020 may need to click Enable on the Data sharing tab; enabling data sharing is not reversible and may temporarily break required status checks.
- Cloud Build is Google Cloud's managed build service; GitHub Actions workflows are in `github-docs`.
- Adapted from the official docs: the source's command line `--branch-pattern=BRANCH_PATTERN # or --tag-pattern=TAG_PATTERN \` (the `#` comment breaks the line continuation) is now `--branch-pattern=BRANCH_PATTERN \`, and `--service-account=SERVICE-ACCOUNT` is written `SERVICE_ACCOUNT`.
- `gcloud builds triggers create github` help (gcloud 593.0.0) is the source for the flag table: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create/github
- Source: https://docs.cloud.google.com/build/docs/automating-builds/github/build-repos-from-github (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo-github.md](./connect-repo-github.md)
- [repositories.md](./repositories.md)
