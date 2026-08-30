---
source: https://orm.drizzle.team/docs/eslint-plugin
---

# eslint-plugin-drizzle

ESLint plugin with recommended rules that catch scenarios impossible or hard to type-check statically (e.g. missing `.where()` on `delete`/`update`).

## Signature / Usage

```yml
root: true
parser: '@typescript-eslint/parser'
parserOptions:
  project: './tsconfig.json'
plugins:
  - drizzle
rules:
  'drizzle/enforce-delete-with-where': "error"
  'drizzle/enforce-update-with-where': "error"
```

```bash
npm i eslint-plugin-drizzle @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `drizzle/enforce-delete-with-where` | rule | Enforce `.delete()` is always used with `.where()` |
| `drizzle/enforce-update-with-where` | rule | Enforce `.update()` is always used with `.where()` |
| `drizzleObjectName` (rule option) | `string \| string[]` | Restrict the rule to only trigger for delete/update methods called on the named Drizzle db object (e.g. `db`), avoiding false positives on unrelated classes |
| `plugin:drizzle/all` | config | Enables all rules (currently equivalent to `recommended`) |
| `plugin:drizzle/recommended` | config | Enables the recommended rule set |

## Notes

- Without `drizzleObjectName`, the rules trigger on any object exposing a `delete()`/`update()` method, including non-Drizzle classes.
- Transcribed from root `eslint-plugin.mdx`.

## Related

- [graphql](./graphql.md)
