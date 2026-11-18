---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/copy-images
---

# Copy Images with gcrane

The `gcrane` tool copies images between Docker repositories in Artifact Registry (and from Container Registry to Artifact Registry). It copies sets of images with one command (everything under a path, or all images on a multi-regional host in your project) and skips layers that are already uploaded.

## Signature / Usage

### Set up gcrane

Run it from a Compute Engine VM (for many containers), Cloud Shell (small sets, about 40 GB or less of new data), or a local machine. Check an existing installation:

```bash
gcrane version
```

Compute Engine: the default service account can pull; to push, stop the VM, change the access scope, then restart it:

```bash
gcloud compute instances set-service-account INSTANCE --scopes=storage-rw
```

Cloud Shell: set the default project to the one where Container Registry and Artifact Registry are installed:

```bash
gcloud config set project PROJECT
```

Download (Linux x86-64), make executable and verify:

Adapted (not in the official docs): added `-f` to `curl` so an HTTP error does not get saved and extracted as the archive.

```bash
curl -fL \
https://github.com/google/go-containerregistry/releases/latest/download/go-containerregistry_Linux_x86_64.tar.gz \
-o go-containerregistry.tar.gz
```

```bash
tar -zxvf go-containerregistry.tar.gz
chmod +x gcrane
sudo mv gcrane /usr/local/bin/
```

```bash
gcrane --help
```

Check the Cloud Shell session location (relevant for egress charges):

Adapted (not in the official docs): the metadata request needs the `Metadata-Flavor: Google` header and the `metadata.google.internal` host, as in the metadata call in pushing-and-pulling.md; the source's `curl metadata/computeMetadata/v1/instance/zone` omits the header.

```bash
curl -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/zone
```

### Identify images to copy

```bash
gcrane ls LOCATION-docker.pkg.dev/PROJECT/REPOSITORY
```

```bash
gcrane ls LOCATION-docker.pkg.dev/PROJECT/IMAGE
```

```bash
gcrane ls -r LOCATION-docker.pkg.dev/PROJECT/PATH
```

### Copy images

Single image:

```bash
gcrane cp LOCATION1-docker.pkg.dev/PROJECT1/REPOSITORY1/IMAGE1 \
LOCATION2-docker.pkg.dev/PROJECT2/REPOSITORY2/IMAGE2
```

Recursively under a path:

```bash
gcrane cp -r LOCATION1-docker.pkg.dev/PROJECT1/REPOSITORY1/IMAGE1/PATH1 \
LOCATION2-docker.pkg.dev/PROJECT2/REPOSITORY2/IMAGE2/PATH2
```

All images in a repository:

```bash
gcrane cp -r LOCATION1-docker.pkg.dev/PROJECT1/REPOSITORY1 \
LOCATION2-docker.pkg.dev/PROJECT2/REPOSITORY2
```

Examples:

```bash
gcrane cp us-west1-docker.pkg.dev/my-project/repo1/my-image:tag1 \
us-west1-docker.pkg.dev/my-project/repo2/my-image:tag1
```

```bash
gcrane cp -r us-west1-docker.pkg.dev/dev-project/my-repo \
us-west1-docker.pkg.dev/prod-project/my-repo
```

## Options / Props

| Item | Description |
|------|-------------|
| Source repository role | Storage Object Viewer (`roles/storage.objectViewer`) or equivalent for the repository you copy from |
| Target repository role | Artifact Registry Writer (`roles/artifactregistry.writer`) or equivalent for the target repository |
| `gcrane ls -r` / `gcrane cp -r` | Recursive listing / copy under a path |
| Cloud Shell limit | About 40 GB or less of new data; larger copies may disconnect after the 10-minute request timeout |
| `LOCATION1` / `LOCATION2` | Locations of source / target repository |
| `PROJECT1` / `PROJECT2` | Project IDs of source / target repository |
| `REPOSITORY1` / `REPOSITORY2` | Source / target repository names |
| `IMAGE1` / `IMAGE2` | Image to copy / name in the target repository |

## Notes

- Create the target Docker repository first.
- Container Registry is shut down (March 18, 2025; see `transition-from-gcr.md`); a `gcr.io` host that still resolves is served by an Artifact Registry `gcr.io` repository, so copy from those repositories.
- Removing unused images before copying reduces storage costs.
- Costs: Compute Engine VM uptime; network egress may apply when the VM or Cloud Shell is in a different location than the source repository. Create the VM in the same location as the source registry. You cannot choose the Cloud Shell location.
- Use the latest `gcrane` version; the source's download URL is the `latest` release from the `google/go-containerregistry` GitHub project (third-party code run with `sudo mv`), so inspect what you download.
- The Compute Engine setup in the source uses the default service account and widens its access scope to `storage-rw`; this is the source's setup and grants broad Cloud Storage write access, so prefer a dedicated service account where possible (`gcp-foundation`). `set-service-account` requires the VM to be stopped and takes the instance zone (`--zone`) if not set as a default.
- Corrected from the official docs: the Cloud Shell location check originally read `curl metadata/computeMetadata/v1/instance/zone` (no `Metadata-Flavor` header).
- Adapted from the official docs: `curl -L` changed to `curl -fL` in the three identical download commands (shown once above).
- The source also shows Console links.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/copy-images (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [transition-from-gcr.md](./transition-from-gcr.md)
- [gcr-repositories.md](./gcr-repositories.md)
- [pushing-and-pulling.md](./pushing-and-pulling.md)
