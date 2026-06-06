# Monorepo & Workspaces

Configure knip to analyze a monorepo with multiple workspace packages.

```json
{
  "workspaces": {
    ".": {
      "entry": "scripts/*.js",
      "project": "scripts/**/*.js"
    },
    "packages/*": {
      "entry": "{index,cli}.ts",
      "project": "**/*.ts"
    },
    "packages/cli": {
      "entry": "bin/cli.js"
    }
  }
}
```

Analyze a specific workspace only:

```sh
# By directory path
knip --workspace packages/my-lib

# By package name
knip -W @myorg/my-lib

# By glob, excluding one
knip --workspace @myorg/* --workspace '!@myorg/legacy'
```

Skip specific workspaces entirely:

```json
{
  "ignoreWorkspaces": ["packages/go-server", "packages/flat/*"]
}
```

## Notes

- Workspaces are auto-discovered from `package.json` `workspaces`, `pnpm-workspace.yaml`, or the `workspaces` object in `knip.json`
- Root-level `entry`/`project` keys are ignored when `workspaces` is configured; use `"."` as the root workspace key
- `--workspace` automatically includes ancestor and dependent workspaces
- For isolated workspace linting, combine `--workspace` with `--production --strict`
