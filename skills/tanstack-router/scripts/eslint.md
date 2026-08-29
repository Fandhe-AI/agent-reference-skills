---
source: https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
---

# ESLint

Configure `@tanstack/eslint-plugin-router` to enforce route-definition best practices. Install first (see `install.md`).

## Flat Config を設定する（ESLint 9.0+）

```js
import pluginRouter from '@tanstack/eslint-plugin-router'

export default [
  ...pluginRouter.configs['flat/recommended'],
  // Any other config...
]
```

## Legacy Config を設定する（`.eslintrc`）

```json
{
  "extends": ["plugin:@tanstack/eslint-plugin-router/recommended"]
}
```

## Notes

- Currently one rule is provided: `@tanstack/router/create-route-property-order`
- When using `@typescript-eslint`'s type-checked rulesets, configure the `only-throw-error` rule to allow TanStack Router's `Redirect` and `NotFoundError` exceptions, to avoid conflicts between the plugins
