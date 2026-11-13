---
source: https://opencode.ai/docs/
---

# Intro

OpenCode is an open source coding agent. It’s available as a terminal-based interface, desktop app, or web app.

## Signature / Usage

### CLI

curl:

Adapted (not in the official docs): the official one-liner pipes the installer straight into `bash`; it is split into download, review, and run here.

```bash
curl -fsSL -o opencode-install.sh https://opencode.ai/v2/install
less opencode-install.sh
bash opencode-install.sh
```

homebrew:

```bash
brew install anomalyco/tap/opencode-v2
```

npm:

```bash
npm install -g @opencode/cli
```

bun:

```bash
bun install -g --trust @opencode/cli
```

pnpm:

```bash
pnpm add -g --allow-build=@opencode/cli @opencode/cli
```

yarn:

```bash
yarn global add @opencode/cli
```

vite+:

```bash
vp install -g @opencode/cli
```

aur:

```bash
paru -S opencode-beta
```

mise:

```bash
mise use -g opencode
```

The npm package uses a postinstall script to select the native `opencode` binary for your platform. The Bun and pnpm commands
explicitly allow the required script; Vite+ requires no additional flag. The mise command requires mise 2026.10.9 or later;
older versions install OpenCode 1.

Windows package managers are not supported.

Download a standalone CLI binary for your platform.

- **macOS:** [Apple silicon](https://opencode.ai/update/api/latest/cli/opencode/opencode-darwin-arm64.zip) · [Intel](https://opencode.ai/update/api/latest/cli/opencode/opencode-darwin-x64.zip) · [Intel (baseline)](https://opencode.ai/update/api/latest/cli/opencode/opencode-darwin-x64-baseline.zip)
- **Windows:** [ARM64](https://opencode.ai/update/api/latest/cli/opencode/opencode-windows-arm64.zip) · [x64](https://opencode.ai/update/api/latest/cli/opencode/opencode-windows-x64.zip) · [x64 (baseline)](https://opencode.ai/update/api/latest/cli/opencode/opencode-windows-x64-baseline.zip)
- **Linux (glibc):** [ARM64](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-arm64.tar.gz) · [x64](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-x64.tar.gz) · [x64 (baseline)](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-x64-baseline.tar.gz)
- **Linux (musl):** [ARM64](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-arm64-musl.tar.gz) · [x64](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-x64-musl.tar.gz) · [x64 (baseline)](https://opencode.ai/update/api/latest/cli/opencode/opencode-linux-x64-baseline-musl.tar.gz)

### Desktop

Download the latest OpenCode Desktop build for your platform.

- **macOS:** [Apple silicon](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-mac-arm64.dmg) · [Intel](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-mac-x64.dmg)
- **Windows:** [x64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-win-x64.exe) · [ARM64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-win-arm64.exe)
- **Linux (.deb):** [x64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-amd64.deb) · [ARM64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-arm64.deb)
- **Linux (.rpm):** [x64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-x86_64.rpm) · [ARM64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-aarch64.rpm)
- **Linux (AppImage):** [x64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-x86_64.AppImage) · [ARM64](https://opencode.ai/update/api/latest/desktop/opencode/opencode-desktop-linux-arm64.AppImage)

### Web

Access the OpenCode web interface with the `opencode pair` command.

```bash
$ opencode pair

  Open a link to connect. Links work once and expire in 5 minutes.

  http://127.0.0.1:49374/auth/connect/...
```

### Docker

Docker images use versioned tags, for example `ghcr.io/anomalyco/opencode:2.0.0`.

### Connect

OpenCode has built-in support for many LLM providers. You can connect to them
directly [in the TUI](https://opencode.ai/docs/cli/providers/) with `/connect`.

See [Providers](https://opencode.ai/docs/providers/) to configure custom providers.

If you'd like easy access to the best coding models, you can try out
[OpenCode Console](https://opencode.ai/docs/console/).

You can also try [OpenCode Go](https://opencode.ai/docs/console/go/), a $10/month subscription
plan that grants you access to the best coding models.

### Customize

Make OpenCode your own by editing the [OpenCode config](https://opencode.ai/docs/config/), [loading plugins](https://opencode.ai/docs/plugins/), [connecting MCP
servers](https://opencode.ai/docs/mcp-servers/), or [creating commands](https://opencode.ai/docs/commands/). For terminal interface themes and keybindings, see [CLI
settings](https://opencode.ai/docs/cli/config/).

### Learn

If you are interested in an in-depth course on OpenCode, Boot.dev has created an excellent [AI Coding with
OpenCode](https://www.boot.dev/courses/learn-ai-coding) course in consultation with our team. All the information in the course is
free to read and watch, though some interactive features may require payment.

## Notes

- Adapted from the official docs: the official command pipes `curl -fsSL https://opencode.ai/v2/install` into `bash`. The three-step form (download, inspect, run) reviews the script before execution; run it in a disposable or trusted environment.
- Docker tag `2.0.0` and mise 2026.10.9 are transcribed as written in the source.
- OpenCode agents, commands, plugins, and keybinds are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend) concepts.

## Related

- [Migrate from V1](./migrate-v1.md)
- [Troubleshooting](./troubleshooting.md)
