# sortFirst

Source: https://syncpack.dev/config/sort-first/

When using the `format` command, determines which fields within package.json files should appear at the top, and in what order. Fields not listed here are sorted alphabetically after (controlled by `sortPackages`).

## Property

| Name | Type | Default |
|------|------|---------|
| `sortFirst` | `string[]` | `["name", "description", "version", "author"]` |

## Default Value

```json
{
  "sortFirst": ["name", "description", "version", "author"]
}
```

## Notes

- Applies only to the `format` command
- No corresponding CLI option is available; must be set in the config file
- Works together with `sortPackages`: `sortFirst` pins priority fields to the top, and `sortPackages` sorts the remaining fields alphabetically

## Related

- [./sort-packages.md](./sort-packages.md)
