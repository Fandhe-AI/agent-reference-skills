---
source: https://docs.cloud.google.com/build/docs/automating-builds/create-manage-triggers
---

# Create and manage build triggers

A trigger starts a build when the connected source repository changes, either on every change or only on changes that match criteria. This page covers connecting a repository, creating, testing, skipping, updating, disabling and deleting a trigger, and the security implications of trigger service accounts.

## Signature / Usage

### Prerequisites

- The Cloud Build Editor role (`roles/cloudbuild.builds.editor`) to create and manage triggers.
- The Cloud Build API enabled (`serviceusage.services.enable`, for example through Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- Source in Cloud Source Repositories, GitHub or Bitbucket, and a `Dockerfile` or a Cloud Build config file.
- Connecting an external repository (GitHub, Bitbucket) needs admin-level permissions on the repository and owner-level permissions on the Google Cloud project. Creating triggers in an already connected repository does not need repository admin permissions. Cloud Source Repositories repositories are connected by default.

### Create a trigger for Cloud Source Repositories

Adapted (not in the official docs): the source writes `\ # or --tag-pattern=TAG_PATTERN` on the `--branch-pattern` line, which breaks the line continuation; the alternative is described in Notes instead.

```bash
gcloud builds triggers create cloud-source-repositories \
  --repo=REPO_NAME \
  --branch-pattern=BRANCH_PATTERN \
  --build-config=BUILD_CONFIG_FILE \
  --service-account=SERVICE_ACCOUNT \
  --require-approval
```

### Create a trigger for GitHub

Adapted (not in the official docs): the source has no `\` after `--require-approval` (the next flag would run as a separate command) and a `\ # or --tag-pattern=TAG_PATTERN` comment on the `--branch-pattern` line; both were fixed.

```bash
gcloud builds triggers create github \
  --name=TRIGGER_NAME \
  --region=REGION \
  --repo-name=REPO_NAME \
  --repo-owner=REPO_OWNER \
  --branch-pattern=BRANCH_PATTERN \
  --build-config=BUILD_CONFIG_FILE \
  --service-account=SERVICE_ACCOUNT \
  --require-approval \
  --include-logs-with-status
```

Output (the name is generated if you do not pass `--name`):

```text
NAME         CREATE_TIME                STATUS
trigger-001  2019-10-30T20:45:03+00:00
```

### Update a trigger

Export, edit and import the trigger file.

Adapted (not in the official docs): `--region=REGION` (the region the trigger was created in) is added to the export, import and delete commands; without it gcloud uses the `builds/region` property, or `global` if that is unset.

```bash
gcloud beta builds triggers export TRIGGER_NAME --destination=EXPORT_PATH --region=REGION
```

```yaml
createTime: '2022-05-26T21:56:11.830784153Z'
filename: cloudbuild.yaml
github:
  name: cloud-build-example
  owner: main
  push:
    branch: master
id: 86201062-3b14-4b6a-a2fb-4ee924e8b1dd
# remove field name and value to not show build logs
includeBuildLogs: INCLUDE_BUILD_LOGS_WITH_STATUS
name: trigger-001
```

```bash
gcloud builds triggers import --source=IMPORT_PATH --region=REGION
```

### Disable a trigger

Export the trigger as above, add the `disabled` field at the end of the file, then import it.

```yaml
disabled: True
```

### Delete a trigger

```bash
gcloud builds triggers delete TRIGGER_NAME --region=REGION
```

### Include repository history

Builds use a shallow clone (only the commit that started the build). To fetch history add a step:

```yaml
steps:
- name: gcr.io/cloud-builders/git
  args: ['fetch', '--unshallow']
```

## Options / Props

### Trigger settings

| Setting | Description |
|---------|-------------|
| Name, Description | Trigger name and optional description |
| Region | Region of the trigger. If the build config names a private pool, the trigger region must match the pool's region. `global` makes Cloud Build use the region in the build config (the private pool's region, or the global default pool if no private pool is specified). When connecting a repository, selecting `global` uses default pools; any other region uses a private pool in that region, which you must specify in the build config or build arguments |
| Event | Push to a branch, Push new tag, Pull request |
| Source | 1st generation or 2nd generation. Only GitHub and GitHub Enterprise can be connected when 2nd generation is selected. The repository region must match the trigger region (a Cloud Source Repositories repository is tied to the project, not a region) |
| Branch or Tag | RE2 regular expression. Forward slashes (`/`) cannot be used in tags. The list shows suggestions; a 2nd gen repository with more than 500 branches or tags has some missing, so enter the regular expression manually |
| Included files | Optional globs; a change touching at least one starts a build. Supports Go `Match` wildcards, `**` and alternation. `src/*` matches `src/code.py` but not `src/sub/code.py`; `src/**` matches both. Only for push-to-branch and new-tag events |
| Ignored files | Optional globs; changes only affecting ignored files do not start a build. A file in both lists does not start a build. Substitution variables are not allowed in either glob list |
| Configuration type | Cloud Build configuration file (yaml or json), Dockerfile, or Buildpacks. Dockerfile and buildpacks need a resulting image name and optional timeout. Inline config is not available for Dockerfile or buildpacks |
| Private pool | For Dockerfile configs: `projects/WORKERPOOL_PROJECT_ID/locations/REGION/workerPools/WORKERPOOL_ID` |
| Substitution variables | Optional trigger-specific values when using a config file |
| Approval | Require approval before the build executes |
| Service account | The only service account used for triggered builds; a `serviceAccount` in the build config is ignored when a trigger starts the build |

