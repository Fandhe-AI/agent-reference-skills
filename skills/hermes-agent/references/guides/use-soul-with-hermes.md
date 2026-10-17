# Use SOUL.md with Hermes

`SOUL.md` is the primary identity of a Hermes instance: slot #1 in the system prompt, defining voice, tone, and style.

## Signature / Usage

Location: `~/.hermes/SOUL.md` (or `$HERMES_HOME/SOUL.md` with a custom home).

```markdown
You are direct, calm, and technically precise.
Prefer substance over politeness theater.
Push back clearly when an idea is weak.
Keep answers compact unless deeper detail is useful.
```

Suggested structure:

```markdown
# Identity
Who Hermes is.

# Style
How Hermes should sound.

# Avoid
What Hermes should not do.

# Defaults
How Hermes should behave when ambiguity appears.
```

Edit with `nano ~/.hermes/SOUL.md`, then restart Hermes or start a new session.

## Notes

- Use SOUL.md for tone, personality, communication style, directness; use `AGENTS.md` for repo-specific conventions, file paths, commands, ports, architecture.
- Hermes seeds a starter SOUL.md if none exists and never overwrites an existing one. An empty file adds nothing to the prompt.
- At session start it reads the file, scans for prompt-injection patterns, truncates if needed, and uses it as the agent identity, replacing the built-in default identity text. No wrapper language is added.
- A scanner hit does not block SOUL.md (unlike project `AGENTS.md`): it still loads, a warning is logged, and `/context` shows `⚠ … review the file`.
- Missing, empty, or unloadable file falls back to the built-in default identity.
- `/personality` is for temporary mode switches layered over the durable SOUL.md baseline.
- Troubleshooting: check you edited the global file (not a repo-local one), the file is non-empty, the session restarted, no `/personality` overlay dominates, the file is not conflicting or truncated.
- Source: https://hermes-agent.nousresearch.com/docs/guides/use-soul-with-hermes (pinned to v0.22.2)

## Related

- [team-telegram-assistant](./team-telegram-assistant.md)
- [tips](./tips.md)
