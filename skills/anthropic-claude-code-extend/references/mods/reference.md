<!-- source: https://code.claude.com/docs/en/plugins/mods/reference / last verified: 2026-10-17 -->

# Mods reference

Complete lookup for mods: files, the `on` hook function, events, mods API methods, render sites, elements, limits, settings, and commands. Entries cover the CLI and Desktop app as of v2.1.290 and the VS Code extension as of v2.1.299.

## Signature / Usage

```javascript
// register(on, options): on(eventName, [matcher], hook) returns a registration with .catch(handler)
on('tool.call', { tool: 'Bash' }, async ($, e, next) => next(e)).catch(async ($, e, next) => next(e))
```

```json
// hooks/hooks.json: "modules" holds one path relative to this file
{ "modules": ["./register.js"] }
```

## Options / Props

### Files

| File | Required | Contents |
|------|----------|----------|
| `.claude-plugin/plugin.json` | Yes | Plugin manifest; mods add no required fields |
| `hooks/hooks.json` | Yes | `modules`: array with one path to the hooks module; may also hold settings hooks under `hooks` |
| Hooks module (e.g. `hooks/register.js`) | Yes | Exports `register(on, options)`; `.js` `.mjs` `.cjs` `.jsx` `.ts` `.mts` `.cts` `.tsx`; ES module |
| `types/index.d.ts` (named by `types` in manifest) | When using `$.state` or adding an API namespace | Declares `PluginState` values and added namespaces |
| `*.test.ts` / `*.test.tsx` | No | Tests run by `claude plugin test` |

`options` holds the `userConfig` values from the manifest, with defaults filled in.

### Hook function arguments

| Argument | What it is |
|----------|-----------|
| `$` | The mods API |
| `e` | Event input as deeply frozen plain data; pass a copy to `next` to change it |
| `next(e)` | Next handler (middleware); resolves to the event's result |
| `next.signal` | `AbortSignal` that aborts when the event is abandoned |
| `next.origin` | `{ plugin, tier }` of whoever fired the event; tier is `prepend`, `user`, `append`, or `builtin` (Claude Code itself is `{ plugin: 'engine', tier: 'core' }`) |
| `next.budget` | `ms` (whole limit) and `remainingMs` |
| `next.to(e, tier)` | Skip to a later tier (`append`, `builtin`, `core`); only mods in `prependPlugins` / `appendPlugins` |
| `next.error` | In `.catch` only: `kind` is `throw`, `timeout`, or `re-entry` (v2.1.292+); `message` |
| `next.error.cause` | With `re-entry`: `rewritten` (v2.1.300+) or `lent` (v2.1.292+) |
| `next.called` | In `.catch` only: `true` when the hook had called `next` |

### Events

Hooks on `turn.step` and `process.spawn` are async generators; others are async functions.

