---
source: https://docs.cloud.google.com/artifact-analysis/docs/scan-os-on-demand
---

# Scan OS packages manually

The On-Demand Scanning API scans images stored locally or remotely in Artifact Registry, for example in a CI/CD pipeline before deciding whether to store them in a registry. On-Demand Scanning runs in a Linux environment and in macOS; it is not supported on Windows.

## Signature / Usage

### Before you begin

Add the `local-extract` component to the Google Cloud CLI (the component manager prompts on first use), or use the system package manager:

```bash
sudo apt install google-cloud-sdk-local-extract
```

```bash
sudo dnf install google-cloud-sdk-local-extract
```

`yum` can replace `dnf`. Grant the On-Demand Scanning Admin role to the user or service account running scans (not needed for the project owner).

### Scan a container image

Local scan:

```text
gcloud artifacts docker images scan IMAGE_URI \
    [--location=(us,europe,asia)] [--async]
```

Remote scan:

```text
gcloud artifacts docker images scan IMAGE_URI \
    --remote [--location=(us,europe,asia)] [--async]
```

Synchronous scan output (without `--async`):

```text
gcloud artifacts docker images scan ubuntu:latest


✓ Scanning container image
  ✓ Locally extracting packages and versions from local container image
  ✓ Remotely initiating analysis of packages and versions
  ✓ Waiting for analysis operation to complete [projects/my-project/locations/us/operations/87d2e137-1d1c-4790-8e5e-daf6c96ae7d7]
Done.
done: true
metadata:
  '@type': type.googleapis.com/google.cloud.ondemandscanning.v1.AnalyzePackagesMetadata
  createTime: '2021-01-05T23:03:04.185261Z'
  resourceUri: ubuntu:latest
name: projects/my-project/locations/us/operations/87d2e137-1d1c-4790-8e5e-daf6c96ae7d7
response:
  '@type': type.googleapis.com/google.cloud.ondemandscanning.v1.AnalyzePackagesResponse
  scan: projects/my-project/locations/us/scans/2fe2bfb8-f0c5-4dd6-a8c8-38961869767a
```

The scan name is the value of `scan` in the last line.

### Poll an asynchronous scan

`--async` launches a long-running operation and returns its ID without blocking. Poll with the operation name (`name` in the output):

```text
gcloud artifacts docker images get-operation LRO_ID
```

`done: true` in the output means the scan is complete; the `scan` field in the response is the scan name.

### Retrieve the scan results

```text
gcloud artifacts docker images list-vulnerabilities SCAN_NAME [--limit=X]
```

```text
gcloud artifacts docker images list-vulnerabilities \
projects/my-project/locations/us/scans/2fe2bfb8-f0c5-4dd6-a8c8-38961869767a

createTime: '2021-01-05T23:05:42.956227Z'
kind: VULNERABILITY
name: projects/my-project/locations/us/occurrences/f82a1efd-a261-4973-acbd-f9854d8b8135
noteName: projects/goog-vulnz/notes/CVE-2018-1000654
resourceUri: ubuntu:latest
updateTime: '2021-01-05T23:05:42.956227Z'
vulnerability:
  cvssScore: 7.1
  cvssv3:
    attackComplexity: ATTACK_COMPLEXITY_LOW
    attackVector: ATTACK_VECTOR_NETWORK
    availabilityImpact: IMPACT_HIGH
    baseScore: 7.2
    confidentialityImpact: IMPACT_HIGH
    exploitabilityScore: 1.2
    impactScore: 5.9
    integrityImpact: IMPACT_HIGH
    privilegesRequired: PRIVILEGES_REQUIRED_HIGH
    scope: SCOPE_UNCHANGED
    userInteraction: USER_INTERACTION_NONE
  effectiveSeverity: MEDIUM
```

## Options / Props

### Flags (gcloud 593.0.0 help)

| Flag | Description |
|------|-------------|
| `--remote` | The image is in a registry rather than on the local machine |
| `--location` | Multi-region where scanning runs: `us` (default), `europe`, `asia`. Choose one close to your physical location to minimize latency |
| `--async` | Run asynchronously; if omitted the terminal blocks until the scan completes |
| `--limit=X` | (list-vulnerabilities) limit the number of occurrences shown |

### Remote IMAGE_URI formats

| Format |
|--------|
| `HOSTNAME/PROJECT_ID/REPOSITORY_ID/IMAGE_ID@sha256:HASH` |
| `HOSTNAME/PROJECT_ID/REPOSITORY_ID/IMAGE_ID:HASH` |
| `HOSTNAME/PROJECT_ID/REPOSITORY_ID/IMAGE_ID` |
| `HOSTNAME/PROJECT_ID/IMAGE_ID@sha256:HASH` |
| `HOSTNAME/PROJECT_ID/IMAGE_ID:HASH` |
| `HOSTNAME/PROJECT_ID/IMAGE_ID` |

### Required roles (to view package scan results, on the project)

| Role | ID |
|------|----|
| Container Scanner Service Agent | `roles/containerscanning.ServiceAgent` |
| Container Analysis Occurrences Viewer | `roles/containeranalysis.occurrences.viewer` |
| Container Analysis Notes Viewer | `roles/containeranalysis.notes.viewer` |
| Artifact Registry Reader | `roles/artifactregistry.reader` |

## Notes

- Scan results are available for 48 hours after the scanning operation completes. The output of `list-vulnerabilities` is a list of occurrences in the Grafeas format.
- Local images use `REPOSITORY:TAG` or `REPOSITORY`. For images in Artifact Registry the `IMAGE_URI` must include `REPOSITORY_ID`.
- In gcloud 593.0.0, scanning for all package types is the default; `--skip-package-types` skips specific types (COMPOSER, GO, MAVEN, NPM, NUGET, PYTHON, RUBYGEMS, RUST). `--additional-package-types` is marked DEPRECATED in the help.
- The `--async` output block of the source page is omitted.
- The help names the positional argument `RESOURCE_URI`; the source calls it `IMAGE_URI`.
- Pricing: https://cloud.google.com/artifact-analysis/pricing#ods (not copied).
- Source: https://docs.cloud.google.com/artifact-analysis/docs/scan-os-on-demand (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [scanning-types.md](./scanning-types.md)
- [container-scanning-overview.md](./container-scanning-overview.md)
- [severity-levels.md](./severity-levels.md)
- [investigate-vulnerabilities.md](./investigate-vulnerabilities.md)
