---
source: https://docs.astral.sh/uv/guides/integration/azure/
---

# Alternative registries (Azure, Google, AWS, JFrog)

Installing from and publishing to private package registries: Azure Artifacts, Google Artifact Registry, AWS CodeArtifact, and JFrog Artifactory.

## Signature / Usage

Declare the index, then set credentials via `UV_INDEX_<NAME>_USERNAME` / `UV_INDEX_<NAME>_PASSWORD` (`PRIVATE_REGISTRY` must match the index `name` in `pyproject.toml`):

```toml
[[tool.uv.index]]
name = "private-registry"
url = "https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/simple/"
```

## Options / Props

| Registry | Index `url` | Username | Password / token |
|----------|-------------|----------|------------------|
| Azure Artifacts | `https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/simple/` | any string (e.g. `dummy`); `VssSessionToken` with keyring | PAT (`$AZURE_ARTIFACTS_TOKEN`) |
| Google Artifact Registry | `https://<REGION>-python.pkg.dev/<PROJECT>/<REPOSITORY>/simple/` | `oauth2accesstoken` | `gcloud auth application-default print-access-token` |
| AWS CodeArtifact | `https://<DOMAIN>-<ACCOUNT_ID>.d.codeartifact.<REGION>.amazonaws.com/pypi/<REPOSITORY>/simple/` | `aws` | `aws codeartifact get-authorization-token ...` |
| JFrog Artifactory | `https://<organization>.jfrog.io/artifactory/api/pypi/<repository>/simple` | `<username>`, or empty for JWT | `<password>` or `$JFROG_JWT_TOKEN` |

| Registry | `publish-url` |
|----------|---------------|
| Azure Artifacts | `https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/upload/` |
| Google Artifact Registry | `https://<REGION>-python.pkg.dev/<PROJECT>/<REPOSITORY>/` |
| AWS CodeArtifact | `https://<DOMAIN>-<ACCOUNT_ID>.d.codeartifact.<REGION>.amazonaws.com/pypi/<REPOSITORY>/` |
| JFrog Artifactory | `https://<organization>.jfrog.io/artifactory/api/pypi/<repository>` |

## Azure Artifacts

Access token (include the PAT in the password field; a username must be present but can be any string):

```bash
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=dummy
export UV_INDEX_PRIVATE_REGISTRY_PASSWORD="$AZURE_ARTIFACTS_TOKEN"
```

`keyring` with `artifacts-keyring` (pre-install from a source other than Artifacts; uv only supports `keyring` in subprocess mode, the executable must be on `PATH`, and the username must be `VssSessionToken`):

```bash
# Pre-install keyring and the Artifacts plugin from the public PyPI
uv tool install keyring --with artifacts-keyring

# Enable keyring authentication
export UV_KEYRING_PROVIDER=subprocess

# Set the username for the index
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=VssSessionToken
```

Publishing. First, add a `publish-url` to the index you want to publish packages to. For example:

```toml
[[tool.uv.index]]
name = "private-registry"
url = "https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/simple/"
publish-url = "https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/upload/"
```

Then, configure credentials (if not using keyring):

```console
$ export UV_PUBLISH_USERNAME=dummy
$ export UV_PUBLISH_PASSWORD="$AZURE_ARTIFACTS_TOKEN"
$ uv publish --index private-registry
```

## Google Artifact Registry

Assumes `gcloud` is installed and authenticated. The username must be `oauth2accesstoken`.

```bash
export ARTIFACT_REGISTRY_TOKEN=$(
    gcloud auth application-default print-access-token
)
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=oauth2accesstoken
export UV_INDEX_PRIVATE_REGISTRY_PASSWORD="$ARTIFACT_REGISTRY_TOKEN"
```

keyring with `keyrings.google-artifactregistry-auth` (wraps `gcloud` to generate short-lived tokens):

```bash
# Pre-install keyring and Artifact Registry plugin from the public PyPI
uv tool install keyring --with keyrings.google-artifactregistry-auth

# Enable keyring authentication
export UV_KEYRING_PROVIDER=subprocess

# Set the username for the index
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=oauth2accesstoken
```

Publishing. First, add a `publish-url` to the index you want to publish packages to. For example:

```toml
[[tool.uv.index]]
name = "private-registry"
url = "https://<REGION>-python.pkg.dev/<PROJECT>/<REPOSITORY>/simple/"
publish-url = "https://<REGION>-python.pkg.dev/<PROJECT>/<REPOSITORY>/"
```

