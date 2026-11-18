---
source: https://docs.cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts
---

# Configure user-specified service accounts for builds

Run builds as a user-managed service account instead of the default Cloud Build service account, which may have unnecessarily broad permissions (for example access to Cloud Source Repositories and any Cloud Storage bucket in the project). Follow least privilege: scope each service account to its task, for example one account that only builds and pushes images to Artifact Registry. When you specify your own account you must also configure where build logs are stored.

## Signature / Usage

### Build config with a user-specified service account

Run manually with `gcloud builds submit`. `serviceAccount` is paired with `logsBucket` and `options.logging: GCS_ONLY` (or use `logging: CLOUD_LOGGING_ONLY` for Cloud Logging).

```yaml
steps:
- name: 'bash'
  args: ['echo', 'Hello world!']
logsBucket: 'LOGS_BUCKET_LOCATION'
serviceAccount: 'projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT'
options:
  logging: GCS_ONLY
```

```bash
gcloud builds submit --config CONFIG_FILE_PATH SOURCE_DIRECTORY
```

If `CONFIG_FILE_PATH` and `SOURCE_DIRECTORY` are omitted, Cloud Build assumes the build config file and the source code are in the current working directory.

### Build config for a trigger (logging only)

Specify only the logging setup in the file; the service account is set on the trigger.

```yaml
steps:
- name: 'bash'
  args: ['echo', 'Hello world!']
logsBucket: 'LOGS_BUCKET_LOCATION'
options:
  logging: GCS_ONLY
```

### Create a trigger with a user-specified service account

Adapted (not in the official docs): added the missing `\` line continuations after `--branch-pattern=BRANCH_PATTERN` and `--build-config=BUILD_CONFIG_FILE`.

```bash
gcloud builds triggers create github \
   --name=TRIGGER_NAME \
   --repo-name=REPO_NAME \
   --repo-owner=REPO_OWNER \
   --branch-pattern=BRANCH_PATTERN \
   --build-config=BUILD_CONFIG_FILE \
   --service-account=SERVICE_ACCOUNT \
   --project=BUILD_PROJECT
```

### Cross-project setup

Allow a service account from another project to run builds (the constraint is enforced by default).

```bash
gcloud resource-manager org-policies disable-enforce \
   iam.disableCrossProjectServiceAccountUsage \
   --project=SERVICE_ACCOUNT_PROJECT_ID
```

Adapted (not in the official docs): the source grants `roles/iam.serviceAccountTokenCreator` on the whole project that contains the service account (`gcloud projects add-iam-policy-binding SERVICE_ACCOUNT_PROJECT_ID ...`). The grant is scoped here to the one service account (safety fix, least privilege) so the Cloud Build service agent cannot create tokens for every service account in that project.

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --project=SERVICE_ACCOUNT_PROJECT_ID \
    --member="serviceAccount:BUILD_SERVICE_AGENT" \
    --role="roles/iam.serviceAccountTokenCreator"
```

## Options / Props

| Placeholder | Meaning |
|---|---|
| `LOGS_BUCKET_LOCATION` | Cloud Storage bucket to store build logs, for example `gs://mylogsbucket` |
| `PROJECT_ID` | ID of the Google Cloud project where you run the build |
| `SERVICE_ACCOUNT` | Email address or unique ID of the service account, for example `service-account-name@project-id.iam.gserviceaccount.com`; for `--service-account` on a trigger use `projects/PROJECT_ID/serviceAccounts/ACCOUNT_ID_OR_EMAIL` |
| `TRIGGER_NAME` | Name of the build trigger |
| `REPO_NAME` / `REPO_OWNER` | Repository name / username of the repository owner |
| `BRANCH_PATTERN` | Branch name in the repository to invoke the build on |
| `BUILD_CONFIG_FILE` | Path to the build configuration file |
| `BUILD_PROJECT` | Project where builds are started |
| `SERVICE_ACCOUNT_PROJECT_ID` | Project that contains the user-managed service account |
| `SERVICE_ACCOUNT_EMAIL` | Email address of the user-managed service account (the `gcloud iam service-accounts add-iam-policy-binding` positional argument takes the email) |
| `BUILD_SERVICE_AGENT` | `service-BUILD_PROJECT_NUMBER@gcp-sa-cloudbuild.iam.gserviceaccount.com`, where `BUILD_PROJECT_NUMBER` is the number of the project where you run builds |