| Group | Event | Fires when | A hook can return |
|-------|-------|-----------|-------------------|
| Tools | `tool.call` | Tool about to run | `next(e)`, `{ deny: reason }`, `{ result }` |
| Tools | `tool.check` | Decision on whether a call may run (after `tool.call` and `PreToolUse`) | `{ decision }`: `allow`, `ask`, `deny` |
| Tools | `tool.describe` | Once per tool when description first sent | `{ description }`, optional `isDeferred` |
| Prompts | `prompt.submit` | Prompt submitted | `next({ ...e, text })`, `next({ ...e, context })`, `{ drop: reason }` |
| Prompts | `prompt.fill`, `prompt.suggest` | Text going into prompt box as draft / dim suggestion | `next(e)` with changed text |
| Prompts | `prompt.edit` | User edits prompt box | `next(e)` |
| Prompts | `prompt.autocomplete` | User types and a word ends at the cursor | `{ suggestions }` of `{ text, label, description }` |
| Prompts | `prompt.compose` | System prompt rendered | `{ sections }` of `{ id, text, scope }` |
| Prompts | `prompt.section` | Each named system prompt section | `{ text }` or `{ text: null }` |
| Prompts | `prompt.context` | Once per conversation, context for first message | `{ blocks }` |
| Prompts | `prompt.attachment` | Claude Code adds its own message (e.g. reminder) | `{ text }` or `{ text: null }` |
| Prompts | `prompt.mention` | About to read an @-mentioned file (v2.1.290+) | `next({ ...e, path })`, `{ deny: reason }` |
| Prompts | `skill.prompt` | Skill text expanded | `{ text }` |
| Prompts | `attribution.text` | Commit / PR attribution composed | `{ text }` |
| Commands | `command.run` | Command about to run | `{ text }`, `{}`, `next(e)` |
| Commands | `command.describe` | Once per command for the list | `{ description, argumentHint, isHidden }` |
| Commands | `config.set` | `/config` row about to change | `next({ ...e, value })`, `{ deny: reason }` |
| Commands | `config.describe` | Once per `/config` row | `{ label, description, isHidden }` |
| Turns | `turn.start` | Turn begins | `next(e)` |
| Turns | `turn.step` | One request about to go to the model | `yield* next(e)`, `next({ ...e, model })`, `next({ ...e, effort })` |
| Turns | `turn.complete` | Turn ended | `next(e)`, `{ text }` |
| Session | `session.start` | Once per loaded mod before first prompt and after a reload of that mod (not after `/clear`, `/resume`, `/branch`) | `next(e)` |
| Session | `session.end` | Session ends or `/clear` `/resume` `/branch` runs; `e.reason` | `next(e)` |
| Session | `session.compact` | Conversation about to compact | `{ skip: reason }` |
| Session | `session.receive`, `session.send` | Message arrives from / goes to another agent or session | `{ consumed: reason }` / `{ isDelivered: false, reason }` |
| Session | `session.append` | Each row the conversation keeps, before storing | `next({ ...e, message })` |
| Session | `session.attach`, `session.detach` | Another app connects / disconnects | `next(e)` |
| Session | `session.measure` | After each turn and when plan limit percent changes | `next(e)` |
| Subagents | `agent.offer` | Subagent type offered to Claude | `{ isOffered: false }` |
| Subagents | `agent.spawn` | Subagent or teammate about to start (`e.isTeammate`) | `next({ ...e, model })`, `{ deny: reason }` |
| Interface | `ui.render` | Render site about to be drawn | A tree, or `next(...)` |
| Interface | `ui.resolve` | Mods load, per app / site / mod | Element table read by `$.ui.resolve(e)` |
| Interface | `ui.press`, `ui.input`, `ui.select` | A `Button`, `Input`, or `Select` a mod drew is used | - |
| Interface | `ui.focus`, `ui.scroll` | Focus or scroll position about to change | - |
| Interface | `ui.close` | Pane about to close; `e.origin.kind` is `plugin`, `person`, `unload` | - |
| Interface | `ui.message` | A `Client` element posts data to its mod | - |
| Interface | `ui.fault` | A `Client` failed; `e.phase` is `load`, `render`, `run` (v2.1.289+) | - |
| Other mods | `plugin.register` | Hooks module about to load; `e.uses` lists events, calls, env vars, state | `{ refuse: reason }` |
| Other mods | `engine.create` | Mods API being built for this mod | Changed API (add a namespace) |
| Telemetry | `telemetry.log`, `telemetry.mark` | Record about to be logged / feature use marked; requires `{ to: 'collector' }` filter | `next(e)`, `{ deny: reason }` |
| Settings hooks | `classic.<Event>` (e.g. `classic.Stop`) | The matching settings hook event; `e` is the hook's stdin JSON | - |
| API calls | e.g. `fs.read`, `model.complete`, `ui.open` | Every mods API method is also an event | `next(e)`, `{ deny: reason }`, `{ value }` |

Version-gated fields: `tool.check` `e.agentId` / `e.ceiling` (v2.1.290+); `skill.prompt` `e.source`, `e.pluginName`, `e.path`, `e.frontmatter`, `e.frontmatterProblem` (v2.1.299+); `turn.step` result `serverToolUses` (v2.1.290+).

### Mods API methods

