# versions

| Name | Description | Path |
|------|-------------|------|
| TypeScript 5.0 | ECMAScript decorators, `const` type parameters, multiple configs in `extends`, all enums as union enums, `--moduleResolution bundler`, `--verbatimModuleSyntax`, `export type *`, JSDoc `@satisfies` / `@overload`, and a first batch of deprecations. | [typescript-5-0.md](./typescript-5-0.md) |
| TypeScript 5.1 | Easier implicit returns for `undefined`-returning functions, unrelated getter/setter types, `JSX.ElementType`, namespaced JSX attributes, and `typeRoots` behavior changes. | [typescript-5-1.md](./typescript-5-1.md) |
| TypeScript 5.2 | `using` declarations and explicit resource management, decorator metadata, mixed named/anonymous tuple elements, and method calls on unions of arrays. | [typescript-5-2.md](./typescript-5-2.md) |
| TypeScript 5.3 | Import attributes, stable `resolution-mode` in import types, `switch (true)` narrowing, boolean-comparison narrowing, `Symbol.hasInstance` narrowing, and `super` property access checks. | [typescript-5-3.md](./typescript-5-3.md) |
| TypeScript 5.4 | Preserved narrowing in closures after last assignments, `NoInfer<T>`, `Object.groupBy` / `Map.groupBy`, `--module preserve`, and checked import attributes. | [typescript-5-4.md](./typescript-5-4.md) |
| TypeScript 5.5 | Inferred type predicates, constant indexed access narrowing, JSDoc `@import`, regular expression syntax checking, `Set` methods, `--isolatedDeclarations`, and the `${configDir}` template variable. | [typescript-5-5.md](./typescript-5-5.md) |
| TypeScript 5.6 | Disallowed nullish and truthy checks, iterator helper types, `--strictBuiltinIteratorReturn`, arbitrary module identifiers, `--noUncheckedSideEffectImports`, `--noCheck`, and `--build` with intermediate errors. | [typescript-5-6.md](./typescript-5-6.md) |
| TypeScript 5.7 | Never-initialized variable checks, `--rewriteRelativeImportExtensions`, `--target es2024`, ancestor `tsconfig.json` search, validated JSON imports under `nodenext`, and generic `TypedArray`s. | [typescript-5-7.md](./typescript-5-7.md) |
| TypeScript 5.8 | Granular checks for branches in return expressions, `require()` of ESM under `nodenext`, `--module node18`, `--erasableSyntaxOnly`, `--libReplacement`, and preserved computed property names in declaration files. | [typescript-5-8.md](./typescript-5-8.md) |
| TypeScript 5.9 | Minimal `tsc --init`, `import defer`, `--module node20`, expandable hovers (preview), and `lib.d.ts` / inference behavior changes. | [typescript-5-9.md](./typescript-5-9.md) |
| TypeScript 6.0 Breaking Changes and Deprecations | Deprecations and new defaults that are removed in 7.0, e.g. `baseUrl`, `target: es5`, `moduleResolution node10`. Silenced in 6.0 via `ignoreDeprecations`. | [typescript-6-0-deprecations.md](./typescript-6-0-deprecations.md) |
| TypeScript 6.0 | Transition release before 7.0: `#/` subpath imports, `--stableTypeOrdering`, `es2025` / Temporal / `getOrInsert` types, and new inference, module-resolution and lib features. | [typescript-6-0.md](./typescript-6-0.md) |
| TypeScript 7.0 (native Go port) | Native Go port of tsc with shared-memory multithreading (`--checkers` / `--builders` / `--singleThreaded`). Ships no programmatic API in 7.0. | [typescript-7-0.md](./typescript-7-0.md) |
