---
source: https://vite.dev/guide/api-plugin#plugin-ordering
---

# Plugin Ordering (enforce) / Conditional Application (apply)

`enforce` adjusts plugin application order; `apply` restricts a plugin to serve or build.

## Signature / Usage

```js
function myPlugin() {
  return {
    name: 'build-only',
    apply: 'build', // or 'serve'
  }
}
```

A function for more precise control:

```js
apply(config, { command }) {
  // apply only on build but not for SSR
  return command === 'build' && !config.build.ssr
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| enforce | `'pre' \| 'post'` | Adjusts application order (similar to webpack loaders). |
| apply | `'serve' \| 'build' \| function` | By default plugins are invoked for both serve and build. |

Resolved plugin order:

1. Alias
2. User plugins with `enforce: 'pre'`
3. Vite core plugins
4. User plugins without enforce value
5. Vite build plugins
6. User plugins with `enforce: 'post'`
7. Vite post build plugins (minify, manifest, reporting)

## Notes

- `enforce` is separate from hooks ordering; hooks remain subject to their own `order` attribute as usual for Rolldown hooks.

## Related

- [Plugins Config](./plugins-config.md)
- [Rolldown Plugin Compatibility](./rolldown-compatibility.md)
