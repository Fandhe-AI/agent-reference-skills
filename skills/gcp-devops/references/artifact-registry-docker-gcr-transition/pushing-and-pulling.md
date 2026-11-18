---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling
---

# Push and Pull Images

Store, version and retrieve container images in Artifact Registry using Docker or Podman, and pull with `crictl` to troubleshoot GKE nodes. Pushing works to standard repositories only; pulling works from standard, remote and virtual repositories.

## Signature / Usage

### Check configured hosts (credential helpers)

Artifact Registry does not add all hosts to the Docker configuration file (many configured registries slow Docker down). Show the file (Linux `cat ~/.docker/config.json`, Windows `type %USERPROFILE%\.docker\config.json`); the `credHelpers` section lists hosts ending in `-docker.pkg.dev`:

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

Add a missing host with the gcloud CLI credential helper:

```bash
gcloud auth configure-docker us-west1-docker.pkg.dev
```

or the standalone helper:

Adapted (not in the official docs): the host is passed with `--registries`, as on the authentication page; the source passes it as a positional argument.

```bash
docker-credential-gcr configure-docker --registries=us-west1-docker.pkg.dev
```

### Authenticate with an access token (Linux)

Valid 60 minutes; requires `roles/iam.serviceAccountTokenCreator` on the service account:

```bash
gcloud auth print-access-token \
  --impersonate-service-account  ACCOUNT | docker login \
  -u oauth2accesstoken \
  --password-stdin https://LOCATION-docker.pkg.dev
```

### Authenticate with a service account key

Base64-encoded key in `key.json` (Linux):

```bash
cat key.json | docker login -u _json_key_base64 --password-stdin \
https://us-west1-docker.pkg.dev
```

### Tag and push with Docker (standard repositories)

Check whether immutable tags are enabled:

```bash
gcloud artifacts repositories describe REPOSITORY \
    --project=PROJECT-ID \
    --location=LOCATION
```

Tag (default tag `latest` if omitted), then push:

```bash
docker tag SOURCE-IMAGE LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG
```

```bash
docker tag my-image us-west1-docker.pkg.dev/my-project/my-repo/test-image:staging
```

```bash
docker push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG
```

List the pushed image with tags and digests:

Adapted (not in the official docs): the source shows the optional flag as `[--include-tags]`; the brackets are removed so the command can be run as written.

```bash
gcloud artifacts docker images list \
LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE --include-tags
```

### Push with Podman

```bash
podman build -t IMAGE:latest .
```

```bash
podman tag IMAGE-NAME LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY_NAME/PODMAN-IMAGE:TAG
```

```bash
gcloud auth configure-docker LOCATION-docker.pkg.dev
```

If Podman cannot get credentials automatically, use an access token:

```bash
gcloud auth print-access-token | podman login -u oauth2accesstoken --password-stdin LOCATION-docker.pkg.dev
```

```bash
podman push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY_NAME/IMAGE:TAG
```

### Pull with Docker (standard, remote, virtual repositories)

```bash
docker pull LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG
```

```bash
docker pull LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE@IMAGE-DIGEST
```

For `ghcr.io` remote repositories the owner is part of the path:

```bash
docker pull us-west1-docker.pkg.dev/my-project/my-repo/owner-name/test-image:staging
```

### Pull with `crictl` (GKE containerd nodes)

On the node, obtain an access token from the metadata server:

```bash
curl -s "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" -H "Metadata-Flavor: Google"
```

Pull with the `access_token` value:

```bash
crictl pull --creds "oauth2accesstoken:ACCESS_TOKEN" LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG
```

## Options / Props

| Item | Value | Description |
|------|-------|-------------|
| Pull images | `roles/artifactregistry.reader` on the repository | Artifact Registry Reader |
| Tag and push images | `roles/artifactregistry.writer` on the repository | Artifact Registry Writer (minimum for push) |
| Maximum artifact size | 5 TB | Per image |
| Chunked uploads | Not supported | Use monolithic uploads (Docker chunked upload spec); some tools support both |
| Access token lifetime | 60 minutes | Use another method if an upload may exceed 60 minutes |
| Repository modes | push: standard; pull: standard, remote, virtual | Pulling from a remote repository downloads and caches the image from upstream if no cached copy exists |

### Virtual repository priority example

| Upstream | Priority | Behavior |
|----------|----------|----------|
| `main-repo` | 100 | Searched first (highest value) |
| `secondary-repo1` | 80 | Searched next; equal priority with `secondary-repo2`, either may serve the image |
| `secondary-repo2` | 80 | Same as above |
| `test-repo` | 20 | Lowest; serves an artifact only if no other upstream has it |

## Notes

- Corrected from the official docs: the source writes `docker-credential-gcr configure-docker us-west1-docker.pkg.dev`; the standalone helper takes hosts with `--registries=HOSTNAME-LIST` (the authentication page's form).
- Tag immutability: if enabled, a tag must always reference the same digest, including `latest`; pushing a tag already used by another version of the image fails. The pull-through behavior for virtual repositories chooses an upstream by priority.
- Service account keys are long-lived credentials; prefer the credential helper or an access token, never commit `key.json`, and see [authentication.md](./authentication.md).
- The source's Windows access-token example passes the token with `docker login -p "ya29..."` on the command line; it is omitted here because a token on the command line can be logged or appear in shell history. Use `--password-stdin` as in authentication.md.
- The metadata-server `curl` command prints an access token to the terminal; do not share or log the output.
- The `crictl pull --creds` form puts the short-lived token on the command line; use it only on the node you are troubleshooting. The metadata-server URL is plain `http://`, which is how the metadata server is reached from the VM.
- Adapted from the official docs: `[--include-tags]` in the `gcloud artifacts docker images list` example is shown as `--include-tags` (brackets removed).
- Podman looks for credentials in `~/.config/containers/auth.json` first and falls back to `~/.docker/config.json`; if that fails, copy the `auths` section or use `podman login`.
- `crictl` is a troubleshooting tool; push and tag commands are not available.
- The source also shows Windows variants and Console steps.
- Image building and the Docker CLI are covered by the `docker` skill; this skill covers storing and pulling images in Artifact Registry.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [names.md](./names.md)
- [manage-images.md](./manage-images.md)
- [troubleshoot.md](./troubleshoot.md)
