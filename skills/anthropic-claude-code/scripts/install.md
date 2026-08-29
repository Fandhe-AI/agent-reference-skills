<!-- source: https://code.claude.com/docs/en/setup.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/quickstart.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/troubleshoot-install.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/claude-directory.md / last verified: 2026-08-07 -->

# install

Install, verify, update, and uninstall Claude Code across macOS, Linux, WSL, and Windows.

## ネイティブインストーラー（macOS / Linux / WSL）

```bash
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
installer="$(mktemp "${TMPDIR:-/tmp}/claude-install.XXXXXX")" \
  && curl -fsSL https://claude.ai/install.sh -o "${installer}" \
  && cat "${installer}" \
  || { rm -f -- "${installer:-}"; unset installer; echo "download failed; nothing was executed" >&2; false; }
```

Read the script printed above. Run the next block only if you have reviewed it and decided to proceed — it is a separate step so that copying the block above never executes anything.

```bash
# Step 2 - only after you have read the script above and decided to proceed, run it yourself.
# The temp file is removed afterwards; the final status is the installer's own exit status.
if [ -s "${installer:-}" ]; then
  bash "${installer}"; status=$?; rm -f -- "${installer}"; unset installer
else
  echo "no downloaded installer to run (Step 1 failed or was not run)" >&2; status=1
fi
(exit "${status}")
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

Uninstalling requires removing the binary/version files first, then optionally the four paths below. Do not run a blanket recursive delete on these paths. Save the following as a script (for example `uninstall-claude-config.sh`) and run it with the target repository as its argument: it verifies the repository root first, creates a fresh exclusive backup directory, preflights all four paths (no symlinks, no pre-existing destination, writable parent) before touching anything, then moves (never deletes) each path — and if any move fails or the script is interrupted (Ctrl+C / SIGTERM), it rolls back the moves already made so the live configuration is never left half-removed.

```bash
#!/usr/bin/env bash
# Usage: bash uninstall-claude-config.sh /path/to/target-repo
set -euo pipefail

target="${1:?usage: $0 /path/to/target-repo}"

# 1. Validate the target before touching anything: it must be an existing git repository root
cd -- "${target}"
# --show-prefix is empty exactly at the repository root. Assigning it (rather than testing the
# substitution inline) lets set -e abort when this is not a git repository at all, and avoids
# comparing path spellings, which differ between git and pwd on Windows / symlinked paths
prefix="$(git rev-parse --show-prefix)"
if [ -n "${prefix}" ]; then
  echo "not at a repository root: $(pwd) is inside $(git rev-parse --show-toplevel)" >&2
  exit 1
fi

# 2. Create an exclusive, fresh backup directory (mktemp fails instead of reusing an existing one)
backup="$(mktemp -d "${HOME}/claude-uninstall-backup-XXXXXX")"
echo "backup directory: ${backup}"

# The four paths, user-level first, then project-side (we are at the verified repository root)
sources=("${HOME}/.claude" "${HOME}/.claude.json" "${PWD}/.claude" "${PWD}/.mcp.json")
names=(dot-claude dot-claude.json project-dot-claude project-mcp.json)

# 3. Preflight every path BEFORE any move: refuse symlinks, refuse to overwrite, require a writable parent
for i in "${!sources[@]}"; do
  src="${sources[$i]}"; dest="${backup}/${names[$i]}"
  if [ -L "${src}" ]; then
    echo "refusing to move symlink: ${src}" >&2
    exit 1
  fi
  [ -e "${src}" ] || continue
  if [ -e "${dest}" ]; then
    echo "backup destination already exists: ${dest}" >&2
    exit 1
  fi
  if [ ! -w "$(dirname -- "${src}")" ]; then
    echo "cannot move ${src}: parent directory is not writable" >&2
    exit 1
  fi
done

# 4. Move with rollback: if any mv fails, or the script is interrupted (Ctrl+C / SIGTERM),
#    everything moved so far is put back in reverse order
moved_src=(); moved_dest=()
pending_src=""; pending_dest=""   # the move in flight (bash runs traps only after it finishes)
restore_one() {
  if [ -e "$1" ]; then
    echo "ROLLBACK SKIPPED: $1 exists again; check $2 manually" >&2
  elif [ ! -e "$2" ]; then
    :   # never moved
  elif mv -- "$2" "$1"; then
    echo "restored $1" >&2
  else
    echo "ROLLBACK FAILED: restore $2 -> $1 manually" >&2
  fi
}
rollback() {
  local i
  echo "move aborted; restoring already-moved paths" >&2
  if [ -n "${pending_src}" ]; then
    restore_one "${pending_src}" "${pending_dest}"
  fi
  for (( i = ${#moved_src[@]} - 1; i >= 0; i-- )); do
    restore_one "${moved_src[$i]}" "${moved_dest[$i]}"
  done
}
on_signal() { trap - ERR INT TERM; rollback; exit 130; }
trap rollback ERR
trap on_signal INT TERM
for i in "${!sources[@]}"; do
  src="${sources[$i]}"; dest="${backup}/${names[$i]}"
  [ -e "${src}" ] || continue
  pending_src="${src}"; pending_dest="${dest}"
  mv -- "${src}" "${dest}"
  moved_src+=("${src}"); moved_dest+=("${dest}")
  pending_src=""; pending_dest=""
  echo "moved ${src} -> ${dest}"
done
trap - ERR INT TERM

# 5. Nothing has been deleted. Remove the backup explicitly once you are sure it is no longer needed:
echo "done. To discard the backup later, run: rm -r -- \"${backup}\""
```

> **Note**: The official docs do not document a command for removing the native binary/version files themselves — the location differs by install method (native installer / Homebrew / WinGet / npm) and isn't specified.
