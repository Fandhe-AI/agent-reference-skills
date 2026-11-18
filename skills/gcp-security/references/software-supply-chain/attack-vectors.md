---
source: https://docs.cloud.google.com/software-supply-chain-security/docs/attack-vectors
---

# Software supply chain threats

Attack vectors are the ways someone can intentionally or accidentally compromise your software across its lifecycle. Letters A to H are threats described in the SLSA framework; numbers 1 to 4 are additional vectors SLSA does not directly describe. Risks include leaked credentials or confidential data, data corruption, malware installation and application outages.

## Signature / Usage

### Scan a container image locally (mitigation for threat 1)

For threat 1 (write insecure code), developers can use the On-Demand Scanning API to scan container images for OS and language package vulnerabilities. Start a scan of a container image stored locally, and perform the analysis in Asia:

```bash
gcloud artifacts docker images scan ubuntu:latest --location=asia
```

## Options / Props

### Source threats

| ID | Threat | Mitigations named in the source |
|----|--------|---------------------------------|
| 1 | Write insecure code (lack of secure coding practices, insecure developer workstations) | Policies for developer workstations with Cloud Workstations; local scanning (Cloud Code source protect, private preview; On-Demand Scanning API for OS and language package vulnerabilities in container images); developer education |
| A | Submit bad code to the source repository | Human review of source changes; code scanning and linting integrated with IDEs and source control |
| B | Compromise the source control system | Restrict access to source control and build pipeline systems; multi-factor authentication |

### Build threats

| ID | Threat | Mitigations named in the source |
|----|--------|---------------------------------|
| C | Build with source not from the trusted source control system | Build services that generate provenance (Cloud Build); CI/CD infrastructure inside a VPC Service Controls perimeter; trusted copies of open source dependencies in Artifact Registry |
| D | Compromise the build system | Least privilege with predefined or custom IAM roles; managed build services (Cloud Build runs ephemeral builds: a VM environment per build, destroyed afterwards); VPC Service Controls perimeter |
| F | Package and publish software built outside the official process | Build systems that generate and sign build provenance |
| G | Compromise the repository storing your software | Trusted copies of dependencies in private artifact stores; validate build and source provenance; restrict upload permissions to dedicated non-human accounts (service accounts) and repository administrators |

### Deployment and runtime threats

| ID | Threat | Mitigations named in the source |
|----|--------|---------------------------------|
| H | Resolving dependencies by version range or a tag not permanently attached to a build (not reproducible, dependency confusion) | Best practices for dependencies |
| 2 | Compromise the deployment process | Restrict access to the deployment service; test in pre-production; Cloud Deploy for continuous delivery and promotion |
| 3 | Deploy compromised or noncompliant software | Binary Authorization to validate images against policy and block untrusted sources |
| 4 | Vulnerabilities and misconfiguration in running software (for example running as root, privilege escalation) | GKE security posture dashboard (vulnerabilities and configuration issues); Cloud Run security insights for deployed revisions |

### Dependency threat

| ID | Threat | Notes |
|----|--------|-------|
| E | Using a bad dependency in the build | Includes internal components, commercial third-party and open source software, direct and transitive dependencies, vulnerabilities from other vectors, and intentional removal of an open source dependency from a public repository |

## Notes

- The source states that overall integrity is only as strong as the most vulnerable part, and that the cumulative effect (swiss cheese model) lets you implement mitigations incrementally.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/artifacts/docker/images/scan (gcloud 593.0.0 help, EXAMPLES). Local scans need the `local-extract` gcloud component and a local Docker image; the full On-Demand Scanning workflow is in the scan-os-on-demand page of the Artifact Analysis category.
- Source: https://docs.cloud.google.com/software-supply-chain-security/docs/attack-vectors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md)
- [practices.md](./practices.md)
- [safeguard-source.md](./safeguard-source.md)
- [safeguard-builds.md](./safeguard-builds.md)
- [safeguard-deploys.md](./safeguard-deploys.md)
