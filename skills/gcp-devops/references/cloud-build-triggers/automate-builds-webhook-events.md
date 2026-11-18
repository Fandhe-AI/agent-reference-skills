---
source: https://docs.cloud.google.com/build/docs/automate-builds-webhook-events
---

# Automate builds in response to webhook events

A webhook trigger authenticates and accepts incoming webhook events sent to a custom URL, connecting external systems and source code management platforms (Bitbucket.com, Bitbucket Server, GitLab) to Cloud Build. You can define the build configuration inline instead of a source repository, which gives control over Git operations and the build workflow. For repository events, Cloud Build repository triggers (2nd gen repositories) are recommended instead.

## Signature / Usage

### Prerequisites

- Cloud Build and Secret Manager APIs enabled (`serviceusage.services.enable`, for example via `roles/owner` or `roles/serviceusage.serviceUsageAdmin`).
- gcloud installed and up to date (`gcloud components update`).
- If the trigger uses a Cloud Build repository, familiarity with Cloud Build repositories (2nd gen).

### Create a webhook trigger

The webhook secret is a Secret Manager secret version. You can let Cloud Build generate a new secret in the console, or use an existing one.

Adapted (not in the official docs): the source command lists every flag at once, including mutually exclusive ones (`--trigger-config` with flag-based settings, `--build-config` / `--inline-config` / the Dockerfile flags, `--tag` / `--branch`) and has trailing spaces after `\`; this is one valid combination (inline config, no repository), with the other choices listed in the Options table.

```bash
gcloud builds triggers create webhook \
  --name=TRIGGER_NAME \
  --description=DESCRIPTION \
  --region=REGION \
  --secret=projects/PROJECT_ID/secrets/SECRET_NAME/versions/SECRET_VERSION \
  --service-account=projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_EMAIL \
  --inline-config=PATH_TO_INLINE_BUILD_CONFIG \
  --substitutions=_SUB_ONE='$(body.message.test)',_SUB_TWO='$(body.message.output)' \
  --subscription-filter='_SUB_ONE == "prod"' \
  --require-approval
```

Example inline build config.

Adapted (not in the official docs): `options.logging: CLOUD_LOGGING_ONLY` is added because the trigger runs as a user-specified service account, which needs a logging setting; the account also needs permission to write logs to Cloud Logging (for example Logs Writer, `roles/logging.logWriter`).

```yaml
steps:
- name: 'ubuntu'
  args: ['echo', 'hello world']
options:
  logging: CLOUD_LOGGING_ONLY
