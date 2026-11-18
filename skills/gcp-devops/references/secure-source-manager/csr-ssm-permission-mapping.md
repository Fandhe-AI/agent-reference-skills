---
source: https://docs.cloud.google.com/source-repositories/docs/csr-ssm-permission-mapping
---

# Map Cloud Source Repositories roles to Secure Source Manager

Shows how Cloud Source Repositories (CSR) access controls translate to Secure Source Manager (SSM). There is no 1:1 mapping from a CSR role to an SSM role: SSM needs at least one instance role plus one repository role, and the recipes below give equivalent access for source control only (not pull requests, issues or instance management).

## Signature / Usage

Grant a repository role (for example the equivalent of a CSR reader or writer on one repository; the matching `instanceAccessor` instance role is bound with `gcloud source-manager instances add-iam-policy-binding`, see the grant page).

```bash
gcloud source-manager repos add-iam-policy-binding my-repo \
    --region=us-central1 --member=user:test-user@gmail.com \
    --role=roles/securesourcemanager.repoAdmin
```

## Options / Props

### Resource models

| Product | Resource |
|---------|----------|
| CSR | Repository `projects/PROJECT/repositories/REPO` |
| SSM | Instance `projects/PROJECT/locations/LOCATION/instances/INSTANCE` |
| SSM | Repository `projects/PROJECT/locations/LOCATION/repositories/REPO` (attached to, not a child of, an instance in the same project and location) |

### SSM instance roles (bind to an instance or a project)

| Role | Permissions |
|------|-------------|
| `roles/securesourcemanager.instanceAccessor` | Access an instance and its repositories. Required for repository-level roles to be effective. |
| `roles/securesourcemanager.instanceManager` | Manage instance-level configurations. |
| `roles/securesourcemanager.instanceOwner` | Full control over instance configurations. |
| `roles/securesourcemanager.instanceRepositoryCreator` | Create repositories on an instance. |
| `roles/securesourcemanager.sshKeyUser` | Manage SSH keys for authentication to an instance. Does not grant instance access on its own. |

### SSM repository roles (bind to a repository or a project, except `repoCreator`: project only)

| Role | Permissions |
|------|-------------|
| `roles/securesourcemanager.repoAdmin` | Full control over a repository, including settings and user access. |
| `roles/securesourcemanager.repoPullRequestApprover` | Approve pull requests in a repository. |
| `roles/securesourcemanager.repoReader` | Read repository content and view pull requests and issues. |
| `roles/securesourcemanager.repoWriter` | Read and write repository content, and manage pull requests and issues. |
| `roles/securesourcemanager.repoCreator` | Create new repositories within a project. |

### Mapping

| CSR role (bind point) | SSM equivalent |
|-----------------------|----------------|
| `roles/source.reader` on a repository | `repoReader` on the repository plus `instanceAccessor` on the host instance |
| `roles/source.reader` on the project | `repoReader` and `instanceAccessor` at project level (read access to all repositories on the instance) |
| `roles/source.writer` on a repository | `repoWriter` on the repository plus `instanceAccessor` on the host instance |
| `roles/source.writer` on the project | `repoWriter` and `instanceAccessor` at project level (write access to all repositories on the instance) |
| `roles/source.admin` (project only) | At project level: `instanceAccessor`, `repoAdmin`, `instanceRepositoryCreator` and `repoCreator` |
| All CSR admin permissions | `roles/securesourcemanager.admin` (superuser) at project level |

## Notes

- Binding any SSM role at project level grants it for every repository on the instance; use repository-level bindings for specific repositories. The superuser role `roles/securesourcemanager.admin` must be bound at the project, because instance permissions do not apply when bound to a repository and repository permissions do not apply when bound to an instance.
- CSR repositories could be created across projects; in SSM all repositories on an instance belong to the same project as the instance. CSR roles: reader and writer can be bound to a repository or project; admin only to a project (`source.repos.create` is project-scoped).
- Implicit grant: the principal that creates a repository receives `repoAdmin` on it. Branch protection rules, hooks, issues, pull requests and their comments are child resources of the repository covered by the repository roles.
- Fine-grained roles: `repoPullRequestApprover` with `repoReader` and `instanceAccessor` lets a user browse and approve pull requests without modifying data; `repoCreator` needs `instanceRepositoryCreator` to attach a repository to an instance.
- Corrected from the official docs: the page writes `roles/securesourcemanager.instanceRepoCreator`; the IAM roles reference and the other Secure Source Manager pages use `roles/securesourcemanager.instanceRepositoryCreator`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/source-manager/repos/add-iam-policy-binding (gcloud 593.0.0 help); the source page has no code. Use `repoReader` or `repoWriter` per the mapping table.
- IAM concepts are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/source-repositories/docs/csr-ssm-permission-mapping (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [migration-guides.md](./migration-guides.md)
- [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)
- [grant-iam-roles.md](./grant-iam-roles.md)
