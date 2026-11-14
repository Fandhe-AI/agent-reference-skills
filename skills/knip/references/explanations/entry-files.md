# Entry Files

Source: https://knip.dev/explanations/entry-files

## Overview

Entry files are starting points for Knip to determine which files are used. More entry files lead to increased codebase coverage and more dependency discovery.

## Default Entry File Patterns

```json
{
  "entry": [
    "{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "src/{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"
  ],
  "project": ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!"]
}
```

Custom `entry` and `project` values replace these defaults (not merge). Entry files from the other places on this page are still added.

## Plugins

Plugins automatically contribute additional entry files. Enabling Remix, Storybook, Vitest plugins adds their respective entry files.

## package.json

Knip examines these fields for entry points:

- `main`, `module`, `browser`, `bin`, `types`, `typings` and `exports`

These are added even when `entry` is customized. The targets of a key in the `imports` field (subpath imports) are entry files only when the key is imported somewhere; otherwise the key is reported as an unused subpath. With `includeSubpathExports` the same applies to the `exports` field. Additionally, npm scripts are parsed to identify entry files and dependencies through the script parser.

## Gitignore

Files listed in `.gitignore` are excluded by default. Override with `--no-gitignore`.

## Notes

- Source: https://knip.dev/explanations/entry-files (knip@6.45.1 docs, retrieved 2026-11-14)

## Related

- Configuring project files guide
- Script parser feature
