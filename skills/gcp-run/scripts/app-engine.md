---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app
---

# App Engine and Migration to Cloud Run

Copy-paste gcloud commands for the App Engine application resource (create, inspect, deploy, versions, services, traffic, logs) and for migrating App Engine standard and flexible apps to Cloud Run with `gcloud beta app migrate-to-run`.

## Signature / Usage

### Create an App Engine app

Only needed for Cloud Scheduler App Engine HTTP targets. Replace `REGION` with the App Engine location; `europe-west` and `us-central` are called `europe-west1` and `us-central1` in Cloud Scheduler commands.

> **Warning**: The region of an App Engine app cannot be changed after it is set. Use a disposable project to try this.

```bash
gcloud app create --region=REGION
```

### Check the region of an existing app

`locationId` indicates the region, for example `locationId: us-central`.

```bash
gcloud app describe
```

### Deploy a service (from the gcloud reference)

```bash
gcloud app deploy ~/my_app/app.yaml
```

Override the project for a single deployment:

```bash
gcloud app deploy ~/my_app/app.yaml --project=PROJECT
```

Deploy multiple services:

```bash
gcloud app deploy ~/my_app/app.yaml ~/my_app/another_service.yaml
```

Change the default `--promote` behavior for your current environment:

```bash
gcloud config set app/promote_by_default false
```

Deploy a service that runs as a service account:

```bash
gcloud app deploy ~/my_app/app.yaml \
    --service-account=SERVICE_ACCOUNT
```

### List versions (from the gcloud reference)

```bash
gcloud app versions list
```

```bash
gcloud app versions list --service=service1
```

Only versions that receive traffic:

```bash
gcloud app versions list --hide-no-traffic
```

```bash
gcloud app versions list --format="json"
```

Versions created after a date:

```bash
gcloud app versions list \
    --filter="version.createTime.date('%Y-%m-%d', Z)>'2017-11-03'"
```

### Migrate traffic between versions (from the gcloud reference)

Works only for automatically scaled Standard versions; shuts down the previous version.

```bash
gcloud app versions migrate v2
```

```bash
gcloud app versions migrate v2 --service="s1"
```

### Delete versions (from the gcloud reference)

> **Warning**: Deleting a version is permanent. Try it on a disposable app first.

```bash
gcloud app versions delete --service=myService v1
```

```bash
gcloud app versions delete v1
```

```bash
gcloud app versions delete --service=myService v1 v2
```

```bash
gcloud app versions delete v1 v2
```

### List services and set traffic splits (from the gcloud reference)

```bash
gcloud app services list
```

Send all traffic to `v2` of service `s1`:

```bash
gcloud app services set-traffic s1 --splits=v2=1
```

Split traffic evenly between `v1` and `v2` of service `s1`:

```bash
gcloud app services set-traffic s1 --splits=v2=.5,v1=.5
```

Split traffic across all services:

> **Warning**: With no `SERVICES` argument this changes production traffic on every service of the app. Try it on a disposable app first.

```bash
gcloud app services set-traffic --splits=v2=.5,v1=.5
```

### Open an app, service or version in the browser (from the gcloud reference)

```bash
gcloud app browse
```

```bash
gcloud app browse --service="myService" --version="v1"
```

```bash
gcloud app services browse default
```

```bash
gcloud app services browse myService --version="v1"
```

```bash
gcloud app versions browse v1 --service="myService"
```

### Read logs (from the gcloud reference)

```bash
gcloud app logs read
```

```bash
gcloud app logs read --level=warning
```

```bash
gcloud app logs read --version=v1
```

```bash
gcloud app logs read --limit=10 --service=default
```

Request log for standard apps and for Flex apps:

```bash
gcloud app logs read --logs=request_log
```

```bash
gcloud app logs read --logs=nginx.request
```

### Prepare for migration to Cloud Run

Replace `PROJECT_ID` with your project ID and `REGION` with the Cloud Run region. Enable the Cloud Run Admin API and Artifact Registry API.

```bash
gcloud auth login
gcloud config set project PROJECT_ID
gcloud config set run/region REGION
gcloud components update
```

Grant the Cloud Build service account Cloud Run Builder (the Compute Engine default service account unless overridden); propagation takes a couple of minutes:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --role=roles/run.builder
```

### Migrate an app to Cloud Run (Preview)

Available only in `gcloud beta app migrate-to-run`. Check compatibility first:

```bash
gcloud beta app migrate-to-run --dry-run
```

Deploy using the local `app.yaml` (generates `service.yaml` next to it; answer `Y` at `Proceed with the deployment?` to build from source and deploy):

```bash
gcloud beta app migrate-to-run
```

If `app.yaml` is elsewhere:

```bash
gcloud beta app migrate-to-run --appyaml=PATH
```

Generate `service.yaml` without deploying:

```bash
gcloud beta app migrate-to-run --export-only=EXPORT_PATH
```

Standard environment only: use a previously built image (`SERVICE` is the App Engine service name and `VERSION` its version ID; this does not capture local `app.yaml` changes):

```bash
gcloud beta app migrate-to-run --service=SERVICE --version=VERSION --from-image
```

```bash
gcloud beta app migrate-to-run --service=SERVICE \
    --version=VERSION \
    --from-image \
    --export-only=EXPORT_PATH