### Log storage options with a user-specified service account

| Location | Notes |
|---|---|
| Cloud Storage buckets in the user's project | User-created buckets, or Google Cloud-created and user-owned buckets |
| Cloud Logging buckets | Allowed |
| Google Cloud-owned log bucket | Not allowed |

## Notes

- Source: https://docs.cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Before you begin: enable the Cloud Build and IAM APIs (needs `serviceusage.services.enable`, for example through Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`); enable the IAM Service Account Credentials API if the account will create short-lived credentials; create the service account.
- If you do not specify a user-managed account, Cloud Build uses the default Cloud Build service account (see cloud-build-service-account.md).
- Set up in the console: Cloud Build **Permissions** page, choose the service account (**Switch project** for another project), optionally turn on **Set as pre-selected for new triggers**, and enable the IAM roles to grant. Roles not listed can be granted on the IAM page. Roles commonly required: https://docs.cloud.google.com/build/docs/iam-roles-permissions and https://docs.cloud.google.com/build/docs/securing-builds/configure-access-to-resources.
- If you create a log bucket, make sure it has no retention policy; a retention policy may prevent Cloud Build from writing build logs.
- Logging fields: for Cloud Logging set `logging: CLOUD_LOGGING_ONLY`; for a user-created Cloud Storage bucket set `logging: GCS_ONLY` and `logsBucket`. A build config that sets `serviceAccount` without one of these logging setups does not satisfy the requirement above.
- A `serviceAccount` set in the build config is ignored when a trigger runs; only the service account specified on the trigger is used for triggered builds. If you do not set one on the trigger, Cloud Build uses the default service account.
- Cross-project use works only if the `iam.disableCrossProjectServiceAccountUsage` organization policy constraint is not enforced (it is enforced by default). Disabling enforcement has security trade-offs; make sure your organization agrees before changing it, and see https://docs.cloud.google.com/iam/docs/attach-service-accounts#enabling-cross-project.
- Cross-project limitations: the project must be in a Google Cloud organization; builds must be started from the command line with `gcloud builds submit` or `gcloud builds triggers create`; a `service account not found` error when granting the role may require manually creating the service agent (https://docs.cloud.google.com/iam/docs/create-service-agents).
- Adapted from the official docs: the source command is `gcloud projects add-iam-policy-binding SERVICE_ACCOUNT_PROJECT_ID --member="serviceAccount:BUILD_SERVICE_AGENT" --role="roles/iam.serviceAccountTokenCreator"` (project-level grant); the resource-level form above grants the role on the single service account.
- Adapted from the official docs: the source trigger command had no `\` continuations after `--branch-pattern=BRANCH_PATTERN` and `--build-config=BUILD_CONFIG_FILE`.
- The source writes the trigger `SERVICE_ACCOUNT` format as `/projects/PROJECT_ID/serviceAccounts/ACCOUNT_ID_OR_EMAIL` (leading slash); the gcloud 593.0.0 help example uses `projects/my-project/serviceAccounts/...` without it. The source also lists a `TAG_PATTERN` description that its command does not use.
- The org-policy command changes an organization policy constraint; try it first on a disposable project. IAM, service agents and Organization Policy belong to the `gcp-foundation` skill.
- The source also shows Console steps and the JSON form of both build configs.

## Related

- [cloud-build-service-account.md](./cloud-build-service-account.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
- [run-builds-in-private-pool.md](./run-builds-in-private-pool.md)
