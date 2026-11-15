---
source: https://docs.cloud.google.com/run/docs/workerpools/deploy-source-code
---

# Deploy worker pools from source code

Deploy a new worker pool or revision directly from source with one command, `gcloud run worker-pools deploy` with `--source`. It defaults to source deployment when neither `--image` nor `--source` is supplied. Google Cloud buildpacks and Cloud Build build the image without local Docker; a Dockerfile in the source directory is used when present.

## Signature / Usage

### Deploy with build

```bash
gcloud run worker-pools deploy WORKERPOOL --source .
```

Replace `WORKERPOOL` with the name you want. Respond `y` to prompts to install required APIs (once per project) and supply platform/region if no defaults are set.

### Grant Cloud Build service account access

Cloud Build uses the Compute Engine default service account by default; it needs Cloud Run Builder (`roles/run.builder`):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID. Propagation takes a couple of minutes.

## Options / Props

| Role | Scope |
| --- | --- |
| Cloud Run Source Developer (`roles/run.sourceDeveloper`) | project (deployer) |
| Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) | project (deployer) |
| Service Account User (`roles/iam.serviceAccountUser`) | the Cloud Run service identity |
| Cloud Run Builder (`roles/run.builder`) | Cloud Build service account on the project |

Supported languages (buildpacks): Go, Node.js, Python, Java, Kotlin, Groovy, Scala, .NET, Ruby, PHP (plus any source with a Dockerfile).

| Limitation | Detail |
| --- | --- |
| Regions | only regions supported by Artifact Registry and Cloud Build |
| Customization | convenience feature; for full control build with `gcloud builds submit` then deploy with `--image` |
| File dates | buildpacks set source file Last Modified Date to Jan 1, 1980 (reproducible builds); consider disabling `etag` / `Last-Modified` headers |
| Builder | always `gcr.io/buildpacks/builder:latest`; use a specific builder for other language/OS configurations |
| JVM languages | must build with Maven or Gradle and the build file must contain all plugins to produce classes |
| Repository | auto-creates Artifact Registry repository `cloud-run-source-deploy` in the region if missing |

## Notes

- Enable the Cloud Run Admin API and Cloud Build API first (needs `serviceusage.services.enable`, for example via Owner or Service Usage Admin). Enabling Cloud Run Admin API creates the Compute Engine default service account.
- The default service account grant above follows the page; the `iam.automaticIamGrantsForDefaultServiceAccounts` constraint (enforced by default for organizations created after May 3, 2024) stops automatic Editor grants, and Google strongly recommends enforcing it and replacing Editor with narrower roles (check with Policy Simulator). Prefer a dedicated user-managed service account over the default one where possible.
- `gcr.io/buildpacks/builder:latest` is the buildpacks builder image name used by the source, not a Container Registry push target.
- For continuous deployment, connect GitHub repositories to Cloud Run instead of deploying from local sources.
- Source: https://docs.cloud.google.com/run/docs/workerpools/deploy-source-code (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-worker-pools.md](./deploy-worker-pools.md)
- [managing-workerpools.md](./managing-workerpools.md)
