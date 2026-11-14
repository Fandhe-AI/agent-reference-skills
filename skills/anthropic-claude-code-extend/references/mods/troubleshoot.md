<!-- source: https://code.claude.com/docs/en/plugins/mods/troubleshoot / last verified: 2026-11-14 -->

# Troubleshoot a mod

Match a symptom or message to its cause. A failing mod module or hook is skipped and the session continues, so a broken mod can look like one that does nothing.

## Signature / Usage

```bash
claude plugin validate ./first-mod                       # misspelled events, bad manifest, unreadable module
claude plugin test                                       # from a directory with no mod: checks whether mods can load
claude --debug-file ./mod-debug.log --plugin-dir ./first-mod
tail -f ./mod-debug.log | grep first-mod
```

A loaded mod has a debug-log line such as:

```text
hooks module first-mod@inline loaded (worker, environment 2, tier user); events: session.start,tool.call,command.run,ui.render
```

## Options / Props

Where the report line appears:

| Session | Where |
|---------|-------|
| Interactive session hot-reloading a plugin directory (`--plugin-dir`, or hot reloading enabled for Claude-written mods) | Dim transcript line |
| Any other interactive session (e.g. marketplace-installed) | Debug log only (`claude --debug`) |
| `claude -p` with `--plugin-dir` | stderr (default text format); a refusal by another mod goes to the debug log only |

`claude plugin test` from a non-mod directory:

| Message includes | Meaning |
|------------------|---------|
| `no hooks module to load` | Mods can load; nothing to test here |
| `hooks modules are turned off here` | `disableAllHooks` or organization policy blocks mods |
| `hooks modules are turned off in this process: the rollout switch served off` | Anthropic turned installed mods off remotely |
| `hooks modules are turned off in this process: the rollout switch was saved off by an earlier session` | Possibly stale saved value; start `claude` once, then rerun |

Refusal messages (follow `hooks module <name> not loaded:` in the debug log):

| Message starts with | Meaning |
|---------------------|---------|
| `hooks modules are turned off for installed plugins in this process: the rollout switch served off` | Anthropic turned installed mods off remotely |
| `hooks modules are turned off for installed plugins in this process: the rollout switch was saved off by an earlier session` | Stale saved value; restart Claude Code |
| `disableAllHooks in managed settings` | Organization turned off hooks from installed plugins |
| `only managed plugins and built-in plugins run` | `allowManagedHooksOnly`, or `disableAllHooks` in a non-managed settings file |
| `installed plugins that are not managed load no hooks module in this mode (--bare)` | Started with `--bare` |
| `another plugin of that name loads first` | Another enabled plugin holds the same name |

Built-in guard messages:

| Message contains | Meaning |
|------------------|---------|
| `mods are limited to your organization's by policy (allowManagedModsOnly)` | Only organization mods allowed; yours refused |
| `tried to lift a deny rule in your settings` | Your `tool.check` hook approved a call a `deny` rule refuses; the call stays denied |
| `the deny rules in your settings could not be checked for this call, so it is refused` | Guard failed while checking an approved call; call refused |

Symptom to cause:

