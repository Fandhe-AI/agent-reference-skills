---
source: https://vite.dev/config/shared-options#css-modules
---

# css.modules

Configure CSS modules behavior. Options are passed to postcss-modules.

## Signature / Usage

```ts
interface CSSModulesOptions {
  getJSON?: (
    cssFileName: string,
    json: Record<string, string>,
    outputFileName: string,
  ) => void
  scopeBehaviour?: 'global' | 'local'
  globalModulePaths?: RegExp[]
  exportGlobals?: boolean
  generateScopedName?:
    | string
    | ((name: string, filename: string, css: string) => string)
  hashPrefix?: string
  /**
   * default: undefined
   */
  localsConvention?:
    | 'camelCase'
    | 'camelCaseOnly'
    | 'dashes'
    | 'dashesOnly'
    | ((
        originalClassName: string,
        generatedClassName: string,
        inputFile: string,
      ) => string)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `getJSON` | `(cssFileName, json, outputFileName) => void` | Callback receiving the class name mapping. |
| `scopeBehaviour` | `'global' \| 'local'` | Scope behaviour. |
| `globalModulePaths` | `RegExp[]` | Global module paths. |
| `exportGlobals` | `boolean` | Export globals. |
| `generateScopedName` | `string \| ((name, filename, css) => string)` | Scoped name generation. |
| `hashPrefix` | `string` | Hash prefix. |
| `localsConvention` | `'camelCase' \| 'camelCaseOnly' \| 'dashes' \| 'dashesOnly' \| function` | Locals naming convention (default `undefined`). |

## Notes

- Has no effect when Lightning CSS is used (`css.transformer: 'lightningcss'`); use `css.lightningcss.cssModules` instead.

## Related

- [css.transformer / css.lightningcss](./css-transformer-lightningcss.md)
- [CSS Modules](../features/css-modules.md)
