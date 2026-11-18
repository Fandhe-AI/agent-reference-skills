---
source: https://docs.cloud.google.com/build/docs/automating-builds/github/connect-repo-github
---

# Connect a GitHub host and repository (2nd gen)

Create a Cloud Build repositories (2nd gen) host connection to GitHub (interactively through the Cloud Build GitHub App, or programmatically with an authentication token stored in Secret Manager), then link a GitHub repository to it. This page covers the 2nd gen tab; the source also has a 1st gen tab.

## Signature / Usage

### Connect a GitHub host interactively

You must specify a region; the connection cannot exist globally. The command prints a link to authorize the Cloud Build GitHub App.

```bash
gcloud builds connections create github CONNECTION_NAME --region=REGION
```

After authorizing and installing the app, verify the installation. If `installationState` is `COMPLETE` the connection is installed; otherwise the field gives a link for the remaining steps.

```bash
gcloud builds connections describe CONNECTION_NAME --region=REGION
```

### Connect programmatically with an existing connection's token

The `authorizerTokenSecretVersion` field of the output is the ID of the secret holding the connection's authentication token.

```bash
gcloud builds connections describe CONNECTION_NAME --region=REGION
```

### Connect programmatically with a personal access token

Install the Cloud Build GitHub App (https://github.com/apps/google-cloud-build) on your account or organization first. Store the token in Secret Manager.

Adapted (not in the official docs): the source's `echo -n 'TOKEN' | gcloud secrets create ...` puts the token in the command line and shell history; this version reads it without echo and pipes it through a shell builtin (bash / zsh).

```bash
read -rs GITHUB_TOKEN
printf '%s' "${GITHUB_TOKEN}" | gcloud secrets create SECRET_NAME --data-file=-
unset GITHUB_TOKEN
```

Grant the Cloud Build Service Agent access to the secret.

Adapted (not in the official docs): `${PROJECT_ID}` is quoted in the `gcloud projects describe` call.

```bash
PROJECT_ID=$(gcloud config list --format="value(core.project)")
PN=$(gcloud projects describe "${PROJECT_ID}" --format="value(projectNumber)")
CLOUD_BUILD_SERVICE_AGENT="service-${PN}@gcp-sa-cloudbuild.iam.gserviceaccount.com"
gcloud secrets add-iam-policy-binding SECRET_NAME \
  --member="serviceAccount:${CLOUD_BUILD_SERVICE_AGENT}" \
  --role="roles/secretmanager.secretAccessor"
```

Create the connection.

```bash
gcloud builds connections create github CONNECTION_NAME \
  --authorizer-token-secret-version=projects/PROJECT_ID/secrets/SECRET_NAME/versions/VERSION \
  --app-installation-id=INSTALLATION_ID --region=REGION
```

### Link a repository to the connection

```bash
gcloud builds repositories create REPO_NAME \
  --remote-uri=REPO_URI \
  --connection=CONNECTION_NAME --region=REGION
```

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `CONNECTION_NAME` | Name of the connection as it appears in Cloud Build. |
| `REGION` | Region of the connection (https://docs.cloud.google.com/build/docs/locations). Required. |
| `SECRET_NAME` / `VERSION` | Secret Manager secret holding the token and its version. |
| `INSTALLATION_ID` | Installation ID of the Cloud Build GitHub App; the numeric value in `https://github.com/settings/installations/1234567` (here `1234567`). |
| `REPO_NAME` | Name of the linked repository resource. |
| `REPO_URI` | Clone URL, for example `https://github.com/cloud-build/test-repo.git`. |

### Personal access token OAuth scopes

| Scope | Purpose |
|---|---|
| `repo` | Full access to public and private repositories. |
| `read:user` | Read a user's profile data. |
| `read:org` | Read-only access to organization membership and projects (if the app is installed in an organization). |

## Notes

- Prerequisites: Cloud Build and Secret Manager APIs enabled (`serviceusage.services.enable`, for example via `roles/serviceusage.serviceUsageAdmin`); source in a GitHub repository with a `Dockerfile` or a Cloud Build config file; admin-level permissions on the repository when first connecting.
- Authorizing the app stores the authorization token as a Secret Manager secret in your project; the Cloud Build Service Agent (`service-{projectNumber}@gcp-sa-cloudbuild.iam.gserviceaccount.com`) reads it. This authentication can create additional connections in the same project. Use a robot or team-shared account rather than a personal GitHub account.
- Cloud Build doesn't support GitHub fine-grained access tokens; use a classic personal access token. When a token expires, delete the expired token and create a new one.
- The personal access token and the Secret Manager secret are credentials: never put the token in a build config, substitution, URL or committed file.
- To optionally manage the encryption keys of the stored tokens, choose a Cloud KMS key in the connection setup (customer-managed encryption keys for Secret Manager).
- The source also shows Console and Terraform forms (the Terraform sample inlines the token as `secret_data`); they are omitted here.
- Adapted from the official docs: the source's `echo -n 'TOKEN' | gcloud secrets create ...` (token on the command line and in shell history) is replaced by `read -rs` plus `printf`; `${PROJECT_ID}` is quoted in the `gcloud projects describe` call.
- Source: https://docs.cloud.google.com/build/docs/automating-builds/github/connect-repo-github (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [repositories.md](./repositories.md)
- [build-repos-from-github.md](./build-repos-from-github.md)
- [access-github-from-build.md](./access-github-from-build.md)
