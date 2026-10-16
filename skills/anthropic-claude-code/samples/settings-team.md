<!-- source: https://code.claude.com/docs/en/settings-example.md / last verified: 2026-10-17 -->

# Team Shared settings.json

A repository-committed `.claude/settings.json` that gives every clone the same permissions, a hook, a plugin marketplace, and a sandbox.

```json .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)"
    ],
    "ask": [
      "Bash(git push *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PROJECT_DIR}\"/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    }
  },
  "enabledPlugins": {
    "code-formatter@acme-tools": true
  },
  "sandbox": {
    "enabled": true,
    "filesystem": {
      "allowWrite": [
        "/tmp/build"
      ]
    },
    "network": {
      "allowedDomains": [
        "registry.npmjs.org",
        "*.example.com"
      ]
    }
  },
  "plansDirectory": "./plans"
}
```

## Notes

- Allow rules and `extraKnownMarketplaces` take effect only after each person trusts the folder itself (not just a parent folder); deny and ask rules apply in every session.
- Cloud sessions start from a clone of the repository, so the committed file applies there too.
- Telemetry (OpenTelemetry exporter) variables in a repository's `env` are ignored apart from some values that turn telemetry off; set them in managed settings or `~/.claude/settings.json`.
- Rules match the command as written: `Bash(git push *)` does not match `git -C . push`. `Read(./.env)` alone does not stop `grep -r` over the directory; the `sandbox` block adds the `Read` deny paths to what sandboxed commands cannot read.
- The hook script `.claude/hooks/block-rm.sh` must exist in the repository.
- The official settings-example leaves `${CLAUDE_PROJECT_DIR}` unquoted; it is quoted here in case the path contains spaces or glob characters (exec form / `args` can also be used).
- Example from the Claude Code docs (code.claude.com) `settings-example` page.
