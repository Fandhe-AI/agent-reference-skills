# Windows (WSL2) Guide

Running Hermes Agent on Windows through WSL2: setup, filesystem access between Windows and Linux, networking in both directions, and pitfalls. Hermes supports both native Windows and WSL2; inside WSL2 the Linux installer is used unchanged.

## Signature / Usage

```powershell
wsl --install
wsl --list --verbose        # expect VERSION 2
wsl --set-version Ubuntu 2
wsl --set-default-version 2
```

Enable systemd inside the distro, then `wsl --shutdown` from PowerShell:

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true

[interop]
enabled=true
appendWindowsPath=true

[automount]
options = "metadata,umask=22,fmask=11"
EOF
```

Install Hermes inside WSL:

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc
hermes
```

## Options / Props

| Direction | Path inside | Path you use |
|---|---|---|
| Windows disk, seen from WSL | `C:\Users\you\Documents` | `/mnt/c/Users/you/Documents` |
| WSL disk, seen from Windows | `/home/you/code` | `\\wsl$\Ubuntu\home\you\code` (or `\\wsl.localhost\Ubuntu\...`) |

Path helpers: `wslpath -w ~/code/project`, `wslpath -u 'C:\Users\you'`; `wslview` / `explorer.exe .` (install `wslu`).

## Notes

- Pick WSL2 when you need the dashboard's embedded `/chat` terminal (stated here as requiring a POSIX PTY), POSIX-heavy development, or you already have WSL2. Native Windows (see windows-native.md) runs the CLI, gateway, cron, browser tool, and MCP servers; the native guide states the dashboard terminal also works there via ConPTY, so the two pages differ on this point.
- Hermes does not work reliably on WSL1. Ubuntu LTS is tested; Debian works; the installer assumes a Debian-derived `apt` system (Nix path is separate). The `metadata` mount option is required for permission bits on `/mnt/c`.
- Keep `~/.hermes`, git repos, models, datasets, and venvs on the Linux side: `/mnt/c` goes through 9P (10-100x slower, unreliable permissions and inotify, case-sensitivity differences). Clone inside WSL; exception: MCP bridges launching Windows binaries via `cmd.exe` may need a `/mnt/c/...` cwd to avoid a UNC warning.
- Line endings: set `git config --global core.autocrlf input` and `core.eol lf` in WSL; fix existing files with `dos2unix` (error `bad interpreter: /bin/bash^M`).
- Networking, Hermes in WSL calling a Windows service (Ollama / LM Studio / llama-server): Windows 11 22H2+ use `networkingMode=mirrored` in `%USERPROFILE%\.wslconfig` then `wsl --shutdown`; otherwise use the Windows host IP and bind the Windows server to `0.0.0.0` (Ollama: `OLLAMA_HOST=0.0.0.0`) plus a firewall rule.
- Networking, Windows or LAN reaching Hermes in WSL (dashboard, API server with `API_SERVER_ENABLED=true`): mirrored mode needs nothing; in NAT mode bind `0.0.0.0` and port-forward per port from Admin PowerShell (the WSL VM IP changes on restart):

```powershell
$wslIp = (wsl hostname -I).Trim().Split(' ')[0]
netsh interface portproxy add v4tov4 `
  listenaddress=0.0.0.0 listenport=8080 `
  connectaddress=$wslIp connectport=8080
New-NetFirewallRule -DisplayName "Hermes WSL 8080" `
  -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow
```

  Remove with `netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=8080`. For messaging webhooks prefer `cloudflared` tunnels.
- Long-running: with systemd, `hermes gateway setup` can install a systemd user unit. To keep the VM alive at Windows login, add a Task Scheduler task running `C:\Windows\System32\wsl.exe` with arguments `-d Ubuntu --exec /bin/sh -c "sleep infinity"`. A launcher shortcut target: `wt.exe -w 0 -p "Ubuntu" wsl.exe -d Ubuntu --cd ~ -- bash -ic "hermes"`.
- GPU: NVIDIA passthrough works with the standard Windows driver (do not install a Linux NVIDIA driver in WSL; `nvidia-smi` should see the GPU). AMD ROCm and Intel Arc in WSL2 are outside Hermes's test matrix.
- Pitfalls: clock drift after sleep (`sudo hwclock -s`); DNS broken in mirrored mode or on VPN (set `generateResolvConf=false` in `/etc/wsl.conf` and write your own `/etc/resolv.conf`); `hermes` not found after install (`source ~/.bashrc`); VHDX does not auto-shrink (`wsl --shutdown`, then `Optimize-VHD -Path <ext4.vhdx> -Mode Full`); Defender slows access to `\\wsl$\...`.

## Related

- [windows-native.md](./windows-native.md)
- [docker.md](./docker.md)
