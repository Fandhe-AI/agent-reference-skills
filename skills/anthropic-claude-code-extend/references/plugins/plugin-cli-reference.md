<!-- source: https://code.claude.com/docs/en/plugins/cli-reference.md / last verified: 2026-10-17 -->

# Plugin commands reference

The `claude plugin` shell commands, `/plugin` and `/reload-plugins` in a session, and the flags that load a plugin for one session. Tables list commonly used options; `claude plugin <subcommand> --help` shows all.

## Signature / Usage

```bash
claude plugin init my-helper --with skills hooks
claude plugin install formatter@my-marketplace --scope project
claude plugin uninstall formatter@my-marketplace --scope project
claude plugin enable formatter
claude plugin disable formatter
claude plugin update formatter@my-marketplace
claude plugin list --json
claude plugin details formatter
claude plugin validate ./my-plugin --strict
claude plugin tag plugins/formatter --dry-run
claude plugin marketplace add your-org/your-marketplace --scope project
claude --plugin-dir ./my-plugin --plugin-dir ./other.zip
```

`claude plugins` is an alias for `claude plugin`. Exit codes: `0` success, `1` failure; `validate` adds `2` (unexpected error); `eval` adds codes below. `--scope` takes `user`, `project`, `local` (`update` also `managed`). A `<plugin>` is `name` or `name@marketplace`.

## Options / Props

| Subcommand (aliases) | Key flags |
| --- | --- |
| `init <name>` (`new`) | `--description`, `--author`, `--author-email`, `--with skills agents hooks mcp lsp output-style channel`, `-f/--force`. Scaffolds `~/.claude/skills/<name>/`, loads as `<name>@skills-dir` |
| `install <plugin>` (`i`) | `-s/--scope` (default `user`), `--config key=value` (`<server>.<key>` form v2.1.285+), `-y/--yes` (v2.1.229+), `--accept-command <sha256>` (v2.1.271+), `--json` (v2.1.268+), `--marketplace <source>` (v2.1.292+) |
| `uninstall <plugin>` (`remove`, `rm`) | `-s/--scope`, `--keep-data`, `--prune`, `-y/--yes`, `--json` (not with `--prune`) |
| `enable <plugin>` | `-s/--scope` (auto-detected local, project, user), `--json` |
| `disable [plugin]` | `-a/--all`, `-s/--scope`, `--json` |
| `update <plugin>` | `-s/--scope`, `-y/--yes`, `--accept-command`, `--json`. Bare name needs v2.1.246+; omitted scope uses most specific installed scope (before v2.1.281 defaulted to `user`) |
| `list` | `--json`, `--available` (needs `--json`), `--data-size [plugin]` (v2.1.285+) |
| `details <name>` | No flags; prints Component inventory, Projected token cost, Per-component (rounded) |
| `configure <plugin>` | `--values-stdin`, `--json`; full `name@marketplace` id only (v2.1.285+) |
| `prune` (`autoremove`) | `-s/--scope`, `--dry-run`, `-y/--yes` |
| `eval [target]` | `--runs` (default 3), `-j/--concurrency` (1-8, default 1), `--model`, `--judge-model`, `--ablation none\|with-without`, `--threshold` (default 1.0), `--max-cost-usd`, `--allow-tools`, `--scaffold`, `--trust-plugin`, `--mocks record\|off`, `--eval-dir`, `--json [path]`, `--no-publish` (v2.1.269+) |
| `eval init [name]` | `--bare`, `-i/--interactive`, `--eval-dir` (v2.1.269+) |
| `tag [path]` | `--push`, `--dry-run`, `-f/--force`, `-m/--message` (`%s` = version), `--remote` (default `origin`); creates `<name>--v<version>` |
| `test [directory]` | Runs `*.test.ts` / `*.test.tsx` of a mod; exit 1 on failure |
| `validate <path>` | `--strict`, `--json` (v2.1.259+) |
| `marketplace add <source>` | `--scope`, `--sparse <paths...>`, `--claudeai` (v2.1.273+), `--json` (v2.1.287+) |
| `marketplace list` | `--json` |
| `marketplace remove <name>` (`rm`) | `--scope`, `--json` (v2.1.287+) |
| `marketplace update [name]` | `--json` (needs a name) |

| `plugin eval` exit code | Meaning |
| --- | --- |
| `0` | Suite passed |
| `1` | Failing case, load error, untrusted directory, API-error run, or other CI-listed cause |
| `2` | Partial run |
| `130` / `143` | Interrupted / terminated |

| `validate` exit code | Verdict |
| --- | --- |
| `0` | `Validation passed` (with `--strict`, no warnings either) |
| `1` | `Validation failed` |
| `2` | `Unexpected error during validation: <reason>` |

| `marketplace add` input | Source type |
| --- | --- |
| `owner/repo`, `owner/repo#ref`, `owner/repo@ref` | `github` |
| `user@host:path[.git][#ref]`; http(s) URL ending `.git` or containing `/_git/`; `https://github.com/owner/repo` or gitlab.com project URL | `git` |
| Any other `http(s)://` URL | `url` (fetched as `marketplace.json`; append `.git` to clone) |
| `./path`, `../path`, `/path`, `~/path` to a directory | `directory` |
| Same path forms to a `.json` file | `file` |

