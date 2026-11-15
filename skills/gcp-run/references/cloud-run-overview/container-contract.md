---
source: https://docs.cloud.google.com/run/docs/container-contract
---

# Container runtime contract

Requirements and behaviors of containers on Cloud Run services, jobs, and worker pools: image format, port, environment variables, file system, lifecycle and signals, resources, security restrictions, execution environments, metadata server, and timeouts.

## Signature / Usage

The ingress container must listen on `0.0.0.0` (not `127.0.0.1`) on the port requests are sent to. The default is `8080`; Cloud Run injects `PORT` into the ingress container. Read `PORT` and trap `SIGTERM` for graceful shutdown.

Workaround for `setuid` binaries such as `gcsfuse` (run as root, then drop privileges; remove the Dockerfile `USER` instruction):

```bash
gcsfuse ...                 # Run gcsfuse as root
su myuser -c "/yourapp.sh"  # Switch to 'myuser' and run 'yourapp.sh'
```

Metadata server (no client library needed): HTTP to `http://metadata.google.internal/` with header `Metadata-Flavor: Google`.

## Options / Props

### Image requirements

- Linux 64-bit (x86_64 ABI) executables only. Formats: Docker Image Manifest V2 Schema 1 and 2, OCI; Zstd compressed images accepted. A multi-architecture manifest list must include `linux/amd64`.
- File names must be UTF-8 compatible or deployment fails (no restriction on content encoding).
- TLS is terminated by Cloud Run; the container receives HTTP/1 or gRPC without TLS. With end-to-end HTTP/2 the container must handle h2c (HTTP/2 cleartext).
- Services must respond within the request timeout (including container startup) or the request ends with `504`. A response with `Set-Cookie` gets `Cache-Control: private`.
- Service header names: printable non-whitespace ASCII without colons; values: visible ASCII plus space and horizontal tab (RFC 7230).

### Direct VPC support per resource

| Resource | Direct VPC |
|---|---|
| Services | Egress only |
| Jobs | Egress only |
| Worker pools | Egress and ingress |
| Instances | Egress and ingress |

IPs are not static (new IP on each start, stop, or update of an instance). With ingress, only resources in the VPC can reach the private IP; TCP services must listen on the Dockerfile-exposed port or `PORT`.

### Environment variables

| Resource | Name | Description | Example |
|---|---|---|---|
| Service | `PORT` | Port the HTTP server should listen on (ingress container only) | `8080` |
| Service | `K_SERVICE` | Service name | `hello-world` |
| Service | `K_REVISION` | Revision name | `hello-world.1` |
| Service | `K_CONFIGURATION` | Configuration that created the revision | `hello-world` |
| Job | `CLOUD_RUN_JOB` | Job name | `hello-world` |
| Job | `CLOUD_RUN_EXECUTION` | Execution name | `hello-world-abc` |
| Job | `CLOUD_RUN_TASK_INDEX` | Task index, starts at 0; with `--parallelism` > 1 order is not guaranteed | `0` |
| Job | `CLOUD_RUN_TASK_ATTEMPT` | Retry count, starts at 0 | `0` |
| Job | `CLOUD_RUN_TASK_COUNT` | Number of tasks from `--tasks` | `1` |
| Worker pool | `CLOUD_RUN_WORKER_POOL` | Worker pool name | `hello-world` |
| Worker pool | `CLOUD_RUN_REVISION` | Worker pool revision name | `hello-world.1` |

`K_*` and `PORT` (except `PORT` for non-ingress containers) are added to all running containers.

### Jobs

The container must exit with code 0 on success and non-zero on failure, and must not listen on a port or start a web server. Runs until exit, task timeout, or crash.

| Exit code | Signal | Description |
|---|---|---|
| 0 |  | Task completed successfully |
| 4 | `SIGILL` | Task attempted to access memory at an incorrect address |
| 7 | `SIGBUS` | Task attempted to access memory outside its allocated boundaries |
| 9 | `SIGKILL` | Task forcibly terminated by user action or manual intervention |
| 11 | `SIGSEGV` | Task tried to access unauthorized memory |
| 15 | `SIGTERM` | Task exceeded timeout or was canceled; if it does not exit within a few seconds Cloud Run sends `SIGKILL` |

On task timeout: `SIGTERM`, then `SIGKILL` after 10 seconds; CPU is allocated and billed during that period. Exceeding memory terminates the instance (`HTTP 500` for in-flight requests).

### Lifecycle (services)

- Autoscaled by default; manual scaling optional. One ingress container plus optional sidecars per instance. Revisions with no traffic scale to minimum instances (default zero).
- Startup: instances must listen within 4 minutes and all containers must be healthy; CPU is allocated during startup (startup CPU boost optional). Requests are sent once the ingress container listens. A request waiting for an instance pends up to 3.5 times the average startup time of this service's instances, or 10 seconds, whichever is greater. Configure a startup probe; sidecar start order is configurable.
- Processing: CPU is always allocated to all containers (including sidecars) while at least one request is processed. Idle CPU depends on billing settings; an idle instance is not kept longer than 15 minutes unless minimum instances require it.
- Shutdown: idle instances (including min-instance warm ones) can shut down any time. In rare cases `SIGTERM` is sent while requests are in flight. `SIGTERM` goes to all containers, then `SIGKILL` after 10 seconds; CPU is allocated and billed meanwhile. First generation: instance that does not trap `SIGTERM` shuts down immediately. Second generation: install a `SIGTERM` handler (recommended).
- Exceeding the total container memory limit terminates the instance; in-flight requests end with `HTTP 500`.

### Lifecycle (worker pools)

