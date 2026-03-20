# CLI Options

All Storybook CLI commands and their available flags.

## Overview

The Storybook CLI (`storybook`) is the primary tool for developing, building, and managing Storybook projects.

> **npm users:** Prefix options with `--` separator: `npm run storybook build -- -o ./dist`

## Commands

### `storybook dev`

Compile and serve a live-reloading development build.

```
storybook dev [options]
```

| Option | Type | Description |
|--------|------|-------------|
| `-p, --port` | number | Port to run on (default: 6006) |
| `-h, --host` | string | Host to bind to |
| `-c, --config-dir` | string | Config directory (default: `.storybook`) |
| `--loglevel` | string | `trace \| debug \| info \| warn \| error \| silent` |
| `--https` | — | Serve over HTTPS |
| `--ssl-cert` | string | SSL certificate path |
| `--ssl-key` | string | SSL key path |
| `--ssl-ca` | string | SSL CA path |
| `--smoke-test` | — | Exit after successful startup |
| `--ci` | — | CI mode — skip prompts, don't open browser |
| `--no-open` | — | Prevent auto-opening browser |
| `--quiet` | — | Suppress verbose output |
| `--debug` | — | Output additional debug logs |
| `--initial-path` | string | URL path to open in browser |
| `--preview-url` | string | Override preview iframe URL |
| `--force-build-preview` | — | Force rebuild of preview iframe |
| `--docs` | — | Start in documentation mode |
| `--disable-telemetry` | — | Disable telemetry collection |
| `--enable-crash-reports` | — | Enable crash report submission |

---

### `storybook build`

Compile Storybook for static deployment.

```
storybook build [options]
```

| Option | Type | Description |
|--------|------|-------------|
| `-o, --output-dir` | string | Output directory for built files |
| `-c, --config-dir` | string | Config directory |
| `--loglevel` | string | `trace \| debug \| info \| warn \| error \| silent` |
| `--quiet` | — | Suppress verbose output |
| `--debug` | — | Additional debug information |
| `--docs` | — | Build in documentation mode |
| `--test` | — | Optimize build for testing (removes UI features) |
| `--preview-url` | string | Override preview iframe URL |
| `--force-build-preview` | — | Force preview iframe rebuild |
| `--disable-telemetry` | — | Disable telemetry |

---

### `storybook init`

Install and configure Storybook in a project.

```
storybook[@version] init [options]
```

| Option | Description |
|--------|-------------|
| `-b, --builder` | Specify builder (`webpack5`, `vite`, etc.) |
| `-f, --force` | Overwrite existing config files |
| `-s, --skip-install` | Skip dependency installation |
| `-t, --type` | Framework type (`react`, `angular`, `vue`, etc.) |
| `-y, --yes` | Skip prompts and auto-install |
| `--features [...values]` | Install specific features (`docs`, `test`, `a11y`) |
| `--package-manager` | Package manager (`npm`, `yarn`, `pnpm`) |
| `--no-dev` | Complete init without running dev server |

---

### `storybook add`

Install and configure a Storybook addon.

```
storybook add [addon] [options]
```

| Option | Description |
|--------|-------------|
| `-c, --config-dir` | Config directory |
| `--package-manager` | Package manager |
| `-s, --skip-postinstall` | Skip post-install configuration |

---

### `storybook remove`

Remove a Storybook addon from the project.

```
storybook remove [addon] [options]
```

---

### `storybook upgrade`

Upgrade Storybook to a newer version.

```
storybook[@version] upgrade [options]
```

| Option | Description |
|--------|-------------|
| `-c, --config-dir` | Config directory (supports multiple) |
| `-n, --dry-run` | Check upgrades without installing |
| `-s, --skip-check` | Skip migration check |
| `-y, --yes` | Skip prompts and auto-upgrade |
| `-f, --force` | Force upgrade, skip autoblockers |
| `--package-manager` | Package manager |

---

### `storybook migrate`

Run codemods for version compatibility.

```
storybook[@version] migrate [codemod] [options]
```

| Option | Description |
|--------|-------------|
| `-n, --dry-run` | Verify without applying changes |
| `-l, --list` | List available codemods |
| `-g, --glob` | Glob pattern for target files |
| `-p, --parser` | jscodeshift parser (`babel`, `babylon`, `flow`, `ts`, `tsx`) |
| `-r, --rename [from-to]` | Rename files with suffix |

---

### `storybook automigrate`

Run automatic configuration migrations.

```
storybook[@version] automigrate [fixId] [options]
```

| Option | Description |
|--------|-------------|
| `-n, --dry-run` | Check without applying |
| `-y, --yes` | Auto-apply without prompting |
| `-l, --list` | List available automigrations |
| `--renderer` | Specify renderer (useful for monorepos) |

---

### `storybook doctor`

Run health checks for common project issues.

```
storybook doctor [options]
```

---

### `storybook info`

Report environment debugging information (OS, Node, npm, installed Storybook packages).

```
storybook info
```

---

### `storybook index`

Build an `index.json` listing all stories and docs entries.

```
storybook index [options]
```

| Option | Description |
|--------|-------------|
| `-o, --output-file` | JSON output file path |
| `-c, --config-dir` | Config directory |

---

### `storybook sandbox`

Generate a local sandbox project for testing Storybook features.

```
storybook[@version] sandbox [framework-filter] [options]
```

| Option | Description |
|--------|-------------|
| `-o, --output` | Output directory |
| `--no-init` | Generate without initializing Storybook |

## Notes

- Telemetry collects anonymous usage data; opt out with `--disable-telemetry` on any command
- `storybook init` is also available as `create storybook[@version]`

## Related

- [CSF](./csf.md)
- [Frameworks](./new-frameworks.md)
