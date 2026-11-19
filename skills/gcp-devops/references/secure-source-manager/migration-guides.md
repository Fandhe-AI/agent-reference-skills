---
source: https://docs.cloud.google.com/source-repositories/docs/migration-guides
---

# Cloud Source Repositories migration guides

Cloud Source Repositories is End of Sale. In preparation for the deprecation of the service, this page outlines migration options for multiple use cases. A shutdown date will be communicated at least one year before the shutdown occurs, to give time to migrate to an alternative product. All users must migrate their repositories before the shutdown date.

## Signature / Usage

### Identify and clean up repositories

List repositories on the Source Repositories page (https://source.cloud.google.com), using the project selector; access requires IAM permissions such as Project Owner or Source Repository Administrator. For each repository decide whether it is still in use or connected to a build system. If it is not in use, delete it: this helps with the deprecation process and stops future notifications.

### Mirror a repository to its new home

Snippet taken from https://docs.cloud.google.com/source-repositories/docs/csr-ssm-migration-guide

```bash
git push --mirror ssm
```

## Options / Props

### Migration paths by use case

| Use case | Migration path |
|----------|----------------|
| Software development | Secure Source Manager or a third-party source code management system. |
| Integrating with Cloud Build | If the Cloud Source Repositories repository is a mirror of an external repository used to trigger Cloud Build: connect Cloud Build to your source code management system (Cloud Build triggers) or set up a webhook trigger. |
| Kubernetes config sync and other infrastructure as code | Artifact Registry OCI / Helm (Config Sync), Secure Source Manager (Config Sync Git access), or other source code management systems. |
| Backing up source code repositories | A third-party backup solution (the source cites GitHub Enterprise Server backup configuration as an example). |
| Private network connectivity | Developer Connect and Service Directory (GitHub Enterprise private network); Cloud Build Repositories for manual triggers, Pub/Sub, webhook or Terraform support; "Build repositories from GitHub Enterprise in a private network" if CSR connected Cloud Build Repositories to GitHub Enterprise; Artifact Registry OCI and Helm for infrastructure as code with private network support. |
| Using Cloud Debugger or Error Reporting | Connect to another Git provider. |

### Guides

| Guide | Page |
|-------|------|
| Migrate to Secure Source Manager | [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md) |
| Translate Cloud Source Repositories roles and permissions to Secure Source Manager | [csr-ssm-permission-mapping.md](./csr-ssm-permission-mapping.md) |

## Notes

- Status as the docs state it: End of Sale; shutdown date to be announced at least one year in advance (see [enable-disable-cloud-source-repositories.md](./enable-disable-cloud-source-repositories.md) for the new-customer restriction).
- Delete repositories only after the migration is validated; try deletion on a disposable project first.
- Cloud Build triggers and repositories, Config Sync, Developer Connect and Artifact Registry are covered by `gcp-devops` (Cloud Build, Developer Connect, Artifact Registry) and `gcp-gke` (Config Sync).
- Snippet taken from https://docs.cloud.google.com/source-repositories/docs/csr-ssm-migration-guide (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/source-repositories/docs/migration-guides (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [csr-features.md](./csr-features.md)
- [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)
- [csr-ssm-permission-mapping.md](./csr-ssm-permission-mapping.md)
- [ssm-overview.md](./ssm-overview.md)
