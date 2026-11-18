---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos
---

# Create standard repositories

Standard repositories hold your private artifacts; you upload to and download from them directly. Remote and virtual modes exist for some formats. Each repository contains one supported format. Ruby and Conda repositories are in Preview.

## Signature / Usage

### Before you begin

1. Enable Artifact Registry (the API) and install the Google Cloud CLI.
2. Optional: configure defaults for gcloud commands.
3. For customer-managed encryption keys (CMEK), create and enable a Cloud KMS key for the repository.

Required role: Artifact Registry Administrator (`roles/artifactregistry.admin`) on the project. Custom or other predefined roles may also provide the permissions.

### Create a repository with gcloud: Docker

```bash
      gcloud artifacts repositories create REPOSITORY \
          --repository-format=docker \
          --location=LOCATION \
          --description="DESCRIPTION" \
          --kms-key=KMS-KEY \
          --immutable-tags \
          --async \
          --disable-vulnerability-scanning
```

### npm

```bash
  gcloud artifacts repositories create REPOSITORY \
      --repository-format=npm \
      --location=LOCATION \
      --description="DESCRIPTION" \
      --kms-key=KMS-KEY \
      --async
```

### Python

```bash
  gcloud artifacts repositories create REPOSITORY \
      --repository-format=python \
      --location=LOCATION \
      --description="DESCRIPTION" \
      --kms-key=KMS-KEY \
      --async
```

### Generic

```bash
  gcloud artifacts repositories create REPOSITORY \
      --repository-format=generic \
      --location=LOCATION \
      --description="DESCRIPTION" \
      --kms-key=KMS-KEY \
      --async
```

### Customer-managed key path

```text
projects/KMS-PROJECT/locations/KMS-LOCATION/keyRings/KEY-RING/cryptoKeys/KEY
```

### List locations and describe the new repository

```bash
gcloud artifacts locations list
```

```bash
    gcloud artifacts repositories describe REPOSITORY \
        --location=LOCATION
```

### Edit the description

```bash
    gcloud artifacts repositories update REPOSITORY \
        --project=PROJECT \
        --location=LOCATION \
        --description="DESCRIPTION"
```

## Options / Props

### Create flags

| Flag | Description |
|---|---|
| `REPOSITORY` | Repository name; unique per location in a project. |
| `--repository-format` | `apt`, `conda`, `docker`, `generic`, `go`, `kfp`, `maven`, `npm`, `python`, `ruby`, `yum` (as used in the source examples). |
| `--location` | Regional or multi-regional location (Docker examples say regional); can be omitted if a default is set. |
| `--description` | Repository description; not encrypted, so do not include sensitive data. |
| `--kms-key` | Full Cloud KMS key path, only when using CMEK. |
| `--async` | Return immediately without waiting for the operation. |
| `--immutable-tags` | Docker only, optional: tags always point to the same image digest. Default (flag omitted): tags are mutable. |
| `--disable-vulnerability-scanning` | Docker, optional: disable automatic vulnerability scanning for the repository. |
| `--allow-vulnerability-scanning` | Docker, optional: permit automatic vulnerability scanning. |
| `--version-policy` | Maven only: `None` (default; release and snapshot), `Release`, `Snapshot`. |
| `--allow-snapshot-overwrites` | Maven snapshot repositories only: accept non-unique snapshots that overwrite existing versions. |

### Settings fixed at creation

| Setting | Notes |
|---|---|
| Artifact format | Cannot be changed. |
| Repository mode | Cannot be changed (when several modes exist for the format). |
| Location | Cannot be changed. |
| Encryption | Google-owned and Google-managed keys by default, or CMEK; cannot be changed. |

### Docker repository settings

| Setting | Notes |
|---|---|
| Immutable image tags | Disabled by default. A user with the Artifact Registry administrator role can change it after creation. |
| Artifact Analysis scanning | Enabled requires the Container Scanning API; billing begins as soon as the API is enabled, and scanning then applies to all new and existing repositories; pushed images are scanned automatically. Disabled excludes this repository. |

## Notes

- Warning in the source: granting `artifactregistry.repositories.create` through `roles/artifactregistry.admin` is highly privileged; do not grant it to lower-trust users. Corrected from the official docs: the source spells the permission `artifact-registry.repositories.create`; the permission ID in the IAM reference is `artifactregistry.repositories.create`.
- Artifact Registry enforces organization policy constraints that require CMEK or limit which Cloud KMS keys may be used.
- The `--kms-key` line in the examples is only for CMEK; remove it for Google-managed keys. Placeholder `KMS-KEY` is the key path shown above.
- Cleanup policies can be set at creation or later (dry run first); the source also lists the Maven `maven_config` Terraform block with `version_policy` values `VERSION_POLICY_UNSPECIFIED` (default), `RELEASE`, `SNAPSHOT` and `allow_snapshot_overwrites`. Maven 3 only supports unique snapshots; use unique snapshots in snapshot repositories.
- After creation: grant access to the repository, configure cleanup policies, and configure Docker, Helm, Java, Node.js, Python, Go, Debian, RPM and Kubeflow clients to authenticate (authentication pages are under https://docs.cloud.google.com/artifact-registry/docs/).
- Next steps in the source: list, label, tag and delete repositories. Deleting a repository removes its artifacts; try it on a disposable project first.
- Artifact Registry hosts private npm / PyPI-compatible repositories; npm / pip themselves behave as upstream documents them. Image building is in the `docker` skill.
- The source also shows the Console steps, Terraform for all formats, and gcloud commands for Apt, Conda, Go, KubeFlow Pipelines, Maven, Ruby and Yum; these are omitted. Maven's `--version-policy` form in the source has a trailing `\` after the last flag and is not reproduced.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [repositories.md](./repositories.md)
- [repo-locations.md](./repo-locations.md)
- [supported-formats.md](./supported-formats.md)
- [virtual-overview.md](./virtual-overview.md)
