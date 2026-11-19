---
source: https://docs.cloud.google.com/deploy/docs/select-tool-version
---

# Select tool versions in Cloud Deploy

Cloud Deploy runs on a custom image with default tool versions, and lets you choose versions of Docker, kubectl, kpt, Helm, Kustomize and Skaffold for render, deploy and verify operations. Versions are fixed on each release at creation.

## Signature / Usage

### View default tool versions

```bash
gcloud deploy get-config \
      --project=PROJECT \
      --region=REGION \
      --format 'yaml(defaultToolVersions)'
```

### View the tool versions of a release

```bash
gcloud deploy releases describe RELEASE_NAME \
       --delivery-pipeline=PIPELINE_NAME \
       --project=PROJECT \
       --region=REGION \
       --format='yaml(toolVersions)'
```

### Use the latest version of every tool (disable fixed versioning)

```bash
gcloud deploy releases create RELEASE_NAME \
       --delivery-pipeline=PIPELINE_NAME \
       --project=PROJECT \
       --region=REGION \
       --docker-version=latest \
       --helm-version=latest \
       --kpt-version=latest \
       --kubectl-version=latest \
       --kustomize-version=latest \
       --skaffold-version=latest
```

### Specify particular versions

```bash
gcloud deploy releases create RELEASE_NAME \
       --delivery-pipeline=PIPELINE_NAME \
       --project=PROJECT \
       --region=REGION \
       --docker-version=DOCKER_VERSION \
       --helm-version=HELM_VERSION \
       --kpt-version=KPT_VERSION \
       --kubectl-version=KUBECTL_VERSION \
       --kustomize-version=KUSTOMIZE_VERSION \
       --skaffold-version=SKAFFOLD_VERSION
```

Example with Skaffold `2.16.1` and Helm `3.18.3`:

```bash
gcloud deploy releases create release-001 \
                              --delivery-pipeline=PIPELINE_NAME \
                              --skaffold-version=2.16.1 \
                              --helm-version=3.18.3 \
                              --project=PROJECT \
                              --region=REGION
```

### View maintenance and expiration dates

```bash
gcloud deploy releases describe RELEASE_NAME \
       --delivery-pipeline=PIPELINE_NAME \
       --project=PROJECT \
       --region=REGION \
       --format 'yaml(condition)'
```

```bash
gcloud artifacts versions list \
       --package TOOL_NAME \
       --repository tools \
       --project cd-image-prod \
       --location=REGION
```

## Options / Props

| Flag | Tool |
|------|------|
| `--docker-version` | Docker |
| `--helm-version` | Helm |
| `--kpt-version` | kpt |
| `--kubectl-version` | kubectl |
| `--kustomize-version` | Kustomize |
| `--skaffold-version` | Skaffold |

### Policy and defaults

| Item | Value |
|------|-------|
| Default image cadence | A new Cloud Deploy image is released every week; a new tool version can take up to two weeks to become the default |
| Support period | 12 months from the day a version is imported |
| Maintenance period | 60 days after support expires |
| During maintenance | Rollouts can still be created from existing releases; releases cannot be created with that version |
| After maintenance | No operations supported; rollouts cannot be created from such a release; release data remains |
| Special keyword | `latest` disables fixed tool versioning for that tool |
| Tool versions repository | Generic repository `tools` in project `cd-image-prod` (`us-central1`) |

## Notes

- Tool versions are saved on the release at creation and used for its entire lifecycle (render, deploy, rollbacks, redeployments); they cannot be changed later. Releases created before the feature have no `toolVersions`; use `--format 'yaml(skaffoldVersion)'` to see their Skaffold version.
- By default Cloud Deploy uses Kustomize through `kubectl kustomize`; specify the kustomize version at release creation to use kustomize directly.
- Cloud Deploy ensures compatibility of tool versions on its image; if you replace versions you are responsible for choosing compatible ones.
- Omit a flag to use that tool's default version.
- Maintenance and expiration dates are annotations on the respective versions in the `tools` repository.
- Caution (source): Skaffold will be removed from gcloud CLI releases after January 15, 2027 (install it per https://skaffold.dev/docs/install/); the Skaffold GitHub repository will be archived on January 29, 2027.
- The `tools` repository is in project `cd-image-prod` at `us-central1` (see the table above), so the `gcloud artifacts versions list` example needs `--location=us-central1` even when `REGION` is another region.
- Source: https://docs.cloud.google.com/deploy/docs/select-tool-version (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-skaffold.md](./using-skaffold.md)
- [managing-manifests.md](./managing-manifests.md)
