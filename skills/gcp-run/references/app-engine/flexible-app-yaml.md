---
source: https://docs.cloud.google.com/appengine/docs/flexible/reference/app-yaml
---

# app.yaml reference (flexible environment)

`app.yaml` defines runtime configuration plus app, network and resource settings for an App Engine flexible environment service. Do not add `app.yaml` to `.gcloudignore`; deployment may fail. Syntax is YAML; URL and file path patterns use POSIX extended regular expressions (back-references such as `\1` and the Perl extensions `\w \W \s \S \d \D` are supported).

## Signature / Usage

### General settings

```yaml
runtime: python
```

`runtime: python` alone selects Python 2.7 or 3.7, both past end of support. Always combine it with `env: flex` (required) and `runtime_config.runtime_version` set to a GA version from [flexible-support-schedule.md](./flexible-support-schedule.md), for example `"3.14"`; the `"3.15"` shown below is Preview.

```yaml
runtime_config:
  operating_system: "ubuntu24"
  runtime_version: "3.15"
```

```yaml
env_variables:
  MY_VAR: "my value"
```

```yaml
skip_files:
- ^.*\.bak$
```

### Network settings

```yaml
network:
  name: NETWORK_NAME
  instance_ip_mode: INSTANCE_IP_MODE
  instance_tag: TAG_NAME
  subnetwork_name: SUBNETWORK_NAME
  session_affinity: true
  forwarded_ports:
    - PORT
    - HOST_PORT:CONTAINER_PORT
    - PORT/tcp
    - HOST_PORT:CONTAINER_PORT/udp
```

### Resource settings

```yaml
resources:
  cpu: 2
  memory_gb: 2.3
  disk_size_gb: 10
  volumes:
  - name: ramdisk1
    volume_type: tmpfs
    size_gb: 0.5
```

### Health checks

```yaml
liveness_check:
  path: "/liveness_check"
  check_interval_sec: 30
  timeout_sec: 4
  failure_threshold: 2
  success_threshold: 2

readiness_check:
  path: "/readiness_check"
  check_interval_sec: 5
  timeout_sec: 4
  failure_threshold: 2
  success_threshold: 2
  app_start_timeout_sec: 300
```

### Scaling

```yaml
automatic_scaling:
  min_num_instances: 1
  max_num_instances: 15
  cool_down_period_sec: 180
  cpu_utilization:
    target_utilization: 0.6
  target_concurrent_requests: 100
```

```yaml
manual_scaling:
  instances: 5
```

### Port forwarding (TCP 2222)

```yaml
network:
  forwarded_ports:
    - 2222/tcp
```

Then create a firewall rule (Console or `gcloud compute firewall-rules create`) allowing `tcp:2222`; the source's example allows any source (`0.0.0.0/0`), so restrict it (see Notes). For Python, set `entrypoint: gunicorn -b :$PORT -b :2222 main:app`.

## Options / Props

### General settings

| Name | Description |
|---|---|
| `runtime` | Required. `python` selects a full implementation of the Python 2.7 or 3.7 runtime; to use a supported Python version use `runtime_config`. These runtimes do not support App Engine APIs. |
| `runtime_config` | `operating_system`: Ubuntu version, required for Python 3.8 and later, not supported for 3.7 and earlier. `runtime_version`: optional for all versions. |
| `env: flex` | Required. Selects the flexible environment. |
| `entrypoint` | Command that starts a process responding to HTTP requests on the port in the `PORT` environment variable. |
| `service` | Required when creating a service; optional for default. Letters, numbers, hyphens. `VERSION-dot-SERVICE-dot-PROJECT_ID` at most 63 characters, no leading or trailing hyphen. Deploying with a new name creates a service and version. |
| `service_account` | Optional. User-managed service account (`SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`) used when accessing other Google Cloud services and executing tasks. |
| `skip_files` | Optional. Regular expression or list of regular expressions of files not uploaded. |
| `build_env_variables` | Optional. Build environment variables for buildpack runtimes. |
| `env_variables` | Optional. Variables made available to the app; variables prefixed with `GAE` are reserved. |

### Network options

| Option | Description |
|---|---|
| `name` | Compute Engine network short name (default `default`). Required if `subnetwork_name` is set. |
| `instance_ip_mode` | Optional. `internal` removes ephemeral external IPs (enable Private Google Access; has limitations); default `external`. |
| `instance_tag` | Optional. Tag assigned to each instance; default `aef-INSTANCE_ID` (plus `aef-instance` with Shared VPC). |
| `subnetwork_name` | Optional. Custom subnetwork short name in the same region as the app; network `name` must be set. |
| `session_affinity` | Optional. `true` routes sequential requests from a user to the same instance (cookie based). Default disabled. |
| `forwarded_ports` | Optional. `HOST_PORT` 1024-65535 excluding 22, 8080, 8090, 8443, 10000, 10001, 10400-10500, 11211, 24231. `CONTAINER_PORT` 1-65535 excluding 22, 10001, 10400-10500, 11211. A single `PORT` means same host and container port. TCP and UDP both forwarded by default. Traffic must target the instance IP directly, not appspot.com or a custom domain. A firewall rule is required. |

