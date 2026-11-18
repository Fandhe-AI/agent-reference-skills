---
source: https://docs.cloud.google.com/deploy/docs/terminology
---

# Cloud Deploy terminology

Glossary of terms as Cloud Deploy uses them. Core resource chain: delivery pipeline, target, release, rollout, phase, job, job run.

## Signature / Usage

Delivery pipelines are declarative: `skaffold.yaml` and `clouddeploy.yaml` are typical filenames for the Skaffold definition and delivery-pipeline definition. Stages are the targets (or multi-targets) listed in `serialPipeline.stages`.

Each `targetId` is one stage.

```text
serialPipeline:
 stages:
 - targetId:
   profiles: []
   strategy:
     standard:
       verify:
```

## Options / Props

### Core resources

| Term | Definition |
|---|---|
| Delivery pipeline | Workflow that delivers an application to each target in a progression. Defined in YAML (typically `clouddeploy.yaml`): targets plus the promotion sequence. Targets can be defined in a separate file. |
| Target | Specific runtime environment (Kubernetes cluster, Cloud Run service, other supported runtime) plus its configuration. Must be defined in the same project and region as the delivery pipeline; the runtimes they deploy to can be in different projects and regions. Can also be a multi-target or child target. |
| Release | Resource representing the changes (code, configuration or both) to deploy. |
| Rollout | Resource associating a release with a target. Created per release per target (three targets means three rollouts). Can be more complex with strategies such as canary. |
| Phase | Collection of jobs in a rollout grouped logically, for example deploy, or deploy and verify. |
| Job | Specific operation on a rollout, such as deploy or verify. |
| Job run | Child resource of a rollout; an instance of a job (an attempt to deploy or verify). |
| Stage | One target or multi-target in a pipeline (`dev`, `staging`, `prod`). In parallel deployment the multi-target is one stage; child targets are not separate stages. |
| Progression | Configuration describing a promotion sequence from one target or multi-target to another. |
| Promotion | Advancing a release from one target to the next per the progression. |
| Register | Providing an application to the service in the form of a delivery pipeline. |
| Pipeline instance | Snapshot of a delivery pipeline taken when a release is created, so all deployments of the release use the pipeline as defined then. |
| Pipeline mismatch | The pipeline or target changed after release creation; Cloud Deploy prompts you to examine definitions before promoting or rolling back. |
| Suspend | Prevents creation and promotion of releases from a pipeline. |
| Abandon | Permanently deactivates a release. |

### Strategies and parallel deployment

| Term | Definition |
|---|---|
| Deployment strategy | Technique for safely deploying changes while minimizing user impact. |
| Standard deployment strategy | Default: full deployment to the target at each stage, replacing the previous deployment. |
| Canary deployment | Roll out to a subset of users first, test, then roll out fully. |
| Parallel deployment | Deploying to more than one target at the same time in the same stage. |
| Multi-target | A single pipeline stage that consists of more than one runtime environment. |
| Child target | One of the multiple GKE, GKE attached clusters or Cloud Run targets deployed to simultaneously. |
| Controller rollout | Rollout generated for parallel deployment; not used to deploy to a single cluster or service, it has one child rollout per child target. |
| Child rollout | Rollout generated to deploy to a child target. |

### Execution and configuration

| Term | Definition |
|---|---|
| Execution environment | Resources Cloud Deploy runs on: default or private worker pool, default or alternate execution service account, default or alternate Cloud Storage location for rendered manifests. |
| Render (hydrating) | Prepares a manifest for deployment by providing values for its variables, using `skaffold render`. |
| Manifest | Kubernetes configuration object; rendered or unrendered. Rendering is often performed by Helm, Kustomize and kpt; Cloud Deploy uses Skaffold to orchestrate it. |
| Artifact | Container images to deploy (build artifacts) and configuration files used for the deployment (target artifacts). |
| Target artifact | Configuration file used to render and deploy on a target: Kubernetes manifest or Cloud Run service definition, Skaffold configs, and the rendering source. |
| Deploy parameters | Placeholders in a manifest not resolved at render time; values are assigned after each target-specific manifest is rendered. |
| Deploy hook | Arbitrary action to run before or after deploying. |
| Task | Way to configure a custom action for pre-/post-deploy hooks, deployment verification, deploy analysis, or a custom target type. |
| Verification | Confirming a deployment succeeded by running an arbitrary container with tests. |
| Analysis | Checks a newly deployed application against metrics or conditions using Google Cloud Observability or another metrics provider. |
| Custom target | Target using a user-defined custom target type instead of a supported target type. |

### Automation

| Term | Definition |
|---|---|
| Automation | Lets some actions on releases and rollouts happen without human intervention, for example automatic promotion into a target. |
| Automation rule | Defines what is automated, for example promoting a release. |
| Automation run | An instance of an automation. |

### Practices

| Term | Definition |
|---|---|
| Continuous delivery | Releasing changes safely, frequently and mostly automatically; requires manual approval at one or more stages. |
| Continuous deployment | Changes to code and configuration deployed automatically, with no manual approval. |

## Notes

- Snippet taken from https://docs.cloud.google.com/deploy/docs/config-files (the terminology page has no code block).
- Source: https://docs.cloud.google.com/deploy/docs/terminology (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [architecture.md](./architecture.md)
- [config-files.md](./config-files.md)
