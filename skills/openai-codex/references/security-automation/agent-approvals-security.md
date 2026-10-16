# Agent approvals & security

How to operate Codex safely across sandboxing, approvals, and network access. Covers the two-layer security model (sandbox mode + approval policy), network isolation, auto-review, OS-level enforcement, Dev Containers, and telemetry.

## Signature / Usage

```bash
# Auto preset (default recommendation for version-controlled folders)
codex --sandbox workspace-write --ask-for-approval on-request

# Read-only, non-interactive (CI)
codex --sandbox read-only --ask-for-approval never

# Dangerous full access (not recommended)
codex --dangerously-bypass-approvals-and-sandbox   # alias: --yolo
```

```toml
# config.toml
approval_policy = "on-request"
sandbox_mode    = "read-only"
allow_login_shell = false  # optional hardening

[sandbox_workspace_write]
network_access = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sandbox_mode` | `read-only` \| `workspace-write` \| `danger-full-access` | What Codex can technically do (where it can write, whether it can reach the network) when executing model-generated commands. |
| `approval_policy` | `on-request` \| `never` \| `{ granular = { sandbox_approval = true, rules = true, mcp_elicitations = true, request_permissions = false, skill_approval = false } }` | When Codex must stop and ask before acting. `untrusted` is retired (see Notes). Granular policy can toggle `sandbox_approval`, `rules`, `mcp_elicitations`, `request_permissions`, `skill_approval` independently. |
| `approvals_reviewer` | `user` (default) \| `auto_review` | Who reviews interactive approval requests. `auto_review` routes eligible requests to a reviewer agent instead of a human (see Auto-review). |
| `sandbox_workspace_write.network_access` | boolean | Enables network access in `workspace-write` mode (off by default). |
| `features.network_proxy.enabled` / `.domains` | boolean / table | Constrains already-enabled command network access to an allow/deny domain policy. Does not grant network access by itself. |
| `web_search` | `cached` (default) \| `live` \| `disabled` \| `indexed` | Controls the web search tool independently of full network access. |
| `--ask-for-approval never` / `-a never` | flag | Disables approval prompts; works with all `--sandbox` modes. |
| `codex sandbox macos [--permission-profile <name>] [--log-denials] [COMMAND]...` | CLI | Test what a command would do under the macOS sandbox. |
| `codex sandbox linux\|windows [--permission-profile <name>] [COMMAND]...` | CLI | Same for Linux / Windows (aliases: `codex debug`, `codex sandbox seatbelt`, `codex sandbox landlock`). |

## Notes

- Migrate from the retired `untrusted` approval policy: Codex and ChatGPT Work no longer support `approval_policy = "untrusted"`, and the retired setting can prevent either client from starting. Remove it from user/project configuration, profile files, startup scripts, and managed defaults. For interactive read-only use set `sandbox_mode = "read-only"` and `approval_policy = "on-request"` (or `codex --sandbox read-only --ask-for-approval on-request`). To preserve the stricter command-approval rule, omit an explicit `approval_policy` and add `[projects."/path/to/project"] trust_level = "untrusted"` to user-level `~/.codex/config.toml`: commands then require approval unless an execution-policy rule allows them, and project-local configuration is disabled. Explicitly setting `on-request` overrides the project-derived policy; managed `allowed_approval_policies` must include `untrusted` to permit it.
- Safety monitoring and paused tasks: GPT-6 Astra includes safety monitoring in Codex and ChatGPT Work. It runs asynchronously and can pause a task on potentially unsafe model behavior (a pause can arrive after the triggering activity); it doesn't replace sandboxing, permissions, or review. If a task pauses, review the findings when available and resume only after checking. In Codex CLI and mobile, and with zero data retention, Modified Abuse Monitoring, or non-US data storage residency, full findings and resume aren't available and the task ends. Safety monitoring evaluates model behavior during a task; automatic approval review evaluates individual actions that already require approval.
- Network access defaults: the agent runs with network turned off; `workspace-write` keeps it off unless `sandbox_workspace_write.network_access = true`. Combinations: network off + `network_proxy` on = stays off; network on + proxy off = unrestricted direct outbound; network on + proxy on = constrained by policy. A permission profile's `network.enabled = true` grants command network access while `features.network_proxy = true` activates enforcement of its domain rules. Admin-managed `experimental_network` requirements can start sandboxed networking without `features.network_proxy`, but don't turn network access on. One-off: `codex -c 'features.network_proxy=true' -c 'sandbox_workspace_write.network_access=true'`.
- The proxy filters scripts, programs, and child processes inside the local command sandbox. It does not filter web search, app/connector tool calls, MCP server connections, browser or Computer Use activity, Codex cloud tasks, or the client's model and authentication requests. Combine with `allowed_web_search_modes`, approved `mcp_servers`, and feature requirements for managed users. Approved full sandbox escalation can bypass the command proxy where policy permits.
- Defaults and recommendations: Codex detects version-controlled folders and recommends `Auto` (workspace write + on-request); non-version-controlled folders get `read-only`; it may start in `read-only` until you trust the directory. The workspace includes the current directory and temporary directories like `/tmp` (see `/status`). Switch to read-only with `/permissions`. Protected paths in writable roots (recursive, read-only): `.git` (and the resolved Git directory for a pointer file), `.agents`, `.codex`, `.aws`.
- Run without prompts: `--ask-for-approval never` / `-a never` works with all `--sandbox` modes; `--sandbox danger-full-access` (or `--dangerously-bypass-approvals-and-sandbox`) allows edits and network without prompts. Granular policy keeps selected prompt categories interactive and auto-rejects others. Destructive app/MCP tool calls always require approval when the tool advertises a destructive annotation (unless it advertises a read annotation, which takes priority).
- Automatic approval reviews: set `approvals_reviewer = "auto_review"` (with `on-request` or granular policy) to route eligible requests to a reviewer agent; the reviewer evaluates only actions that already need approval (sandbox escalations, blocked network requests, `request_permissions`, side-effecting app/MCP calls). Policy checks data exfiltration, credential probing, persistent security weakening, and destructive actions; critical-risk actions are denied; prompt-build, review-session, and parse failures fail closed; timeouts are surfaced but the action doesn't run. Enterprises can replace the tenant-specific policy section with `guardian_policy_config`; local `[auto_review].policy` is supported but managed requirements take precedence. It uses extra model calls (admins can constrain it with `allowed_approvals_reviewers`).
- Monitoring and telemetry (OTel): off by default; `[otel]` with `environment`, `exporter` (`none` | `otlp-http` | `otlp-grpc`), `log_user_prompt = false`. `exporter = "none"` leaves instrumentation active but sends nothing. Keep `log_user_prompt = false` unless policy permits storing prompts; route telemetry only to collectors you control; with CLI network off the exporter can't reach the collector. Events: `codex.conversation_starts`, `codex.api_request`, `codex.sse_event`, `codex.websocket_request` / `codex.websocket_event`, `codex.user_prompt`, `codex.tool_decision`, `codex.tool_result`; metrics include `codex.api_request`, `codex.sse_event`, `codex.websocket.request`, `codex.websocket.event`, `codex.tool.call` (+ `.duration_ms`).
- Managed configuration: enterprise admins can configure Codex security settings for their workspace (see managed-configuration.md in the administration category).
- Windows: native sandbox supports MXC, with `elevated` and `unelevated` as legacy fallbacks; set `[features] prefer_mxc = true` and keep a permitted legacy implementation in `windows.sandbox`. IDE extension on Windows: `"chatgpt.runCodexInWindowsSubsystemForLinux": true` keeps the agent inside WSL2.
- Containers: in Docker the Linux sandbox may fail if namespace, setuid `bwrap`, or `seccomp` operations are blocked; provide isolation in the container and run `codex --sandbox danger-full-access` inside it. Dev Containers don't prevent every attack: with `danger-full-access`, a malicious project can exfiltrate anything inside the devcontainer, including Codex credentials; use only with trusted repositories.
- Version control: work on a feature branch with clean `git status`, prefer patch-based workflows, commit frequently, and review Codex changes like any PR.

