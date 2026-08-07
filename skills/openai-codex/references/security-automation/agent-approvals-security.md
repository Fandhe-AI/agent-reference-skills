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
approval_policy = "untrusted"
sandbox_mode    = "read-only"
allow_login_shell = false  # optional hardening

[sandbox_workspace_write]
network_access = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sandbox_mode` | `read-only` \| `workspace-write` \| `danger-full-access` | What Codex can technically do (where it can write, whether it can reach the network) when executing model-generated commands. |
| `approval_policy` | `untrusted` \| `on-request` \| `never` \| `{ granular = { sandbox_approval = true, rules = true, mcp_elicitations = true, request_permissions = false, skill_approval = false } }` | When Codex must stop and ask before acting. Granular policy can toggle `sandbox_approval`, `rules`, `mcp_elicitations`, `request_permissions`, `skill_approval` independently. |
| `approvals_reviewer` | `user` (default) \| `auto_review` | Who reviews interactive approval requests. `auto_review` routes eligible requests to a reviewer agent instead of a human (see Auto-review). |
| `sandbox_workspace_write.network_access` | boolean | Enables network access in `workspace-write` mode (off by default). |
| `features.network_proxy.enabled` / `.domains` | boolean / table | Constrains already-enabled command network access to an allow/deny domain policy. Does not grant network access by itself. |
| `web_search` | `cached` (default) \| `live` \| `disabled` \| `indexed` | Controls the web search tool independently of full network access. |
| `--ask-for-approval never` / `-a never` | flag | Disables approval prompts; works with all `--sandbox` modes. |
| `codex sandbox macos\|linux\|windows [--permission-profile <name>] [COMMAND]...` | CLI | Test what a command would do under the sandbox locally (aliases: `codex debug`, `codex sandbox seatbelt`, `codex sandbox landlock`). |

## Notes

- Codex uses different sandbox mechanisms per surface: Codex cloud runs isolated containers (two-phase: networked setup, then offline agent phase unless internet access is enabled); local CLI/IDE use OS-level enforcement.
- Protected paths remain read-only even in `workspace-write`: `<root>/.git`, `<root>/.agents`, `<root>/.codex` (recursively).
- OS enforcement: macOS uses Seatbelt (`sandbox-exec`); Linux/WSL2 use `bwrap` + `seccomp` (WSL1 unsupported since Codex 0.115); native Windows uses the Windows sandbox (`elevated`/`unelevated`, see windows-sandbox.md).
- Network policy is allowlist-first: exact hosts match only themselves, `*.example.com` matches subdomains only, `**.example.com` matches apex + subdomains, global `*` is allow-only, `deny` always wins.
- Local/private destinations are blocked by default (`allow_local_binding = false`); DNS-rebinding checks block hostnames resolving to non-public addresses.
- Two `dangerously_*` settings widen the trust boundary and should be used only in tightly controlled environments: `dangerously_allow_non_loopback_proxy`, `dangerously_allow_all_unix_sockets`.
- **This page and `sandboxing.md` describe the older `sandbox_mode` / `sandbox_workspace_write` / `features.network_proxy` model.** As of Codex 0.138.0 it does not compose with the newer `default_permissions` / `[permissions.<name>]` profile system in `permissions.md` — only one system is active per session. Codex falls back to this older model whenever `sandbox_mode` appears in any loaded config, `--sandbox` is passed, or the selected profile sets `sandbox_mode`; the exception is managed `allowed_permission_profiles`, which forces the profile system.
- Dev Containers can supply the outer isolation boundary when the host cannot run the Linux sandbox directly; see the `openai/codex` `.devcontainer` secure example.
- Opt-in OpenTelemetry (`[otel]`) can log tool approval decisions and results (off by default); keep `log_user_prompt = false` unless policy allows storing prompt text.
- This page is distinct from "Codex Security", OpenAI's separate product for scanning connected GitHub repositories (`docs/security/*`) — not covered in this category.
- The official guide (this page) writes the flag as `--permissions-profile` (plural), while the CLI reference (`/docs/cli/reference`) lists `-P, --permission-profile <NAME>` (singular, alongside a separate `-p, --profile <NAME>`); the singular form is authoritative.

## Related

- [Permission profiles](./permission-profiles.md)
- [Sandbox](./sandbox.md)
- [Auto-review](./auto-review.md)
- [Windows sandbox](./windows-sandbox.md)
