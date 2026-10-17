<!-- source: https://platform.claude.com/docs/en/managed-agents/cloud-sandboxes-reference / last verified: 2026-10-17 -->

# Cloud sandbox reference

Pre-installed languages, databases, and utilities available in Anthropic-managed cloud sandboxes (`type: cloud` environments). Cloud sandboxes run as isolated Linux containers; the agent can use everything below immediately without installation. Self-hosted sandboxes run on your infrastructure with whatever your worker provides instead.

## Signature / Usage

```text
Python 3.10-3.13 / Node.js 20, 21, 22 (default) / Go 1.24 (default), 1.25 / Rust stable / Java OpenJDK 21 / Ruby 3.1-3.3 (default 3.3) / PHP 8.3 / C/C++ GCC 13 and Clang
```

## Options / Props

### Programming languages

| Language | Version | Package manager |
|----------|---------|-----------------|
| Python | 3.10, 3.11, 3.12, and 3.13 | pip, uv, poetry |
| Node.js | 20, 21, and 22 (default) | npm, yarn, pnpm, bun |
| Go | 1.24 (default) and 1.25 | go modules |
| Rust | Stable toolchain (rustup) | cargo |
| Java | OpenJDK 21 | maven, gradle |
| Ruby | 3.1, 3.2, and 3.3 (default) | bundler, gem |
| PHP | 8.3 | composer |
| C/C++ | GCC 13 and Clang | make, cmake, ninja |

Common Python data and document libraries (NumPy, pandas, Matplotlib, openpyxl, python-docx, python-pptx, pypdf) are installed for the `python3` interpreter.

### Databases

| Database | Description |
|----------|-------------|
| PostgreSQL 16 | Server and `psql` client are installed. The server is not running by default. |
| Redis 7 | Server and `redis-cli` are installed. The server is not running by default. |
| SQLite | Available through language bindings, such as Python's `sqlite3` module. |

### Utilities

| Category | Tools |
|----------|-------|
| System tools | `git`, `curl` / `wget`, `jq` / `yq`, `tar` / `zip` / `unzip`, `tmux` |
| Development tools | `make`, `cmake`, `docker` (limited availability), `ripgrep` (`rg`) |
| Text processing | `sed`, `awk`, `grep`, `vim`, `nano`, `diff`, `patch` |
| Document and media processing | `ffmpeg`, ImageMagick (`convert`, `identify`), `pandoc`, LibreOffice (headless), Poppler utilities (`pdftotext`, `pdftoppm`) and `qpdf`, `tesseract` (English language data), TeX Live (`pdflatex`, `xelatex`, `latexmk`) |
| Browser automation | Playwright (Python and Node.js); Chromium (`/opt/pw-browsers/chromium`, used by Playwright, not on `PATH`) |

### Sandbox specifications

| Property | Value |
|----------|-------|
| Operating system | Ubuntu 24.04 LTS |
| Architecture | x86_64 (amd64) |
| Memory | Up to 8 GB |
| Disk space | Up to 10 GB |
| Network | API-created environments default to `unrestricted` networking; sandboxes provisioned through Claude Studio default to `limited` |

## Notes

- The sandbox sets `PLAYWRIGHT_BROWSERS_PATH` to `/opt/pw-browsers`, so the pre-installed Playwright packages find Chromium there without configuration. Use the pre-installed packages rather than installing another Playwright version, which would look for a browser build that is not present. Firefox and WebKit are not installed.
- Network defaults follow the owning environment's `networking` config (see `environments.md`).

## Related

- [Cloud environment setup](./environments.md)
