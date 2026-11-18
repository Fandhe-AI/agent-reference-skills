---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/cloud-run
---

# Canary deployments to Cloud Run

Cloud Deploy canary supports Cloud Run services and worker pools, not jobs. Cloud Deploy updates the existing service with a new revision that receives the configured percentage of traffic while the old revision keeps the rest, and Cloud Run itself splits the traffic. This page covers only what is specific to canary; general Cloud Run pipeline setup is in the "Deploy a Cloud Run service, job, or worker pool" page.

## Signature / Usage

### Prepare the service definition

Your normal Cloud Run service definition is sufficient but must have no `traffic` stanza; Cloud Deploy splits traffic between the last successful revision and the new revision. No canary-specific configuration is needed in `skaffold.yaml` beyond a standard deployment; Skaffold profiles can manage variations for custom-automated phases.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: my-cloudrun-service
spec:
  template:
    spec:
      containers:
      - image: gcr.io/my-project/my-cloudrun-app
        ports:
        - containerPort: 8080
```

For a worker pool, the definition must have no `instanceSplit` stanza:

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
  name: my-wp
  annotations:
    run.googleapis.com/launch-stage: BETA
spec:
  template:
    spec:
      containers:
      - image: us-docker.pkg.dev/cloudrun/container/worker-pool
```

### Configure an automated canary

Replace `PERCENTAGES` with a comma-separated list of canary increments, for example `[25, 50, 75]` (not including `100`), and each `TASKS` with a list of tasks (an empty list `[]` if none).

```text
serialPipeline:
  stages:
  - targetId: prod
    profiles: []
    strategy:
      canary:
        runtimeConfig:
          cloudRun:
            automaticTrafficControl: true
        canaryDeployment:
          percentages: [PERCENTAGES]
          verify:
            tasks: [TASKS]
          predeploy:
            tasks: [TASKS]
          postdeploy:
            tasks: [TASKS]
```

### Configure a custom-automated canary

Include both `runtimeConfig.cloudRun.automaticTrafficControl: true` and `customCanaryDeployment.phaseConfigs` in `strategy.canary`. The service definition rendered by each profile still must not have a `traffic` stanza.

Replace each `TASKS` with a list of tasks (an empty list `[]` if none).

```text
serialPipeline:
  stages:
  - targetId: cloudrun-prod
    profiles: []
    strategy:
      canary:
        # Include runtimeConfig for automatic traffic management
        runtimeConfig:
          cloudRun:
            automaticTrafficControl: true
        # Include customCanaryDeployment for phase customization
        customCanaryDeployment:
          phaseConfigs:
          - phaseId: "warmup-cr"
            percentage: 10
            profiles: ["base-config"] # Profile rendering service def (no traffic stanza)
            verify:
              tasks: [TASKS]
          - phaseId: "scaling-cr"
            percentage: 50
            profiles: ["base-config"] # Can use the same profile
            verify:
              tasks: [TASKS]
          - phaseId: "stable"
            percentage: 100
            profiles: ["base-config"]
            verify:
              tasks: [TASKS]
```

### Execute the canary

```bash
gcloud deploy apply --file=delivery-pipeline.yaml --region=REGION
gcloud deploy apply --file=cloudrun-targets.yaml --region=REGION
```

```bash
gcloud deploy releases create RELEASE_NAME \
                                --delivery-pipeline=PIPELINE_NAME \
                                --region=REGION
```

```bash
gcloud deploy rollouts advance ROLLOUT_NAME \
                            --release=RELEASE_NAME \
                            --delivery-pipeline=PIPELINE_NAME \
                            --region=REGION
```

## Options / Props

### Extra IAM permissions for a canary

| Permission | Used for |
|---|---|
| `clouddeploy.rollouts.advance` | Advance a rollout to the next phase |
| `clouddeploy.rollouts.ignoreJob` | Ignore a failed job |
| `clouddeploy.rollouts.cancel` | Cancel a rollout |
| `clouddeploy.rollouts.retryJob` | Retry a failed job |
| `clouddeploy.jobRuns.get` | Get a job run |
| `clouddeploy.jobRuns.list` | List job runs |
| `clouddeploy.jobRuns.terminate` | Terminate a job run |

### Automated canary fields

| Field | Description |
|---|---|
| `percentages` | Comma-separated canary increments, for example `[25, 50, 75]`. Does not include `100` (the `stable` phase handles it); 100 is not allowed for Cloud Run |
| `verify.tasks` | Enables deployment verification; a `verify` job is added to each canary phase |
| `predeploy.tasks` | Enables predeploy hooks; a `predeploy` job is added to the first canary phase |
| `postdeploy.tasks` | Enables postdeploy hooks; a `postdeploy` job is added to the `stable` phase |

Tasks under `verify`, `predeploy` and `postdeploy` run sequentially in the order defined.

### `gcloud deploy rollouts advance` arguments

| Argument | Description |
|---|---|
| `ROLLOUT_NAME` | The current rollout to advance to the next phase |
| `--release` | The release the rollout is part of |
| `--delivery-pipeline` | The delivery pipeline managing the release |
| `--region` | Region where the release was created, for example `us-central1`; required |

## Notes

- If the application has not been deployed to the runtime yet, Cloud Deploy skips the canary phase and runs the `stable` phase.
- The image names in the source examples (`gcr.io/my-project/my-cloudrun-app`) are illustrative; use an Artifact Registry path such as `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` for your own images.
- Try the example on a disposable project first: advancing a canary changes live traffic on the service.
- The source also shows Console steps for advancing a rollout.
- Cloud Run itself is covered by `gcp-run`.
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/cloud-run (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [canary.md](./canary.md)
- [manage-rollout.md](./manage-rollout.md)
- [service-networking.md](./service-networking.md)
