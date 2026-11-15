---
source: https://docs.cloud.google.com/run/docs/deploying-source-code
---

# Deploy a Service from Source Code

Grant the build account its role, deploy a Cloud Run service straight from a source directory (Dockerfile or buildpacks), then run the service as a dedicated service account.

## Signature / Usage

Run the commands from the source directory. `SERVICE` and `SERVICE_NAME` below are the same service name; each block keeps the placeholder of its source page. `SERVICE_ACCOUNT` is the email of a user-managed service account.

### 1. Grant Cloud Run Builder to the Cloud Build service account

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID. Wait a couple of minutes for propagation.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

### 2. Deploy from source

```bash
gcloud run deploy SERVICE --source .
```

Answer `y` to the API-enable prompts and give the platform and region if no defaults are set. When the prompt asks about unauthenticated invocations, answer no (or pass `--no-allow-unauthenticated`, which the deploying page documents) to keep the service private. A new service is private by default because Cloud Run enforces the Invoker IAM check; if you redeploy an existing service that was made public with `--no-invoker-iam-check`, also pass `--invoker-iam-check`, because `--no-allow-unauthenticated` only governs the `allUsers` binding. The new revision serves 100% of traffic.

### 3. Run the service as a dedicated service account

```bash
gcloud run services update SERVICE_NAME --service-account SERVICE_ACCOUNT
```

The deployer needs `roles/iam.serviceAccountUser` on that service account.

### 4. Python sources: set an entrypoint

```bash
gcloud run deploy SERVICE --source .  --set-build-env-vars GOOGLE_ENTRYPOINT="ENTRYPOINT"
```

Alternatively list `gunicorn` (or `fastapi` and `uvicorn`) in `requirements.txt`, or use a Procfile.

## Options / Props

| Role | Scope |
|---|---|
| Cloud Run Source Developer (`roles/run.sourceDeveloper`) | deployer, project |
| Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) | deployer, project |
| Service Account User (`roles/iam.serviceAccountUser`) | deployer, on the Cloud Run service identity |
| Cloud Run Builder (`roles/run.builder`) | Cloud Build service account, project |

## Notes

- Source deployments store images in the Artifact Registry repository `cloud-run-source-deploy` in the deploy region (created automatically).
- The Cloud Build account defaults to the Compute Engine default service account, which is what step 1 grants. Where practical use a dedicated user-managed service account, both for the build and for the service identity (step 3); do not rely on the default compute service account. For the build, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account instead of the default one in step 1; see https://docs.cloud.google.com/run/docs/configuring/services/build-service-account.
- Source inconsistency: step 4 (from https://docs.cloud.google.com/run/docs/troubleshooting) sets `GOOGLE_ENTRYPOINT` with `--set-build-env-vars` on `gcloud run deploy --source`; https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run says that with `gcloud run deploy --source` only the `Procfile` method works for the entrypoint.
- The container must listen on the port in `PORT` on `0.0.0.0`, not `127.0.0.1`.
- Cloud Run / Cloud Run functions are Google Cloud's serverless containers/functions, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container.
- The `gcloud run` commands that omit `--region` follow the source; pass `--region=REGION` or set the `run/region` property (for example `gcloud config set run/region REGION`), otherwise gcloud prompts for a region or, in non-interactive runs, fails.
- Source: https://docs.cloud.google.com/run/docs/deploying-source-code (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-image-from-artifact-registry.md](./deploy-image-from-artifact-registry.md)
- [gradual-rollout-with-tags.md](./gradual-rollout-with-tags.md)
- Prebuilt source and Compose deploys: https://docs.cloud.google.com/run/docs/deploying-source-code