- Codex uses different sandbox mechanisms per surface: Codex cloud runs isolated containers (two-phase: networked setup, then offline agent phase unless internet access is enabled); local CLI/IDE use OS-level enforcement.
- Protected paths remain read-only even in `workspace-write`: `<root>/.git`, `<root>/.agents`, `<root>/.codex` (recursively).
- OS enforcement: macOS uses Seatbelt (`sandbox-exec`); Linux/WSL2 use `bwrap` + `seccomp` (WSL1 was supported through Codex 0.114; unsupported since 0.115); native Windows uses MXC with `elevated` / `unelevated` as legacy fallbacks (see windows-sandbox.md).
- Network policy is allowlist-first: exact hosts match only themselves, `*.example.com` matches subdomains only, `**.example.com` matches apex + subdomains, global `*` is allow-only, `deny` always wins.
- Local/private destinations are blocked by default (`allow_local_binding = false`); DNS-rebinding checks block hostnames resolving to non-public addresses.
- Two `dangerously_*` settings widen the trust boundary and should be used only in tightly controlled environments: `dangerously_allow_non_loopback_proxy`, `dangerously_allow_all_unix_sockets`.
- **This page and `sandboxing.md` describe the older `sandbox_mode` / `sandbox_workspace_write` / `features.network_proxy` model.** As of Codex 0.138.0 it does not compose with the newer `default_permissions` / `[permissions.<name>]` profile system in `permissions.md` — only one system is active per session. Codex falls back to this older model whenever `sandbox_mode` appears in any loaded config, `--sandbox` is passed, or the selected profile sets `sandbox_mode`; the exception is managed `allowed_permission_profiles`, which forces the profile system.
- Dev Containers can supply the outer isolation boundary when the host cannot run the Linux sandbox directly; see the `openai/codex` `.devcontainer` secure example.
- Opt-in OpenTelemetry (`[otel]`) can log tool approval decisions and results (off by default); keep `log_user_prompt = false` unless policy allows storing prompt text.
- This page is distinct from "Codex Security", OpenAI's separate product for scanning connected GitHub repositories (`docs/security/*`) — not covered in this category.
- The table uses the CLI reference's singular `--permission-profile`; the official guide writes `--permissions-profile` (plural). The two sources disagree; the singular form is the one verified against the command-line options listing (`--permission-profile, -P <NAME>`).

## Related

- [Permission profiles](./permission-profiles.md)
- [Sandbox](./sandbox.md)
- [Auto-review](./auto-review.md)
- [Windows sandbox](./windows-sandbox.md)
