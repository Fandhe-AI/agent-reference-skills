---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories
---

# Repository concepts

Artifact Registry stores different artifact types, supports multiple repositories per project, and associates a regional or multi-regional location with each repository. This page covers formats, modes, location, cleanup policies, project structure, access control, encryption and labels.

## Signature / Usage

### Cleanup policy example

Given these Docker images in a repository, a **Keep most recent versions** policy set to keep 3 versions for **Package prefixes** `{release-xyz}` keeps only `release-xyz-v1` and `release-xyz-v2`. Packages that do not match the prefix are not kept by that policy.

Adapted (not in the official docs): a repository (`my-repo`) is added to the image paths in this sample listing, which the source writes as `us-west1-docker.pkg.dev/my-project/IMAGE`.

```text
IMAGE: us-west1-docker.pkg.dev/my-project/my-repo/release-xyz-v1
DIGEST: sha256:1b0a26bd07a3d17473d8d8468bea84015e27f87124b2831234581bce13f61370
TAGS:
CREATE_TIME: 2023-06-19T18:59:09
UPDATE_TIME: 2023-06-19T18:59:10

IMAGE: us-west1-docker.pkg.dev/my-project/my-repo/release-xyz-v2
DIGEST: sha256:6e494387c901caf429c1bf77bd92fb82b33a68c0e19f123456a3ac8d27a7049d
TAGS: latest
CREATE_TIME: 2023-06-19T18:59:09
UPDATE_TIME: 2023-06-19T18:59:09

IMAGE: us-west1-docker.pkg.dev/my-project/my-repo/release-v2
DIGEST: sha256:6e494387c901caf429c1bf77bd92fb82b33a68c0e19f123456a3ac8d27a7049d
TAGS: latest
CREATE_TIME: 2023-06-19T18:59:09
UPDATE_TIME: 2023-06-19T18:59:09
```

### List supported locations

Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/repo-locations.

```bash
gcloud artifacts locations list
```

## Options / Props

### Repository modes

The mode cannot be changed after the repository is created. Each repository holds one format; multiple repositories per format are allowed in one project.

| Mode | Behavior |
|---|---|
| Standard | Private artifacts; upload and download directly; Artifact Analysis can scan. |
| Remote | Read-only proxy that caches artifacts from upstream standard Artifact Registry repositories or external sources (Docker Hub, Maven Central, PyPI, Debian, CentOS). First request downloads and caches; later requests serve the cache. |
| Connector (Preview) | Proxy that does not cache; all requests are handled by the upstream source. For full auditability or policies that prevent caching. |
| Virtual | Read-only single access point over one or more upstream repositories of the same format; an upstream can be standard, remote or virtual. Priority controls order; helps mitigate dependency confusion. |

### Cleanup policy criteria

| Setting | Meaning |
|---|---|
| Tag state | Required for delete policies. `Any tag state` / `Tagged` / `Untagged` (`tagState`: `TAGGED`, `UNTAGGED`, `ANY`). Formats without tags are treated as `untagged`. Tagged artifacts in repositories with immutable tags cannot be deleted. |
| Tag prefixes | Comma-separated; `test`, `staging` match `testenv` and `staging-1.5`. Requires `tagState` `TAGGED`. |
| Version prefixes | Comma-separated; `v1`, `v2` match `v1.5`, `v2.0alpha`, `v10.2`. |
| Package prefixes | List of artifact name prefixes; `red, blue` match `red-team`, `redis`, `bluebird`. |
| Older than | Minimum time since upload as a duration; append `s`, `m`, `h` or `d` (`30d` = 30 days). |
| Newer than | Maximum time since upload as a duration (`30d`). |
| Keep most recent versions | Keep policy only: keeps a set number of most recent versions per package. |

### Location and egress

| Case | Egress charge |
|---|---|
| Artifact Registry to Google Cloud services in the same region | None |
| `us` multi-region to a US region such as `us-central` | Not charged; to any region in Canada or South America: charged |
| `asia` multi-region to Asia regions such as `asia-northeast1` | Not charged; to Australia regions: charged |

## Notes

- Corrected from the official docs: the cleanup-policy sample listing shows image paths without a repository (`us-west1-docker.pkg.dev/my-project/release-xyz-v1`); Artifact Registry Docker paths are `LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE`, so `my-repo` is added.
- If an artifact version matches both a delete policy and a keep policy, the keep policy wins. With **Package prefixes** in a **Keep most recent versions** policy, only packages matching the prefixes are kept (caution in the source).
- Deletions triggered by delete policies count against the per-project delete request quota: https://docs.cloud.google.com/artifact-registry/quotas#project-quota. Cleanup policies delete artifacts irreversibly; use dry run first (see https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy) and try on a disposable project.
- Location: balance latency, availability and egress cost; create repositories in the same region as GKE, Cloud Run, Cloud Build and other consumers. Image streaming (GKE and Managed Service for Apache Spark) works only if images are in the same region as the workloads or a corresponding multi-region. Consider consumers outside Google Cloud as well.
- Restricting locations: a resource locations constraint in the organization policy limits repository creation to compliant regions; it is enforced only once added. Existing repositories in non-compliant locations must be migrated by you, then deleted.
- gcr.io domain support: repositories can host images on the `gcr.io` domain, redirecting requests to `gcr.io` and creating gcr.io repositories on first push to a gcr.io hostname, to match Container Registry behavior. See https://docs.cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo
- Project structure: centralized (all repositories in one project, repository-level access for other projects; simplifies virtual repositories) or project-specific (needed for data governance or trust boundaries).
- Access control: repositories require permissions unless configured for public access (https://docs.cloud.google.com/artifact-registry/docs/access-control#public; `allUsers` access opens a repository to the internet). Permissions can be granted at project or repository level; prefer repository level and least privilege. Default service accounts have default access only to repositories in the same project. A repository administrator must explicitly grant access when Artifact Registry is in a different project than the service, when custom IAM roles are used with default service accounts, when you do not use the service's default service account, and when you set up virtual repositories (the Artifact Registry service account needs access to upstream repositories). Examples: GKE node service accounts need read only; developers need read/write on a dev repository and read-only on production; a sales team needs read-only on a demo repository.
- Restrict artifact downloads (Preview): download rules allow or deny downloads for repositories and packages, optionally conditioned on tags or versions: https://docs.cloud.google.com/artifact-registry/docs/restrict-artifact-downloads
- Encryption: Google-owned and Google-managed keys by default; customer-managed encryption keys (CMEK) are available, and organization policy constraints can require CMEK: https://docs.cloud.google.com/artifact-registry/docs/cmek
- Labels group and filter repositories (by stage, team, billing); tags on repositories are for programmatic policy control across an organization.
- Artifact Analysis, Cloud KMS and VPC Service Controls details are in `gcp-security`; IAM and organization policy in `gcp-foundation`.
- The source page has no code block; the text block above is the source's example image listing.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-repos.md](./create-repos.md)
- [repo-locations.md](./repo-locations.md)
- [virtual-overview.md](./virtual-overview.md)
- [supported-formats.md](./supported-formats.md)
- [overview.md](./overview.md)
