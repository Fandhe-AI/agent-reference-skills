# Production Mode

Source: https://knip.dev/features/production-mode

## Overview

Default mode analyzes all project code including config, test, and Storybook files. Production mode focuses exclusively on shipped code.

## Configuration

Append `!` to patterns for production-only:

```json
{
  "entry": ["src/index.ts!", "build/script.js"],
  "project": ["src/**/*.ts!", "build/*.js"]
}
```

Enable with CLI:

```sh
knip --production
```

### What's Included

- `entry` and `project` patterns suffixed with `!`
- Production `entry` patterns from plugins (Next.js, Remix)
- Only the `start` script from package.json
- Excludes exports marked with `@internal`

Files referenced only from development scripts or plugin configuration, such as a test setup file or a custom test reporter, are excluded from the analysis (a file that is also a production entry stays included). These references do not count as dependency usage, so a package in `dependencies` that only test or tooling configuration uses is reported as unused.

Unused subpaths in `package.json` are not reported in production mode, since files excluded from the analysis, such as tests, may import them.

### Note

The production run does not replace the default run. Run either or both separately.

### Test Files and Helpers

Use negated patterns for mocks/helpers:

```json
{
  "entry": ["src/index.ts!"],
  "project": ["src/**/*.ts!", "!src/test-helpers/**!"]
}
```

## Strict Mode

```sh
knip --production --strict
```

Adds:
- Workspace isolation verification
- `peerDependencies` in unused/unlisted detection
- Type-only imports in `dependencies` reporting

`--strict` implies `--production`.

## Types

Exclude type-related issues:

```sh
knip --production --exclude types
```

## Notes

- Source: https://knip.dev/features/production-mode (knip@6.45.1 docs, retrieved 2026-11-14)
