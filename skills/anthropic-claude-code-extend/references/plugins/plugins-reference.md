<!-- source: https://code.claude.com/docs/en/plugins/manifest-reference.md / last verified: 2026-10-17 -->

# Plugin manifest reference

Complete reference for `plugin.json`: every field with its type and default, accepted path forms, and the `userConfig` and environment variable schemas. The manifest is the `plugin.json` file in a plugin's `.claude-plugin/` directory; it is optional (without it Claude Code loads the components it finds in the standard layout, and the plugin name comes from the marketplace entry or, with `--plugin-dir`, the directory name). For building a plugin see plugins.md; for per-component runtime behavior see plugin-components.md; the CLI commands (`claude plugin install|validate|tag|list|...`) are in plugin-cli-reference.md.

## Signature / Usage

```json
// .claude-plugin/plugin.json
{
  "name": "deploy-tools",
  "displayName": "Deploy Tools",
  "version": "1.2.0",
  "description": "Deployment commands, a review agent, and a status monitor",
  "author": { "name": "Example Team", "email": "dev@example.com", "url": "https://example.com" },
  "homepage": "https://example.com/docs/deploy-tools",
  "repository": "https://github.com/example/deploy-tools",
  "license": "MIT",
  "keywords": ["deployment", "ci"],
  "defaultEnabled": true,
  "dependencies": ["secrets-vault"],
  "metadata": { "catalogId": "cat-123" },
  "skills": ["./extra-skills/"],
  "commands": {
    "status": { "source": "./commands/status.md", "description": "Show the current deployment status" },
    "about": { "content": "Explain what the deploy-tools plugin provides.", "description": "Describe this plugin" }
  },
  "agents": ["./agents/reviewer.md"],
  "hooks": "./config/extra-hooks.json",
  "mcpServers": { "deploy-api": { "command": "node", "args": ["${CLAUDE_PLUGIN_ROOT}/server.js"] } },
  "lspServers": "./.lsp.json",
  "outputStyles": "./styles/",
  "experimental": { "themes": "./themes/", "monitors": "./config/monitors.json" },
  "userConfig": {
    "api_token": { "type": "string", "title": "API token", "description": "Token for the deployment API", "sensitive": true }
  }
}
```

```bash
claude plugin validate ./my-plugin
```

## Options / Props

Fields (top-level keys in `plugin.json`; `name` is the only required key):

