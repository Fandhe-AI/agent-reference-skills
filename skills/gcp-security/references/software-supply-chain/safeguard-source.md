---
source: https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-source
---

# Safeguard source

Best practices for managing source code: use version control for more than application source, configure repositories in a standardized and security-conscious way, require meaningful code review, and control merge approvals. The practices follow SLSA source requirements.

## Signature / Usage

### Scan containers locally during code review

The On-Demand Scanning API lets you scan containers locally for vulnerabilities, for example when reviewing third-party libraries in pull requests. Start a scan of a container image stored locally, and perform the analysis in Asia:

```bash
gcloud artifacts docker images scan ubuntu:latest --location=asia
```

## Options / Props

### SLSA source requirements named in the source (SLSA v0.1)

| SLSA level | Source requirement |
|------------|--------------------|
| 2 | Version control system with change history and immutable revisions; recommended starting baseline |
| 3 | Source and build platforms adhere to stronger security requirements, including verified source history and source retention policy |
| 4 | Two-person review; two strongly authenticated approvers; two-factor authentication for code approvers |

### Practices

| Area | Practice |
|------|----------|
| Version control scope | Keep infrastructure-as-code, configuration management, database configurations and migration scripts, Jupyter notebooks and security policies (for example Gatekeeper or Sentinel policies) in version control, not only application source |
| Repository configuration | Automated repeatable setup (for example Terraform modules); configuration templates by security level; centralized identity management with multi-factor authentication; limit repository owners to a small number of trusted employees and, if possible, remove their ability to merge without a second reviewer |
| Code review | Test automation; reviewer count and identity appropriate to the application's security level; reviewers chosen for technical expertise and trust level; checklists, style guides and linters; review on feature-branch pull requests early; vulnerability scanning of third-party libraries in pull requests and IDEs (On-Demand Scanning API scans containers locally); pre-merge automated tests |
| Merge approvals | Protected branch owners on production branches; tightly control repository owner identities; separate deployment and merge approval processes for multi-repository and multi-artifact rollouts |

### Google Cloud tools

| Tool | Status in the source | Purpose |
|------|----------------------|---------|
| Cloud Workstations | Preview | Managed development environments with VPC Service Controls, private ingress or egress, forced image update and IAM access policies |
| Cloud Code source protect | Preview; not available for public access (access request page) | Real-time IDE feedback on vulnerable dependencies and license reporting |

## Notes

- Version control is one of the DORA technical capabilities; it helps reproduce and recover environments and trace and audit changes.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/docker/images/scan (gcloud 593.0.0 help, EXAMPLES). Local scans need the `local-extract` gcloud component and a local Docker image; the full On-Demand Scanning workflow is in the scan-os-on-demand page of the Artifact Analysis category.
- Terraform links and Console steps are omitted; see the source page.
- SLSA version: the level table follows SLSA v0.1 (the source links https://slsa.dev/spec/v0.1/requirements), where source, build and provenance requirements share levels 1 to 4. The current specification (SLSA v1.2, https://slsa.dev/spec/v1.2/) splits them into a Build track (Build L0 to L3, https://slsa.dev/spec/v1.2/build-track-basics) and a separate Source track (Source L1 to L4, https://slsa.dev/spec/v1.2/source-requirements); SLSA v1.0 removed the source aspects (https://slsa.dev/spec/v1.0/levels). Use the table to read the source page, not as a current conformance checklist (retrieved 2026-11-18).
- Source: https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-source (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md)
- [attack-vectors.md](./attack-vectors.md)
- [practices.md](./practices.md)
- [safeguard-builds.md](./safeguard-builds.md)
- [safeguard-deploys.md](./safeguard-deploys.md)
