---
source: https://vite.dev/guide/api-javascript#resolveconfig
---

# resolveConfig

Resolves an `InlineConfig` into a `ResolvedConfig`.

## Signature / Usage

```ts
async function resolveConfig(
  inlineConfig: InlineConfig,
  command: 'build' | 'serve',
  defaultMode = 'development',
  defaultNodeEnv = 'development',
  isPreview = false,
): Promise<ResolvedConfig>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| inlineConfig | `InlineConfig` | — | Config to resolve. |
| command | `'build' \| 'serve'` | — | `serve` in dev and preview, `build` in build. |
| defaultMode | string | `'development'` | Default mode. |
| defaultNodeEnv | string | `'development'` | Default `NODE_ENV`. |
| isPreview | boolean | `false` | Whether resolving for preview. |

## Related

- [InlineConfig / ResolvedConfig](./inline-resolved-config.md)
- [loadConfigFromFile](./load-config-from-file.md)
