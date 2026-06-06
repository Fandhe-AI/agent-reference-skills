# core

| Name | Description | Path |
|------|-------------|------|
| Command Structure | `gws <service> <resource> <method>` pattern, 19 supported services, helper commands, schema introspection | [command-structure.md](./command-structure.md) |
| Two-Phase Parsing | How `gws` identifies the service, fetches the Discovery Document, builds a dynamic command tree, and re-parses arguments | [two-phase-parsing.md](./two-phase-parsing.md) |
| Discovery Cache | 24-hour local cache for Discovery Documents and timezone data; `gws schema` introspection command | [discovery-cache.md](./discovery-cache.md) |
| Installation | npm, Homebrew, Cargo, Nix, and GitHub Releases install methods; post-install auth setup | [installation.md](./installation.md) |
| Output Format | JSON for single responses, NDJSON for `--page-all` pagination, stderr for errors, exit codes | [output-format.md](./output-format.md) |
