<!-- source: https://code.claude.com/docs/en/interactive-mode.md / last verified: 2026-10-17 -->

# Interactive mode

Complete reference for keyboard shortcuts, input modes, and interactive features in Claude Code sessions.

## Signature / Usage

```bash
! npm test          # shell mode: run a command directly, response auto-generated
/                    # command or skill menu
@                    # file path mention / autocomplete
:heart:              # emoji shortcode (v2.1.217+)
/btw what was that config file called?   # side question, not added to history
```

Multiline input: `\` + `Enter` (any terminal), `Option+Enter` (macOS with Option-as-Meta), `Shift+Enter` (native in iTerm2/WezTerm/Ghostty/Kitty/Warp/Terminal.app/Windows Terminal), `Ctrl+J` (any terminal), or paste directly.

## Options / Props

| Shortcut | Description |
| --- | --- |
| `Ctrl+C` | Interrupt, or clear input (second press exits). Press `Up` while the prompt is still empty to bring a cleared draft back (v2.1.288+) |
| `Ctrl+X Ctrl+K` | Stop all running background subagents in this session and turn off artifact auto-replies for the rest of it. Press twice within 3 seconds to confirm |
| `Ctrl+D` | Exit session (double-press within 800ms) |
| `Ctrl+G` / `Ctrl+X Ctrl+E` | Open the prompt in the default text editor (`Ctrl+X Ctrl+E` is the readline-native binding) |
| `Ctrl+L` | Redraw the screen, keeping input and conversation history |
| `Ctrl+Enter` / `Ctrl+X Ctrl+S` | Send queued messages (and your draft) now (v2.1.275+). `Ctrl+X Ctrl+S` works in any terminal; `Ctrl+Enter` arrives as plain `Enter` where extended keys aren't reported. In shell mode the key only queues the command. Behavior changed at v2.1.281 (see Notes) |
| `Ctrl+O` | Toggle transcript viewer |
| `Ctrl+R` | Reverse search command history |
| `Ctrl+B` | Background running Bash task/agent (tmux: press twice) |
| `Ctrl+T` | Toggle Claude's to-do task list |
| `Ctrl+S` | Stash / restore prompt draft |
| `Ctrl+Z` | Suspend Claude Code (Unix), `fg` to resume |
| `Shift+Tab` (or `Alt+M` on Windows when the Node or Bun runtime doesn't enable VT input mode) | Cycle permission modes: `default` (labeled Manual), `acceptEdits`, `plan`, and, when available, `bypassPermissions` and then `auto`. From `auto`, the first press switches to `default` |
| `Esc` / `Esc Esc` | Interrupt or close dialog / clear input draft or open rewind menu |
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking. Has no effect on Opus 5.5, Sonnet 5.5, Haiku 5.5, or the Fable models, which always use extended thinking |
| `Option+O` / `Alt+O` | Toggle fast mode |

## Notes

- `@` also suggests your other live sessions on this machine for cross-session messaging, once you type at least one letter after it (v2.1.232+).
- Text editing follows readline conventions from v2.1.261 (`Ctrl+A`/`E`/`K`/`U`/`W`/`Y`, `Alt+B`/`F`/`D`). The `keybindingFlavor` setting that enabled them earlier is deprecated and has no effect.
- Vim editor mode (`/config` → Editor mode) supports NORMAL/INSERT/VISUAL mode switching (`i`/`I`/`a`/`A`/`o`/`O`/`v`/`V`; `Esc` or `Ctrl+[`, where `Ctrl+[` under the Kitty keyboard protocol needs v2.1.242+), navigation (`h``j``k``l`, `w`/`e`/`b`, `0`/`$`/`^`, `gg`/`G`, `f`/`F`/`t`/`T`, `%` to jump to the matching bracket (v2.1.301+)), editing (`x`, `dd`, `D`, `dw`/`de`/`db`, `cc`/`C`, `yy`, `p`/`P`, `u`, `.`, `d0`/`c0`/`y0` (v2.1.281+), `d%`/`c%`/`y%` (v2.1.301+)), and text objects (`iw`/`aw`, `i"`/`a"`, `i(`/`a(`, etc.).
- `?` on an empty prompt toggles the shortcut help panel.
- Background Bash: output written to a file, auto-terminated if it exceeds 5GB. Background commands in a local interactive session (terminal, desktop app, VS Code extension) have no time limit; an unattended session (`-p`, cloud) stops them at its time limit. A background command started by a foreground subagent ends when that subagent's run ends (finished, failed, or interrupted). The earlier 60-minute `CLAUDE_SUBAGENT_BG_SHELL_MAX_MS` default is no longer in the source.
- On macOS and Linux, running background tasks are stopped when the OS reports critical memory pressure, provided the session has been idle at least 30 minutes with no turn or subagent running. Set `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` to turn this off.
- Shell mode (`!` prefix) auto-responds to command output as of v2.1.186; set `respondToBashCommands: false` to restore the old behavior of just adding output to context.
- Queue messages: `Enter` while Claude works queues the message (shown gray until Claude starts on it). `Up` from the first input line takes queued messages back into the input box. Before v2.1.281, `Ctrl+Enter` always interrupted the turn; now running shell commands, subagents, or other backgroundable work move to the background and Claude reads the messages in the same turn, and the turn is interrupted only when Claude is just writing a response.
- "You should know" suggestions: a built-in mod (off by default; `/plugin enable cc-plugin-you-should-know@builtin`) that shows a short note above the prompt. Requires v2.1.287+.
- Spell check: off by default, underlines misspellings in the prompt input using aspell, hunspell, or ispell via the `spellcheck` setting. Requires v2.1.235+.
- `/diff`: in fullscreen rendering opens a diff panel beside the conversation (needs v2.1.287+, a git repo, and a terminal at least 110 columns wide); in the classic renderer it opens a dialog above the prompt. Both come from the built-in `cc-plugin-diff` mod. `Ctrl+X B` cycles what the panel compares against.
- Usage limit wait: when a claude.ai usage limit stops Claude mid-task, Claude Code waits in the open session and continues on its own after the reset (v2.1.234+, on by default for claude.ai subscription sign-ins; `autoContinueAtUsageLimit`, `/rate-limit-options`).
- PR review status: a clickable PR link in the footer with a colored underline (green approved, yellow pending, red changes requested, gray draft). For GitLab, a `MR !N` badge shows when the `glab` CLI is authenticated (v2.1.234+).
- Issue reference links: `owner/repo#123` is clickable in terminals with hyperlink support (`FORCE_HYPERLINK` 1/0 overrides detection); bare `#123` and references in code spans stay plain text.
- `/btw` has full conversation visibility but no tool access; press `f` to fork it into a real session with tools. `Shift+Left` / `Shift+Right` step between earlier `/btw` answers from v2.1.257; between v2.1.187 and v2.1.256 the keys were plain `Left` / `Right`. In the VS Code chat panel `/btw` opens a panel instead (extension v2.1.227+).
- Session recap generates automatically after 3+ minutes away and at least 3 turns; `/recap` generates on demand.

## Related

- [fullscreen](./fullscreen.md)
- [accessibility](./accessibility.md)
- [voice-dictation](./voice-dictation.md)
