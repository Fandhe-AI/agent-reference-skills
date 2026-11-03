---
source: https://developers.cloudflare.com/containers/faq/
---

# Containers FAQ

Answers on logs, locations, scaling, cold starts, disk, memory, runtime, secrets, Docker-in-Docker and egress.

## Signature / Usage

Enable container logs (Worker level applies to containers by default; a container entry overrides it):

```jsonc
{
	"containers": [
		{
			"class_name": "MyContainer",
			"image": "./Dockerfile",
			"observability": {
				"enabled": true
			}
		}
	]
}
```

## Notes

- Logs: turn on observability for dashboard logs and live tailing. Subject to Workers Logs limits, retained seven days, exportable via Logpush. Beginning December 1, 2026, Container logs use Cloudflare Observability pricing.
- Locations: Cloudflare readies instances across several regions at first deploy; `ctx.container.start` picks the nearest free pre-initialized instance, which is likely but not guaranteed to be in the request's region. A running instance keeps receiving later requests at its location; after it sleeps, the next start picks again (see architecture.md).
- Updates: Worker goes live first, instances update with a gradual rollout by default (see rollouts.md, deploy.md). Workers Builds: production branch should run `wrangler deploy`; non-production defaults to `wrangler versions upload`, which does not update images, and preview URLs are not generated for Containers Workers.
- Scaling: create or address specific instances; use `getRandom` for a fixed number of interchangeable instances. Built-in autoscaling for stateless applications is not available today (planned).
- Cold start: starting from a fully stopped state (for example a novel ID) runs the entrypoint; often 1 to 3 seconds, depending on image size and startup code.
- Disk is ephemeral: a sleeping instance restarts with a fresh disk from the image. Use snapshots (`durable_object` policy) for point-in-time state or FUSE to persist to R2 or other object storage (not SSD-speed).
- Out of memory throws an OOM error and restarts the instance; no swap.
- No fixed maximum runtime, but platform events (such as irregular host restarts) can stop a container and no run period is guaranteed. Stop sequence: `SIGTERM`, wait up to 15 minutes, then `SIGKILL`; handle `SIGTERM` for cleanup. After a host stop a new instance may start on another server.
- Secrets: use Worker Secrets or Secrets Store; keep secrets out of images and source-controlled config. For exposing credentials to untrusted container code, prefer injecting them in an outbound handler (see outbound-traffic.md).
- Docker-in-Docker is supported with `docker:dind`, started with iptables and IP forwarding off; works with both scheduling policies. Under `durable_object` the daemon exits on startup unless `--ip-forward=false` is passed. Run dockerd as root (rootless does not start). Containers do not support iptables manipulation; use `--network=host` with `docker run` (and `docker build` steps that use the network), which gives inner containers access to the outer container's network stack, so understand the security implications first.

```dockerfile
FROM docker:dind

# Start dockerd with iptables and IP forwarding turned off, then run your app
ENTRYPOINT ["sh", "-c", "dockerd-entrypoint.sh dockerd --iptables=false --ip6tables=false --ip-forward=false & exec /path/to/your-app"]
```

```sh
#!/bin/sh
set -eu

# Wait for dockerd to be ready
until docker version >/dev/null 2>&1; do
  sleep 0.2
done

exec /path/to/your-app
```

- The Dockerfile and entrypoint script above run inside the container image, never on the host. Official working example: https://github.com/th0m/containers-dind (uses the `default` policy; add `--ip-forward=false` for `durable_object`).
- Egress control: see outbound-traffic.md.

## Related

- [Architecture and lifecycle](./architecture.md)
- [Rollouts](./rollouts.md)
- [Snapshots](./snapshots.md)
- [Outbound traffic](./outbound-traffic.md)
