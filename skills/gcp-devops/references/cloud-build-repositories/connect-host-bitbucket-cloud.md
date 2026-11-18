---
source: https://docs.cloud.google.com/build/docs/automating-builds/bitbucket/connect-host-bitbucket-cloud
---

# Connect a Bitbucket Cloud host (2nd gen)

Create a Cloud Build repositories (2nd gen) host connection to Bitbucket Cloud using an admin access token, a read access token and a webhook secret stored in Secret Manager. Covers token rotation after expiry.

## Signature / Usage

### Store the tokens and webhook secret

Adapted (not in the official docs): the source passes tokens as `echo -n ADMIN_TOKEN | gcloud secrets create ...`, which puts them on the command line and in shell history; this version reads them without echo (bash / zsh).

```bash
read -rs ADMIN_TOKEN
printf '%s' "${ADMIN_TOKEN}" | gcloud secrets create ADMIN_SECRET_NAME --data-file=-
unset ADMIN_TOKEN

read -rs READ_TOKEN
printf '%s' "${READ_TOKEN}" | gcloud secrets create READ_SECRET_NAME --data-file=-
unset READ_TOKEN
```

Adapted (not in the official docs): the source writes `echo -n ${ex.(random-uuid)} | gcloud secrets create WEBHOOK_SECRET_NAME --data-file=-`, a template artifact that is not valid shell; the Linux UUID generator from the GitLab host page is used instead.

```bash
cat /proc/sys/kernel/random/uuid | tr -d '\n' | gcloud secrets create WEBHOOK_SECRET_NAME --data-file=-
```

If the secrets aren't all in the same project, grant the Cloud Build service agent access to each secret:

```bash
PN=$(gcloud projects describe PROJECT_ID --format="value(projectNumber)")
CLOUD_BUILD_SERVICE_ACCOUNT="service-${PN}@gcp-sa-cloudbuild.iam.gserviceaccount.com"
gcloud secrets add-iam-policy-binding ADMIN_SECRET_NAME \
    --member="serviceAccount:${CLOUD_BUILD_SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding READ_SECRET_NAME \
    --member="serviceAccount:${CLOUD_BUILD_SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding WEBHOOK_SECRET_NAME \
    --member="serviceAccount:${CLOUD_BUILD_SERVICE_ACCOUNT}" \
    --role="roles/secretmanager.secretAccessor"
```

### Create the connection

```bash
gcloud builds connections create bitbucket-cloud CONNECTION_NAME \
    --workspace=WORKSPACE_ID \
    --project=PROJECT_ID \
    --region=REGION \
    --authorizer-token-secret-version=projects/PROJECT_ID/secrets/ADMIN_SECRET_NAME/versions/latest \
    --read-authorizer-token-secret-version=projects/PROJECT_ID/secrets/READ_SECRET_NAME/versions/latest \
    --webhook-secret-secret-version=projects/PROJECT_ID/secrets/WEBHOOK_SECRET_NAME/versions/1
```

## Options / Props

### Bitbucket Cloud access token permissions

| Token | Permissions |
|---|---|
| Admin access token (connect / disconnect repositories) | Repositories: **Read** and **Admin**; Pull Requests: **Read**; Webhooks: **Read** and **Write** |
| Read access token (Cloud Build reads source code) | Repositories: **Read** |

Tokens can be repository, project, or workspace access tokens. In the Terraform variable descriptions the admin token has `webhook`, `repository`, `repository:admin`, and `pullrequest` scope and the read token has `repository:read` scope.

### Required role and APIs

| Item | Value |
|---|---|
| IAM role to connect | Cloud Build Connection Admin (`roles/cloudbuild.connectionAdmin`) on the user account |
| APIs to enable | Cloud Build, Secret Manager, Compute Engine |

### Placeholders

| Name | Description |
|---|---|
| `CONNECTION_NAME` | Name of the connection to the Bitbucket Cloud host. |
| `WORKSPACE_ID` | Workspace ID of the Bitbucket Cloud repository. |
| `REGION` | Region of the connection (https://docs.cloud.google.com/build/docs/locations). Required; the connection cannot exist globally. |
| `ADMIN_SECRET_NAME` / `READ_SECRET_NAME` / `WEBHOOK_SECRET_NAME` | Secret Manager secret names. |

## Notes

- Source code must be in a Bitbucket Cloud repository with a `Dockerfile` or a Cloud Build config file. Some token types are available only in Bitbucket Premium.
- The tokens, the webhook secret and their secrets are credentials; never put them in a build config, substitution, URL or committed file. An optional Cloud KMS key can encrypt the stored tokens.
- The `/proc/sys/kernel/random/uuid` command is Linux-specific.
- Source inconsistency: the source says to run the grant commands when the secrets are not all in one project, but its `PN` lookup uses the same `PROJECT_ID` as the connection; check which project holds the service agent and which holds each secret before running them.
- Token rotation: when a Bitbucket Cloud token expires the host connection is disconnected and you can't disable the connection or link a repository until you rotate it (errors: `Connection is disconnected due to an invalid or expired access token`, **Invalid access token**). Rotate each token in Bitbucket Cloud (new credentials, same permissions; the old token is invalidated), then on the connection details page choose **Update access tokens**, enter the new tokens, optionally select **Update connection to always use latest version**, and click **Update**; Cloud Build saves them as the latest secret versions.
- The source also shows Console and Terraform forms (the Terraform sample inlines token values as `secret_data`); omitted here. Per the repositories overview, Terraform automation is listed as unsupported for Bitbucket Cloud in 2nd gen; see the note there.
- Adapted from the official docs: the source passes tokens as `echo -n ADMIN_TOKEN | gcloud secrets create ...` (on the command line and in shell history); the block above reads them with `read -rs` instead. The source's `echo -n ${ex.(random-uuid)} | ...` webhook-secret command is a template artifact and is replaced by the Linux UUID command from the GitLab host page.
- Source: https://docs.cloud.google.com/build/docs/automating-builds/bitbucket/connect-host-bitbucket-cloud (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo-bitbucket-cloud.md](./connect-repo-bitbucket-cloud.md)
- [repositories.md](./repositories.md)
