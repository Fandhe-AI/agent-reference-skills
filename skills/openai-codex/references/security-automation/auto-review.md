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

## Notes

- Triggers on: shell/exec calls requesting escalated sandbox permissions, network requests blocked by policy, file edits outside writable roots, MCP/app tool calls requiring approval, and Computer Use access to a new domain. Does not run for actions already allowed inside the sandbox. Computer Use app approvals still surface directly to the user.
- Blocks (at a high level): sending private data/secrets/credentials to untrusted destinations, credential probing, broad/persistent security weakening, and destructive irreversible actions. Low/medium risk actions may proceed per policy; critical risk is always denied; high risk requires user authorization and no matching deny rule. Prompt-build, review-session, and parse failures fail closed.
- Denials are stronger than ordinary sandbox errors: the main agent is instructed not to pursue the same outcome via workaround and to find a materially safer path or stop and ask the user.
- Rejection circuit breaker: interrupts the turn after 3 consecutive denials or 10 denials within the last 50 reviews in that turn; any non-denial resets the consecutive counter.
- The reviewer sees a compact transcript plus the exact approval request (user messages, surfaced updates, relevant tool calls/outputs) — not hidden assistant chain-of-thought.
- Default policy source: `codex-rs/core/src/guardian/policy.md` in the `openai/codex` repo. Enterprises replace its tenant-specific section via `guardian_policy_config`; per-user `[auto_review].policy` is supported but managed requirements win.
- Reduce noisy reviews by narrowing the sandbox boundary first (add scoped `writable_roots`, precise command-prefix rules) rather than teaching the reviewer to approve broad escalations.
- Session transcripts are retained under `~/.codex/sessions` by default.
- Not a deterministic security guarantee — complements, not replaces, sandbox design and monitoring.

## Related

- [Agent approvals & security](./agent-approvals-security.md)
- [Sandbox](./sandbox.md)
