---
source: https://docs.cloud.google.com/secure-source-manager/docs/create-repository
---

# Create and update a Secure Source Manager repository

How to create a repository in an existing Secure Source Manager instance with the web interface, the gcloud CLI or the API, and how to update its associated service account. The creator is automatically granted the Repo Admin role on the new repository.

## Signature / Usage

### Create with the gcloud CLI

All flags other than the repository ID, `--region`, `--project` and `--instance` are optional (the README template name is `default`; the default branch is `main` when not set).

```bash
gcloud source-manager repos create REPOSITORY_ID \
    --region=LOCATION \
    --project=PROJECT_ID \
    --instance=INSTANCE_ID \
    --description=DESCRIPTION \
    --default-branch=BRANCH \
    --gitignores=GITIGNORES \
    --license=LICENSE \
    --readme=README \
    --service-account=SERVICE_ACCOUNT
```

### Create with the API

Adapted (not in the official docs): the request URL is quoted so the shell does not treat `?` as a glob character, and the query parameter uses the camelCase name of the REST reference (`repositoryId`) instead of `repository_id`.

```bash
curl \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://securesourcemanager.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/repositories?repositoryId=REPOSITORY_ID" \
    -d '{
      "instance": "projects/PROJECT_ID/locations/REGION/instances/INSTANCE_ID",
      "serviceAccount": "SERVICE_ACCOUNT"
    }'
```

Additional values go in the POST data, for example `"initialConfig": { "defaultBranch": "main" }` next to `instance` and `serviceAccount`. The response contains `uris.html` (browser) and `uris.gitHttps` (Git over HTTPS).

### Update the service account

```bash
gcloud source-manager repos update REPOSITORY_ID \
    --region=LOCATION \
    --project=PROJECT_ID \
    --service-account=SERVICE_ACCOUNT
```

Adapted (not in the official docs): the request URL is quoted so the shell does not treat `?` as a glob character.

```bash
curl --request PATCH \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://securesourcemanager.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/repositories/REPOSITORY_ID?updateMask=serviceAccount" \
    -d '{"serviceAccount": "SERVICE_ACCOUNT"}'
```

## Options / Props

### Repository settings

| Setting | Description |
|---------|-------------|
| `REPOSITORY_ID` | Lowercase letters, numbers or dashes; must begin with a letter; follows the AIP-122 resource ID rules; cannot be changed after creation. |
| `--description` | Optional. The CLI help says it cannot exceed 500 characters. |
| `--default-branch` | Optional; `main` when not set. |
| `--gitignores` | Optional comma-separated list of gitignore template names (see `InitialConfig` in the REST reference). |
| `--license` | Optional license template name (see `InitialConfig`). |
| `--readme` | `default` creates a README from the default template; omitted means no README. |
| `--service-account` | Optional user-managed service account used for integrations such as Cloud Build. |
| `--instance` | Instance ID that hosts the repository. |

### Required roles

| Role | Scope |
|------|-------|
| `roles/securesourcemanager.instanceRepositoryCreator` | The Secure Source Manager instance |
| `roles/securesourcemanager.repoCreator` | The instance project |

## Notes

- Source inconsistency: the `securesourcemanager.v1` Discovery document (googleapis Python client snapshot used by this skill) has no `Repository.serviceAccount` field, while this guide and gcloud 593.0.0 (`--service-account`) use it; the example is kept as the guide writes it.
- The creator receives `roles/securesourcemanager.repoAdmin`; the new permission can take up to 2 minutes to propagate.
- Do not put sensitive or identifying data in the description or similar fields; they are treated as Service Data under the Google Cloud Privacy Notice.
- Repositories you created are listed under **My repositories** in the web interface. Initialization (`.gitignore`, license, README) is optional; an empty repository is needed when migrating (see [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)).
- The source's prerequisites include `gcloud components install alpha` under a "beta component" heading; it is not needed for `gcloud source-manager repos create` (GA in gcloud 593.0.0 help), so it is not reproduced.
- Adapted from the official docs: the `curl` commands originally had the URL unquoted, and the create command used `repository_id`; the REST reference (Discovery document) names the parameter `repositoryId`.
- The source also shows the web interface and a second full `curl` example with `initialConfig`; the original response example there is not valid JSON, so it is not reproduced.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/create-repository (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance.md](./create-instance.md)
- [use-git.md](./use-git.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
- [create-triggers-file.md](./create-triggers-file.md)
