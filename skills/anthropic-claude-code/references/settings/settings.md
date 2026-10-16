<!-- source: https://code.claude.com/docs/en/settings.md / last verified: 2026-10-16 -->

# Settings files and precedence

Change Claude Code settings, pick the scope a key belongs in, verify the change, and learn which value Claude Code uses when a key is set in several places. Run `/config` for the interactive menu, or `/config key=value` (for example `/config verbose=true`) to set one option directly.

## Settings files and who they affect

Claude Code reads settings from four files, and an organization can also deliver managed settings from the claude.ai console. Each source has a scope: the set of people and projects a setting saved in it applies to.

| Scope | File | Who it affects | Use it for |
| --- | --- | --- | --- |
| User | `~/.claude/settings.json` | You, in every project on this machine | Personal preferences: theme, editor mode, default model, your own permission rules |
| Shared project | `.claude/settings.json` | Everyone working in the folder that contains it. In a git repository, commit it so teammates get it | Team permissions, hooks, plugins, and the environment variables the project needs |
| Project local | `.claude/settings.local.json` | You, in this one project only. Claude Code keeps it out of git when it creates the file; if you create it by hand, add it to `.gitignore` yourself | Personal overrides for one project, and testing before you share |
| Managed | `managed-settings.json` and other managed sources (server-managed settings, MDM / OS-level policy) | Everyone your organization deploys it to | Security policy and compliance requirements |

In the File column, `~/.claude` is the `.claude` folder in your home directory, and a bare `.claude` is the `.claude` folder inside your project. On Windows, `~/.claude` means `%USERPROFILE%\.claude`; set `CLAUDE_CONFIG_DIR` to keep the home-directory files elsewhere.

### Find or create your settings files

Installing Claude Code doesn't create any settings file.

- **Managed**: your organization deploys it. You don't create or edit it.
- **Shared project**: a project that already uses Claude Code may have one committed. If not, create it at `.claude/settings.json` in the project folder.
- **User** and **Project local**: create them yourself, or let Claude Code create them. It writes `~/.claude/settings.json` the first time you change an option in `/config` that it stores in user settings (such as the theme), and `.claude/settings.local.json` the first time you give a standing approval on a permission prompt ("Yes, and don't ask again"). A few `/config` options, including **Show tips**, save to `.claude/settings.local.json`.

Claude Code also keeps a fifth file, `~/.claude.json`, that it writes for itself. It holds your sign-in session, MCP server configurations, per-project state such as trust decisions, and the global config keys that `/config` writes for you.

### Share settings with your team

Commit `.claude/settings.json` so everyone who clones the repository gets the same permissions, hooks, and plugins. Each teammate can still override it in their own `.claude/settings.local.json`. Some of what you commit waits until each teammate trusts the folder, and a few keys never take effect from a repository file (see "Troubleshoot a setting that doesn't apply").

### Keep personal settings out of a repository

To change a setting for yourself in one project without changing it for your teammates, save it in `.claude/settings.local.json`. Claude Code applies that file over the committed `.claude/settings.json`.

- Claude Code writes it too: choosing "Yes, and don't ask again" saves an `allow` rule here.
- The first time Claude Code writes the file in a git repository that doesn't already ignore it, it adds `**/.claude/settings.local.json` to your global git excludes file (`core.excludesFile` when your global git config sets it to an absolute or `~`-prefixed path; otherwise `$XDG_CONFIG_HOME/git/ignore`, or `~/.config/git/ignore` when `XDG_CONFIG_HOME` is unset). If you created the file by hand and Claude Code hasn't written to it yet, add it to `.gitignore` yourself.
- Its `allow` rules don't wait for workspace trust while the file stays untracked. If the file is tracked by git, the trust step applies to it too.

#### Where Claude Code keeps the local file in a git repository

If you start Claude Code in a subdirectory of a git repository, it reads and writes `.claude/settings.local.json` at the repository root. In a worktree, it uses the file at the main checkout's root. The file stays with `.claude/settings.json` instead outside a git repository, when the repository root is your home directory, on Windows, or when the repository root or its `.git` or `.claude` entry isn't owned by your user. Paths in the file don't anchor at the repository root: a permission rule that starts with `/` or a relative sandbox path anchors at the session's primary working directory.

Before v2.1.211, Claude Code kept the file in the starting directory. It still reads a file an earlier version left there alongside the root file; where both set the same key, the root's value applies, and permission rules from both files apply. Claude Code reads the shared `.claude/settings.json` from the session's primary working directory; after `/cd`, it reads both project files from the new directory (requires v2.1.246 or later).

