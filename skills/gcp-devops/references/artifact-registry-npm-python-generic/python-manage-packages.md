---
source: https://docs.cloud.google.com/artifact-registry/docs/python/manage-packages
---

# Manage Python packages

Store, version, and manage Python packages in Python-format Artifact Registry repositories: upload distributions with Twine, inspect stored versions and files, install with pip, and delete unused packages. Which operations work depends on the repository mode (standard, remote, virtual). Google Cloud CLI 354.0.0 or newer is required for Python repository commands.

## Signature / Usage

### Check the gcloud version

```bash
gcloud version
```

### Add packages (standard repositories)

```bash
pip install twine
```

```bash
twine upload dist/*
```

```bash
twine upload --repository-url https://LOCATION-python.pkg.dev/PROJECT/REPOSITORY/ dist/*
```

### View packages and versions (standard, remote)

Square brackets mark optional flags:

```text
gcloud artifacts packages list [--repository=REPOSITORY] [--location=LOCATION]
```

```text
gcloud artifacts versions list --package=PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION]
```

### List files (standard, remote)

```bash
gcloud artifacts files list
```

```bash
gcloud artifacts files list \
    --project=PROJECT \
    --repository=REPOSITORY \
    --location=LOCATION \
    --package=PACKAGE \
    --version=VERSION
```

```bash
gcloud artifacts files list \
    --project=my-project \
    --location=us-west1 \
    --repository=my-repo \
    --package=my-app \
    --version=1.0
```

### Install packages (standard, remote, virtual)

```bash
pip install PACKAGE
```

```bash
pip install --pre PACKAGE
```

Adapted (not in the official docs): the requirement specifier is quoted; unquoted, the shell treats `>` as output redirection.

```bash
pip install --pre "my-package>=1.0.dev0"
```

Override `index-url` for one command:

```bash
pip install --index-url https://us-east1-python.pkg.dev/my-project/python-repo/simple/ my-package
```

### Delete packages and versions (standard, remote)

```text
gcloud artifacts packages delete PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION] [--async]
```

```text
gcloud artifacts versions delete VERSION \
    --package=PACKAGE \
    [--repository=REPOSITORY] [--location=LOCATION] \
    [--async]
```

## Options / Props

### Required roles (granted on the repository)

| Task | Role |
|------|------|
| View packages or files in packages | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Download or install packages | Artifact Registry Reader (`roles/artifactregistry.reader`) |
| Add packages to a repository | Artifact Registry Writer (`roles/artifactregistry.writer`) |
| Delete packages | Artifact Registry Repository Administrator (`roles/artifactregistry.repoAdmin`) |

### Operations by repository mode

| Operation | Modes |
|-----------|-------|
| Adding packages | standard |
| Viewing packages and versions | standard, remote |
| Listing files | standard, remote |
| Installing packages | standard, remote, virtual |
| Deleting packages and versions | standard, remote |

### How pip chooses a repository

| pip configuration | Behavior |
|-------------------|----------|
| Artifact Registry set with `index-url` and no other index | pip searches only your Artifact Registry repository |
| Virtual repository | Upstream priorities choose the source; equal-priority repositories may each serve the package |
| `extra-index-url` or multiple package indexes configured | pip searches pypi.org and the other indexes and chooses the latest version |

### Virtual repository priority example

| Upstream | Priority |
|----------|----------|
| `main-repo` | 100 |
| `secondary-repo1` | 80 |
| `secondary-repo2` | 80 |
| `test-repo` | 20 |

## Notes

- Best practices: use unique names for private packages so they do not match names on pypi.org (particularly with multiple package indexes); use PEP 440 version identifiers (by default pip installs only stable releases and uses PEP 440 to tell them from pre-releases). Stable releases are considered newer than pre-releases.
- For remote repositories, the version list should include all direct and transitive dependencies. A standard repository serves packages directly; a remote repository serves a cached copy, downloading and caching from upstream on first request; a virtual repository searches its upstream repositories and only serves, never stores, packages.
- You can set a maximum number of files returned with `--limit`. If the project ID contains a colon (`:`), see Domain-scoped projects in the Docker names page.
- You can override `index-url` / `extra-index-url` in a requirements file or with pip flags.
- Destructive: deleting a package or version cannot be undone. For remote repositories only the cached copy is deleted and it is downloaded and cached again on the next request. Verify dependencies first and try it on a disposable project first. `--async` returns immediately without waiting.
- By default Twine and pip do not return detailed errors; rerun Twine with `--verbose` and pip with `-v` or `-vv`.
- With keyring authentication using gcloud credentials, log in to the gcloud CLI with your user account or service account first.
- Artifact Registry hosts private PyPI-compatible repositories; pip and Twine behave as upstream documents them.
- Corrected from the official docs: `pip install --pre my-package>=1.0.dev0` was unquoted (the shell would redirect output to a file named `=1.0.dev0`).
- The source also shows Console steps (omitted).
- Source: https://docs.cloud.google.com/artifact-registry/docs/python/manage-packages (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [python-authentication.md](./python-authentication.md)
- [store-python.md](./store-python.md)
- [nodejs-manage-packages.md](./nodejs-manage-packages.md)
