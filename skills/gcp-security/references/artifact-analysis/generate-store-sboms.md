---
source: https://docs.cloud.google.com/artifact-analysis/docs/generate-store-sboms
---

# Generate and store SBOMs

Creates and stores a software bill of materials (SBOM) listing the dependencies of container images that are stored in Artifact Registry and scanned for vulnerabilities by Artifact Analysis. The SBOM is generated with the Google Cloud CLI and stored in Cloud Storage.

## Signature / Usage

### Generate an SBOM file

```bash
gcloud artifacts sbom export --uri=LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME
```

If no Cloud Storage bucket exists for the image's region, one is created named `artifactanalysis-REGION-PROJECT_NUMBER`; further SBOMs in that region go to the same bucket. To locate the bucket you must search for SBOMs using the gcloud CLI.

### Generate an SBOM without ongoing vulnerability scanning

Enable the Container Scanning API before you push the image to Artifact Registry. After the image is pushed and the SBOM is exported, disable the Container Scanning API to avoid being billed for further vulnerability scanning:

```bash
gcloud services disable containerscanning.googleapis.com
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `LOCATION` | Location of the Artifact Registry repository |
| `PROJECT_ID` | Project that contains the repository |
| `REPOSITORY` | Artifact Registry repository containing the image |
| `IMAGE_NAME` | Image in tag or digest format; tags are resolved to digests |

### Required roles

| Purpose | Role (on the project) |
|---------|-----------------------|
| Manage Cloud Storage buckets and upload SBOM files | Storage Admin (`roles/storage.admin`) |

## Notes

- Prerequisite: a Docker repository in Artifact Registry with a pushed image.
- If you use images with `gcr.io` domain names, SBOMs might not appear immediately: generation takes at least 24 hours from when you set up hostname redirection.
- Disabling the Container Scanning API stops vulnerability scanning for the project, which is disruptive; try it on a disposable project first.
- Snippet taken from https://docs.cloud.google.com/artifact-analysis/docs/enable-automatic-scanning (the `gcloud services disable` command).
- Cloud Storage pricing: https://cloud.google.com/storage/pricing.
- Source: https://docs.cloud.google.com/artifact-analysis/docs/generate-store-sboms (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [sbom-overview.md](./sbom-overview.md)
- [enable-automatic-scanning.md](./enable-automatic-scanning.md)
