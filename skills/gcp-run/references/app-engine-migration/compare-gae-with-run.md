---
source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run
---

# Compare App Engine and Cloud Run

Introduction to Cloud Run for App Engine users: similarities, differences, and how App Engine settings map to Cloud Run settings. Cloud Run is the recommended platform for new projects and for modernizing existing apps; it runs on much of the same infrastructure as App Engine standard.

## Signature / Usage

### Deploy with configuration flags

```bash
gcloud run deploy SERVICE_NAME \
--cpu CPU \
--memory MEMORY \
--concurrency CONCURRENCY
```

### Update configuration without redeploying source

```bash
gcloud run services update SERVICE_NAME \
--cpu CPU \
--memory MEMORY \
--concurrency CONCURRENCY
```

Cloud Run revisions are immutable: this creates a new revision with the updated configuration and the same container image.

### Make a service public (replicates App Engine behavior)

At deployment:

Adapted (not in the official docs): replaced the literal `...` (which gcloud would reject as an extra positional argument) with `--image=IMAGE_URL`.

```bash
gcloud run deploy SERVICE_NAME --image=IMAGE_URL --allow-unauthenticated
```

Existing service:

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
--member="allUsers" \
--role="roles/run.invoker"
```

### Restrict invocation to specific principals

Adapted (not in the official docs): replaced the literal `...` (which gcloud would reject as an extra positional argument) with `--image=IMAGE_URL`.

```bash
gcloud run deploy SERVICE_NAME --image=IMAGE_URL --no-allow-unauthenticated
gcloud run services add-iam-policy-binding SERVICE_NAME \
--member=MEMBER_TYPE \
--role="roles/run.invoker"
```

`MEMBER_TYPE` is the principal type, for example `user:email@domain.com`.

## Options / Props

### Terminology and URLs

| | App Engine standard | App Engine flexible | Cloud Run |
|---|---|---|---|
| Terminology | Application, Service, Version | N/A / Service / Version | Service, Revision |
| App URL (default service) | `https://PROJECT_ID.REGION_ID.r.appspot.com` | N/A | Service URL: `https://SERVICE_NAME-PROJECT_NUMBER.REGION.run.app` or `https://SERVICE_IDENTIFIER.run.app` |
| Version/Revision URL | `https://VERSION-dot-SERVICE-dot-PROJECT_ID.REGION_ID.r.appspot.com` | — | `https://TAG---SERVICE_NAME-PROJECT_NUMBER.REGION.run.app` or `https://TAG---SERVICE_IDENTIFIER.run.app` (requires a traffic tag) |

### Feature comparison (standard / flexible / Cloud Run)

Reconstructed from the source's flattened summary table.

| Feature | Standard | Flexible | Cloud Run |
|---|---|---|---|
| Automatic / manual scaling | Yes / Yes | Yes / Yes | Yes / Yes |
| Scale to zero | Yes | No | Yes |
| Warm-up requests | Configurable | No | Automatic |
| Idle instance timeout | Up to 15 minutes | — | Depends on Billing setting; use instance-based billing to emulate App Engine |
| Request timeout | Automatic scaling 10 minutes; manual/basic 24 hours | 60 minutes | Configurable up to 60 minutes (default 5 minutes) |
| Deploy from source | Yes | — | Yes |
| Container image | No | Yes (custom runtimes) | Yes |
| Sidecar containers | No | — | Yes |
| Health checks | Automatic | Automatic | Configurable startup and liveness probes (TCP, HTTP, gRPC) |
| Compute | Instance classes F/B1 to B8 (approximate vCPU 0.25 to 2; 384MB to 3GB) | Up to 80 vCPU, up to 6.5GB per vCPU | Up to 8 vCPU, up to 32GB |
| GPUs / volume mounts | No / No | — | One GPU per instance / Cloud Storage bucket mounts |
| Ingress settings, IAP | Yes | Yes | Yes |
| Invoker role | No | — | Yes |
| Firewalls | Yes | Yes | Google Cloud Armor |
| Secret Manager | Via client libraries | — | Mount as volume or environment variables |
| Custom domains | Yes | Yes | Yes |
| VPC connectivity / egress settings | Yes | N/A | Yes |
| Multi-region load balancing / server streaming | No | — | Yes |
| Direct VPC egress | GA, YAML/Terraform | N/A | GA, Console/gcloud/YAML/Terraform |
| App Engine legacy bundled services | Yes (Java, Python, Go, PHP only) | — | No |
| Committed use discounts | No | — | Yes |

### Configuration defaults

| Setting | App Engine standard | App Engine flexible | Cloud Run |
|---|---|---|---|
| Compute resources | F1 | 1 vCPU, .6GB | 1 vCPU, 512MB |
| Maximum concurrency (requests) | 10 | None | 80 |
| Request timeout | Automatic scaling: 10 minutes; manual/basic: 24 hours | 60 minutes | 5 minutes |
| CPU utilization target | 60% | 50% | 60% |
| Maximum instances | None | 20 | 100 |
| Minimum instances | 0 | 2 | 0 |

### Scaling mapping (App Engine to Cloud Run)

