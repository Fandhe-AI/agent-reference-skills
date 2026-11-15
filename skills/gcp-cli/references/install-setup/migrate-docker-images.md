---
source: https://docs.cloud.google.com/sdk/docs/migrate-docker-images
---

# Migrate to the :stable Docker image

If you use the `:latest`, `:alpine`, `:emulators`, `:slim`, or `:debian_component_based` gcloud CLI Docker images, migrate to the Debian-based `:stable` image for a smaller image size and improved security fixes.

## Signature / Usage

The page gives no commands. Detailed instructions (extending the image at runtime or building a custom Dockerfile) are in the Migration Guide: https://github.com/GoogleCloudPlatform/cloud-sdk-docker/blob/master/docs/migration_guide.md

Image reference format used by the tags being replaced:

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:debian_component_based
```

Snippet taken from https://docs.cloud.google.com/sdk/docs/dockerfile_example

## Notes

- Affected tags: `:latest`, `:alpine`, `:emulators`, `:slim`, `:debian_component_based`.
- Source: https://docs.cloud.google.com/sdk/docs/migrate-docker-images (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-docker.md](./downloads-docker.md)
- [dockerfile-example.md](./dockerfile-example.md)
