---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-overview
---

# Remote repositories overview

Remote repositories act as proxies for upstream sources such as Docker Hub and Maven Central. The first request for a package version downloads and caches it in the remote repository; later requests for the same version are served from the cache. A request for an artifact (or version) that does not exist upstream fails. Artifact Registry quotas and limits apply to remote repositories.

## Signature / Usage

### Create a remote repository with a preset upstream

Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-repo (Docker Hub example).

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

### Use cases and benefits

- Faster, more reliable access: cached copies of public dependencies reduce latency for other Google Cloud services and stay available if the external repository is down.
- Safer dependency resolution: combine remote repositories with virtual repositories to mitigate dependency confusion attacks (a malicious new version uploaded to a public repository tricks clients into choosing it). Instead of configuring clients to search multiple repositories, configure a virtual repository that prioritizes private repositories over remote ones.
- Lower data transfer cost: cache artifacts in the same region or multi-region as your runtimes.

## Options / Props

### Default update age for mutable files (package indexes and metadata)

| Format | File type | Default update age |
|---|---|---|
| Maven | `maven-metadata.xml` | 5 minutes |
| Maven | `archetype-catalog.xml` | 1 hour |
| Npm | Manifest files | 5 minutes |
| Python | Index files | 1 hour |
| Docker | List/Get tags cache | 1 hour |
| Apt/Yum (preview) | Index files | 2 minutes |
| Apt/Yum (preview) | Package files | 72 hours |

### Preset upstream URLs

| Format | Package types | Upstream URL | Upstream preset name |
|---|---|---|---|
| Docker | Public or private | `https://registry-1.docker.io` | `DOCKER-HUB` |
| Go | Public | `https://proxy.golang.org` | `https://proxy.golang.org` |
| Maven | Public or private | `https://repo.maven.apache.org/maven2` | `MAVEN-CENTRAL` |
| npm | Public or private | `https://registry.npmjs.org` | `NPMJS` |
| Python | Public | `https://pypi.io` | `PYPI` |
| OS packages (preview) | Public | See the OS package presets below | See the OS package presets below |

### OS package preset upstreams (Preview)

Pick a repository base and customize the remainder of the URL (path). Preview features are subject to the "Pre-GA Offerings Terms".

| Format | Repository | URL prefix | Repository base name |
|---|---|---|---|
| Apt | Archived Debian | `https://snapshot.debian.org` | `DEBIAN_SNAPSHOT` |
| Apt | Debian | `http://deb.debian.org` | `DEBIAN` |
| Apt | Ubuntu LTS or Pro | `http://archive.ubuntu.com` | `UBUNTU` |
| Yum | CentOS | `http://mirror.centos.org` | `CENTOS` |
| Yum | CentOS | `http://debuginfo.centos.org` | `CENTOS_DEBUG` |
| Yum | CentOS | `https://vault.centos.org` | `CENTOS_VAULT` |
| Yum | CentOS | `https://mirror.stream.centos.org` | `CENTOS_STREAM` |
| Yum | Rocky | `http://dl.rockylinux.org` | `ROCKY` |
| Yum | Fedora Extra Packages for Enterprise Linux (EPEL) | `https://dl.fedoraproject.org/pub/epel` | `EPEL` |

### Common custom upstream URIs (non-exhaustive)

Custom upstream URIs are supported for Docker, npm, Maven and Python and must use HTTPS.

| Format | Upstream URI | Registry name |
|---|---|---|
| Docker | `https://ghcr.io` | GitHub Container Registry |
| Docker | `https://registry-1.docker.io` | Docker Hub |
| Docker | `https://public.ecr.aws` | AWS ECR Public Gallery |
| Docker | `https://registry.k8s.io` | Kubernetes Container Registry |
| Docker | `https://MY_NEXUS_IP` | Nexus |
| npm | `https://registry.npmjs.org` | npm |
| npm | `https://npm.pkg.github.com` | GitHub Npm Registry |
| npm | `https://MY_NEXUS_IP/repository/MY_UPSTREAM_REPOSITORY` | Nexus |
| Maven | `https://repo.maven.apache.org/maven2` | Maven Central |
| Maven | `https://MY_NEXUS_IP/repository/MY_UPSTREAM_REPOSITORY` | Nexus |
| Python | `https://pypi.io` | Python Package Index (PyPI) |
| Python | `https://MY_NEXUS_IP/repository/MY_UPSTREAM_REPOSITORY` | Nexus |

`MY_NEXUS_IP` is the IP address and port of your Nexus upstream instance (the endpoint must use HTTPS); `MY_UPSTREAM_REPOSITORY` is the name of your upstream repository.

### Limitations

| Limitation | Detail |
|---|---|
| Maven version policy | Maven remote repositories don't permit setting the version policy to snapshot or release. |
| Upstream reachability | Upstream sources must be internet accessible; on-premises or VPC network upstreams without a public IP address are not supported. |
| Custom upstream scheme | Custom upstream URIs must use HTTPS; unencrypted HTTP is not supported. |

## Notes

- Artifact Registry repositories (format Docker, npm, Maven or Python) in standard mode can also be used as upstreams of a remote repository.
- Upstream authentication: remote repositories support basic authentication to upstream sources for supported formats (see `configure-remote-authentication.md`).
- VPC Service Controls: if Artifact Registry is in a service perimeter, access to upstream sources outside the perimeter is denied by default; see `remote-repo.md` for the `gcloud artifacts vpcsc-config` commands.
- Other repository modes: standard (default; upload private packages directly), connector (Preview; proxies the upstream without caching, so all requests go to the upstream; useful for full auditability or policies against caching), and virtual (a single access point for multiple upstream repositories, including remote and standard ones).
- Artifact Registry hosts private npm / PyPI-compatible repositories; npm / pip themselves behave as upstream documents them. Image building and Dockerfiles are in `docker`; this skill covers storing and pulling images in Artifact Registry.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/remote-repo (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [remote-repo.md](./remote-repo.md)
- [configure-remote-authentication.md](./configure-remote-authentication.md)
- [virtual-repo.md](./virtual-repo.md)
