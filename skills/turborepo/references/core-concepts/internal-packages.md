# Internal Packages

Internal Packages are libraries whose source code lives inside your Workspace. They are shared within the monorepo and can be published to the npm registry later if needed.

## Signature / Usage

Install an Internal Package in `package.json` using your package manager's workspace syntax instead of a version:

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

Then import it like an external package:

```tsx
import { Button } from "@repo/ui/button";

export default function Page() {
  return <Button>Submit</Button>;
}
```

| Package manager | Install syntax |
| --- | --- |
| pnpm / bun / nub / aube | `"@repo/ui": "workspace:*"` |
| yarn / npm | `"@repo/ui": "*"` |

### Compilation Strategies

Choose one of three strategies:

- **Just-in-Time Packages**: minimal configuration; the application's bundler compiles the package as it uses it.
- **Compiled Packages**: moderate configuration; compile with a build tool such as `tsc` or a bundler.
- **Publishable Packages**: compile and prepare for the npm registry; the most configuration.

#### Just-in-Time Packages

Compiled by the application that uses it, so TypeScript (or uncompiled JavaScript) files can be exported directly. Most useful when:

- Applications are built with a modern bundler such as Turbopack, webpack, or Vite.
- You want to avoid configuration and setup steps.
- You are satisfied with application build times even when the package cannot hit cache.

```json
{
  "name": "@repo/ui",
  "exports": {
    "./button": "./src/button.tsx",
    "./card": "./src/card.tsx"
  },
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "check-types": "tsc --noEmit"
  }
}
```

- `exports` references TypeScript files directly, because the consumer's bundler compiles them.
- There is no `build` script, so no build tool needs to be configured in the package.

Limitations and tradeoffs:

- Only applicable when consumers do the transpiling (a bundler, or tooling that natively understands TypeScript). Otherwise move to Compiled Packages.
- No TypeScript `compilerOptions.paths`, because the code is transpiled by the consumer. With TypeScript 5.4 or later, use Node.js subpath imports instead.
- Turborepo cannot cache a build for a Just-in-Time Package, as it has no `build` step.
- Type-checking in a dependent package fails if an internal dependency has TypeScript errors.

#### Compiled Packages

A Compiled Package handles its own compilation with a build tool such as `tsc`.

```json
{
  "name": "@repo/ui",
  "exports": {
    "./button": {
      "types": "./src/button.tsx",
      "default": "./dist/button.js"
    },
    "./card": {
      "types": "./src/card.tsx",
      "default": "./dist/card.js"
    }
  },
  "scripts": {
    "build": "tsc"
  }
}
```

Compiled outputs go to a directory (`dist`, `build`, etc.) used as the package entrypoints. Turborepo caches the build outputs once they are listed in the task's `outputs` key.

Limitations and tradeoffs:

- Most Compiled Packages should use `tsc`. The application's bundler prepares the library for the final bundle (polyfilling, downleveling, etc.). Use a bundler only for specific needs such as bundling static assets into the package outputs.
- More configuration: many TypeScript compiler options to manage, plus bundler-oriented settings such as the `sideEffects` key in `package.json`.

#### Publishable Packages

Publishing to the npm registry has the strictest requirements, because consumers' usage is unknown and a robust package needs many configurations. The docs recommend `changesets` for versioning, changelogs, and the publishing process.

## Notes

- Source: https://turborepo.dev/docs/core-concepts/internal-packages (vercel/turborepo tag v2.11.8, `apps/docs/content/docs/core-concepts/internal-packages.mdx`).
- The upstream page imports from `@repo/ui`; this page uses `@repo/ui/button` to match the `exports` subpaths (`./button`, `./card`) shown in the examples below.
- Building a Compiled Package from scratch is covered by the "Creating an Internal Package" guide; publishing is covered by the "Publishing packages" guide.

## Related

- [Package Types](./package-types.md)
- [Package and Task Graph](./package-and-task-graph.md)
