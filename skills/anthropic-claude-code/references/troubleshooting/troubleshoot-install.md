<!-- source: https://code.claude.com/docs/en/troubleshoot-install / last verified: 2026-08-07 -->
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

- The installer needs write access to `~/.local/bin/` and `~/.claude/`; on Windows this is rarely an issue since `%USERPROFILE%` is user-writable by default.
- `claude update` / `claude doctor` can hang (pre-v2.1.214) if a shell rc file path (`~/.zshrc`, `~/.bashrc`, etc.) is actually a directory.
- Prebuilt binaries exist only for `darwin-arm64`, `darwin-x64`, `linux-x64`/`arm64` (glibc and musl), and `win32-x64`/`arm64` — other platforms (e.g. FreeBSD) are unsupported.
- Parallel local sessions share and coordinate OAuth token renewal; on macOS, login can also fail if the Keychain is locked or out of sync (`claude doctor` checks this).

## Related

- [Troubleshooting](./troubleshooting.md): runtime performance, stability, and search issues once Claude Code is running
