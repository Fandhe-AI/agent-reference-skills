---
source: https://developers.cloudflare.com/containers/concepts/architecture/
---

# Lifecycle of a Container

How a container is deployed, started, routed, and shut down.

## Signature / Usage

The lifecycle states a Worker observes through the Durable Object's `ctx.container`:

```
Stopped -> Starting (start() called) -> Running (not ready) -> Ready (accepting traffic) -> Stopping (stop requested) -> Stopped
```

```js
// Worker -> Durable Object binding -> ctx.container
const container = this.ctx.container;
container.running; // true before the process is ready to accept traffic
```

The first block above is an ASCII summary of the official lifecycle diagram; the second is not verbatim code from the page (the page has a diagram only). See durable-object-container.md for real snippets.

## Notes

### Deployment

- `durable_object` policy: Wrangler prepares named images; Durable Object code picks `image` and `instance` in `ctx.container.start()` and decides whether to restart on a new image. These instances do not take part in application-wide rollouts.
- `default` policy: Wrangler uploads or resolves the application image; Cloudflare distributes it and prepares capacity. Image or instance-type changes use a rollout (see rollouts.md).
- Worker code goes live on deploy before any application-wide container rollout finishes.

### Instance lifecycle and routing

- A container is only reachable through its Durable Object. An inactivity timeout, `signal()`, `destroy()`, a rollout, or a process exit stops the instance; failed startup or early exit returns it to stopped.
- `ctx.container.running` becomes `true` before the process is ready; check port readiness before sending the first request.
- Requests go client to Worker (usually nearest datacenter; Smart Placement may pick another) to Durable Object to container. Because all requests pass through a Worker, end users cannot send non-HTTP TCP or UDP to a container.
- Durable Objects and their containers are not guaranteed to run in the same location. Container placement is optimized for request routing and startup speed. You are billed only for running instances, not prepared images.
- A request that starts an instance goes to the nearest location with a pre-fetched image; later requests to that instance route there while it stays alive. After a stop and restart, the location may differ.
- Cold start: starting from fully stopped runs the image from its entrypoint; often 1 to 3 seconds, depending on image size and startup code.
- Runtime: each instance runs in a Firecracker microVM with its own kernel and network. Build images for `linux/amd64` within the size limits (see limits.md). Logging, metrics and networking are set up automatically.

### Shutdown

- Durable Object Container API: `setInactivityTimeout()`, `signal()`, `destroy()`. `Container` class: `sleepAfter` defaults to 10 minutes and `onActivityExpired()` calls `stop()`.
- When the platform stops an instance (also during rollouts) it sends `SIGTERM` to the main process, waits up to 15 minutes for exit, then sends `SIGKILL`. Handle `SIGTERM` in your image for cleanup.
- Events: `monitor()` (Durable Object Container API); `onStart`, `onStop`, `onActivityExpired`, `onError` (`Container` class).

### State

- All disk is ephemeral; a restarted instance gets a fresh disk from the image. `durable_object`-policy applications can use snapshots (see snapshots.md); FUSE mounts to R2 persist data but are slower than local SSD.

## Related

- [Overview](./overview.md)
- [Placement](./placement.md)
- [Rollouts](./rollouts.md)
- [Scheduling policy](./scheduling-policy.md)
- [Snapshots](./snapshots.md)
- [Durable Object Container API](./durable-object-container.md)
