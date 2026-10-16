<!-- source: https://code.claude.com/docs/en/plugins/code-intelligence.md / last verified: 2026-10-17 -->

# Code intelligence plugins

A code intelligence plugin connects Claude Code to a language server (LSP) so Claude sees diagnostics after edits and navigates code by symbol.

## Signature / Usage

```text
# 1. install the language server binary (TypeScript example)
npm install -g typescript-language-server typescript
# 2. install the plugin inside Claude Code
/plugin install typescript-lsp@claude-plugins-official
```

The server starts the first time Claude edits a file with one of the plugin's extensions. A line `Found N new diagnostic issues in M files (ctrl+o to expand)` confirms it. Otherwise open `/plugin` > **Errors** tab and look for `Executable not found in $PATH: "<binary>"`.

## Options / Props

| Language | Plugin | Binary |
| --- | --- | --- |
| C/C++ | `clangd-lsp` | `clangd` |
| C# | `csharp-lsp` | `csharp-ls` |
| Go | `gopls-lsp` | `gopls` |
| Java | `jdtls-lsp` | `jdtls` |
| Kotlin | `kotlin-lsp` | `kotlin-lsp` |
| Liquid | `liquid-lsp` | `shopify` (Shopify CLI) |
| Lua | `lua-lsp` | `lua-language-server` |
| PHP | `php-lsp` | `intelephense` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Ruby | `ruby-lsp` | `ruby-lsp` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Swift | `swift-lsp` | `sourcekit-lsp` |
| TypeScript and JavaScript | `typescript-lsp` | `typescript-language-server` |

| LSP recommendation dialog choice | Effect |
| --- | --- |
| Yes, install | Installs for your user account; prints `<plugin> installed · restart to apply` |
| No, not now (or Esc) | Closes; a later session can offer again |
| Never for this plugin | Stops for that plugin only |
| Disable all LSP recommendations | Stops for every language |

## Notes

- The plugin does not include the language server binary; confirm it is on the `PATH` of the shell you start `claude` from.
- Anthropic maintains every listed plugin except `liquid-lsp` (Shopify).
- Gains: diagnostics after each edit (press Ctrl+O to read them) and a read-only `LSP` tool for symbol lookup.
- Works in terminal sessions only; cloud sessions do not start plugin language servers.
- The recommendation dialog appears at most once per session, when a matching binary is on `PATH` but the plugin is not installed; official marketplace plugin is offered first; never for cloud sessions. Unanswered for 30 seconds counts as ignored; after five ignored dialogs recommendations stop.
- To re-enable: remove `lspRecommendationDisabled` and `lspRecommendationIgnoredCount` from `~/.claude.json`; for a "never" choice remove its `name@marketplace` from `lspRecommendationNeverPlugins`.
- For a language without an official plugin, write a plugin with an `.lsp.json` (server command + file extensions) and load it with `--plugin-dir` or publish it.

## Related

- [Anthropic's marketplaces](./anthropic-marketplaces.md)
- [Plugin components](./plugin-components.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)
