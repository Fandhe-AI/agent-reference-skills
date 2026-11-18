---
source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/connect-repo-gitlab
---

# Connect a GitLab repository (2nd gen)

Link a GitLab repository to an existing Cloud Build repositories (2nd gen) GitLab host connection. A host connection must exist first.

## Signature / Usage

### Link a repository

```bash
gcloud builds repositories create REPO_NAME \
  --remote-uri=REPO_URI \
  --connection=CONNECTION_NAME --region=REGION
```

## Options / Props

### Placeholders

| Name | Description |
|---|---|
| `REPO_NAME` | Name of the repository resource. |
| `REPO_URI` | Link to your GitLab repository. |
| `CONNECTION_NAME` | Name of the GitLab connection created in Cloud Build. |
| `REGION` | Region of the connection (https://docs.cloud.google.com/build/docs/locations). |

### Console "Link repository" fields

| Field | Description |
|---|---|
| Connection | Connection to link to. |
| Repository | Repository to link. |
| Repository Name | **Generated** (Cloud Build generates names) or **Manual** (you specify names). |

## Notes

- Prerequisites: Cloud Build and Secret Manager APIs enabled; connect the GitLab host first.
- Cloud Build is Google Cloud's managed build service; GitLab CI pipelines are separate (the source points to Google-managed CI/CD components at https://docs.cloud.google.com/docs/gitlab).
- Source: https://docs.cloud.google.com/build/docs/automating-builds/gitlab/connect-repo-gitlab (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [connect-host-gitlab.md](./connect-host-gitlab.md)
- [build-repos-from-gitlab.md](./build-repos-from-gitlab.md)
- [repositories.md](./repositories.md)
