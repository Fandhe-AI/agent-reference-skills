# Language server

Biome provides first-class support for the Language Server Protocol (LSP).

## Signature / Usage

```shell
biome lsp-proxy
```

```shell
biome start
echo "console.log('')" | biome format --use-server --stdin-file-path=dummy.js
```

## Supported methods

- `initialize`
- `initialized`
- `workspace/didChangeConfiguration`
- `workspace/didChangeWatchedFiles`
- `workspace/didChangeWorkspaceFolders`
- `textDocument/didOpen`
- `textDocument/didChange`
- `textDocument/didSave`
- `textDocument/didClose`
- `textDocument/publishDiagnostics`
- `textDocument/codeAction`
- `codeAction/resolve`
- `textDocument/formatting`
- `textDocument/rangeFormatting`
- `textDocument/onTypeFormatting`
- `textDocument/definition`

## Extension settings

Settings meant for extension developers, not for users. An extension might expose them to users with different names or formats (for example, the Zed extension maps `require_configuration` to `require_config_file`, defined in a JSONC file).

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `require_configuration` | `boolean` | `false` | When `true`, Biome won't analyze any file (except for parsing) until there's a `biome.json` file in the root of the project |
| `configuration_path` | `string` | `null` | Path to a custom configuration file: a `biome.json` / `biome.jsonc` file, or the folder that contains it. Relative or absolute. Use it when the configuration is in a subfolder of your project |
| `inline_config` | `object` | `null` | Inline version of the Biome configuration. Its options override the options from any `biome.json` read from disk (or the defaults) |
| `go_to_definition` | `boolean` | `false` | Enables `textDocument/definition` using the Biome module graph |

```json
{
  "inline_config": {
    "linter": {
      "rules": {
        "suspicious": {
          "noConsole": "off"
        }
      }
    }
  }
}
```

`go_to_definition` supports:

- Resolving definitions of variables declared in the same file or in another file for JavaScript, TypeScript, JSX, TSX, and HTML-ish files
- Resolving definitions of CSS classes used in JSX/TSX files and HTML-ish files
- Resolving definitions of JSX/TSX components
- Resolving definitions of HTML-ish components

Out of scope: variables defined in dependencies, and variables defined in dependencies that aren't imported in the project.

## Integrate Biome in an editor extension

### Use the LSP proxy

The `lsp-proxy` command spawns two processes: a daemon that executes the requested operations, and a server that functions as a proxy between the client (the editor) and the daemon. If your editor can send JSON-RPC requests to a server, you only need to configure the editor to run that command.

### Use `stdin`

If your editor doesn't support LSP, call the `biome` binary using standard input. The `format`, `lint`, and `check` commands can be called this way. Biome returns the new output (or the original output if no changes occurred) to stdout and the diagnostics to stderr. The `--stdin-file-path` option is required; the path doesn't need to exist, but it must have the correct file extension.

It's the editor's responsibility to locate and resolve the path of the binary. The binaries are shipped to npm per supported architecture and OS:

- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

The binary name is `biome` or `biome.exe`, found in the root directory of the package.

### Use the daemon with the binary

Start a daemon with `biome start`, then add `--use-server` to every command (see Signature / Usage). With this approach you won't be able to provide logs to your users.

## Language Server logs

The daemon saves logs in a folder called `biome-logs`:

- Linux: `~/.cache/biome`
- Windows: `C:\Users\<UserName>\AppData\Local\biomejs\biome\cache`
- macOS: `/Users/<UserName>/Library/Caches/dev.biomejs.biome`

On other operating systems, the folder is in the system's temporary directory. To obtain the precise path, run the command below. Log files are rotated on an hourly basis.

```shell
biome explain daemon-logs
```

## Notes

- If you use the daemon, you're responsible for restarting/killing the process with `biome stop`, to avoid ghost processes.
- Source: https://biomejs.dev/reference/language-server/ (biomejs/website commit 49293f2)

## Related

- [cli](./cli.md)
- [daemon](./daemon.md)
- [vscode](./vscode.md)
- [zed](./zed.md)