- No autoscaling; instance count defaults to `1` (`0` = disabled, the worker won't start even if deployment succeeds). Default 1 CPU. Startup probe optional; without health checks containers start in order even if dependencies failed.
- Never idle: CPU always allocated and billed while running. No scale-down on idle. Shutdown: `SIGTERM`, then `SIGKILL` after 10 seconds; CPU billed; install a `SIGTERM` handler.

### Instance resources

| Resource | Default / rule |
|---|---|
| CPU | 1 vCPU default per container, configurable per container; approx. one hyper-thread; all platforms support AVX2. Request-based billing: CPU only during requests; instance-based: whole lifetime; with minimum instances configured, the source says you must use instance-based billing so that CPU is allocated outside of requests |
| Memory | 512 MiB default per container, configurable per container. Includes loaded code, file system writes, extra processes (nginx), in-memory caches, per-request usage, shared in-memory volumes |
| GPU | One container per instance can access the GPU (with sidecars). NVIDIA RTX PRO 6000 Blackwell and L4 driver libraries are mounted under `/usr/local/nvidia/lib64` and appended to `LD_LIBRARY_PATH`; for CUDA above 13.0 use a newer NVIDIA base image with forward compatibility packages |
| Concurrency | Services default to multiple concurrent requests per instance; configurable |

### File system and limits

- Writable in-memory file system: uses instance memory, does not persist, no size limit; can crash the instance by exhausting memory. Use a dedicated in-memory volume with a size limit to avoid this.
- Outbound idle timeouts: 10 minutes to VPC, 20 minutes to the internet. Long-lived outbound connections can be reset when infrastructure restarts; re-establish dead connections.
- File descriptor hard limit: 25000 per process (first and second generation). Second generation otherwise uses standard Linux limits (`file-max` about 10% of memory, `max_map_count` 65535).

### Security restrictions

- No root capabilities of the security boundary; privilege escalation disabled; no `sudo` or `setuid`; no write access to most of `/dev`, `/proc`, `/sys`; no `--privileged` equivalent.
- User, network, PID namespaces; basic seccomp-like profiles; eBPF and kernel-level features disabled; no system time changes (`adjtimex`, `adjtime`).
- Mounting from inside containers (NFS, Filestore, SMB/CIFS, syscalls) is unsupported; use configuration volume mounts; no nested mounts. Privileged containers and `setuid` binaries for non-root users (for example `gcsfuse`, `sudo`) are unsupported.
- If the Dockerfile user does not exist, the container runs as root (`uid=0`).
- First generation execution environment is sandboxed with gVisor (some syscalls unsupported). Second generation has full Linux compatibility; jobs always use second generation; `/sys/class/dmi/id/product_name` is `Google Compute Engine`; the service runs as container init process there.
- Containers of one instance reach each other by container name (entries added to `/etc/hosts` mapping to `127.0.0.1`).

### Metadata server paths

| Path | Description |
|---|---|
| `/computeMetadata/v1/project/project-id` | Project ID |
| `/computeMetadata/v1/project/numeric-project-id` | Project number |
| `/computeMetadata/v1/instance/region` | `projects/PROJECT-NUMBER/regions/REGION` |
| `/computeMetadata/v1/instance/id` | Unique instance ID (also in logs) |
| `/computeMetadata/v1/instance/service-accounts/default/email` | Service identity email |
| `/computeMetadata/v1/instance/service-accounts/default/token` | OAuth2 access token (JSON with `access_token`) for the resource's service account |
| `/computeMetadata/v1/instance/network-interfaces/0/ip` | IPv4 of a worker pool instance on the VPC network |
| `/computeMetadata/v1/instance/network-interfaces/0/ipv6` | IPv6 of a worker pool instance (dual-stack subnet required) |

`/computeMetadata/v1/instance/zone` always returns `projects/PROJECT-NUMBER/zones/REGION-1` (zone is not disclosed).

## Notes

- Bind to `0.0.0.0:$PORT`, never `127.0.0.1`; jobs must not listen on a port.
- The gcsfuse workaround runs the binary as root; use it only when a `setuid` binary is unavoidable (the source's Docker advice is to prefer non-root users).
- Distance: Cloud Run is Google Cloud's serverless container platform, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`); HTTP frameworks (`hono`, `fastify`) only run inside the container. Dockerfile authoring in general is in the `docker` skill.
- The source also links Cloud Run runtime base images and the Runtime support schedule for functions.
- Source inconsistency: this page says a first-generation instance that does not trap `SIGTERM` shuts down immediately; the execution environments page (https://docs.cloud.google.com/run/docs/configuring/execution-environments) says a container that does not catch `SIGTERM` still gets 10 seconds, which are billed.
- Source inconsistency: this page says that with minimum instances "you must use instance-based billing so that CPU is allocated outside of requests"; the minimum instances page bills idle minimum instances "at a lower rate" under request-based billing (https://docs.cloud.google.com/run/docs/configuring/min-instances).
- Source inconsistency: this page says "Worker pools don't automatically scale" (scale manually; the overview page points to the separate CREMA autoscaler, https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run); the resource model page lists "built-in autoscaling based on CPU utilization or Pub/Sub message backlog" for worker pools (https://docs.cloud.google.com/run/docs/resource-model).
- Source inconsistency: this page sets a file descriptor limit of 25000 per process and says second-generation `/proc/sys/fs/file-max` uses the default of about 10% of memory; the quotas page lists "Files opened" (`/proc/sys/fs/file-max`) as 25000 per container instance (https://docs.cloud.google.com/run/quotas).
- Source: https://docs.cloud.google.com/run/docs/container-contract (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-model.md](./resource-model.md)
- [about-concurrency.md](./about-concurrency.md)
- [about-instance-autoscaling.md](./about-instance-autoscaling.md)
- [quotas.md](./quotas.md)