| Field | Type | Description |
| --- | --- | --- |
| `$schema` | String | JSON Schema URL for editor autocomplete. Claude Code ignores it at load time |
| `name` | String | Plugin identifier, required. Use kebab-case. Every component is namespaced under it |
| `displayName` | String | Name shown in UI in place of `name` |
| `version` | String | Version string. Setting it keeps users on that version until you change it |
| `description` | String | Short explanation of what the plugin provides |
| `author` | Object | `name`, which is required, plus optional `email` and `url` |
| `homepage` | String | Documentation URL. Must parse as a URL, or the plugin fails to load |
| `repository` | String | Source repository URL. Not validated |
| `license` | String | SPDX identifier such as `MIT` or `Apache-2.0` |
| `keywords` | Array of strings | Discovery tags |
| `metadata` | Object | Free-form object for your own data. Claude Code doesn't read it (v2.1.222+) |
| `icon` | String | Icon for the plugin's listing in Anthropic's directory. Claude Code doesn't read it |
| `documentationUrl` | String | Documentation link for the plugin's listing in Anthropic's directory. Claude Code doesn't read it |
| `supportUrl` | String | Support link for the plugin's listing in Anthropic's directory. Claude Code doesn't read it |
| `privacyPolicyUrl` | String | Privacy policy link for the plugin's listing in Anthropic's directory. Claude Code doesn't read it |
| `termsOfServiceUrl` | String | Terms of service link for the plugin's listing in Anthropic's directory. Claude Code doesn't read it |
| `defaultEnabled` | Boolean | Whether the plugin starts enabled when the user hasn't set it. Defaults to `true` |
| `dependencies` | Array of strings or objects | Plugins that must be enabled for this one to work |
| `settings` | Object | Settings Claude Code applies while the plugin is enabled. Only `agent` and `subagentStatusLine` take effect |
| `userConfig` | Object | Values Claude Code prompts the user for when the plugin is enabled |
| `types` | Path | A `.d.ts` file that declares the `$.state` values and `$` nouns of a mod |
| `channels` | Array of objects | Message channels the plugin provides, each bound to one of its MCP servers |
| `skills` | Path, or array of paths | Directories to scan for skills, each a directory of `<name>/SKILL.md` folders or one folder holding `SKILL.md` directly. `"."` names the plugin root. Adds to the default `skills/` scan |
| `commands` | Path, array of paths, or object | Flat `.md` command files, directories of them, or an object map of command name to `source` or `content`. Replaces the default `commands/` scan |
| `agents` | Path, or array of paths | Agent `.md` files. Directories aren't accepted. Replaces the default `agents/` scan |
| `hooks` | Path, object, or array of either | `.json` hook files or inline hook config. Loaded together with `hooks/hooks.json` |
| `mcpServers` | Path, object, or array of either | `.json` MCP config files, `.mcpb` or `.dxt` bundles, or inline server configs keyed by name. Loaded together with `.mcp.json`; a server name declared later replaces an earlier one |
| `lspServers` | Path, object, or array of either | `.json` LSP config files or inline server configs keyed by name. Loaded together with `.lsp.json` |
| `outputStyles` | Path, or array of paths | Output style files or directories. Replaces the default `output-styles/` scan |
| `workflows` | Path, or array of paths | Workflow `.js` files or directories. Replaces the default `workflows/` scan |
| `experimental` | Object | Container for `themes`, `monitors`, and `evals`, whose manifest shape may still change |
| `experimental.themes` | Path, or array of paths | Theme files or directories. Replaces the default `themes/` scan. A top-level `themes` key still loads, with a `claude plugin validate` warning |
| `experimental.monitors` | Path, or inline array | A `.json` file holding the monitors array, or the array itself. Defaults to `monitors/monitors.json`. A top-level `monitors` key still loads, with a warning. Monitors run only in interactive sessions, and not on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry |
| `experimental.evals` | Path, or array of paths | Directory that holds the plugin's eval cases when it isn't the default `evals/`. `claude plugin eval --eval-dir` overrides it |

`commands` object map (each value sets exactly one of `source` or `content`; an entry that sets both or neither fails validation):

| Field | Type | Description |
| --- | --- | --- |
| `source` | string | Path to the command's Markdown file, relative to the plugin root |
| `content` | string | Inline Markdown for the command body, instead of `source` |
| `description` | string | Description shown for the command |
| `argumentHint` | string | Argument hint shown after the command name, such as `[file]` |
| `model` | string | Default model for the command |
| `allowedTools` | array of strings | Tools the command may use without prompting |

`lspServers` config (strict object; an unknown key fails validation):

| Field | Required | Description |
| --- | --- | --- |
| `command` | Yes | Language server binary. No spaces unless the value starts with `/`; put arguments in `args` |
| `extensionToLanguage` | Yes | Map of file extension to LSP language ID, at least one entry. Keys start with a dot, such as `".go"` |
| `args` | No | Arguments passed to the server |
| `transport` | No | `stdio` (default) or `socket`. Claude Code accepts `socket` but runs every server over stdio |
| `env` | No | Environment variables for the server process |
| `initializationOptions` | No | Options sent in the initialize request |
| `settings` | No | Settings sent by `workspace/didChangeConfiguration` |
| `workspaceFolder` | No | Workspace folder path for the server |
| `startupTimeout` | No | Milliseconds to wait for startup, a positive integer |
| `shutdownTimeout` | No | Milliseconds to wait for a graceful shutdown, a positive integer. When unset, no timeout applies |
| `requestTimeout` | No | Milliseconds to wait for the server to answer a request, a positive integer. Defaults to `60000`. Requires v2.1.288 or later |
| `restartOnCrash` | No | Whether to restart the server after it crashes. Defaults to `true` |
| `maxRestarts` | No | Restart attempts before giving up, zero or more |
| `diagnostics` | No | Whether to push diagnostics into context after edits. Defaults to `true` |

