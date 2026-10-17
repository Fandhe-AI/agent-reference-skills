# Auto-review

Replaces manual approval at the sandbox boundary with a separate reviewer agent. The main Codex agent still runs inside the same sandbox with the same approval policy and network/filesystem limits; only who reviews eligible escalation requests changes.

## Signature / Usage

```toml
approval_policy    = "on-request"
approvals_reviewer = "auto_review"

[auto_review]
policy = """
YOUR POLICY GOES HERE
"""
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `approvals_reviewer` | `user` \| `auto_review` | Routes eligible approval requests to a reviewer agent instead of a human. Only applies when approvals are interactive (`on-request` or a granular policy that still surfaces the prompt); does nothing under `approval_policy = "never"`. |
| `[auto_review].policy` | string (TOML multiline) | Local override of the reviewer policy text; managed enterprise `guardian_policy_config` requirements take precedence. |
| `/approve` (TUI) | command | Opens the Auto-review Denials picker to approve one recently denied action for a single retry. |
| `--approve-for-me`, `--not-so-yolo` | CLI flag | Use automatic approval review with `on-request` approvals and the `workspace-write` sandbox. Conflicts with `--sandbox` and `--yolo`; the interactive CLI also rejects `--ask-for-approval`. |
| `[auto_review].extra_policy` | string | Additional local Markdown policy alongside the main policy; managed `guardian_extra_policy` takes precedence. |
| `guardian_policy_config` / `guardian_extra_policy` | managed string | Managed reviewer policy / extra policy in `requirements.toml`. |
| `allowed_approvals_reviewers`, `allowed_approval_policies`, `allowed_sandbox_modes`, `allowed_permission_profiles` | managed requirements | Constrain the reviewer, approval policy, sandbox modes, and permission profiles for an engagement. |

## Notes

- Selecting automatic review: in the desktop app choose **Approve for me** from the permissions control below the composer. For the CLI or local config, set `approvals_reviewer = "auto_review"` with an eligible interactive policy such as `approval_policy = "on-request"` (changing the policy alone doesn't select the reviewer). Managed requirements take precedence over local settings. In the desktop app, selecting an approved Daybreak model (also via `/model`) automatically switches the permissions control to **Approve for me** when available and allowed by policy; model selection never overrides managed requirements. Before enabling **Full Access** for an approved security model, the app shows a model-specific warning recommending **Approve for me**; it doesn't restore the sandbox boundary or override policy.
- Flow: the main agent works inside `read-only` or `workspace-write`, requests approval to cross the boundary, a separate reviewer agent decides and returns a rationale; if approved execution continues, if denied the main agent must find a materially safer path or stop and ask. Auto-review is a reviewer swap, not a permission grant: it doesn't expand `writable_roots`, enable network access, or weaken protected paths.
- `/approve` override: Codex records up to 10 recent denials per task; approval applies to the exact denied action for one retry in the same context, and the retry still goes through Auto-review (it can deny again if policy forbids overriding that class of denial). Timeouts are surfaced separately from denials and aren't proof an action is unsafe.
- Reviewer: a Codex agent with a narrower job; it can also perform read-only checks to gather context, rarely. Policy sources: `policy_template.md` and `policy.md` under `codex-rs/core/src/guardian/` in `openai/codex`. To customize, copy the whole default policy wording first, then iterate.
- Authorized cybersecurity engagement: combine automatic review with a written engagement scope and a least-privilege permission profile. Both `[auto_review].policy` and `guardian_policy_config` replace (don't merge with) the current reviewer policy; built-in review instructions and response format still apply. Copy the complete current policy, keep every existing rule, and append sections such as `## Environment Profile` (authorized target, approved actions) and `## Tenant Risk Taxonomy and Allow/Deny Rules` (allow only approved actions against the documented target; deny out-of-scope hosts, production access, credential theft, persistence, data exfiltration, destructive operations, policy bypass, and ambiguous/high-impact actions until explicitly approved). If you can't access the current policy, don't override it. Enforce target restrictions with independent filesystem and network rules. Managed example: `allowed_approval_policies = ["on-request"]`, `allowed_approvals_reviewers = ["auto_review"]`, `allowed_sandbox_modes = ["read-only", "workspace-write"]`, `default_permissions = ":workspace"`, `guardian_policy_config = """..."""`, and `[allowed_permission_profiles] ":read-only" = true, ":workspace" = true` (`:danger-full-access` omitted = denied). With `approval_policy = "never"`, `:danger-full-access`, or `--yolo`, an action can avoid creating the boundary-crossing approval request review requires. A network destination on the allowlist doesn't trigger review by itself; add command rules with `decision = "prompt"` or require approval on sensitive MCP tools when in-sandbox actions must reach the reviewer.
- Reduce review volume without weakening security: fix the boundary first. Add narrow `writable_roots` for scratch directories or neighboring repos, and narrow prefix rules (`["cargo", "test"]`, `["pnpm", "run", "lint"]` rather than `["python"]` / `["curl"]`).
- Limits: it only evaluates eligible approval requests (including those triggered by explicit command rules or tool approval settings), can still make mistakes in adversarial or unusual contexts, and complements, not replaces, good sandbox design, monitoring, and organization-specific policy.

- Triggers on: shell/exec calls requesting escalated sandbox permissions, network requests blocked by policy, file edits outside writable roots, MCP/app tool calls requiring approval, and Computer Use access to a new domain. Does not run for actions already allowed inside the sandbox. Computer Use app approvals still surface directly to the user.
- Blocks (at a high level): sending private data/secrets/credentials to untrusted destinations, credential probing, broad/persistent security weakening, and destructive irreversible actions. Low/medium risk actions may proceed per policy; critical risk is always denied; high risk requires user authorization and no matching deny rule. Prompt-build, review-session, and parse failures fail closed.
- Denials are stronger than ordinary sandbox errors: the main agent is instructed not to pursue the same outcome via workaround and to find a materially safer path or stop and ask the user.
- Rejection circuit breaker: interrupts the turn after 3 consecutive denials or 10 denials within the last 50 reviews in that turn; any non-denial resets the consecutive counter.
- The reviewer sees a compact transcript plus the exact approval request (user messages, surfaced updates, relevant tool calls/outputs) — not hidden assistant chain-of-thought.
- Default policy source: `codex-rs/core/src/guardian/policy.md` (and `policy_template.md`) in the `openai/codex` repo. Enterprises replace its tenant-specific section via `guardian_policy_config`; per-user `[auto_review].policy` is supported but managed requirements win.
- Session transcripts are retained under `~/.codex/sessions` by default.
- Not a deterministic security guarantee — complements, not replaces, sandbox design and monitoring.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Sandbox](./sandbox.md)
