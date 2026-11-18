---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/troubleshoot
---

# Troubleshoot Docker Image Problems

Troubleshooting steps for pull, push and deploy failures with container images in Artifact Registry: project ID syntax, image paths, permissions, tag immutability and GKE `ImagePullBackOff`.

## Signature / Usage

### Valid and invalid image paths

The path must include the registry hostname, Google Cloud project ID, repository and image:

```text
us-west1-docker.pkg.dev/my-project/my-repo/my-image:v1
```

Each repository is a separate resource, so a path without a repository is invalid:

```text
us-west1-docker.pkg.dev/my-project/my-image:v1
```

### Check for immutable tags

```bash
gcloud artifacts repositories describe REPOSITORY \
      --project=PROJECT-ID \
      --location=LOCATION
```

## Options / Props

| Symptom | Check | Fix |
|---------|-------|-----|
| Docker CLI rejects a domain-scoped project ID | Colons (`:`) in the project ID | Replace colons with a forward slash (`/`) |
| Cannot pull an image or deploy to a runtime | Full image path, and read permission of the pulling account | Compute Engine, GKE: grant `roles/artifactregistry.reader` to the runtime service account. Cloud Run deployment: grant it to the Cloud Run service agent `service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com` (see Notes) |
| Cannot push an image | Repository exists (unlike Container Registry, creating a repository is a separate operation), full image path, write permission | Create the repository; grant `roles/artifactregistry.writer` to the pushing account (Compute Engine, Cloud Run, GKE service accounts, or the Cloud Build service account that runs builds) |
| Message `The repository has enabled tag immutability` | The tag is already used by another version of the image | Push with a tag not used by other stored versions; check the **Immutable image tags** column or `gcloud artifacts repositories describe` |
| `ImagePullBackOff` / `ErrImagePull` | GKE cannot pull the image | Verify the GKE requirements to pull from Artifact Registry and the GKE image-pull troubleshooting guide |

## Notes

- Corrected from the official docs: for pull failures the source says to grant Artifact Registry Reader to the runtime service account for Compute Engine, Cloud Run and GKE. Cloud Run pulls the image at deployment with the Cloud Run service agent (`service-PROJECT_NUMBER@serverless-robot-prod.iam.gserviceaccount.com`), so grant Reader to that agent, on the repository or on the project that holds the image, especially when the image is in another project (see `access-control.md` and the `gcp-run` skill's deploying page). The runtime service account needs Artifact Registry roles only for what the running code itself does.
- If automatic role granting to service accounts is disabled (organization policy `restricting service accounts`), you must grant Artifact Registry roles to the runtime service accounts yourself.
- With Docker or another third-party tool, grant permissions to the account that interacts with the repository and configure the client to authenticate (see authentication.md).
- Service accounts and organization policy are covered by `gcp-foundation`; GKE is covered by `gcp-gke`.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/troubleshoot (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [names.md](./names.md)
- [pushing-and-pulling.md](./pushing-and-pulling.md)
