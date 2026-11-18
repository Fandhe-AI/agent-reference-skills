---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/gke/service-networking
---

# Canary deployments to GKE with service networking

Canary deployment to GKE or GKE attached clusters using standard Kubernetes Service networking. Cloud Deploy provisions pods to reach the requested canary percentage as closely as possible; the split is based on the number of pods, not on traffic to the pods (use Gateway API for a traffic-based canary or an exact split). This page covers only what is specific to canary; general GKE pipeline setup is in the "Deploy to a Google Kubernetes Engine cluster" page.

## Signature / Usage

### How it works

1. You provide the names of the Deployment and Service resources.
2. Cloud Deploy creates an additional Deployment named after the current Deployment plus `-canary`. Secrets and ConfigMaps are also copied and renamed with `-canary`.
3. Cloud Deploy modifies the Service selector to select the pods of the current Deployment and the canary pods, and updates the canary Deployment's pod count for each phase (as a percentage of the original number of pods, which can give an inexact traffic split). When skipping to the `stable` phase, it adds the labels used to match pods so they are available for later canary runs.
4. In the `stable` phase, the `-canary` Deployment is scaled down to zero and the original Deployment is replaced with the new Deployment. The original Deployment is not modified until `stable`, unless overprovisioning is disabled.

### Prepare manifests

Your Kubernetes manifests must include a `Deployment` and a `Service`. The `Service` must define a `selector` that matches the labels of the pods managed by the `Deployment`. The default label Cloud Deploy looks for is `app`, configurable in the pipeline. No canary-specific configuration is needed in `skaffold.yaml` beyond a standard deployment; Skaffold profiles can manage variations for custom-automated phases.

### Configure an automated canary

Replace `SERVICE_NAME` with the name of the Kubernetes Service and `DEPLOYMENT_NAME` with the name of the Kubernetes Deployment, both defined in your manifest. `LABEL` is the pod selector label that must match the label selector in the Service (optional, default `app`). `PERCENTAGES` is a comma-separated list of canary increments, for example `[5, 25, 50]`, without `100`.

```text
serialPipeline:
  stages:
  - targetId: prod
    profiles: []
    strategy:
      canary:
        runtimeConfig:
          kubernetes:
            serviceNetworking:
              service: "SERVICE_NAME"
              deployment: "DEPLOYMENT_NAME"
              podSelectorLabel: "LABEL"
        canaryDeployment:
          percentages: [PERCENTAGES]
          verify:
            tasks: []
          predeploy:
            tasks: []
          postdeploy:
            tasks: []
```

### Configure a custom-automated canary

Include both `runtimeConfig` with `serviceNetworking` and `customCanaryDeployment.phaseConfigs` in `strategy.canary`.

```yaml
serialPipeline:
  stages:
  - targetId: gke-prod
    profiles: []
    strategy:
      canary:
        # Include runtimeConfig for automatic traffic management
        runtimeConfig:
          kubernetes:
            serviceNetworking:
              service: "my-app"
              deployment: "my-deployment"
        # Include customCanaryDeployment for phase customization
        customCanaryDeployment:
          phaseConfigs:
          - phaseId: "warmup"
            percentage: 10
            profiles: ["profile-a"] # Profile used for rendering this phase
            verify:
              tasks: []
          - phaseId: "scaling"
            percentage: 50
            profiles: ["profile-b"] # Different profile for this phase
            verify:
              tasks: []
          - phaseId: "stable"
            percentage: 100
            profiles: ["profile-b"] # Can reuse profiles
            verify:
              tasks: []
```

### Execute the canary

```bash
gcloud deploy apply --file=delivery-pipeline.yaml --region=REGION
gcloud deploy apply --file=gke-targets.yaml --region=REGION
```

```bash
gcloud deploy releases create RELEASE_NAME \
                                --delivery-pipeline=PIPELINE_NAME \
                                --region=REGION
  # e.g., --images=my-cloudrun-service=gcr.io/my-project/my-app:v1.1
  # Add --skaffold-file or --source if not using default Skaffold config discovery
```

```bash
gcloud deploy rollouts advance ROLLOUT_NAME \
                            --release=RELEASE_NAME \
                            --delivery-pipeline=PIPELINE_NAME \
                            --region=REGION
```

### Pod provisioning formulas

With overprovisioning enabled (`disablePodOverprovisioning: false`, the default):

```text
math.Ceil( percentage * ReplicaCountOfDeploymentOnCluster / (100-percentage))
```

With overprovisioning disabled (`disablePodOverprovisioning: true`), so the replica count is not increased:

```text
math.Ceil( (ReplicaCountOfDeploymentOnCluster + ReplicaCountOfCanaryDeploymentOnCluster) * percentage)
```

## Options / Props

### Automated canary fields

| Field | Description |
|---|---|
| `serviceNetworking.service` | Name of the Kubernetes Service defined in your manifest |
| `serviceNetworking.deployment` | Name of the Kubernetes Deployment defined in your manifest |
| `serviceNetworking.podSelectorLabel` | Pod selector label; must match the label selector in the Service. Optional, default `app` |
| `canaryDeployment.percentages` | Comma-separated canary increments, for example `[5, 25, 50]`. Does not include `100` (the `stable` phase handles it); 100 is not allowed for service-based canary |
| `verify.tasks` | Enables deployment verification; a `verify` job is enabled on each phase |
| `predeploy.tasks` | Enables predeploy hooks; a `predeploy` job is added to the first canary phase |
| `postdeploy.tasks` | Enables postdeploy hooks; a `postdeploy` job is added to the `stable` phase |

### Pod provisioning

| Setting | Behavior | Example |
|---|---|---|
| Overprovisioning enabled (default) | Creates enough additional pods to run the canary percentage based on the existing pod count | 4 existing pods, 50% phase: 4 canary pods |
| Overprovisioning disabled | The replica count is not increased; the original Deployment is scaled down | 4 pods, 50%: 2 original + 2 canary; then a 75% phase: `(2+2)*.75` = 3 canary pods and 1 original |

`ReplicaCountOfCanaryDeploymentOnCluster` only exists if there was already a canary phase.

### Extra IAM permissions for a canary

| Permission |
|---|
| `clouddeploy.rollouts.advance` |
| `clouddeploy.rollouts.ignoreJob` |
| `clouddeploy.rollouts.cancel` |
| `clouddeploy.rollouts.retryJob` |
| `clouddeploy.jobRuns.get` |
| `clouddeploy.jobRuns.list` |
| `clouddeploy.jobRuns.terminate` |

## Notes

- Warning from the source: canary percentages larger than 50% with overprovisioning enabled can cause very large increases in pods (4 existing pods and a 90% canary gives 36 canary pods). Disable overprovisioning if you want percentages larger than 50%.
- If the application has not been deployed to the runtime yet, Cloud Deploy skips the canary phase and runs the `stable` phase.
- The `--images` example in the release-creation comments names a Cloud Run service and a `gcr.io` image; it is illustrative only. Use an Artifact Registry path such as `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` for your own images.
- Try the example on a disposable project first: advancing a canary replaces the running Deployment in the `stable` phase.
- The source also shows Console steps for advancing a rollout.
- The cluster side is covered by `gcp-gke`.
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/gke/service-networking (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [canary.md](./canary.md)
- [gateway-api.md](./gateway-api.md)
- [manage-rollout.md](./manage-rollout.md)
