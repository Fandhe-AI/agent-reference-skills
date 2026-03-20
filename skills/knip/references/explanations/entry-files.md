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

Custom configuration values **override** defaults (not merge).

## Plugins

Plugins automatically contribute additional entry files. Enabling Remix, Storybook, Vitest plugins adds their respective entry files.

## package.json

Knip examines these fields for entry points:

- `main`
- `bin`
- `exports`

Additionally, npm scripts are parsed to identify entry files and dependencies through the script parser.

## Gitignore

Files listed in `.gitignore` are excluded by default. Override with `--no-gitignore`.

## Related

- Configuring project files guide
- Script parser feature
