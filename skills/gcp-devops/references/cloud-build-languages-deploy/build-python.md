---
source: https://docs.cloud.google.com/build/docs/building/build-python
---

# Build and test Python applications

Use the public `python` image from Docker Hub (preinstalled with `python` and `pip`) in Cloud Build steps to install requirements, run unit tests, build the package, upload it to a Python repository in Artifact Registry, generate provenance, and save test logs to Cloud Storage. Enable the Cloud Build, Artifact Registry and Cloud Storage APIs first (`serviceusage.services.enable`, via Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).

## Signature / Usage

### Install requirements

`--user` makes the installed modules visible to later steps.

```yaml
steps:
   - name: 'python'
     entrypoint: 'python'
     args: ['-m', 'pip', 'install', '--upgrade', 'pip']
   - name: python
     entrypoint: python
     args: ['-m', 'pip', 'install', 'build', 'pytest', 'Flask', '--user']
```

### Add unit tests

Saves pytest output to a JUnit XML file named with `$SHORT_SHA`.

```yaml
   - name: 'python'
     entrypoint: 'python'
     args: ['-m', 'pytest', '--junitxml=${SHORT_SHA}_test_log.xml']
```

### Build

```yaml
   - name: 'python'
     entrypoint: 'python'
     args: ['-m', 'build']
```

### Upload to Artifact Registry

Adapted (not in the official docs): the source indents `paths:` one space deeper than `repository:`, which is invalid YAML; indentation is normalized.

```yaml
artifacts:
  pythonPackages:
  - repository: 'https://LOCATION-python.pkg.dev/PROJECT-ID/REPOSITORY'
    paths: ['dist/*']
```

### Save test logs to Cloud Storage

Adapted (not in the official docs): the source places `objects:` at the same level as `artifacts:`; it is a field of `artifacts`, so it is nested.

```yaml
artifacts:
  objects:
    location: 'gs://${_BUCKET_NAME}/'
    paths:
      - '${SHORT_SHA}_test_log.xml'
```

## Options / Props

### Roles for the build service account

| Role | Needed for |
|------|------------|
| Storage Object Creator (`roles/storage.objectCreator`) on the bucket | Storing test logs (the source words this "in Logging"; the role applies to the Cloud Storage bucket) |
| Artifact Registry Writer (`roles/artifactregistry.writer`) | Storing built artifacts in Artifact Registry |

### Placeholders

| Name | Description |
|------|-------------|
| `PROJECT-ID` | Project that contains the Artifact Registry repository |
| `REPOSITORY` | Repository ID |
| `LOCATION` | Regional or multi-regional location of the repository |
| `_BUCKET_NAME` | User-defined substitution for the log bucket |
| `options.requestedVerifyOption: VERIFIED` | Add under `options` to enable provenance generation |

## Notes

- Unpinned `name: python` follows `:latest`; if you pin a tag, choose a currently supported Python version from Docker Hub (the source names none).
- `$SHORT_SHA` is populated for triggered builds from a repository; it is not available for manual builds submitted with `gcloud builds submit`, so the log file name would be incomplete there.
- Grant roles to the user-specified build service account, not the legacy Cloud Build service account.
- The source shows these steps as separate fragments of one `cloudbuild.yaml`; combine them into a single `steps:` list. `pythonPackages` and `objects` can share one `artifacts:` block.
- Corrected from the official docs: `paths:` indentation under `pythonPackages` and `objects:` placement under `artifacts`.
- Artifact Registry hosts private PyPI-compatible repositories; pip behaves as upstream documents. Cloud Build is Google Cloud's managed build service, not GitHub Actions (`github-docs`).
- The source also shows Console and API-enable links.
- Source: https://docs.cloud.google.com/build/docs/building/build-python (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [build-nodejs.md](./build-nodejs.md)
- [build-containers.md](./build-containers.md)
- Build and containerize Python applications: https://docs.cloud.google.com/build/docs/building/build-containerize-python
