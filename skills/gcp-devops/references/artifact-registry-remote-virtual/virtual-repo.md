---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/virtual-repo
---

# Create virtual repositories

A virtual repository is a single access point to download, install or deploy artifacts of one format from one or more upstream repositories (Artifact Registry standard, remote or virtual). Upstreams are defined in an upstream policy file with an ID, a repository resource name and a priority.

## Signature / Usage

### Grant the service agent read access to upstreams

Virtual repositories use the Artifact Registry Service Agent to authenticate to upstream repositories, so it needs read access to them. Create the upstream repositories first, in the same region as the virtual repository. Granting Artifact Registry Reader on each upstream project:

Adapted (not in the official docs): the member placeholder `VIRTUAL-REPO-PROJECT_NUMBER` was renamed to `VIRTUAL_REPO_PROJECT_NUMBER` to match the placeholder explained by the source.

```bash
gcloud projects add-iam-policy-binding UPSTREAM_PROJECT_ID \
    --member serviceAccount:service-VIRTUAL_REPO_PROJECT_NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com \
    --role roles/artifactregistry.reader
```

`UPSTREAM_PROJECT_ID` is the project with the upstream repository; `VIRTUAL_REPO_PROJECT_NUMBER` is the project number of the project of the virtual repository.

### Upstream policy file

Policy file template (JSON; `PRIORITY` is an integer):

```text
[{
"id" : "POLICY_ID",
"repository" : "UPSTREAM_REPOSITORY_RESOURCE_NAME",
"priority" : PRIORITY
}, {...}]
```

Upstream repository resource name format:

```text
projects/PROJECT_ID/locations/LOCATION/repositories/REPOSITORY
```

Example `policies.json` with four upstreams. `upstream1` has the highest priority and is searched first; `upstream-test` has the lowest and is searched last; `upstream2` and `upstream3` share a priority, so a package found in both can be served from either:

```json
[{
"id" : "upstream1",
"repository" : "projects/myproject/locations/us-west1/repositories/python-repo1",
"priority" : 100
}, {
"id" : "upstream2",
"repository" : "projects/myproject/locations/us-west1/repositories/python-repo2",
"priority" : 80
}, {
"id" : "upstream3",
"repository" : "projects/myproject/locations/us-west1/repositories/python-repo2",
"priority" : 80
}, {
"id" : "upstream-test",
"repository" : "projects/myproject/locations/us-west1/repositories/python-test-repo",
"priority" : 20
}]
```

### Create the virtual repository

```bash
gcloud artifacts repositories create VIRTUAL-REPOSITORY-NAME \
    --project=PROJECT_ID \
    --repository-format=FORMAT \
    --mode=virtual-repository \
    --location=LOCATION \
    --description="DESCRIPTION" \
    --upstream-policy-file=UPSTREAM_POLICY_FILE
```

Example (Python packages in `us-west1`, settings in `policies.json`):

```bash
gcloud artifacts repositories create virtual-repo \
--repository-format=python \
--mode=virtual-repository \
--location=us-west1 \
--description="Python virtual repository" \
--upstream-policy-file=policies.json
```

### Update upstream repositories

Edit the policy file (add upstreams, change priorities) and apply it:

```bash
gcloud artifacts repositories update REPOSITORY \
    --upstream-policy-file=UPSTREAM_POLICY_FILE
```

To remove all upstream repositories, the policy file must contain an empty set:

```json
[]
```

### View and edit the description

```bash
gcloud artifacts repositories describe REPOSITORY \
    --location=LOCATION
```

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT \
    --location=LOCATION \
    --description="DESCRIPTION"
```

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Create virtual repositories and grant access to individual repositories | Artifact Registry Administrator (`roles/artifactregistry.admin`) on the project |
| Grant access to repositories at the project level | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) on the project |
| Grant access to repositories at the folder level | Folder Admin (`roles/resourcemanager.folderAdmin`) on the folder |
| Grant access to repositories at the organization level | Organization Admin (`roles/resourcemanager.organizationAdmin`) on the organization |

### Upstream policy fields

| Field | Description |
|---|---|
| `id` | Name of the policy; must be unique among the upstream repositories of the policy |
| `repository` | Upstream resource name `projects/PROJECT_ID/locations/LOCATION/repositories/REPOSITORY` |
| `priority` | Integer; higher values take precedence (for example `10` is higher than `1`). Leave gaps between values to insert upstreams later (a priority of `70` would be searched before `20`) |

### Upstream repository rules

| Rule |
|---|
| Can be a standard, remote or virtual repository |
| Must be in the same location (region or multi-region) as the virtual repository, but can be in a different project |
| Must be the same artifact format as the virtual repository |

### `--repository-format` values for virtual repositories

| Value | Note |
|---|---|
| `apt` | private preview |
| `docker` | |
| `go` | |
| `maven` | |
| `npm` | |
| `python` | |
| `yum` | private preview |

### Settings that cannot be changed after creation

| Setting |
|---|
| Artifact format |
| Repository mode, if multiple modes are available for the format |
| Repository location |
| Encryption (Google-owned and Google-managed keys by default, or CMEK) |

## Notes

- Adapted from the official docs: the member placeholder was written `service-VIRTUAL-REPO-PROJECT_NUMBER@...` while the explanation names `VIRTUAL_REPO_PROJECT_NUMBER`; the command uses the latter.
- The service agent role is granted at the project level so that individual upstream repositories need no grants. For a narrower grant, add the permission `artifactregistry.repositories.readViaVirtualRepository` to a custom role and grant that role to the service agent. Prefer the narrower grant (or a resource-level binding with `gcloud artifacts repositories add-iam-policy-binding`) when the upstream project holds other repositories; the project-level Reader grant opens every repository in that project to the service agent.
- If upstream repositories are in other projects, an administrator in those projects must be able to manage access to them.
- Granting `artifactregistry.repositories.create` through `roles/artifactregistry.admin` is highly privileged; do not grant it to lower-trust users. Corrected from the official docs: the source spells the permission `artifact-registry.repositories.create`; the permission ID in the IAM reference is `artifactregistry.repositories.create`.
- Artifact Registry enforces organization policy constraints that require CMEK or limit which Cloud KMS keys can be used.
- Store the upstream policy file in source control to reuse it and track changes. In the source example, `upstream2` and `upstream3` point to the same repository (`python-repo2`) with the same priority.
- In the source Terraform examples, `priority` is optional; Artifact Registry evaluates priorities in descending order and a higher value takes precedence in the pull order. With a virtual repository in front of remote and private repositories, put private repositories at a higher priority than remote ones to avoid dependency confusion.
- The source also shows Console and Terraform (Docker, Maven, npm, Python). The source's "Create a remote repository" link under upstream creation points back to this page; use `remote-repo.md`.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/virtual-repo (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [remote-repo.md](./remote-repo.md)
- [remote-overview.md](./remote-overview.md)
- [configure-remote-authentication.md](./configure-remote-authentication.md)
