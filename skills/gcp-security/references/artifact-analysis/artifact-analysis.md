---
source: https://docs.cloud.google.com/artifact-analysis/docs/artifact-analysis
---

# Artifact Analysis overview

Artifact Analysis is a family of services for software composition analysis and metadata storage and retrieval (formerly Container Analysis; the new name does not change existing products or APIs). Its detection points are built into products such as Artifact Registry and Google Kubernetes Engine (GKE), and the scanning services share a common vulnerability store.

## Signature / Usage

### Registry scanning

- Automatic scanning in Artifact Registry is triggered every time a new image is pushed. Vulnerability information is continuously updated when new vulnerabilities are discovered. Artifact Registry includes application language package scanning.
- Security Command Center aggregates vulnerability findings from Artifact Registry scans so that container image vulnerabilities in running workloads are visible across all projects. Findings can be exported to BigQuery. See the `gcp-security-compliance` skill.

### On-Demand scanning

- Not continual: you run a command to start each scan. Scan results are available up to 48 hours after the scan completes, and the vulnerability information is not updated after the scan finishes. Images stored locally can be scanned without pushing them to Artifact Registry or GKE runtimes first.

### Access metadata

- Artifact Analysis stores and retrieves structured metadata for Google Cloud resources; metadata is associated with images through **notes** and **occurrences**.
- With metadata in a CI/CD pipeline, Binary Authorization can create deployment policies that only allow compliant images from trusted registries.

Remote On-Demand Scanning syntax:

```text
gcloud artifacts docker images scan IMAGE_URI \
    --remote [--location=(us,europe,asia)] [--async]
```

## Notes

- Two scanning modes: automatic scanning (Artifact Registry, on push and continuous) and On-Demand Scanning (manual, local or remote). Pricing: https://cloud.google.com/artifact-analysis/pricing (not copied).
- Image building is covered by `docker`; Binary Authorization enforcement on GKE clusters is covered by the `gcp-gke` skill. Artifact Registry repository management belongs to `gcp-devops` (planned).
- The CI/CD diagram of the source page is omitted.
- Snippet taken from https://docs.cloud.google.com/artifact-analysis/docs/scan-os-on-demand (remote scan syntax).
- Source: https://docs.cloud.google.com/artifact-analysis/docs/artifact-analysis (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [container-scanning-overview.md](./container-scanning-overview.md)
- [scanning-types.md](./scanning-types.md)
- [enable-automatic-scanning.md](./enable-automatic-scanning.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
- [metadata-management-overview.md](./metadata-management-overview.md)
