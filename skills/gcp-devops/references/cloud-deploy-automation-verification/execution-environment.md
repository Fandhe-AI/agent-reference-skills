---
source: https://docs.cloud.google.com/deploy/docs/execution-environment
---

# Cloud Deploy execution environment

The execution environment is where Cloud Deploy runs its render, predeploy, deploy, verify and postdeploy operations: a Cloud Build worker pool (default or private), the service account, the Cloud Storage location for rendered manifests, and the Cloud Build timeout. Each part is configured per target in `executionConfigs` of the target's YAML.

## Signature / Usage

### Private pool for DEPLOY, default pool for the rest

If you use a private pool for either `RENDER` or `DEPLOY` but the default pool for the other, you must configure both.

```yaml
executionConfigs:
- usages:
  - DEPLOY
  privatePool:
    workerPool: "projects/p123/locations/us-central1/workerPools/wp123"
- usages:
  - RENDER
  - PREDEPLOY
  - VERIFY
  - POSTDEPLOY
```

### Custom service account and storage

Add the service account after the `workerPool` element:

```text
serviceAccount: "[name]@[project_name].iam.gserviceaccount.com"
```

Change the storage location for rendered manifests:

```text
artifactStorage: "gs://[bucket_name]/[dir]"
```

### Debug log level for Skaffold, gcloud CLI and kubectl

```text
executionConfigs:
- usages:
  - [RENDER | PREDEPLOY|  DEPLOY | VERIFY | POSTDEPLOY]
  workerPool:
  serviceAccount:
  artifactStorage:
  executionTimeout:
  verbose: true
```

## Options / Props

### Defaults

| Setting | Default |
|---------|---------|
| Worker pool | Default Cloud Build worker pool (secure hosted environment with public internet access, isolated from other workloads). |
| Execution service account | Default Compute Engine service account. |
| Storage location | A Cloud Storage bucket Cloud Deploy creates in the same region as the Cloud Deploy resources: `<location>.deploy-artifacts.<project ID>.appspot.com`. |
| Cloud Build timeout | 1 hour for operations performed for Cloud Deploy; change it in the execution environment specification of the target. |
| Verbosity | Skaffold, gcloud CLI and kubectl use their defaults, typically `warn` or the equivalent; `verbose: true` sets `debug` or the equivalent. |

### executionConfigs usages

| Value |
|-------|
| `RENDER` |
| `PREDEPLOY` |
| `DEPLOY` |
| `VERIFY` |
| `POSTDEPLOY` |

### VPC Service Controls limitations

| Limitation |
|------------|
| Use a Cloud Build private worker pool for the target's execution environment, not the default pool. |
| The project with the worker pool and the project with the Cloud Deploy resources must stay in the same VPC Service Controls perimeter. |
| Any GKE cluster deployed to inside the perimeter must be a private cluster. |

## Notes

- Reasons to change the environment: deploying to a private GKE cluster; isolating operations from other organizations; no public internet connectivity; separate environments for render and deploy; a dedicated service account with narrower permissions; storing rendered manifests outside the default bucket.
- Cloud Build private worker pools are regional resources; Cloud Deploy lets targets use private pools in other regions, so pools can be shared among targets across regions.
- If Cloud Deploy runs in a different project from the worker pool's project, the Cloud Deploy service agent needs permission on the worker pool: the `roles/cloudbuild.workerPoolUser` role or the `cloudbuild.workerpools.use` permission.
- A custom service account must have the `clouddeploy.jobRunner` role.
- `artifactStorage` changes where rendered manifests are stored, not where the rendering source is stored.
- REST API shape (Discovery document, `clouddeploy` v1, `ExecutionConfig`): `usages` is required and also has the value `ANALYSIS` ("use for analysis job execution"), besides the five above; `workerPool` (`projects/{project}/locations/{location}/workerPools/{worker_pool}`) and `serviceAccount` are direct optional fields, and `privatePool` / `defaultPool` are alternative objects. `executionTimeout` must be between 10m and 24h (default 1h); `artifactStorage` is a bucket (`gs://my-bucket`) or a path within one; if `serviceAccount` is unspecified the project's `-compute@developer.gserviceaccount.com` account is used. The source's samples show both `privatePool.workerPool` and a top-level `workerPool`.
- The `text` fences hold fragments with placeholders.
- Private pool details and VPC Service Controls: Cloud Build private pools (`gcp-security` for VPC Service Controls, `gcp-networking` for private pool networking).
- Source: https://docs.cloud.google.com/deploy/docs/execution-environment (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloud-deploy-service-account.md](./cloud-deploy-service-account.md)
- [hooks.md](./hooks.md)
- [verify-deployment.md](./verify-deployment.md)
