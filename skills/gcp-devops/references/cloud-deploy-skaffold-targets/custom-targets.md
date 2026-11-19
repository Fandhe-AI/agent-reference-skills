---
source: https://docs.cloud.google.com/deploy/docs/custom-targets
---

# Custom targets in Cloud Deploy

A custom target deploys to systems that Cloud Deploy does not support natively. It consists of tasks (custom render and custom deploy), a `CustomTargetType` resource, and a target whose `customTarget` property names that type. Cloud Deploy passes inputs as environment variables, and your render and deploy must write a `results.json` to Cloud Storage.

## Signature / Usage

### Example render results file

```json
{
  "resultStatus": "SUCCEEDED",
  "manifestFile": "gs://bucket/my-pipeline/release-001/rollout-a/01234/custom-output/manifest.yaml",
  "failureMessage": "",
  "metadata": {
    "key1": "val",
    "key2": "val"
  }
}
```

### Example deploy results file

```json
{
  "resultStatus": "SUCCEEDED",
  "artifactFiles": [
    "gs://bucket/my-pipeline/release-001/rollout-a/01234/custom-output/file1.yaml",
    "gs://bucket/my-pipeline/release-001/rollout-a/01234/custom-output/file2.yaml"
  ],
  "failureMessage": "",
  "skipMessage": "",
  "metadata": {
    "key1": "val",
    "key2": "val"
  }
}
```

## Options / Props

### Inputs to custom render (environment variables)

| Variable | Description |
|----------|-------------|
| `CLOUD_DEPLOY_PROJECT` | Project number of the project in which the custom target is created |
| `CLOUD_DEPLOY_PROJECT_ID` | Project ID |
| `CLOUD_DEPLOY_LOCATION` | Region of the custom target type |
| `CLOUD_DEPLOY_DELIVERY_PIPELINE` | Delivery pipeline referencing the custom target type |
| `CLOUD_DEPLOY_RELEASE` | Release for which render is invoked |
| `CLOUD_DEPLOY_TARGET` | Target that uses the custom target type |
| `CLOUD_DEPLOY_PHASE` | Rollout phase the render corresponds to |
| `CLOUD_DEPLOY_REQUEST_TYPE` | Always `RENDER` |
| `CLOUD_DEPLOY_FEATURES` | Comma-separated features the container must support; empty for standard deployments, `CANARY` for canary (render is invoked for each phase). If unsupported, the implementation should fail during rendering |
| `CLOUD_DEPLOY_PERCENTAGE_DEPLOY` | Percentage for this render; per phase for canary; `100` for standard and for canary at `stable` |
| `CLOUD_DEPLOY_STORAGE_TYPE` | Always `GCS` |
| `CLOUD_DEPLOY_INPUT_GCS_PATH` | Cloud Storage path of the render-file archive written at release creation |
| `CLOUD_DEPLOY_OUTPUT_GCS_PATH` | Cloud Storage path where the render uploads artifacts; must include `results.json` |

### Outputs from custom render (`results.json`)

| Field / item | Description |
|--------------|-------------|
| Rendered configuration file(s) | Required even if empty; any format consumable by the custom deploy; human-readable recommended (shown in the release inspector) |
| `resultStatus` | `SUCCEEDED` or `FAILED` |
| `failureMessage` | Optional error message |
| `manifestFile` | Full Cloud Storage URI of the rendered file(s), built from `CLOUD_DEPLOY_OUTPUT_GCS_PATH` |
| `metadata` | Optional map; stored on the release in `custom_metadata` |

### Inputs to custom deploy (environment variables)

| Variable | Description |
|----------|-------------|
| `CLOUD_DEPLOY_PROJECT`, `CLOUD_DEPLOY_PROJECT_ID`, `CLOUD_DEPLOY_LOCATION`, `CLOUD_DEPLOY_DELIVERY_PIPELINE`, `CLOUD_DEPLOY_RELEASE`, `CLOUD_DEPLOY_TARGET`, `CLOUD_DEPLOY_PHASE` | Same meaning as for render |
| `CLOUD_DEPLOY_ROLLOUT` | Rollout this deploy is for |
| `CLOUD_DEPLOY_REQUEST_TYPE` | Always `DEPLOY` |
| `CLOUD_DEPLOY_FEATURES` | As for render; for `CANARY` the deploy is invoked for each phase |
| `CLOUD_DEPLOY_PERCENTAGE_DEPLOY` | Percentage for this deploy; your deploy must run for each phase |
| `CLOUD_DEPLOY_STORAGE_TYPE` | Always `GCS` |
| `CLOUD_DEPLOY_INPUT_GCS_PATH` | Where the custom renderer wrote rendered configuration files |
| `CLOUD_DEPLOY_SKAFFOLD_GCS_PATH` | Rendered Skaffold configuration, if you provided one with the release |
| `CLOUD_DEPLOY_MANIFEST_GCS_PATH` | Rendered manifest file |
| `CLOUD_DEPLOY_OUTPUT_GCS_PATH` | Directory where deploy artifacts and `results.json` are uploaded |

### Outputs from custom deploy (`results.json`)

| Field | Description |
|-------|-------------|
| `resultStatus` | `SUCCEEDED`, `FAILED` or `SKIPPED` (`SKIPPED` is for canary phases skipped to go straight to `stable`) |
| `artifactFiles` | Optional list of full Cloud Storage URIs; shown as deploy artifacts in job run resources |
| `failureMessage` | Optional; populates `failure_message` on the job run when `FAILED` |
| `skipMessage` | Optional extra information for `SKIPPED` |
| `metadata` | Optional map; stored on the job run and the rollout in `custom_metadata` |

## Notes

- Custom render is optional but needed unless the target renders correctly with the Cloud Deploy built-in renderers. `CustomTargetType` is the Cloud Deploy resource naming the tasks used for render and deploy; the target is a normal target plus a `customTarget` object whose `customTargetType` field names the `CustomTargetType` (`customTarget:` / `  customTargetType: NAME`, as in the config files schema page). The source describes `customTarget` as a property whose value is the name of the custom target type; the name goes in `customTarget.customTargetType`.
- Tasks run in the Cloud Deploy execution environment; they cannot run on a GKE cluster.
- Strategies: standard deployments fully supported; canary supported if the custom renderer and deployer support it, and only with the custom canary configuration. Automated and custom-automated canaries are not supported with custom targets.
- Deploy parameters can be set on the pipeline stage, the target or the release and are passed as extra environment variables.
- Debugging: the Cloud Storage URI of `results.json` is in the Cloud Build logs.
- This page shows no `CustomTargetType` definition YAML; see the Cloud Deploy "Create a custom target" page (https://docs.cloud.google.com/deploy/docs/create-custom-target). The results files are the only code shown.
- Samples (GitOps, Vertex AI, Terraform, Infrastructure Manager, Helm) are in the `cloud-deploy-samples` repository (`custom-targets/`) and are not a supported Google Cloud product.
- Source: https://docs.cloud.google.com/deploy/docs/custom-targets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [parallel.md](./parallel.md)
- [getting-started-skaffold.md](./getting-started-skaffold.md)