### Check what your organization enforces

Run `/status`: the `Setting sources` line names the managed source that applies to you. Managed settings reach you through server-managed settings (claude.ai admin console or a self-hosted Claude apps gateway), MDM or OS-level policies and `managed-settings.json` files in a system directory, or an embedding host such as Claude Desktop through the SDK `managedSettings` option. In a Cowork session that runs on your machine in the Claude Desktop app, Claude Code doesn't fetch server-managed settings from the claude.ai admin console, and it reads policy deployed to your device unless your organization's Claude Desktop configuration sets `requireCoworkFullVmSandbox`.

## Change a setting

You can change a setting from the `/config` menu, by editing a settings file, or for one session from the command line. Claude Code's system prompt isn't published; to give Claude standing instructions, use `CLAUDE.md` files or the `--append-system-prompt` flag.

### Use the /config menu

Run `/config` inside Claude Code and open the **Config** tab. It lists a short set of personal options such as theme, editor mode, and verbose output, not every settings key. Claude Code saves a choice to:

- Most options: `~/.claude/settings.json`
- A few options, such as Show tips: `.claude/settings.local.json`
- The global config options: `~/.claude.json`

`/config` is part of the terminal interface. The VS Code chat panel and the desktop app don't open it.

### Edit a settings file

Settings files are strict JSON: a `//` comment or a trailing comma is a syntax error, and Claude Code reports the file as a Settings Error at the next start.

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

The `$schema` line gives autocomplete and inline validation in editors that support JSON schema. The schema can lag behind the newest CLI releases, so a validation warning on a recently documented key doesn't mean your configuration is invalid. After you save, run `/status` to confirm the file loaded.

### Change a setting for one session

The value applies to that session and your settings files stay as they were:

- **`--settings`**: pass a key as JSON, inline or as a path to a file. Claude Code applies it above your user, project, and local files and below managed settings. It can set any key your user settings file can set; it can't set `Managed` or `Global config` keys.
- **A flag for that key**: such as `--model` for `model` and `--effort` for `effortLevel` and `modelSettings`.
- **An environment variable**: export the key's paired variable before you run `claude`, such as `ANTHROPIC_MODEL` for `model`.

Commands you run inside a session mostly save your choice: `/config` writes to your settings files, and `/model` saves the value as your default for new sessions. If you press `s` in the `/model` picker, Claude Code switches the model without saving it as your user default.

```bash
claude --settings '{"model": "claude-opus-5-5"}'
```

### When edits take effect

Claude Code watches your settings files and reloads them when they change, so most edits (including `permissions`, `hooks`, and credential helpers such as `apiKeyHelper`) apply to the running session without a restart. Claude Code also loads a settings file you create mid-session if its folder existed when the session started; for the project's `.claude/` folder, it loads the file even when you create the folder in the same session.

The reload covers user, project, local, and managed settings, and Claude Code runs the `ConfigChange` hook for each settings-file change it detects, not for managed settings that arrive from MDM or the claude.ai console (those reach a running session on a schedule rather than on save). Some keys are read only once at session start:

- `model`: use `/model` to switch mid-session. Each model has its own prompt cache, so the first request after a switch re-reads the whole conversation uncached.
- `effortLevel` and `modelSettings`: use `/effort` to change effort mid-session.

### Confirm what loaded

Run `/status`. The **Status** tab includes a `Setting sources` line that lists each settings file Claude Code loaded (such as `User settings` or `Project local settings`); for managed settings it shows in parentheses how they reached your machine. The line doesn't show which file supplied each key. To list entries Claude Code rejected, run `claude doctor`.

### Fix a broken settings file

- **Settings Error**: a user, project, or local file has invalid JSON or a value the schema rejects. At the start of an interactive session Claude Code shows a dialog that lets you fix the file with Claude's help, exit, or continue without the broken settings.
- **Settings Warning**: only individual entries fail, such as a malformed permission rule or an unknown hook event name. Claude Code skips those values and keeps the rest of the file in effect.
- **Managed settings**: Claude Code keeps enforcing the rest of the file; invalid entries are dropped, and some keys fall back to a stricter value until you fix them.
- **Configuration error**: `~/.claude.json` can't be parsed. Claude Code copies the broken file to `~/.claude/backups/.claude.json.corrupted.<timestamp>` and asks whether to exit and fix it by hand or reset to the default configuration; a `-p` run prints the error and exits. To recover, copy back one of the five most recent `.claude.json.backup.<timestamp>` files in `~/.claude/backups/`.