Then, configure credentials (if not using keyring):

```console
$ export UV_PUBLISH_USERNAME=oauth2accesstoken
$ export UV_PUBLISH_PASSWORD="$ARTIFACT_REGISTRY_TOKEN"
$ uv publish --index private-registry
```

## AWS CodeArtifact

Assumes `awscli` is installed and authenticated. The username must be `aws`.

```bash
export AWS_CODEARTIFACT_TOKEN="$(
    aws codeartifact get-authorization-token \
    --domain <DOMAIN> \
    --domain-owner <ACCOUNT_ID> \
    --query authorizationToken \
    --output text
)"
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=aws
export UV_INDEX_PRIVATE_REGISTRY_PASSWORD="$AWS_CODEARTIFACT_TOKEN"
```

keyring with `keyrings.codeartifact` (wraps boto3):

```bash
# Pre-install keyring and AWS CodeArtifact plugin from the public PyPI
uv tool install keyring --with keyrings.codeartifact

# Enable keyring authentication
export UV_KEYRING_PROVIDER=subprocess

# Set the username for the index
export UV_INDEX_PRIVATE_REGISTRY_USERNAME=aws
```

Publishing. First, add a `publish-url` to the index you want to publish packages to. For example:

```toml
[[tool.uv.index]]
name = "private-registry"
url = "https://<DOMAIN>-<ACCOUNT_ID>.d.codeartifact.<REGION>.amazonaws.com/pypi/<REPOSITORY>/simple/"
publish-url = "https://<DOMAIN>-<ACCOUNT_ID>.d.codeartifact.<REGION>.amazonaws.com/pypi/<REPOSITORY>/"
```

Then, configure credentials (if not using keyring):

```console
$ export UV_PUBLISH_USERNAME=aws
$ export UV_PUBLISH_PASSWORD="$AWS_CODEARTIFACT_TOKEN"
$ uv publish --index private-registry
```

## JFrog Artifactory

Username and password, or a JWT token with an empty username:

```console
$ export UV_INDEX_PRIVATE_REGISTRY_USERNAME="<username>"
$ export UV_INDEX_PRIVATE_REGISTRY_PASSWORD="<password>"
```

```console
$ export UV_INDEX_PRIVATE_REGISTRY_USERNAME=""
$ export UV_INDEX_PRIVATE_REGISTRY_PASSWORD="$JFROG_JWT_TOKEN"
```

Publishing. Add a `publish-url` to your index definition:

```toml
[[tool.uv.index]]
name = "private-registry"
url = "https://<organization>.jfrog.io/artifactory/api/pypi/<repository>/simple"
publish-url = "https://<organization>.jfrog.io/artifactory/api/pypi/<repository>"
```

Pass the token as the password and an empty username:

```console
$ uv publish --index <index_name> -u "" -p "$JFROG_TOKEN"
```

```console
$ export UV_PUBLISH_USERNAME=""
$ export UV_PUBLISH_PASSWORD="$JFROG_TOKEN"
$ uv publish --index private-registry
```

## Notes

- Source pages: `https://docs.astral.sh/uv/guides/integration/azure/`, `https://docs.astral.sh/uv/guides/integration/google/`, `https://docs.astral.sh/uv/guides/integration/aws/`, `https://docs.astral.sh/uv/guides/integration/jfrog/`.
- `tool.uv.keyring-provider` can enable keyring in `uv.toml` or `pyproject.toml`; the username can also be added directly to the index URL.
- Publishing without `publish-url` in the project: set `UV_PUBLISH_URL` (e.g. `export UV_PUBLISH_URL=https://pkgs.dev.azure.com/<ORGANIZATION>/<PROJECT>/_packaging/<FEED>/pypi/upload/` then `uv publish`). This is not preferable because uv cannot check whether the package is already published before uploading.
- JFrog: `--token "$JFROG_TOKEN"` or `UV_PUBLISH_TOKEN` yields 401 Unauthorized, because JFrog requires an empty username but uv passes `__token__` when `--token` is used. The publish environment variables (`UV_PUBLISH_USERNAME`, `UV_PUBLISH_PASSWORD`) do not include the index name.
- Credentials here are package-registry credentials, not application authentication (see better-auth / supabase skills for that).

## Related

- [GitHub Actions](./github-actions.md)
