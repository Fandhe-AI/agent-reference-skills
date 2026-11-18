---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-repo
---

# Create remote repositories

How to create Artifact Registry remote repositories that proxy and cache a standard Artifact Registry repository or an external source (CentOS, Debian, Docker Hub, GitHub Container Registry, Maven Central, PyPI), plus editing the description and controlling access to upstream sources inside a VPC Service Controls perimeter.

## Signature / Usage

### Before you begin

Enable Artifact Registry (the API and the Google Cloud CLI) and optionally set gcloud defaults. For CMEK, create and enable a Cloud KMS key first. To authenticate to an upstream, enable Secret Manager:

```bash
gcloud services enable secretmanager.googleapis.com \
    --project=PROJECT_ID
```

If Artifact Registry is in a VPC Service Controls perimeter, enable the Access Context Manager API:

```bash
gcloud services enable accesscontextmanager.googleapis.com \
    --project=PROJECT_ID
```

### Use an Artifact Registry repository in another project as upstream

If the upstream repository is in a different project than the remote repository, grant the Artifact Registry Service Agent of the remote repository's project read access to the upstream repository before creating the remote repository. The upstream must be a standard mode repository.

```bash
gcloud artifacts repositories add-iam-policy-binding UPSTREAM_REPOSITORY \
    --member serviceAccount:service-REMOTE_PROJECT_NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com \
    --location=LOCATION \
    --project=UPSTREAM_PROJECT_ID \
    --role roles/artifactregistry.serviceAgent
```

### Create a Docker remote repository

```bash
gcloud artifacts repositories create REMOTE-REPOSITORY-NAME \
    --project=PROJECT_ID \
    --repository-format=docker \
    --location=LOCATION \
    --description="DESCRIPTION" \
    --mode=remote-repository \
    --remote-repo-config-desc="REMOTE-REPOSITORY-DESCRIPTION" \
    --disable-vulnerability-scanning \
    --remote-docker-repo=UPSTREAM \
    --remote-username="USERNAME" \
    --remote-password-secret-version="PASSWORD"
```

Example with Docker Hub and a Secret Manager secret version:

```bash
gcloud artifacts repositories create my-repo \
    --project=my-project \
    --repository-format=docker \
    --location=us-east1 \
    --description="Remote Docker repository" \
    --mode=remote-repository \
    --remote-repo-config-desc="Docker Hub" \
    --remote-username=my-username \
    --remote-password-secret-version=projects/my-project/secrets/my-secret/versions/1 \
    --remote-docker-repo=DOCKER-HUB
```

### Create an npm remote repository

Same template with `--repository-format=npm` and `--remote-npm-repo=UPSTREAM`.

```bash
gcloud artifacts repositories create my-repo \
    --project=my-project \
    --repository-format=npm \
    --location=us-east1 \
    --description="Remote npm repository" \
    --mode=remote-repository \
    --remote-repo-config-desc="Public npm registry" \
    --remote-username=my-username \
    --remote-password-secret-version=projects/my-project/secrets/my-secret/versions/1 \
    --remote-npm-repo=NPMJS
```

### Create a Python remote repository

Same template with `--repository-format=python` and `--remote-python-repo=UPSTREAM`.

```bash
gcloud artifacts repositories create my-repo \
    --project=my-project \
    --repository-format=python \
    --location=us-east1 \
    --description="Remote Python repository" \
    --mode=remote-repository \
    --remote-repo-config-desc="PyPI" \
    --remote-username=my-username \
    --remote-password-secret-version=projects/my-project/secrets/my-secret/versions/1 \
    --remote-python-repo=PYPI
```

### View the repository

```bash
gcloud artifacts repositories describe REMOTE_REPOSITORY_NAME \
    --location=LOCATION
```

### Edit the repository description

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT \
    --location=LOCATION \
    --description="DESCRIPTION"
```

### Access to upstream sources in a VPC Service Controls perimeter

By default Artifact Registry denies access to upstream sources outside the perimeter. Settings apply per project and location; the required role is Artifact Registry Administrator (`roles/artifactregistry.admin`). View the current setting:

```bash
gcloud artifacts vpcsc-config describe \
    --project=my-project \
    --location=us-east1
```

Allow all remote repositories in `us-east1` of `my-project` to reach their upstream sources outside the perimeter:

```bash
gcloud artifacts vpcsc-config allow \
    --project=my-project \
    --location=us-east1
```

Deny access to upstream sources in a location (here `us-west1`; cached artifacts in remote repositories stay available). Settings are per project and location, so use the same location you allowed to revert it:

```bash
gcloud artifacts vpcsc-config deny \
    --project=my-project \
    --location=us-west1
