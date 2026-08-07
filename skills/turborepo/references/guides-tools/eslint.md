# ESLint

## Usage

ESLint v9 (Flat Config) — recommended.

Config package structure:
```
packages/eslint-config/
  package.json
  base.js
  next.js
  react-internal.js
```

Centralize ESLint plugins and dependencies in the `@repo/eslint-config` package.

`lint` task configuration:

```json
{ "tasks": { "lint": { "dependsOn": ["^lint"] } } }
```

`^lint` automatically invalidates the cache of dependent packages when the config package changes.

## Notes

- ESLint v8 reached EOL on October 5, 2024. New projects should always use v9 Flat Config.
