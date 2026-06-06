# Monorepo Entry Points

Document multiple packages from a single TypeDoc invocation using the `packages` entry point strategy.

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPointStrategy": "packages",
  "entryPoints": [
    "packages/core",
    "packages/utils",
    "packages/cli"
  ],
  "out": "docs",
  "name": "My Monorepo"
}
```

Each sub-package can carry its own `typedoc.json` to override shared settings:

```json
{
  "entryPoints": ["src/index.ts"],
  "name": "Core Package",
  "readme": "README.md"
}
```

For an application without a single public entry point, use the `expand` strategy instead:

```json
{
  "entryPointStrategy": "expand",
  "entryPoints": ["src"],
  "out": "docs"
}
```

## Notes

- The `packages` strategy reads each package's `package.json` `exports` or `main` field to find the entry point automatically when no `typedoc.json` is present in the sub-package.
- The `expand` strategy treats every `.ts` file under the given directory as an entry point — useful for applications without a barrel `index.ts`.
- Use `sortEntryPoints: false` to preserve the order specified in `entryPoints` rather than sorting alphabetically.
- See the [typedoc-packages-example](https://github.com/Gerrit0/typedoc-packages-example) repository for a reference monorepo setup.
