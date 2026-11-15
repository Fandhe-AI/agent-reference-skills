---
source: https://docs.cloud.google.com/sdk/docs/downloads-docker
---

# Docker image for the gcloud CLI

The Google Cloud CLI Docker image lets you pull a specific version of the gcloud CLI as a Docker image from Artifact Registry and quickly run gcloud CLI commands in an isolated, correctly configured container.

## Signature / Usage

Image names used elsewhere in these docs (for example the base image in the Dockerfile examples):

```docker
FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:latest
```

Snippet taken from https://docs.cloud.google.com/sdk/docs/dockerfile_example

## Notes

- This page itself contains no commands. Image options, installation instructions, authentication, troubleshooting, and migration to the `:stable` image are documented in the Google Cloud SDK Docker GitHub repository: https://github.com/GoogleCloudPlatform/cloud-sdk-docker (Migration Guide: https://github.com/GoogleCloudPlatform/cloud-sdk-docker/blob/master/docs/migration_guide.md).
- Source: https://docs.cloud.google.com/sdk/docs/downloads-docker (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [dockerfile-example.md](./dockerfile-example.md)
- [migrate-docker-images.md](./migrate-docker-images.md)
