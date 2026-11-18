---
source: https://docs.cloud.google.com/deploy/docs/architecture
---

# Cloud Deploy service architecture

Describes how Cloud Deploy relates to the external systems it uses (CI, Cloud Build, Skaffold, Cloud Storage, Observability, Pub/Sub, target runtimes), how its resources relate, and how a release flows from creation to promotion.

## Signature / Usage

Your CI process creates a release through the CLI or API, passing build artifacts or image references. Promotion later deploys the stored rendered manifest to the next target.

```bash
gcloud deploy releases promote --release=RELEASE_NAME \
                               --delivery-pipeline=PIPELINE_NAME \
                               --region=REGION
```

### How a release is delivered

1. CI calls Cloud Deploy (CLI `gcloud deploy releases create` or the `releases.create` API method).
2. On release creation Cloud Deploy:
   - stores an instance of the delivery pipeline in the release (unchanged even if the pipeline config later changes) and the tool versions (default unless you specified others);
   - calls Cloud Build, which gets the Skaffold rendering source from Cloud Storage (default or alternate bucket);
   - calls `skaffold diagnose` (with the stored Skaffold version) to generate a single effective manifest;
   - calls the `render` operation: built-in targets use `skaffold render`, substituting image names in `spec.templates.spec.containers.image` with the full image paths (digests or tags) given on the `gcloud deploy releases create` command or in a referenced build artifacts file; custom targets call the `render` operation of the custom target type. The rendered manifest is stored in Cloud Storage. Runs in the default or alternate execution environment.
3. On rollout creation (automatic after release creation, or on demand later): pre-deploy hooks; the `deploy` operation (`skaffold apply` for built-in targets, the custom target type's `deploy` operation otherwise); `skaffold verify` if `verify` is `true` for the target and verification is specified in the Skaffold configuration; post-deploy hooks (after `verify` if specified, otherwise after `deploy`).
4. On promotion, Cloud Build retrieves the target-specific manifest from Cloud Storage and runs `skaffold apply` against the target runtime, using the Skaffold version and pipeline instance of the release in the default or custom execution environment. The same applies to rollbacks and redeployments. If the target requires approval, approve or reject via CLI or Console.
5. Notifications are published to several Pub/Sub topics throughout.
6. Automations perform operations within the pipeline; an `automationRun` represents one rule execution.
7. Platform logs and audit logs go to Google Cloud Observability and Cloud Audit Logs.

## Options / Props

### External systems

| System | Role |
|---|---|
| Your CI system | Any CI tool whose output can be a call to the Cloud Deploy API or CLI to create a release. |
| Cloud Build | Renders manifests and deploys to the target runtime. |
| Skaffold | Used through Cloud Build to render and deploy. |
| Cloud Storage | Stores rendering source and rendered manifests. |
| Google Cloud Observability and Cloud Audit Logs | Logging data and audit logging. |
| Pub/Sub | Cloud Deploy publishes messages to several topics for integration with workflow, testing and other systems. |
| Target runtime | `skaffold apply` through Cloud Build deploys to GKE, Cloud Run or a custom target. |

### Resource relationships

| Relationship | Detail |
|---|---|
| Delivery pipeline | Yields zero or more releases; references one or more targets (including multi-targets and their child targets) and one or more automations. |
| Release | Includes the pipeline instance (snapshot of pipeline and targets at creation); yields zero or more rollouts; references zero or more artifacts. |
| Rollout | Associated with one target; has at least one phase; phase has one or more jobs; each job can have zero or more job runs (child resource of the rollout). |
| Parallel deployment | A multi-target creates controller rollouts, which create child rollouts, one per child target. |
| Target | Associated with one GKE cluster or other runtime destination; can be associated with one or more delivery pipelines. |
| Artifact | Any CI output (for example a container image) deployed to a target runtime as part of a rollout. |
| Automation | Contains automation rules; AutomationRun resources are executed instances. Automation and AutomationRun are peer-child resources beneath a delivery pipeline. |

## Notes

- For built-in targets the first rollout is created automatically upon release creation, and for built-in and custom targets this is automatic only when the release is created using the command line.
- `skaffold apply` includes the Skaffold health check, which waits for deployments to stabilize.
- With a canary strategy, pre-deploy hooks are called at the start of the first phase and post-deploy hooks run as the last job in the final phase.
- Flow control and access to resources are restricted using IAM.
- Snippet taken from https://docs.cloud.google.com/deploy/docs/promote-release (the architecture page has no code block).
- Source: https://docs.cloud.google.com/deploy/docs/architecture (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [terminology.md](./terminology.md)
- [promote-release.md](./promote-release.md)
