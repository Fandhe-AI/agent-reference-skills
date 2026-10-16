<!-- source: https://code.claude.com/docs/en/troubleshoot-install / last verified: 2026-10-16 -->
# Troubleshoot installation and login

Fixes for `command not found`, PATH, permission, network, TLS, and authentication errors when installing or signing in to Claude Code. For runtime issues after Claude Code is working, see Troubleshooting; for settings/hooks/MCP not applying, see Debug your configuration.

## Signature / Usage

```bash
# Diagnostics
curl -sI https://downloads.claude.ai/claude-code-releases/latest   # network reachability (expect HTTP/2 200)
echo $PATH | tr ':' '\n' | grep -Fx "$HOME/.local/bin"              # PATH check (macOS/Linux)
which -a claude                                                     # find conflicting installs
ldd "$(command -v claude)" | grep "not found"                       # missing shared libs (Linux)
claude doctor                                                        # automated installer/config check

# Alternative installers
brew install --cask claude-code        # macOS
winget install Anthropic.ClaudeCode    # Windows
```

## Options / Props

| Symptom | Cause / fix |
|---------|-------------|
| `command not found: claude` / `not recognized` | Install dir (`~/.local/bin` or `%USERPROFILE%\.local\bin`) isn't on PATH — add it and restart the terminal |
| `syntax error near unexpected token '<'` or HTML in `iex` output | Install script returned an HTML page or 403 — check region/proxy, retry, or use `brew`/`winget` |
| `curl: (23)` / `curl: (56) Failure writing output to destination` | Download interrupted — check connectivity, retry, or use an alternative installer |
| `Killed` / exit code 137 during install | OOM killer on a low-memory Linux server — add swap (needs ~512 MB free) |
| `Installation was killed before it could finish (exit code 137)` | The install script reports that the `claude install` step was terminated by a signal; on Linux 137 = SIGKILL, usually the OOM killer. See Notes |
| `The connection dropped while downloading the update (attempt 3/3: aborted)` / `Download timed out: exceeded the total deadline` | The download connection closed (retried up to three attempts) or didn't finish within 10 minutes (not retried). Run `claude update` again, set `HTTPS_PROXY` if needed, ask your network team to allow the full download from `downloads.claude.ai`, run `claude doctor`. See Notes |
| `'claude' is not recognized` right after an update on Windows | `claude.exe` missing: restore it from its `claude.exe.old.<timestamp>` backup. See Notes |
| `Raw mode is not supported` during install | Versions before 2.1.246 tried to show a server-managed-settings approval dialog during `claude install` from a pipe. See Notes |
| `TLS connect error` / `unable to get local issuer certificate` | Update CA certs; corporate proxy TLS inspection — use `--cacert`/`NODE_EXTRA_CA_CERTS` |
| `irm`/`&&`/`-fsSL` errors on Windows | Wrong shell for the command — use the PowerShell (`irm ... \| iex`) or CMD installer as appropriate |
| `running scripts is disabled on this system` | PowerShell execution policy blocks npm's `.ps1` shims — `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`, use `.cmd` launchers, or the native installer |
| `Error loading shared library libstdc++.so.6` | musl/glibc binary mismatch — check `ldd --version`, reinstall, or `apk add libgcc libstdc++` on Alpine |
| `Illegal instruction` | Wrong CPU architecture, or missing AVX (pre-2013 CPU / hypervisor not passing AVX through) |
| `dyld: cannot load` / `Symbol not found ... libicucore` (macOS) | macOS older than 13.0 — update macOS |
| `Exec format error` (WSL1) | Native-binary regression on WSL1 — convert to WSL2 (`wsl --set-version <Distro> 2`) or wrap with `ld-linux` |
| `Error: claude native binary not installed` | npm optional dependency/postinstall skipped — remove `--omit=optional`/`--ignore-scripts`, or run `install.cjs` manually |
| `OAuth error: Invalid code` | Login code expired/truncated — retry, or press `c` to copy the URL |
| `This organization has been disabled` despite active subscription | A stale `ANTHROPIC_API_KEY` env var overrides subscription OAuth — `unset ANTHROPIC_API_KEY` |
| OAuth login fails in WSL2/SSH/containers | Browser redirect can't reach the local callback — paste the printed code, or set `BROWSER` |
| `Could not load credentials` (Bedrock/Agent Platform/Foundry) | Cloud provider CLI not authenticated in the current shell — `aws sts get-caller-identity`, `gcloud auth application-default login`, `az login` |

