---
source: https://developers.cloudflare.com/sandbox/concepts/lifetime/
---

# Sandbox lifetime

A Linux sandbox is a Durable Object that starts and stops a container. The Durable Object keeps its storage; the container instance (processes and disk) lasts only until something stops it.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/sandbox/reference/ (restore the timeout when a restarted Durable Object finds the container running):

```ts
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

// Inside the Durable Object constructor:
if (container.running) {
	void ctx.blockConcurrencyWhile(() =>
		container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
	);
}
```

## Notes

- The same name always reaches the same Durable Object (`getByName()`); `this.ctx.container.start()` starts a new instance (a Linux VM with its own processes and disk).
- Activity keeps an instance running: the Durable Object is active while it handles a request, runs an alarm, streams a response, or holds an accepted WebSocket. After it goes inactive, the instance keeps running for `setInactivityTimeout()` (up to 6 hours); without one, it stops shortly after. Code running inside the instance does not count as activity; use a Durable Object alarm that checks the work more often than the timeout.
- An idle running instance is billed for memory and disk. See Containers pricing in pricing.md (https://developers.cloudflare.com/containers/platform/pricing/).
- The timeout does not survive a Durable Object restart; set it again in the constructor when the instance is already running.
- An instance stops when: the inactivity timeout ends, `destroy()` is called, the main process exits (entrypoint passed to `start()` or the image default; `cloudflare/debian-trixie` exits right away, so use `sleep infinity`), or a platform event occurs (no guaranteed run time). At timeout, processes get `SIGTERM` and the instance stops shortly after; do not rely on a handler to finish work.
- Cloudflare does not wake the Durable Object when its instance stops. A pending `monitor()` call keeps the Durable Object in memory for up to 15 minutes; on compatibility dates before `2026-10-01` it does not, unless the `durable_object_io_tasks_prevent_eviction` flag is set.
- Deploys keep instances running. A running instance keeps its image, entrypoint, and environment variables; `start()` throws while one runs. To move to a new image, stop the instance (for example `destroy()`) and start a new one. Work in flight during a deploy can keep running on the previous version; make clients such as a browser terminal reconnect. Container rollouts do not replace sandboxes (they apply to the default scheduling policy only).
- Snapshots (public beta; the API and behavior may change): `snapshotContainer()` saves the writable root filesystem only (not mounts, memory, processes, or `/run`). The new instance runs its entrypoint; process IDs are reused. Your application decides when to snapshot and stores the snapshot (for example in Durable Object storage). A snapshot expires 30 days after creation or last restore.
- Mounted R2 buckets outlive every instance, are not included in snapshots, and must be mounted again by each new instance.
- Containers platform API details are in the `containers` category of this skill. The Durable Objects API belongs to the cloudflare-stateful skill.

## Related

- [Sandbox security](./sandbox-security.md)
- [Run background processes](./run-background-processes.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Save a sandbox automatically](./save-a-sandbox-automatically.md)
- [Mount an R2 bucket](./mount-an-r2-bucket.md)
- [Run code when a sandbox stops](./run-code-when-a-sandbox-stops.md)
