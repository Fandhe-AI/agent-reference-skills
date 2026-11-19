---
source: https://docs.cloud.google.com/source-repositories/docs/features
---

# Cloud Source Repositories features

Cloud Source Repositories provides fully featured, private Git repositories hosted on Google Cloud. Per the enable / disable and migration pages of the same docs, it is no longer available to new customers (effective June 17, 2024) and is End of Sale; use [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md) and [migration-guides.md](./migration-guides.md) to plan a move.

## Signature / Usage

Repositories work with standard Git commands (`push`, `pull`, `clone`, `log`) and can be added to a local repository as a remote. The API is enabled with this command (existing customers only; see [enable-disable-cloud-source-repositories.md](./enable-disable-cloud-source-repositories.md)). Snippet taken from https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories

```bash
gcloud services enable sourcerepo.googleapis.com
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Multiple repositories | Several repositories can be created in a single Google Cloud project. |
| Connected repositories | An existing GitHub or Bitbucket repository can be connected; connected repositories are synchronized automatically. |
| Editor support | Any editor works with the Git repositories; Cloud Code for IntelliJ gives a more integrated experience. |
| Source browser | Repository files can be viewed in the Google Cloud console. |
| Automatic logging | Logs of repository activity go to Cloud Logging: synchronization, access by other users, and administrative actions (creations, deletions, permission changes). A notification can be configured for errors logged during synchronization. |
| Security key detection | Blocks `git push` transactions that contain sensitive information; enabling it is described as a best practice. |

## Notes

- Cloud Source Repositories is intended to store only the source code of an app, not user or personal data. Do not store any Core App Engine Customer Data (as defined in your License Agreement) in it.
- Status as the docs state it: unavailable to new customers since June 17, 2024; End of Sale. See [enable-disable-cloud-source-repositories.md](./enable-disable-cloud-source-repositories.md) and [migration-guides.md](./migration-guides.md).
- Logging billing and log queries are covered by `gcp-observability`.
- Snippet taken from https://docs.cloud.google.com/source-repositories/docs/enable-disable-cloud-source-repositories (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/source-repositories/docs/features (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-disable-cloud-source-repositories.md](./enable-disable-cloud-source-repositories.md)
- [migration-guides.md](./migration-guides.md)
- [csr-ssm-migration-guide.md](./csr-ssm-migration-guide.md)
