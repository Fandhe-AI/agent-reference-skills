# Set up your editor

Source: https://biomejs.dev/configuration/editors/

Biome comes with a language server, so editor extensions give you the same diagnostics, formatting, and assist actions as the CLI while you type or save your code. The Biome team maintains the extensions for VS Code, Zed, and IntelliJ. Helix connects to Biome's language server directly, and extensions for other editors are maintained by the community.

## Signature / Usage

Helix has no extension. It connects through the `biome lsp-proxy` command (language server over standard input and output). Set it in `languages.toml`:

```toml
[language-server.biome]
command = "biome"
args = ["lsp-proxy"]

# Inline configuration is also supported
# https://biomejs.dev/blog/biome-v2-4/#editor-inline-configuration
[language-server.biome.config.biome.inlineConfig]
linter.rules.suspicious.noConsole = "off"

[[language]]
name = "javascript"
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]
auto-format = true
```

To make Helix apply project-specific settings, add Biome's configuration files to `roots`:

```toml
[language-server.biome]
command = "biome"
args = ["lsp-proxy"]

[[language]]
name = "typescript"
roots = ["biome.json", "biome.jsonc", "package.json"]
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]
auto-format = true
```

To use Biome with another language such as JSON or CSS, add a `[[language]]` block for it.

## Editors

| Editor | Maintainer | Install |
|--------|------------|---------|
| VS Code | Biome team | Biome extension from the Visual Studio Marketplace, or Open VSX registry for VSCodium, Cursor, and other derivatives |
| Zed | Biome team | Command Palette, **zed: extensions**, search **Biome**, **Install** |
| IntelliJ (and other JetBrains IDEs, e.g. WebStorm) | Biome team | Biome plugin from the JetBrains Marketplace (Settings, Plugins, Marketplace, search **Biome**, **Install**, restart the IDE), or **Install Plugin from Disk...** with the `.zip` from the plugin's **Versions** tab |
| Helix | Biome (built-in LSP) | `biome lsp-proxy` in `languages.toml` |
| Vim | Community | ALE supports Biome |
| Neovim | Community | nvim-lspconfig (Biome config), ALE, or coc-biome for coc.nvim |
| Sublime Text | Community | LSP-biome |
| Emacs | Community | lsp-mode + lsp-biome |
| Nova | Community | Biome extension from Panic extensions |

VS Code: to make Biome the default formatter, open a supported file, open the Command Palette, select **Format Document With...**, then **Configure Default Formatter**, then **Biome**.

## Notes

- If you are migrating from ESLint and Prettier, disable or uninstall their extensions. Two formatters running on save will fight over the same file.
- Format and fix on save, and troubleshooting, are covered in the VS Code and Zed extension references.
- Pinned to the biomejs/website source at commit `49293f2`.

## Related

- [vscode](../reference/vscode.md)
- [zed](../reference/zed.md)
- [language-server](../reference/language-server.md)
- [language-support](../internals/language-support.md)
