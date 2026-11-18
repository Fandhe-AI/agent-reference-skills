---
source: https://docs.cloud.google.com/build/docs/manually-build-code-source-repos
---

# Manually build code in source repositories (manual triggers)

A manual trigger runs a build only when you invoke it, fetching source from a hosted repository branch or tag, applying trigger substitutions, and letting you override substitution values at invocation time. Manual triggers can also be scheduled with Cloud Scheduler.

## Signature / Usage

### Build from a local directory without a trigger

```bash
gcloud builds submit --config BUILD_CONFIG SOURCE_CODE
```

`BUILD_CONFIG` is the path to the build config file; `SOURCE_CODE` is the path or URL of the source.

### Create a manual trigger (gcloud)

```bash
gcloud builds triggers create manual \
  --region=REGION \
  --name=TRIGGER_NAME \
  --repository=projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME \
  --branch=BRANCH_NAME \
  --build-config=BUILD_CONFIG_FILE \
  --service-account=SERVICE_ACCOUNT
```

### Run a manual trigger (gcloud)

```bash
gcloud builds triggers run TRIGGER_NAME \
   --region=REGION \
   --branch=BRANCH_NAME \
   --substitutions=SUBSTITUTION_VAR=SUBSTITUTION_VALUE
```

## Options / Props

### Create flags

| Flag | Description |
|------|-------------|
| `--region` | Trigger region |
| `--name` | Trigger name |
| `--repository` | `projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME` (host connection and repository) |
| `--branch` | Branch name; alternatively `--tag` for a tag or `--sha` for a commit ID |
| `--build-config` | Path to the build config file; alternatively `--inline-config`, or a Dockerfile with `--dockerfile`, `--dockerfile-dir` and `--dockerfile-image` (the source writes `dockerfile-image`) |
| `--service-account` | Service account email; if omitted a default service account is used |

### Run flags

| Flag | Description |
|------|-------------|
| `TRIGGER_NAME` | Name of the trigger |
| `--region` | Trigger region |
| `--branch` | Branch; alternatively `--tag` or `--sha` |
| `--substitutions` | Optional `NAME=VALUE`; user-defined names start with `_` |

### Console region behaviour

| Region choice | Pool used |
|---------------|-----------|
| `global` | Default pool |
| Non-global, build config names a private pool | The private pool; the trigger region must match the pool region |
| Non-global, no private pool in the config | Default pool in the trigger's region |

### Console settings

| Setting | Description |
|---------|-------------|
| Event | Manual invocation |
| Source | Repository generation 2nd gen; the repository region must match the trigger region (a Cloud Source Repositories repository is tied to the project) |
| Branch or Tag | A literal value; regular expressions are not supported |
| Configuration type | Cloud Build configuration file (yaml or json) or Dockerfile; inline config is not available for Dockerfile |

## Notes

- Preview: the source marks "Manual triggers: Cloud Build repositories (2nd gen) support" as Preview, subject to the Pre-GA Offerings Terms (available "as is", limited support). In gcloud 593.0.0 the GA `gcloud builds triggers create manual` help already lists `--repository`; the source links the alpha reference.
- If you omit `--service-account` a default service account is used; this is not recommended. Prefer a user-specified service account with only the roles the trigger needs, which also needs a logs bucket configured (see the trigger creation page). The help documents the service account format `projects/PROJECT_ID/serviceAccounts/ACCOUNT_ID_OR_EMAIL`.
- When running a trigger in the console you can override branch, tag and substitution values but cannot add new fields or variables; use gcloud for that. If the repository has more than 500 branches or tags, some are missing from suggestions; enter the name manually.
- Cloud Source Repositories: effective June 17, 2024 it is unavailable to new customers; organizations that used it before that date are not affected.
- To run on a schedule see the schedule page. To build from the working directory or to submit builds without a trigger use `gcloud builds submit`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/build/docs/manually-build-code-source-repos (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [create-manage-triggers.md](./create-manage-triggers.md)
- [schedule-builds.md](./schedule-builds.md)
