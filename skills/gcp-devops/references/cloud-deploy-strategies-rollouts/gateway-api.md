---
source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/gke/gateway-api
---

# Canary deployments to GKE with Gateway API

Canary deployment to GKE or GKE attached clusters using the Kubernetes Gateway API service mesh. It gives precise, percentage-based traffic splitting managed by the mesh or gateway (Istio or any supported Gateway API implementation, or the GKE Gateway controller), orchestrated by Cloud Deploy. This page covers only what is specific to canary; general GKE pipeline setup is in the "Deploy to a Google Kubernetes Engine cluster" page.

## Signature / Usage

### How it works

1. In addition to the Deployment and Service references, you provide an `HTTPRoute` resource with a `backendRefs` rule that references the Service.
2. Cloud Deploy creates a Deployment named after the original plus `-canary` and a Service named after the original plus `-canary`. Secrets, ConfigMaps and Horizontal Pod Autoscalers are also copied and renamed with `-canary`.
3. For each canary phase, Cloud Deploy modifies the `HTTPRoute` to update the weighting between the original and canary pods for that phase's percentage. Because propagation of `HTTPRoute` changes can be delayed, set `routeUpdateWaitTime`.
4. In the `stable` phase, the `-canary` Deployment is scaled down to zero, the original Deployment is updated to the new release's Deployment, and the `HTTPRoute` is reverted to the original you supplied. The original Deployment and Service are not modified until `stable`.

### Prepare manifests

Include a `Deployment`, a `Service` (its `selector` must match the pod labels of the Deployment; default label `app`) and an `HTTPRoute` configured for traffic splitting that references the `Service` and the associated Gateway. Make sure your Gateway and the underlying service mesh (for example Istio) or Gateway controller are configured in your cluster(s). No canary-specific configuration is needed in `skaffold.yaml` beyond a standard deployment.

### Configure an automated canary

Replace `ROUTE` with your `HTTPRoute` configuration, `SERVICE` with your Service configuration, `DEPLOYMENT` with your Deployment configuration, `WAIT_TIME` with the time to wait for `HTTPRoute` changes to propagate (for example `60s`) and `LABEL` with the pod selector label (optional, default `app`).

```text
strategy:
 canary:
   runtimeConfig:
     kubernetes:
       gatewayServiceMesh:
         httpRoute: "ROUTE"
         service: "SERVICE"
         deployment: "DEPLOYMENT"
         routeUpdateWaitTime: "WAIT_TIME"
         podSelectorLabel: "LABEL"
   canaryDeployment:
     percentages:
     - 50
```

### Configure a custom-automated canary

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
            gatewayServiceMesh:
              httpRoute: "my-route"
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
            predeploy:
              tasks: []
            postdeploy:
              tasks: []
          - phaseId: "scaling"
            percentage: 50
            profiles: ["profile-b"] # Different profile for this phase
            verify:
              tasks: []
            predeploy:
              tasks: []
            postdeploy:
              tasks: []
          - phaseId: "stable"
            percentage: 100
            profiles: ["profile-b"] # Can reuse profiles
            verify:
              tasks: []
            predeploy:
              tasks: []
            postdeploy:
              tasks: []
```

### Deploy an HTTPRoute to a different cluster

You can deploy the `HTTPRoute` (and optionally the Service) to non-target clusters, only with Gateway API service mesh. Add `associatedEntities` to the target, then reference it from `routeDestinations` inside the `gatewayServiceMesh` stanza.

Replace `KEY` with an arbitrary name for this group of associated entities, `PATH` with the resource path of the GKE cluster, and `[true|false]` with `true` or `false` (default `false`).

```text
associatedEntities:
  [KEY]:
    gkeClusters:
    - cluster: [PATH]
      dnsEndpoint: [true|false]
      internalIp: [true|false]
      proxyUrl:
```

Replace `KEY` with the name you configured in the target's `associatedEntities`, and `[true|false]` with `true` or `false` (default `false`).

```text
routeDestinations:
  destinationIds: ["KEY"]
  propagateService: [true|false]
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

## Options / Props

### `gatewayServiceMesh` fields

| Field | Description |
|---|---|
| `httpRoute` | Your `HTTPRoute` configuration defining the routing behavior |
| `service` | Your Service configuration; required for canary to GKE and GKE attached clusters |
| `deployment` | Your Deployment configuration; required for canary to GKE and GKE attached clusters |
| `routeUpdateWaitTime` | Time to wait for `HTTPRoute` changes to finish propagating, to avoid dropped requests, for example `60s` |
| `podSelectorLabel` | Pod selector label; must match the label selector in the Service and Deployment. Optional, default `app` |
| `routeDestinations.destinationIds` | Names of `associatedEntities` groups configured on the target; `@self` also deploys the `HTTPRoute` to the target cluster |
| `routeDestinations.propagateService` | Whether to deploy the Service to the associated cluster as well as the `HTTPRoute`. Default `false` |

### Target `associatedEntities`

| Field | Description |
|---|---|
| key (`KEY`) | Arbitrary name for the group of associated entities, referenced from `routeDestinations` |
| `gkeClusters[].cluster` | Resource path of the GKE cluster that gets the `HTTPRoute` (and optionally the Service) |
| `gkeClusters[].dnsEndpoint` | Use the cluster's DNS endpoint if multiple endpoints are configured. Default `false` |
| `gkeClusters[].internalIp` | Use the cluster's internal (private) IP if multiple endpoints are configured. Default `false` |
| `gkeClusters[].proxyUrl` | Present in the source's template without a description |

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

- 100% is allowed in `percentages` for the GKE Gateway API configuration (a 100% deployment from canary before switching to `stable`); it is not allowed for GKE service-based canary, GKE attached clusters or Cloud Run.
- Without Istio, when the Gateway API is connected to a Google Cloud load balancer, a small amount of traffic may be lost when the canary instance is scaled down; configure `routeUpdateWaitTime` if you observe this.
- Corrected from the official docs: the custom-automated section says to include a `runtimeConfig` section with `serviceNetworking`, but its own sample uses `gatewayServiceMesh`; the sample (and this page) use `gatewayServiceMesh`.
- The source's `associatedEntities` template ends with an empty `proxyUrl:` line with no description.
- If the application has not been deployed to the runtime yet, Cloud Deploy skips the canary phase and runs the `stable` phase.
- The `--images` example in the release-creation comments names a Cloud Run service and a `gcr.io` image; it is illustrative only. Use an Artifact Registry path such as `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` for your own images.
- Try the example on a disposable project first: the canary rewrites the live `HTTPRoute` and replaces the Deployment in `stable`.
- The source also shows Console steps for advancing a rollout.
- The Gateway controller and clusters are covered by `gcp-gke`.
- Source: https://docs.cloud.google.com/deploy/docs/deployment-strategies/canary/gke/gateway-api (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [canary.md](./canary.md)
- [service-networking.md](./service-networking.md)
- [manage-rollout.md](./manage-rollout.md)