| `/plugin` form | What it does |
| --- | --- |
| `/plugin` (aliases `/plugins`, `/marketplace`) | Opens panel on **Discover** |
| `/plugin list [--enabled\|--disabled]` | Prints installed plugins inline |
| `/plugin install <plugin>` | Opens details in **Discover**; with `--marketplace <source>` (v2.1.275+) adds the marketplace first after confirmation |
| `/plugin manage` / `stats` | Opens **Installed** / **Stats** tab |
| `/plugin enable\|disable\|uninstall <plugin>` | Opens **Installed** tab and acts |
| `/plugin configure <plugin>` | Opens `userConfig` dialog |
| `/plugin validate <path>`, `/plugin tag ...` | Same as the shell commands |
| `/plugin marketplace add\|list\|update\|remove` | Add/list inline; update/remove open **Marketplaces** tab |

| Flag | Description |
| --- | --- |
| `--plugin-dir <path>` | Load a plugin directory or `.zip` for one session; a folder of plugins loads each child with `.claude-plugin/plugin.json`; repeatable |
| `--plugin-url <url>` | Fetch a plugin `.zip` from a URL; repeatable or space-separated in one quoted value |
| `/reload-plugins [--force]` | Apply pending changes without restart; `--force` applies even if the prompt cache is invalidated |

## Notes

- `plugin install` for a command-source or `headersHelper` plugin prints the command and asks `Run this command now? [y/N]`. Without a TTY and without `-y` / `--accept-command` the install is refused (exit 1); `-y` is ignored when Claude runs it through its Bash tool. `--accept-command` accepts only exactly the command, plugin, and catalog that a `--json` run reported in `shownCommand`.
- `--json` prints one object on the last stdout line with `command`, `outcome` (`ok` / `failed`), `message`, and optional `pluginId`, `scope`, `failureCode`. `enable` / `disable` on an already-in-state plugin exit 1; with `--json` the result has `failureCode: "already_in_goal_state"`.
- Uninstalling from the last scope also deletes stored options, secrets, and `~/.claude/plugins/data/<id>/` unless `--keep-data`, another installed plugin uses the same folder, or install records cannot be read back (`savedKept: "install_records_unreadable"`, v2.1.282+).
- `plugin enable` / `disable` also affect declared dependencies; `disable` fails if another enabled plugin depends on it or if an org requires it as a synced plugin. A scope that takes precedence over the declaring one writes an override.
- `plugin list --json` fields include `id`, `version`, `scope` (`user`, `project`, `local`, `managed`, `session`, `synced`), `enabled`, `installPath`, `readFromFolder` / `folderVersion` (v2.1.289+), `installedAt`, `lastUpdated`, `projectPath`, `mcpServers`, `errors`, `notes`, `errorDetails` / `noteDetails` (v2.1.268+), `hasUserConfig`, `projectEnabled`, `dataDirSize`, `dataDirUnreadable` (v2.1.285+). With `--available`, output is an object with `installed` and `available` (`pluginId`, `name`, `marketplaceName`, `source`, `description`, `version`, `installCount`).
- `plugin eval`: put the target before `--tag`, `--allow-tools`, `--json`. `plugin eval init` opens an interactive authoring interview in a terminal; `--bare` or no terminal writes a blank template and needs a case name.
- `plugin tag` checks `plugin.json` and marketplace entry versions agree; exits 1 if no `version`, tag exists, or dirty tree. If the push fails the local tag remains.
- `plugin validate` on a directory picks `.claude-plugin/marketplace.json`, else `.claude-plugin/plugin.json`, else component files under `skills`, `agents`, `commands` (v2.1.233+); with both manifests it validates both (v2.1.289+). Symlinks are not followed; a root `SKILL.md` is not checked; marketplace runs do not open listed plugins' component files. `--json` report: `success`, `strict`, `target`, `manifest`, `contents` (with `gatingHooks`, v2.1.290+).
- `marketplace remove` from the last scope deletes the cache and uninstalls every plugin installed from it (use `marketplace update` to refresh). Bare host `gitlab.example.com/team/plugins` fails as invalid shorthand; AWS CodeCommit needs a git entry in `extraKnownMarketplaces`. `--claudeai` refuses `--scope` and `--sparse`.
- `/reload-plugins` closes automatically after panel changes; reports `Reloaded: N plugins · N skills · N agents · N hooks · N plugin MCP servers · N plugin LSP servers`. Reloads that add/remove plugin MCP servers or the `LSP` tool and would invalidate the prompt cache need `--force`. In sessions without an interactive terminal (desktop app, Agent SDK, `-p`) it works only when typed into the session (v2.1.260+) and does not connect/disconnect MCP servers.
- A session-only plugin (`<name>@inline`, `scope: session`) shows in `claude plugin list` only when the flag precedes the subcommand. `disableSideloadFlags` makes both flags exit 1. Agent SDK `plugins` option equals `--plugin-dir`.

## Related

- [Plugin loading reference](./plugin-loading.md)
- [Marketplace reference](./marketplace-reference.md)
- [Plugins reference](./plugins-reference.md)
- [Plugin dependencies](./plugin-dependencies.md)
- [Test plugins with evals](./plugin-evals.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)
