# Guide: Self-Hosted Sandboxes for Claude Managed Agents

Run Claude Managed Agents sessions in Upstash Box. Claude runs on Anthropic's side; each session gets its own box for bash commands and file edits. Web search and web fetch still run on Anthropic's side.

## Signature / Usage

Create a self-hosted environment:

```typescript
import Anthropic from "@anthropic-ai/sdk";

const environment = await new Anthropic().beta.environments.create({
  name: "upstash-box",
  config: { type: "self_hosted" },
});
```

Dispatcher (core loop; full file also defines the in-box `worker.mjs`, `getBox`, and `isWorkerRunning`):

```typescript
const anthropic = new Anthropic({ authToken: environmentKey });

const queue = anthropic.beta.environments.work.poller({
  environmentId,
  environmentKey,
  autoStop: false,
  reclaimOlderThanMs: 30_000,
});

for await (const work of queue) {
  if (work.data.type !== "session") continue;
  const sessionId = work.data.id;
  const box = await getBox(sessionId);

  const env = {
    ANTHROPIC_ENVIRONMENT_ID: environmentId,
    ANTHROPIC_SESSION_ID: sessionId,
    ANTHROPIC_WORK_ID: work.id,
    ANTHROPIC_WORK_SECRET: work.secret ?? "",
  };

  const run = await box.exec.session({
    argv: ["bash", "-c", "setsid nohup node worker.mjs >> worker.log 2>&1 < /dev/null &"],
    env: Object.entries(env).map(([key, value]) => `${key}=${value}`),
  });
  await run.wait();
  run.close();
}
```

## Options / Props

| Env var | Source |
|---|---|
| `UPSTASH_BOX_API_KEY` | Upstash Console |
| `ANTHROPIC_API_KEY` | API key created inside a workspace |
| `ANTHROPIC_ENVIRONMENT_ID` | Written by `setup.ts` |
| `ANTHROPIC_ENVIRONMENT_KEY` | Claude Console: Managed Agents, Environments, upstash-box, Generate environment key |

Customize the box via any `Box.create` option, e.g. `attachHeaders` and `networkPolicy: { mode: "custom", allowedDomains: [...] }`.

## Notes

- Install: `npm install @upstash/box @anthropic-ai/sdk tsx`; run with `npx tsx --env-file=.env dispatcher.ts`
- The environment key never enters the box; the in-box worker authenticates with `ANTHROPIC_WORK_SECRET`, a short-lived credential for that session only
- Boxes are found by name (= session id) and label `claude-agent`; a session continues in the same box with the same files
- Values passed in `env` are readable by the agent; use `attachHeaders` for credentials
- Pause or delete a box only when `isWorkerRunning(box)` is `false`; the worker exits about a minute after each turn
- Troubleshooting: session stays queued (dispatcher not running or ID/key mismatch); `This API key is not scoped to a workspace` (create the key inside a workspace); commands never run (check `/workspace/home/worker.log`)
- This is about hosting the sandbox for Anthropic's Managed Agents; see the anthropic-managed-agents skill for the Managed Agents API itself
- Source: https://upstash.com/docs/box/guides/claude-managed-agents (fetched 2026-10-17; no version pin on the site).

## Related

- [Attach Headers](./attach-headers.md)
- [Network Policy](./network-policy.md)
- [How It Works](./how-it-works.md)
