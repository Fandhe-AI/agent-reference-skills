---
source: https://docs.cloud.google.com/software-supply-chain-security/docs/overview
---

# Software supply chain security

Google Cloud offers modular capabilities across several products that developers, DevOps and security teams can combine to improve the security posture of a software supply chain: the code, people, systems and processes that contribute to developing and delivering software, inside and outside the organization. Google Cloud also provides console dashboards with security insights (vulnerabilities, build provenance, SBOM dependency lists) and reports the maturity level of the chain with the Supply-chain Levels for Software Artifacts (SLSA) framework.

## Signature / Usage

### Create an Artifact Registry repository

The overview describes Artifact Registry as the place to centralize build artifacts and dependencies (remote and virtual repositories are format-specific repository modes). The following gcloud example creates a Docker repository in the default project.

Adapted (not in the official docs): added `--location=LOCATION`, which the command requires unless the `artifacts/location` property is set.

```bash
gcloud artifacts repositories create my-repo \
    --repository-format=docker \
    --location=LOCATION
```

## Options / Props

### Components by protection stage

| Stage | Product | Role in the chain |
|-------|---------|-------------------|
| Development environment | Cloud Workstations | Fully managed development environments; VPC Service Controls, private ingress or egress, forced image update and IAM access policies. Additional data loss prevention when combined with Chrome Enterprise Premium. |
| Software supply | Assured Open Source Software | Open source packages that Google verified, tested, built in Google's secure pipelines and regularly scans. |
| Software supply | Artifact Registry | Universal package manager for build artifacts and dependencies. Remote repositories cache artifacts from external sources (Docker Hub, Maven Central, PyPI, Debian, CentOS and user-defined sources for supported formats). Virtual repositories consolidate same-format repositories behind one endpoint and control the search order, so private packages can be prioritized against dependency confusion. |
| Software supply | Artifact Analysis | On-demand or automated scanning of base container images and language packages in containers; generates SBOMs and uploads VEX statements for images in Artifact Registry. |
| CI/CD pipeline | Cloud Build | Granular IAM, VPC Service Controls, isolated and ephemeral build environments; SLSA Level 3 builds for container images; authenticated and non-falsifiable build provenance; security insights (SLSA build level, vulnerabilities, provenance). |
| CI/CD pipeline | Cloud Deploy | Automated delivery to GKE, GKE Enterprise and Cloud Run with approvals and rollbacks; shows security insights for deployed applications. |
| Production | GKE | Security posture dashboard with recommendations on cluster settings, workload configuration and vulnerabilities. |
| Production | Cloud Run | Security panel with SLSA build level compliance, build provenance and vulnerabilities found in running services. |
| Policy | Binary Authorization | Collects attestations (digital documents that certify images) and enforces trust-based deployment policies; works with GKE and Cloud Run; can notify on policy violations. |

### Pricing pages named by the source

| Service | Pricing note in the source |
|---------|----------------------------|
| Cloud Code | Available to all Google Cloud customers at no charge |
| Assured OSS | Contact the sales team |
| Cloud Workstations, Artifact Registry, Artifact Analysis, Cloud Build, Cloud Deploy, Cloud Run, GKE, Binary Authorization | See each product's pricing page (prices are not copied here) |

## Notes

- Example from the source analysis: a December 2021 assessment of the Apache Log4j vulnerability by the Google Open Source Insights team found over 17,000 affected packages in Maven Central, most of which depended on `log4j-core` only indirectly.
- Image building is covered by the `docker` skill; enforcement of Binary Authorization policy on GKE clusters is in the `gcp-gke` skill. Artifact Registry, Cloud Build and Cloud Deploy `gcloud` and guides are in `gcp-devops`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/repositories/create (gcloud 593.0.0 help, EXAMPLES).
- Adapted from the official docs: the help example `gcloud artifacts repositories create my-repo --repository-format=docker` creates the repository "in the default project and location"; the SYNOPSIS `(REPOSITORY : --location=LOCATION)` needs `--location` when no default `artifacts/location` is configured.
- Source: https://docs.cloud.google.com/software-supply-chain-security/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [attack-vectors.md](./attack-vectors.md)
- [practices.md](./practices.md)
- [safeguard-source.md](./safeguard-source.md)
- [safeguard-builds.md](./safeguard-builds.md)
- [safeguard-deploys.md](./safeguard-deploys.md)
- [assured-oss-overview.md](./assured-oss-overview.md)