A `-p` run shows no dialog; after a `-p` run that ignores a setting, run `claude doctor` to see what it dropped.

## Settings precedence

When the same key appears in more than one place, Claude Code uses the value from the highest level that sets it. In order, highest precedence first:

1. **Managed settings**: a `managed-settings.json` file, an MDM policy, or server-managed settings. Nothing in your own settings files or `--settings` overrides a managed key, and a flag such as `--model` picks only from the models your organization allows. A managed `model` is a starting default, not a lock; the locks are `availableModels` and `deniedModels`.
2. **Command line**: JSON you pass with `--settings <file-or-json>`, for that session only. A key you leave out keeps its value from the files. Other flags, such as `--model`, set one thing for the session and aren't part of this stack.
3. **Project local settings** (`.claude/settings.local.json`)
4. **Shared project settings** (`.claude/settings.json`)
5. **User settings** (`~/.claude/settings.json`)

Environment variables aren't a level in this stack. Which one applies is decided per pair: `ANTHROPIC_MODEL` exported in your shell applies over the `model` key from any file, while `ANTHROPIC_DEFAULT_MODEL` applies only when no file sets `model`. An `env` block inside a settings file is an ordinary key and follows the levels above. For a few security-sensitive keys, Claude Code honors a stricter value from a lower level over a managed value (see "Exceptions to managed settings precedence").

### Lists merge instead of overriding

When you set the same list key, such as `permissions.allow`, in more than one file, Claude Code combines the lists. Four keys follow their own rules:

- `fallbackModel`: an ordered chain, so Claude Code takes the whole value from the highest-precedence file that defines it.
- `modelPicker`: holds one ordered list of rows plus a replace flag, so Claude Code never merges rows from two sources. It takes the whole value from the highest of managed settings, `--settings`, and user settings that defines it, and ignores the key in project and local settings. Requires v2.1.242 or later.
- `availableModels`: when the managed settings Claude Code applies define it, that list is applied as-is and entries in user, project, or local settings are ignored, unless an app that embeds Claude Code supplies its own model list. Across managed sources the list never merges; across non-managed scopes the arrays merge as usual.
- `modelSettings`: resolved one model at a time, together with `effortLevel`.

### Precedence examples

Suppose `spinnerTipsEnabled` is `false` in `~/.claude/settings.json`.

- **Team settings override personal settings**: the team's `.claude/settings.json` sets `true`; shared project sits above user. Add `"spinnerTipsEnabled": false` to `.claude/settings.local.json` to get your value back.
- **Organization settings override everything**: managed `true` can't be overridden by user, project, local, or `--settings`.
- **The command line overrides your files for one session**: `claude --settings '{"spinnerTipsEnabled": true}'` applies for that session only and writes no file.
- **A flag or environment variable sets the same thing**: `ANTHROPIC_MODEL` overrides the `model` setting, and `--model` overrides both for a session.

### Troubleshoot a setting that doesn't apply

Start with `/status` to see which files it loaded.

- **A value you set is ignored**: a higher level sets the key; a security key keeps its strict value (for example a project `true` for `disableClaudeAiConnectors` stays on); the file can't set that value (`permissions.defaultMode` values `auto` and `bypassPermissions` don't take effect from project or local settings, so use user or managed settings, or `--permission-mode` for one session; before v2.1.257, `bypassPermissions` took effect from any file; telemetry export variables in an `env` block don't take effect from project or local settings apart from a few off values); or the file is broken.
- **A change you made in Claude Code is lost in new sessions**: choices saved for new sessions (such as `/model`) are written to `~/.claude/settings.json`. If you can't write to that file (generated by another tool or linked read-only), the change applies to the current session only.
- **A managed change hasn't reached you**: managed sources reach a running session on a schedule, so restart the session first; if `/status` names a different source than the one your administrator changed, a higher-priority source applies.
- **A committed key doesn't reach teammates**: Claude Code ignores the key in a repository file (scope `User, local, or managed`, `User or managed`, `User`, `Managed`, or `Global config` in the settings index; `Global config` keys apply only from `~/.claude.json`), or the key waits for trust (`permissions.allow`, `permissions.additionalDirectories`, `extraKnownMarketplaces`, and most `env` values apply only after each teammate trusts the folder; `deny` and `ask` rules apply right away).
- **Permission rules combine differently than you expected**: an `allow` rule saved to your local file doesn't outrank an `ask` rule from a project or managed file. In the VS Code extension the approval card lets you pick the destination file; in the CLI, Claude Code writes only to your local file. Claude Code merges `permissions.allow` across scopes unless your organization sets `allowManagedPermissionRulesOnly`.

