---
source: https://docs.cloud.google.com/artifact-analysis/docs/container-scanning-overview
---

# Container scanning overview

Container scanning identifies new and existing vulnerabilities and malicious packages in the open-source dependencies of container images in Artifact Registry repositories. It offers automatic scanning (on push plus continuous analysis) and on-demand scanning. Artifact Analysis also identifies dependencies and licenses.

## Signature / Usage

### Automatic scanning and continuous analysis

- New images are scanned when uploaded to Artifact Registry, once per image digest. Adding or modifying tags does not trigger a new scan.
- Only packages that are publicly monitored are detected. Malicious package data comes from the OpenSSF Malicious Packages Repository and is reported as `CRITICAL` severity.
- Secret detection (API keys, service account keys) in automatic scans is in public preview.
- After the initial scan, metadata is monitored continuously: vulnerability sources are received multiple times each day; existing occurrences are updated, new ones created for new notes, and invalid ones deleted.
- Images and packages keep being scanned as long as they were pulled within the last 30 days; after 30 days results go stale. Metadata stale for more than 90 days is archived and can be evaluated only by using the API. Pulling an image re-scans it (refresh can take up to 24 hours); packages with stale or archived metadata cannot be rescanned.

Enable scanning on an individual Artifact Registry repository:

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT-ID \
    --location=LOCATION \
    --allow-vulnerability-scanning
```

## Options / Props

### Supported OS packages (automatic scanning with Artifact Registry and on-demand scanning: both Yes)

| OS | Supported versions |
|----|--------------------|
| AlmaLinux OS | 8, 9, 10, and minor versions |
| Alpine | 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14, 3.15, 3.16, 3.17, 3.18, 3.19, 3.20, 3.21, 3.22, 3.23 |
| CentOS | 6, 7, 8, and minor versions |
| Chainguard | Rolling updates on a single release track |
| Debian (and Google Distroless, which uses Debian data) | 11, 12, 13, 14, 15 (Debian GNU/Linux) |
| MinimOS | Rolling updates on a single release track |
| Red Hat Enterprise Linux (RHEL) | 7, 8, 9, and minor versions for automatic registry scans |
| Red Hat Universal Base Image (UBI) | 8, 9, and minor versions |
| Rocky Linux | 8, 9, 10, and minor versions |
| SUSE Linux Enterprise Server (SLES) | 12, 15, and minor versions; SLES for SAP supported with the same versions |
| Ubuntu | 14.04, 16.04, 18.04, 20.04, 22.04, 24.04, 24.10, 25.04, 25.10, 26.04 |
| Wolfi | Rolling updates on a single release track |

### Supported application language packages (automatic and on-demand: both Yes)

| Language | Notes |
|----------|-------|
| Go | Standard library and external packages, reported with different labels |
| Java | Maven packages following Maven naming conventions; a version with spaces is not scanned |
| Node.js | Semantic versioning (npm) |
| PHP | Composer packages |
| Python | PEP 440 version matching |
| Ruby | RubyGems packages |
| Rust | Cargo packages |
| .NET | NuGet packages |

### Vulnerability sources

| Scan type | Sources |
|-----------|---------|
| OS packages | AlmaLinux errata, Alpine secdb, Red Hat / CentOS data (shared; CentOS fixes can lag Red Hat), Chainguard, Debian security tracker, National Vulnerability Database, Minimus, RHEL, UBI, Rocky Linux errata, SUSE, Ubuntu OVAL, Wolfi |
| Language packages | Vulnerabilities from the GitHub Advisory Database; malicious packages from the OpenSSF Malicious Packages Repository |

## Notes

- Malicious package categories detected: typosquatting or dependency confusion, account takeover, malicious binaries, security researcher activity. IDs: CVE ID by default, GHSA ID when no CVE exists (updated to the CVE if one is assigned later), `MAL-` prefix for malicious package advisories.
- Enabling the Container Scanning API (`containerscanning.googleapis.com`) starts scanning each new image pushed to repositories in the project; scanning is disabled by default for packages pushed to Artifact Registry repositories; to enable it in a repository, see [enable-automatic-scanning.md](./enable-automatic-scanning.md).
- Architectures: any Linux-based architecture. For manifest lists, a Linux amd64 image is scanned if present; otherwise another image from the list is selected.
- Not supported on Windows Server containers. Limitations: RHEL results are based on the latest minor version of each major version, so scanning an older minor version may be inaccurate; RHEL 9 is not supported for on-demand scanning.
- On-demand scans can block and fail builds based on severity (see Cloud Build integration in the official docs); Binary Authorization can create attestations and a vulnerability allowlist from this data (https://docs.cloud.google.com/binary-authorization/docs/cv-vulnerability-check).
- Artifact Analysis does not claim to identify characteristics that increase or decrease the ability to verify image integrity or trust; see https://docs.cloud.google.com/software-supply-chain-security/docs/overview.
- To find the file path of a vulnerable package in the console: open the vulnerability list for an artifact, click VIEW FIX, then SHOW MORE INFO (File location field).
- Interfaces: console, gcloud CLI, REST API (gRPC and REST/JSON, OAuth2) and client libraries.
- Snippet taken from https://docs.cloud.google.com/artifact-analysis/docs/enable-automatic-scanning (per-repository scanning control).
- Corrected from the official docs: the source's note says scanning starts "When you enable the Artifact Analysis API". Automatic scanning is turned on by the Container Scanning API (`containerscanning.googleapis.com`), which also enables the Container Analysis API (`containeranalysis.googleapis.com`) used for metadata; enabling only the metadata API does not scan images (see [enable-automatic-scanning.md](./enable-automatic-scanning.md)).
- Source: https://docs.cloud.google.com/artifact-analysis/docs/container-scanning-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scanning-types.md](./scanning-types.md)
- [enable-automatic-scanning.md](./enable-automatic-scanning.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
- [severity-levels.md](./severity-levels.md)
