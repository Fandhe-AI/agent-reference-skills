---
source: https://docs.cloud.google.com/deploy/docs/overview
---

# Cloud Deploy overview

Cloud Deploy is a managed service that automates delivery of your applications to a series of target environments in a defined promotion sequence. To deploy an updated application you create a release, whose lifecycle is managed by a delivery pipeline. Downstream it deploys to Cloud Run and Google Kubernetes Engine (GKE), including GKE attached clusters.

## Signature / Usage

### Register a pipeline and its targets

Registering is how the service learns about your application (step 3 of the delivery process below).

```bash
gcloud deploy apply --file=clouddeploy.yaml --region=us-central1
```

### The delivery process

1. Define the delivery pipeline in a YAML configuration file (promotion sequence across targets). Cloud Deploy also needs a Skaffold configuration to perform render and deploy operations.
2. Define the targets, in the pipeline file or in separate files.
3. Register the pipeline with the Cloud Deploy service.
4. Your CI process calls Cloud Deploy to create a `release` resource (rendered manifest per target, generated from the rendering source, `skaffold.yaml` and references to specific container images). Cloud Deploy automatically creates a `rollout` that associates the release with the first target. Any CI tool works as long as it outputs one or more container images; the call can also come from a script or any system responding to CI completion.
5. To deploy to the next target, you call Cloud Deploy to promote; each promotion creates a new rollout.
6. Promotion continues through all targets, the last typically `prod`.

## Options / Props

| Concept | Behavior |
|---|---|
| Delivery pipeline contents | Name and description; promotion sequence over targets; optional labels and annotations; optionally the target definitions themselves. |
| Target reuse | Multiple delivery pipelines can use the same target, but a given target can be used only once in a given delivery pipeline. |
| Promotion | Deploys a release to the next target in the sequence; the first call creates a `release` then a `rollout` for the first target; each later promote creates a rollout for the next target. |
| Approvals | Set `requireApproval` in the target definition. When a target requires approval, Cloud Deploy generates a Pub/Sub message. |
| Notifications (Pub/Sub) | Render start / success / failure; Deploy start / success / failure; Approval required; Approval approved; Approval rejected. |
| Rollbacks | Supported in any target: triggers a rollout against the last successfully deployed release, using the same parameters as that deployment. |
| Skaffold | Cloud Deploy uses Skaffold for rendering, deployment and verification (through Cloud Build). You must maintain a `skaffold.yaml`. |
| Observability | Metrics and audit details are collected throughout pipeline execution. |

### Typical Google Cloud toolchain

| Stage | Tool |
|---|---|
| Create source | Cloud Code (VS Code, IntelliJ, Cloud Shell) |
| Local dev loop | Skaffold |
| Build | Cloud Build (add a call to Cloud Deploy to create a release) |
| Store artifacts | Artifact Registry (Cloud Deploy retrieves the images from it) |
| Deploy | Cloud Deploy targets: GKE clusters, Cloud Run services or jobs, GKE attached clusters |
| Monitor | Google Cloud Observability |

## Notes

- Snippet taken from https://docs.cloud.google.com/deploy/docs/create-pipeline-targets (the overview page has no code block).
- Cloud Deploy is Google Cloud's continuous delivery service for GKE / Cloud Run; it is not Vercel or Cloudflare deployment (`vercel`, `cloudflare-wrangler` skills). Cloud Run and GKE themselves are in `gcp-run` and `gcp-gke`; Artifact Registry and Cloud Build are covered elsewhere in `gcp-devops`.
- Source: https://docs.cloud.google.com/deploy/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [terminology.md](./terminology.md)
- [architecture.md](./architecture.md)
- [config-files.md](./config-files.md)
- [create-pipeline-targets.md](./create-pipeline-targets.md)
- [promote-release.md](./promote-release.md)
