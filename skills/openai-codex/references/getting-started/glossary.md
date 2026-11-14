# Glossary

Quick reference for Codex and ChatGPT terms across the desktop app, CLI, IDE extension, cloud, SDK, and integrations. Surface abbreviations: App = desktop app, Ext = IDE extension, Ent = Enterprise.

## Signature / Usage

```text
Sandbox: Enforced boundary limiting what Codex commands can access or modify.
```

## Options / Props

### Agents, tasks, and conversation

| Term | Surfaces | Definition |
|------|----------|------------|
| Codex | App, CLI, Ext, Web, Cloud, SDK | OpenAI's coding agent for software development tasks. |
| Agent | App, CLI, Ext, Cloud | The Codex agent that reasons over context, uses tools, and completes a task. |
| ChatGPT Work | App, Web | The agent in ChatGPT for research, analysis, and creating finished documents, presentations, spreadsheets. |
| Task | all | A defined outcome ChatGPT or Codex works toward. |
| Standalone task | App, CLI, Ext, Cloud | A Codex task not grouped within a project. |
| Chat / Conversation | all | Saved space / ongoing exchange of messages and shared context. Quick chat starts a ChatGPT chat from Codex. |
| Local chat | App, CLI, Ext | A chat that runs on the user's machine. |
| Cloud chat | Cloud | A Codex chat that runs remotely in a cloud environment. |
| Project | App | A group of related chats and shared sources, or a local folder for file-based work. |
| Prompt | App, CLI, Ext, Cloud, SDK | A question, instruction, or goal sent to ChatGPT or Codex. |
| Turn | App, CLI, Ext, Cloud, SDK | One exchange in a chat: a user prompt plus the agent's response and actions. |
| Thread | App-server, SDK | Technical object in app-server APIs containing turns and stored history. |
| Thread fork | App-server, SDK | New thread branched from the stored history of an existing thread. |
| Plan | App, CLI, Ext, Cloud | Codex's proposed or tracked steps for a task. |
| Context | App, CLI, Ext, Cloud, SDK | Files, prior messages, tool output, and instructions Codex can use. |
| Context window | App, CLI, Ext, Cloud, SDK | Maximum information the model can consider at once. |
| Compaction | App, CLI, Ext, Cloud | Summarizing older context so long-running work can continue. |
| Subagent | App, CLI | Specialized child agent spawned for part of a task. |
| Subagent workflow | App, CLI | Delegated agents run in parallel and results combined. |
| Custom agent | App, CLI | User-defined agent role with its own instructions and settings. |
| Model | App, CLI, Ext, Cloud, SDK | The AI model Codex uses for reasoning and tool work. |
| Reasoning effort | App, CLI, Ext, SDK | Setting controlling how much reasoning budget a model uses. |
| Fast mode | CLI, Ext | Faster responses from supported models at a higher credit cost. |
| Memories | App, CLI, Ext | Locally stored context Codex can reuse across sessions. |
| Computer History | App | Opt-in macOS feature building memories and a timeline from interaction events across allowed apps and sites. |

### Surfaces and products

| Term | Surfaces | Definition |
|------|----------|------------|
| ChatGPT desktop app | Desktop | App with ChatGPT and Codex: Chat, Work, projects, file previews, scheduled tasks, developer tools. |
| Codex CLI | Terminal | Terminal client for running Codex interactively or in scripts. |
| `codex exec` / Non-interactive mode | CLI | Run Codex from scripts or CI. |
| Ephemeral session | CLI | Non-interactive run that skips saving session state. |
| Output schema | CLI | JSON Schema passed to `codex exec` to constrain the final response. |
| Slash command | CLI | Leading-slash command to control or inspect a CLI session. |
| Codex IDE extension | IDE | Editor integration for VS Code, JetBrains IDEs, Cursor, Windsurf. |
| Codex SDK | SDK | Programmatic interface for Codex-powered workflows. |
| Sandbox preset | SDK | SDK shorthand for common sandbox policies (read-only, workspace-write, full access). |
| Codex app-server | App, Ext, SDK | Local JSON-RPC server for embedding threads, turns, approvals, history, streamed events in custom clients. |
| Codex Cloud | App, Ext, Web | Coding tasks that run in the cloud with their own workspaces, repositories, and tools. |
| Cloud environment | Cloud | Reusable repositories, dependencies, tools, access settings for Codex Cloud tasks. |
| Remote connection | App, Mobile | Access chats on another device through a connected host. |
| Connected host | App, Mobile | Computer or dev environment providing files, tools, shell for remotely opened chats. |
| Computer Use | App | Lets ChatGPT interact with other applications through the UI. |
| Computer Use in the browser | App | Lets ChatGPT operate the built-in browser directly. |
| Appshot | App | Snapshot of the frontmost app window sent to a chat. |

### Sandbox, approvals, and permissions

