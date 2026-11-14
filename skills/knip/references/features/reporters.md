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

### Writing to a file

Reporters write to `stdout` by default. Use `--output-file` to write the output of a reporter to a file instead:

```sh
knip --reporter sarif --output-file knip.sarif
```

Combine multiple reporters and prefix each path with the reporter name, for example to keep the default report in the terminal while writing a JSON report for other tools:

```sh
knip --reporter symbols --reporter json --output-file json=knip.json
```

Reporters without an `--output-file` keep writing to `stdout`. Files are written without ANSI color codes. Parent directories are created if they don't exist.

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
knip --reporter sarif --output-file knip.sarif
```

Upload to GitHub Code Scanning (runs even when Knip exits non-zero).

Adapted (not in the official docs): `codeql-action/upload-sarif` is pinned to a commit SHA instead of the mutable tag (`@v4`) used upstream.

```yaml
- run: pnpm exec knip --reporter sarif --output-file knip.sarif
- if: always()
  uses: github/codeql-action/upload-sarif@6f2ac81f5cd81fe351a197ba0b00d91d03cd2aee  # v4.39.0
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

`ReporterOptions` includes: `report`, `issues`, `counters`, `configurationHints`, `cwd`, `isProduction`, `isShowProgress`, `options`, `write?`.

Use `options.write` instead of `console.log` to support `--output-file`. It writes to `stdout` by default, and to the file when one is configured. Output from `console.log` is not redirected. Knip always passes `write` to reporters; it is optional in the type so existing code that builds a `ReporterOptions` object keeps compiling:

```typescript
import type { Reporter } from 'knip';

const reporter: Reporter = function (options) {
  options.write?.(JSON.stringify(options.counters));
};

export default reporter;
```

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

## Notes

- Actions are pinned to full commit SHAs here; the upstream docs reference mutable tags (`@v4`)
- Source: https://knip.dev/features/reporters (knip@6.45.1 docs, retrieved 2026-11-14)
