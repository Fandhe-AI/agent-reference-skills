---
source: https://developers.cloudflare.com/containers/guides/snapshots/
---

# Use snapshots

Save and restore a running container's filesystem with `snapshotContainer()` and the `containerSnapshot` start option. Supported only for `durable_object` scheduling policy applications.

## Signature / Usage

Adapted (not in the official docs): the two official examples (save, restore) are combined into one class, and `restoreContainer()` returns early when the container is already running because `start()` throws in that case; see Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async saveContainer() {
		const containerSnapshot = await this.ctx.container.snapshotContainer({
			name: "before-upgrade",
		});

		await this.ctx.storage.put("containerSnapshot", containerSnapshot);
	}

	async restoreContainer() {
		const containerSnapshot = await this.ctx.storage.get("containerSnapshot");

		if (!containerSnapshot || this.ctx.container.running) {
			return;
		}

		this.ctx.container.start({ containerSnapshot, enableInternet: false });
	}
}
```

## Notes

- Adapted from the official docs: `restoreContainer()` skips the restore when the container is already running; `start()` throws `Error` in that case (see durable-object-container.md), and restoring would not replace a live filesystem anyway.
- Snapshots capture the writable filesystem but not memory or running processes; a restored container runs its entrypoint again. They are immutable: after restoring and changing files, create a new snapshot.
- A snapshot is tied to the image version it came from and is not portable to another image; after updating the image, snapshot a container running the new image.
- The returned handle is a plain data object: store it (for example in Durable Object storage) and restore it later, including from another Durable Object. The Worker API has no list method.
- Retention: implicit 30-day time-to-live, refreshed by each restore; no custom TTL yet. Maximum snapshot size 20 GB (see limits.md). `image` and `containerSnapshot` cannot be passed together.
- `default`-policy applications cannot create or restore snapshots.
- Container snapshots are in public beta.
- Managing snapshots: snapshots are not listed in the Cloudflare dashboard. The Container binding supports creating and restoring snapshots, but provides no methods to list or delete them; they expire per the retention rules above. Snapshots do not support jurisdiction selection.
- Source: https://developers.cloudflare.com/containers/guides/snapshots/ (cloudflare-docs production `34d908a`, fetched 2026-11-14).

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Scheduling policy](./scheduling-policy.md)
- [Limits](./limits.md)
