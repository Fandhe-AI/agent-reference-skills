<!-- source: https://code.claude.com/docs/en/security-guidance.md / last verified: 2026-10-16 -->

# security-guidance plugin

Official plugin that has Claude review its own code changes for common vulnerabilities while it works, and fix what it finds in the same session.

## Signature / Usage

```text
/plugin install security-guidance@claude-plugins-official
/reload-plugins
```

```json
// .claude/settings.json — enable in cloud sessions / for a whole repo
{ "enabledPlugins": { "security-guidance@claude-plugins-official": true } }
```

## Options / Props

| Review layer | Trigger | Model call | What it catches |
|---|---|---|---|
| Per-edit pattern check | `PostToolUse` on Edit/Write/NotebookEdit | No (regex/substring match) | `eval(`, `os.system`, `pickle`, `dangerouslySetInnerHTML`, `.github/workflows/` edits |
| End-of-turn diff review | `Stop` hook, runs in background | Yes (separate Claude call) | Authz bypass, IDOR, injection, SSRF, weak crypto |
| Commit/push review | `PostToolUse` on `git commit`/`git push` via Bash | Yes (agentic, reads surrounding code) | Deeper, context-aware findings; capped at 20/rolling hour |

| Env var | Effect |
|---|---|
| `ENABLE_PATTERN_RULES=0` | Disable per-edit check |
| `ENABLE_STOP_REVIEW=0` | Disable end-of-turn review |
| `ENABLE_COMMIT_REVIEW=0` | Disable commit/push review |
| `ENABLE_CODE_SECURITY_REVIEW=0` | Disable all model-backed reviews |
| `SECURITY_GUIDANCE_DISABLE=1` | Disable the plugin entirely |
| `SECURITY_REVIEW_MODEL` / `SG_AGENTIC_MODEL` | Override the model used for end-of-turn / commit review (default Opus 4.7) |

Custom rule files (additive only, cannot remove built-in checks):

- `.claude/claude-security-guidance.md` (or `~/.claude/...`, `.claude/claude-security-guidance.local.md`) — plain-language guidance for model-backed reviews, 8 KB combined cap.
- `.claude/security-patterns.yaml` (or `.yml`/`.json`) — up to 50 custom `rule_name`/`regex`/`substrings`/`paths`/`exclude_paths`/`reminder` entries for the per-edit check.

## Notes

- Prerequisites: Python 3.7+ on PATH (3.10+ for the agentic commit review, and for all model-backed reviews on a third-party provider), a git repository (end-of-turn/commit reviews skip silently otherwise). The page states no minimum Claude Code version. Available on all plans.
- On first run the plugin creates a virtual environment under `~/.claude/security/` and installs the Claude Agent SDK into it (needs `pip` and network access). If that fails or Python is older than 3.10, the commit review on first-party authentication falls back to a single-shot review; on a third-party provider the model-backed reviews skip.
- With no Anthropic authentication and no third-party provider configured, the model-backed reviews skip and only the per-edit pattern check runs.
- None of the layers block writes or commits; findings are fed back to Claude as instructions to fix in-session. Treat as one layer of defense in depth, not a complete solution.
- Fits into a stack alongside `/security-review` (single-pass, on demand), the Claude Security plugin (multi-agent deep scan), and Code Review (PR-time, Team/Enterprise).
- Diagnostics: `~/.claude/security/log.txt`.

## Related

- [claude-security](./claude-security.md)
- [security](./security.md)
