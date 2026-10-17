# LSP — Semantic Diagnostics

Hermes runs real language servers (pyright, gopls, rust-analyzer, typescript-language-server, clangd and more) as background subprocesses and feeds their semantic diagnostics into the post-write check used by `write_file` and `patch`. The agent sees the errors an edit introduced (type errors, undefined names, missing imports).

## Signature / Usage

```bash
hermes lsp status          # service state + per-server install status
hermes lsp list            # registry, optionally --installed-only
hermes lsp install <id>    # eagerly install one server
hermes lsp install-all     # try every server with a known recipe
hermes lsp restart         # tear down running clients
hermes lsp which <id>      # print resolved binary path
```

```json
{
  "bytes_written": 42,
  "lint": {"status": "ok", "output": ""},
  "lsp_diagnostics": "LSP diagnostics introduced by this edit:\n<diagnostics file=\"/path/to/foo.py\">\nERROR [42:5] Cannot find name 'foo' [reportUndefinedVariable] (Pyright)\n</diagnostics>"
}
```

## Options / Props

```yaml
lsp:
  enabled: true
  wait_mode: document      # "document" or "full"
  wait_timeout: 5.0        # per wait (pre-edit baseline, post-edit re-check)
  warmup_timeout: 0        # extra budget for the first request to a cold server
  broken_retry_seconds: 0  # 0 = broken until `hermes lsp restart`
  exclude_roots: []        # globs of workspace roots where no server runs
  trusted_workspaces: []   # e.g. ["~/code/my-app"]
  install_strategy: auto   # auto | manual
  package_manager: npm     # npm | pnpm | yarn
  idle_timeout: 600        # seconds; 0 disables reaping; values below 30 clamp to 30
  servers:
    pyright:
      disabled: false
      command: ["/abs/path/to/pyright-langserver", "--stdio"]
      env: { PYRIGHT_LOG_LEVEL: "info" }
      initialization_options: {}
```

Per-server keys: `disabled`, `command`, `env`, `initialization_options`. Custom servers (any non-built-in key under `lsp.servers`) need `command` and `extensions`; optional `root_markers`, `language_id`, `description`, `env`, `initialization_options`. Custom servers are matched before built-ins and never auto-installed.

## Supported languages

| Language | Server | Auto-install |
|----------|--------|--------------|
| Python | `pyright-langserver` | npm |
| TypeScript / JavaScript / JSX / TSX | `typescript-language-server` | npm |
| Vue | `@vue/language-server` (pinned to 2) | npm |
| Svelte | `svelte-language-server` | npm |
| Astro | `@astrojs/language-server` | npm |
| Go | `gopls` | `go install` |
| Bash / Zsh | `bash-language-server` | npm |
| YAML | `yaml-language-server` | npm |
| PHP | `intelephense` | npm |
| Dockerfile | `dockerfile-language-server-nodejs` | npm |
| Rust | `rust-analyzer` | manual (rustup) |
| C / C++ | `clangd` | manual (LLVM) |
| Lua | `lua-language-server` | manual |
| Laravel Blade | `laravel-lsp` | manual (composer) |
| OCaml | `ocaml-lsp` | manual (opam) |
| Terraform | `terraform-ls` | manual |
| Dart | `dart language-server` | manual |
| Haskell | `haskell-language-server` | manual (ghcup) |
| Julia | `julia` + LanguageServer.jl | manual |
| Clojure | `clojure-lsp` | manual |
| Nix | `nixd` | manual |
| Zig | `zls` | manual |
| Gleam | `gleam lsp` | manual |
| Elixir | `elixir-ls` | manual |
| Prisma | `prisma language-server` | manual |
| Kotlin | `kotlin-language-server` | manual |
| Java | `jdtls` | manual |
| PowerShell | `PowerShellEditorServices` (`pwsh` host) | manual (release zip; `lsp.servers.powershell.command`, `<HERMES_HOME>/lsp/PowerShellEditorServices`, or `PSES_BUNDLE_PATH`) |

## Notes

- LSP runs only inside a git workspace; elsewhere it stays dormant and falls back to the in-process syntax check. The check is layered: syntax first, LSP second; any LSP failure falls back silently. Each write captures a baseline, writes, re-queries, and reports only new diagnostics (freshness-gated; slow servers yield "no LSP data", never stale errors).
- Workspace trust: a workspace is untrusted unless it is the git worktree you launched Hermes in (including `hermes -w`, a Desktop/TUI project, a gateway `terminal.cwd`) or listed under `lsp.trusted_workspaces`. Cron jobs and Kanban workers get no automatic trust. In an untrusted workspace only pyright (managed Python, not the project's venv), typescript-language-server (pinned to the TypeScript next to the server), svelte-language-server (`isTrusted: false`), bash-language-server, yaml-language-server, dockerfile-ls, intelephense and clangd start; every other server (rust-analyzer, gopls, jdtls, etc.) is skipped, and `hermes lsp status` marks them `[trusted workspaces only]`. Post-write shell linters (`npx tsc`, `rustfmt --check`) are skipped likewise on local backends.
- Installs land in `<HERMES_HOME>/lsp/bin/` and `<HERMES_HOME>/lsp/node_modules/`; nothing is installed to shared locations. `typescript` is installed as `typescript@6` alongside the server; Vue 3.x servers do not publish diagnostics (hybridMode false on 2.x).
- Servers are lazy-spawned (1-3 seconds typical, 10+ for rust-analyzer cold); a server that never answers costs at most `2 x wait_timeout` per edit. Multi-root servers (pyright) run as a single process. Servers are released when their worktree is removed.
- `bash-language-server` delegates diagnostics to `shellcheck`; install it or `hermes lsp status` shows `Backend warnings`.
- A crashed server is added to the broken set until `hermes lsp restart` (or `broken_retry_seconds`). Logs: `~/.hermes/logs/agent.log` (`[agent.lsp.client]`).
- `lsp.enabled: false` disables the subsystem; disable one language with `lsp.servers.<id>.disabled: true`.

## Related

- [Tools](./tools.md)
- [Hooks](../automation/hooks.md)
