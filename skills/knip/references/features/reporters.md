# Reporters & Preprocessors

Source: https://knip.dev/features/reporters

## Built-in Reporters

| Reporter | Description |
|----------|-------------|
| `symbols` | Default reporter |
| `compact` | Compact output |
| `codeowners` | CODEOWNERS-based grouping |
| `json` | Machine-readable JSON |
| `codeclimate` | Code Climate format |
| `markdown` | Markdown tables |
| `disclosure` | Collapsible HTML details |
| `github-actions` | PR annotations |
| `cycles` | Multi-line tree view of circular dependencies |
| `sarif` | SARIF 2.1.0 output for code-scanning integrations |

Usage: `knip --reporter compact`

### JSON Reporter

```sh
knip --reporter json
```

Output is one line of JSON. The top level is an object with a single `issues` array; each element groups every issue found in one file:

```json
{
  "issues": [
    { "file": "src/legacy.ts", "files": [{ "name": "src/legacy.ts" }] },
    {
      "file": "src/math.ts",
      "exports": [{ "name": "factorial", "line": 12, "col": 14, "pos": 256 }]
    }
  ]
}
```

- `file`: path relative to the working directory
- `owners`: `{ name }[]`, only when a `CODEOWNERS` file is found
- one key per enabled issue type; items have `name` and optionally `namespace`, `line`, `col`, `pos`

### CODEOWNERS

When `.github/CODEOWNERS` exists, each entry gains an `owners` array. Use another path via `--reporter-options`:

```sh
knip --reporter json --reporter-options '{"codeowners":"docs/CODEOWNERS"}'
```

### Cycles Reporter

Verbose multi-line tree view of circular dependencies; each edge shows import kind and specifier and closes (`↩`) at the starting file.

```sh
knip --cycles --reporter cycles
```

- Reports representative cycle paths, not an exhaustive list of every simple cycle.
- `cycles.allow` accepts known cycle paths; `cycles.dynamicImports` includes dynamic imports (ignored by default).
- Cycles are warnings by default; set `"rules": { "cycles": "error" }` for a non-zero exit code.
- For one line per path, use `knip --cycles` with the default reporter.

### SARIF Reporter

```sh
knip --reporter sarif > knip.sarif
```

Upload to GitHub Code Scanning (runs even when Knip exits non-zero):

```yaml
- run: pnpm exec knip --reporter sarif > knip.sarif
- if: always()
  uses: github/codeql-action/upload-sarif@v4
  with:
    sarif_file: knip.sarif
```

### GitHub Actions Reporter

```sh
knip --reporter github-actions
```

Produces annotations in pull requests.

### Markdown Reporter

Generates tables organized by issue type with Name, Location, Severity columns.

### Disclosure Reporter

Creates collapsible `<details><summary>` HTML elements.

### CodeClimate Reporter

Generates Code Climate Report JSON format with `type`, `check_name`, `description`, `categories`, `location`, `severity`, `fingerprint`.

## Custom Reporters

### Local

```typescript
type Reporter = async (options: ReporterOptions) => void;
```

`ReporterOptions` includes: `report`, `issues`, `counters`, `configurationHints`, `cwd`, `isProduction`, `options`.

```sh
knip --reporter ./my-reporter.ts
```

### External

```sh
knip --reporter [pkg-name]
```

Invokes default export from the package's main script.

## Preprocessors

Execute post-analysis to modify results before reporters:

```typescript
type Preprocessor = async (options: ReporterOptions) => ReporterOptions;
```

```sh
knip --preprocessor ./preprocess.ts
```

Supports local files and npm packages. Can be repeated. Can also be set in the Knip configuration file:

```json
{ "preprocessor": "./preprocess.ts" }
```
