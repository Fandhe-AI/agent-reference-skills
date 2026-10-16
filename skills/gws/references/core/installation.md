# Installation

The recommended way to install `gws` is to download the pre-built binary for your OS and architecture from GitHub Releases, extract it, and place `gws` in your `$PATH`. npm, Homebrew, Cargo, and Nix are also available.

## Signature / Usage

```bash
# GitHub Releases (recommended) — download the pre-built binary for your OS/arch,
# extract the archive, and place `gws` in $PATH
# https://github.com/googleworkspace/cli/releases

# npm — for convenience; downloads the appropriate binary from GitHub Releases (Node.js 18+)
npm install -g @googleworkspace/cli

# Homebrew (macOS / Linux)
brew install googleworkspace-cli

# Cargo (build from source)
cargo install --git https://github.com/googleworkspace/cli --locked

# Nix
nix run github:googleworkspace/cli

# Post-install: configure OAuth credentials interactively
gws auth setup
gws auth login
```

## Options / Props

| Method | Command | Notes |
|--------|---------|-------|
| GitHub Releases | Download binary from releases page | Recommended; no runtime dependency |
| npm | `npm install -g @googleworkspace/cli` | Automates downloading the binary from GitHub Releases; requires Node.js 18+ |
| Homebrew | `brew install googleworkspace-cli` | macOS and Linux |
| Cargo | `cargo install --git https://github.com/googleworkspace/cli --locked` | Builds from source; requires Rust toolchain |
| Nix | `nix run github:googleworkspace/cli` | Run without installing |

## Notes

- After installation, run the interactive setup (`gws auth setup` creates a GCP project and OAuth credentials interactively; `gws auth login` authenticates with your Google account).
- Node.js 18 or later is required for the npm method only.
- All installation methods produce the same `gws` binary; the npm package downloads the pre-built binary.
- Since v0.22.4 the npm package is a zero-dependency installer using native `fetch()` (cargo-dist removed).
- Since v0.22.5 the npm postinstall verifies the SHA256 checksum of the downloaded binary, and `run.js` auto-installs the binary when it is missing (fixes `gws binary not found` when pnpm skips postinstall).
- A Google Cloud project with OAuth credentials is required for interactive use. Service accounts do not require `gws auth login`.
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [command-structure.md](./command-structure.md)