## Notes

- Installation was killed before it could finish (exit code 137): the install script prints `Installation was killed before it could finish (exit code 137). This usually means the system ran out of memory. Claude Code needs roughly 512MB of free memory to install. Free up memory, then run this script again.` For any other fatal signal, and for exit code 137 on macOS, the script prints `Installation was killed before it could finish (exit code <N>)` with the actual exit code and omits the out-of-memory explanation. The message comes from the install script macOS and Linux use (also inside WSL); the native Windows install scripts never print it. Before v2.1.200, the script exited with only the shell's bare `Killed` line. Stop other processes to free memory, or add swap space or move to a larger instance (Claude Code requires at least 4 GB of RAM); a 2 GB swap file: `sudo fallocate -l 2G /swapfile`, `sudo chmod 600 /swapfile`, `sudo mkswap /swapfile`, `sudo swapon /swapfile`, then retry the installer.
- The connection dropped while downloading the update: Claude Code retries the download when the connection drops, the transfer stalls, or the downloaded file fails its checksum, up to three attempts in total; a completed HTTP error such as a 404 isn't retried. Before v2.1.202, a single dropped connection failed immediately with the bare error `aborted`. `claude update` precedes the message with `Error: Failed to install native update` on stderr. A download that stays connected but doesn't finish within 10 minutes fails with `Download timed out: exceeded the total deadline` and isn't retried.
- `claude.exe` missing after an update on Windows: to update, Claude Code renames the existing `claude.exe` aside to a backup and moves the new version into place; if the move fails and the backup can't be renamed back, the directory keeps the backup (`claude.exe.old.` plus a numeric timestamp) but no `claude.exe`. In PowerShell: `Get-ChildItem "$env:USERPROFILE\.local\bin\claude.exe.old.*" | Sort-Object Name | Select-Object -Last 1 | Rename-Item -NewName claude.exe`, then `claude --version`; if there's no backup, reinstall. Before v2.1.281, Claude Code could delete the backup while `claude.exe` was still missing.
- `Raw mode is not supported` during install: when server-managed settings include changes that need security approval, versions before 2.1.246 try to show the approval dialog during `claude install`, which needs a terminal on stdin; from a pipe (`curl -fsSL https://claude.ai/install.sh | bash`) the install fails. Claude Code v2.1.246 and later don't show the dialog during `claude install` or `claude update` (the command runs with the settings you last approved, and the dialog appears in your next interactive session); if your startup configuration waits for the settings fetch (for example `forceRemoteSettingsRefresh`), the dialog still appears and an install run from a pipe still fails.
- The installer needs write access to `~/.local/bin/` and `~/.claude/`; on Windows this is rarely an issue since `%USERPROFILE%` is user-writable by default.
- `claude update` / `claude doctor` can hang (pre-v2.1.214) if a shell rc file path (`~/.zshrc`, `~/.bashrc`, etc.) is actually a directory.
- Prebuilt binaries exist only for `darwin-arm64`, `darwin-x64`, `linux-x64`/`arm64` (glibc and musl), and `win32-x64`/`arm64` — other platforms (e.g. FreeBSD) are unsupported.
- Parallel local sessions share and coordinate OAuth token renewal; on macOS, login can also fail if the Keychain is locked or out of sync (`claude doctor` checks this).

## Related

- [Troubleshooting](./troubleshooting.md): runtime performance, stability, and search issues once Claude Code is running
