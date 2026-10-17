# Guide: Run TanStack AI Coding Agents in a Cloud Sandbox

Run TanStack AI coding agents (Claude Code, Codex, Grok Build, OpenCode, or any ACP agent) inside Upstash Box with the native `@tanstack/ai-sandbox-upstash-box` provider. A coding agent driven by `chat()` runs in a Box with a real filesystem, shell, background processes, preview URLs, and snapshots. A sandboxed run has three independent parts: Provider (where the agent runs: Upstash Box), Workspace (what the agent sees: repo, package manager, setup commands, secrets), Harness (which agent runs). Only the provider changes when moving from a local container to Upstash Box.

## Signature / Usage

```bash
npm install @tanstack/ai @tanstack/ai-sandbox @tanstack/ai-sandbox-upstash-box @tanstack/ai-claude-code
```

```bash
# .env
UPSTASH_BOX_API_KEY=box_xxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
```

Define the sandbox (`defineSandbox()` binds a provider, a workspace, and a lifecycle):

```typescript
// sandbox.ts
import {
  createSecrets,
  defineSandbox,
  defineWorkspace,
} from "@tanstack/ai-sandbox";
import { upstashBoxSandbox } from "@tanstack/ai-sandbox-upstash-box";

const REPO = "https://github.com/owner/buggy-app.git";

export const repoSandbox = defineSandbox({
  id: "bug-fixer",
  provider: upstashBoxSandbox({
    apiKey: process.env.UPSTASH_BOX_API_KEY,
    runtime: "node",
    size: "small",
  }),
  workspace: defineWorkspace({
    source: { type: "none" },
    packageManager: "pnpm",
    setup: [
      `git clone --depth 1 --single-branch ${REPO} /tmp/repo && cp -a /tmp/repo/. /workspace/home/ && rm -rf /tmp/repo`,
      "pnpm install",
    ],
    secrets: createSecrets({
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ?? "",
    }),
  }),
  lifecycle: { reuse: "thread", snapshot: "after-setup", keepAlive: "30m" },
});
```

Run the agent (`withSandbox()` is `chat()` middleware: resumes or creates the box, bootstraps the workspace, runs the harness inside it, tears down per lifecycle):

```typescript
// run.ts
import { chat } from "@tanstack/ai";
import { claudeCodeText } from "@tanstack/ai-claude-code";
import { withSandbox } from "@tanstack/ai-sandbox";
import { repoSandbox } from "./sandbox";

const stream = chat({
  threadId: "thread_123",
  adapter: claudeCodeText("claude-opus-4-8"),
  messages: [{ role: "user", content: "Fix the failing test in utils.test.ts" }],
  middleware: [withSandbox(repoSandbox)],
});

for await (const chunk of stream) {
  if (chunk.type === "TEXT_MESSAGE_CONTENT") {
    process.stdout.write(chunk.delta);
  }
}
```

Preview the app the agent builds, and use the box without a harness:

```typescript
import { upstashBoxSandbox } from "@tanstack/ai-sandbox-upstash-box";

const handle = await upstashBoxSandbox({
  runtime: "node",
  publicUrlAuth: { bearerToken: true }, // gate preview URLs
}).create({});
const channel = await handle.ports.connect(3000);
console.log(channel.url);
```

## Options / Props

Provider options (`upstashBoxSandbox({...})`):

| Name | Type | Description |
|------|------|-------------|
| `apiKey` | `string` | Default `UPSTASH_BOX_API_KEY` |
| `baseUrl` | `string` | Overrides the Box API base URL; default SDK default |
| `runtime` | `string` | Box runtime image: `node` (default), `python`, `golang`, `ruby`, `rust` |
| `size` | `string` | `small` (2 CPU / 4 GB, default), `medium` (4 / 8), `large` (8 / 16) |
| `keepAlive` | `boolean` | Default `false`: avoids billing a perpetually running box and keeps `pause()` available. `true` prevents auto-pause mid-run, bills continuously, disables pausing |
| `snapshot` | `string` | Base snapshot id to create the box from |
| `name` | `string` | Human readable box name; a deterministic sandbox id from `ensure()` takes precedence |
| `publicUrlAuth` | `{ bearerToken?, basicAuth? }` | Auth for `ports.connect()` URLs (public by default). `bearerToken: true` returns a token plus `Authorization: Bearer` header; `basicAuth: true` returns Basic credentials |

Provider capabilities: `fs` (native Box file API), `exec` (separate stdout / stderr), `env`, `ports` (public preview URLs), `snapshots` (`box.snapshot()` / `Box.fromSnapshot()`), `durableFilesystem`, `backgroundProcesses` (`spawn()` opens a live `exec.session` with a real in-box pid), `writableStdin`, `killableProcesses`, `networkPolicy` (`network: "deny"` maps to the `deny-all` egress mode), `fork` (snapshot round trip, about 25 seconds).

## Notes

- Official guide replaced: the URL was renamed from `/box/guides/tanstack-ai-file-editor` to `/box/guides/tanstack-setup` (this file keeps its original name); the old EphemeralBox file-editor tool recipe is no longer in the official guide
- TanStack AI itself is outside the scope of the tanstack-* skills in this repository; only the Upstash Box provider side is covered here
- Clone the repo in a `setup` step rather than `source: githubRepo(...)`: the box home directory already contains agent dotfiles (`.claude`, `.codex`, `.cursor`, `.local`), `git clone` into a non-empty target exits `128` and the bootstrap does not surface the failure. Clone into `/tmp` and copy across
- The `node` runtime already ships `claude`, `codex`, and `opencode` in `/usr/local/bin`. For other CLIs prefer a user-space install such as `npm install -g --prefix /home/boxuser/.local <pkg>` or `uv tool install` (the box runs as non-root `boxuser`; a plain `npm install -g` fails with `EACCES`; system-wide installs inside the disposable box require elevated install). Original docs use `sudo -n` inside the box; this page rewrites it to a user-space install. Run the CLI in the same step to surface broken optional-dependency installs
- Preview URLs are public by default; pass `publicUrlAuth` on the same provider that creates the handle
- Secrets are injected into the box environment on create and resume; never written to snapshots, the sandbox store, or the event log
- TanStack AI's `/workspace` virtual root maps to the box home `/workspace/home`
- The `threadId` keys the box; two runs on the same thread reuse it. When the run finishes the adapter emits a `CUSTOM` `file.changed` chunk with the working tree `git diff`
- Two unrelated `keepAlive` settings: `lifecycle.keepAlive` is TanStack's duration hint (`"30m"`); `upstashBoxSandbox({ keepAlive })` is Box's boolean
- `network: "deny"` blocks every outbound connection (no package registries or model provider hosts); use Box network policies for domain / CIDR rules
- Bridged tools passed to `chat()` execute on the host and are bridged into the box; local development needs a tunnel (`withNgrokBridge`) because the box cannot reach `localhost`
- Spawned processes live as long as the handle, not the box (dropping the WebSocket kills the command; sessions cannot be reattached)

## Related

- [Guides: Vercel AI SDK Code Interpreter and Shell Tools](./guides-ai-sdk-code-interpreter.md)
- [Filesystem](./filesystem.md)
