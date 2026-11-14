# Configuration Hints

Source: https://knip.dev/reference/configuration-hints

## Overview

Configuration hints maintain clean config files and minimize drift. Warnings by default (not lint findings); `--treat-config-hints-as-errors` / `treatConfigHintsAsErrors` make any hint exit non-zero. Suppress with `--no-config-hints` or treat as errors with `--treat-config-hints-as-errors`. Tag-related hints can be suppressed with `--no-tag-hints` or escalated with `treatTagHintsAsErrors`.

Each hint shows the value, followed by a message that points to the location in the configuration file. The location reads as `file → workspace → option`: the workspace segment is the key in `workspaces` (such as `packages/*`), or `(root)` for `workspaces["."]`; options at the top level have no workspace segment.

```text
generated/**  Remove from knip.json → packages/app → ignore (gitignored)
lodash        Remove from knip.json → ignoreDependencies
```

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

A key in `workspaces` matches no workspace in the project (e.g. workspace removed or renamed). Message: `Remove from knip.json → workspaces`. Solution: remove the stale key, or correct its path.

### 5. Unused Ignore Patterns

A pattern in `ignore` or `ignoreFiles` did not suppress any issue. The reason in parentheses tells why the pattern is not needed:

- `gitignored`: the pattern is already matched in some `.gitignore` file
- `no issues`: matching files exist, but there are no issues to ignore
- `files are used`: matching files exist, and they're used
- `no matches`: the pattern matches no files

```text
Remove from knip.json → ignore (gitignored)
Remove from knip.json → ignoreFiles (files are used)
```

Solution: remove the pattern from the array.

### 6. Unused Entry in Ignore Group

Entry in `ignoreWorkspaces`/`ignoreDependencies`/`ignoreBinaries`/`ignoreUnresolved` no longer needed → remove.

### 7. Useless Patterns

Glob patterns matching no files → modify or delete.

### 8. Redundant Patterns

Patterns already covered by defaults or plugins → remove.

### 9. Missing Package Entry File

`package.json` entry file doesn't exist → refine or remove.

## Notes

- Hint messages include the config location since 6.45.0 (for example `Remove from knip.json → ignoreDependencies`, `Refine knip.json → entry pattern (no matches)`, `Package entry file not found in packages/app/package.json`)
- Source: https://knip.dev/reference/configuration-hints (knip@6.45.1 docs, retrieved 2026-11-14)
