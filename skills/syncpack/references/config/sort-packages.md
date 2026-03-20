# sortPackages

Source: https://syncpack.dev/config/sort-packages/

When using the `format` command, enables sorting of root-level properties of `package.json` in alphabetical order.

## Property

| Name | Type | Default |
|------|------|---------|
| `sortPackages` | `boolean` | `true` |

## Configuration

```json
{
  "sortPackages": true
}
```

## Notes

- Applies only to the `format` command
- No corresponding CLI option is available; must be set in the config file
- Works together with `sortFirst`: fields listed in `sortFirst` are pinned to the top, then remaining fields are sorted alphabetically by `sortPackages`

## Related

- [./sort-first.md](./sort-first.md)
