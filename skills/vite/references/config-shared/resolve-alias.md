---
source: https://vite.dev/config/shared-options#resolve-alias
---

# resolve.alias

Aliases used to replace values in `import` or `require` statements.

## Signature / Usage

Object format:

```js
resolve: {
  alias: {
    utils: '../../../utils',
    'batman-1.0.0': './joker-1.5.0'
  }
}
```

Array format:

```js
resolve: {
  alias: [
    { find: 'utils', replacement: '../../../utils' },
    { find: 'batman-1.0.0', replacement: './joker-1.5.0' },
  ]
}
```

With a regular expression `find` (replacement patterns such as `$1` are usable):

```js
{ find:/^(.*)\.js$/, replacement: '$1.alias' }
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `resolve.alias` | `Record<string, string> \| Array<{ find: string \| RegExp, replacement: string }>` | Alias definitions. Works similar to `@rollup/plugin-alias`. |

## Notes

- The order of entries matters: first defined rules are applied first.
- When aliasing to file system paths, always use absolute paths. Relative alias values are used as-is and not resolved into file system paths.
- More advanced custom resolution can be achieved through plugins.
- Using with SSR: if aliases are configured for SSR externalized dependencies, you may want to alias the actual `node_modules` packages. Yarn and pnpm support aliasing via the `npm:` prefix.

## Related

- [resolve.* options](./resolve-options.md)
- [SSR externals](../ssr/ssr-externals.md)
