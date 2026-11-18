---
source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/connect-host-gitlab
---

# Connect a GitLab host (2nd gen)

Create a Cloud Build repositories (2nd gen) host connection to GitLab using two GitLab access tokens (an `api` token and a `read_api` token) and a webhook secret, all stored in Secret Manager. Covers token rotation after expiry.

## Signature / Usage

### Store a webhook secret and grant access (gcloud)

Store each GitLab token in Secret Manager first (https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets). Then create the webhook secret:

```bash
cat /proc/sys/kernel/random/uuid | tr -d '\n' | gcloud secrets create my-gle-webhook-secret --data-file=-
```

If the secrets are in a different project than the one used to create the host connection, grant the Cloud Build service agent of the connection's project access to each secret.

Adapted (not in the official docs): the source grants `roles/secretmanager.admin` on the whole project with one `PROJECT_ID`; this grants `roles/secretmanager.secretAccessor` on each secret only, takes the service agent from the connection's project (`CONNECTION_PROJECT_ID`) and binds on the project holding the secrets (`SECRET_PROJECT_ID`), as the Bitbucket Cloud page does per secret.

```bash
PN=$(gcloud projects describe CONNECTION_PROJECT_ID --format="value(projectNumber)")
CLOUD_BUILD_SERVICE_AGENT="service-${PN}@gcp-sa-cloudbuild.iam.gserviceaccount.com"
for SECRET in API_TOKEN READ_TOKEN WEBHOOK_SECRET; do
  gcloud secrets add-iam-policy-binding "${SECRET}" \
    --project=SECRET_PROJECT_ID \
    --member="serviceAccount:${CLOUD_BUILD_SERVICE_AGENT}" \
    --role="roles/secretmanager.secretAccessor"
done
```

### Create the GitLab connection

```bash
gcloud builds connections create gitlab CONNECTION_NAME \
  --host-uri=HOST_URI \
  --project=PROJECT_ID \
  --region=REGION \
  --authorizer-token-secret-version=projects/PROJECT_ID/secrets/API_TOKEN/versions/SECRET_VERSION \
  --read-authorizer-token-secret-version=projects/PROJECT_ID/secrets/READ_TOKEN/versions/SECRET_VERSION \
  --webhook-secret-secret-version=projects/PROJECT_ID/secrets/WEBHOOK_SECRET/versions/SECRET_VERSION
```

## Options / Props

### GitLab access tokens

| Token | Scope | Used for |
|---|---|---|
| API access token | `api` | Connecting and disconnecting repositories. |
| Read API access token | `read_api` | Cloud Build triggers access source code in repositories. |

### Placeholders

| Name | Description |
|---|---|
| `CONNECTION_NAME` | Name of the GitLab host connection in Cloud Build. |
| `HOST_URI` | URI of the GitLab instance, for example `https://my-gle-server.net`. |
| `REGION` | Region of the connection (https://docs.cloud.google.com/build/docs/locations). Required; the connection cannot exist globally. |
| `API_TOKEN` / `READ_TOKEN` | Secret names of the `api` and `read_api` tokens. |
| `SECRET_VERSION` | Version of each secret. |
| `WEBHOOK_SECRET` | Secret name of the webhook secret. |

## Notes

- Prerequisites: Cloud Build and Secret Manager APIs enabled (`serviceusage.services.enable`, for example via `roles/serviceusage.serviceUsageAdmin`).
- Besides personal access tokens you can use project access tokens, and group access tokens if your GitLab version is 14.2 or higher; with project or group tokens select the `Maintainer` role.
- In the console, choose **GitLab.com** under Host details for gitlab.com. Cloud Build stores the tokens in Secret Manager and creates a webhook secret on your behalf; an optional Cloud KMS key can encrypt the tokens.
- Tokens, the webhook secret and their Secret Manager secrets are credentials; never place them in a build config, substitution, URL or committed file. Pass token values to Secret Manager from a file or standard input, not as command-line arguments.
- The `/proc/sys/kernel/random/uuid` command is Linux-specific. The connection command refers to the webhook secret as `WEBHOOK_SECRET`; use the name you gave it above (`my-gle-webhook-secret` in the example).
- Adapted from the official docs: for secrets in a different project, the source grants the Cloud Build service agent `roles/secretmanager.admin` on the whole project and uses one `PROJECT_ID` both to compute the service agent's project number and as the project the role is bound on. That role also allows reading, changing and deleting unrelated secrets, so the example grants `roles/secretmanager.secretAccessor` on the three connection secrets only (the per-secret grant used for the GitHub and Bitbucket Cloud connections), with the service agent from the connection's project and the binding in the secrets' project. In the connection command, the secret version paths then use `SECRET_PROJECT_ID` instead of `PROJECT_ID`.
- Token rotation: when a GitLab token expires the host connection is disconnected and you can't disable the connection or link a repository until you rotate it. Symptoms: the connection details page shows `Connection is disconnected due to an invalid or expired access token`, and linking shows **Invalid access token**. Rotate each token in GitLab (new credentials, same scope; the old token is invalidated), then in the connection details page choose **Update access tokens**, enter the **API access token** and **Read access token**, optionally select **Update connection to always use latest version**, and click **Update**; Cloud Build saves them as the latest secret versions.
- The source also shows the Console steps in detail; they are omitted here.
- Source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/connect-host-gitlab (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-repo-gitlab.md](./connect-repo-gitlab.md)
- [build-repos-from-gitlab.md](./build-repos-from-gitlab.md)
- [repositories.md](./repositories.md)
