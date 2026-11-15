---
source: https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml
---

# app.yaml reference (standard environment)

`app.yaml` configures an App Engine standard app. It must specify at least a `runtime` entry. Each service in the app has its own `app.yaml`, and the `default` service's `app.yaml` must be created first. The syntax is YAML; URL and file path patterns use POSIX extended regular expressions (back-references such as `\1` and the Perl extensions `\w \W \s \S \d \D` are supported).

## Signature / Usage

### Example app.yaml

```yaml
runtime: python315

instance_class: F2

env_variables:
  BUCKET_NAME: "example-gcs-bucket"

handlers:
# Matches requests to /images/... to files in static/images/...
- url: /images
  static_dir: static/images

- url: /.*
  secure: always
  redirect_http_response_code: 301
  script: auto
```

### automatic_scaling

```yaml
automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 5
  max_instances: 100
  min_pending_latency: 30ms
  max_pending_latency: automatic
  max_concurrent_requests: 50
```

### basic_scaling

```yaml
basic_scaling:
  max_instances: 11
  idle_timeout: 10m
```

### manual_scaling

```yaml
manual_scaling:
  instances: 5
```

### vpc_access (Direct VPC egress)

```yaml
vpc_access:
  network_interface:
    network: direct-vpc-network
    subnet: direct-vpc-subnetwork
    tags:
      - my-tag1
      - my-tag2
  vpc_egress: all-traffic
```

### vpc_access_connector (Serverless VPC Access)

```yaml
vpc_access_connector:
  name: "projects/PROJECT_ID/locations/REGION/connectors/CONNECTOR_NAME"
  egress_setting: all-traffic
```

### error_handlers

```yaml
error_handlers:
- file: default_error.html
- error_code: over_quota
  file: over_quota.html
```

### Static handlers

```yaml
handlers:
# All URLs ending in .gif .png or .jpg are treated as paths to
# static files in the static/ directory. The URL pattern is a
# regular expression, with a grouping that is inserted into the
# path to the file.
- url: /(.*\.(gif|png|jpg))$
  static_files: static/\1
  upload: static/.*\.(gif|png|jpg)$
```

## Options / Props

### Runtime and app elements

| Element | Description |
|---|---|
| `runtime` | Required. Runtime ID, e.g. `python315`. |
| `service` | Required when creating a service; optional for `default`. Name may contain numbers, letters and hyphens. Combined length of `VERSION-dot-SERVICE-dot-PROJECT_ID` must be at most 63 characters and cannot start or end with a hyphen. Do not reuse names between services and versions. |
| `instance_class` | Automatic scaling: `F1`, `F2`, `F4`, `F4_1G` (default `F1`). Basic and manual scaling: `B1`, `B2`, `B4`, `B4_1G`, `B8` (default `B2`); these require `basic_scaling` or `manual_scaling`. For `F2` or higher, consider raising `max_concurrent_requests` above the default 10. |
| `entrypoint` | Optional. Command run at start; must start a web server listening on port 8080. For Python without `entrypoint`, App Engine starts Gunicorn. |
| `env_variables` | Optional. Keys must match `[a-zA-Z_][a-zA-Z0-9_]*`. Names prefixed with `GAE` are reserved and not allowed. |
| `build_env_variables` | Optional. Build environment variables for runtimes that support buildpacks. |
| `service_account` | Optional. Version-specific service account used when accessing other Google Cloud services and executing tasks: `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`. |
| `default_expiration` | Optional. Global default cache period for static file handlers, e.g. `"4d 5h"` (units d, h, m, s). If omitted, the production server uses 10 minutes. |
| `inbound_services` | Optional. `warmup` enables warmup requests. |
| `app_engine_apis` | Optional. `true` enables all bundled services for second-generation runtimes. If set to `true` or `false`, deployments succeed only when `app_engine_bundled_services` is unspecified. `app_engine_bundled_services` is recommended instead (fine-grained, less exposure). |
| `app_engine_bundled_services` | Optional. Cannot be combined with `app_engine_apis: true`. Allowed values: `app_identity_service`, `blobstore`, `capability_service`, `datastore_v3`, `images`, `namespaces`, `search`, `deferred`, `mail`, `memcache`, `modules`, `taskqueue`, `urlfetch`, `user`. |
| `error_handlers` | Optional. Custom error pages. `error_code`: `over_quota` or `timeout` (optional; without it the file is the default error page). `file`: static file served instead. Path must not overlap static handler paths; error data must be less than 10 kilobytes. |
| `handlers` | Optional. List of URL patterns and how to handle them (see below). |
| `vpc_access` | Optional. Direct VPC egress. `network_interface` is required: `network` and/or `subnet` (if only `network` is given, `subnet` defaults to the same name; full resource paths allowed for Shared VPC); `tags` optional list of network tags; `vpc_egress` optional: `private-ranges-only` (default; only internal-IP traffic goes through the VPC) or `all-traffic`. |
| `vpc_access_connector` | Optional. `name` is the fully qualified connector name in quotes; `egress_setting` optional, `private-ranges-only` (default) or `all-traffic`. |