| Namespace | Methods |
|-----------|---------|
| `$.plugin` | `name`, `root` |
| `$.ui` | `resolve`, `invalidate`, `open`, `close`, `panes`, `focus`, `scroll`, `toast`, `status`, `log`, `notice`, `ask`, `copy`, `selection`, `blit` |
| `$.command` | `register`, `run`, `list` |
| `$.tool` | `register`, `call`, `check`, `list` |
| `$.agent` | `register`, `spawn`, `list` (status `pending`, `running`, `waiting`, `idle`, `completed`, `failed`, `killed`; `idle` / `waiting` need v2.1.289+) |
| `$.model` | `complete`, `fork`, `classify` |
| `$.prompt` | `submit`, `read`, `fill`, `suggest`, `compose` (`submit({ text, asUser: true })` sends as the user's own words) |
| `$.turn` | `abort` |
| `$.session` | `messages`, `cwd`, `root`, `model`, `turns`, `id`, `repo`, `surfaces`, `usage`, `version`, `compact`, `send`, `append`, `authorize` |
| `$.config` | `list`, `set` |
| `$.settings` | `read` |
| `$.env` | `get`, `set` |
| `$.fs` | `read`, `write`, `list`, `exists`, `stat`, `ancestors` (`write` is not atomic) |
| `$.store` | `get`, `set`, `delete`, `keys` (key-value store shared by every session on the machine) |
| `$.state` | `get`, `set`; helpers `atom`, `read`, `update`, `derive`, `memberOf` imported from `claude-code` |
| `$.clock` | `now`, `sleep`, `after`, `every` |
| `$.http` | `fetch` |
| `$.process` | `run`, `spawn` |
| `$.mcp` | `call`, `connect` |
| `$.audio` | `play`, `speak` |
| `$.telemetry` | `log`, `mark` |

### Render sites

| Site | `e.props` | Rendered on |
|------|-----------|-------------|
| `Pane` | `title`, `isFocused`, `bodyColumns`, `placement`, `scroll`, `view` | Terminal, Desktop, VS Code |
| `AbovePrompt` | `hasSurvey`, `isWorking`, `maxRows`, `bodyColumns`, `scroll`, `view` | Terminal, Desktop |
| `UserMessage` | `text`, `origin`, `isExpanded` | Terminal, Desktop, VS Code |
| `AssistantMessage` | Reply text | Terminal, Desktop, VS Code |
| `ToolUse`, `ToolResult`, `ToolGroup` | Tool name, input, result | Terminal, Desktop, VS Code |
| `CommandOutput` | `command`, `text` | Terminal, Desktop |
| `AskUserQuestion` | Question and options | Terminal, Desktop, VS Code |
| `ToolProgress` | `kind` | Terminal |
| `Spinner` | `word`, `message`, `suffix`, `mode` | Terminal, Desktop, VS Code |
| `TurnDuration` | `word`, `durationMs` | Terminal |
| `InfoNotice` | `text`, `command` | Terminal |
| `SessionMode` | `modes` | Terminal, Desktop |
| `PromptHint` | `isDraft`, `isWorking`, `hint` | Terminal, Desktop |

`e.surface` is `terminal`, `desktop`, or `vscode`. `e.viewport` holds `columns`, `rows`, `isFullscreen`. Fit a tree with `e.props.bodyColumns` (width) and `e.props.scroll.bodyRows` (height of a `dock` pane).

### Elements

| Element | Main props | Terminal | Desktop | VS Code |
|---------|-----------|:-:|:-:|:-:|
| `Box` | `key`, flex layout, `gap`, `padding`, `margin`, `width`, `height`, `borderStyle`, `backgroundColor`, `position`, `hover` | yes | yes | yes |
| `Text` | `color`, `backgroundColor`, `bold`, `italic`, `underline`, `dimColor`, `inverse`, `wrap` | yes | yes | yes |
| `Button` | `key`, `label`, `onPress`, `hotkey`, `plain`, `dimColor`, `autoFocus`, `action` | yes | yes | yes |
| `Link` | `href`, `label` | yes | yes | yes |
| `Code` | `source`, `language`, `path`, `startLine`, `format`, `wrap` | yes | yes | yes |
| `Markdown` | `text`, `key`, `dimColor`, `onLinkPress`, `pressableLinks` | yes | yes | yes |
| `Input` | `key`, `label`, `placeholder`, `value`, `submitLabel`, `onSubmit`, `onInput`, `autoFocus` | yes | yes | yes |
| `Select` | `key`, `label`, `options`, `value`, `onSelect`, `autoFocus` | yes | yes | yes |
| `Svg` | SVG document up to 131,072 characters | no | yes | yes |
| `Client` | `module`, `key` | yes | yes | no |
| `Raster` | `key`, `columns` (max 512), `rows` (max 256), `cells` | yes | no | no |
| `Image` | PNG / RGBA bytes up to 2 MiB or file path, `columns` / `rows` up to 255, `alt` | yes | no | no |

`Box` `borderStyle` names: `single`, `double`, `round`, `bold`, `singleDouble`, `doubleSingle`, `classic`, `arrow`, `dashed`, `quote`; any other name (e.g. `rounded`) draws no border.

### Limits

| Limit | Value |
|-------|-------|
| A hook's own execution time per event (excluding time in `next` or mods API calls other than `$.clock.sleep`) | 10 s; 50 ms for `prompt.edit` |
| `.catch` handler | 1 s |
| All `session.end` hooks together | SessionEnd hook budget (1.5 s default) |
| `$.process.run` timeout | 30 s default, 10 min max |
| `$.model.complete` `maxTokens` | 1024 default, up to 64,000 or model output limit |
| `$.fs.read` / `$.fs.write` | 4 MiB per file |
| `$.http.fetch` request body / response body | 4 MiB each (HEAD exemption for header-declared size: v2.1.296+) |
| One `$.http.fetch` call | 30 s; up to 5 redirects |
| `drop` reason / `config.set` `deny` reason | 4,096 characters (truncation: v2.1.292+) |
| Text in one tree | First 100,000 characters drawn |
| `Code` `language` / `path`, `Select` option `value`, `Client` `module` | 10,000 characters |
| `Link` `href` | 2,048 characters (longer keeps the whole tree from drawing) |
| `$.store` | 4 MiB of JSON total |
| `$.session.messages()` | Newest 4,096 entries |
| `$.ui.invalidate('ui.render')` | 10 redraws/s, 30/s in the terminal for visible pane, expanded band, hint line |
| `$.ui.toast` | 4 s unless `{ timeoutMs }` |
| Pane opened without user asking | From 144 terminal columns; 110 after the user opened it once |
| Nested scopes in one hooks-module file | 2,000 |
| Command / tool / subagent type / pane names | Letters, digits, `_`, `-`; up to 64 characters |
| One `claude plugin test` test | 5 s unless `timeoutMs` |

### Settings and environment variables

| Name | Where | What it does |
|------|-------|--------------|
| `CLAUDE_CODE_PLUGIN_DIRS` | Environment or `env` in `~/.claude/settings.json` | Plugin directories loaded like `--plugin-dir` (absolute paths separated by `:`, `;` on Windows) |
| `CLAUDE_CODE_PLUGIN_DIR_WATCH` | Environment | `1` makes a long-running non-interactive session reload `--plugin-dir` mods on save |
| `prependPlugins`, `appendPlugins` | Managed settings (user settings only on a machine with no managed settings, not signed in with Team/Enterprise) | Plugin ids (e.g. `acme-guard@acme-tools`) run before / after user-installed mods |
| `allowManagedModsOnly` | Managed settings, option on the built-in guard | Only the organization's mods and built-in mods run hooks |
| `allowModsToOverrideDenyRules` | Managed settings, option on the built-in guard | Lets a user's mod approve a call a `deny` rule refuses |
| `allowManagedHooksOnly` | Managed settings | Blocks hooks and installed mods that are not the organization's |
| `disableAllHooks` | Any settings file | In managed settings no installed mod or hook runs; in own settings the organization's keep running |
| `disableSideloadFlags` | Managed settings | Rejects `--plugin-dir` and `--plugin-url` at startup |
| `pluginConfigs` | User or managed settings | `userConfig` values keyed by plugin id (e.g. `first-mod@inline` for `--plugin-dir`) |

### Commands

| Command | What it does |
|---------|--------------|
| `/plugin` | Shows `1 mod active · first-mod` under its tabs when a non-built-in mod loaded |
| `claude plugin validate <directory>` | Reports errors, events handled, and mods API calls; `--strict` treats warnings as errors, `--json` machine-readable |
| `claude plugin test [directory]` | Runs `*.test.ts` / `*.test.tsx`; exits 1 on failure |
| `claude --plugin-dir <directory>` | Loads a plugin directory for one session and reloads on save; repeatable |
| `/reload-plugins` | Reloads plugins |

## Notes

- The complete reference is the TypeScript declarations (`mods/types/claude-code.d.ts` in the `anthropics/claude-code` repo); the copy Claude Code writes into `.claude-plugin/types/` for your version wins over any page.
- `sec-default@builtin` (shown as `cc-plugin-sec-default`) loads ahead of every user-installed mod on a machine with managed settings or for a Team/Enterprise sign-in. If managed `prependPlugins` is set, the guard loads only when that list names it.
- Rendering in the VS Code extension needs extension 2.1.299+ and a session that fetches feature flags. The extension ignores `Box` `position` / `hover`, `Button` `hotkey` / `plain` / `autoFocus` / `action`, `Code` `language` / `path` / `startLine` / `format` / `wrap`, and `Input` / `Select` `autoFocus`.
- `autoFocus` (and `focus`, `closeOnEscape`, `holdToasts`) accept only `true`; omit instead of passing `false`.

## Related

- [Mods overview](./overview.md)
- [Create a mod](./create.md)
- [React to events](./events.md)
- [Use the mods API](./api.md)
- [Draw in the interface](./interface.md)
- [Manage mods for your organization](./admin.md)
