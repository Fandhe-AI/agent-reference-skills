# Configuration Hints

Source: https://knip.dev/reference/configuration-hints

## Overview

Configuration hints maintain clean config files and minimize drift. Warnings by default; treat as errors with `--treat-config-hints-as-errors`.

## Categories

### 1. Unconfigured Projects

Too many unused files → add/refine `entry`/`project` patterns.

### 2. Unconfigured Workspaces

Missing workspace config in monorepos:

```json
{
  "workspaces": {
    "packages/app": {
      "entry": ["src/App.tsx"],
      "project": ["src/**/*.ts"]
    }
  }
}
```

### 3. Top-level Entry/Project in Monorepos

Root-level `entry`/`project` ignored in monorepos → move to `workspaces` objects.

### 4. Unused Entry in Ignore Group

Entry in `ignoreWorkspaces`/`ignoreDependencies`/`ignoreBinaries`/`ignoreUnresolved` no longer needed → remove.

### 5. Useless Patterns

Glob patterns matching no files → modify or delete.

### 6. Redundant Patterns

Patterns already covered by defaults or plugins → remove.

### 7. Missing Package Entry File

`package.json` entry file doesn't exist → refine or remove.
