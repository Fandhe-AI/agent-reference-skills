<!-- source: https://code.claude.com/docs/en/plugin-marketplaces.md / last verified: 2026-08-07 -->

# Create and distribute a plugin marketplace

Build and host plugin marketplaces to distribute Claude Code extensions across teams and communities.

## Signature / Usage

```json
// .claude-plugin/marketplace.json
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

## Options / Props

### marketplace.json required fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Marketplace identifier (kebab-case); one registration per name per user |
| `owner` | object | `name` required; `email`, `url` optional |
| `plugins` | array | List of plugin entries |

### Plugin entry fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Required, kebab-case |
| `source` | string \| object | Required — see source types below |
| `strict` | boolean | Default `true`: `plugin.json` is authority. `false`: marketplace entry is the entire definition |
| `relevance` | object | Contextual install-suggestion signals |
| `defaultEnabled` | boolean | Whether enabled after install (default `true`) |

### Plugin source types

| Source | Fields | Notes |
| --- | --- | --- |
| Relative path | `"./my-plugin"` | Resolved from marketplace root; no `..` |
| `github` | `repo`, `ref?`, `sha?` | |
| `url` | `url`, `ref?`, `sha?` | Any git host |
| `git-subdir` | `url`, `path`, `ref?`, `sha?` | Sparse clone of a monorepo subdirectory |
| `npm` | `package`, `version?`, `registry?` | Installed via `npm install` |

## Notes

- Reserved marketplace names (e.g. `claude-plugins-official`, `claude-code-plugins`, `anthropic-marketplace`) cannot be used by third parties; impersonating names are also blocked.
- Version resolution order: `plugin.json` `version` → marketplace entry `version` → git commit SHA. Omitting `version` on a git-based source makes every commit a new version.
- Rename/remove a plugin safely via a top-level `renames` map (`{"old-name": "new-name-or-null"}`) so existing installs migrate instead of erroring `plugin-not-found`.
- `metadata.pluginRoot` lets entries use short relative sources (e.g. `"formatter"` instead of `"./plugins/formatter"`).
- Validate with `claude plugin validate .` (marketplace) or `claude plugin validate ./plugins/my-plugin` (individual plugin) before publishing; `--strict` treats warnings as errors.
- Administrators restrict which marketplaces can be added via `strictKnownMarketplaces` in managed settings (undefined = no restriction, `[]` = complete lockdown, populated = allowlist by `github`/`url`/`hostPattern`/`pathPattern`).
- URL-based marketplaces (direct `marketplace.json` URL) only fetch that file — relative-path plugin sources fail; use GitHub/npm/git-URL sources instead for URL-based distribution.

## Related

- [Discover and install plugins](./discover-plugins.md)
- [Plugins reference](./plugins-reference.md)
- [Constrain plugin dependency versions](./plugin-dependencies.md)
- [Recommend plugins for your org](./plugin-relevance.md)
