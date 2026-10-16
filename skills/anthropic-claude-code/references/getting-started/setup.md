<!-- source: https://code.claude.com/docs/en/setup.md / last verified: 2026-10-16 -->

# Advanced setup

System requirements, platform-specific installation, version management, and uninstallation for Claude Code.

## Signature / Usage

```bash
# macOS, Linux, WSL
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

# Homebrew
brew install --cask claude-code        # stable channel
brew install --cask claude-code@latest # latest channel

# WinGet
winget install Anthropic.ClaudeCode

claude --version
claude doctor
claude update
```

## Options / Props

| Requirement | Value |
|-------------|-------|
| OS | macOS 13.0+, Windows 10 1809+/Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ |
| Hardware | 4 GB+ RAM, x64 or ARM64 |
| Shell | Bash, Zsh, PowerShell, or CMD |

| Windows option | Requires | Sandboxing | When to use |
|------------------|----------|------------|-------------|
| Native Windows | None; Git for Windows optional | Not supported | Windows-native projects/tools |
| WSL 2 | WSL 2 enabled | Supported | Linux toolchains, sandboxed execution |
| WSL 1 | WSL 1 enabled | Not supported | If WSL 2 unavailable |

| `autoUpdatesChannel` | Behavior |
|------------------------|----------|
| `"latest"` (default) | New features as soon as released |
| `"stable"` | ~1 week old, skips releases with major regressions |

## Notes

- Native installations auto-update in the background; Homebrew, WinGet, apt/dnf/apk installs require manual updates unless `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1` (Homebrew/WinGet only).
- Manual upgrades: Homebrew `brew upgrade claude-code` or `brew upgrade claude-code@latest` (depending on the cask; Homebrew keeps old versions on disk, so run `brew cleanup` periodically); WinGet `winget upgrade Anthropic.ClaudeCode` (the upgrade may fail while Claude Code is running because Windows locks the executable, in which case Claude Code shows the manual command); apk `apk update && apk upgrade claude-code`. With `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1`, Claude Code runs the Homebrew/WinGet upgrade in the background when a new version is available and shows a restart prompt on success (only the Claude Code package is affected); apt, dnf, and apk continue to require a manual upgrade because those commands need elevated privileges. Homebrew selects a channel by cask name (`claude-code` stable, `claude-code@latest` latest); apt, dnf, and apk installs select a channel by repository instead of `autoUpdatesChannel`.
- Alpine Linux (apk): install `apk add bash curl libgcc libstdc++ ripgrep` for the native installer (`ripgrep` is in the community repository; if `apk` reports it missing, add `https://dl-cdn.alpinelinux.org/alpine/v3.22/community` — adjust the version — to `/etc/apk/repositories`, run `apk update`, and retry). To install from the apk repository: download the key (`wget -O /etc/apk/keys/claude-code.rsa.pub https://downloads.claude.ai/keys/claude-code.rsa.pub`), `echo "https://downloads.claude.ai/claude-code/apk/stable" >> /etc/apk/repositories`, `apk add claude-code`; for the `latest` channel replace `.../apk/stable` with `.../apk/latest`; verify the key with `sha256sum /etc/apk/keys/claude-code.rsa.pub` (`395759c1f7449ef4cdef305a42e820f3c766d6090d142634ebdb049f113168b6`).
- `claude update` output: `Successfully updated from <old version> to version <new version>`, or `Claude Code is up to date (<version>)` when already newest; installs managed by Homebrew, WinGet, or apk report `Claude is up to date!` instead.
- `minimumVersion` sets a floor auto-update won't downgrade below; managed settings `requiredMinimumVersion`/`requiredMaximumVersion` make Claude Code refuse to start outside a version range.
- `DISABLE_AUTOUPDATER=1` stops only the background check; `DISABLE_UPDATES` blocks all update paths including manual ones.
- npm install (`npm install -g @anthropic-ai/claude-code`) requires Node.js 22+ for the package manager itself but installs a native binary that doesn't use Node.js at runtime; never use `sudo npm install -g`.
- Releases publish a signed `manifest.json` (GPG key fingerprint `31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE`) for binary integrity verification; macOS/Windows binaries also carry platform-native code signatures.
- Uninstalling requires removing the binary/version files, then optionally `~/.claude`, `~/.claude.json`, project `.claude/`, and `.mcp.json` (deletes all settings, allowed tools, MCP config, and session history).

## Related

- [Overview](./overview.md)
- [Quickstart](./quickstart.md)
- [Feature availability](./feature-availability.md)
