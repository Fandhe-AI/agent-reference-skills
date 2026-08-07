# Vitest

## Usage

Approach 1: per-package (recommended)

```json
{
  "scripts": { "test": "vitest run", "test:watch": "vitest --watch" }
}
```

```json
{
  "tasks": {
    "test": { "dependsOn": ["^test"] },
    "test:watch": { "cache": false, "persistent": true }
  }
}
```

Coverage merging: `nyc merge` → `nyc report`.

Approach 2: Vitest Projects (centralized at root)

```ts
export default defineConfig({
  projects: [
    { name: "web", root: "./apps/web", test: { include: ["src/**/*.test.ts"] } },
  ],
});
```

```json
{ "tasks": { "//#test": { "outputs": ["coverage/**"] } } }
```

Drawback: changing any package invalidates the entire cache.

Approach 3: hybrid — create a shared config package `@repo/vitest-config` that each package imports.

## Notes

- `workspaces` is deprecated; use `projects` instead.
- Example: `npx create-turbo@latest --example with-vitest`.
