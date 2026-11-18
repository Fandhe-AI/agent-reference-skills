---
source: https://docs.cloud.google.com/deploy/docs/verify-deployment
---

# Cloud Deploy deployment verification

Cloud Deploy can run your own testing image or images after a deployment to any target finishes, to verify that the application works. Verification runs as a `verify` job in the rollout, by default in the Cloud Deploy execution environment, and optionally on the GKE application cluster through Skaffold.

## Signature / Usage

### Configure verification with tasks in the delivery pipeline

Add a `verify` stanza to the target's stage:

```text
apiVersion: deploy.cloud.google.com/v1
kind: DeliveryPipeline
metadata:
 name: my-demo-app
description: main application pipeline
serialPipeline:
 stages:
 - targetId: dev
   profiles: []
   strategy:
     standard:
       verify:
         tasks:
         - type: container
           image: "VERIFY_IMAGE"
           command: [COMMANDS_TO_RUN]
           args: [LIST_OF_ARGS]
           env: {VERIFY_TASK_ENV_MAP}
```

Example command and arguments for a shell command:

Adapted (not in the official docs): the source wraps the shell command in backticks (`` `echo "This command ran!"` ``), which is not valid YAML as a plain scalar; single quotes are used, as on the deploy hooks page.

```yaml
command: ["/bin/sh"]
args: ["-c", 'echo "This command ran!"']
```

### Run verification on the application cluster (GKE only)

Define the verify containers in `skaffold.yaml` with `executionMode.kubernetesCluster`:

```text
verify:
- name:
  container:
    name:
    image:
    command:
    args:
  executionMode:
    kubernetesCluster:
```

```yaml
verify:
- name: integration-test-container
  container:
    name: integration-test-container
    image: integration-test-container
  executionMode:
    kubernetesCluster: {}
```

Then set `verify` to `true` in the delivery pipeline stage:

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: DeliveryPipeline
metadata:
 name: my-demo-app
description: main application pipeline
serialPipeline:
 stages:
 - targetId: dev
   profiles: []
   strategy:
     standard:
       verify: true
```

### Retry a failed verification

```bash
gcloud deploy rollouts retry-job ROLLOUT_NAME \
             --job-id=JOB_ID \
             --phase-id=PHASE_ID \
             --delivery-pipeline=PIPELINE_NAME \
             --release=RELEASE_NAME \
             --region=REGION
```

## Options / Props

### Verify task fields

| Field | Description |
|-------|-------------|
| `type` | `container`. |
| `image` | Image to run for the verify job, for example `us-central1-docker.pkg.dev/gcp-project-id-12345/my-repository/my-app:v1.2` for an Artifact Registry image. |
| `command` | List of entrypoints to run; `"/bin/sh"` is typical to invoke a shell. |
| `args` | Comma-separated list of arguments, each in quotation marks; with `/bin/sh` the first is `"-c"` followed by the whole command. |
| `env` | Map of environment variables passed into the container, in the format `KEY:VAL`. |

## Notes

- Environment variables: the same variables as the deploy hooks page are populated for verify jobs (`ANTHOS_MEMBERSHIP`, `CLOUD_RUN_LOCATION`, `CLOUD_RUN_PROJECT`, `CLOUD_RUN_SERVICE`, `CLOUD_RUN_SERVICE_URLS`, `CLOUD_RUN_REVISION`, `GKE_CLUSTER`, `TARGET_TYPE`, `CLOUD_DEPLOY_LOCATION`, `CLOUD_DEPLOY_DELIVERY_PIPELINE`, `CLOUD_DEPLOY_TARGET`, `CLOUD_DEPLOY_PROJECT`, `CLOUD_DEPLOY_PROJECT_ID`, `CLOUD_DEPLOY_RELEASE`, `CLOUD_DEPLOY_ROLLOUT`, `CLOUD_DEPLOY_JOB_RUN`, `CLOUD_DEPLOY_PHASE`); see `hooks.md` for each value. `CLOUD_RUN_SERVICE_URLS` is only available in postdeploy hooks and verify jobs.
- REST API shape (Discovery document, `clouddeploy` v1): for the `standard` strategy `verify` is a boolean ("whether to verify a deployment via `skaffold verify`") and the task list is `verifyConfig.tasks` (`verifyConfig` cannot be set if `verify` is true). The YAML above follows the source's `verify` map form.
- Verification success is the container's exit code: `0` is success, non-zero is failure. If more than one container runs, all must succeed. A failed verification fails the rollout.
- You can ignore or retry a failed verification, and terminate an in-progress verify job. Retrying changes the rollout state from `FAILED` to `IN_PROGRESS` and creates a new job run; you can only retry a verification for a rollout whose verify job failed.
- The verify operation runs in its own execution environment, which can be configured for `VERIFY` the same as for `RENDER` and `DEPLOY`.
- Verification configured with `tasks` runs only in the Cloud Deploy execution environment; to run on the cluster define `verify` in `skaffold.yaml`. Running on the cluster is available for GKE only; Cloud Run deployments can only run verification in the Cloud Deploy execution environment.
- Under `kubernetesCluster` you can also set `jobManifestPath` and `overrides` (Kubernetes inline JSON). `executionMode` is optional; if omitted Skaffold runs the containers in the Cloud Deploy execution environment.
- For parallel deployments, verification is configured on the multi-target and the containers run on each child target.
- Verification runs before `postdeploy` hooks.
- Corrected from the official docs: the source's ``args: ["-c", `echo "This command ran!"`]`` is written as `args: ["-c", 'echo "This command ran!"']`.
- Fences that hold placeholders or empty values use `text`.
- Task `command` / `args` / `env` values are stored in plain text in the delivery pipeline configuration; do not put tokens or passwords in them.
- Source: https://docs.cloud.google.com/deploy/docs/verify-deployment (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [hooks.md](./hooks.md)
- [deploy-analysis.md](./deploy-analysis.md)
- [execution-environment.md](./execution-environment.md)
