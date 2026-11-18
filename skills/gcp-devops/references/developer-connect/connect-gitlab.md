---
source: https://docs.cloud.google.com/developer-connect/docs/connect-gitlab
---

# Connect to GitLab and link repositories

Create a Developer Connect connection to GitLab and link GitLab repositories, using the console or gcloud. GitLab access tokens and the webhook secret are stored in Secret Manager.

## Signature / Usage

### Prerequisite service agent (CLI)

```bash
gcloud beta services identity create \
    --service=developerconnect.googleapis.com \
    --project=PROJECT_ID
```

### Create the secrets (gcloud)

Adapted (not in the official docs): the webhook secret command gains `--data-file=-`, as in the `gcloud secrets create` help example `printf "s3cr3t" | gcloud secrets create my-secret --data-file=-`; without it the piped value is not read as the secret data.

```bash
cat /proc/sys/kernel/random/uuid | tr -d '\n' | gcloud secrets create WEBHOOK_SECRET_NAME --data-file=-
```

```bash
gcloud secrets create API_SECRET_NAME

echo -n API_SECRET_DATA | gcloud secrets versions add API_SECRET_NAME --data-file=-

gcloud secrets create READ_SECRET_NAME

echo -n READ_SECRET_DATA | gcloud secrets versions add READ_SECRET_NAME --data-file=-
```

### Create the connection

```bash
gcloud developer-connect connections create CONNECTION_NAME \
    --location=REGION \
    --gitlab-config-authorizer-credential-user-token-secret-version=projects/PROJECT_ID/secrets/API_SECRET_NAME/versions/VERSION \
    --gitlab-config-read-authorizer-credential-user-token-secret-version=projects/PROJECT_ID/secrets/READ_SECRET_NAME/versions/VERSION \
    --gitlab-config-webhook-secret-version=projects/PROJECT_ID/secrets/WEBHOOK_SECRET_NAME/versions/VERSION \
    --git-proxy-config-enabled
```

### Link a repository

```bash
gcloud developer-connect connections git-repository-links create REPO_NAME \
    --clone-uri=REPO_URI \
    --connection=CONNECTION_NAME \
    --location=REGION
```

`REPO_URI` example: `https://gitlab.com/my-project/test-repo.git`. List links with `gcloud developer-connect connections git-repository-links list`.

## Options / Props

### GitLab access tokens

| Token | Scope | Purpose |
|-------|-------|---------|
| API access token | `api` | Connecting and disconnecting repositories |
| Read API access token | `read_api` | Lets Developer Connect read source code in your repositories |

Personal, group or project access tokens are accepted; group and project access tokens must have the Maintainer role or greater. Token example form: `glpat-XXXXXXXXXXXXXXXX`.

### Required roles

| Role | Grant to | When |
|------|----------|------|
| `roles/developerconnect.admin` | Your user account | If you are not the project owner |
| `roles/cloudkms.cryptoKeyEncrypterDecrypter` | The Secret Manager service account | Using a CMEK for the secrets Developer Connect creates |
| `roles/secretmanager.admin` | The Developer Connect service account `service-{projectNumber}@gcp-sa-devconnect.iam.gserviceaccount.com` | Using the gcloud CLI |
| `roles/resourcemanager.projectIamAdmin` | Your user account | Using the console (it can then grant permissions automatically) |

### Placeholders

| Name | Meaning |
|------|---------|
| `VERSION` | Secret version number; `latest` uses the most recent |
| `--git-proxy-config-enabled` | Optional; lets Developer Connect proxy Git calls to GitLab |

## Notes

- Corrected from the official docs: the source runs `... | gcloud secrets create WEBHOOK_SECRET_NAME` without `--data-file=-`.
- `/proc/sys/kernel/random/uuid` exists on Linux only.
- The token commands put the token text on the command line (`echo -n API_SECRET_DATA`), which can end up in shell history; replace `API_SECRET_DATA` / `READ_SECRET_DATA` only in a private shell, clear the history entry afterwards, and never commit them.
- The source's placeholder list names `PROJECT_NAME` while the command uses `PROJECT_ID`; use your Google Cloud project ID.
- You are responsible for keeping GitLab tokens valid. GitLab tokens have a maximum lifetime of 365 days unless the creator or an administrator specifies otherwise. The tokens and the webhook secret are credentials; keep them in Secret Manager, never in files or shell history.
- The source recommends a GitLab service account or a team-shared account, not a personal account, and owning the repository or having admin-level permissions on a shared one.
- Console repository linking offers resource-name options: **Generated** or **Manual**.
- The source also shows Console steps (omitted).
- Source: https://docs.cloud.google.com/developer-connect/docs/connect-gitlab (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [git-repo-connections.md](./git-repo-connections.md)
- [connect-github-repo.md](./connect-github-repo.md)
