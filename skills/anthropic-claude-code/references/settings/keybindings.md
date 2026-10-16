<!-- source: https://code.claude.com/docs/en/keybindings.md / last verified: 2026-10-16 -->

# Customize keyboard shortcuts

Claude Code supports customizable keyboard shortcuts via a keybindings configuration file. Run `/keybindings` to create or open `~/.claude/keybindings.json`. Changes are auto-detected and applied without restarting.

## Signature / Usage

```json
{
  "$schema": "https://www.schemastore.org/claude-code-keybindings.json",
  "$docs": "https://code.claude.com/docs/en/keybindings",
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor",
        "ctrl+u": null
      }
    }
  ]
}
```

## Options / Props

| Field | Description |
| --- | --- |
| `$schema` | Optional JSON Schema URL for editor autocompletion |
| `$docs` | Optional documentation URL |
| `bindings` | Array of `{ context, bindings }` blocks. `context` selects where the keystroke→action map applies; set an action to `null` to unbind a default |

### Contexts

`Global`, `Chat`, `Autocomplete`, `Settings`, `Confirmation`, `Tabs`, `Help`, `Transcript`, `HistorySearch`, `Task`, `ThemePicker`, `Attachments`, `Footer`, `MessageSelector`, `DiffDialog`, `DiffPanel`, `ModelPicker`, `EffortSlider` (the slider opened by `/effort`), `Select`, `Plugin`, `AbovePrompt`, `AbovePromptInput`, `AbovePromptSelect`, `Pane` and `PaneField` (panes drawn by a mod), `Agents` (agent view, `claude agents`; requires v2.1.257 or later), `Scroll`. (Before v2.1.205, `Doctor` context / `doctor:fix` action existed for `/doctor`.)

### Key action groups (selected defaults)

