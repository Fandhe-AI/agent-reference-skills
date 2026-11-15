---
source: https://docs.cloud.google.com/sdk/gcloud/reference/run/services
---

# Cloud Run Services

Copy-paste gcloud commands for Cloud Run services: deploy from an image or source, inspect, configure environment variables, secrets and scaling, manage IAM invoker access, split traffic between revisions, read logs, and delete.

## Signature / Usage

### Deploy a container image

```bash
gcloud run deploy SERVICE --image IMAGE_URL
```

```bash
gcloud run deploy SERVICE --region REGION
```

The second form deploys to a region other than the `run/region` property. Without `--image` (and without `--source`) the command tries to deploy the current directory from source.

### Deploy from source

```bash
gcloud run deploy SERVICE --source .
```

Run from the source directory (a Dockerfile is used if present, otherwise buildpacks detect the language). The Cloud Build service account needs Cloud Run Builder (`roles/run.builder`); the grant takes a couple of minutes to propagate:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

Replace `PROJECT_NUMBER` with the project number and `PROJECT_ID` with the project ID.

### Validate a deployment without deploying

Available only in `gcloud beta run deploy` (Preview):

```bash
gcloud beta run deploy SERVICE \
    --image IMAGE_URL \
    --dry-run
```

### List and describe

```bash
gcloud run services list
```

```bash
gcloud run services describe SERVICE --region REGION --format yaml
```

```bash
gcloud run services describe SERVICE --region REGION --format='value(status.url)'
```

### Export, edit and re-apply a service as YAML

```bash
gcloud run services describe SERVICE --format export > service.yaml
```

```bash
gcloud run services replace service.yaml
```

`replace` applies the whole file as the new configuration. Use `--region` to deploy a copy to a different region.

### Set environment variables

> **Warning**: `--set-env-vars` replaces the whole variable list and `--clear-env-vars` deletes every variable. Try them on a disposable service first, or use `--update-env-vars`.

```bash
gcloud run deploy SERVICE --image IMAGE_URL --set-env-vars KEY1=VALUE1,KEY2=VALUE2
```

```bash
gcloud run deploy SERVICE --image=IMAGE_URL --env-vars-file=ENV_FILE_PATH
```

```bash
gcloud run services update SERVICE --update-env-vars KEY1=VALUE1,KEY2=VALUE2
```

```bash
gcloud run services update SERVICE --remove-env-vars KEY1,KEY2
```

```bash
gcloud run services update SERVICE --clear-env-vars
```

### Use Secret Manager secrets

> **Warning**: `--set-secrets` replaces every configured secret, and `--remove-secrets` / `--clear-secrets` remove secrets from the service. Try them on a disposable service first.

Mount a secret as a file (`PATH` starts with a slash, for example `/etc/secrets/dbconfig/password`):

```bash
gcloud run deploy SERVICE --image IMAGE_URL  \
--update-secrets=PATH=SECRET_NAME:VERSION
```

Expose a secret as an environment variable:

```bash
gcloud run deploy SERVICE \
--image IMAGE_URL \
--update-secrets=ENV_VAR_NAME=SECRET_NAME:VERSION
```

Replace all secrets, or remove them:

```bash
gcloud run services update SERVICE \
--set-secrets="ENV_VAR_NAME=SECRET_NAME:VERSION"
```

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--remove-secrets=ENV_VAR_NAME,SECRET_FILE_PATH
```

```bash
gcloud run deploy SERVICE --image IMAGE_URL \
--clear-secrets
```

### Scaling, concurrency, timeout, CPU and ingress

```bash
gcloud run services update SERVICE --concurrency CONCURRENCY
```

```bash
gcloud run services update SERVICE --timeout=TIMEOUT
```

```bash
gcloud run services update SERVICE --cpu CPU
```

Service-level minimum and maximum instances:

```bash
gcloud run services update SERVICE --min MIN-VALUE
```

```bash
gcloud run services update SERVICE --max MAX-VALUE
```

Revision-level minimum and maximum instances:

```bash
gcloud run services update SERVICE --min-instances MIN-VALUE
```

```bash
gcloud run services update SERVICE --max-instances MAX-VALUE
```

`INGRESS` is one of `all`, `internal`, `internal-and-cloud-load-balancing`:

```bash
gcloud run services update SERVICE \
    --ingress INGRESS
