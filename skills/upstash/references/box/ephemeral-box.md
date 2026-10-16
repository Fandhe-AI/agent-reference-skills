# EphemeralBox

`EphemeralBox` is a lightweight, short-lived sandbox that provides only exec and file operations, for disposable compute tasks where a full Box is unnecessary.

## Signature / Usage

```typescript
import { EphemeralBox } from "@upstash/box"

const box = await EphemeralBox.create({
  runtime: "node",  // "node" | "python" | "golang" | "ruby" | "rust"
  ttl: 3600,        // seconds, max 259200 (3 days), default 259200
  name: "my-ephemeral-worker",          // optional
  networkPolicy: { mode: "allow-all" }, // optional
})

const run = await box.exec.command("echo hello")
console.log(run.result) // "hello"

await box.files.write({ path: "data.json", content: '{"key":"value"}' })
const content = await box.files.read("data.json")

await box.delete() // otherwise auto-deletes at expiresAt
```

```python
from upstash_box import EphemeralBox

box = EphemeralBox.create(
    runtime="node",
    ttl=3600,
    name="my-ephemeral-worker",
    network_policy={"mode": "allow-all"},
)
```

## Options / Props

`EphemeralBoxConfig`: `apiKey`, `runtime`, `ttl`, `name`, `networkPolicy`, `baseUrl`, `timeout`, `debug` (no agent, git, env, skills, mcpServers).

| Feature | Box | EphemeralBox |
|---------|-----|--------------|
| `exec.command()` / `exec.code()` / `exec.stream()` / `exec.streamCode()` / `exec.session()` | Yes | Yes |
| `files.read/write/list/upload/download` and `files.stat/mkdir/rename/remove` | Yes | Yes |
| `schedule.exec/prompt/list/get/pause/resume/delete` | Yes | Yes |
| `cd()` / `cwd`, `getStatus()`, `delete()` | Yes | Yes |
| `networkPolicy` / `updateNetworkPolicy()` | Yes | Yes |
| `snapshot()` / `fromSnapshot()` | Yes | Yes |
| `expiresAt` | No | Yes |
| `agent.run()` / `agent.stream()` | Yes | No |
| `git.*` | Yes | No |
| `getPublicURL()` / `listPublicURLs()` / `deletePublicURL()` | Yes | No |
| `pause()` / `resume()` | Yes | No |
| `configureModel()` | Yes | No |
| `logs()` / `listRuns()` | Yes | No |

Properties: `id` (e.g. `"sweet-shark-26021"`), `expiresAt` (Unix timestamp in seconds when the box auto-deletes).

Exported types: `EphemeralBox`, `EphemeralBoxConfig`, `EphemeralBoxData` (extends `BoxData` with `ephemeral: boolean` and `expires_at: number`).

## Notes

- Differs from `Box.create()`: ready immediately (no polling; API returns `status: "idle"`); the request sends `{ ephemeral: true, ttl?, runtime? }` to `POST /v2/box`
- Auto-deleted after TTL
- Composition over inheritance: wraps an internal `Box` and exposes only the subset, so agent/git are not accessible even at runtime

## Related

- [How It Works](./how-it-works.md)
- [Shell](./shell.md)
- [Filesystem](./filesystem.md)
- [Schedules](./schedules.md)
