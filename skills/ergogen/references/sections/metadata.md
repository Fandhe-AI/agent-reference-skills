# Metadata

The `meta` top-level key stores keyboard documentation. Most fields are arbitrary strings, but Ergogen interprets three specific fields: `engine`, `version`, and `author`.

## Signature / Usage

```yaml
meta:
  engine: 4.0.6
  version: "1.0"
  author: your-name
  notes: any additional fields are ignored by Ergogen
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `engine` | semver string | Minimum Ergogen version required (e.g. `3.1.4` means `>=3.1.4 <4.0.0`). Ergogen validates and errors on mismatch. |
| `version` | string | Embedded as version metadata in generated KiCad PCB files. |
| `author` | string | Embedded as author metadata in generated KiCad PCB files. |
| *(any)* | any | Additional arbitrary fields are stored but not processed by Ergogen. |

## Notes

- `engine` uses semver range semantics: `3.1.4` means "at least 3.1.4, up to (but excluding) 4.0.0".
- `version` and `author` differ from `engine` — they are plain strings passed through to KiCad output, not version constraints.
- Any other fields (e-mail, GitHub links, etc.) are accepted without error but have no effect on generation.

## Related

- [PCBs](./pcbs.md)
