---
source: https://opencode.ai/docs/
---

# Install

Ways to install the OpenCode CLI and the Docker image tag format.

## Signature / Usage

### curl

Adapted (not in the official docs): the official one-liner pipes the installer straight into `bash`; it is split into download, review, and run here.

```bash
curl -fsSL -o opencode-install.sh https://opencode.ai/v2/install
less opencode-install.sh
bash opencode-install.sh
```

### Homebrew

```bash
brew install anomalyco/tap/opencode-v2
```

### npm

```bash
npm install -g @opencode/cli
```

### Bun

```bash
bun install -g --trust @opencode/cli
```

### pnpm

```bash
pnpm add -g --allow-build=@opencode/cli @opencode/cli
```

### Yarn

```bash
yarn global add @opencode/cli
```

### Vite+

```bash
vp install -g @opencode/cli
```

### AUR

```bash
paru -S opencode-beta
```

### mise

```bash
mise use -g opencode
```

### Standalone binary (macOS Apple silicon example)

Snippet taken from https://opencode.ai/docs/ (download link list). Other platforms (Intel, Windows, Linux glibc / musl, baseline builds) are listed on the same page.

```text
https://opencode.ai/update/api/latest/cli/opencode/opencode-darwin-arm64.zip
```

### Docker image tag

Docker images use versioned tags, for example:

```text
ghcr.io/anomalyco/opencode:2.0.0
```

### Verify

Snippet taken from https://opencode.ai/docs/troubleshooting/ (Report an issue).

```bash
opencode --version
```

## Notes

- The npm package uses a postinstall script to select the native `opencode` binary for your platform. The Bun and pnpm commands explicitly allow the required script; Vite+ requires no additional flag.
- The mise command requires mise 2026.10.9 or later; older versions install OpenCode 1.
- Windows package managers are not supported.
- Adapted from the official docs: the official command pipes `curl -fsSL https://opencode.ai/v2/install` into `bash`. The three-step form (download, inspect, run) reviews the script before execution; run it in a disposable or trusted environment.
- Desktop builds (dmg / exe / deb / rpm / AppImage) are download links on the same page and are not shell commands.

## Related

- cli.md
- https://opencode.ai/docs/
