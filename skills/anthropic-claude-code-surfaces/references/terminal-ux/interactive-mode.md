<!-- source: https://code.claude.com/docs/en/interactive-mode.md / last verified: 2026-11-14 -->

# Interactive mode

Complete reference for keyboard shortcuts, input modes, and interactive features in Claude Code sessions.

## Signature / Usage

```bash
! npm test          # shell mode: run a command directly, response auto-generated
/                    # command or skill menu
@                    # file path mention / autocomplete
:heart:              # emoji shortcode
/btw what was that config file called?   # side question, not added to history
```

Multiline input: `\` + `Enter` (any terminal), `Option+Enter` (macOS with Option-as-Meta), `Shift+Enter` (native in iTerm2/WezTerm/Ghostty/Kitty/Warp/Windows Terminal; other terminals need setup, see terminal-config "Enter multiline prompts"), `Ctrl+J` (any terminal), or paste directly.

Vim-mode `jj` remap example (`~/.claude/settings.json`):

```json
{
  "editorMode": "vim",
  "vimInsertModeRemaps": { "jj": "<Esc>" }
}
```

## Options / Props

| Shortcut | Description |
| --- | --- |
| `Ctrl+C` | Interrupt a running operation; if nothing is running, first press clears the input and a second press exits. Press `Up` while the prompt is still empty to bring a cleared draft back (v2.1.288+) |
| `Ctrl+X Ctrl+K` | Stop all running background subagents in this session and turn off artifact auto-replies for the rest of it. Press twice within 3 seconds to confirm; can be pressed while a background subagent's permission prompt is open |
| `Ctrl+D` | Exit session (double-press within 800ms). With text in the prompt it deletes the character after the cursor instead |
| `Ctrl+G` / `Ctrl+X Ctrl+E` | Open the prompt in the default text editor (`Ctrl+X Ctrl+E` is the readline-native binding). **Show last response in external editor** in `/config` prepends Claude's previous reply as `#`-commented context, stripped on save |
| `Ctrl+L` | Redraw the screen, keeping input and conversation history |
| `Ctrl+O` | Toggle transcript viewer (tool usage, timestamp and model per assistant message; expands collapsed lines such as MCP calls and messages from your other sessions) |
| `Ctrl+R` | Reverse search command history |
| `Ctrl+V` / `Cmd+V` (iTerm2) / `Alt+V` (Windows and WSL) | Paste image from clipboard as an `[Image #N]` chip. On WSL both `Ctrl+V` and `Alt+V` are bound |
| `Ctrl+B` | Background running Bash task/agent (tmux: press twice) |
| `Ctrl+T` | Toggle Claude's to-do task checklist (not the background-task view; use `/tasks` for running shells and subagents) |
| `Ctrl+S` | Stash / restore prompt draft (restores cursor, pasted content, and input mode, e.g. a stashed `!` command returns in shell mode) |
| `Ctrl+Z` | Suspend Claude Code (Unix only), `fg` to resume |
| `Left` / `Right` | Cycle dialog tabs (while the tab row has focus) |
| `Tab` | Accept the selected autocomplete suggestion; on most permission prompts, with Yes or No focused, opens/closes a comment field on that option |
| `Up` / `Down` or `Ctrl+P` / `Ctrl+N` | Move the cursor within a multi-row input first, then navigate command history. While messages are queued, `Up` from the first row takes them back |
| `Ctrl+Enter` / `Ctrl+X Ctrl+S` | Send queued messages (and your draft) now (v2.1.275+). `Ctrl+X Ctrl+S` works in any terminal; `Ctrl+Enter` arrives as plain `Enter` where extended keys aren't reported. In shell mode the key only queues the command. Behavior changed at v2.1.281 (see Notes) |
| `Shift+Tab` (or `Alt+M` on Windows when the Node or Bun runtime doesn't enable VT input mode) | Cycle permission modes: `default` (labeled Manual), `acceptEdits`, `plan`, then `bypassPermissions` and `auto` where available. On a file permission prompt it closes an open comment field, otherwise selects the allow-for-the-rest-of-the-session option when offered; at the plan approval prompt it approves the plan |
| `Esc` | Interrupt Claude or close a dialog. Claude keeps work done so far; queued messages are sent next. On a permission prompt it declines the action. With a footer item selected (e.g. subagent panel row) it deselects instead |
| `Esc Esc` | Clear the input draft (saved to history so `Up` recalls it), or with empty input open the rewind menu |
| `Option+P` / `Alt+P` | Switch model without clearing the prompt |
| `Option+T` / `Alt+T` | Toggle extended thinking. No effect on Opus 5.5, Sonnet 5.5, Haiku 5.5, or the Fable models, which always use extended thinking. Works on macOS without Option-as-Meta |
| `Option+O` / `Alt+O` | Toggle fast mode |

### Text editing

| Shortcut | Description |
| --- | --- |
| `Ctrl+A` / `Ctrl+E` | Start / end of current logical line |
| `Ctrl+K` | Delete to end of line (stored for pasting) |
| `Ctrl+U` | Delete to line start; repeat to clear across lines. On macOS `Cmd+Backspace` maps to it in iTerm2 and Terminal.app |
| `Ctrl+W` | Delete back to previous whitespace (a whole path or `--flag=value`). Use `Option+Delete` (macOS) or `Ctrl+Backspace` (Windows) to delete only the previous word |
| `Ctrl+Y` / `Alt+Y` (after `Ctrl+Y`) | Paste deleted text / cycle paste history |
| `Alt+B` / `Alt+F` / `Alt+D` | Back one word / forward one word / delete to end of word (need Option-as-Meta on macOS) |
| `Ctrl+_` or `Ctrl+Shift+-` | Undo last input edit |

### Quick commands and transcript viewer

| Key | Description |
| --- | --- |
| `/` at start | Command or skill. Mid-prompt completion also works (`/` after a space); a command runs only when it starts the message |
| `!` at start | Shell mode |
| `@` | File path mention; also suggests other live sessions for cross-session messaging after at least one letter (v2.1.232+) |
| `:` | Emoji shortcode (full `:name:` inserts; two or more characters open suggestions) |
| `?` on empty input | Toggle the shortcut help panel |
| Hold or tap `Space` | Voice dictation (needs voice dictation enabled; `/voice tap` for tap-to-toggle) |
| Transcript viewer (`Ctrl+O`): `?`, `{` / `}`, `[`, `v` | Help panel, previous/next prompt, write to native scrollback, open in `$VISUAL`/`$EDITOR`. All need fullscreen rendering |
| Transcript viewer: `Ctrl+E` | Toggle show all content (classic renderer only; rebindable via `transcript:toggleShowAll`) |
| Transcript viewer: `q`, `Ctrl+C`, `Esc` | Exit (rebindable via `transcript:exit`) |

## Notes

- Option/Alt shortcuts (`Alt+B`, `Alt+F`, `Alt+D`, `Alt+Y`, `Alt+P`) require Option as Meta on macOS.
- Text editing follows readline conventions from v2.1.261. The `keybindingFlavor` setting that enabled them earlier is deprecated and has no effect. These shortcuts can't be remapped in the keybindings file. Word shortcuts (`Alt+B`/`Alt+F`/`Alt+D`, `Option+Delete`, `Ctrl+Backspace`) treat a word as a run of letters and digits (punctuation separates words); `Ctrl+W` ignores punctuation.
- `Ctrl+T` inside the `/theme` picker toggles syntax highlighting for code blocks.
- `/` and `@` suggestion lists respond to the mouse in fullscreen rendering. Mid-prompt command completion: in fullscreen the matches open as a list (`Tab` inserts the top match); outside fullscreen the rest of the top match shows as ghost text. A plugin skill matches on its bare name too (`/deploy` finds `myplugin:deploy-app`).

### Vim editor mode

- Enable via `/config` → Editor mode. NORMAL/INSERT/VISUAL switching (`i`/`I`/`a`/`A`/`o`/`O`/`v`/`V`; `Esc` or `Ctrl+[`, where `Ctrl+[` under the Kitty keyboard protocol needs v2.1.242+).
- Navigation: `h`/`j`/`k`/`l`, `Space`, `w`/`e`/`b`, `0`/`$`/`^`, `gg`/`G`, `f`/`F`/`t`/`T`, `;` / `,` (repeat / reverse), `%` to the matching bracket (v2.1.301+), `/` opens reverse history search like `Ctrl+R`. At the start or end of input `j`/`k` and arrows navigate command history; `←` on an empty prompt opens agent view.
- Editing: `x`, `r{char}`, `dd`, `D`, `dw`/`de`/`db`, `df`/`dt{char}`, `dj`/`dk`, `dgg`/`dG`, `d0`/`c0`/`y0` (v2.1.281+), `d%`/`c%`/`y%` (v2.1.301+), `cc`/`C`, `cw`/`ce`/`cb`, `s`/`S`, `yy`/`Y`, `yw`/`ye`/`yb`, `p`/`P`, `>>`/`<<`, `J`, `u`, `.`.
- Text objects: `iw`/`aw`, `iW`/`aW`, `i"`/`a"`, `i'`/`a'`, `i(`/`a(`, `i[`/`a[`, `i{`/`a{`. Visual mode (`v`/`V`) supports `d`/`x`, `y`, `c`/`s`, `p`/`P`, `r{char}`, `~`/`u`/`U`, `>`/`<`, `J`, `o`, text objects; block-wise `Ctrl+V` is not supported.
- `vimInsertModeRemaps`: each key is exactly two printable characters, `"<Esc>"` is the only supported target, the second key must follow within one second. Read only from user settings, `--settings`, and managed settings; project `.claude/settings.json` / `.claude/settings.local.json` entries are ignored.
- Cancel a question in the `Other` row: press `Esc` twice (or bind another key via keybindings).

### Command history

- Stored per working directory; `Up` reaches prompts from past sessions of the same project. `/clear` starts a new session whose prompts are listed first. Consecutive identical prompts record one entry. History expansion with `!` is disabled by default.
- Cleared drafts: right after `Ctrl+C`, `Up` on an empty prompt restores it (v2.1.288+); after sending, `Up` steps back to the ten most recent cleared drafts of this session (v2.1.292+).
- `Ctrl+R` in fullscreen opens a search dialog (`Up`/`Down`, `Ctrl+S` cycles scope session/project/all projects, `Enter`/`Tab` accepts, `Esc` cancels). The classic inline search always searches all projects (`Tab`/`Esc` accept, `Enter` accepts and runs, `Ctrl+C` cancels). A word from a long pasted block also matches (v2.1.314+).

### Background Bash and shell mode

- Output is written to a file, auto-terminated if it exceeds 5GB. When a command hits its timeout it is moved to the background instead of stopped (unless it starts with `sleep`); `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` or bare mode turns this off and also removes `Ctrl+B`. Background commands in a local interactive session have no time limit; an unattended session (`-p`, cloud) stops them at its time limit. A command started by a foreground subagent ends when that subagent's run ends.
- Background tasks are cleaned up on exit; on macOS/Linux detached processes (e.g. under `setsid` or `timeout`) stop too. On macOS and Linux, running background tasks are stopped under critical OS memory pressure when the session has been idle at least 30 minutes with no turn or subagent running; set `CLAUDE_CODE_DISABLE_BG_SHELL_PRESSURE_REAP=1` to turn this off.
- Shell mode (`!` prefix): adds command and output to context, supports `Ctrl+B`, history-based autocomplete with `Tab`, live file path autocomplete for tokens containing `/`, exit with `Escape`/`Backspace`/`Ctrl+U` on an empty prompt, and pasted text starting with `!` enters shell mode. It runs outside the sandbox (unless strict sandbox mode applies). Claude responds to the output automatically (same cost as a prompt); set `respondToBashCommands: false` to only add output to context.

### Queue messages

- `Enter` while Claude works queues the message (shown gray until Claude starts on it); `!` shell commands and most commands queue too, except commands such as `/status` that run immediately. A queued message with an IDE selection keeps the selection from when you pressed `Enter`.
- Messages queued during tool calls reach Claude as soon as the calls finish, in the same turn; remaining ones go out after the turn ends in typed order. Commands and shell commands wait until the turn ends and run one at a time.
- `Ctrl+Enter` sends now (v2.1.275+). If a `!` shell command is queued ahead, the turn is interrupted. Otherwise, running shell commands, subagents, or other backgroundable work move to the background and Claude reads the messages in the same turn; when Claude is only writing a response (or running something that can't background), the turn is interrupted. Before v2.1.281 the key always interrupted. Both keys are bindings of the `chat:sendNow` action. `Esc` interrupts without submitting your draft and sends what you queued right away.
- `/model`, `/effort`, `/fast` run immediately: `/model` applies from the next request in the turn (after confirming a cache warning), `/effort` applies from the next message you send, `/fast` applies from your next turn (if the model lacks fast mode, turning it on also switches the model).
- Pressing `←` to background a session moves queued messages with it; commands, `!` shell commands, and messages that can't move (such as one with an IDE selection) block it with a notice beginning `Cannot open agents`.
- `Up` from the first input line takes queued entries back into the input box (shell commands only when the box is empty and nothing else is queued). Messages taken back are saved as separate command-history entries.

### Prompt suggestions

- A grayed-out example appears on first open (from git history); after a response Claude Code can suggest a next prompt (`Tab` or `Right` places it, typing dismisses). Each suggestion is a short background request to the session's model and counts toward usage; it mostly reuses the prompt cache.
- Off by default (and the `/config` toggle hidden) in sessions that don't fetch feature flags (third-party providers, Claude apps gateway) and in the first session after an install or upgrade. Skipped when the cache is cold, after the first turn in some sessions, after an error, in plan mode, near the usage limit (set `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=true` to keep them until the limit; before v2.1.238 skipped near the limit even then), and in agent-team teammate sessions. `Showing fewer prompt suggestions · use one to bring them back` means unused suggestions reduced the frequency.
- Print mode: pass `--prompt-suggestions` with `-p "<prompt>" --output-format stream-json --verbose` to emit a `prompt_suggestion` message per turn that generates one.
- Turn off: `/config` toggle, `promptSuggestionEnabled: false`, or `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=false` (takes precedence). For an organization, set `promptSuggestionEnabled` to `false` in managed settings and also set the variable to `false` under the managed `env` key.

### You should know suggestions

- Built-in mod, off by default; enable with `/plugin enable cc-plugin-you-should-know@builtin`, disable with `/plugin disable cc-plugin-you-should-know@builtin`. Requires v2.1.287+. A tool-less side agent (separate request to the same model) rereads the conversation and shows a short note above the prompt; answer by typing the choice digit on an empty prompt (Learn more / Knew this already / Dismiss).
- `/plugin` lists it only when connecting directly to the Claude API with a claude.ai account or Console API key (not via LLM gateway, Claude apps gateway, or `apiKeyHelper`) and in sessions that fetch feature flags (not `DISABLE_TELEMETRY`, not the first session after install/upgrade). Checks count toward usage (several thousand tokens of instructions are billed in full each check). `CLAUDE_CODE_YOU_SHOULD_KNOW_DEBUG=1` shows checks. State lives in a `cc-plugin-you-should-know*` file under `~/.claude/plugins/store/`, deleted after `cleanupPeriodDays` without use.

### Emoji, spell check, invisible characters

- `emojiCompletionEnabled: false` disables the emoji popup and inline replacement. The shortcode must start the input or follow a space.
- Spell check (off by default, v2.1.235+; nothing is checked in shell mode, `Ctrl+R` search, voice dictation, or screen reader mode): needs aspell, hunspell, or ispell on `PATH` (first found, in that order). Enable with `spellcheck.enabled` in user settings, `--settings`, or managed settings (ignored in project settings; managed first, then `--settings`, then user, no merging). Optional fields `checker`, `language` (e.g. `en_GB`), `color`. Code-like text, CJK/Thai/Lao/Khmer/Myanmar text is skipped. No checker, two consecutive checker failures, or three 15-second timeouts stop checking until restart; see `[spellcheck]` lines in `~/.claude/debug/<session-id>.txt` with `claude --debug`.
- Invisible Unicode characters (tag characters, bidirectional controls, zero-width spaces) are removed on Enter, including from collapsed pasted-text references. If anything was removed, that Enter sends nothing and the cleaned prompt returns to the input box with a notice; press Enter again to send. A prompt passed on the command line is cleaned and sent without a second Enter (put in the input box instead if it would start with `/`).

### /diff

- Fullscreen rendering opens a diff panel beside the conversation (needs v2.1.287+, a git repo, and a terminal at least 110 columns wide; opens on its own once Claude edits files at 144+ columns, and after you've opened it yourself, in any wide-enough terminal; stays closed after you close it until you run `/diff` again). The classic renderer opens a dialog above the prompt. Both come from the built-in `cc-plugin-diff` mod; disabling it falls back to the earlier panel and diff viewer.
- Panel: click a file row to jump, `ask` attaches that file's diff to your next prompt (`asked ✓`), a `source` picker shows one turn's edits (`T1`, `T2`, ... or `Current`), test and generated files and pre-session changes are collapsed (click to expand), `Alt+Up`/`Alt+Down` or `Ctrl+Up`/`Ctrl+Down` scroll a long file list, and `Ctrl+X B` cycles the comparison: this session's changes, your uncommitted changes, everything since the branch split from the default branch (remembered per repository). During an unfinished merge, rebase, cherry-pick, or revert it keeps the last-read changes.
- Dialog: compares against `HEAD` (or the panel's last choice for the repository); `Up`/`Down` select, `Enter` opens a file's diff, `Esc` goes back or closes, `Tab` moves to the `source` picker or the `ask` button. Submodules appear as one entry, only when the pointed-to commit changes. Turn views come from Claude's file edits, not git, so shell-command changes appear only under `Current`.

### /btw

- Has full conversation visibility (the newest 20 earlier side exchanges are replayed with each ask) but no tools; runs while Claude is working without interrupting. Single response in an overlay: `Space`/`Enter`/`Escape` dismiss, `Up`/`Down` scroll, `Shift+Left`/`Shift+Right` step between answers (v2.1.257+; `[`/`]` and `Tab`/`Shift+Tab` also work; between v2.1.187 and v2.1.256 plain `Left`/`Right`), `c` copies as raw Markdown, `f` forks into a background subagent with full tools (local sessions only), `x` clears earlier exchanges. Run `/btw` with no question to reopen the overlay.
- In the VS Code chat panel `/btw` opens a panel instead (extension v2.1.227+). In an attached background session `Left` detaches to agent view and the side question keeps running (before v2.1.257 it didn't detach).
- With a subagent's transcript open, `/btw` answers from that transcript (v2.1.314+); from an agent-team teammate's transcript it answers from the main conversation.

### Task list, recap, usage limit wait

- Task list: `Ctrl+T` toggles it (up to five tasks shown; restored expanded on `--resume`/`--continue` if left expanded; persists across compaction). It fills only where task-tracking tools exist (default on Opus 4.7, Sonnet 4.6, Haiku 4.5, and earlier); otherwise set `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`. `CLAUDE_CODE_TASK_LIST_ID` shares a list across sessions via a named directory in `~/.claude/tasks/`.
- Session recap: generated in the background once at least three minutes have passed since the last completed turn with the terminal unfocused, and the session has at least three turns. `/recap` runs on demand (only when you ask yourself; relayed Slack/Teams/cloud scheduled-task requests get a notice). On by default for every plan and provider, off via `/config` **Session recap**; never in non-interactive mode; capped at 400 characters.
- Usage limit wait (v2.1.234+): when a claude.ai usage limit stops Claude mid-task, Claude Code waits and continues on its own after the reset (it prompts Claude to pick up the task; it doesn't resend your message). `Esc` at an empty prompt, `Ctrl+C`, or **Don't continue automatically** in `/rate-limit-options` cancels. After three automatic continuations it stops (`Automatic continue stopped after repeated usage-limit hits`). After a computer sleep of more than about 30 minutes past the reset, press `Enter` to continue. Not started on its own for Remote Control / agent-team teammate sessions, resets more than 24 hours away, or an Opus/Sonnet limit while on a model outside that family; not offered in background sessions, `-p` runs, API-key / cloud-provider / usage-based billing, or LLM-gateway sessions without a saved claude.ai login. Turn off via `/config` **Continue automatically at usage limit** or `autoContinueAtUsageLimit: false` (`/config autoContinueAtUsageLimit=false` also works but can't turn it back on).

### PR and issue links

- PR status: a clickable footer link such as "PR #446" with a colored underline (green approved, yellow pending, red changes requested, gray draft); disappears when merged or closed; refreshes after `git push` or a state-changing `gh pr` command. `Cmd+click` / `Ctrl+click` opens it. Rendered as a hyperlink even when support isn't detected; `FORCE_HYPERLINK=0` renders plain text. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` disables the status check. GitHub needs a token: github.com uses `GH_TOKEN`/`GITHUB_TOKEN` or `gh auth login` (footer hints `install gh for PR status` / `gh auth login for PR status`); a `GH_HOST` Enterprise host uses `GH_ENTERPRISE_TOKEN`/`GITHUB_ENTERPRISE_TOKEN` or `gh auth login --hostname <host>`.
- GitLab: a `MR !N` badge (green mergeable, yellow other open state, gray draft) needs v2.1.234+, a GitLab remote, and `glab` on `PATH` authenticated with `glab auth login` (`GITLAB_TOKEN` is ignored; restart after installing or logging in).
- `owner/repo#123` is clickable in terminals with hyperlink support (`FORCE_HYPERLINK` 1/0 overrides detection). Bare `#123`, nested GitLab paths, code spans, and replies over about 1,000 lines or 100,000 characters stay plain. The link targets the host of your git remote: `https://<host>/owner/repo/issues/123` (GitHub / unlisted hosts), `https://gitlab.com/owner/repo/-/issues/123`; bitbucket.org, codeberg.org, and gitea.com get no link.
- Source: https://code.claude.com/docs/en/interactive-mode.md (fetched 2026-11-14)

## Related

- [fullscreen](./fullscreen.md)
- [accessibility](./accessibility.md)
- [voice-dictation](./voice-dictation.md)
