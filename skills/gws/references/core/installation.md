# Installation

`gws` can be installed via npm (recommended), Homebrew, Cargo, Nix, or pre-built binaries from GitHub Releases.

## Signature / Usage

```bash
# npm (recommended) — requires Node.js 18+
npm install -g @googleworkspace/cli

# Homebrew (macOS / Linux)
brew install googleworkspace-cli

# Cargo (build from source)
cargo install --git https://github.com/googleworkspace/cli --locked

# Nix
nix run github:googleworkspace/cli

# GitHub Releases — download a pre-built binary for your platform
# https://github.com/googleworkspace/cli/releases
```

## Options / Props

| Method | Command | Notes |
|--------|---------|-------|
| npm | `npm install -g @googleworkspace/cli` | Recommended; requires Node.js 18+ |
| Homebrew | `brew install googleworkspace-cli` | macOS and Linux |
| Cargo | `cargo install --git https://github.com/googleworkspace/cli --locked` | Builds from source; requires Rust toolchain |
| Nix | `nix run github:googleworkspace/cli` | Run without installing |
| GitHub Releases | Download binary from releases page | No runtime dependency |

## Post-Install Setup

After installation, run the interactive setup to configure OAuth credentials:

```bash
gws auth setup   # Creates a GCP project and OAuth credentials interactively
gws auth login   # Authenticate with your Google account
```

## Notes

- npm installation requires Node.js 18 or later.
- All installation methods produce the same `gws` binary; the npm package wraps the pre-built binary.
- A Google Cloud project with OAuth credentials is required for interactive use. Service accounts do not require `gws auth login`.
- This project is not an officially supported Google product. Breaking changes are expected before v1.0.

## Related

- [command-structure.md](./command-structure.md)
