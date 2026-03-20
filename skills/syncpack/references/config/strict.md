# strict

Source: https://syncpack.dev/config/strict/

Controls whether syncpack exits with a non-zero error code when version mismatches are detected.

## Property

| Name | Type | Default |
|------|------|---------|
| `strict` | `boolean` | `false` |

## Configuration

```json
{
  "strict": false
}
```

## Behavior

| Value | Behavior |
|-------|----------|
| `false` (default) | Reports version inconsistencies but exits with code `0` |
| `true` | Exits with a non-zero error code when mismatches are found |

## Notes

- Enable `strict: true` in CI/CD pipelines to enforce version consistency as a mandatory gate
- Prevents builds or deployments when dependency versions do not align across packages
