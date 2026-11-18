---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/manage-images
---

# Manage Container Images

List images and files, add or remove tags, and delete images in Artifact Registry Docker repositories. Listing and deleting work in standard and remote repositories; tagging and untagging work in standard repositories.

## Signature / Usage

### List images

```bash
gcloud artifacts docker images list
```

```bash
gcloud artifacts docker images list LOCATION-docker.pkg.dev/PROJECT/REPOSITORY
```

All digests and tags of one image:

```bash
gcloud artifacts docker images list LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE \
--include-tags
```

### List files

```bash
gcloud artifacts files list \
    --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION
```

Files of one image version (digest starting with `sha256:`):

```bash
gcloud artifacts files list \
    --project=my-project \
    --location=us-west1 \
    --repository=my-repo \
    --package=my-app \
    --version=sha256:88b205d7995332e10e836514fbfd59ecaf8976fc15060cd66e85cdcebe7fb356
```

Files of the version with a tag:

```bash
gcloud artifacts files list \
    --project=my-project \
    --location=us-west1 \
    --repository=my-repo \
    --package=my-app \
    --tag=1.0-dev
```

### Add a tag

```bash
gcloud artifacts docker tags add \
us-west1-docker.pkg.dev/my-project/my-repo/my-image:iteration6-final \
us-west1-docker.pkg.dev/my-project/my-repo/my-image:release-candidate
```

### Remove a tag

```bash
gcloud artifacts docker tags delete LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE:TAG
```

### Delete an image

Delete an image and all its tags (irreversible):

```bash
gcloud artifacts docker images delete LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE --delete-tags
```

Delete a specific version by tag (add `--delete-tags` when other tags point to the version, see Flags):

Adapted (not in the official docs): the source shows the optional flag as `[--delete-tags]`; the brackets are removed so the command can be run as written.

```bash
gcloud artifacts docker images delete LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE:TAG
```

or by digest:

Adapted (not in the official docs): the source shows the optional flag as `[--delete-tags]`; the brackets are removed so the command can be run as written.

```bash
gcloud artifacts docker images delete LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE@IMAGE-DIGEST
```

## Options / Props

### Required roles (on the repository)

| Task | Role |
|------|------|
| View images, files in images, and tags | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Tag images or edit tags | Artifact Registry Writer (`roles/artifactregistry.writer`) |
| Delete images or remove tags | Artifact Registry Repository Administrator (`roles/artifactregistry.repoAdmin`) |

### Flags

| Flag | Description |
|------|-------------|
| `--include-tags` | Show all versions of images, with digests and tags; without it only top-level container images are listed |
| `--limit` | Maximum number of files returned by `gcloud artifacts files list` |
| `--package` | Image name (for files list) |
| `--version` | Image digest, a string starting with `sha256:` |
| `--tag` | Tag of the container image |
| `--delete-tags` | Removes all tags of the image version; needed when you specified a tag but other tags point to the version, or you specified a digest with at least one tag |

## Notes

- Tag semantics: in a repository a tag is unique to one image version; tagging with an existing tag moves the tag from the original version to the new one. With immutable tags, tagged images cannot be deleted and tags cannot be removed.
- Deleting an image cannot be undone. Deleting images does not immediately delete the referenced layers; unreferenced layers are deleted daily. In a remote repository the cached copy is removed (it stays available upstream and is cached again on the next request). Try destructive commands on a disposable project first.
- Adapted from the official docs: the usage forms `...IMAGE:TAG [--delete-tags]` and `...IMAGE@IMAGE-DIGEST [--delete-tags]` are shown without the square brackets, with `--delete-tags` optional as described in Flags.
- Cleanup policies can control when and how artifacts are saved or deleted.
- The Console repository list includes both Artifact Registry and Container Registry repositories; for Container Registry images use the Container Registry documentation for managing images.
- You can set default project, repository and location with gcloud defaults to omit the path.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/manage-images (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [names.md](./names.md)
- [pushing-and-pulling.md](./pushing-and-pulling.md)
- [transition-from-gcr.md](./transition-from-gcr.md)
