<!-- source: https://code.claude.com/docs/en/settings.md / last verified: 2026-08-07 -->

# Minimal settings.json

A minimal project `settings.json` combining permission rules and environment variables.

```json .claude/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)", "Read(~/.zshrc)"],
    "deny": ["Bash(curl *)", "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf"
  },
  "companyAnnouncements": ["Welcome to Acme Corp! Review our code guidelines at docs.acme.com"]
}
```

## Notes

- `.claude/settings.json` is checked into source control (shared with the team); `.claude/settings.local.json` is for personal, gitignored overrides at the same repo root.
- Precedence, highest to lowest: managed settings > command-line arguments > local > project > user.
- Permission rules merge across scopes rather than override each other.
- Most keys (including `permissions` and `env`) reload live without a restart; `model` and `outputStyle` apply only on next restart or `/clear`.
- Run `/config` for an interactive settings UI, or `/config key=value` to change one option directly.
- Example from the Claude Code docs (code.claude.com) `settings` page.
