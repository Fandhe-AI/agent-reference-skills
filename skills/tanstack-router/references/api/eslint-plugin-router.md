---
source: https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
---

# eslint-plugin-router

TanStack Router's own ESLint plugin, enforcing best practices and helping avoid common mistakes.

## Signature / Usage

```js
// eslint.config.js (flat config)
import pluginRouter from '@tanstack/eslint-plugin-router'

export default [
  ...pluginRouter.configs['flat/recommended'],
]
```

```json
// legacy .eslintrc
{
  "extends": ["plugin:@tanstack/eslint-plugin-router/recommended"]
}
```

## Notes

- Installed as a separate dev dependency: `@tanstack/eslint-plugin-router`.
- Provides one rule: `@tanstack/router/create-route-property-order`.

## Related

- [create-route-property-order](./create-route-property-order.md)
