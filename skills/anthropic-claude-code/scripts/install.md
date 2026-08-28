<!-- source: https://code.claude.com/docs/en/setup.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/quickstart.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/troubleshoot-install.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-directory.md / last verified: 2026-08-07 -->

# install

Install, verify, update, and uninstall Claude Code across macOS, Linux, WSL, and Windows.

## ネイティブインストーラー（macOS / Linux / WSL）

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

## Homebrew（macOS）

```bash
brew install --cask claude-code        # stable channel
brew install --cask claude-code@latest # latest channel
```

## WinGet（Windows）

```bash
winget install Anthropic.ClaudeCode
```

## npm 経由のインストール

```bash
npm install -g @anthropic-ai/claude-code
```

Requires Node.js 22+ for the package manager itself; the package installs a native binary that doesn't use Node.js at runtime. Never use `sudo npm install -g`.

## インストール確認

```bash
claude --version
```

## インストール診断（読み取り専用、セッションを開始しない）

```bash
claude doctor
```

## ネットワーク疎通確認

```bash
curl -sI https://downloads.claude.ai/claude-code-releases/latest   # expect HTTP/2 200
```

## PATH 確認（macOS / Linux）

```bash
echo $PATH | tr ':' '\n' | grep -Fx "$HOME/.local/bin"
```

## 競合インストールの検出

```bash
which -a claude
```

## アップデート

```bash
claude update
```

Native installations auto-update in the background; Homebrew, WinGet, and apt/dnf/apk installs require manual updates unless `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` (Homebrew/WinGet only). `DISABLE_AUTOUPDATER=1` stops only the background check; `DISABLE_UPDATES=1` blocks all update paths including manual ones.

## バージョンを指定してインストール／再インストール

```bash
claude install stable
claude install latest
claude install 2.1.118
```

## プロジェクトのローカルデータ削除

> **警告**: `--all` deletes `history.jsonl` across every project. Not reversible.

```bash
claude project purge <path>     # delete transcript/memory/tasks/debug/file-history for one project
claude project purge --dry-run  # preview the deletion plan without deleting
claude project purge -y         # skip the confirmation prompt
claude project purge --all      # purge every project, including history.jsonl
```

`shell-snapshots/` and `backups/` are never touched (not project-scoped).

## アンインストール

> **警告**: Removing `~/.claude`, `~/.claude.json`, the project's `.claude/`, and `.mcp.json` deletes all settings, allowed tools, MCP configuration, and session history. Not reversible. These four paths are only safe to delete as part of an explicit uninstall (per setup.md's Notes) — during normal operation, manually deleting `~/.claude.json`, `~/.claude/settings.json`, or `~/.claude/plugins/` is explicitly discouraged (claude-directory.md).

Uninstalling requires removing the binary/version files first, then optionally the four paths below. Do not run a blanket recursive delete on these paths: list each target, verify it is the real file/directory you expect, and move it into a timestamped backup directory so the operation stays reversible.

```bash
# 1. List the targets and verify each one is a regular file/directory (not a symlink to somewhere else)
for p in ~/.claude ~/.claude.json; do
  [ -e "$p" ] && ls -ld "$p"
done

# 2. Move (not delete) the user-level paths into a timestamped backup
backup="$HOME/claude-uninstall-backup-$(date +%Y%m%d%H%M%S)"
mkdir -p "$backup"
[ -e ~/.claude ]      && mv ~/.claude      "$backup/dot-claude"          # user settings, OAuth, MCP config, session history
[ -e ~/.claude.json ] && mv ~/.claude.json "$backup/dot-claude.json"

# 3. Project-side config: run only at the target repository root after confirming the location
cd /path/to/target-repo
git rev-parse --show-toplevel                                            # must print the directory you intend to clean
[ -e .claude ]    && mv .claude    "$backup/project-dot-claude"
[ -e .mcp.json ]  && mv .mcp.json  "$backup/project-mcp.json"

# 4. Only after confirming Claude Code no longer needs anything in "$backup", remove it explicitly:
#    rm -r -- "$backup"
```

> **Note**: The official docs do not document a command for removing the native binary/version files themselves — the location differs by install method (native installer / Homebrew / WinGet / npm) and isn't specified.
