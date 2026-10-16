<!-- source: https://code.claude.com/docs/en/claude-security.md / last verified: 2026-10-16 -->

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

Output directory per scan: `CLAUDE-SECURITY-<timestamp>/` containing `CLAUDE-SECURITY-RESULTS.md`, `CLAUDE-SECURITY-RESULTS.jsonl`, `CLAUDE-SECURITY-RESULTS.sarif` (SARIF 2.1.0 log, findings classified under CWE categories), `CLAUDE-SECURITY-REVISION-<commit>.json` (`UNVERSIONED` outside version control), and a `patches/` folder — carries its own `.gitignore` so a stray `git add` doesn't sweep it into a commit.

## Notes

- Prerequisites: a paid plan, Anthropic API access, or a third-party provider (for the dynamic workflows the scan uses; on Pro, turn them on from the Dynamic workflows row in `/config`); Python 3.9 or later as `python3` on PATH (standard library only, nothing is installed); Linux/macOS/Windows; git for change scans and patching (a full scan works in any directory).
- Models and providers: the plugin makes no model calls of its own, so there is no separate API key or provider setting. The vulnerability-hunting, verification, and patch agents run on the session's model (change it with `/model` before scanning); a few supporting steps such as mapping the repository use the `sonnet` alias. On third-party providers the `sonnet` alias can resolve to a different version, so pin `ANTHROPIC_DEFAULT_SONNET_MODEL` if your account can't use it. Automatic model fallback can end with a refusal message instead on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, depending on how the deployment is set up.
- On a Fable model, a "safeguards flagged this message" notice is expected: Fable's cybersecurity classifiers flag some requests and Claude Code re-runs them on an Opus model through automatic model fallback; the scan should still complete.
- Scans are nondeterministic — two scans of the same code can surface different findings; use the revision stamp to tie a report to exact code and settings.
- Findings only appear after independent verifier agents analyze them; patches are drafted in a scratch copy and reviewed by an agent independent of the one that wrote them (runs project tests when available).
- Works best in auto mode, which lets scan agents proceed without a permission prompt at each step.
- Distinct from `security-guidance` (in-session, as-you-write review) and `/security-review` (single-pass branch review); the managed **Claude Security** product (Enterprise) is a separate hosted service that monitors repositories continuously.

## Related

- [security-guidance](./security-guidance.md)
- [security](./security.md)
