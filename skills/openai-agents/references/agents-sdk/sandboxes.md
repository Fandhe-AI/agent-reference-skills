# Sandbox Agents

`SandboxAgent` runs an agent against an isolated, Unix-like execution environment (filesystem, shell, mounts, ports, snapshots) instead of prompt context alone. Beta in the TypeScript and Python Agents SDKs.

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
  model: "gpt-5.6",
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
    model="gpt-5.6",
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

## Core pieces

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

## Providers

Unix-local and Docker run locally (`UnixLocalSandboxClient`, `DockerSandboxClient`); hosted providers include Blaxel, Cloudflare, Daytona, E2B, Modal, Runloop, and Vercel, each with its own SDK client class. The provider is part of the run configuration, not the agent definition — swap the client while keeping the `SandboxAgent`, manifest, and capabilities stable.

## Resume and state

| State surface | Restores | Use when |
|---|---|---|
| `RunState` | Harness-side state: model items, tool state, approvals, active agent position | The runner should carry the workflow forward across pauses |
| Session state | A serialized sandbox session a client can reconnect to | Your app/job system stores provider session state directly |
| `snapshot` | Saved workspace contents used to seed a fresh session | A new run should start from saved files/artifacts, not an empty workspace |

Resolution order at run time: injected live session > `RunState`-stored session state > explicit serialized state > fresh session (per-run manifest, else the agent's default manifest).

## Notes

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
