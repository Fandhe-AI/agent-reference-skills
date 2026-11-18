---
source: https://docs.cloud.google.com/build/docs/building/store-artifacts-in-artifact-registry
---

# Store artifacts in Artifact Registry from Cloud Build

Configure a build to push container images, npm packages or Python packages to an Artifact Registry repository, using substitutions for the repository location, name and image so one config serves testing, staging and production.

## Signature / Usage

### Before you begin

Create the target repository in Artifact Registry if it does not exist. If Cloud Build and the repository are in different projects, or if you use a user-specified service account to run builds, grant the Artifact Registry Writer role to the build service account in the project with the repositories. Depending on organization settings, builds run as the Compute Engine default service account rather than the legacy Cloud Build service account; check which account your builds use and that it can write to the repository (grant Artifact Registry Writer on the repository if not).

### Docker build

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}', '.' ]
images:
- '${_LOCATION}-docker.pkg.dev/$PROJECT_ID/${_REPOSITORY}/${_IMAGE}'
```

Run it with values for the user-defined substitutions:

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_LOCATION="us-east1",_REPOSITORY="my-repo",_IMAGE="my-image" .
```

### Node.js build (npm repository)

Add the repository to the `.npmrc` file next to `package.json` (replace the placeholders; `SCOPE` is the npm scope for the repository):

```text
@SCOPE:registry=https://LOCATION-npm.pkg.dev/PROJECT_ID/REPOSITORY
//LOCATION-npm.pkg.dev/PROJECT_ID/REPOSITORY/:always-auth=true
```

Add a script to `package.json` that refreshes the access token:

```text
"scripts": {
 "artifactregistry-login": "npx google-artifactregistry-auth"
}
```

Build config steps:

```yaml
steps:
- name: gcr.io/cloud-builders/npm
  args: ['run', 'artifactregistry-login']
- name: gcr.io/cloud-builders/npm
  args: ['publish', '${_PACKAGE}']
```

```bash
gcloud builds submit --config=cloudbuild.yaml \
    --substitutions=_PACKAGE="src" .
```

### Python build (Python repository)

Create `requirements.txt` with Twine (uploads packages) and the Artifact Registry keyring backend (authentication for pip and Twine):

```text
twine
keyrings.google-artifactregistry-auth
```

Upload the files in `dist`:

```yaml
steps:
- name: python
  entrypoint: pip
  args: ["install", "-r", "requirements.txt", "--user"]
- name: python
  entrypoint: python
  args:
  - '-m'
  - 'twine'
  - 'upload'
  - '--repository-url'
  - 'https://${_LOCATION}-python.pkg.dev/$PROJECT_ID/${_REPOSITORY}/'
  - 'dist/*'
```

Install a package from the repository:

Adapted (not in the official docs): a first step installs the Artifact Registry keyring backend (`keyrings.google-artifactregistry-auth`), which pip needs to authenticate to the repository, as the upload example does.

```yaml
steps:
- name: python
  entrypoint: pip
  args: ["install", "keyrings.google-artifactregistry-auth", "--user"]
- name: python
  entrypoint: pip
  args:
  - 'install'
  - '--index-url'
  - 'https://${_LOCATION}-python.pkg.dev/$PROJECT_ID/${_REPOSITORY}/simple/'
  - '${_PACKAGE}'
  - '--verbose'
```

```bash
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_LOCATION="us-east1",_REPOSITORY="my-repo",_PACKAGE="my-package" .
```

## Options / Props

| Substitution | Kind | Description |
|--------------|------|-------------|
| `${_LOCATION}` | user-defined | Repository location (regional or multi-regional). |
| `${_REPOSITORY}` | user-defined | Repository name. |
| `${_IMAGE}` | user-defined | Image name (Docker). |
| `${_PACKAGE}` | user-defined | npm project directory, or Python package name for `pip install`. |
| `$PROJECT_ID` | default | With `gcloud builds submit`: the active project ID in the gcloud session. With a build trigger: the project where Cloud Build runs. A user-defined substitution can replace it to set the project at build time. |

## Notes

- Source: https://docs.cloud.google.com/build/docs/building/store-artifacts-in-artifact-registry (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source states that the default Cloud Build service account can upload and download artifacts, and create `gcr.io` repositories in Artifact Registry, for a repository in the same project. Clarified from the official docs: that describes the legacy Cloud Build service account (`PROJECT_NUMBER@cloudbuild.gserviceaccount.com`). The default account for running builds changed to the Compute Engine default service account in many projects, depending on organization settings (see the Artifact Registry access-control page in this skill), and that account's Artifact Registry permissions are not described here; check the account your builds run as. For other projects, a user-specified service account, or the Compute Engine default service account without write access, grant Artifact Registry Writer on the repository to that account; prefer a repository-level grant over a project-level one and a user-specified service account over the legacy account.
- Adapted from the official docs: the source's install config runs only `pip install --index-url ...` in the `python` image; pip reaches a private Artifact Registry repository only through the keyring backend (or explicit credentials), so a step that installs `keyrings.google-artifactregistry-auth` with `--user` comes first. Cloud Build keeps `/builder/home` (the home directory) between steps, as the source's upload example also relies on.
- Do not commit `.npmrc` files that contain tokens; the file above holds only the registry URLs and relies on `google-artifactregistry-auth` to refresh credentials at build time.
- pip 21.2 and later: use `--verbose` or `-v` up to three times for more debugging output (`-vv` for the next level).
- Artifact Registry hosts private npm and PyPI-compatible repositories; npm and pip themselves behave as upstream documents them. Image building and Dockerfiles are in the `docker` skill.
- The `gcr.io/cloud-builders/*` builders are hosted on Artifact Registry and are not affected by the Container Registry shutdown.
- The source also shows Go (`gcloud artifacts go upload`, a `GOPROXY` step with a credential helper) and Java (`gcr.io/cloud-builders/mvn` `deploy`) builds, which are omitted, and a step that copies a self-signed CA certificate for a private registry.
- Python base image `python` is unpinned in the source; pin a supported version for reproducible builds.

## Related

- [substitute-variable-values.md](./substitute-variable-values.md)
- [submit-build-via-cli-api.md](./submit-build-via-cli-api.md)
- [create-basic-configuration.md](./create-basic-configuration.md)
