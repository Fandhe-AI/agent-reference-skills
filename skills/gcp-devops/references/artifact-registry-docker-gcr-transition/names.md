---
source: https://docs.cloud.google.com/artifact-registry/docs/docker/names
---

# Repository and Image Names

Naming convention that identifies Docker repositories and container images in the API, `gcloud` and `docker` commands, including digests, tags and domain-scoped projects.

## Signature / Usage

### Repository name

```text
LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY
```

```text
us-west1-docker.pkg.dev/my-project/my-repo
```

### Image names

```text
LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE
```

```text
LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG
```

```text
LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE@IMAGE-DIGEST
```

By tag:

```text
us-west1-docker.pkg.dev/my-project/my-repo/test:staging
```

By digest:

```text
us-west1-docker.pkg.dev/my-project/my-repo/test@sha256:4d11e24ba8a615cc85a535daa17b47d3c0219f7eeb2b8208896704ad7f88ae2d
```

### Domain-scoped projects

Replace the colon in the project ID with a forward slash:

```text
LOCATION-docker.pkg.dev/DOMAIN/PROJECT-ID/REPOSITORY/IMAGE@IMAGE-DIGEST
```

```text
us-west1-docker.pkg.dev/example.com/my-project/my-repo/image-name
```

### Repository names as URLs

Prepend `https://` to open a repository or artifact in the console:

```text
https://us-west1-maven.pkg.dev/my-project/my-repo
```

```text
https://us-west1-docker.pkg.dev/example.com/my-project/my-repo/my-image
```

## Options / Props

| Part | Description |
|------|-------------|
| `LOCATION` | Regional or multi-regional location of the repository |
| `PROJECT-ID` | Google Cloud project ID; if it contains a colon (`:`) use the domain-scoped form |
| `REPOSITORY` | Name of the repository where the image is stored |
| `IMAGE` | Name of the image in the repository |
| `TAG` | Tag of the image version |
| `IMAGE-DIGEST` | sha256 hash of the image contents (shown as **Image digest** in the console) |

### Mutable vs immutable tags

| Mode | Behavior |
|------|----------|
| Mutable | A tag points to one version at a time but the digest it references can change; the last pushed version wins |
| Immutable | A tag always points to the same digest; deleting a tagged image, removing a tag from an image, and pushing a tag already used by another version are not permitted (deleting untagged images is still permitted) |

## Notes

- If you specify neither a tag nor a digest, Artifact Registry looks for the default tag `latest`.
- A digest is an automatically generated hash of the image index or manifest; it is a unique, unchangeable identifier of a version. A tag is a label that can point to only one version.
- Mutable tags can be manipulated by a bad actor to associate a tag with a malicious image version.
- Scoping projects to a domain is a legacy feature; you cannot create new domain-scoped projects.
- Any authenticated user with permission to access the repository can use the `https://` repository links.
- Source: https://docs.cloud.google.com/artifact-registry/docs/docker/names (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [pushing-and-pulling.md](./pushing-and-pulling.md)
- [manage-images.md](./manage-images.md)
- [troubleshoot.md](./troubleshoot.md)
