# Config Overview

The heart of Ergogen is a single config file (YAML, JSON, or JavaScript). It is divided into six top-level sections that each handle a distinct phase of keyboard generation. Only `points` is required; all other sections are optional.

## Signature / Usage

```yaml
meta:
  # board metadata, author info, version requirements

units:
  # custom variables usable throughout the config

points:
  # key positions and layout coordinates (required)

outlines:
  # plate, case, and PCB outline generation

cases:
  # 3D-printable case objects via extrusion

pcbs:
  # KiCAD PCB template configuration
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `meta` | object | Board metadata: author, version requirements, and other board-level info |
| `units` | object | Custom unit variables that can be referenced anywhere in the config |
| `points` | object | **Required.** Defines key positions, spacing, and layout coordinates |
| `outlines` | object | Generates plate, case, and PCB outlines derived from `points` |
| `cases` | object | Extrudes outlines into 3D-printable case objects |
| `pcbs` | object | Configures KiCAD PCB templates for circuit board generation |

## Notes

- YAML, JSON, and JavaScript config formats are all supported; the generator auto-detects the input type.
- `points` is the only required section — minimal configs can omit all others.
- `units` values defined here are available for use in every other section.
- For complex or repetitive configs, JavaScript-format configs allow branching, loops, and parametric functions.

## Related

- [Preprocessing](./preprocessing.md)