### Resource options

| Option | Description | Default |
|---|---|---|
| `cpu` | Cores: one, an even number from 2 to 32, or a multiple of 4 from 32 to 80. | 1 core |
| `memory_gb` | RAM in GB, excluding about 0.4 GB overhead. Each core needs 1.0 to 6.5 GB total: `memory_gb = cpu * [1.0 - 6.5] - 0.4`. Available memory is in `GAE_MEMORY_MB`. | 0.6 GB |
| `disk_size_gb` | Minimum 10 GB, maximum 10240 GB. | 13 GB |
| `name` | Required with volumes. Unique, 1-63 chars, lowercase letters, digits or dashes; first char a letter, last not a dash. Mounted at `/mnt/NAME`. | — |
| `volume_type` | Required with volumes. Must be `tmpfs`. Up to eight tmpfs volumes. | — |
| `size_gb` | Required with volumes. Minimum 0.001 GB; maximum is the memory available. RAM for tmpfs is subtracted from container memory. | — |

### Liveness check fields

| Field | Default | Range | Description |
|---|---|---|---|
| `path` | None | — | URL path to forward liveness checks to the app container. |
| `timeout_sec` | 4 | 1-300 | Request timeout. |
| `check_interval_sec` | 30 | 1-300 | Interval between checks; must be greater than `timeout_sec`. |
| `failure_threshold` | 4 | 1-10 | Consecutive failures before unhealthy (instance restarted). |
| `success_threshold` | 2 | 1-10 | Consecutive successes to become healthy again. |
| `initial_delay_sec` | 300 | 0-3600 | Delay after the instance reaches RUNNING during which responses are ignored. |

### Readiness check fields

| Field | Default | Range | Description |
|---|---|---|---|
| `path` | None | — | URL path to forward readiness checks to the app container. |
| `timeout_sec` | 4 | 1-300 | Request timeout. |
| `check_interval_sec` | 5 | 1-300 | Interval between checks; must be greater than `timeout_sec`. |
| `failure_threshold` | 2 | 1-10 | Consecutive failures before the instance stops receiving requests. |
| `success_threshold` | 2 | 1-10 | Consecutive successes to become ready. |
| `app_start_timeout_sec` | 300 | 1-1800 | Maximum time for enough instances in a new deployment to pass health checks; otherwise the deployment fails and is rolled back. |

### Scaling settings

Automatic scaling is the default.

| Name | Default | Description |
|---|---|---|
| `min_num_instances` | 2 | Must be 1 or greater. Instance count may briefly drop below this. |
| `max_num_instances` | 20 | Limited by project resource quota. |
| `cool_down_period_sec` | 120 | Must be at least 60. Wait before collecting data from a new instance. |
| `cpu_utilization.target_utilization` | 0.5 | Target CPU averaged across instances. Instances are downscaled 25 seconds after the shutdown signal regardless of in-flight requests. |
| `target_concurrent_requests` | — | (Beta) Target concurrent connections per instance. Nginx limit: 4,096 worker connections per instance. |
| `manual_scaling.instances` | — | Number of instances; `manual_scaling` required to enable manual scaling. |

## Notes

- Legacy health checks using `/_ah/health` are deprecated; use split health checks (enabled by default). Health checks are not forwarded to the app unless `path` is set; a custom check succeeds on `200 OK`. Redundant health checkers can make polling appear more frequent than configured.
- `runtime: python` selects Python 2.7 or 3.7, both past end of support per [flexible-support-schedule.md](./flexible-support-schedule.md); use `runtime_config` with a supported version (the source's own example uses `runtime_version: "3.15"`, which is Preview in the schedule). Runtimes past end of support cannot be re-deployed.
- Port forwarding is "intended to help with situations where you might need to attach a debugger or profiler" (source). A firewall rule with source `0.0.0.0/0` exposes that forwarded debugger port of every instance to the internet; restrict `--source-ranges` to your own IP or range and target the rule with `--target-tags` set to the version's `instance_tag`.
- Source also covers advanced network setup (custom subnet + VPN) and firewall rules for port forwarding; not reproduced here.
- Source: https://docs.cloud.google.com/appengine/docs/flexible/reference/app-yaml (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-app-yaml.md](./standard-app-yaml.md)
- [flexible-support-schedule.md](./flexible-support-schedule.md)
- [the-appengine-environments.md](./the-appengine-environments.md)