| Symptom | Cause / fix |
|---------|-------------|
| `validate` passes with no `hooks` line | `hooks/hooks.json` has no `modules` key (or misspelled); add `"modules": ["./register.js"]` |
| `hooks module did not load:` + reason | Top-level code threw; fix the named file/line |
| `options do not fit plugin.json userConfig` | An option fails `userConfig` validation; fix the `pluginConfigs` entry named at the line end |
| `code nested too deep to scan: more than 2000 scopes` | Reduce scope nesting |
| No mod loads in a new directory | Trust prompt not accepted; start `claude` there |
| No installed plugin loads | Started with `--safe-mode` |
| Claude Code stops asking to enable hot reloading | Question ended three times unanswered (e.g. `askUserQuestionTimeout`); copy the mod out and use `--plugin-dir` |
| `<mod>: <event> hook skipped: <reason>` | A hook threw, timed out, or returned the wrong shape; appears once per event/kind until reload |
| `<mod> registered /<cmd> but no command.run hook answered it` | No `command.run` hook, filter names another command, hook returned `next(e)`, or hook was skipped |
| `<mod> was unloaded: it crashed the hooks worker` | A hook blocked the thread (e.g. endless loop without await) |
| `its session.start ran again in a fresh copy` | Informational: a prior `$.prompt.submit` / `$.command.run` / `$.agent.spawn` result was reused (before v2.1.292 it ran twice); nothing to fix |
| `$.agent.register refused: the hooks module that made the call is no longer loaded` | Call came from an old copy after reload; register in `session.start` |
| `hooks: mods that run in the hooks worker are off for this session: it crashed 3 times` | All non-built-in mods unloaded; run `/reload-plugins` |
| `a hook changed this call's input after the model wrote it` | Auto mode denied a call whose input a hook changed after classifier review; reissue, or turn off the mod/hook |
| Pane or band empty / `ui.render (Pane) refused:` | Returned tree did not validate (unknown prop/element); read the reason line |
| `ui.render (...) threw while drawn: <error>; the engine drew its own` | Error while drawing the tree or passed `props`; fix the value (before v2.1.289 this could end the session) |
| `the module failed without a message` | A `Client` threw an error with no message; give it one (before v2.1.289 showed `Error`) |
| `$.ui.open` runs and no pane appears | Not user-initiated and terminal narrower than required width; open from a command/button or check `isPlaced` |
| Toast missing | See Notes |
| Hotkeys do nothing | Pane lacks keyboard focus (Ctrl+X then Tab, click, or `focus: true`), or VS Code extension (no hotkeys; click / Enter) |
| Works in terminal, not Desktop/VS Code | Site/element not drawn there, extension older than 2.1.299, or the extension is older than 2.1.304 and the session does not fetch feature flags (Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, Claude apps gateway) |
| Your band row is missing while another mod's shows | Your tree does not validate (`ui.render hook skipped`, `does not validate`), the rows together exceed the band limits (`past the limits of the band`), or another mod hides your row. Before v2.1.323 all mods shared one band drawing, so an earlier mod's tree without `await next(e)` among its `Box` children replaced yours |
| Band shows `plugin panel hidden` | The band is collapsed (Ctrl+X then Ctrl+A, or clicking `[-]` in fullscreen rendering); no hotkey or `action` binding presses a button in it until expanded |
| Toast `Stopped: type a message to continue; a mod cannot resume work after Stop` | The user stopped the turn and a mod tried to start work on its own; nothing to fix, work can start again after the next message |
| `settings.read` key has no effect | Permission rules and `env` returned on Claude Code's own read are not applied (use a settings file / `$.env.set`); otherwise search the debug log for `settings.read hook skipped`, `settings.read bypassed by cc-plugin-sec-default`, `the answer for <key> is no value the key can hold`, `the merge never settles for <key>`, `answered settings.read without next()`, or `refused to the engine` |
| Edits do not take effect | Editing an installed plugin; develop with `--plugin-dir` |
| Value resets on reload | Module variables reinitialize; use `$.state` or `$.store` |
| Value resets after `/clear` `/resume` `/branch` | Reload it in a `classic.SessionStart` hook |

## Notes

- If a save breaks a hot-reloaded module, the transcript says `reload failed, the previous version stays loaded:` and the last working version keeps running until the next plugin reload (e.g. `/reload-plugins`).
- Toast checklist: the debug log has `$.ui.toast (first-mod): <text>` when the call ran, or `$.ui.toast dropped: timeoutMs is a whole number of ms, 1 to 60000` when refused; a pane opened with `holdToasts` holds toasts; in the classic renderer a toast is one line at the right under the prompt and a newer toast can replace one (`gave way, cut short` / `gave way, unseen`); in fullscreen at most three toasts draw at once (`left the stack, never drawn`). Before v2.1.290 a toast within 2 s of the last was dropped (`within 2000ms of the last; dropped`).
- A drawing that fails validation appears as `a hook returned a tree that does not validate` in the debug log.
- Write your own debug lines with `$.ui.log('message', { to: 'debug' })`.
- `$.ui.open` with `focus: false` throws (`ui.open: focus is true or left out`) and can lead to a skipped hook.
- Before v2.1.307, a `ui.render (<site>) refused:` line reported any tree that did not validate (for `Pane` and `AbovePrompt` it ended `; the engine drew its own`); from v2.1.307 it means the tree exceeds a size limit, and a tree that fails validation reports `ui.render hook skipped: returned the wrong shape (...)`.
- `settings.read: refused to the engine (engine: $.settings.read: <reason>)` means a hook refused Claude Code's own settings read with `{ deny: reason }`; Claude Code drops every hook's value and the settings' own values stand. Return `{ value }` when `next.origin` shows Claude Code's own read, or turn off other mods one at a time with a new `--debug-file` each time to find the refusing one.
- In auto mode a denied call can give the reason `a hook changed this call's input after auto mode reviewed it` in some interactive terminal and VS Code sessions; the repeated call carries the mod's first change, a `tool.call` hook still runs on it, and a further change is dropped.
- Source: https://code.claude.com/docs/en/plugins/mods/troubleshoot.md (retrieved 2026-11-14)

## Related

- [Create a mod](./create.md)
- [Test a mod](./test.md)
- [Mods overview](./overview.md)
- [Manage mods for your organization](./admin.md)
- [Mods reference](./reference.md)
