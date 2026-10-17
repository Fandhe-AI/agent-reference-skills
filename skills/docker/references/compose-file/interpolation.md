---
source: https://docs.docker.com/reference/compose-file/interpolation/
---

# Interpolation

Values in a Compose file can be set by variables and interpolated at runtime, using Bash-like syntax. Both `$VARIABLE` and `${VARIABLE}` are supported.

## Signature / Usage

```yml
web:
  build: .
  command: "$$VAR_NOT_INTERPOLATED_BY_COMPOSE"
```

Braced expression formats:

| Form | Result |
| --- | --- |
| `${VAR}` | Value of `VAR`. |
| `${VAR:-default}` | Value of `VAR` if set and non-empty, otherwise `default`. |
| `${VAR-default}` | Value of `VAR` if set, otherwise `default`. |
| `${VAR:?error}` | Value of `VAR` if set and non-empty, otherwise exit with error. |
| `${VAR?error}` | Value of `VAR` if set, otherwise exit with error. |
| `${VAR:+replacement}` | `replacement` if `VAR` is set and non-empty, otherwise empty. |
| `${VAR+replacement}` | `replacement` if `VAR` is set, otherwise empty. |

Interpolation can be nested: `${VARIABLE:-${FOO}}`, `${VARIABLE?$FOO}`, `${VARIABLE:-${FOO:-default}}`.

Interpolation applies only to YAML values, not keys. Where keys are arbitrary user-defined strings (such as `labels` or `environment`), use the equal-sign syntax:

```yml
services:
  foo:
    labels:
      "$VAR_NOT_INTERPOLATED_BY_COMPOSE": "BAR"
```

```yml
services:
  foo:
    labels:
      - "$VAR_INTERPOLATED_BY_COMPOSE=BAR"
```

## Notes

- Other extended shell-style features, such as `${VARIABLE/foo/bar}`, are not supported.
- Compose processes any string following a `$` as long as it is a valid variable definition: an alphanumeric name (`[_a-zA-Z][_a-zA-Z0-9]*`) or a braced string starting with `${`. Otherwise it is preserved without interpolation.
- Use `$$` for a literal dollar sign; it also prevents Compose from interpolating, which lets you refer to environment variables you don't want processed by Compose.
- If Compose can't resolve a variable and no default is defined, it displays a warning and substitutes an empty string.
- Interpolation is applied before a merge, on a per-file basis.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Merge Compose files](./merge.md)
- [services: env_file / environment / logging](./services-environment-logging.md)
- [Fragments](./fragments.md)
