# CLI Reference

Complete reference for the `figma connect` command (`@figma/code-connect`) and all its subcommands, for publishing and managing Code Connect connections from a terminal or CI/CD.

## Signature / Usage

```bash
npx figma connect <command> [options]
```

| Command | Description |
|---------|-------------|
| `publish` | Publish Code Connect files to Figma |
| `unpublish` | Remove published Code Connect connections |
| `parse` | Parse Code Connect files and output as JSON |
| `create` | Generate a boilerplate Code Connect template file |
| `migrate` | Migrate parser-based Code Connect files to template files |
| `preview` | Preview how Code Connect snippets render in the Figma inspect panel |

## Options / Props

### Global options

| Flag | Description |
|------|-------------|
| `-a, --api-url <url>` | Custom Figma API URL instead of `https://api.figma.com/v1`; overrides `apiUrl` in `figma.config.json` |
| `-t, --token <token>` | Figma access token; falls back to the `FIGMA_ACCESS_TOKEN` env var |
| `-v, --verbose` | Enable verbose logging for debugging |
| `-V, --version` | Output the version number |
| `-h, --help` | Display help |

---

### `figma connect publish`

Scan for Code Connect files, validate them against the Figma API, and publish them.

```bash
npx figma connect publish [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory containing your Code Connect project (defaults to cwd) |
| `-f, --file <file>` | Path to a single Code Connect file to publish |
| `-c, --config <path>` | Path to a figma config file |
| `--exit-on-unreadable-files` | Exit if any Code Connect files cannot be parsed (recommended for CI/CD) |
| `--dry-run` | Test publishing without actually publishing |
| `--skip-validation` | Skip validation of Code Connect docs |
| `-l, --label <label>` | Label to apply to the published files |
| `-b, --batch-size <batch_size>` | Batch size (number of documents) to use when uploading |
| `--force` | Overwrite existing UI-created Code Connect mappings if they conflict with the files being published |

---

### `figma connect unpublish`

Remove published connections; all connections found in a directory, or a specific node and label.

```bash
npx figma connect unpublish [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory containing your Code Connect project (defaults to cwd) |
| `-f, --file <file>` | Path to a single Code Connect file to unpublish |
| `-c, --config <path>` | Path to a figma config file |
| `--exit-on-unreadable-files` | Exit if any Code Connect files cannot be parsed |
| `--dry-run` | Test unpublishing without actually unpublishing |
| `--node <link_to_node>` | Figma node to unpublish (requires `--label`) |
| `-l, --label <label>` | Label to unpublish for |

> Omitting `--node` unpublishes all components found in the directory.

---

### `figma connect parse`

Parse Code Connect files and output JSON (stdout by default); useful for debugging or integrating with other tools.

```bash
npx figma connect parse [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory containing your Code Connect project (defaults to cwd) |
| `-f, --file <file>` | Path to a single Code Connect file to process |
| `--outFile <file>` | File to write the JSON output to |
| `-c, --config <path>` | Path to a figma config file |
| `--exit-on-unreadable-files` | Exit if any Code Connect files cannot be parsed |
| `--dry-run` | Test parsing without producing output |
| `-l, --label <label>` | Label to apply to the parsed files |

---

### `figma connect create`

Generate a boilerplate Code Connect template file (`<Component>.figma.ts`) for a Figma component, populated with property accessors, placeholder `example` / `imports` / `id`, and next-step comments. Exits with an error if the file already exists.

```bash
npx figma connect create <figma-node-url> [options]
```

| Flag | Description |
|------|-------------|
| `<figma-node-url>` | URL of the Figma component node (argument) |
| `--outDir <dir>` | Directory to output the generated template |
| `-c, --config <path>` | Path to a figma config file |

---

### `figma connect preview`

Render snippets as they would appear in Dev Mode without publishing. Prettier-supported languages (TypeScript, JavaScript, JSX/TSX) are validated with Prettier; other languages are returned as-is.

```bash
npx figma connect preview [files...] [options]
```

| Flag | Description |
|------|-------------|
| `[files...]` | Code Connect files to preview; leave empty to preview all files |
| `-r, --dir <dir>` | Directory containing your Code Connect project (defaults to cwd) |
| `-c, --config <path>` | Path to a figma config file |
| `--output <format>` | Output format: `table` (default) or `json` |
| `--inspect` | List the component's properties and variants, including options and defaults, without rendering |
| `--props <pairs...>` | Render one property combination; unspecified properties use their defaults. Names and values are case-insensitive |
| `--all` | Render every combination of boolean and variant properties; requires a specific component file |
| `--unique` | Like `--all` but reports each distinct snippet once with a count (v1.5.3) |
| `--max-combinations <number>` | Limit combinations rendered by `--all` or `--unique` (default and maximum: 500) |

```bash
npx figma connect preview src/components/Button.figma.ts --inspect
npx figma connect preview src/components/Button.figma.ts --props Variant=Primary "Has Icon Start=true"
npx figma connect preview src/components/Button.figma.ts --all --max-combinations 20
```

---

### `figma connect migrate`

Migrate parser-based Code Connect files into template files. By default scans the project using your `figma.config.json` include/exclude settings and writes `.figma.ts` files.

```bash
npx figma connect migrate [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory containing your Code Connect project (defaults to cwd) |
| `-f, --file <file...>` | One or more Code Connect files to migrate; if omitted, all files in the project are migrated |
| `--outDir <dir>` | Write migrated template files to a directory instead of alongside the source files |
| `-c, --config <path>` | Path to a figma config file |
| `--javascript` | Output `.figma.js` instead of `.figma.ts` |
| `--delete` | Delete source Code Connect files after they are successfully migrated |
| `--batch <mode>` | `auto` (default; attempts files with 10 or more connections), `all`, or `none` |
| `--include-props` | Preserve `__props` metadata blocks; needed if using the React `.getProps()` / `.render()` modifiers or other templates read `executeTemplate().metadata.__props` |

## Notes

- Set `FIGMA_ACCESS_TOKEN` as an environment variable to avoid passing `--token` on every command
- Use `--exit-on-unreadable-files` in CI/CD pipelines to catch configuration errors early
- v2.0.0 (2026-08-18) and later: framework-specific parser files can only be used by `migrate` and `unpublish`; other commands exit with guidance to migrate to template files. Use `npm install --save-dev @figma/code-connect@1` to keep the parser
- v2.0.2 (2026-10-14): `publish` sends preflight validation failure counts to Figma (set `DO_NOT_TRACK=1` to disable); network failures show the underlying reason (timeout, connection error), and `--verbose` prints the stack trace; `create` always generates a parserless template; `preview --output json` includes each connection's source file; `migrate` leaves existing template files unchanged and reports success when nothing needs migrating
- Source for version notes: https://github.com/figma/code-connect/blob/v2.0.2/CHANGELOG.md
- v1.5.0: `--delete` for `migrate`, `preview --inspect` / `--props` / `--all` / `--max-combinations`

## Related

- [CLI Quickstart](./quickstart.md)
- [Config File](./config-file.md)
- [CI/CD Integration](./ci-cd.md)
- [Templates Migration Guide](./templates-migration-guide.md)
