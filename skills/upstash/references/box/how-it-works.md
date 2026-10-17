# Box Basics (How It Works)

Every Upstash Box is a durable execution environment for AI workloads: an isolated container with its own filesystem, shell, network stack, and optional coding agent. Billed per active CPU time; state persists across runs.

## Signature / Usage

```typescript
const box = await Box.create({ runtime: "node" })
const boxes = await Box.list()

// later, or in another serverless function
const sameBox = await Box.get(box.id)

const named = await Box.create({ runtime: "node", name: "my-worker" })
const byName = await Box.getByName("my-worker")

const { status } = await box.getStatus()
const logs = await box.logs()
const runs = await box.listRuns()

await box.pause()
await box.resume()

const snapshot = await box.snapshot({ name: "after-setup" })
const restored = await Box.fromSnapshot(snapshot.id)

await box.delete()
```

```python
box = Box.create(runtime="node")
same_box = Box.get(box.id)
same_box = Box.get_by_name("my-worker")
box.pause()
box.resume()
snapshot = box.snapshot(name="after-setup")
restored = Box.from_snapshot(snapshot.id)
box.delete()
```

```bash
ssh <box-id>@us-east-1.box.upstash.com   # password = Box API key
```

## Options / Props

Modules per box: Agent (Claude Code or Codex), Git, Shell, Filesystem, Snapshots.

| Runtime | Default (Debian) | Alpine variant |
|---------|------------------|----------------|
| Node.js | `node` | `node-alpine` |
| Python | `python` | `python-alpine` |
| Go | `golang` | `golang-alpine` |
| Ruby | `ruby` | `ruby-alpine` |
| Rust | `rust` | `rust-alpine` |

| Size (`size`, default `"small"`) | CPU | Memory | Storage |
|------|-----|--------|---------|
| `small` | 2 vCPU | 4 GB | 5 GB |
| `medium` | 4 vCPU | 8 GB | 10 GB |
| `large` | 8 vCPU | 16 GB | 20 GB |

| Lifecycle state | Behavior |
|-----------------|----------|
| Created | Isolated container provisioned (fresh or from snapshot); init command runs once after container start, on create, on resume, and after snapshot restore |
| Running | stdout/stderr stream in real time; idle box auto-pauses after an idle timeout (free plans sooner than paid); `keepAlive` keeps it on |
| Paused | Compute released, filesystem and environment preserved; resume explicitly or send new work |
| Snapshot | Full workspace state at a point in time; new boxes can be created from it |
| Deleted | Permanently destroys the live box; existing snapshots are not affected |

## Notes

- `Box.fromSnapshot("snap_abc123", { size: "medium" })` also accepts `size`
- Pause/resume is not available when `keepAlive` is enabled
- Full outbound network access by default (HTTP, HTTPS, DNS, WebSockets, raw TCP); 22.5 Gbps bandwidth per host on AWS. Restrict with a network policy
- Each box is its own Docker container with independent filesystem, process tree, and network stack; boxes cannot reach or observe each other
- Billing is on active usage by default; `keepAlive` switches to always-on billing. Pricing: https://upstash.com/pricing/box
- Deletion is irreversible; snapshot first if you may need the environment again
- Source: https://upstash.com/docs/box/overall/how-it-works (fetched 2026-10-17; no version pin on the site).

## Related

- [Quickstart](./quickstart.md)
- [Keep Alive](./keep-alive.md)
- [Shell](./shell.md)
- [Snapshots](./snapshots.md)
- [Network Policy](./network-policy.md)
- [Agent](./agent.md)
