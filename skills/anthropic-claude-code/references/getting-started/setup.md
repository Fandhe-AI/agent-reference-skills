<!-- source: https://code.claude.com/docs/en/setup.md / last verified: 2026-08-07 -->

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
- `minimumVersion` sets a floor auto-update won't downgrade below; managed settings `requiredMinimumVersion`/`requiredMaximumVersion` make Claude Code refuse to start outside a version range.
- `DISABLE_AUTOUPDATER=1` stops only the background check; `DISABLE_UPDATES` blocks all update paths including manual ones.
- npm install (`npm install -g @anthropic-ai/claude-code`) requires Node.js 22+ for the package manager itself but installs a native binary that doesn't use Node.js at runtime; never use `sudo npm install -g`.
- Releases publish a signed `manifest.json` (GPG key fingerprint `31DD DE24 DDFA B679 F42D 7BD2 BAA9 29FF 1A7E CACE`) for binary integrity verification; macOS/Windows binaries also carry platform-native code signatures.
- Uninstalling requires removing the binary/version files, then optionally `~/.claude`, `~/.claude.json`, project `.claude/`, and `.mcp.json` (deletes all settings, allowed tools, MCP config, and session history).

## Related

- [Overview](./overview.md)
- [Quickstart](./quickstart.md)
- [Feature availability](./feature-availability.md)
