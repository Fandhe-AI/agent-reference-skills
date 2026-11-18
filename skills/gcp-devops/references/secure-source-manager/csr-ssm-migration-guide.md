---
source: https://docs.cloud.google.com/source-repositories/docs/csr-ssm-migration-guide
---

# Migrate from Cloud Source Repositories to Secure Source Manager

Migrates a Git repository, including all its information, from Cloud Source Repositories (CSR) to Secure Source Manager (SSM) with standard Git commands: clone the full repository as a bare mirror to a local computer, then push it to an empty SSM repository. The guide does not use automatic mirroring or synchronization.

## Signature / Usage

Check the repository size first (inline command from the guide): `gcloud source repos describe CSR_REPO_NAME` shows the total bytes; `df .` shows free disk space on Linux. Then clone the full history with `git clone CSR_REPO_URL --mirror`. The result is a bare clone with only files such as `config` and `HEAD`; the content is in `objects` and other directories.

### Add the SSM repository as a remote and push

```bash
git remote add ssm SSM_REPOSITORY_URL
```

```bash
git push --mirror ssm
```

### Validate

Clone the SSM repository into a different directory and compare it with the CSR copy:

| Check | Command in each repository |
|-------|---------------------------|
| Number of branches | `git branch -r` (on Linux or macOS, pipe to `wc -l`) |
| Number of tags | `git tag` (pipe to `wc -l`) |
| HEAD commit | `git rev-parse HEAD` |
| Commit count | `git rev-list --all --count` |

## Options / Props

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| CSR permission | `source.repos.get` (in `roles/source.reader`) on the source CSR repository |
| SSM permissions | `securesourcemanager.instances.access` (in `roles/securesourcemanager.instanceAccessor`) and `securesourcemanager.repositories.fetch` (in `roles/securesourcemanager.repoWriter`) on the target SSM instance and repository |
| Git client | Git command-line tool |
| Google Cloud SDK | Version 395.0.0 or later on the same computer for HTTPS authentication; otherwise connect to both CSR and SSM with SSH keys |
| SSM instance access | The instance must be reachable; for a Private Service Connect instance see the "Access a private instance" section of the SSM docs |
| Local storage | Enough disk space for temporary clones |
| SSM size limit | Default limit of 100 GB of storage per instance; verify the CSR repository fits |

### Transport and principal

| System | Options |
|--------|---------|
| CSR | HTTP or SSH as a user principal; HTTP as a service account |
| SSM | HTTP or SSH, as a user or service account principal |

## Notes

- Make CSR read-only before migrating: no writes during or after the migration. Update IAM so no user has a role other than `roles/source.reader` on the repository, or coordinate a commit freeze.
- Run `git remote add` and `git push --mirror` from inside the bare clone that `git clone CSR_REPO_URL --mirror` created; they act on that repository's remotes and refs.
- Create an empty SSM repository: do not select **Initialize Repository** in the UI; do not set `--gitignores`, `--readme` and `--license` in gcloud; do not set `gitignores`, `license` and `readme` in `InitialConfig` through the API. Verify it is empty with `git show-ref` (empty output) and make sure there are no active branch protection rules (none, or all disabled).
- Cleanup: reset credentials with `gcloud config set account` if you impersonated a service account; re-enable branch protection rules on the SSM repository; remove bare CSR copies from the migration computer; delete the original CSR repository. Deleting the CSR repository is irreversible: validate first and try the procedure on a disposable project.
- Corrected from the official docs: the guide writes the flag as `--licenses`; the `gcloud source-manager repos create` flag is `--license`.
- The guide's `gcloud source repos describe CSR_REPO_NAME` and `git clone CSR_REPO_URL --mirror` appear inline in prose, so they are not fenced here.
- Cloud Source Repositories status as the docs state it: End of Sale (see [migration-guides.md](./migration-guides.md)).
- Source: https://docs.cloud.google.com/source-repositories/docs/csr-ssm-migration-guide (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [migration-guides.md](./migration-guides.md)
- [csr-ssm-permission-mapping.md](./csr-ssm-permission-mapping.md)
- [create-repository.md](./create-repository.md)
- [use-git.md](./use-git.md)
