---
source: https://react.dev/reference/react-compiler/directives/use-memo
---

# use memo

`"use memo"` marks a function for React Compiler optimization.

## Signature / Usage

```js
function MyComponent() {
  "use memo";
  // ...
}
```

When a function contains `"use memo"`, the React Compiler will analyze and optimize it during build time, automatically memoizing values and components to prevent unnecessary re-computations and re-renders.

Annotation mode example:

```js
// ✅ Optimized with "use memo"
function ProductCard({ product }) {
  "use memo";
  // ...
}

// ❌ Not optimized (no directive)
function ProductList({ products }) {
  // ...
}
```

## Notes

- In most cases, you don't need `"use memo"`. It's primarily needed in `annotation` mode. In `infer` mode the compiler detects components and hooks by naming patterns (PascalCase for components, `use` prefix for hooks); if one isn't being compiled, fix its naming convention rather than forcing compilation.
- It must be at the very beginning of a function body, before any imports or other code (comments are OK).
- The directive must be written with double or single quotes, not backticks, and must exactly match `"use memo"`.
- Only the first directive in a function is processed; additional directives are ignored.
- Effect depends on `compilationMode`: in `annotation` mode only functions with `"use memo"` are optimized; in `infer` mode heuristics apply but `"use memo"` forces optimization; in `all` mode it is redundant.
- Verify optimization by checking the compiled output or the Memo ✨ badge in React DevTools.

## Related

- [use no memo](./use-no-memo.md)
- [compilationMode](./compilationMode.md)
- [Directives](./directives.md)