| Intent | App Engine standard | App Engine flexible | Cloud Run |
|---|---|---|---|
| Minimum instances | `min_instances: N` | `automatic_scaling: min_num_instances: N` | Service: `scaling.min_instance_count: N`; revision: `template.scaling.min_instance_count: N` |
| Maximum instances | `max_instances: N` | `automatic_scaling: max_num_instances: N` | Service: `scaling.max_instance_count: N`; revision: `template.scaling.max_instance_count: N` (lower of the two is enforced) |
| Concurrency | `max_concurrent_requests: N` | `automatic_scaling: target_concurrent_requests: N` | `template.maxInstanceRequestConcurrency: N` |
| CPU utilization | `target_cpu_utilization: 0.X` | `automatic_scaling: cpu_utilization: target_utilization: N` | `template.scaling.cpuUtilization: 0.X` (flag `--scaling-cpu-target`; default about 60%) |
| Concurrency utilization | `target_throughput_utilization: 0.X` | Not available | `template.scaling.concurrencyUtilization: 0.X` (flag `--scaling-concurrency-target`; default 60%) |
| Latency | `min_pending_latency`, `max_pending_latency` | Not available | No direct equivalent; tune concurrency |
| Idle instances | `min_idle_instances` / `max_idle_instances` | Not available | No direct equivalent; use `scaling.min_instance_count` |
| Basic scaling | `basic_scaling: max_instances: N` | Not available | Automatic scaling with `scaling.min_instance_count: 0` and `scaling.max_instance_count: N` |
| Manual scaling | `manual_scaling: instances: N` | `manual_scaling: instances: N` | `scalingMode: MANUAL`, `manualInstanceCount: N` |
| Cooldown period | Not available | `cool_down_period_sec: N` | No direct equivalent; not required |
| Warmup requests | Configurable | — | Automatic via the container entrypoint; no `/_ah/warmup` handler needed |

### Environment variables

| App Engine | Cloud Run | Description |
|---|---|---|
| `GAE_SERVICE` | `K_SERVICE` | Current service name |
| `GAE_VERSION` | `K_REVISION` | Current version / revision |
| `PORT` | `PORT` | Port receiving HTTP requests |
| N/A | `K_CONFIGURATION` | Configuration that created the revision |
| `GOOGLE_CLOUD_PROJECT`, `GAE_APPLICATION`, `GAE_DEPLOYMENT_ID`, `GAE_ENV`, `GAE_INSTANCE`, `GAE_MEMORY_MB`, `NODE_ENV`, `GAE_RUNTIME` | N/A | App Engine only; use the metadata server |

### Metadata server paths

| Path | Description |
|---|---|
| `/computeMetadata/v1/project/project-id` | Project ID |
| `/computeMetadata/v1/project/numeric-project-id` | Project number |
| `/computeMetadata/v1/instance/id` | Container instance ID |
| `/computeMetadata/v1/instance/region` | Region (`projects/PROJECT_NUMBER/regions/REGION`); not available in App Engine flexible |
| `/computeMetadata/v1/instance/service-accounts/default/email` | Runtime service account email |
| `/computeMetadata/v1/instance/service-accounts/default/token` | OAuth2 access token for the service account |

## Notes

- Resource model: Cloud Run has no top-level Application or `default` service; services in a project can be in different regions; revisions are immutable and named `SERVICE_NAME-REVISION_SUFFIX` (`--revision-suffix`); only service URLs are exposed by default (use traffic tags for revisions).
- Configuration semantics differ: every App Engine deploy resets unspecified `app.yaml` settings to defaults; on Cloud Run unspecified settings keep their existing values (first revision uses defaults). `service.yaml` (Knative-style) cannot be used when deploying from source.
- Entrypoint: Cloud Run source deploys use buildpacks; Python needs a `Procfile` or `GOOGLE_ENTRYPOINT`; with `gcloud run deploy --source` only the `Procfile` method works for the entrypoint.
- CPU: Cloud Run allocates CPU only during request processing by default; use instance-based billing for background work (App Engine keeps CPU available). Idle instances can stay alive up to 15 minutes under request-based billing but CPU is throttled.
- Static content: Cloud Run has no static handlers; serve from the service or from Cloud Storage.
- Makes the service publicly accessible when `--allow-unauthenticated` or `allUsers` + `roles/run.invoker` is used; use only for intentionally public content. Cloud Run services are private by default.
- Corrected from the official docs: `gcloud run deploy SERVICE_NAME ... --allow-unauthenticated` and `gcloud run deploy SERVICE_NAME ... --no-allow-unauthenticated` contain a literal `...`; `gcloud run deploy` takes one positional argument, so `...` was replaced with `--image=IMAGE_URL` (use `--source .` instead to deploy from source).
- Source inconsistency: this page lists the App Engine standard maximum-instances default as "None"; https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml says that starting from March 2025 the default for new apps is 20 (existing apps unaffected). "None" predates that change; plan capacity for new standard apps with `max_instances: 20` (see the app-engine `standard-app-yaml.md` page).
- The feature-comparison table was flattened in the retrieved source and is reconstructed here; pricing figures from the source are omitted.
- Distance: Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- Source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [migrate-app-engine-standard-to-run.md](./migrate-app-engine-standard-to-run.md)
- [migrate-app-engine-flexible-to-run.md](./migrate-app-engine-flexible-to-run.md)