`experimental.monitors` entry (strict object): `name` (required, unique within the plugin), `command` (required, persistent background process in the session working directory), `description` (required), `when` (`"always"` default, or `"on-skill-invoke:<skill>"`). A monitor `command` can't reference `${user_config.*}`.

`userConfig` option (strict object; keys are letters, digits, underscores, not starting with a digit):

| Field | Required | Description |
| --- | --- | --- |
| `type` | Yes | One of `string`, `number`, `boolean`, `directory`, or `file` |
| `title` | Yes | Label shown in the configuration dialog |
| `description` | Yes | Help text shown beneath the field |
| `required` | No | If `true`, the configuration dialog doesn't accept an empty value |
| `default` | No | Value used when the user provides nothing: a string, number, boolean, or array of strings |
| `options` | No | For `string`, the values the field accepts, shown as a picker in `/config` (v2.1.271+; each option is a plain label of 1 to 64 characters; not with `multiple` or `sensitive`; users on earlier versions can't load a plugin that declares `options`) |
| `multiple` | No | For `string`, allows an array of strings |
| `sensitive` | No | If `true`, masks input and stores the value in secure storage instead of `settings.json` |
| `min` / `max` | No | Bounds for `number` |

`channels` entry (strict object): `server` (required, key of the MCP server in this plugin's `mcpServers`), `displayName` (optional), `userConfig` (optional, same shape as top-level `userConfig`; saved values substitute into `${user_config.KEY}` in the server's `env`).

Environment variables:

| Variable | Resolves to |
| --- | --- |
| `${CLAUDE_PLUGIN_ROOT}` | Absolute path of the plugin's installed version; changes when the plugin updates, so don't write state there |
| `${CLAUDE_PLUGIN_DATA}` | `~/.claude/plugins/data/<id>/`, created on first reference and kept across updates (`<id>`: every character other than a letter, digit, `_`, `-` replaced by `-`); deleted on uninstall from the last place it's installed (see `--keep-data`) |
| `${CLAUDE_PROJECT_DIR}` | The project root |

Standard layout (default locations when the manifest doesn't point elsewhere): `.claude-plugin/plugin.json`, `skills/` (a plugin with `SKILL.md` at its root, no `skills/` and no `skills` key loads as a single skill), `commands/`, `agents/` (subfolders are part of the agent name), `hooks/hooks.json`, `.mcp.json`, `.lsp.json`, `output-styles/`, `workflows/`, `themes/`, `monitors/monitors.json`, `bin/` (on the Bash tool's `PATH` while enabled; claude.ai and Cowork don't install a plugin that has it), `settings.json` (`agent` and `subagentStatusLine` defaults).

## Notes

- Unrecognized fields: an unrecognized top-level key is stripped (`claude plugin validate` reports a warning) and the plugin loads; unknown keys inside strict objects (`userConfig` options, `channels` entries, `lspServers` configs, `monitors` entries) are errors and the plugin doesn't load.
- `claude plugin validate` is the authoritative check: `Validation passed`, `Validation passed with warnings` (e.g. unknown top-level field, non-kebab-case `name`, missing `version` / `description` / `author`; `--strict` turns warnings into failures), or `Validation failed` (type mismatch, missing path or path escaping the plugin root, unknown key in a strict object). It also checks each MCP server entry (v2.1.281+): errors for an entry Claude Code would drop, a `${user_config.KEY}` reference to an undeclared option, or a remote `url` that isn't a valid absolute URL; warnings for `http://` / `ws://` to a non-loopback host and header values that look like literal credentials. Path checks for `outputStyles`, `lspServers`, `monitors` and `themes` need v2.1.283+. Directory listing fields (`icon`, `documentationUrl`, ...) are accepted without a warning on v2.1.281+ (earlier versions warn `Unknown field`, so `--strict` fails).
- `name`: non-empty, no spaces, `@`, `:`, path separators, control or bidirectional-formatting characters. Names that pass as Anthropic's own are errors (starts with `claude-`, `anthropic-`, `anthropics-`, `cc-plugin-`; is `claude`, `anthropic`, `anthropics`, `claude-code`, `claude-mods`; puts `official` beside `claude` / `anthropic`) or warnings (`claude` / `anthropic` / `anthropics` as a whole word elsewhere). `claude plugin init` and `claude plugin tag` refuse an error name; Claude Code still installs and loads such a plugin.
- `displayName` doesn't affect namespacing; a marketplace entry's `displayName` takes precedence. `version` isn't checked against semver; plugins with a `command` source, from a marketplace hosted on claude.ai, or loaded in place from a local-path marketplace aren't pinned by it. `defaultEnabled` persists in `enabledPlugins` once written, so changing it later doesn't affect existing users; the marketplace entry's field overrides it.
- `dependencies` entries are `"name"`, `"name@marketplace"`, or `{ "name", "marketplace", "version" }`; bare names resolve against the plugin's own marketplace (see plugin-dependencies.md). `settings`: a `settings.json` at the plugin root takes precedence over this key.
- `agents` entries must be `.md` files (directories aren't accepted); `skills` entries must be directories; the other path-only fields accept a directory or a file. Hook files wrap the event map in a top-level `"hooks"` key (a file with only the event map fails to load); an inline object is the event map itself. `mcpServers` bundle paths / URLs must end in `.mcpb` or `.dxt` (extracted into `.mcpb-cache/` under the plugin root); `.mcp.json` loads first, then each declared shape in order.
- Path rules: every component path is relative to the plugin root and starts with `./` (`commands/foo.md` fails validation); `skills` also accepts `"."` (before v2.1.221 `"."` failed, use `"./"`), `mcpServers` also accepts an `https://` bundle URL. Paths must resolve inside the plugin root (`<component> path escapes plugin directory: <path>`) and exist (`<component> path not found: <path>`).
- Combining with default locations: `commands`, `agents`, `outputStyles`, `workflows`, `experimental.themes`, `experimental.monitors` replace the default folder (list it explicitly to keep it; `claude plugin list` warns `Default <folder>/ folder is ignored because the manifest sets "<key>"`); `skills` adds to the default; `hooks`, `mcpServers`, `lspServers` merge with the default file.
- User configuration: non-sensitive values are saved under `pluginConfigs` in `settings.json`; sensitive values go to the platform's secure credential store. Reference `${user_config.KEY}` in MCP and LSP server config, exec-form hook `args`, and skill / agent content (only non-sensitive values there); `CLAUDE_PLUGIN_OPTION_<KEY>` is exported to hook processes. Shell-form hook commands, monitor commands and MCP `headersHelper` reject `${user_config.*}`. Each option appears as a row in `/config` except `sensitive` options and `multiple` lists (v2.1.269+).
- `${...}` references resolve in: hook `command` / `args`; monitor `command`; MCP stdio `command`, `args`, `env`; MCP http / sse / ws `url`, `headers`, `headersHelper`; LSP `command`, `args`, `env`, `workspaceFolder`; skill, command and agent Markdown bodies. They are not present in the environment of commands Claude runs through the Bash tool. Use exec-form hooks with `args`, or double-quote the variable in shell-form commands; on Windows substituted paths use forward slashes.
- A `CLAUDE.md` at the plugin root isn't loaded as context (`claude plugin validate` warns); put instructions in a skill.
- Marketplace entries: an entry accepts its own fields (including `strict`, default `true`) and every manifest field except the directory listing fields. No `plugin.json`: the entry is the manifest (entry `hooks` only as an inline object). `plugin.json` present with `strict` unset or `true`: the entry's `commands`, `agents`, `skills`, `outputStyles`, `themes` are appended and its `hooks` matchers replace the manifest's matchers for the same event. `strict: false` with entry-declared components is a conflict (`Plugin <name> has conflicting manifests`). The entry's `defaultEnabled` and display fields override the manifest's; the manifest's `version` overrides the entry's. See marketplace-reference.md.

## Related

- [Create a Claude Code plugin](./plugins.md)
- [Plugin components](./plugin-components.md)
- [Plugin commands reference](./plugin-cli-reference.md)
- [Marketplace reference](./marketplace-reference.md)
- [Constrain plugin dependency versions](./plugin-dependencies.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)
