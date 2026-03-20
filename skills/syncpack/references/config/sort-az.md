# sortAz

Source: https://syncpack.dev/config/sort-az/

When using the `format` command, sorts the specified package.json fields alphabetically. When the value is an Object, its keys are sorted; when it is an Array, its values are sorted.

## Property

| Name | Type | Default |
|------|------|---------|
| `sortAz` | `string[]` | See below |

## Default Value

```json
{
  "sortAz": [
    "bin",
    "contributors",
    "dependencies",
    "devDependencies",
    "keywords",
    "peerDependencies",
    "resolutions",
    "scripts"
  ]
}
```

## Notes

- Applies only to the `format` command
- No corresponding CLI option is available; must be set in the config file
- Add or remove field names to control which package.json fields are sorted
