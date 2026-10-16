<!-- source: https://code.claude.com/docs/en/plugins/marketplace-reference.md (example: https://code.claude.com/docs/en/plugins/create-marketplace.md) / last verified: 2026-10-17 -->

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

An `archive` plugin source (Claude Code v2.1.224+):

```json
{
  "name": "formatter",
  "source": {
    "source": "archive",
    "url": "https://artifacts.example.com/formatter-2.0.0.zip",
    "sha256": "6bfa50e3d2e00c052b46abe51fff89346ac803e45771f76dcf6df1ab74cca5e1"
  }
}
```

## Notes

- `name` and `owner.name` are required at the marketplace level; each plugin entry requires `name` and `source`. A plugin `name` allows letters, digits, `.`, `_`, and `-`, and must start with a letter or digit; `claude plugin validate` fails other names.
- Plugin `source` types: relative path (starts with `./`, resolved from marketplace root), `github`, `url`, `git-subdir`, `npm`, `archive` (`url`, `sha256`; zip over HTTPS; v2.1.224+), `command` (`command`, `timeout`, `mode`; prints the plugin directory path; v2.1.229+).
- Marketplace-level fields: `renames` (map from a former plugin name to its current name, or `null` for a removed plugin), `forceRemoveDeletedPlugins` (uninstall plugins removed from `plugins`), `metadata.pluginRoot` (directory that bare plugin source names such as `"formatter"` resolve under; v2.1.239+), `allowCrossMarketplaceDependenciesOn` (marketplace names whose plugins may be installed as dependencies).
- `strict: true` (default) means the target plugin's own `plugin.json` is the authority; `strict: false` makes the marketplace entry the entire plugin definition. Validate with `claude plugin validate .` (`--strict` treats warnings as errors).
- This is a Claude Code CLI feature; not part of the Claude API or Agent SDK.
