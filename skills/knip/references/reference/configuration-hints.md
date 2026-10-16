# Configuration Hints

Source: https://knip.dev/reference/configuration-hints

## Overview

Configuration hints maintain clean config files and minimize drift. Warnings by default (not lint findings); `--treat-config-hints-as-errors` / `treatConfigHintsAsErrors` make any hint exit non-zero. Suppress with `--no-config-hints` or treat as errors with `--treat-config-hints-as-errors`. Tag-related hints can be suppressed with `--no-tag-hints` or escalated with `treatTagHintsAsErrors`.

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

### 4. Stale Workspace Configuration

A key in `workspaces` matches no workspace in the project (e.g. workspace removed or renamed). Message: `Remove from workspaces`. Solution: remove the stale key, or correct its path.

### 5. Unused Entry in Ignore Group

Entry in `ignoreWorkspaces`/`ignoreDependencies`/`ignoreBinaries`/`ignoreUnresolved` no longer needed → remove.

### 6. Useless Patterns

Glob patterns matching no files → modify or delete.

### 7. Redundant Patterns

Patterns already covered by defaults or plugins → remove.

### 8. Missing Package Entry File

`package.json` entry file doesn't exist → refine or remove.