```

### Grant a caller permission to invoke a service

```bash
gcloud run services add-iam-policy-binding my-service \
    --region=REGION \
    --member=serviceAccount:my-service-account@my-project.iam.gserviceaccount.com \
    --role=roles/run.invoker
```

```bash
gcloud run services get-iam-policy SERVICE_NAME
```

Revoke a binding (`PRINCIPAL` example: `user:email@domain.com`; `ROLE` example: `roles/run.invoker`):

> **Warning**: `remove-iam-policy-binding` changes who can call the service. Name the exact member and role, and try it on a disposable service first.

```bash
gcloud run services remove-iam-policy-binding SERVICE_NAME \
  --member=PRINCIPAL \
  --role=ROLE
```

### Disable the Invoker IAM check (public service)

> **Warning**: This makes the service publicly callable without authentication. Use it only for intentionally public content.

```bash
gcloud run services update SERVICE_NAME --no-invoker-iam-check
```

Re-enable the check:

```bash
gcloud run services update SERVICE_NAME --invoker-iam-check
```

Re-enabling the check with gcloud is not documented to remove `roles/run.invoker` bindings for `allUsers` or `allAuthenticatedUsers` (the source documents automatic removal of `allUsers` bindings only in the Console), and a service that still has such a binding stays publicly invocable. Check the policy with `gcloud run services get-iam-policy SERVICE_NAME` and remove each such binding with the `remove-iam-policy-binding` command above (`PRINCIPAL` = `allUsers` or `allAuthenticatedUsers`, `ROLE` = `roles/run.invoker`).

### Split traffic, roll back and use tags

Deploy a new revision of an existing service that receives no traffic, optionally with a tag (`--no-traffic` is rejected when the service does not exist yet):

```bash
gcloud run deploy SERVICE --source . --no-traffic
```

```bash
gcloud run deploy myservice --image IMAGE_URL  --no-traffic --tag TAG_NAME
```

Shift traffic (`LATEST` works as a revision name, for example `LATEST=5`):

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=PERCENTAGE
```

`LIST` is comma delimited, for example `hello2-00005-red=25,hello2-00001-bod=25,hello2-00002-nan=50`:

```bash
gcloud run services update-traffic SERVICE --to-revisions LIST
```

```bash
gcloud run services update-traffic SERVICE --to-latest
```

Roll back to a previous revision:

```bash
gcloud run services update-traffic SERVICE --to-revisions REVISION=100
```

Migrate traffic to a tagged revision and remove a tag:

```bash
gcloud run services update-traffic myservice --to-tags TAG_NAME=TRAFFIC_PERCENT
```

```bash
gcloud run services update-traffic SERVICE --remove-tags TAG_NAME
```

### List, describe and delete revisions

```bash
gcloud run revisions list --service SERVICE --region REGION
```

```bash
gcloud run revisions describe REVISION --region REGION --format yaml
```

> **Warning**: Deleting a revision cannot be undone. Try it on a disposable service first.

```bash
gcloud run revisions delete REVISION --region REGION
```

### Disable a service (scale to zero)

Later requests fail with `Service unavailable` or `Service disabled`. Requires Cloud Run Admin (`roles/run.admin`) on the project.

> **Warning**: `--scaling=0` stops the service from serving requests. Try it on a disposable service first.

```bash
gcloud run services update SERVICE --scaling=0
```

### Read logs

```bash
gcloud run services logs read SERVICE --limit=10 --project PROJECT-ID
```

Available only in `gcloud beta run services logs tail` (Preview, needs the `log-streaming` component):

