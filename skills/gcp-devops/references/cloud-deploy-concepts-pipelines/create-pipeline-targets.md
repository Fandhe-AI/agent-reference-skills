---
source: https://docs.cloud.google.com/deploy/docs/create-pipeline-targets
---

# Create a delivery pipeline and targets

Define the pipeline and targets in YAML, then register each file with `gcloud deploy apply`. The pipeline can include its target definitions (conventionally `clouddeploy.yaml`) or reference targets in separate files (conventionally `delivery-pipeline.yaml`).

## Signature / Usage

### Register the pipeline and targets

Run `gcloud deploy apply` once per definition file (three targets in three files plus the pipeline means four runs). Skip this if you created the pipeline in the Google Cloud console.

```bash
gcloud deploy apply --file=PIPELINE_CONFIG \
                    --region=LOCATION \
                    --project=PROJECT
```

Single file:

```bash
gcloud deploy apply --file=clouddeploy.yaml --region=us-central1
```

Separate files:

```bash
gcloud deploy apply --file=delivery-pipeline.yaml --region=us-central1 && \
gcloud deploy apply --file=target_dev.yaml --region=us-central1 && \
gcloud deploy apply --file=target_staging.yaml --region=us-central1 && \
gcloud deploy apply --file=target_prod.yaml --region=us-central1
```

### Require manual approval on a target

```text
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name:
description:
requireApproval: true
```

## Options / Props

| Item | Detail |
|---|---|
| Target runtimes | GKE, GKE attached clusters, Cloud Run, or custom targets. Within one delivery pipeline all targets must reference the same runtime type (all GKE or all Cloud Run, for example). |
| `--region` | Required unless a default is set with `gcloud config set deploy/region [REGION]`. The region must be the same for the pipeline and all targets it references. |
| `requireApproval` | Default `false`. The caller promoting to the target still needs the `clouddeploy.rollouts.create` IAM permission either way. |
| Console creation | Useful for trying Cloud Deploy but not suitable for production workloads. Canary can be enabled in the console for Cloud Run only; for GKE configure it in the config file. |

## Notes

- Registered targets can be used by any pipeline in the same project and region.
- You can edit a pipeline or target config and run `gcloud deploy apply` again, but changes do not affect existing releases, which are managed by the original pipeline (pipeline instance).
- Manual approval can be required even on the first target: creating a release with the CLI creates the `rollout` automatically, but in a pending-release state until approval is given.
- The Terraform provider (`google`; `google-beta` for Preview features) can also create delivery pipeline and target resources. The source also shows Console steps; both omitted here.
- Snippet taken from https://docs.cloud.google.com/deploy/docs/promote-release (the target stanza is a template with empty values, so it is shown as `text`); full target YAML is on config-files.
- Source: https://docs.cloud.google.com/deploy/docs/create-pipeline-targets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-files.md](./config-files.md)
- [promote-release.md](./promote-release.md)
- [overview.md](./overview.md)
