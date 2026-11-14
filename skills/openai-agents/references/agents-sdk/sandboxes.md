# Sandbox Agents

`SandboxAgent` runs an agent against an isolated, Unix-like execution environment (filesystem, shell, mounts, ports, snapshots) instead of prompt context alone. Available in the TypeScript and Python Agents SDKs, where your application runs the harness (the control plane: agent loop, model calls, tool routing, handoffs, approvals, tracing, recovery, run state) while the sandbox is the compute plane.

## Signature / Usage

```typescript
import { run } from "@openai/agents";
import { Manifest, SandboxAgent, file, shell } from "@openai/agents/sandbox";
import { UnixLocalSandboxClient } from "@openai/agents/sandbox/local";

const manifest = new Manifest({
  entries: {
    "account_brief.md": file({ content: "# Northwind Health\n..." }),
  },
});

const agent = new SandboxAgent({
  name: "Renewal Packet Analyst",
  model: "gpt-6-astra",
  instructions: "Review the workspace before answering.",
  defaultManifest: manifest,
  capabilities: [shell()],
});

const result = await run(
  agent,
  "Summarize the renewal blockers and recommend the next two actions.",
  { sandbox: { client: new UnixLocalSandboxClient() } }
);
```

```python
from agents import Runner
from agents.run import RunConfig
from agents.sandbox import Manifest, SandboxAgent, SandboxRunConfig
from agents.sandbox.capabilities import Shell
from agents.sandbox.entries import File
from agents.sandbox.sandboxes.unix_local import UnixLocalSandboxClient

manifest = Manifest(entries={"account_brief.md": File(content=b"# Northwind Health\n...")})

agent = SandboxAgent(
    name="Renewal Packet Analyst",
    model="gpt-6-astra",
    instructions="Review the workspace before answering.",
    default_manifest=manifest,
    capabilities=[Shell()],
)

result = await Runner.run(
    agent,
    "Summarize the renewal blockers and recommend the next two actions.",
    run_config=RunConfig(sandbox=SandboxRunConfig(client=UnixLocalSandboxClient())),
)
```

### Core pieces

| Piece | What it owns |
|------|-------------|
| `SandboxAgent` | The agent definition plus sandbox defaults (`defaultManifest`, `baseInstructions`, `runAs`, `capabilities`) |
| `Manifest` | The fresh-session workspace contract: files, repos, mounts, environment, users/groups |
| Capabilities | Sandbox-native behavior attached to the agent (`Shell`, `Filesystem`, `Skills`, `Memory`, `Compaction`) |
| Sandbox client | The provider integration (Unix-local, Docker, or a hosted provider) |
| Sandbox session | The live execution environment |
| Sandbox run config | Per-run session source, client options, and fresh inputs |
| Saved state | `RunState`, serialized session state, and snapshots |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `capabilities` | `Capability[]` | Replaces the default list entirely; default is filesystem + shell + compaction |
| `defaultManifest` / `default_manifest` | `Manifest` | Fresh-session workspace contract used when no live session or resume state is supplied |
| `Shell` capability | capability | Adds command execution and, when supported, interactive input |
| `Filesystem` capability | capability | Adds `apply_patch` and `view_image`; patch paths are workspace-root-relative |
| `Skills` capability | capability | Enables skill discovery and materialization in the sandbox (prefer over manually mounting `.agents/skills`) |
| `Memory` capability | capability | Requires `Shell`; live memory updates also require `Filesystem` |
| `Compaction` capability | capability | Adjusts model behavior/input handling after context compaction |
| `Manifest.environment` | object | Environment variables injected at sandbox startup |
| `S3Mount` / `GCSMount` / `R2Mount` / `AzureBlobMount` / `BoxMount` / `S3FilesMount` | mount entry | External storage made available inside the sandbox |

### Providers

Start with Unix-local for fast local iteration or Docker for local container isolation; move to a hosted provider when the task needs managed execution, provider-specific isolation, scaling, previews, storage mounts, snapshots, or credentials that live outside your application server.

| Provider | SDK client |
|---|---|
| Blaxel | `BlaxelSandboxClient` |
| Cloudflare | `CloudflareSandboxClient` |
| Databricks | `DatabricksSandboxClient` (Python: install `databricks-openai[sandbox]`) |
| Daytona | `DaytonaSandboxClient` |
| Docker | `DockerSandboxClient` |
| E2B | `E2BSandboxClient` |
| Modal | `ModalSandboxClient` |
| Unix-local | `UnixLocalSandboxClient` |
| Vercel | `VercelSandboxClient` |

Use each provider's own docs for setup, credentials, isolation, storage, previews, and persistence. The provider is part of the run configuration, not the agent definition — swap the client while keeping the `SandboxAgent`, manifest, and capabilities stable.

