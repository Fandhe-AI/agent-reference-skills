# Configuring Project Files

Source: https://knip.dev/guides/configuring-project-files

## Overview

`entry` and `project` file patterns are fundamental to Knip.

- Start with defaults, add targeted `entry` overrides when necessary
- Use `project` patterns with negations to define analysis scope
- Use production mode to exclude non-production files
- Reserve `ignore` for suppressing issues in specific files, not excluding from analysis

## Entry Files

Avoid adding excessive files as entry points:

1. Knip does not report unused exports in entry files by default
2. Proper pattern configuration identifies unused files/exports more effectively

## Unused Files Detection

```
unused files = project files - (entry files + resolved files)
```

## Negated Patterns

```json
{"entry": ["src/routes/*.ts", "!src/routes/_*.ts"]}
```

Source boundaries:

```json
{
  "entry": ["src/index.ts"],
  "project": ["src/**/*.ts", "!src/exclude/**"]
}
```

## Best Practices

**Incorrect**: Using `ignore` for build artifacts or negating patterns in `entry` to exclude tests.

**Recommended**: Define project boundaries with `project` patterns.

## Production Mode

Use `knip --production` instead of filtering tests through `ignore`:

```json
{
  "entry": ["src/index.ts!"],
  "project": ["src/**/*.ts!", "!src/test-helpers/**!"]
}
```

## Defaults

```json
{
  "entry": [
    "{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "src/{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"
  ],
  "project": ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!"]
}
```