| Group | Examples |
| --- | --- |
| App (`Global`) | `app:interrupt` Ctrl+C, `app:exit` Ctrl+D (×2 within 800ms), `app:toggleTodos` Ctrl+T, `app:toggleTranscript` Ctrl+O |
| History | `history:search` Ctrl+R, `history:previous`/`next` Up/Down |
| Chat | `chat:cancel` Escape, `chat:clearInput` Ctrl+L, `chat:cycleMode` Shift+Tab, `chat:modelPicker` Meta+P, `chat:fastMode` Meta+O, `chat:thinkingToggle` Meta+T, `chat:submit` Enter, `chat:queueSubmit` Ctrl+X Enter (submit marked to wait its turn, queued while Claude is working; v2.1.247+), `chat:sendNow` Ctrl+Enter / Ctrl+X Ctrl+S (send queued messages and your draft right away; v2.1.275+; terminals that don't report extended keys deliver Ctrl+Enter as plain Enter, so Ctrl+X Ctrl+S works in any terminal), `chat:newline` Ctrl+J, `chat:externalEditor` Ctrl+G / Ctrl+X Ctrl+E, `chat:stash` Ctrl+S, `chat:killAgents` Ctrl+X Ctrl+K |
| Autocomplete | `autocomplete:accept` Tab, `autocomplete:dismiss` Escape |
| Confirmation | `confirm:yes` Enter, `confirm:no` Escape, `confirm:cycleMode` Shift+Tab |
| Effort slider | `effortSlider:decreaseEffort` Left / `effortSlider:increaseEffort` Right / `effortSlider:toggleUltracode` Tab (all v2.1.284+), `effortSlider:thisSessionOnly` s (v2.1.257+) |
| Agents (agent view) | `agents:switchView` Ctrl+S, `agents:togglePin` Ctrl+T (v2.1.257+); `agents:find` Ctrl+F, `agents:rename` Ctrl+R, `agents:previousGroup` Ctrl+Up / Meta+Up, `agents:nextGroup` Ctrl+Down / Meta+Down (v2.1.288+) |
| Selection | `selection:clear` (unbound; v2.1.234+) |
| Transcript | `transcript:toggleShowAll` Ctrl+E (classic renderer only), `transcript:exit` q/Ctrl+C/Escape |
| History search | `historySearch:next` Ctrl+R, `historySearch:accept` Escape/Tab, `historySearch:cycleScope` Ctrl+S (fullscreen only) |
| Task | `task:background` Ctrl+B / Ctrl+X Ctrl+B |
| Diff | `diff:dismiss` Escape, `diff:previousFile`/`nextFile` Up/Down or K/J |
| Model picker | `modelPicker:decreaseEffort`/`increaseEffort` Left/Right, `modelPicker:thisSessionOnly` s |
| Select | `select:next`/`previous` Down/Up (J/K, Ctrl+N/P), `select:accept` Enter, `select:cancel` Escape |
| Settings | `settings:search` /, `settings:retry` R |
| Voice | `voice:pushToTalk` Space (when voice dictation enabled) |
| Scroll (fullscreen only) | `scroll:pageUp`/`pageDown` PageUp/PageDown, `scroll:top`/`bottom` Ctrl+Home/End, `selection:copy` Ctrl+Shift+C / Cmd+C |

## Keystroke syntax

- **Modifiers**: `ctrl`/`control`, `shift`, `alt`/`opt`/`option`/`meta` (Alt on Win/Linux, Option on macOS), `cmd`/`command`/`super`/`win` (only detected in terminals reporting the Super modifier — prefer `ctrl`/`meta` for portability). Combine with `+`: `ctrl+k`, `shift+tab`, `meta+p`, `ctrl+shift+c`.
- **Uppercase letters**: a standalone uppercase letter implies Shift (`K` = `shift+k`); with a modifier, case is stylistic only (`ctrl+K` = `ctrl+k`).
- **Chords**: space-separated sequences, e.g. `ctrl+k ctrl+s`.
- **Special keys**: `escape`/`esc`, `enter`/`return`, `tab`, `space`, `up`/`down`/`left`/`right`, `backspace`, `delete`.

## Unbind default shortcuts

```json
{ "bindings": [{ "context": "Chat", "bindings": { "ctrl+s": null } }] }
```

Unbinding every chord sharing a prefix frees that prefix as a single-key binding; a chord in any active context keeps its prefix reserved, so unbind each chord in its own context.

## Notes

- Default chords on the `ctrl+x` prefix, by context: `Chat` (`ctrl+x ctrl+k`, `ctrl+x ctrl+e`, `ctrl+x enter`, `ctrl+x ctrl+a`, `ctrl+x ctrl+s`, `ctrl+x tab`), `Task` (`ctrl+x ctrl+b`), `DiffPanel` (`ctrl+x b`), `Pane` (`ctrl+x left/right/up/down`, `ctrl+x x`), `PaneField` (`ctrl+x x`). `ctrl+x enter` requires v2.1.247 or later; `ctrl+x b`, `ctrl+x ctrl+a`, and `ctrl+x tab` require v2.1.260 or later; `ctrl+x ctrl+s` requires v2.1.275 or later.
- Changed or removed actions (the official page notes each as a "Before vX" change):
  - `footer:dismiss` is unbound (v2.1.281); binding a key to it has no effect, and a `keybindings.json` that names it remains valid. Before v2.1.281, Backspace and Delete were bound to it.
  - The default `y` / `n` bindings for `confirm:yes` / `confirm:no` were removed in v2.1.280 (a `keybindings.json` created with `/keybindings` before then lists them and they stay in effect until you delete those two lines).
  - `confirm:toggleExplanation` (Ctrl+E on Bash / PowerShell permission prompts) was removed in v2.1.257.
  - `messageSelector:up` / `down` / `top` / `bottom` / `select` and `diff:viewDetails` were merged into the `Select` bindings in v2.1.283; existing bindings of those names keep working as the equivalent Select actions. Home and End jump to either end of the message list.
  - Before v2.1.280, other lists ignored Home, End, and your `select:first` / `select:last` bindings; before v2.1.283, the `/mcp` tool list paged with fixed PageUp / PageDown keys regardless of your bindings.
- Reserved shortcuts that cannot be rebound: Ctrl+C (interrupt), Ctrl+D (exit), Ctrl+M (same as Enter in terminals), Caps Lock (not delivered to terminal apps).
- Terminal-multiplexer conflicts: Ctrl+B (tmux prefix, press twice), Ctrl+A (GNU screen prefix), Ctrl+Z (Unix SIGTSTP).
- Vim mode (`/config` → Editor mode) and keybindings operate independently: vim mode handles text-input-level motions; keybindings handle component-level actions. Vim keys aren't remappable through this file — use `vimInsertModeRemaps` for INSERT-mode sequences like `jj`→Escape.
- Claude Code validates the file at load and logs warnings (parse errors, invalid contexts, reserved/multiplexer conflicts, duplicate bindings) to the debug log; start with `--debug` to see them.

## Related

- [terminal-config.md](./terminal-config.md): terminal-side key handling (Shift+Enter, Option-as-Meta) vs. this file's Claude-Code-side handling
