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

Usage: `knip --reporter compact`

### JSON Reporter

```sh
knip --reporter json
```

Structure: per-file objects with `file`, `owners`, `dependencies`, `devDependencies`, `exports`, `types`, `enumMembers`, `duplicates`.

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

Supports local files and npm packages. Can be repeated.