### Included / ignored file evaluation

| Case | Behaviour |
|------|-----------|
| Push to an existing branch | Files changed between the pushed commit and the commit the branch previously pointed to |
| Push to a newly created branch (Cloud Source Repositories) | All files in the repository count as changed |
| Branch deleted | No build starts |

### gcloud flags used above

| Flag | Description |
|------|-------------|
| `--branch-pattern` / `--tag-pattern` | Branch or tag regular expression to build on (mutually exclusive) |
| `--build-config` | Path to the build config file |
| `--service-account` | Service account for trigger and build operations |
| `--require-approval` | Require approval for triggered builds |
| `--include-logs-with-status` | Show build logs on the repository; only for GitHub and GitHub Enterprise triggers, gcloud only (not in the console) |
| `--region` | Trigger region |
| `--repo-name`, `--repo-owner` | GitHub repository and owner |

## Notes

- Adapted from the official docs: the source omits the region from `export`, `import` and `delete`. A trigger created with `--region=REGION` is a regional resource, so the commands pass the same `--region`, or set the `builds/region` property.
- To use a tag instead of a branch, replace `--branch-pattern=BRANCH_PATTERN` with `--tag-pattern=TAG_PATTERN`.
- When a trigger starts a build, only the service account on the trigger is used. With your own service account you must store logs in a Cloud Logging bucket, a user-created Cloud Storage bucket, or a Google Cloud-created user-owned Cloud Storage bucket; Google Cloud-owned log buckets are not allowed. If `--service-account` is omitted the default Cloud Build service account is used, which is not recommended; create a service account with only the roles the trigger needs.
- The help for `gcloud builds triggers create github` documents the service account format `projects/PROJECT_ID/serviceAccounts/ACCOUNT_ID_OR_EMAIL`.
- `gcloud builds triggers export` exists only on the `beta` and `alpha` tracks in gcloud 593.0.0; `import`, `delete`, `run`, `describe` and `list` are GA. The source refers to the beta reference for `create` flags; the GA `create` commands above carry the same flags.
- Cloud Source Repositories: effective June 17, 2024 it is not available to new customers; if your organization had not used it before that date you cannot enable the API or use it. Organizations that used it before June 17, 2024 are not affected, so the `cloud-source-repositories` trigger example above applies only to those organizations.
- Source inconsistency: the Source row of the trigger settings table says only GitHub and GitHub Enterprise can be connected with 2nd generation, while the Cloud Build repositories overview (repositories.md in `cloud-build-repositories`) lists GitLab, Bitbucket Data Center and Bitbucket Cloud as supported for 2nd gen; the table is kept as the source writes it.
- Builds start only on pushes to the remote origin, not on local changes or pre-submits. If you rename a repository after creating a trigger, update the repository name in the trigger; builds are not redirected.
- Include `[skip ci]` or `[ci skip]` in a commit message to skip a build; run it later with Run on the Triggers page.
- Resubmit a rejected build for approval from the Cloud Build History page with Rebuild; the build starts after a user with permission approves it.
- Disabling through gcloud may not work if no build config file is associated with the trigger. Disabling does not delete the trigger; a trigger can be re-enabled by setting its status to Enabled.
- To remove `includeBuildLogs` (show or hide build logs) you must use gcloud; the console edits all other fields.
- Deleting a trigger is irreversible: try the commands on a disposable project first.
- Access to private Git repositories during `git fetch` needs credentials stored in Secret Manager (see "Accessing private GitHub repositories" in the Cloud Build docs).
- Only organization policy `constraints/cloudbuild.allowedIntegrations` can block builds from specific sources; the policy overrides the trigger and the build does not run.
- Security implications: the trigger's service account (the default Cloud Build service account or a user-specified one) can give elevated build-time permissions to anyone who uses the trigger. A user with no access to your Cloud project but with write access to the repository can change the code being built. With GitHub pull request triggers, any user with read access to the repository can submit a pull request that may run a build with the pull request's code; see the comment control setting when creating GitHub triggers. Use a dedicated service account with only the required roles.
- The source also shows Console steps for every task. Cloud Build is Google Cloud's managed build service; GitHub Actions workflows are covered by the `github-docs` skill. IAM and service accounts are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/build/docs/automating-builds/create-manage-triggers (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [gate-builds-on-approval.md](./gate-builds-on-approval.md)
- [manually-build-code-source-repos.md](./manually-build-code-source-repos.md)