```

### Configure the Cloud Run service like the App Engine app

```bash
gcloud run deploy SERVICE_NAME \
--cpu CPU \
--memory MEMORY \
--concurrency CONCURRENCY
```

Run it from the source directory: without `--image` (and without `--source`) the command deploys the current directory from source.

Update configuration without redeploying source:

```bash
gcloud run services update SERVICE_NAME \
--cpu CPU \
--memory MEMORY \
--concurrency CONCURRENCY
```

### Restrict invocation to specific principals

`MEMBER_TYPE` is the principal type, for example `user:email@domain.com`.

Adapted (not in the official docs): replaced the literal `...` (which gcloud would reject as an extra positional argument) with `--image=IMAGE_URL`, and added `--invoker-iam-check` so a service previously made public by disabling the Invoker IAM check stops accepting unauthenticated requests.

```bash
gcloud run deploy SERVICE_NAME --image=IMAGE_URL --no-allow-unauthenticated --invoker-iam-check
gcloud run services add-iam-policy-binding SERVICE_NAME \
--member=MEMBER_TYPE \
--role="roles/run.invoker"
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--region` | `app create` | App Engine location of the app |
| `--appyaml` / `--bucket` / `--no-cache` / `--ignore-file` / `--image-url` | `app deploy` | Replacement `app.yaml`, staging bucket, caching, ignore file, flexible-only image |
| `--promote` / `--no-promote` | `app deploy` | Promote the deployed version to receive all traffic (default from `app/promote_by_default`) |
| `--service-account` | `app deploy` | Service account the deployed version runs as |
| `--splits` | `app services set-traffic` | Key-value pairs of version and traffic weight; only the ratios matter |
| `--migrate` / `--split-by` | `app services set-traffic` | Traffic migration; split by `cookie`, `ip` (default) or `random` |
| `--hide-no-traffic` / `--service` | `app versions list` | Only versions with traffic / only one service |
| `--level` / `--limit` / `--logs` / `--service` / `--version` | `app logs read` | Severity, count (default 200), log names, service, version |
| `--dry-run` | `beta app migrate-to-run` | Check compatibility without deploying |
| `--appyaml` | `beta app migrate-to-run` | Path of an `app.yaml` outside the current directory |
| `--export-only` | `beta app migrate-to-run` | Write `service.yaml` to `EXPORT_PATH` without deploying |
| `--service` / `--version` / `--from-image` | `beta app migrate-to-run` | Migrate a previously built standard environment image |

Roles: deployer from source needs `roles/run.sourceDeveloper` and `roles/serviceusage.serviceUsageConsumer` on the project and `roles/iam.serviceAccountUser` on the Cloud Run service identity; the Cloud Build service account needs `roles/run.builder`; deploying a previously built image needs `roles/appengine.deployer`, `roles/run.developer`, `roles/artifactregistry.reader` and `roles/iam.serviceAccountUser`.

## Notes

- Commands marked from the gcloud reference are copied from its EXAMPLES section (the `$ ` prompt removed).
- Destructive: `gcloud app versions delete` removes versions permanently, `gcloud app create` is irreversible for the region, and `gcloud app services set-traffic` without `SERVICES` changes traffic on every service. Try them on a disposable project first. The App Engine app and its traffic are not affected by `migrate-to-run`: the new Cloud Run service is a replica.
- `gcloud app versions migrate` shuts down the previous version and works only for automatically scaled Standard versions.
- `app deploy` examples use `~/my_app/app.yaml` paths from the help; the help also shows Java forms (`WEB-INF/appengine-web.xml`, a single jar, `pom.xml`, `build.gradle`) that are not repeated here.
- Preview: `gcloud beta app migrate-to-run` is available only in the beta command group; pre-GA terms apply. The service it creates is private by default (a request returns `403 Forbidden`); test privately with `gcloud run services proxy` or enable public access only for intentionally public content.
- Corrected from the official docs: `gcloud run deploy SERVICE_NAME ... --no-allow-unauthenticated` contained a literal `...`; it was replaced with `--image=IMAGE_URL` (use `--source .` to deploy from source). The public variant (`--allow-unauthenticated`, or `allUsers` + `roles/run.invoker`) is described on the source page and makes the service publicly accessible; it is not included here.
- Adapted from the official docs: `--invoker-iam-check` was added to `gcloud run deploy SERVICE_NAME ... --no-allow-unauthenticated`. A Cloud Run service can be public in two independent ways (https://docs.cloud.google.com/run/docs/authenticating/public): the Invoker IAM check disabled (`--no-invoker-iam-check`), or `roles/run.invoker` granted to `allUsers`. `--no-allow-unauthenticated` alone does not re-enable a disabled check; set `--invoker-iam-check` explicitly and remove any `allUsers` binding (`gcloud run services remove-iam-policy-binding SERVICE_NAME --member=allUsers --role=roles/run.invoker`).
- The first block of "Prepare for migration" is a sequence of four separate commands from the source; `gcloud auth login` opens a browser sign-in.
- The Cloud Build default is the Compute Engine default service account, and `gcloud beta app migrate-to-run` has no flag to choose another build service account; restrict that account's roles instead and keep `iam.automaticIamGrantsForDefaultServiceAccounts` enforced. For the Cloud Run service identity, a new or the existing user-managed service account can be used. See the `gcp-foundation` skill.
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/app
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/deploy (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/versions (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/services (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/logs (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/browse (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/scheduler/docs/setup (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-standard-to-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/migrate-app-engine-flexible-to-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/authenticating/public (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [scheduler.md](./scheduler.md)
- [services.md](./services.md)
- [tasks.md](./tasks.md)
