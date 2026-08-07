<!-- source: https://code.claude.com/docs/en/claude-security.md / last verified: 2026-08-07 -->

# Claude Security plugin

Official plugin that runs a multi-agent vulnerability scan of a codebase inside a Claude Code session — maps architecture, builds a threat model, hunts for vulnerabilities, and independently reviews every finding before turning it into a reviewable patch.

## Signature / Usage

```text
/plugin install claude-security@claude-plugins-official
/claude-security          # opens menu: scan codebase / scan changes / suggest patches
/claude-security scan my branch
```

```bash
git apply CLAUDE-SECURITY-<timestamp>/patches/F1.patch
```

## Options / Props

| Job | Scope | Notes |
|---|---|---|
| Scan codebase | Whole repo or a focused area | Needs confirmation; may take a while and use significant tokens |
| Scan changes | Branch diff, open PR, or single commit | Needs a git repo; only committed changes are scanned |
| Suggest patches | Chosen findings from a report | Reviewed by an independent agent before delivery; never applied automatically |

Output directory per scan: `CLAUDE-SECURITY-<timestamp>/` containing `CLAUDE-SECURITY-RESULTS.md`, `CLAUDE-SECURITY-RESULTS.jsonl`, `CLAUDE-SECURITY-REVISION-<commit>.json`, and a `patches/` folder — carries its own `.gitignore` so a stray `git add` doesn't sweep it into a commit.

## Notes

- Prerequisites: Claude Code v2.1.154+ on a paid plan (dynamic workflows), `python3` 3.9.6+ on PATH, Linux/macOS/Windows, git for change scans and patching.
- Scans are nondeterministic — two scans of the same code can surface different findings; use the revision stamp to tie a report to exact code and settings.
- Findings only appear after independent verifier agents analyze them; patches are drafted in a scratch copy and reviewed by an agent independent of the one that wrote them (runs project tests when available).
- Works best in auto mode, which lets scan agents proceed without a permission prompt at each step.
- Distinct from `security-guidance` (in-session, as-you-write review) and `/security-review` (single-pass branch review); the managed **Claude Security** product (Enterprise) is a separate hosted service that monitors repositories continuously.

## Related

- [security-guidance](./security-guidance.md)
- [security](./security.md)
