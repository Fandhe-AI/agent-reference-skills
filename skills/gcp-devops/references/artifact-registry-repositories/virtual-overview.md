---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/virtual-overview
---

# Virtual repository overview

A virtual repository is a single endpoint that serves same-format artifacts from one or more upstream repositories. It simplifies client configuration, enables safer dependency resolution and helps prevent dependency confusion attacks. Artifact Registry quotas and limits apply to virtual repositories.

## Signature / Usage

### Create a virtual repository

The source page has no code block. Create the virtual repository with an upstream policy file (see the Notes for the source of the command):

```bash
gcloud artifacts repositories create virtual-repo \
--repository-format=python \
--mode=virtual-repository \
--location=us-west1 \
--description="Python virtual repository" \
--upstream-policy-file=policies.json
```

### Mitigate dependency confusion (recommended arrangement)

1. Create a remote repository as a proxy for the public repository.
2. Create a standard repository for your private packages.
3. Create a virtual repository that prioritizes your standard repository if a version of the same package exists in both.
4. Configure package managers and other tools to read from the virtual repository only, so client logic is not involved in repository selection.

## Options / Props

### Upstream selection

| Item | Behavior |
|---|---|
| Priority | Each upstream must have a priority: an integer weight, not a ranking. Higher numeric value wins (`10` beats `1`). |
| Equal priority | The artifact can be served from any of those repositories. |
| Requested version | Include the artifact version in the request; otherwise the client may return the latest version regardless of repository priority. |
| Upstream types | An Artifact Registry standard or remote repository (see Notes). |

### Supported formats

| Group | Formats |
|---|---|
| Language packages | Docker, Go, Maven, npm, Python |
| OS packages (Private Preview) | Apt, Yum |

### Limitations

| Limitation | Detail |
|---|---|
| Empty listing | Virtual repositories store no data, so they appear empty in `gcloud artifacts docker images list` and in the console. |
| Location | Standard upstream repositories must be in the same region or multi-region as the virtual repository; they can be in different projects. |
| Maven | Version policy cannot be set to snapshot or release. |
| Apt / Yum | Upstreams must be Artifact Registry standard repositories. Package index is updated asynchronously after import / upload / delete: seconds for small repositories, minutes or longer for larger ones. |

## Notes

- If a client such as Python `pip` is configured to search both PyPI and a virtual repository, a package can be downloaded directly from PyPI because `pip` always picks the latest version regardless of source. Configure `pip` to search only the virtual repository so priorities (including a remote repository proxying PyPI) apply.
- Snippet taken from https://docs.cloud.google.com/artifact-registry/docs/repositories/virtual-repo. The upstream policy file format is described on that page.
- Source inconsistency: this overview names standard or remote repositories as upstream types, while the create-virtual-repositories page (`virtual-repo.md` in the remote-virtual category) and `repositories.md` state that an upstream can be a standard, remote or virtual repository.
- Other modes: standard (default; upload directly), remote (caches after first download), connector (Preview; proxies without caching, for full auditability or no-caching policies).
- Grant the Artifact Registry service account access to the upstream repositories explicitly when setting up virtual repositories (see the access-control section of the repositories page).
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/virtual-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [repositories.md](./repositories.md)
- [create-repos.md](./create-repos.md)
- [supported-formats.md](./supported-formats.md)
