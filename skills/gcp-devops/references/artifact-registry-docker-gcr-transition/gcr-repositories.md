---
source: https://docs.cloud.google.com/artifact-registry/docs/transition/gcr-repositories
---

# gcr.io Repositories in Artifact Registry

`gcr.io` repositories let Container Registry users keep their existing infrastructure by storing images in Artifact Registry while serving requests to the same `gcr.io` URLs. They are Generally Available and continue to work after the Container Registry shutdown (effective March 18, 2025, Container Registry is shut down and writing images to it is unavailable; `gcr.io` URLs hosted on Artifact Registry, including Google-owned images, are not affected).

## Signature / Usage

Hosts mapped to `gcr.io` repositories appear in the Docker `credHelpers` section; this example is taken from https://docs.cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling:

```text
"credHelpers": {
  "asia.gcr.io": "gcloud",
  "eu.gcr.io": "gcloud",
  "gcr.io": "gcloud",
  "marketplace.gcr.io": "gcloud",
  "northamerica-northeast1-docker.pkg.dev": "gcloud",
  "us-central1-docker.pkg.dev": "gcloud",
  "us-east1-docker.pkg.dev": "gcloud",
  "us.gcr.io": "gcloud"
}
```

To transition, follow "Migrate automatically to Artifact Registry" (https://docs.cloud.google.com/artifact-registry/docs/transition/auto-migrate-gcr-ar).

## Options / Props

### `gcr.io` domain mapping

Artifact Registry supports requests to the `gcr.io` domain in `gcr.io` repositories in multi-regional locations corresponding to Container Registry host locations.

| Container Registry hostname | Artifact Registry repository location | Artifact Registry repository name |
|-----------------------------|----------------------------------------|-----------------------------------|
| `gcr.io` | `us` | `gcr.io` |
| `asia.gcr.io` | `asia` | `asia.gcr.io` |
| `eu.gcr.io` | `europe` | `eu.gcr.io` |
| `us.gcr.io` | `us` | `us.gcr.io` |

### Limitations

| Limitation |
|------------|
| When transitioning from Container Registry, you cannot map a Container Registry host to an Artifact Registry repository in a different project (images in a `gcr.io` repository can still be pulled from other Google Cloud projects) |
| Each Container Registry hostname maps to only one `gcr.io` repository in the same multi-region |
| Names of `gcr.io` repositories are predefined and cannot be modified |

## Notes

- Creating an Artifact Registry repository does not create Cloud Storage buckets in your project. Automation that interacts with Container Registry storage buckets must be updated; for example, grant Artifact Registry permissions on the repositories that host `gcr.io` images instead of Cloud Storage permissions on buckets.
- For more control over repository locations, transition to `pkg.dev` repositories; they have no `gcr.io` domain support, so more changes to existing automation and workflows are needed (see "Choose a transition option" in the transition page).
- Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling (the `credHelpers` example); this page has no code of its own.
- Source: https://docs.cloud.google.com/artifact-registry/docs/transition/gcr-repositories (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [transition-from-gcr.md](./transition-from-gcr.md)
- [copy-images.md](./copy-images.md)
- [pull-cached-dockerhub-images.md](./pull-cached-dockerhub-images.md)
