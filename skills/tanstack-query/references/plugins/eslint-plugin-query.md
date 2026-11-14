---
source: https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
---

# @tanstack/eslint-plugin-query

Dedicated ESLint plugin for TanStack Query that helps follow best practices and prevent typical errors.

## Signature / Usage

```bash
npm i -D @tanstack/eslint-plugin-query
```

```js
// eslint.config.js (flat config)
import pluginQuery from '@tanstack/eslint-plugin-query'

export default [
  ...pluginQuery.configs['flat/recommended'],
  // or ...pluginQuery.configs['flat/strict']
]
```

```json
// .eslintrc (legacy config)
{
  "extends": ["plugin:@tanstack/query/recommended"]
}
```

Oxlint (JS plugins, alpha), `oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default defineConfig({
  jsPlugins: ['@tanstack/eslint-plugin-query'],
  rules: {
    ...pluginQuery.configs.recommended.rules,
  },
})
```

`.oxlintrc.json`:

```json
{
  "jsPlugins": ["@tanstack/eslint-plugin-query"],
  "rules": {
    "@tanstack/query/exhaustive-deps": "error"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `flat/recommended` | config | Standard rule enforcement |
| `flat/strict` | config | Recommended rules plus additional opinionated rules enforced more aggressively |

## Notes

- Eight rules are available: `exhaustive-deps`, `no-rest-destructuring`, `stable-query-client`, `no-unstable-deps`, `infinite-query-property-order`, `no-void-query-fn`, `mutation-property-order`, `prefer-query-options`
- Legacy `.eslintrc` config can extend a predefined config or manually enable individual rules under the `plugins` section
- Oxlint can also run the plugin through its JS plugins support (currently alpha); rule names are the same as in ESLint. Use `pluginQuery.configs.recommendedStrict.rules` for the strict setup. A JSON config cannot import the plugin configs, so enable rules individually there
- `no-void-query-fn` needs type information, which Oxlint does not provide to JS plugins yet, so it reports nothing under Oxlint
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/eslint/eslint-plugin-query.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [exhaustive-deps](./exhaustive-deps.md)
- [no-rest-destructuring](./no-rest-destructuring.md)
- [stable-query-client](./stable-query-client.md)
- [no-unstable-deps](./no-unstable-deps.md)
- [infinite-query-property-order](./infinite-query-property-order.md)
- [no-void-query-fn](./no-void-query-fn.md)
- [mutation-property-order](./mutation-property-order.md)
- [prefer-query-options](./prefer-query-options.md)
