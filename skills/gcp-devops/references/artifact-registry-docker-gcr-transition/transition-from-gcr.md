---
source: https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr
---

# Transition from Container Registry

Container Registry is deprecated. Effective March 18, 2025, Container Registry is shut down and writing images to Container Registry is unavailable. `gcr.io` URLs hosted on Artifact Registry, including Google-owned images with `gcr.io` URLs, are not affected by the shutdown. Artifact Registry is the recommended service for container image storage and management and provides the same container management features plus more.

## Signature / Usage

### gcloud command comparison

The gcloud CLI commands for Container Registry (`gcloud container images ...`) map to `gcloud artifacts` commands; for example, listing and describing images with tags:

```bash
gcloud artifacts docker images list LOCATION-docker.pkg.dev/PROJECT/REPOSITORY
```

```bash
gcloud artifacts docker images list LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE \
--include-tags
```

Add and delete tags:

```bash
gcloud artifacts docker tags add \
us-west1-docker.pkg.dev/my-project/my-repo/my-image:iteration6-final \
us-west1-docker.pkg.dev/my-project/my-repo/my-image:release-candidate
```

```bash
gcloud artifacts docker tags delete LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE:TAG
```

## Options / Props

### Operation mapping (Container Registry to Artifact Registry)

| Operation | Container Registry | Artifact Registry |
|-----------|--------------------|-------------------|
| Create a repository | Not applicable | `gcloud artifacts repositories create` |
| Delete a repository | Not applicable | `gcloud artifacts repositories delete` |
| List images | `gcloud container images list` | `gcloud artifacts docker images list` |
| List tags | `gcloud container images list-tags` | `gcloud artifacts docker tags list` |
| Add a tag | `gcloud container images add-tag` | `gcloud artifacts docker tags add` |
| Delete a tag | `gcloud container images untag` | `gcloud artifacts docker tags delete` |
| Describe images | `gcloud container images describe` | `gcloud artifacts docker images list --include-tags` |

### Feature comparison

| Feature | Container Registry | Artifact Registry |
|---------|--------------------|-------------------|
| Supported formats | Container images only | Multiple formats, including container images, language packages and OS packages |
| Domain name | `gcr.io` | `pkg.dev`; can also store images for the `gcr.io` domain if you set up `gcr.io` repositories |
| Repository modes | Not applicable | Standard (stores artifacts), Remote (caches artifacts from an upstream such as Docker Hub), Virtual (single endpoint for multiple upstream repositories) |
| Registry creation | A registry host is created by pushing the first image; images live in Cloud Storage buckets in your project and registry-specific permissions are applied to a bucket | Creating a repository is separate from push / pull. `gcr.io` repositories: initial setup auto-creates Artifact Registry repositories for each Container Registry host in your project and redirects `gcr.io`. For all push and pull requests to `pkg.dev` the repository must already exist. No Cloud Storage buckets to manage |
| Registry location | Only four multi-regional registry hosts per project | Multiple, separately controlled repositories in a region or multi-region |
| Access control | Cloud Storage roles; restrict access to a whole multi-region but not individual repositories (for example `us.gcr.io` in `my-project`, not `us.gcr.io/my-project/team1`) | Artifact Registry roles; restrict access per repository (for example `us-docker.pkg.dev/my-project/team1`); conditional access with IAM and repository tags |
| Authentication | Several methods for third-party clients | Same authentication methods as Container Registry |
| CMEK | Encrypts the storage buckets that contain images | Encrypts individual repositories |
| Console | Container Registry section | Artifact Registry section lists Artifact Registry and Container Registry repositories; clicking a Container Registry repository opens the Container Registry section |
| gcloud CLI and API | `gcloud container images` commands; shortened digests supported; no REST or RPC API | `gcloud artifacts docker` commands; shortened digests not supported; REST and RPC API |
| Pub/Sub notifications | Publishes changes to the `gcr` topic | Publishes changes to the `gcr` topic; if repositories are in the same project as existing Container Registry, existing Pub/Sub configuration works automatically |
| Audit logging | None for registry activity | Cloud Logging tracks repository changes |
| Cached Docker Hub images | `mirror.gcr.io` pull-through cache of the most frequently requested Docker Hub images; now hosted on Artifact Registry | `mirror.gcr.io` is hosted on Artifact Registry; no action unless used in a VPC Service Controls perimeter |
| VPC Service Controls | Container Registry can be added to a service perimeter | Artifact Registry can be added to a service perimeter |
| Artifact Analysis | On-demand scanning (OS and language packages, supported OS) and automatic scanning (OS vulnerabilities only) | On-demand and automatic scanning; automatic scanning returns OS vulnerabilities for supported OS and language package vulnerabilities for supported and unsupported OS |
| Image streaming | Unavailable | Stream images to GKE or Managed Service for Apache Spark |
| Cloud Run source deployment | Unavailable | One gcloud command builds, stores in Artifact Registry and deploys to Cloud Run |
| Pricing | Cloud Storage usage (storage and network transfer) | Own pricing based on storage and network transfer (see the Artifact Registry pricing page) |
| Quota | Fixed request limits; Cloud Storage quotas also apply | Per-project and per-user quotas; per-user quota is unlimited by default and can be capped |

### New features in Artifact Registry

| Feature |
|---------|
| Repository-level access control |
| Regional hosting for lower latency, data transfer cost and data residency compliance |
| Image streaming to GKE and Managed Service for Apache Spark |
| Deploying to Cloud Run from source |
| Audit logging for repository activity |
| Organization policy enforcement, including CMEK and location constraints |
| Scanning for OS and language package vulnerabilities |
| Virtual repositories |
| Remote repositories (for example Docker Hub or Maven Central) |

## Notes

- Container Registry is shut down (March 18, 2025). `gcr.io` URLs hosted on Artifact Registry, including Google-owned images, are not affected; most Google-owned images previously on Container Registry (for example the Cloud Build official builder images) now live in `gcr.io` repositories on Artifact Registry and need no URL change.
- Snippets taken from https://docs.cloud.google.com/artifact-registry/docs/docker/manage-images (gcloud commands); the transition page itself has no code blocks.
- Commands for Container Registry itself (`gcloud container images`) are not shown in code here because the service is shut down; use the mapping table.
- `mirror.gcr.io` in a VPC Service Controls perimeter: see "Use Artifact Registry with VPC Service Controls" (`gcp-security` covers VPC Service Controls).
- Artifact Analysis and vulnerability scanning are covered by `gcp-security`.
- Source: https://docs.cloud.google.com/artifact-registry/docs/transition/transition-from-gcr (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gcr-repositories.md](./gcr-repositories.md)
- [copy-images.md](./copy-images.md)
- [pull-cached-dockerhub-images.md](./pull-cached-dockerhub-images.md)
- [manage-images.md](./manage-images.md)
