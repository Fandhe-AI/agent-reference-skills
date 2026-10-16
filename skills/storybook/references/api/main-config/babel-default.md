# babelDefault

Customizes Storybook's Babel setup for addon authors. Applied to the preview config before any user presets, so the end user's `babel` setup can override it.

## Signature / Usage

```typescript
type babelDefault = (
  config: Babel.Config,
  options: Options
) => Babel.Config | Promise<Babel.Config>
```

```typescript
import { TransformOptions } from '@babel/core';

export function babelDefault(config: TransformOptions) {
  return {
    plugins: [[import.meta.resolve('@babel/plugin-transform-react-jsx'), {}, 'preset']],
  };
}
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `config` | `Babel.Config` | The existing Babel configuration |
| `options` | `{ configType?: 'DEVELOPMENT' \| 'PRODUCTION' }` | Build options. Other options exist; introspect the type definition for more |

## Notes

- Recommended for addon authors (see addons "Writing presets" guide) so the end user's `babel` setup can override it
- To adjust Storybook's Babel setup directly rather than via an addon, use `babel` instead
- The options provided by Babel are only applicable if the `@storybook/addon-webpack5-compiler-babel` addon is enabled
- Source: https://storybook.js.org/docs/api/main-config/main-config-babel-default (Storybook v10.6.2).

## Related

- [babel.md](./babel.md)
- [swc.md](./swc.md)
- [webpack-final.md](./webpack-final.md)