```

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Create remote repositories and grant access to individual repositories | Artifact Registry Admin (`roles/artifactregistry.admin`) on the project |
| Save upstream repository credentials in a secret version | Secret Manager Admin (`roles/secretmanager.admin`) on the project |
| Grant access to upstream sources outside a VPC Service Controls perimeter | Access Context Manager Editor (`roles/accesscontextmanager.policyEditor`) on the organization of the resource where the access policy is applied |
| Artifact Registry Service Agent on an upstream repository in another project | Artifact Registry Service Agent (`roles/artifactregistry.serviceAgent`) |

### Settings that cannot be changed after creation

| Setting |
|---|
| Artifact format |
| Repository mode (remote) |
| Remote repository upstream source (a custom URL must use HTTPS) |
| Repository location |
| Encryption (Google-owned and Google-managed keys by default, or CMEK) |

### gcloud placeholders

| Name | Description |
|---|---|
| `REMOTE-REPOSITORY-NAME` | Repository name; unique per location in a project |
| `PROJECT_ID` | Project ID; defaults to the current or default project |
| `LOCATION` | Regional or multi-regional location; omit if a default is set; list with `gcloud artifacts locations list` |
| `DESCRIPTION` | Optional; do not include sensitive data (descriptions are not encrypted) |
| `REMOTE-REPOSITORY-DESCRIPTION` | Optional description of the external repository configuration |
| `USERNAME` | Optional upstream username |
| `PASSWORD` | Optional Secret Manager secret version holding the upstream password |
| `UPSTREAM` | Preset upstream name, Artifact Registry repository path (`projects/UPSTREAM_PROJECT_ID/locations/REGION/repositories/UPSTREAM_REPOSITORY`), or user-defined HTTPS URL |
| `--disable-vulnerability-scanning` | Optional; disables automatic vulnerability scanning |
| `--allow-vulnerability-scanning` | Optional; permits automatic vulnerability scanning |

### Upstream flags per format

| Format | Flag |
|---|---|
| Docker | `--remote-docker-repo` |
| Maven | `--remote-mvn-repo` |
| npm | `--remote-npm-repo` |
| Python | `--remote-python-repo` |
| Go | `--remote-go-repo` (only `https://proxy.golang.org`) |
| Apt (Preview) | `--remote-apt-repo` (`DEBIAN`, `UBUNTU`) and `--remote-apt-repo-path` |
| Yum (Preview) | `--remote-yum-repo` (`CENTOS`, `CENTOS_DEBUG`, `CENTOS_VAULT`, `CENTOS_STREAM`, `ROCKY`, `EPEL`) and `--remote-yum-repo-path` |

## Notes

- You can add authentication to an unauthenticated remote repository after creation, but you cannot change an authenticated repository to unauthenticated.
- Cleanup policies, labels, CMEK and Artifact Analysis scanning can be set at creation. If you set a `Keep most recent versions` cleanup policy with package prefixes, only artifacts matching the prefixes are kept, up to the number set. Enabling the Container Scanning API starts billing immediately and enables scanning for all new and existing repositories; a repository with scanning disabled is excluded. Run cleanup policies in dry run first and try deletes on a disposable project.
- Granting `artifactregistry.repositories.create` through `roles/artifactregistry.admin` is highly privileged; do not grant it to lower-trust users. Corrected from the official docs: the source spells the permission `artifact-registry.repositories.create`; the permission ID in the IAM reference is `artifactregistry.repositories.create`.
- Artifact Registry enforces organization policy constraints that require CMEK or limit which Cloud KMS keys can be used.
- The gcloud 593.0.0 help lists lowercase enum values (`docker-hub`, `maven-central`, `npmjs`, `pypi`, `debian`, `debian-snapshot`, `ubuntu`, `centos`, `centos-stream`, and so on); the source writes the uppercase preset names shown above. For Apt, the help lists `--remote-apt-repo` values `debian`, `debian-snapshot`, `ubuntu`.
- `gcloud artifacts repositories create --mode` accepts `connector-repository`, `none`, `remote-repository`, `standard-repository`, `virtual-repository`.
- Password secret: store the upstream token in Secret Manager and reference the version with `--remote-password-secret-version`; never put the token in the command line. The Service Agent needs Secret Manager Secret Accessor on the secret (see `configure-remote-authentication.md`).
- The source also shows Console, Terraform (Docker, Maven, npm, Python, Apt, Yum), the Maven, Go (`--remote-go-repo=https://proxy.golang.org`), Apt (Preview), Ruby (Preview) and Yum (Preview) `gcloud` forms, and Maven version policy settings (`version_policy`, `allow_snapshot_overwrites`). The Ruby command is omitted because `--remote-repo` is not a flag of `gcloud artifacts repositories create` in gcloud 593.0.0.
- After creation: grant access to the repository, optionally configure cleanup policies, and configure Docker, package managers and other clients (Docker, Helm, Java, Node.js, Python, Go, Debian, RPM) to authenticate to the repository. Upstream authentication guides exist for Docker Hub, Maven Central, the npm registry and PyPI.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-repo (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [remote-overview.md](./remote-overview.md)
- [configure-remote-authentication.md](./configure-remote-authentication.md)
- [virtual-repo.md](./virtual-repo.md)
