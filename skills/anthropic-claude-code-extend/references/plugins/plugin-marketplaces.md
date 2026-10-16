<!-- source: https://code.claude.com/docs/en/plugins/create-marketplace.md / last verified: 2026-10-17 -->

# Create a marketplace

Build a plugin marketplace from a `marketplace.json` file and test it locally before you host it. A marketplace is a directory or repository with a `.claude-plugin/marketplace.json` file that lists your plugins and where to fetch each one; push it to a git host and anyone with access registers it with one command. Hosting, private access, renames and `forceRemoveDeletedPlugins` are in host-marketplace.md; the field details are in marketplace-reference.md.

## Signature / Usage

```json
// my-marketplace/.claude-plugin/marketplace.json
{
  "name": "my-marketplace",
  "description": "Plugins for my team",
  "owner": { "name": "Your Name" },
  "plugins": [
    {
      "name": "my-first-plugin",
      "source": "./plugins/my-first-plugin",
      "description": "A greeting plugin to learn the basics"
    }
  ]
}
```

```bash
mkdir -p my-marketplace/.claude-plugin my-marketplace/plugins
cp -r my-first-plugin my-marketplace/plugins/
claude plugin validate ./my-marketplace/plugins/my-first-plugin
claude plugin validate ./my-marketplace
claude plugin marketplace add ./my-marketplace
claude plugin install my-first-plugin@my-marketplace
claude plugin list
claude plugin details my-first-plugin
```

## Options / Props

Plugin entry fields that cover most entries (the full list is in marketplace-reference.md):

| Field | Description |
| --- | --- |
| `name` | The identifier people type before `@` when they install; required |
| `source` | Where Claude Code fetches the plugin from; required. A relative path string for a plugin inside the marketplace directory, or a source object for a plugin outside it |
| `description` | The line people see next to the plugin when they browse your marketplace in `/plugin` |

Plugin sources:

| Source | Use it when | Minimal `source` value |
| --- | --- | --- |
| Relative path | The plugin's files are inside the marketplace directory itself | `"./plugins/my-first-plugin"` |
| `github` | The plugin is a GitHub repository of its own | `{ "source": "github", "repo": "your-org/my-first-plugin" }` |
| `git-subdir` | The plugin is a subdirectory of another repository, such as a monorepo | `{ "source": "git-subdir", "url": "your-org/monorepo", "path": "tools/my-first-plugin" }` |

Other source types: `url` (a git repository by URL, any host), `archive` (a zip downloaded over HTTPS), `npm`, and `command` (a directory produced by running a command on the machine where the plugin is installed). In a `git-subdir` source, `url` takes a git URL or an `owner/repo` GitHub shorthand.

## Notes

- Entry rules: write relative paths from the marketplace root (the directory that contains `.claude-plugin/`; the path doesn't start inside `.claude-plugin/`, so don't use `..`). A path with `..` fails `claude plugin validate` (`Path contains "..": ./../plugins/my-first-plugin`); a path to a missing directory passes validation but `claude plugin install` fails with `Source path does not exist: <path>`.
- Keep the entry `name` and the manifest `name` in `plugin.json` the same. The entry name is the install id (`<entry-name>@<marketplace>`, what `claude plugin list` shows and the key under `enabledPlugins`); the manifest name is the skill prefix and what `claude plugin details` takes. Installing by a differing manifest name reports `Plugin "<manifest-name>" not found in marketplace "<marketplace>"`.
- Problems that `claude plugin validate` reports (it reads only files inside the marketplace directory): JSON syntax errors (`json: Invalid JSON syntax: <reason>`), missing required fields (e.g. `owner: Invalid input`), name-rule violations, a relative `source` containing `..`, unknown top-level or entry fields (as warnings), and problems in each relative-path plugin's `plugin.json` (`plugins[N] plugin.json → <field>: <message>`). Every message is listed in marketplace-reference.md; flags and exit codes are in plugin-cli-reference.md.
- Problems that surface only when you add or install: exact official marketplace names such as `claude-plugins-official` pass validation but adding a marketplace with one is refused (`The name '<name>' is reserved for official Anthropic marketplaces`); remote sources (`github`, `git-subdir`, others) are fetched at install time, so a wrong `repo` or `path` appears then.
- Testing an edit: a marketplace added from a local directory with a relative-path `source` is read directly from `my-marketplace/plugins/`; edits take effect at the next session start or `/reload-plugins`, with no `version` change. People installing from your hosted marketplace get a cached copy (see host-marketplace.md for how they receive a new version).
- Start over with `claude plugin marketplace remove my-marketplace` (removes the marketplace and uninstalls its plugins).
- Hosting: push the directory to a git host; teammates run `claude plugin marketplace add <owner>/<repo>` (or the repository URL) and install by name. An administrator can require the marketplace on every machine (see plugins-org.md). Sharing one plugin with a few people needs no marketplace (see publish-plugin.md).

## Related

- [Install and manage plugins](./discover-plugins.md)
- [Host and maintain a marketplace](./host-marketplace.md)
- [Marketplace reference](./marketplace-reference.md)
- [Plugin manifest reference](./plugins-reference.md)
- [Manage plugins for your organization](./plugins-org.md)
- [Suggest plugins by relevance](./plugin-relevance.md)
- [Constrain plugin dependency versions](./plugin-dependencies.md)