| Term | Surfaces | Definition |
|------|----------|------------|
| Action | all | Operation by a person, ChatGPT, or Codex (edit a file, run a command, use a service). |
| Sandbox | App, CLI, Ext | Enforced boundary limiting what commands can access or modify. |
| Sandbox mode | App, CLI, Ext | Configuration defining filesystem and network limits. |
| Read-only mode | App, CLI, Ext | Inspect but not modify without approval. |
| Full access | App, CLI, Ext | Runs without normal sandbox restrictions. |
| Writable roots | App, CLI, Ext | Directories Codex may modify. |
| Approval policy | App, CLI, Ext | Rules for when Codex must ask before acting. |
| Approval request | App, CLI, Ext | Codex asking to allow a restricted action. |
| Automatic approval review | App, CLI, Ext | Model-based review of eligible approval requests. |
| Permission profile | App, CLI, Ext | Named least-privilege policy combining filesystem and network rules. |
| Filesystem permission | App, CLI, Ext | Profile rule granting or denying read/write access to paths. |
| Deny-read rule | App, CLI, Ext, Ent | Prevents reading sensitive paths or glob matches. |
| Network access | App, CLI, Ext, Cloud | Permission to reach the internet. |
| Network policy | App, CLI, Ext | Domain-based allow/deny rules for sandboxed outbound traffic. |
| Domain allowlist | Cloud | Domains allowed by a cloud environment's network policy. |
| Network secret | Cloud | Credential for a specific HTTPS service; programs get a placeholder and the proxy substitutes the credential for allowed destinations. |
| Rules | App, CLI, Ext | Policies that allow, prompt for, or deny command prefixes or permission exceptions. |
| Prefix rule | App, CLI, Ext, Ent | Command-rule pattern matching command prefixes. |
| Hook / Hook event | App, CLI, Ext | Lifecycle handler that runs when a Codex event matches / the lifecycle point where handlers run. |

### Configuration and authentication

| Term | Surfaces | Definition |
|------|----------|------------|
| `config.toml` | App, CLI, Ext | Local Codex configuration files. |
| Profile | CLI, Ext | Named configuration preset. |
| Apps (configuration) | App, CLI, Ext | Config and app-server fields storing connector settings under the `apps` name. |
| Environment variable | Cloud, CLI, Ext | Runtime configuration value available during task execution. |
| Environment (local) | App | App configuration telling Codex how to set up worktrees for a project. |
| Setup script | App worktrees | Script run before the agent starts to install dependencies or prepare tools. |
| AGENTS.md | App, CLI, Ext, Cloud | Repository or user guidance file giving persistent instructions. |
| Live web search / Web search cache | App, CLI, Ext | Real-time web lookup / pre-indexed results without live browsing. |
| ChatGPT sign-in | App, CLI, Ext, Cloud | Authentication with a ChatGPT account and workspace permissions. |
| API key sign-in | App, CLI, Ext | Authentication with an OpenAI API key. |
| Auth cache | App, CLI, Ext | Locally stored login credentials reused by Codex. |

### Skills, plugins, and MCP

| Term | Surfaces | Definition |
|------|----------|------------|
| Skill | App, Web (Work), CLI, Ext | Reusable workflow package with instructions and optional scripts or references. |
| Skill invocation | same | Explicit or implicit activation of a skill. |
| Progressive disclosure | same | Loading skill details only when needed to preserve context. |
| Plugin | App, Web (Work), CLI | Installable bundle (skills, connectors, tools) distributed via the universal directory shared by ChatGPT and Codex. |
| Plugin manifest | Plugin authoring | Metadata file identifying a plugin and pointing to bundled skills, connector mappings, MCP servers, hooks. |
| Connector | App, Web (Work) | Plugin component connecting to data and actions in an external service. |
| MCP | App, CLI, Ext | Model Context Protocol, a standard for connecting Codex to external tools and context. |
| MCP server / tool / resource | App, CLI, Ext | External provider via MCP / action Codex can call / readable context to inspect. |
| STDIO MCP server | CLI, Ext | Launched as a local process by command and arguments. |
| Streamable HTTP MCP server | CLI, Ext | Reached over HTTP, optionally with bearer token or OAuth. |

### Git, review, and worktrees

| Term | Surfaces | Definition |
|------|----------|------------|
| Git worktree | App | A second checkout of the same repository for parallel branch work. |
| Worktree | App | Mode isolating changes in a separate Git worktree. |
| Codex-managed worktree | App | Temporary worktree Codex creates and manages for a chat. |
| Local | App, CLI, Ext | Mode where Codex works on the user's computer. |
| Handoff | App | Moving a chat and its work between Local and Worktree. |
| Review pane | App | View for inspecting diffs, comments, Git changes. |
| Diff / Hunk | App | Set of Git file changes / contiguous section stageable or revertable independently. |
| Inline comment | App | Line-specific feedback attached to a diff. |
| Pull request review | App, CLI, GitHub | Codex review of changes or feedback on a pull request. |

### Scheduling

| Term | Surfaces | Definition |
|------|----------|------------|
| Scheduled task | App, Web | Prompt run at a future time or on a recurring schedule, with its own settings and run history. |
| Scheduled run | App, Web | One execution of a scheduled task. |
| Schedule | App | Timing rule for a scheduled task. |
| Standalone scheduled task | App, Web | Each run starts a new chat and reports findings in Triage. |
| Scheduled task in a chat | App, Web | Uses an existing chat's context and returns results to that chat. |
| Heartbeat | App | Recurring scheduled task that returns to the same chat. |
| Finding | App | Notable result or issue surfaced by a scheduled task. |

### Enterprise

| Term | Surfaces | Definition |
|------|----------|------------|
| Managed configuration | Ent | Organization-controlled Codex defaults and restrictions. |
| `requirements.toml` | Ent | Admin-enforced requirements file for managed setups. |
| MDM | Ent | Mobile device management for distributing device profiles and managed Codex settings. |
| RBAC | Ent | Role-based access control for workspace permissions. |
| Compliance API | Ent | Export of supported workspace records and audit metadata. |
| Analytics dashboard | Ent | Admin hub for workspace adoption and Codex-focused reporting. |

## Notes

- Condensed from the official interactive table: terms are merged where the page defines pairs, and definitions are shortened; per-term deep links on the official page are omitted.
- Source: https://learn.chatgpt.com/docs/glossary (retrieved 2026-11-14).

## Related

- [Feature maturity](./feature-maturity.md)
- [Desktop app](./desktop-app.md)
- [CLI](./cli.md)
- [Cloud](./cloud.md)
