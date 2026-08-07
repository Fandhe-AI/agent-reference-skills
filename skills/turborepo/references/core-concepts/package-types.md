# Package Types

## Usage

**Application Packages** — packages designed to be deployed directly from the workspace.

- Usually placed in the `./apps` directory
- Next.js, Svelte, Vite, CLI apps, etc.
- Act as "leaf nodes" in the package graph
- Not normally installed as a dependency of other packages

**Library Packages** — packages that contain code shared across the workspace.

- Cannot be deployed on their own
- Also called "Internal Packages"
- Documented as a standalone page in the official docs: `internal-packages` (`/docs/core-concepts/internal-packages`)

### Internal Packages: three compilation strategies

1. **Just-in-Time (JIT) packages** — the application's bundler compiles the TypeScript source files directly.
   - Minimal configuration
   - No build step required
   - Limitations: only works for transpilable consumers, cannot use TypeScript `paths`, no Turborepo build caching

2. **Compiled Packages** — compiled with `tsc` or similar. Turborepo can cache the build output.

```json
{
  "exports": {
    "./add": {
      "types": "./dist/add.d.ts",
      "default": "./dist/add.js"
    }
  }
}
```

3. **Publishable Packages** — packages prepared for distribution to the npm registry. Using `changesets` is recommended.

## Options / Props

| Package manager | Install syntax |
| --- | --- |
| pnpm / bun | `"@repo/ui": "workspace:*"` |
| yarn / npm | `"@repo/ui": "*"` |

## Related

- [Package and Task Graph](./package-and-task-graph.md)