### Handlers sub-elements

Patterns are evaluated top to bottom; the first match handles the request.

| Element | Description |
|---|---|
| `url` | Required. URL pattern regular expression, may contain groupings. With `static_dir` it is a prefix and must not contain groupings. |
| `script` | Only accepted value is `auto`. To use static handlers, at least one handler must contain `script: auto` or the app must define `entrypoint`. |
| `static_dir` | Directory (from app root) of static files; the part of the URL after the matched prefix is appended. Files in it are static and cannot run as scripts. |
| `static_files` | URL pattern to specific static file paths (groups usable via `\1`). Static files cannot be the same as application code files. |
| `upload` | Regular expression matching all files referenced by this handler (needed with `static_files`). |
| `mime_type` | Optional. MIME type for all files served by the handler; otherwise derived from the file extension. |
| `expiration` | Optional. Cache duration for the handler's static files (units d, h, m, s); defaults to `default_expiration`. |
| `http_headers` | Optional. Response headers for static file/directory handlers (set headers for `script` handlers in app code). Used e.g. for CORS `Access-Control-Allow-Origin`. |
| `secure` | `optional` (default; HTTP and HTTPS both succeed), `never` (HTTPS redirected to HTTP; query parameters are removed), `always` (HTTP redirected to HTTPS; query parameters preserved). |
| `redirect_http_response_code` | Optional. With `secure`: `301`, `302`, `303` or `307`. Default `302`. |
| `login` | Requires the Users API (`user` in `app_engine_bundled_services` or `app_engine_apis: true`). `optional` (default), `required`, `admin`. Internal requests such as cron satisfy `admin` but not `required`. |
| `auth_fail_action` | Requires the Users API. `redirect` (default) or `unauthorized` (HTTP 401). |

### Scaling elements

If no scaling type is specified, automatic scaling is used.

| Element | Key | Default / range | Description |
|---|---|---|---|
| `automatic_scaling` | `max_instances` | 0 to 2147483647; 0 disables | Maximum instances. For new apps from March 2025 the default is 20 (existing apps unaffected); set `2147483647` to disable the default. With `vpc_access`, cannot exceed the project's Direct VPC instance quota (100 by default). |
| | `min_instances` | 0 to 1000 | Minimum instances kept running; 0 allows scale to zero. Billed whether or not they receive traffic. Requires warmup requests to be enabled and handled. Applies only to versions receiving traffic. |
| | `max_idle_instances` | 1 to 1000; default `automatic` | Maximum idle instances maintained. |
| | `min_idle_instances` | — | Extra instances kept running in addition to the calculated number (e.g. 5 calculated + 2 = 7). Billed. Requires warmup requests. |
| | `target_cpu_utilization` | 0.5 to 0.95; default 0.6 | CPU threshold at which new instances start. |
| | `target_throughput_utilization` | 0.5 to 0.95; default 0.6 | With `max_concurrent_requests`: a new instance starts at `max_concurrent_requests` x this value. |
| | `max_concurrent_requests` | Default 10, maximum 1000 | Concurrent requests per instance before a new one is spawned. Do not set below 10 unless single threading is needed. |
| | `max_pending_latency` | Default `automatic` (up to 10s) | Maximum time a request waits in the pending queue before new instances start. |
| | `min_pending_latency` | Free apps 500ms; paid apps 0 | Minimum time a request waits before a new instance starts. |
| `basic_scaling` | `max_instances` | Required | Maximum instances for the version. |
| | `idle_timeout` | Default `5m` | Instance shuts down this long after its last request. |
| `manual_scaling` | `instances` | — | Number of instances assigned at start. |

`basic_scaling` or `manual_scaling` is required for instance classes `B1` and higher (one of the two). `automatic_scaling` applies to classes `F1` and higher.

## Notes

- The example uses `runtime: python315`; per the support schedule that runtime is Preview. See [standard-support-schedule.md](./standard-support-schedule.md) for supported runtime IDs; runtimes past end of support cannot be re-deployed.
- `automatic_scaling.min_instances` / `min_idle_instances` need warmup requests (`inbound_services: - warmup`) to be enabled and handled by the app.
- The source also describes per-language `handlers` details and links to cache expiration, bundled services and VPC pages that are not reproduced here.
- Source inconsistency: this page sets the `max_instances` default to 20 for new apps from March 2025; https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run lists the App Engine standard maximum instances as "None".
- Source: https://docs.cloud.google.com/appengine/docs/standard/reference/app-yaml (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [flexible-app-yaml.md](./flexible-app-yaml.md)
- [standard-support-schedule.md](./standard-support-schedule.md)
- [standard-quotas.md](./standard-quotas.md)
- [an-overview-of-app-engine.md](./an-overview-of-app-engine.md)
