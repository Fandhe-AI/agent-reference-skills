# GitHub PR Review Agent

Tutorial: poll repos on a cron schedule, review new PRs with `gh` and a review skill, and deliver feedback (no public endpoint needed).

## Signature / Usage

Prerequisites: gateway running (`hermes gateway install` or `hermes gateway`), `gh` installed and authenticated (`gh auth login`).

Review skill at `~/.hermes/skills/code-review/SKILL.md`:

```markdown
---
name: code-review
description: Review pull requests for bugs, security issues, and code quality
---

# Code Review Guidelines

## What to Check
1. **Bugs** — Logic errors, off-by-one, null/undefined handling
2. **Security** — Injection, auth bypass, secrets in code, SSRF
3. **Performance** — N+1 queries, unbounded loops, memory leaks
4. **Style** — Naming conventions, dead code, missing error handling
5. **Tests** — Are changes tested? Do tests cover edge cases?

## Rules
- End with: APPROVE / REQUEST_CHANGES / COMMENT
```

Cron job:

```bash
hermes cron create "0 */2 * * *" \
  "Check for new open PRs and review them.
Repos to monitor:
- myorg/backend-api
Steps:
1. Run: gh pr list --repo REPO --state open --limit 5 --search "sort:updated-desc" --json number,title,author,createdAt,updatedAt
2. For each PR created or updated in the last 4 hours:
   - Run: gh pr diff NUMBER --repo REPO
   - Review the diff using the code-review guidelines
If no new PRs found, say: No new PRs to review." \
  --name "pr-review" \
  --deliver telegram \
  --skill code-review

hermes cron run pr-review
```

To post directly to GitHub, add to the prompt: `gh pr review NUMBER --repo REPO --comment --body "..."` (or `--request-changes` / `--approve`).

## Options / Props

| Schedule | When |
|----------|------|
| `0 */2 * * *` | Every 2 hours |
| `0 9,13,17 * * 1-5` | Three times a day, weekdays |
| `0 9 * * 1` | Weekly Monday roundup |
| `every 30m` | Every 30 minutes |

## Notes

- Teach conventions via memory ("Remember: In our backend repo...") so the reviewer enforces them persistently.
- `deliver: "local"` saves reviews to `~/.hermes/cron/output/`.
- `gh` needs a token with `repo` scope when posting reviews; reviews appear as the authenticated user.
- "gh: command not found": the gateway runs a minimal environment; ensure `gh` is on the system PATH and restart the gateway.
- If a job does not run: `hermes gateway status`, `hermes cron list`.
- GitHub allows 5,000 authenticated API requests/hour; each review uses ~3-5.
- For real-time reviews use the webhook approach (requires a public endpoint).
- The upstream table (v0.22.2) lists `30m` as Every 30 minutes, matching the user-guide Cron page (bare durations are recurring); the table above uses the explicit `every 30m`.
- The upstream guide (v0.22.2) lists bare `30m`/`1d` as one-shot elsewhere (and says natural language is unsupported); the user-guide Cron page states bare durations are recurring and one-shots need the `in` prefix — this page follows the user guide.
- Adapted: the upstream prompt (v0.22.2) fetches only createdAt; updatedAt and sort:updated-desc were added so PRs updated in the window are not missed.
- Source: https://hermes-agent.nousresearch.com/docs/guides/github-pr-review-agent (pinned to v0.22.2)

## Related

- [webhook-github-pr-review](./webhook-github-pr-review.md)
- [daily-briefing-bot](./daily-briefing-bot.md)
- [automate-with-cron](./automate-with-cron.md)
