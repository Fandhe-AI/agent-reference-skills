---
source: https://vite.dev/guide/ssr#conditional-logic
---

# Conditional Logic (import.meta.env.SSR)

Branch on SSR vs. client with `import.meta.env.SSR`.

## Signature / Usage

```js
if (import.meta.env.SSR) {
  // ... server only logic
}
```

## Notes

- This is statically replaced during build, so unused branches can be tree-shaken.

## Related

- [SSR Overview](./ssr-overview.md)
- [SSR-specific Plugin Logic](./ssr-plugin-logic.md)
