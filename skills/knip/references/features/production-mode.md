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
