# CLI Reference

Complete reference for the `figma connect` command and all its subcommands.

## Signature / Usage

```bash
npx figma connect <command> [options]
```

## Options / Props

### Global flags

| Flag | Description |
|------|-------------|
| `-t, --token <token>` | Figma personal access token (alternatively set `FIGMA_ACCESS_TOKEN` env var) |
| `-v, --verbose` | Enable debug logging |
| `-V, --version` | Output version number |
| `-h, --help` | Display help |

---

### `figma connect publish`

Scan for Code Connect files and publish them to Figma.

```bash
npx figma connect publish [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory to scan for Code Connect files |
| `-f, --file <file>` | Single file to publish |
| `--dry-run` | Preview changes without publishing |
| `--force` | Overwrite existing UI-created mappings |
| `-l, --label <label>` | Apply a publication label |
| `--exit-on-unreadable-files` | Exit with error if any file cannot be read (recommended for CI/CD) |

---

### `figma connect unpublish`

Remove published Code Connect connections from Figma.

```bash
npx figma connect unpublish [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory to scan |
| `-f, --file <file>` | Specific file to unpublish |
| `--node <link_to_node>` | Target a specific Figma node URL (requires `--label`) |
| `-l, --label <label>` | Label to unpublish for |
| `--dry-run` | Preview changes without unpublishing |

> Omitting `--node` unpublishes all components in the directory.

---

### `figma connect parse`

Parse Code Connect files and output them as JSON (without publishing).

```bash
npx figma connect parse [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory to parse |
| `-f, --file <file>` | Single file to parse |
| `--outFile <file>` | Write JSON output to specified file |
| `-l, --label <label>` | Apply label during parsing |

---

### `figma connect create`

Generate a boilerplate Code Connect template file for a Figma component.

```bash
npx figma connect create <figma-node-url> [options]
```

| Flag | Description |
|------|-------------|
| `--outDir <dir>` | Output directory for the generated file |

---

### `figma connect preview`

Preview how Code Connect snippets will render in the Inspect panel.

```bash
npx figma connect preview [dir/file] [options]
```

| Flag | Description |
|------|-------------|
| `-r, --dir <dir>` | Directory to scan |
| `--output <format>` | Output format: `table` (default) or `json` |

---

### `figma connect migrate`

Convert existing Code Connect files to template format.

```bash
npx figma connect migrate [options]
```

| Flag | Description |
|------|-------------|
| `--outDir <dir>` | Output directory for migrated files |
| `--javascript` | Generate `.figma.js` instead of `.figma.ts` |
| `--include-props` | Preserve metadata props in output |

## Notes

- Set `FIGMA_ACCESS_TOKEN` as an environment variable to avoid passing `--token` on every command
- Use `--exit-on-unreadable-files` in CI/CD pipelines to catch configuration errors early

## Related

- [CLI Quickstart](./quickstart.md)
- [Config File](./config-file.md)
- [CI/CD Integration](./ci-cd.md)