```bash
gcloud beta run services logs tail SERVICE --project PROJECT-ID
```

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --project PROJECT-ID --limit 10
```

### Delete a service

> **Warning**: Deleting a service is permanent (no undo or restore) and removes every revision.

```bash
gcloud run services delete SERVICE --region REGION
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--image` / `--source` | `run deploy` | Container image or source directory to deploy |
| `--region` | most commands | Region of the service (otherwise the `run/region` property) |
| `--set-env-vars` | `run deploy`, `services update` | Replaces all variables (destructive) |
| `--update-env-vars` | `services update` | Changes or adds variables, deletes nothing |
| `--remove-env-vars` / `--clear-env-vars` | `services update` | Remove named variables / all variables |
| `--env-vars-file` | `run deploy` | `.env` or YAML file of variables |
| `--update-secrets` / `--set-secrets` | `run deploy`, `services update` | Add or update secrets / replace all secrets |
| `--remove-secrets` / `--clear-secrets` | `run deploy` | Remove named secrets / all secrets |
| `--min` / `--max` | `services update` | Service-level minimum / maximum instances |
| `--min-instances` / `--max-instances` | `services update` | Revision-level minimum / maximum instances |
| `--ingress` | `run deploy`, `services update` | `all`, `internal` or `internal-and-cloud-load-balancing` |
| `--no-traffic` / `--tag` | `run deploy` | Deploy without traffic; label the revision |
| `--to-revisions` / `--to-latest` / `--to-tags` / `--remove-tags` | `services update-traffic` | Traffic routing; percentages add up to 100 |
| `--scaling` | `services update` | Manual instance count; `0` disables the service |

Environment variable limits: at most 1000 variables per service, at most 32 Kb per variable; keys cannot be empty, contain `=` or start with `X_GOOGLE_`.

## Notes

- Destructive commands on this page: `services delete`, `revisions delete`, `remove-iam-policy-binding`, `--set-env-vars`, `--clear-env-vars`, `--set-secrets`, `--remove-secrets`, `--clear-secrets`, and `services update --scaling=0` (disables the service). Try each on a disposable service first.
- Source inconsistency: https://docs.cloud.google.com/run/docs/managing/services requires Cloud Run Admin (`roles/run.admin`) on the project to disable a service; https://docs.cloud.google.com/run/docs/configuring/services/manual-scaling lists Cloud Run Developer (`roles/run.developer`) on the service for the same `--scaling=0` change.
- Source inconsistency: the official pages disable a service with `--scaling=0`; the gcloud help for `gcloud run services update` describes the `--scaling` value as either `auto` or a positive integer.
- `gcloud run services set-iam-policy` is not listed: it replaces the whole IAM policy (a file without an `etag` removes every existing binding, including invoker grants to callers such as Cloud Scheduler or Cloud Tasks). Use `add-iam-policy-binding` and `remove-iam-policy-binding` instead.
- `--no-invoker-iam-check` makes the service publicly accessible; use only for intentionally public content. The source recommends it over granting `roles/run.invoker` to `allUsers`, and it is the approach to use under a domain restricted sharing organization policy.
- Prefer Secret Manager (`--update-secrets` / `--set-secrets`) over plain `--set-env-vars` for sensitive values. Grant `roles/secretmanager.secretAccessor` to a dedicated user-managed service account, not the Compute Engine default service account, on each secret the service uses rather than on the project (https://docs.cloud.google.com/secret-manager/docs/manage-access-to-secrets).
- Any configuration change creates a new revision. Once traffic is split or pinned to an earlier revision, later deployments follow that split until `--to-latest` is used.
- The Cloud Build grant (`roles/run.builder` to the Compute Engine default service account) is the source's default; prefer a dedicated user-managed service account where practical: pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account instead.
- `gcloud run deploy SERVICE --source . --no-traffic` and `--image IMAGE_URL --no-traffic --tag TAG_NAME` keep the source's two forms; test a tagged revision at `https://TAG---SERVICE-HASH.a.run.app`. `--no-traffic` works only on an existing service: gcloud rejects it with `--no-traffic not supported when creating a new service.`
- Compose, YAML, REST and Console variants are omitted; see the official pages.
- Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`), Vercel Functions (`vercel`), and HTTP frameworks (`hono`, `fastify`) that only run inside the container. See the `gcp-foundation` skill for IAM and service accounts and the `gcp-cli` skill for gcloud setup.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/run/services
- To make a public service private again, close both mechanisms as shown under "Disable the Invoker IAM check (public service)": re-enable the check and remove any `allUsers` / `allAuthenticatedUsers` binding for `roles/run.invoker`.
- If the exported file has `spec.template.metadata.name` (a revision name), delete it or set a new revision name before applying; revision names are immutable, so reusing the existing name with a changed configuration is rejected.
- Source: https://docs.cloud.google.com/run/docs/deploying (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/deploying-source-code (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/services (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/managing/revisions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/services/environment-variables (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/services/secrets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/managing-access (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/http-target-auth (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/logging (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/min-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/max-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/concurrency (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/request-timeout (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/configuring/services/cpu (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/securing/ingress (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [jobs.md](./jobs.md)
- [worker-pools.md](./worker-pools.md)
- [functions.md](./functions.md)
- [scheduler.md](./scheduler.md)
