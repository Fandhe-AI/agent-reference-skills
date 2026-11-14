# Recommended configuration for cybersecurity workflows

Security controls for Daybreak Blue / Daybreak Red and other higher-risk cybersecurity workflows: isolation, least-privilege permission profiles, protected credentials, Auto-review, independent monitoring, and cleanup.

## Signature / Usage

Least-privilege permission profile limited to an approved lab (replace `lab.example.com` with an approved target):

```toml
approval_policy = "on-request"
approvals_reviewer = "auto_review"
default_permissions = "cyber-lab"

[features]
network_proxy = true

[permissions.cyber-lab]
description = "Limit security testing to the approved lab and workspace."
extends = ":workspace"

[permissions.cyber-lab.filesystem]
glob_scan_max_depth = 3

[permissions.cyber-lab.filesystem.":workspace_roots"]
"**/.env*" = "deny"
"**/*.pem" = "deny"

[permissions.cyber-lab.network]
enabled = true
# Uncomment only for an approved host that resolves to a private address.
# allow_local_binding = true

[permissions.cyber-lab.network.domains]
"lab.example.com" = "allow"
```

Force review of a sensitive command even when its destination is allowlisted (file under `~/.codex/rules/`, then restart Codex):

```python
prefix_rule(
    pattern = ["curl"],
    decision = "prompt",
    justification = "Review requests to the approved cybersecurity target.",
)
```

## Options / Props

| Topic | Recommendation |
| --- | --- |
| Isolate | Dedicated lab or sandbox; no unrestricted internet, production, corporate networks, or host-management interfaces; for higher-risk work use a fresh strongly isolated environment per attempt and destroy it afterward. Test filesystem and network boundaries first. |
| Boundaries | Document approved/excluded systems, tools, actions, times, data handling, disclosure and patch coordination, stop conditions; give them to the agent as task context, but enforce with independent filesystem, network, identity, and tool controls. |
| Credentials | Keep reusable keys and tokens out of prompts, repos, env vars, shared filesystems, and logs; use a broker for short-lived scoped credentials; block cloud metadata endpoints; treat model-generated files as untrusted. |
| Full access | Avoid `:danger-full-access` and `--yolo`; managed organizations can exclude them and require Auto-review via enterprise-managed configuration. |
| Auto-review prerequisites | An interactive approval policy such as `approval_policy = "on-request"`, `approvals_reviewer = "auto_review"`, and an enforceable sandbox or permission-profile boundary. |
| Human approval | Required for actions affecting production, external systems, sensitive data, privilege escalation, persistent access, or irreversible changes. |
| Monitoring | Log requests, tool calls, network activity, credential use, changes; keep logs, policy enforcement, credential brokers, review, and emergency shutdown outside the agent; fail closed. |
| Cleanup | Revoke temporary credentials, terminate processes, remove persistent access, destroy higher-risk environments; validate findings and follow coordinated disclosure. |

## Notes

- Most Daybreak Blue workflows may be covered by existing organizational practices; Daybreak Red, autonomous testing, and work on production systems, sensitive data, or external tools may need stronger safeguards. You remain responsible for assessing risk; model safeguards and Trusted Access do not replace your own controls.
- `network_proxy` enforces the approved domain; without it `network.enabled = true` permits direct network access and the allowlist does not restrict destinations. Web search, apps, connectors, MCP servers, browser activity, and Codex cloud use separate controls.
- A private-address lab host is blocked by default even if allowlisted; set `allow_local_binding = true` only for explicitly approved private-network work, or allowlist the exact private IP.
- `glob_scan_max_depth` bounds the filesystem scan (Linux, WSL, Windows); raise it or use exact deny paths if sensitive files sit deeper. Do not combine permission profiles with legacy `sandbox_mode`.
- Choose `:read-only` when no changes are needed, or extend `:workspace` when workspace edits are required.
- In the ChatGPT desktop app, selecting an approved Daybreak model (including via `/model`) switches permissions to **Approve for me** when available and allowed by organization policy; model selection never overrides managed requirements. Enabling **Full Access** shows a model-specific warning that does not restore the sandbox boundary.
- Requests to allowlisted network targets do not automatically trigger Auto-review; use a command rule as above (or `approval_mode = "prompt"` for individual MCP tools). With `approval_policy = "never"` or Full Access, a sensitive action may proceed without an approval request.
- Treat instructions embedded in websites, repositories, documents, and tool outputs as untrusted.
- Custom agent workflows (Responses API, Agents SDK, other harnesses) are not protected by Codex Auto-review; add review at the tool-execution boundary and fail closed. API safeguards can return `cyber_policy` errors; per-user `safety_identifier` values can limit the impact of a safeguard action.
- Source: https://learn.chatgpt.com/docs/cyber-safety/recommended-configuration (retrieved 2026-11-14).

## Related

- [Models and Trusted Access](./cyber-safety.md)
- [Auto-review](./auto-review.md)
- [Permission profiles](./permission-profiles.md)
- [Sandbox](./sandbox.md)
