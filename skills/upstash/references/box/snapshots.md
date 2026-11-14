# Snapshots

Snapshots capture and duplicate box state — filesystem and agent configuration — as a point-in-time checkpoint you can restore later, independent of the source box.

## Signature / Usage

```typescript
const snapshot = await box.snapshot({ name: "after-setup" })
// { id: "snap_x7f...", name: "after-setup", boxId: "box_abc123", sizeBytes, createdAt }

const snapshots = await box.listSnapshots()
await box.deleteSnapshot(snapshot.id)

const restored = await Box.fromSnapshot(snapshot.id)
const named = await Box.fromSnapshot(snapshot.id, { name: "restored-worker" })
```

```python
snapshot = box.snapshot(name="after-setup")

snapshots = box.list_snapshots()
box.delete_snapshot(snapshot.id)

restored = Box.from_snapshot(snapshot.id)
named = Box.from_snapshot(snapshot.id, name="restored-worker")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `snapshot({ name })` | `string` | Creates a snapshot on a running or paused box; returns a `Snapshot` with an `id` |
| `listSnapshots()` | — | Lists all snapshots belonging to a box |
| `deleteSnapshot(id)` | `string` | Removes a snapshot by ID |
| `Box.fromSnapshot(id, options?)` | — | Provisions a new box with the exact state from the snapshot; accepts creation options like `name` |

## Notes

- Source: https://upstash.com/docs/box/overall/snapshots (fetched 2026-11-14; no version pin on the site).
- A snapshot captures the filesystem (including cloned repos and installed packages) and box configuration (agent model, runtime, browser setting; the agent harness is taken from the source box)
- A restored box does **not** inherit: the agent API key (a key passed directly as `apiKey` is not stored; the restored box uses the key saved on your account for that provider, or pass `agent` again with `apiKey`), `networkPolicy`, `attachHeaders` (pass again on restore), lifecycle settings (init command, keep-alive, size use the values passed on restore), or active schedules
- Snapshots are independent of the source box — deleting the original box does not delete its snapshots
- Best for preserving cloned repos, installed dependencies, and prepared workspaces; restoring is usually faster than re-cloning/re-installing
- Common patterns: checkpoint before risky agent operations and roll back on failure; build a reusable base environment once and spawn many boxes from it; fan out multiple specialized agents from the same cloned-repo snapshot

## Related

- [Quickstart](./quickstart.md)
- [Git](./git.md)
- [Guides: Scrape Dynamic Websites with Playwright](./guides-web-scraping-playwright.md)
