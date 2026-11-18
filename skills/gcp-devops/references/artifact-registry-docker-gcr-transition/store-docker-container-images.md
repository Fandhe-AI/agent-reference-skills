---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images
---

# Store Docker Container Images in Artifact Registry (Quickstart)

Quickstart that creates a private Docker repository in Artifact Registry, configures Docker authentication with the gcloud CLI credential helper, pushes a sample image (`hello-app`) and pulls it back. Use Cloud Shell (Docker and gcloud CLI preinstalled) or a local shell with both installed.

## Signature / Usage

### Prepare a local shell

Add the user that runs Docker to the Docker security group (not needed on macOS). On Linux the group is `docker`:

Adapted (not in the official docs): `${USER}` is quoted.

```bash
sudo usermod -a -G docker "${USER}"
```

On Windows the group is `docker-users` (Administrator command prompt):

```text
net localgroup docker-users DOMAIN\USERNAME /add
```

Log out and back in, then check that Docker runs (`--rm` deletes the container on exit):

```bash
docker run --rm busybox date
```

### Create a Docker repository

```bash
gcloud artifacts repositories create quickstart-docker-repo --repository-format=docker \
    --location=us-west1 --description="Docker repository" \
    --project=PROJECT
```

```bash
gcloud artifacts repositories list \
    --project=PROJECT
```

### Configure authentication

```bash
gcloud auth configure-docker us-west1-docker.pkg.dev
```

### Obtain, tag, push and pull an image

```bash
docker pull us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
```

```bash
docker tag us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0 \
us-west1-docker.pkg.dev/PROJECT/quickstart-docker-repo/quickstart-image:tag1
```

```bash
docker push us-west1-docker.pkg.dev/PROJECT/quickstart-docker-repo/quickstart-image:tag1
```

```bash
docker pull us-west1-docker.pkg.dev/PROJECT/quickstart-docker-repo/quickstart-image:tag1
```

Expected output of the last pull:

```text
latest: Pulling from [PROJECT-ID]/quickstart-image:tag1
Digest: sha256:70c42...
Status: Image is up to date for us-west1-docker.pkg.dev/PROJECT/quickstart-docker-repo/quickstart-image:tag1
```

### Clean up

Adapted (not in the official docs): added `--project=PROJECT` so the delete targets the same project in which the repository was created with `--project=PROJECT` above, not whatever the gcloud default project is.

```bash
gcloud artifacts repositories delete quickstart-docker-repo --location=us-west1 \
    --project=PROJECT
```

## Options / Props

| Item | Value | Description |
|------|-------|-------------|
| Required role | Artifact Registry Administrator (`roles/artifactregistry.admin`) on the project | To create and manage Docker repositories (or an equivalent custom / predefined role) |
| Repository name | `quickstart-docker-repo` | Console path: format Docker, mode Standard, location type Region, location `us-west1` |
| `us-docker.pkg.dev` | hostname | Hostname for images in Artifact Registry Docker repositories; includes the location (`us`) |
| `google-samples` | project ID | In the sample image path |
| `containers` | repository ID | In the sample image path |
| `/gke/hello-app` | image path | Path to the image inside the repository `containers` |
| `PROJECT` | project ID | If it contains a colon (`:`), see the domain-scoped project rules in [names.md](./names.md) |
| `tag1` | tag | If no tag is given, Docker applies `latest` |

## Notes

- Adapted from the official docs: the source writes `sudo usermod -a -G docker ${USER}` unquoted; the variable is quoted so its value is passed as one argument.
- Docker security group membership is equivalent to root / Administrator access; only add trusted users.
- On Ubuntu, install the gcloud CLI from the Debian package; the snap package does not include `kubectl` or the extensions needed to authenticate with Artifact Registry.
- The image name in the repository can differ from the local image name.
- `gcloud artifacts repositories delete` is irreversible and removes the repository and its images; keep copies of images you need and try this on a disposable project first.
- Adapted from the official docs: the clean-up command in the source has no `--project`; `--project=PROJECT` was added to match the create and list commands.
- Image building and Dockerfiles are covered by the `docker` skill; this skill covers storing and pulling images in Artifact Registry.
- The source also shows Console steps and Cloud Shell steps.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [pushing-and-pulling.md](./pushing-and-pulling.md)
- [names.md](./names.md)
- [manage-images.md](./manage-images.md)
