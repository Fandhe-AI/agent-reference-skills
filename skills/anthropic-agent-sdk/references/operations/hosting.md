<!-- source: https://code.claude.com/docs/en/agent-sdk/hosting / last verified: 2026-08-07 -->

# Hosting the Agent SDK

Deploy the Agent SDK in production: subprocess architecture, session persistence, scaling, observability, and multi-tenant isolation for Docker, Kubernetes, and sandbox providers.

The Agent SDK spawns and supervises a `claude` CLI subprocess that owns a shell, a working directory, and session files on disk. Every running agent is a long-lived process tied to local state, which shapes how you allocate resources, persist sessions, and scale across tenants.

This page covers self-hosting on your own infrastructure. For deployable Dockerfiles and Kubernetes manifests, see the hosting cookbook (`anthropics/claude-cookbooks`, `claude_agent_sdk/hosting`). If you do not need infrastructure control, custom isolation, or your own data plane, consider Managed Agents instead: a hosted REST API where Anthropic runs the agent and the sandbox.

For security hardening beyond basic sandboxing, see Secure Deployment (`./secure-deployment.md`).

## The subprocess model

When your code calls `query()`, the SDK spawns a separate `claude` CLI process and talks to it over stdio. That subprocess owns the shell, the working directory, and the JSONL session transcripts on local disk.

One agent session maps to one subprocess. Running N concurrent sessions means N subprocesses, each with its own process tree and transcript file. By default they all inherit your application's working directory, so pass `cwd` on each `query()` call when sessions need separate filesystems:

```typescript
query({ prompt, options: { cwd: "/work/session-a" } })
```

```python
query(prompt=prompt, options=ClaudeAgentOptions(cwd="/work/session-a"))
```

### State that lives on local disk

Three kinds of agent state live on the container's filesystem by default. None of them survive a container restart, a scale-down, or a move to a different node.

| State | Default location |
|---|---|
| Session transcripts | `~/.claude/projects/`, or the `projects/` directory under `CLAUDE_CONFIG_DIR` if set |
| `CLAUDE.md` memory files | `~/.claude/CLAUDE.md` for the user tier and the session's working directory for the project tier |
| Working-directory artifacts | The session's working directory |

To persist transcripts across hosts, configure a `SessionStore` adapter (see session storage documentation). Memory files and other working-directory artifacts need their own storage strategy, such as a mounted volume or an object-store sync.

## Choose a session pattern

Four patterns cover session lifecycle: how long a container lives relative to the sessions it serves.

### Ephemeral sessions

Create a container for each user task and destroy it when the task completes. Best for one-off tasks such as bug investigation, invoice extraction, document translation, or media transformation.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const prompt = process.env.TASK_PROMPT!;
for await (const message of query({ prompt, options: { maxTurns: 20 } })) {
  console.log(message);
}
```

```python
import asyncio
import os
from claude_agent_sdk import ClaudeAgentOptions, query

async def main():
    async for message in query(
        prompt=os.environ["TASK_PROMPT"],
        options=ClaudeAgentOptions(max_turns=20),
    ):
        print(message)

asyncio.run(main())
```

### Long-running sessions

Run persistent container instances, often hosting multiple SDK processes per container, to serve ongoing work such as an email triage agent, a site builder, or a continuous-traffic chat bot. In TypeScript, use `streamInput()` (see `../api-reference/typescript.md`) to add turns to an active session and `startup()` to pre-warm subprocesses. In Python, use `ClaudeSDKClient` (see `../api-reference/python.md`) to hold a session open across turns. Size the container so it can hold the maximum number of concurrent sessions in memory.

### Hybrid sessions

Ephemeral containers that hydrate from a `SessionStore` on startup and persist updates back. Best for sessions that span many interactions but sit idle between them. Tune your provider's idle timeout to how frequently users return. Shutting a container down without a `SessionStore` configured loses the transcript with it.

```typescript
import { query, type SessionStore } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: userInput,
  options: { resume: sessionId, sessionStore },
})) {
  // ...
}
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions, SessionStore

async def main():
    async for message in query(
        prompt=user_input,
        options=ClaudeAgentOptions(resume=session_id, session_store=session_store),
    ):
        ...
