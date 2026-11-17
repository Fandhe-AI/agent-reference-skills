---
source: https://docs.cloud.google.com/artifact-analysis/docs/scanning-types
---

# Types of scanning

Artifact Analysis scans containers in two ways. On-demand scanning is started by a gcloud command, locally or in a registry. Automatic scanning covers Artifact Registry artifacts through on-push scanning and continuous analysis. Both can find vulnerabilities and malicious packages in OS packages and language packages (Java, Go), but automatic language package scanning is only available for Artifact Registry.

## Signature / Usage

### On-push scanning

New images are scanned when uploaded to Artifact Registry, once per image digest (changing tags does not trigger a scan; only changing the image contents does). The scan extracts system and application language packages and identifies malicious software. The resulting scan result is the collection of vulnerability and malicious package occurrences for the image.

### Continuous analysis

Vulnerability data is received multiple times each day and used to update existing vulnerability occurrences, create new ones for new notes, and delete invalid ones. Scanning continues for images and packages pulled within the last 30 days; after that results go stale, and metadata stale for more than 90 days is archived (API-only access). Pulling re-scans an image (refresh up to 24 hours); packages with stale or archived metadata cannot be rescanned.

### On-demand scan of a local image

Start a scan of a container image stored locally, and perform the analysis in Asia:

```bash
gcloud artifacts docker images scan ubuntu:latest --location=asia
```

## Notes

- Enabling the Container Scanning API (`containerscanning.googleapis.com`) starts scanning new images pushed to Artifact Registry repositories in the project; scanning is disabled by default for packages pushed to Artifact Registry repositories; to enable it in a repository, see [enable-automatic-scanning.md](./enable-automatic-scanning.md).
- Architectures: any Linux-based architecture; for manifest lists a Linux amd64 image is scanned if present, otherwise another image is selected.
- Only packages publicly monitored for security vulnerabilities are detected. Malicious packages (OpenSSF Malicious Packages Repository) are reported as `CRITICAL` severity.
- Supported types per registry product: https://docs.cloud.google.com/artifact-registry/docs/transition/setup-repo#analysis. Pricing: https://cloud.google.com/artifact-analysis/pricing (not copied).
- Full source and OS version lists are on [container-scanning-overview.md](./container-scanning-overview.md).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/docker/images/scan (gcloud 593.0.0 help, EXAMPLES). On-demand scanning of local images requires the `local-extract` gcloud component; see [scan-os-on-demand.md](./scan-os-on-demand.md).
- Corrected from the official docs: the source's note says scanning starts "When you enable the Artifact Analysis API". Automatic scanning is turned on by the Container Scanning API (`containerscanning.googleapis.com`), which also enables the Container Analysis API (`containeranalysis.googleapis.com`) used for metadata; enabling only the metadata API does not scan images (see [enable-automatic-scanning.md](./enable-automatic-scanning.md)).
- Source: https://docs.cloud.google.com/artifact-analysis/docs/scanning-types (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [container-scanning-overview.md](./container-scanning-overview.md)
- [enable-automatic-scanning.md](./enable-automatic-scanning.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
