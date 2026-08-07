<!-- source: https://code.claude.com/docs/en/plugin-marketplaces.md / last verified: 2026-08-07 -->

# Plugin marketplace manifest (marketplace.json)

A `.claude-plugin/marketplace.json` catalog listing plugins by relative path and by GitHub source, plus the commands to register and install from it.

```json .claude-plugin/marketplace.json
{
  "name": "company-tools",
  "owner": { "name": "DevTools Team", "email": "devtools@example.com" },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0"
    },
    {
      "name": "deployment-tools",
      "source": { "source": "github", "repo": "company/deploy-plugin" },
      "description": "Deployment automation tools"
    }
  ]
}
```

```shell
/plugin marketplace add ./my-marketplace
/plugin install quality-review-plugin@my-plugins
```

## Notes

- `name` and `owner.name` are required at the marketplace level; each plugin entry requires `name` and `source`.
- `source` types: relative path (resolved from marketplace root, no `..`), `github` (`repo`, `ref?`, `sha?`), `url`, `git-subdir`, `npm`.
- `strict: true` (default) means the target plugin's own `plugin.json` is the authority; `strict: false` makes the marketplace entry the entire plugin definition.
- Version resolution order: `plugin.json` `version` → marketplace entry `version` → git commit SHA. Validate before publishing with `claude plugin validate .` (`--strict` treats warnings as errors).
- This is a Claude Code CLI feature; not part of the Claude API or Agent SDK.
