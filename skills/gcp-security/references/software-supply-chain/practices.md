---
source: https://docs.cloud.google.com/software-supply-chain-security/docs/practices
---

# Protect your software supply chain

Index of best practices that protect software across processes and systems: safeguarding source, builds, dependencies and deployments, plus cross-lifecycle practices such as access control, audit and monitoring, foundational coding and DevOps practices, license compliance and security training.

## Signature / Usage

### Apply a deployment criterion as a Binary Authorization policy

Company policies might include criteria for deployment that you implement with Binary Authorization. After editing an exported policy file, import it:

```bash
gcloud container binauthz policy import my_policy.yaml
```

## Options / Props

### Practice areas

| Area | Where to read more |
|------|--------------------|
| Source integrity | Safeguarding source integrity (see [safeguard-source.md](./safeguard-source.md)) |
| Build integrity | Safeguarding build integrity (see [safeguard-builds.md](./safeguard-builds.md)) |
| Dependencies | Managing dependencies (best practices for dependencies; not covered by a page in this category) |
| Deployments | Safeguarding deployments (see [safeguard-deploys.md](./safeguard-deploys.md)) |

### Resources named by the source

| Topic | Resource |
|-------|----------|
| Security foundations on Google Cloud | Google Cloud enterprise foundations blueprint, in the Google Cloud security best practices center |
| Centralized vulnerability and risk information | Security Command Center (see the `gcp-security-compliance` skill) and Recommender (identifies, for example, IAM principals with excess permissions or unattended projects) |
| DevOps practices | DORA DevOps capabilities |
| Secure coding and licensing training | Linux Foundation courses: Developing Secure Software (created by OpenSSF), Open Source Licensing Basics for Developers, Introduction to Open Source License Compliance Management |
| Policy baselines | Minimum Viable Secure Product (MVSP) checklist; NIST SP 800-53 (Security and Privacy Controls for Information Systems and Organizations) |

## Notes

- The source cites the State of Cybersecurity 2021, Part 2 survey: social engineering was the most frequent type of attack, and training and awareness programs had some positive impact (46%) or strong positive impact (32%) on employee awareness.
- Some open source licenses require you to release your source code under the same license as the reused open source software; know the license terms of direct and transitive dependencies.
- Importing a policy updates the current project's Binary Authorization policy and can block deployments; try policy edits on a disposable project and in dry run first. `--strict-validation` performs additional checks on the validity of policy contents. The policy format and commands are in the Binary Authorization category.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/binauthz/policy/import (gcloud 593.0.0 help, EXAMPLES).
- Source: https://docs.cloud.google.com/software-supply-chain-security/docs/practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md)
- [attack-vectors.md](./attack-vectors.md)
- [safeguard-source.md](./safeguard-source.md)
- [safeguard-builds.md](./safeguard-builds.md)
- [safeguard-deploys.md](./safeguard-deploys.md)
