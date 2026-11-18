---
source: https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-deploys
---

# Safeguard deployments

Best practices for protecting deployments: define and enforce deployment policies with metadata about build artifacts, use gated deployment services, and monitor running workloads. On Google Cloud this maps to Binary Authorization, Cloud Deploy, the GKE security posture dashboard and Cloud Run security insights.

## Signature / Usage

### Export the Binary Authorization policy

Binary Authorization enforces policy for deployments to supported container-based platforms. The gcloud example exports the current project policy as YAML.

```bash
gcloud container binauthz policy export > my_policy.yaml
```

## Options / Props

### Example deployment criteria

| Criterion |
|-----------|
| No known vulnerabilities with a severity above Medium |
| Source code is from a trusted source repository |
| A trusted build service ran the build |
| Build artifacts you are deploying are from a trusted artifact repository |

### Metadata and tools

| Metadata | Source of the metadata |
|----------|------------------------|
| Build origins (build provenance: digests, input source locations, toolchain, duration) | Cloud Build generates and signs provenance for container images supporting SLSA level 3 builds; SLSA GitHub provenance tools; sigstore `cosign` for signing containers |
| Vulnerabilities | Artifact Analysis automatically scans images pushed to Artifact Registry; On-Demand Scanning API in local development or CI/CD (for example a Cloud Build step) |

### SLSA provenance levels (SLSA v0.1)

| Level | Provenance |
|-------|------------|
| 1 | Provenance must be available |
| 2 | Provenance must be generated and consumers must be able to verify authenticity and integrity |
| 3 and 4 | Stricter requirements for provenance signing and depth of provenance data detail |

## Notes

- Binary Authorization can block all images not in the exempt image list and can require attestations (for example "built by Cloud Build" or "no vulnerabilities above a specified severity", with an allowlist for specific vulnerabilities that do not apply).
- Continuous validation extends policy checks after deployment: it regularly logs policy conformance for Pods to Cloud Logging, including Pods that violate an updated policy and Pods deployed with dry run or breakglass. The source says it works for workloads on GKE, Cloud Run and GKE Enterprise; the continuous validation overview (`binary-authorization/overview-cv.md`) limits CV with check-based platform policies to GKE ("GKE is the only supported platform"), and legacy CV with project-singleton policies stopped monitoring Pods after May 1, 2025 (`binary-authorization/deprecation-cv-project-singleton-policy.md`). Plan continuous validation for GKE only, with a platform policy; Cloud Run gets Binary Authorization enforcement at deployment, not CV.
- Cloud Deploy gated deployment lets users specify whether an approval is needed for promotion to a target.
- The GKE security posture dashboard includes workload configuration scanning against practices such as the Pod Security Standards; Cloud Run's security panel shows SLSA build level compliance, provenance and vulnerabilities.
- Policy changes can block production deployments; test an edited policy in dry run before enforcing it, and try it on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/export (gcloud 593.0.0 help).
- SLSA version: the level table follows SLSA v0.1 (the source links https://slsa.dev/spec/v0.1/requirements), where source, build and provenance requirements share levels 1 to 4. The current specification (SLSA v1.2, https://slsa.dev/spec/v1.2/) splits them into a Build track (Build L0 to L3, https://slsa.dev/spec/v1.2/build-track-basics) and a separate Source track (Source L1 to L4, https://slsa.dev/spec/v1.2/source-requirements); SLSA v1.0 removed the source aspects (https://slsa.dev/spec/v1.0/levels). Use the table to read the source page, not as a current conformance checklist (retrieved 2026-11-18).
- Source: https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-deploys (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md)
- [attack-vectors.md](./attack-vectors.md)
- [safeguard-source.md](./safeguard-source.md)
- [safeguard-builds.md](./safeguard-builds.md)
