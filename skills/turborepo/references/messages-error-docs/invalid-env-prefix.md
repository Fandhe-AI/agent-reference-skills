# Invalid environment variable prefix

Error raised when an environment variable in `turbo.json` is declared with a leading `$`, a syntax deprecated since Turborepo 1.5.

## Signature / Usage

```json
// Before (deprecated, causes error)
{
  "globalEnv": ["$MY_ENV_VAR"]
}

// After (correct)
{
  "globalEnv": ["MY_ENV_VAR"]
}
```

## Notes

- The `$`-prefixed syntax was the old way to declare an environment variable dependency; it no longer works.
- Applies to both `env` and `globalEnv` keys.
- Automatic migration: `npx @turbo/codemod migrate-env-var-dependencies`.

## Related

- [system-environment-variables](../configuration/system-environment-variables.md)
