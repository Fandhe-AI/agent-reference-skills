# Publishing Libraries

## Signature / Usage

Build configuration (tsup):

```json
{ "scripts": { "build": "tsup src/index.ts --format cjs,esm --dts" } }
```

Cache configuration:

```json
{ "tasks": { "build": { "outputs": ["dist/**"] } } }
```

Package entry points:

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts"
}
```

Versioning and publishing (Changesets):

```json
{
  "scripts": {
    "publish-packages": "turbo run build lint test && changeset version && changeset publish"
  }
}
```

## Options / Props

| Command | Description |
|---|---|
| `changeset` | Add a new changeset |
| `changeset version` | Create a new version |
| `changeset publish` | Publish to npm |

## Notes

- Name the script `publish-packages` rather than `publish` to avoid colliding with the npm built-in command.
- Alternative tools: `intuit/auto` (release generation from PR labels), `microsoft/beachball` (semantic version management).
