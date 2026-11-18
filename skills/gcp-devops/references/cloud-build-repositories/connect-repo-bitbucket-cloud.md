---
source: https://docs.cloud.google.com/build/docs/automating-builds/bitbucket/connect-repo-bitbucket-cloud
---

# Connect a Bitbucket Cloud repository (2nd gen)

Link a Bitbucket Cloud repository to an existing Cloud Build repositories (2nd gen) host connection. Connect the Bitbucket Cloud host first.

## Signature / Usage

### Link a repository

```bash
gcloud builds repositories create REPO_NAME \
    --remote-uri=https://bitbucket.org/WORKSPACE/REPOSITORY.git \
    --connection=CONNECTION_NAME --region=REGION --project=PROJECT_ID
```

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `REPO_NAME` | Name of the repository resource. |
| `WORKSPACE` | Workspace ID of the repository. |
| `REPOSITORY` | Name of the Bitbucket repository. |
| `CONNECTION_NAME` | Name of the Bitbucket Cloud host connection. |
| `REGION` | Region of the connection (https://docs.cloud.google.com/build/docs/locations). |
| `PROJECT_ID` | Google Cloud project ID. |

### Console "Link repositories" fields

| Field | Description |
|---|---|
| Connection | Host connection to use. |
| Repository | Repository to link. |
| Repository Resource Name | **Generated** (Cloud Build generates names) or **Manual** (you specify names). |

## Notes

- Prerequisite: the Cloud Build API is enabled and a Bitbucket Cloud host connection exists.
- The source also shows a Terraform `google_cloudbuildv2_repository` resource (omitted); see the note on Terraform support in the repositories overview.
- Source: https://docs.cloud.google.com/build/docs/automating-builds/bitbucket/connect-repo-bitbucket-cloud (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-host-bitbucket-cloud.md](./connect-host-bitbucket-cloud.md)
- [repositories.md](./repositories.md)