```

### Multi-agent container

Run multiple SDK subprocesses inside one container for agents that must collaborate closely, such as multi-agent simulations. Give each agent its own working directory so they do not overwrite each other's files, and isolate settings loading so per-agent `CLAUDE.md` files do not leak across agents (see Multi-tenant isolation below).

## Provision the container

### Container-based sandboxing

Run the SDK inside a sandboxed container for process isolation, resource limits, network control, and an ephemeral filesystem. Questions to answer when choosing a provider: who runs the sandbox, cold-start latency, persistent storage, pricing model, and networking (custom egress rules, outbound proxies, private VPC peering).

Providers to evaluate: Modal Sandbox, Cloudflare Sandboxes, Daytona, E2B, Fly Machines, Vercel Sandbox. For self-hosted options such as Docker, gVisor, and Firecracker, see Secure Deployment's Isolation Technologies section (`./secure-deployment.md`).

### Runtime dependencies

The container needs Python 3.10+ for the Python SDK, or Node.js 18+ for the TypeScript SDK. Both SDKs bundle a native Claude Code binary for most installs; the spawned CLI needs no separate Node.js install. The bundled binary is pinned to the SDK package version, so updating the SDK is how you update the CLI. The SDK follows semver: take patch releases continuously and review the changelog before taking a minor.

### Resources

1 GiB RAM, 5 GiB disk, and 1 CPU per agent is a reasonable starting point for a freshly started instance. Memory usage grows with session length and tool activity, so size for actual session lengths and concurrency rather than the idle baseline.

### Network

The SDK needs outbound HTTPS to `api.anthropic.com`, or to your provider's regional endpoint on Amazon Bedrock or Google Cloud's Agent Platform. Agents using MCP servers or external tools need outbound access to those endpoints too. For production, route outbound traffic through an egress proxy that enforces domain allowlists, injects credentials, and logs requests.

For inbound traffic, expose an HTTP or WebSocket port on the container; the subprocess itself does not listen on the network.

## Handle production concerns

### Session and state persistence

Default local disk is lost on restart, scale-down, or a move to a different node. For any session a user expects to resume, mirror the transcript to durable storage with a `SessionStore` adapter (S3, Redis, and Postgres reference adapters exist, plus a conformance suite for custom ones).

Three behaviors to know:

- **Transcripts only**: `SessionStore` mirrors transcripts, not `CLAUDE.md` memory files or other working-directory artifacts. Mount a shared volume or sync those separately.
- **Mirror, not replacement**: the subprocess writes to local disk first; the store receives a copy of each batch. Local writes remain authoritative.
- **`mirror_error` messages**: a batch the store rejects is retried up to three times total with a short backoff; a timed-out call isn't retried. If the batch still fails, the SDK drops it, emits a `{ type: "system", subtype: "mirror_error" }` message, and continues the query.

### Observability

The SDK inherits OpenTelemetry configuration from the environment. Set the OTEL environment variables at the container or orchestrator level so every `query()` call exports spans, metrics, and log events to your collector:

```bash
CLAUDE_CODE_ENABLE_TELEMETRY=1
CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
OTEL_TRACES_EXPORTER=otlp
OTEL_METRICS_EXPORTER=otlp
OTEL_LOGS_EXPORTER=otlp
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_ENDPOINT=http://collector.example.com:4318
```

`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` is required only for traces; omit it if you export metrics and logs alone. Prompt text and tool inputs are not included in exports by default. See `./observability.md` for the full signal catalog and opt-in content flags.

### Auth and secrets

- **Anthropic API**: the subprocess reads `ANTHROPIC_API_KEY` from its environment, or route model calls through a proxy via `ANTHROPIC_BASE_URL`.
- **Inbound**: put authentication at a gateway in front of the agent container; the agent should receive pre-authenticated requests.
- **Outbound tools**: keep tool credentials out of the agent environment. Route outbound calls through a proxy that injects API keys after the request leaves the container.

### Scaling and concurrency

Each session runs in its own subprocess, so concurrency on a host is bounded by how many subprocesses its RAM can hold:

```text
agents per host = (host RAM - overhead) / (per-session RAM ceiling)
```

Measure the per-session ceiling by running a representative session under expected tool load and recording peak RSS. For long-running sessions, run a pool of containers behind a load balancer and pin each session to one container using consistent hashing on `sessionId`. Large fanouts of concurrent subagents from a single session can hit API rate limits; break work into smaller batches rather than one wide dispatch.

### Cost

Anthropic token cost typically dominates container infrastructure cost by an order of magnitude or more. A minimally provisioned container runs roughly $0.05/hour, while a single long agent session can spend dollars in tokens. See `./cost-tracking.md` for per-session token accounting.

### Multi-tenant isolation

Default SDK behavior reads settings and `CLAUDE.md` memory files from the filesystem, which can leak one tenant's context into another tenant's session in a shared container. To isolate tenants:

- Pass `settingSources: []` (TypeScript) or `setting_sources=[]` (Python) so no filesystem settings load.
- Set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` in `env` — auto memory at `~/.claude/projects/<project>/memory/` loads into the system prompt regardless of `settingSources`.
- Point `CLAUDE_CONFIG_DIR` at a per-tenant directory so tenants do not share `~/.claude.json`.
- Use a per-tenant working directory; pass `cwd` explicitly on every `query()` call.
- Apply per-tenant egress rules at your proxy (distinct outbound IPs, credentials, or domain allowlists).

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt,
  options: {
    cwd: tenantDir,
    settingSources: [],
    env: {
      ...process.env,
      CLAUDE_CONFIG_DIR: configDir,
      CLAUDE_CODE_DISABLE_AUTO_MEMORY: "1",
    },
  },
})) {
  // ...
}
```

```python
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt=prompt,
        options=ClaudeAgentOptions(
            cwd=tenant_dir,
            setting_sources=[],
            env={
                "CLAUDE_CONFIG_DIR": config_dir,
                "CLAUDE_CODE_DISABLE_AUTO_MEMORY": "1",
            },
        ),
    ):
        ...
```

## Known limitations

| Limitation | What to do |
|---|---|
| No top-level session timeout | Set `maxTurns` in `Options` to bound tool-use round trips. |
| Memory growth over long sessions | Cap session length or recycle subprocesses periodically. |
| Large parallel-subagent fanouts can hit rate limits | Break work into smaller batches rather than one wide dispatch. |
| No per-subagent wall-clock deadline | Cap each subagent with `maxTurns` in its `AgentDefinition`. For background subagents only, `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS` sets a stall watchdog for `run_in_background` subagents; it is not a total-runtime deadline. |

## Notes

- The `SessionStore` interface and reference adapters (S3/Redis/Postgres) are documented on a separate "Session storage" page, not fetched into this skill; this page's `SessionStore` references describe the interface's role only.

## Related

- [Secure Deployment](./secure-deployment.md)
- [Observability](./observability.md)
- [Cost Tracking](./cost-tracking.md)
