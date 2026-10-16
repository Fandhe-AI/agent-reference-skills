# Public API

A public API is a contract between a group of modules, like a slice, and the code that uses it. It also acts as a gate, only allowing access to certain objects, and only through that public API.

## Signature / Usage

Usually implemented as an index file with re-exports:

```js
// pages/auth/index.js
export { LoginPage } from "./ui/LoginPage";
export { RegisterPage } from "./ui/RegisterPage";
```

Cross-import public API (`@x` notation): entity A declares a separate public API just for entity B.

```text
entities/
  A/
    @x/
      B.ts      ← special public API just for code inside entities/B/
    index.ts    ← regular public API
```

```ts
import type { EntityA } from "entities/A/@x/B";
```

Separate index file per component in `shared/ui`:

```js
import { Button } from '@/shared/ui/button';
import { TextField } from '@/shared/ui/text-field';
```

## Notes

- A good public API: (1) protects the rest of the app from structural changes such as refactoring, (2) changes when slice behavior changes in ways that break previous expectations, (3) exposes only the necessary parts.
- Avoid wildcard re-exports (`export * from "./ui/Comment"`): they hurt discoverability of the slice interface and may accidentally expose module internals, making refactoring difficult.
- `@x`: the notation `A/@x/B` is read as "A crossed with B". Keep cross-imports to a minimum and only use this notation on the Entities layer, where eliminating cross-imports is often unreasonable.
- Environment-specific public APIs: a slice's public API should generally be `index.ts` and freely customizing it is not recommended. When modules in one slice run in different environments and a single `index.ts` breaks the environment boundary or makes the bundler include code that should not be bundled together, add files that match the runtime environment (see "Server and client public APIs" in the Next.js usage guide).
- Circular imports: occur easily with index files, e.g. `HomePage` importing `loadUserStatistics` from `"../"` (the slice index). Prevent with two principles: in the same slice always use relative imports with the full path; across slices always use absolute imports (e.g., with an alias).
- Large bundles / broken tree-shaking in Shared: `shared/ui` and `shared/lib` are collections of unrelated things, so a single index re-exporting everything can bloat bundles. Use a separate index file for each component or library.
- No real protection against side-stepping the public API (IDE auto-imports may import directly). Use Steiger, the architectural linter with an FSD ruleset, to catch this automatically.
- Worse bundler performance on large projects (see TkDodo, "Please Stop Using Barrel Files"): (1) separate index files per component/library in `shared/ui` and `shared/lib`; (2) avoid index files in segments on layers that have slices (if `features/comments/index.js` exists, no `features/comments/ui/index.js`); (3) split a very big project into several big chunks, e.g., a monorepo where each package is a separate FSD root with its own set of layers.
- Source: https://fsd.how/docs/reference/public-api (documentation repository commit 3a5a3a3).

## Related

- [Layers](./layers.md)
- [Slices & Segments](./slices-segments.md)
- [Import Rules](./import-rules.md)
