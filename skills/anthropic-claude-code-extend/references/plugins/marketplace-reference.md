<!-- source: https://code.claude.com/docs/en/plugins/marketplace-reference.md / last verified: 2026-11-14 -->

# Marketplace reference

Complete reference for `marketplace.json` fields, plugin entries, plugin source objects, marketplace source objects, and `claude plugin validate` messages.

## Signature / Usage

```json
// .claude-plugin/marketplace.json (marketplace root = directory containing .claude-plugin/)
{
  "name": "your-marketplace",
  "owner": { "name": "Your Org" },
  "plugins": [
    { "name": "formatter", "source": "./plugins/formatter" },
    {
      "name": "linter",
      "source": { "source": "github", "repo": "your-org/linter", "ref": "v2.0.0" }
    }
  ]
}
```

```json
// settings: marketplace source objects
{
  "extraKnownMarketplaces": {
    "your-marketplace": {
      "source": { "source": "git", "url": "https://git.example.com/your-org/your-marketplace.git", "ref": "main" }
    }
  }
}
```

## Options / Props

| Top-level field | Type | Description |
| --- | --- | --- |
| `name` | string | Required. Letters, digits, `.`, `_`, `-`; starts with letter or digit; no `..`. Typed after `@` in plugin ids |
| `owner` | object | Required. `name` required; `email`, `url` optional |
| `plugins` | array | Required. Entries validated individually |
| `$schema` | string | Editor autocomplete only |
| `description` | string | Shown to users; validate warns if missing |
| `version` | string | Marketplace manifest version |
| `metadata.description`, `metadata.version` | string | Alternate location |
| `metadata.pluginRoot` | string | Directory bare plugin source names resolve under (v2.1.239+) |
| `forceRemoveDeletedPlugins` | boolean | Uninstall plugins removed from `plugins` |
| `allowCrossMarketplaceDependenciesOn` | string[] | Marketplaces whose plugins may be dependencies (only the list in the installed plugin's own marketplace applies) |
| `renames` | object | Former plugin name to current name, or `null` if removed |

| Entry field | Type | Description |
| --- | --- | --- |
| `name` | string | Required. Same character rules; users type it before `@` |
| `source` | string or object | Required. See plugin source types |
| `description`, `category`, `tags` | | Listing metadata |
| `version` | string | `plugin.json` version wins; validate warns on mismatch |
| `strict` | boolean | Default `true`; whether `plugin.json` is authoritative for components |
| `relevance` | object | Signals for plugin suggestions |
| `dependencies` | array | `"name"`, `"name@marketplace"`, or object |
| `defaultEnabled` | boolean | Default `true`; entry value beats `plugin.json` |
| `displayName` | string | UI name |
| `metadata` | object | Free-form, not read (v2.1.222+) |
| `headers` | object | Archive download headers (v2.1.238+); replaces same-name marketplace-source header |
| `headersHelper` | string | Command printing archive headers as JSON (v2.1.238+); entry must set `"strict": false` |

| Plugin source type | Fields | Notes |
| --- | --- | --- |
| Relative path | string | Starts with `./` (or bare name under `metadata.pluginRoot`); `"."` = root; `..` fails validation |
| `github` | `repo`, `ref`, `sha` | `owner/repo` |
| `url` | `url`, `ref`, `sha` | Full git URL (`https://`, `http://`, `file://`, `git@`); no shorthand |
| `git-subdir` | `url`, `path`, `ref`, `sha` | Sparse checkout of one subdirectory; `url` accepts `owner/repo` |
| `npm` | `package`, `version`, `registry` | Fetched without install scripts; `registry` must be `https` unless user's default |
| `archive` | `url`, `sha256` | `https` zip, v2.1.224+; plugin root at top of zip or one directory down |
| `command` | `command`, `timeout`, `mode` | v2.1.229+; prints one absolute path line; `timeout` 1-600 s (default 60); `mode` `copy` (default) or `link` |

| Marketplace source type | Fields | `marketplace add` input |
| --- | --- | --- |
| `url` | `url`, `headers`, `headersHelper` | `http(s)://` URL not matching a git form |
| `github` | `repo`, `ref`, `path`, `sparsePaths` | `owner/repo`, `owner/repo@ref`, `owner/repo#ref` |
| `git` | `url`, `ref`, `path`, `sparsePaths` | `user@host:path`, or http(s) URL ending `.git`, containing `/_git/`, or a github.com / gitlab.com repository |
| `npm` | `package` | Not produced; fails to load (`NPM marketplace sources not yet implemented`) |
| `file` | `path` | A `.json` file; marketplace root is two levels up |
| `directory` | `path` | The marketplace root |
| `settings` | `name`, `plugins`, `owner` | Inline catalog; relative-path sources rejected |
| `skills-dir`, `hostPattern`, `pathPattern` | | Policy lists only |

`github` / `git` marketplace sources also accept `skipLfs` (accepted, no effect). A `settings` source's `plugins` items take `name`, `source`, `description`, `version`, `strict`, `headers`, `headersHelper`; `name` must equal the `extraKnownMarketplaces` key and can't be a reserved name. `sparsePaths` is what `marketplace add --sparse` sets.

| `strict` | `plugin.json` | Entry component fields | Result |
| --- | --- | --- | --- |
| any | absent | any | Entry is the manifest |
| `true` (default) | present | any | `plugin.json` authoritative; entry fields appended, except `hooks` whose matchers replace per event |
| `false` | present | none | `plugin.json` is the manifest |
| `false` | present | one or more | Conflict: `Plugin <name> has conflicting manifests: both plugin.json and marketplace entry specify components` |

## Notes

- Default marketplace file location is `.claude-plugin/marketplace.json`; elsewhere requires `extraKnownMarketplaces` with `path` on its source. Unknown keys are ignored (validate warns); one user cannot register two marketplaces with the same `name`.
- Reserved names include the official, community (`claude-community`, `claude-plugins-community`, `healthcare`), and directory names (`anthropic-plugin-directory`, `claude-plugin-directory`) unless sourced from `github.com/anthropics/`; also impersonating names, trailing-dot / symbol variants (v2.1.280+), `inline`, `builtin`, `skills-dir`, `synced`, `claude-plugin-test`, `npm`, `pip`, `uv`, `cargo`, `github`, `gh` (v2.1.275+), JS member names such as `constructor` / `toString` (v2.1.296+), names starting `claudeai-`, and the `<owner>-<repo>` download folder of a registered GitHub marketplace (v2.1.290+).
- Entry `hooks` must be an inline object of event names to matcher arrays; a path or array passes validation but never runs (`not yet supported in a marketplace entry`). Entry `mcpServers` / `lspServers` / `userConfig` / `channels` do not apply when `plugin.json` exists. Display fields set on the entry override `plugin.json`; before install `plugin.json` is readable only for relative-path entries.
- A relative path resolves only with `github`, `git`, `file`, `directory` marketplace sources; a `url` marketplace downloads only `marketplace.json`. On macOS/Linux backslashes in paths are refused.
- `sha` (40-char lowercase) wins over `ref`; some servers (e.g. AWS CodeCommit) cannot fetch by SHA.
- `npm` `package` refuses git addresses, `file:` paths, `npm:` aliases, tarball links on github.com / gist.github.com / gitlab.com / bitbucket.org / git.sr.ht (except GitLab npm registry links under `gitlab.com/api/v4/`), and `http` tarball links unless the user's default registry.
- `archive` `sha256` is 64 hex chars; mismatch is refused. `command` must be printable ASCII, at most 500 characters, no run of four spaces; runs via `sh` / `cmd.exe` from the home directory; fails on non-zero exit, timeout, empty or non-absolute output, missing plugin content, the session's own directory or parent, Windows UNC path, copy mode above 256 MiB or 20,000 entries. `link` mode: not on Windows, no hashing, top-level symlinks must stay inside, must include `node_modules`.
- `url`, `git`, `github` mean different things as marketplace sources vs plugin sources; `git-subdir`, `archive`, `command` exist only as plugin sources. `hostPattern`, `pathPattern`, `skills-dir`, and `owner/*` repo form are valid only in `strictKnownMarketplaces` / `blockedMarketplaces`.
- `claude plugin validate <path>` takes the marketplace root or file; messages name entries as `plugins[i]`. Key errors: `Marketplace must have a name`, spaces in names, `Duplicate plugin name "x" found in marketplace`, `plugins.i.source: Invalid input`, `Invalid string: must start with "./"` (v2.1.285+; earlier printed `Invalid input`), `Path contains ".."`, `Plugin "x" sets headersHelper but is not "strict": false`, `renames.<old>: chain does not resolve`. Warnings include `Unknown field 'x'`, `Marketplace has no plugins defined`, missing description, `Entry declares version "x" but <path>/plugin.json says "y"`, archive `headersHelper` with no `sha256` pin, and Claude Desktop name restrictions (letters, digits, `.`, `_`, `-`; max 128 chars).
- Validation misses load-time failures such as entry `hooks` file paths and source fetch errors.
- Official reserved marketplace names (reserved unless the marketplace comes from a `github` or `git` source under `github.com/anthropics/`): `claude-code-marketplace`, `claude-code-plugins`, `claude-plugins-official`, `anthropic-marketplace`, `anthropic-plugins`, `agent-skills`, `anthropic-agent-skills`, `life-sciences`, `knowledge-work-plugins`, `claude-for-legal`, `claude-for-financial-services`, `financial-services-plugins`, `first-party-plugins`, `claude-tag-plugins`. A registered marketplace whose name imitates an official one stops loading, and `claude plugin list` / `/plugin` report `Claude Code refuses the marketplace name "<name>"` (v2.1.282+; the message lists the rename steps for an inline-declared one on v2.1.292+). Removing it uninstalls its plugins and deletes their data, options, and secrets.
- Git submodules (v2.1.295+): when cloning a marketplace repository, Claude Code fetches only the submodules that hold plugin files (plugin inside the submodule, submodule inside the plugin, or a symlink into it). A plugin at the root (`"source": "./"`) gets every submodule or none: all are fetched when a component directory, a configured path, a symlink, or text in plugin files points into any submodule, or when a root `SKILL.md` or an unreadable file prevents telling. `--sparse` / `sparsePaths` fetch no submodule. Earlier versions fetch every submodule, which can exceed the clone timeout.
- Additional `claude plugin validate` messages: warning `Plugin "x" sets headers/headersHelper, which only apply to "archive" sources`; warning `Header "x" is a request-routing/identity header that catalog entries may not set; Claude Code drops it at download time.`; warning `Local source "x" is or traverses a symlink, so <path> was not read`; error `target "x" is not a valid plugin name (PluginIdSchema)` on `renames.<old>`; warnings for `relevance` / `metadata` / `experimental` entries that are not objects; Claude Desktop rejects marketplace names `org`, `org-provisioned`, `unknown`.
- Changelog 2.1.325: marketplace `ref` accepts the full ID of any commit on a branch or tag; clients before this version can't clone such a pin, so a marketplace pinned this way stops loading there. The official page of 2026-11-14 still describes `ref` as a branch or tag only.
- Changelog 2.1.323: one malformed entry in a marketplace's `renames` map no longer makes Claude Code ignore the marketplace's other renames. Marketplace and plugin installs fail when a git submodule isn't on the commit its repository records. Marketplaces named `npm`, `pip`, `uv`, `cargo`, `github` or `gh` were being refused as reserved names (a fix); the official page still lists them as reserved (v2.1.275+).
- Changelog 2.1.321: managed `extraKnownMarketplaces`: a declared name can't be added from another source, an entry from elsewhere is hidden, and plugins the declared marketplace lists are reinstalled from it (see plugins-org.md).
- Source: https://code.claude.com/docs/en/plugins/marketplace-reference.md (retrieved 2026-11-14)
- Source: https://code.claude.com/docs/en/changelog.md (2.1.321, 2.1.323, 2.1.325, retrieved 2026-11-14)

## Related

- [Host and maintain a marketplace](./host-marketplace.md)
- [Plugin marketplaces](./plugin-marketplaces.md)
- [Plugin loading reference](./plugin-loading.md)
- [Manage plugins for your organization](./plugins-org.md)
- [Plugin dependencies](./plugin-dependencies.md)
- [Plugin relevance](./plugin-relevance.md)
