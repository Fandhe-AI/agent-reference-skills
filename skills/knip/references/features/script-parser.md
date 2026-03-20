# Script Parser

Source: https://knip.dev/features/script-parser

## Overview

Knip analyzes shell commands and scripts to identify dependencies, entry files, and configuration files. Scripts are parsed statically without execution.

## package.json Parsing

Examines `main`, `bin`, `exports`, and `scripts` fields:

```json
{
  "main": "index.js",
  "exports": {
    "./lib": { "import": "./dist/index.mjs", "require": "./dist/index.cjs" }
  },
  "bin": { "program": "bin/cli.js" },
  "scripts": {
    "build": "rollup src/entry.ts",
    "start": "node --loader tsx server.ts"
  }
}
```

Identified entry files: `index.js`, `dist/index.mjs`, `dist/index.cjs`, `bin/cli.js`, `src/entry.ts`, `server.ts`

### Exclusions

Files matching `.gitignore` or `ignore` option are excluded. Scripts without standard extensions aren't processed.

### CLI Arguments

Detected:
- First positional arguments as entry files
- `-c` / `--config` as configuration files
- `--require`, `--loader`, `--import` as dependencies

Example: `"start": "node --import tsx/esm run.ts"` → `tsx` as dependency, `run.ts` as entry.

## Scripts in Configuration Files

Plugins use the parser for:
- **GitHub Actions**: `run` fields in workflow files
- **Husky & Lefthook**: Git hooks and `lefthook.yml`
- **Lint Staged**: Command values
- **Nx**: Task executors and `nx:run-commands`
- **Release It**: Hook commands

## Source Code Analysis

Template tag scripts in specialized libraries:

### bun

```javascript
import { $ } from 'bun';
await $`bun boxen I ❤ unicorns`;
```

### execa

```javascript
await $({ stdio: 'inherit' })`c8 node hydrate.js`;
```

### zx

```javascript
await $`node scripts/parse.js`;
```
