---
source: https://docs.cloud.google.com/build/docs/running-builds/submit-build-via-cli-api
---

# Submit a build via the CLI or API

Start a build manually with `gcloud builds submit` or the Cloud Build API (`projects.locations.builds.create`). The build source is one of `storage_source`, `repo_source`, `git_source` or `connected_repository` (a 2nd-gen repository).

## Signature / Usage

### Build a Dockerfile with `gcloud`

Run from the directory containing your source and `Dockerfile`:

```bash
gcloud builds submit --tag LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME
```

The command compresses the current directory, starts a build, tags the image and pushes it to the Artifact Registry repository in `LOCATION`. `LOCATION` in `--tag` is where the image is stored; the build runs in the region given by `--region`, otherwise the `builds/region` property, otherwise `global`.

### Build with a build config file

```bash
gcloud builds submit --config BUILD_CONFIG SOURCE
```

Source in a Cloud Storage bucket:

```bash
gcloud builds submit --config cloudbuild.yaml \
    gs://BUCKET/SOURCE.tar.gz
```

Source in the current directory:

```bash
gcloud builds submit --config=cloudbuild.yaml .
```

### Build from a 2nd-gen repository (`connected_repository`)

Adapted (not in the official docs): the source ends the command with a bare `LOCATION` argument, which `gcloud builds submit` does not accept as a second positional; the Cloud Build region is given with `--region` (the gcloud 593.0.0 help lists `--region` and `--revision`).

```bash
gcloud builds submit REPOSITORY --revision=REVISION --config=BUILD_CONFIG --region=REGION
```

### Build without source

Adapted (not in the official docs): the source says to use `--no-source` but shows the command `gcloud builds submit --config CONFIG_FILE_PATH SOURCE_DIRECTORY`, which passes a source directory; the example uses the `--no-source` flag that the gcloud 593.0.0 help lists.

```bash
gcloud builds submit --no-source --config=BUILD_CONFIG
```

### Submit with the API (`storage_source`)

Create `request.json`:

```json
{
    "source": {
        "storageSource": {
            "bucket": "BUCKET",
            "object": "SOURCE.tar.gz"
        }
    },
    "steps": [{
        "name": "gcr.io/cloud-builders/docker",
        "args": [
            "build",
            "-t",
            "LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME",
            "."
        ]
    }],
    "images": [
        "LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME"
    ]
}
```

```bash
curl -X POST -T request.json -H "Authorization: Bearer $(gcloud config config-helper \
    --format='value(credential.access_token)')" \
    https://cloudbuild.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/builds
```

### Submit with the API (`connected_repository`)

`request.json` (same `curl` command as above):

```json
{
    "source": {
        "connectedRepository": {
            "repository": "REPOSITORY",
            "revision": "REVISION"
        }
    },
    "steps": [{
        "name": "gcr.io/cloud-builders/docker",
        "args": [
            "build",
            "-t",
            "LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME",
            "."
        ]
    }],
    "images": [
        "LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME"
    ]
}
```

## Options / Props

### Required roles on the service account that submits builds

| Scenario | Role |
|----------|------|
| Store build logs in the default logs bucket | Cloud Build Editor (`roles/cloudbuild.builds.editor`) |
| Store build logs in a user-created logs bucket | Cloud Build Editor (`roles/cloudbuild.builds.editor`) |
| Use private pools | Cloud Build WorkerPool User (`roles/cloudbuild.workerPoolUser`) |

### Placeholders

| Name | Description |
|------|-------------|
| `LOCATION` | Regional or multi-regional location of the Artifact Registry Docker repository. |
| `PROJECT_ID` | Your Google Cloud project ID. |
| `REPOSITORY` | Artifact Registry repository name. In the `connected_repository` forms it is the Cloud Build 2nd-gen repository, `projects/*/locations/*/connections/*/repositories/*`. |
| `IMAGE_NAME` | Name of the image to build. |
| `BUCKET`, `SOURCE` | Cloud Storage bucket and compressed source file (`SOURCE.tar.gz`). |
| `BUILD_CONFIG` | Path to the build config file. |
| `REVISION` | Branch, tag, commit SHA or any Git ref to fetch. |
| `REGION` | One of the supported Cloud Build regions (`https://docs.cloud.google.com/build/docs/locations`). |

## Notes

- Corrected from the official docs: the source says the command "initiates a build in the location `LOCATION`". The `gcloud builds submit` help (gcloud 593.0.0) says `--region` selects the Cloud Build region and, if unset, `builds/region` is used, then `global`; the `--tag` location only sets where the image is pushed. Pass `--region=REGION` when the build region matters, for example for data residency.
- Source: https://docs.cloud.google.com/build/docs/running-builds/submit-build-via-cli-api (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the 2nd-gen command was `gcloud builds submit REPOSITORY --revision=REVISION --config=BUILD_CONFIG LOCATION`; it now passes the location as `--region=REGION`. Adapted from the official docs: the `--no-source` example originally read `gcloud builds submit --config CONFIG_FILE_PATH SOURCE_DIRECTORY` and now uses `--no-source`.
- On the first `gcloud builds submit` in a project, Cloud Build creates a Cloud Storage bucket named `[YOUR_PROJECT_NAME]_cloudbuild` to hold uploaded source. It is not cleaned automatically; set a lifecycle configuration on the bucket or delete objects manually.
- `.gcloudignore` in the top-level upload directory excludes files from the upload; if only `.gitignore` exists, gcloud generates a Git-compatible `.gcloudignore`.
- `$PROJECT_ID` is replaced automatically at build time. Built-in trigger variables such as `$COMMIT_SHA` are not set by `builds submit` unless passed with `--substitutions` (see the substitutions page).
- The `curl` command uses a short-lived access token from `gcloud config config-helper`; it returns an `Operation` whose `metadata` is a `Build`; `QUEUED` means the build awaits execution.
- Cloud Build 2nd-gen repository resources come from repository connections; `--service-account` is available on `builds submit` to run the build as a user-specified service account.
- The source also shows sample CLI/API response output, which is omitted.

## Related

- [create-basic-configuration.md](./create-basic-configuration.md)
- [substitute-variable-values.md](./substitute-variable-values.md)
- [store-artifacts-in-artifact-registry.md](./store-artifacts-in-artifact-registry.md)
