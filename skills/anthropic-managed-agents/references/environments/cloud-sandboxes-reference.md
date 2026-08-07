<!-- source: https://platform.claude.com/docs/en/managed-agents/cloud-sandboxes-reference / last verified: 2026-08-07 -->

# Cloud sandbox reference

Pre-installed languages, databases, and utilities available in Anthropic-managed cloud sandboxes (`type: cloud` environments). Self-hosted sandboxes run on your infrastructure with whatever your worker provides instead.

## Signature / Usage

```text
Python 3.12+ / Node.js 20+ / Go 1.22+ / Rust 1.77+ / Java 21+ / Ruby 3.3+ / PHP 8.3+ / GCC 13+
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Operating system | spec | Ubuntu 22.04 LTS, x86_64 (amd64) |
| Memory / Disk | spec | Up to 8 GB memory, up to 10 GB disk |
| Databases | spec | SQLite fully available locally; PostgreSQL/Redis clients only (no server running by default) |
| System tools | spec | `git`, `curl`, `wget`, `jq`, `tar`/`zip`/`unzip`, `ssh`/`scp`, `tmux`/`screen` |
| Dev tools | spec | `make`, `cmake`, `docker` (limited), `ripgrep`, `tree`, `htop` |

## Notes

- Package managers per language: pip/uv (Python), npm/yarn/pnpm (Node.js), go modules, cargo, maven/gradle, bundler/gem, composer, make/cmake.
- Network defaults follow the owning environment's `networking` config (see `environments.md`).

## Related

- [Cloud environment setup](./environments.md)
