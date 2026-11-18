---
source: https://docs.cloud.google.com/artifact-registry/docs/protect-artifacts
---

# Protecting artifacts in Artifact Registry

Overview of Google Cloud services and features that safeguard artifacts: encryption at rest, access control, download rules (Preview), VPC Service Controls, vulnerability scanning, Binary Authorization and removal of unused images.

## Signature / Usage

Removing unused images is done with cleanup policies. Dry run of a policy file:

```bash
gcloud artifacts repositories set-cleanup-policies REPOSITORY \
    --project=PROJECT_ID \
    --location=LOCATION \
    --policy=POLICY_FILE \
    --dry-run
```

## Options / Props

| Feature | Description |
|---|---|
| Encryption at rest | Automatic Google-managed encryption by default; CMEK repositories for key-related compliance requirements. |
| Access control | All repositories are private by default; grant minimum permissions (least privilege). |
| Download rules (Preview) | Allow or deny downloads for repositories and packages, optionally conditioned on tags or versions. One rule per repository plus one per package. |
| VPC Service Controls | Network security perimeter to prevent data exfiltration. |
| Automatic vulnerability scanning | Artifact Analysis scans container images on upload and monitors continuously for new vulnerabilities for up to 30 days after push. |
| On-Demand Scanning API | Manually scan local images or images in Artifact Registry, for example in Cloud Build before upload. |
| Binary Authorization | Deployment policy enforced when deploying a container image to supported environments. |

### Download rule supported formats

| Format |
|---|
| Apt |
| Docker |
| Go |
| Maven |
| npm |
| Python |

## Notes

- Download rules are Preview ("Pre-GA Offerings Terms"; available "as is", limited support). They are available on all repository modes and the formats above. On download, Artifact Registry checks the package-level rule first; if none exists or its conditions do not apply, it checks the repository-level rule. A package rule can allow downloads while a repository rule denies all.
- Download rules apply only to client-based download requests (Docker pulls, Maven downloads, npm installs). They do not apply to manual gcloud CLI pulls and API-based downloads such as the download file command; container pushes and metadata listings are separate operations and cannot be evaluated in the CEL schema.
- Public repositories: granting Artifact Registry Reader to `allUsers` (or `allAuthenticatedUsers` to limit to Google Cloud account holders) exposes the contents. Verify artifacts are sharable and contain no credentials, personal or confidential data; cap per-user quotas (default is unlimited per user); network data transfer is charged on downloads.
- Using public sources (GitHub, Docker Hub, PyPI, npm public registry): the source suggests automated builds (for example Cloud Build triggers) for consistent content, standardized base images, scanning with the On-Demand Scanning API / Artifact Analysis, and Binary Authorization to enforce internal standards.
- Removing unused images reduces storage costs and the risk of using old software; cleanup policies delete artifacts irreversibly, so run a dry run first and try on a disposable project.
- Vulnerability scanning and Binary Authorization are covered by the `gcp-security` skill.
- Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy
- Source: https://docs.cloud.google.com/artifact-registry/docs/protect-artifacts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [cmek.md](./cmek.md)
- [securing-with-vpc-sc.md](./securing-with-vpc-sc.md)
- [cleanup-policy-overview.md](./cleanup-policy-overview.md)
- [cleanup-policy.md](./cleanup-policy.md)
