---
source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/build-repos-from-gitlab
---

# Build repositories from GitLab (2nd gen triggers)

Create Cloud Build triggers that run builds on pushes to a branch, new tags, or merge requests of a GitLab repository linked through a Cloud Build repositories (2nd gen) connection. The source page has 2nd gen and Developer Connect tabs; this page covers the 2nd gen tab.

## Signature / Usage

### Create a GitLab trigger

Adapted (not in the official docs): the source writes `--branch-pattern=BRANCH_PATTERN # or --tag-pattern=TAG_PATTERN \`, where the `#` comments out the line continuation and breaks the command. Use `--tag-pattern=TAG_PATTERN` in place of `--branch-pattern` for tag triggers. `SERVICE-ACCOUNT` is written `SERVICE_ACCOUNT`.

```bash
gcloud builds triggers create gitlab \
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
| Region | Region of the trigger. With a private pool in the build config, the region must match the pool's region; otherwise the default pool in the trigger's region is used. The repository's region must match the trigger's region. |
| Event | Push to a branch; Push new tag; Pull request (commits to a merge request). |
| Repository generation | Select **2nd generation**. |
| Branch / Tag | RE2 regular expression (https://github.com/google/re2/wiki/Syntax). |
| Configuration type | Cloud Build configuration file (yaml or json) or Dockerfile. Inline config is not available for `Dockerfile`. |

### Pull request comment control

| Console option | Behavior | `--comment-control` / API `commentControl` |
|---|---|---|
| Required except for owners and collaborators | Automatic for owner / collaborator changes; external contributors only after an owner or collaborator comments `/gcbrun`. | `COMMENTS_ENABLED_FOR_EXTERNAL_CONTRIBUTORS_ONLY` |
| Required | Any contributor's PR builds only after an owner or collaborator comments `/gcbrun`, each time the PR changes. | `COMMENTS_ENABLED` |
| Not required | Builds run automatically for any contributor. | `COMMENTS_DISABLED` |

### gcloud flags for pull request triggers

| Flag | Description |
|---|---|
| `--pull-request-pattern=REGEX` | RE2 regex matched against the PR base branch. |
| `--comment-control=COMMENT_CONTROL` | One of the enum values above; default `COMMENTS_ENABLED`. |
| `--[no-]require-approval` | Require manual approval for triggered builds. |
| `--service-account=SERVICE_ACCOUNT` | Format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT_ID_OR_EMAIL}`. |

## Notes

- WARNING from the source: any user with read access to the repository can submit a pull request, which may execute a build with the pull request's source changes. Gate builds on public repositories with manual approvals (https://docs.cloud.google.com/build/docs/automating-builds/approve-builds). Builds run with the trigger's service account (https://docs.cloud.google.com/build/docs/cloud-build-service-account#build_triggers); do not choose "Not required" for forks or public repositories.
- Prerequisites: connect the GitLab host and repository first; Cloud Build and Secret Manager APIs enabled.
- The REST trigger example in the source (a `repository_event_config` JSON with `"repository_type": "GITLAB"` POSTed to `v1/projects/PROJECT_ID/triggers`) is omitted: it contains a `//` comment, `GITLAB` is not a `repositoryType` enum value (the Discovery enum has `GITLAB_ENTERPRISE`), and `repositoryType` is output only. Fields are `repositoryEventConfig.repository` (resource name), and one of `pullRequest` / `push`. Regional triggers are created at `v1/projects/PROJECT_ID/locations/REGION/triggers`.
- Data sharing with GitLab: Google Cloud project ID and trigger name.
- Adapted from the official docs: the source's command line `--branch-pattern=BRANCH_PATTERN # or --tag-pattern=TAG_PATTERN \` (the `#` comment breaks the line continuation) is now `--branch-pattern=BRANCH_PATTERN \`, and `--service-account=SERVICE-ACCOUNT` is written `SERVICE_ACCOUNT`.
- The source also shows the Console form (omitted). Flag table: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/create/gitlab
- Source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/build-repos-from-gitlab (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-host-gitlab.md](./connect-host-gitlab.md)
- [connect-repo-gitlab.md](./connect-repo-gitlab.md)
- [build-repos-from-github.md](./build-repos-from-github.md)