```

### Invoke a webhook event

The URL carries the API key and secret value as query parameters, so they are credentials (see Notes).

```bash
curl -X POST -H "Content-type: application/json" "https://cloudbuild.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/triggers/${TRIGGER_NAME}:webhook?key=${API_KEY}&secret=${SECRET_VALUE}&trigger=${TRIGGER_NAME}&projectId=${PROJECT_ID}" -d "{}"
```

### Grant the Secret Accessor role (existing secrets)

For a secret created during trigger creation Cloud Build normally grants the Secret Manager Secret Accessor role automatically. With an existing secret you may need to grant **Secret Manager Secret Accessor** on that secret (Secret Manager page, Permissions tab, Grant access) to the Cloud Build service account `service-${PROJECT_NUMBER}@gcp-sa-cloudbuild.iam.gserviceaccount.com` (service agent) and to the build service account noted on the IAM page.

### Obtain an API key

If you have no API key or Cloud Build could not retrieve one, create one on the Credentials page (Create credentials, API Key) and optionally restrict it (see "Applying API key restrictions" in the Google Cloud authentication docs). The key is part of the webhook URL.

## Options / Props

### gcloud flags

| Flag | Description |
|------|-------------|
| `--trigger-config` | Path to a trigger config file ([BuildTrigger](https://docs.cloud.google.com/build/docs/api/reference/rest/v1/projects.triggers)). When used, `name`, `description`, `region`, `secret`, `service-account`, `subscription-filter` and `substitution` must remain undefined |
| `--name`, `--description` | Trigger name; optional description |
| `--region` | Trigger region; must be a region other than `global` |
| `--secret` | `projects/PROJECT_ID/secrets/SECRET_NAME/versions/SECRET_VERSION` used to authenticate incoming requests |
| `--service-account` | Service account for all user-controlled operations of the trigger; if not defined the default Cloud Build service account is used |
| `--repository` | `projects/PROJECT_ID/locations/REGION/connections/CONNECTION_NAME/repositories/REPO_NAME` |
| `--build-config` | Path to a build config in a Cloud Build repository; cannot be combined with `--inline-config` or Dockerfile flags |
| `--inline-config` | Path to a local inline build config; cannot be combined with `--build-config` or Dockerfile flags |
| `--dockerfile`, `--dockerfile-dir`, `--dockerfile-image` | Dockerfile path, its directory, and the image name Cloud Build builds; cannot be combined with `--build-config` or `--inline-config` |
| `--branch` / `--tag` | Branch or tag to build; setting one means you cannot set the other |
| `--substitutions` | For example `_SUB_ONE='$(body.message.test)',_SUB_TWO='$(body.message.output)'` |
| `--subscription-filter` | CEL filter such as `'_SUB_ONE == "prod"'` |
| `--require-approval` | Manual approval for triggered builds |

### Console settings

| Setting | Description |
|---------|-------------|
| Region | With a private pool in the build config the trigger region must match the pool region; otherwise the default pool in the trigger region is used |
| Event | Webhook event |
| Webhook URL | Preview contains an API key generated by Cloud Build and your secret; the secret is separate from any secret associated with your SSH key |
| Source (optional) | Not required with an inline build config; otherwise repository generation 2nd generation, repository (region must match), branch or tag RE2 expression |
| Comment control (Pull request events) | Required except for owners and collaborators, Required, Not required; see the Pub/Sub page for the behaviour of each option and `/gcbrun` |
| Configuration | Config file, Dockerfile or Buildpacks; Inline is required if no source repository is chosen |
| Substitutions, Filters | Optional; payload bindings can supply values |

## Notes

- Credentials: the webhook URL contains your API key and secret value as query parameters. Treat both as credentials, never commit the URL, and restrict the API key. The `curl` example puts the whole URL on the command line, so it is visible in the shell history and the process list while it runs; do not echo or log it, and run it only from a trusted shell. Prefer a placeholder in scripts and read values from Secret Manager at call time.
- Webhook secrets live in Secret Manager; Cloud Build generates one automatically when you choose "Use a new secret".
- Pull request triggers: the source warns that any user with read access to the repository can submit a pull request that may run a build with the pull request's changes; use manual approvals to gate pull request builds on public repositories and keep comment control enabled.
- If `--service-account` is omitted the default Cloud Build service account is used, which is not recommended; a user-specified service account needs a Cloud Logging or Cloud Storage logs bucket (see the trigger creation page).
- Adapted from the official docs: the source's inline config has only `steps`, although the trigger command passes `--service-account`. Builds with a user-specified service account need `options.logging: CLOUD_LOGGING_ONLY`, or `logsBucket` with `options.logging: GCS_ONLY` (see configure-user-specified-service-accounts.md in this skill), so the example sets `CLOUD_LOGGING_ONLY`.
- Corrected from the official docs: the single command listing `--trigger-config=...`, `--build-config=...`, `--inline-config=...`, `--dockerfile=...`, `--tag=...` and `--branch=...` together was reduced to one valid combination.
- Only the 2nd gen tab of the source is retained (the page also has a 1st gen tab). Cloud Build repositories (2nd gen) manage authentication tokens through Secret Manager and can post build status to the provider.
- Cloud Build is Google Cloud's managed build service; Secret Manager is covered by `gcp-security`.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/build/docs/automate-builds-webhook-events (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [automate-builds-pubsub-events.md](./automate-builds-pubsub-events.md)
- [gate-builds-on-approval.md](./gate-builds-on-approval.md)