### Exceptions to managed settings precedence

For a few keys whose values restrict a session, Claude Code honors a restrictive value from a scope that otherwise couldn't override managed settings.

| Key | Value Claude Code honors | Notes |
| --- | --- | --- |
| `disableClaudeAiConnectors` | `true` from any scope | Honored even when a managed source sets `false` |
| `enableArtifact` | `false` from any scope, and `disableArtifact: true` from any scope | Honored even when a managed source sets `true`; nothing turns the Artifact tool back on. Requires v2.1.242 or later |
| `isolatePeerMachines` | `true` from any scope | Honored even when a managed source sets `false` |
| `permissions.blockReadsOutsideWorkingDirectories` | `true` from any scope | Honored even when a managed source sets `false`. Requires v2.1.257 or later |
| `autoMode.classifyAllShell` | `true` from `~/.claude/settings.json` or `--settings` | Honored even when a managed source sets `false` |
| `remoteControlAtStartup` | `false` from `.claude/settings.json` or `.claude/settings.local.json` | Honored even when a managed source sets `true`; a project or local `true` is ignored |
| `crossSessionInbound` | A stricter value from `.claude/settings.json` or `.claude/settings.local.json`, on the `accept` < `hold` < `refuse` ladder | Honored over managed, `--settings`, and user values; a project or local value that isn't stricter is ignored |
| `useAutoModeDuringPlan` | `false` from any managed source, `--settings`, `~/.claude/settings.json`, or `.claude/settings.local.json` | Honored even when the winning managed source sets `true`; a `false` in `.claude/settings.json` is ignored |
| `syncClaudeAiSkills` | `false` from any managed source, `--settings`, `~/.claude/settings.json`, or `.claude/settings.local.json` | Honored even when the winning managed source sets `true`; a `false` in `.claude/settings.json` is ignored |
| `syncClaudeAiPlugins` | `false` from any managed source, `--settings`, `~/.claude/settings.json`, or `.claude/settings.local.json` | Honored even when the winning managed source sets `true`; a `false` in `.claude/settings.json` is ignored |
| `maxEffortLevel` | A lower cap from any scope, including `--settings` | Honored even when the managed settings Claude Code applies set a higher cap; the lowest cap applies. Requires v2.1.267 or later |

An app that runs Claude Code inside itself and sets `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` is also an exception: Claude Code takes that app's model configuration over the `model`, `fallbackModel`, `modelPicker`, and `modelOverrides` keys from every managed source, and over the model-selection variables in a managed `env` block. A managed `availableModels` allowlist stays in force unless the app supplies its own.

## Settings in cloud sessions

A cloud session runs in a cloud environment on a fresh clone of your repository, not on your machine.

- **Shared project settings** (`.claude/settings.json`): read in a session with one repository. In an Anthropic-hosted environment, a session with several repositories reads only the `enabledPlugins` and `extraKnownMarketplaces` keys from each repository's `.claude/settings.json` (and those marketplaces and plugins still don't load in a cloud session).
- **User and project local settings**: not read.
- **Managed settings**: a `managed-settings.json` file or MDM profile on your device doesn't reach a cloud session; your organization's server-managed settings do. A self-hosted environment also reads the managed settings file in its runner image.
- **`/config`**: in your browser at claude.ai/code, opens the Claude Code section of your claude.ai settings instead of changing a value. To change a setting for a cloud session, set an environment variable on the environment, or commit the key to the repository's `.claude/settings.json` (single-repository sessions).

## Notes

- The page was renamed "Settings files and precedence" in the official docs; the per-key reference (available settings, global config, worktree, permission, and attribution keys) was split out to settings-reference.md (official docs as of 2026-10).
- `/config key=value` requires v2.1.181 or later (carried over from the previous version of this page).

## Related

- [settings-reference.md](./settings-reference.md): every settings key, with scope and example
- [settings-example.md](./settings-example.md): personal, team, and organization example settings files
- [env-vars.md](./env-vars.md): the environment-variable counterparts and precedence rules
- [claude-directory.md](./claude-directory.md): where each settings file lives on disk
- [debug-your-config.md](./debug-your-config.md): `/status`, `/doctor`, and other inspection commands
- [auto-mode-config.md](./auto-mode-config.md): the full `autoMode` reference
- [model-config.md](./model-config.md), [statusline.md](./statusline.md), [keybindings.md](./keybindings.md): the pages dedicated to `model`/`modelOverrides`, `statusLine`, and keybindings respectively