### Resume and state

| State surface | Restores | Use when |
|---|---|---|
| `RunState` | Harness-side state: model items, tool state, approvals, active agent position | The runner should carry the workflow forward across pauses |
| Session state | A serialized sandbox session a client can reconnect to | Your app/job system stores provider session state directly |
| `snapshot` | Saved workspace contents used to seed a fresh session | A new run should start from saved files/artifacts, not an empty workspace |

Resolution order at run time: injected live session > `RunState`-stored session state > explicit serialized state > fresh session (per-run manifest, else the agent's default manifest).

## Notes

- Source: https://developers.openai.com/api/docs/guides/agents/sandboxes (fetched 2026-11-14).
- The provider table on the official page no longer lists Runloop (removed here); it now lists Databricks. For an OpenAI-managed harness use the Agents API sandbox pages.
- TypeScript `UnixLocalSandboxClient` needs a trusted Python 3 interpreter on the host (checks `/usr/bin/python3`, `/usr/local/bin/python3`, `/opt/homebrew/bin/python3`). If Python is elsewhere, set `OPENAI_AGENTS_PYTHON` to its absolute path before starting Node.js. This is a host prerequisite, not a package to install inside the sandbox; session creation fails if no suitable interpreter is found.
- The Docker client is imported from `@openai/agents/sandbox/local` in TypeScript (`new DockerSandboxClient({ image: "node:22-bookworm-slim" })`); in Python it takes `DockerSandboxClientOptions(image=DEFAULT_PYTHON_SANDBOX_IMAGE, network_mode="none")` via `SandboxRunConfig(client=..., options=...)`.
- To load skills use `skills({ from: gitRepo({ repo, ref }) })` with `...Capabilities.default()` (TS) / `Skills(from_=GitRepo(...))` with `Capabilities.default() + [...]` (Python); a `capabilities` list replaces the defaults, so include the defaults you still need.
- Fresh-session inputs (`manifest`, `snapshot`) apply only when the runner creates a new sandbox session; an injected live `session` can only take compatible non-mount entries and cannot change root, environment, users, or groups, remove or replace entries, or add or change mounts.
- Memory reads use progressive disclosure: `memory_summary.md` is injected at run start, `MEMORY.md` is searched when prior work looks relevant, rollout summaries are opened only when needed. Memory is grouped by explicit conversation ID, then SDK session ID, then run group ID, then a generated per-run ID; the sandbox session ID is not the memory conversation ID.
- This page covers sandboxes in the Agents SDK, where your application runs the harness (`SandboxAgent`, self-hosted). The Agents API's OpenAI-hosted / self-hosted sandbox (OpenAI-managed harness) is a different thing, covered by the `agents-api` category of this skill.
- Handle secrets and credentials: treat sandbox credentials as runtime configuration, not prompt content. Do not put them in prompts, agent instructions, task files, committed manifests, or generated artifacts. Prefer provider-native secret systems for hosted providers, scope cloud storage credentials to the mount or provider option that needs them, and use `Manifest.environment` for startup values (mark sensitive or generated entries as ephemeral so they are rebuilt, not persisted).
- Expose previews and ports: port setup is provider-specific. The agent starts the service in the sandbox, the sandbox client exposes the port, and your application shares or inspects the resulting preview URL.
- `SandboxAgent` is still an `Agent` — it keeps `instructions`, `prompt`, `tools`, `handoffs`, MCP servers, model settings, structured output, guardrails, and hooks; only the execution boundary changes.
- A turn is still a model step, not a single shell command or sandbox action.
- Manifest entry paths are workspace-relative and can't be absolute or escape the workspace with `..`.
- Mount entries are treated as ephemeral: snapshot/persistence flows skip mounted remote storage rather than copying it into saved workspace contents.
- Sandbox memory (`Memory` capability) is separate from SDK-managed conversational `Session` memory: sessions preserve message history, sandbox memory distills lessons from prior workspace runs into files (`memory_summary.md`, `MEMORY.md`, rollout summaries) the agent can read later.
- The `Skills` capability loads Agent Skills (`SKILL.md` bundles) into the sandbox filesystem for the model to discover and use during a run — distinct from the hosted/local `skill` tool attachment covered in this skill's `tools` scope, and unrelated to this repository's own Claude Code skill concept.
- Compose with the rest of the SDK via handoffs (delegate the workspace-heavy part of a workflow to a sandbox agent) or agents-as-tools (call sandbox agents as nested tools, each with its own sandbox run configuration).

## Related

- [Running Agents](./running-agents.md)
- [Results and State](./results-and-state.md)
