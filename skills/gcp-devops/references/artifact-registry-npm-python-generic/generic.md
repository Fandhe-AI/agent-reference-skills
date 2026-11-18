---
source: https://docs.cloud.google.com/artifact-registry/docs/generic
---

# Manage generic artifacts

Generic-format repositories store versioned, immutable files of any format (tar and zip files, YAML and TOML configuration files, text files and PDFs, binaries, archives, media files). Unlike other formats, artifacts in generic repositories are not meant to be used by Docker, package managers, or other third-party clients; you upload, list, download, and delete them with `gcloud artifacts generic` / `gcloud artifacts files` or the REST API.

## Signature / Usage

### Upload generic artifacts

A package name and version are required. The destination path in the file structure is optional (default: the root level). Upload a file or, with `--source-directory`, a directory.

```bash
gcloud artifacts generic upload \
    --project=PROJECT \
    --source=SOURCE \
    --package=PACKAGE \
    --version=VERSION \
    --location=LOCATION \
    --repository=REPOSITORY
```

REST upload (`POST https://artifactregistry.googleapis.com/upload/v1/projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/genericArtifacts:create?alt=json`):

Adapted (not in the official docs): the source passes `curl -v`, which prints the `Authorization: Bearer` header into the terminal or logs, so `-v` is replaced by `-f` (fail on HTTP errors); the `meta` part is valid JSON (the source uses single quotes inside the part) with the field names from the Discovery document (`filename`, `packageId`, `versionId`), and the part is single-quoted so the shell does not alter the double quotes.

```bash
curl -f \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -F 'meta={"filename":"NAME","packageId":"PACKAGE","versionId":"VERSION"};type=application/json' \
    -F "blob=@SOURCE" \
    "https://artifactregistry.googleapis.com/upload/v1/projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/genericArtifacts:create?alt=json"
```

### List artifacts

```bash
gcloud artifacts files list \
    --project=PROJECT \
    --location=LOCATION \
    --repository=REPOSITORY
```

The response lists each file as `PACKAGE:VERSION:NAME`:

```text
FILE: my-package:1.0.0:hello.yaml
CREATE_TIME: 2023-03-09T20:55:07
UPDATE_TIME: 2023-03-09T20:55:07
SIZE (MB): 0.000
OWNER: projects/my-project/locations/us-central1/repositories/quickstart-generic-repo/packages/my-package/versions/1.0.0
```

### Download generic artifacts

Adapted (not in the official docs): `--project=PROJECT` is added, as in the upload and list examples, so the command does not use the gcloud default project.

```bash
gcloud artifacts generic download \
    --project=PROJECT \
    --destination=DESTINATION \
    --location=LOCATION \
    --repository=REPOSITORY \
    --package=PACKAGE \
    --version=VERSION \
    --name=NAME
```

REST download:

```text
GET https://artifactregistry.googleapis.com/download/v1/projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/files/FILE:download?alt=media
```

Adapted (not in the official docs): `-f` is added so an HTTP error response is not written into the output file.

```bash
curl -f -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     --output DESTINATION \
     "https://artifactregistry.googleapis.com/download/v1/projects/PROJECT/locations/LOCATION/repositories/REPOSITORY/files/FILE:download?alt=media"
```

### Delete generic artifacts

Adapted (not in the official docs): `--project=PROJECT` is added so the deletion targets the same project as the upload and list examples, not the gcloud default project.

```bash
gcloud artifacts files delete \
    FILE \
    --project=PROJECT \
    --location=LOCATION \
    --repository=REPOSITORY
```

## Options / Props

### Required roles (granted on the repository)

| Task | Role |
|------|------|
| View artifacts | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Download artifacts | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Upload artifacts to a repository | Artifact Registry Writer (`roles/artifactregistry.writer`) |
| Delete artifacts | Artifact Registry Repository Administrator (`roles/artifactregistry.repoAdmin`) |

### Additional upload flags

| Flag | Description |
|------|-------------|
| `--destination-path=PATH` | Upload to a specified folder within the package and version; creates folders that do not exist |
| `--source-directory=SOURCE_DIR` | Replaces `--source` to upload a directory instead of a single file |
| `--skip-existing` | With `--source-directory`, skip files that already exist; otherwise the command fails when a file already exists |

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `PROJECT` | Project ID (if it contains a colon `:`, see Domain-scoped projects in the Docker names page) |
| `LOCATION` | Regional or multi-regional location of the repository |
| `REPOSITORY` | Repository where the artifact is stored |
| `SOURCE` | Location and name of the file to upload |
| `PACKAGE` / `VERSION` | Package name and version of the file |
| `NAME` | The file's new name in the repository (upload); optional name of the file to download (without it, all files of the package and version are downloaded and the necessary directories are created) |
| `DESTINATION` | Local destination folder for `generic download`; it must already exist or the command fails. For the REST download, `--output DESTINATION` is the local output path |
| `FILE` | Filename from `gcloud artifacts files list`; for the REST download it must be URL-encoded (`path/to/file.jar` becomes `path%2Fto%2Ffile.jar`) |

### List filters

| Flag | Description |
|------|-------------|
| `--package=PACKAGE` | Show only files of a specific package |
| `--version=VERSION` | Show only files of a specific version |

## Notes

- Adapted from the official docs: the source's download and delete examples omit `--project`, so they act on the gcloud default project (`core/project`) while its upload and list examples pass `--project=PROJECT`; both now pass `--project=PROJECT`.
- `gcloud artifacts files delete` is available only for generic format repositories (as stated in the source). Destructive: deleted artifacts cannot be assumed recoverable; try it on a disposable project first.
- `gcloud artifacts generic download` requires `--package` and `--version` according to the gcloud 593.0.0 help; `--name` is optional.
- Corrected from the official docs: the REST upload used `curl -v` (prints the bearer token) and single-quoted pseudo-JSON in the `meta` part; the REST download lacked `-f`.
- The Discovery document (artifactregistry v1) describes `filename` as limited to letters, numbers, and URL-safe characters (`[a-zA-Z0-9-_.~@]`), and `packageId` as starting and ending with a letter or number, containing only letters, numbers, hyphens, underscores, and periods, and at most 256 characters; a new package is created if it does not exist.
- The source also shows Windows PowerShell and cmd.exe variants of each command, a PowerShell `Invoke-WebRequest` download, and Console steps (omitted).
- Source: https://docs.cloud.google.com/artifact-registry/docs/generic (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [store-nodejs.md](./store-nodejs.md)
- [python-manage-packages.md](./python-manage-packages.md)
