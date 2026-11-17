---
source: https://docs.cloud.google.com/artifact-analysis/docs/enable-automatic-scanning
---

# Enable or disable automatic scanning

Automatic vulnerability scanning of Artifact Registry container images runs through the Container Scanning API. By default all supported package types in the project are scanned once the API is enabled; scanning can be disabled per repository to lower cost and noise.

## Signature / Usage

### Control scanning for one repository

Docker standard and remote repositories are scanned by default. Maven, Npm and Python repositories also support automatic scanning, but it is disabled by default and must be enabled manually. This feature is only supported in Artifact Registry.

Disable scanning on the repository:

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT-ID \
    --location=LOCATION \
    --disable-vulnerability-scanning
```

Allow scanning on the repository:

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT-ID \
    --location=LOCATION \
    --allow-vulnerability-scanning
```

### Disable the Container Scanning API

```bash
gcloud services disable containerscanning.googleapis.com
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `REPOSITORY` | Repository name; can be omitted if a default repository is configured |
| `PROJECT-ID` | Project ID; if omitted the current or default project is used |
| `LOCATION` | Repository location; can be omitted if a default location is configured |

## Notes

- Enabling the Container Scanning API also enables the Container Analysis API for metadata storage and retrieval. Enabling is done in the console (Enable access to API page for `containerscanning.googleapis.com`).
- Limitation: scanning is not supported in Artifact Registry virtual repositories.
- Disabling the Container Scanning API stops scanning for all repositories in the project. Per-repository settings are preserved: repositories you disabled earlier stay excluded after re-enabling the API. This is disruptive: scan coverage stops project-wide; try it on a disposable project first.
- Extend the monitoring window: the default continuous monitoring window is 30 days after which results go stale. Pull or push the image within the 30-day period; the source recommends a scheduled task to re-push rarely updated containers (for example Istio and proxy images).
- Pricing: https://cloud.google.com/artifact-analysis/pricing#vulnz (not copied).
- Console steps for repository settings and the Artifact Registry Settings page are omitted; see the source page.
- Source: https://docs.cloud.google.com/artifact-analysis/docs/enable-automatic-scanning (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scanning-types.md](./scanning-types.md)
- [container-scanning-overview.md](./container-scanning-overview.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
