# Guide: Self-Hosted Sandboxes for the OpenAI Agents API

Run the commands of the OpenAI Agents API in Upstash Box. The agent runs on OpenAI's side; each session gets its own box where commands run. Every box includes the Codex CLI, so nothing to install.

## Signature / Usage

```typescript
import OpenAI from "openai";
import { Box } from "@upstash/box";

const openai = new OpenAI();

const session = await openai.beta.agents.sessions.create({
  agent: { model: "gpt-6-astra", instructions: "You work in /workspace/home." },
  environment: { type: "self_hosted", workspace_directory: "/workspace/home" },
});

if (session.environment.type !== "self_hosted") throw new Error("Expected a self-hosted environment");
const { id, remote_url } = session.environment;

const box = await Box.create({
  runtime: "node",
  name: session.id,
  env: { CODEX_API_KEY: process.env.OPENAI_EXECUTOR_KEY! },
});

await box.exec.command(
  `setsid nohup flock -n /tmp/codex.lock codex exec-server --remote '${remote_url}' ` +
  `--environment-id '${id}' >> executor.log 2>&1 < /dev/null &`
);

const events = await openai.beta.agents.sessions.events.stream(session.id);
// send: { type: "agent.session.input.message", input: [{ role: "user", content: [{ type: "input_text", text }] }] }
// loop until event.type === "agent.session.turn.completed" && !event.turn.subagent_id
await box.pause();
```

Cleanup: `await openai.beta.agents.sessions.delete(sessionId); await box.delete();`

## Options / Props

| Env var | Source |
|---|---|
| `UPSTASH_BOX_API_KEY` | Upstash Console |
| `OPENAI_API_KEY` | OpenAI API keys |
| `OPENAI_EXECUTOR_KEY` | Environment key from Agents, Environments, Keys (same project); the only OpenAI key that goes into the box |

## Notes

- Install: `npm install @upstash/box openai tsx`; run with `npx tsx --env-file=.env session.ts`
- Continue later with `openai.beta.agents.sessions.retrieve(sessionId)` and `Box.get(boxId)`, restarting the executor (`flock` skips it if one already runs)
- `CODEX_API_KEY` is readable inside the box, which is why it must be the environment key
- Customize via any `Box.create` option (`attachHeaders`, `networkPolicy: { mode: "custom", allowedDomains: [...] }`); to start every box with your own tools or repo, use `Box.fromSnapshot`
- Troubleshooting: script waits and prints nothing (executor did not connect; check `/workspace/home/executor.log`); `missing required scope api.agents.environments.connect` (use an environment key, not a regular API key)
- This guide hosts the sandbox for OpenAI's Agents API; see the openai-agents skill for the Agents SDK itself
- Source: https://upstash.com/docs/box/guides/openai-agents-api (fetched 2026-10-17; no version pin on the site).

## Related

- [Attach Headers](./attach-headers.md)
- [Network Policy](./network-policy.md)
- [Snapshots](./snapshots.md)
