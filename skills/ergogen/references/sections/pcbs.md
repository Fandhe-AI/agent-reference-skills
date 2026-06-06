# PCBs

The `pcbs` section places footprints at key positions and assigns nets to produce un-routed KiCad PCB files (`.kicad_pcb`).

## Signature / Usage

```yaml
pcbs:
  main:
    outlines:
      edge:
        outline: board
        layer: Edge.Cuts
    footprints:
      keys:
        what: mx
        where: true
        params:
          net: "{{colrow}}"
    references: true
    template: kicad5
```

---

## Outlines

Defines PCB edge cuts and layer markings.

| Name | Type | Description |
|------|------|-------------|
| `outline` | string | Reference to an existing outline. |
| `layer` | string | KiCad layer to draw on (default: `Edge.Cuts`). |

---

## Footprints

Places components at filtered point locations.

| Name | Type | Description |
|------|------|-------------|
| `what` | string | Footprint definition name to instantiate. |
| `where` | filter / anchor | Point(s) at which to place the footprint. |
| `asym` | string | Mirror treatment: `source`, `clone`, or `both` (default). |
| `adjust` | anchor | Additional positional offset relative to placement point. |
| `params` | object | Component-specific parameters (see below). |

### Footprint Parameters

Parameters support `{{key}}` template syntax to access point attributes (e.g., `{{colrow}}`, `{{name}}`).

| Type | Description |
|------|-------------|
| boolean / number / string / array / object | Passed through as-is to the footprint definition. |
| net string | Unique string identifying an electrical net; indexed internally. |
| anchor | Point coordinates with metadata. |

### Provided `parsed_params` Fields (inside footprint `body` function)

| Name | Type | Description |
|------|------|-------------|
| `ref` | string | Component designator + index (e.g., `D4`). |
| `ref_hide` | boolean | Whether the silkscreen reference is hidden. |
| `x` / `y` / `r` | number | Position and rotation. |
| `rot` | number | Deprecated synonym for `r`. |
| `xy` | string | `"${x} ${y}"` |
| `at` | string | Full KiCad `(at ${x} ${y} ${r})` clause. |
| `local_net(name)` | function | Creates an instance-specific net prefixed by the footprint reference. |

### Coordinate Helper Functions

| Function | Context | Behavior |
|----------|---------|----------|
| `isxy(x, y)` | Internal Symmetric | Inverts x for mirrored points. |
| `iaxy(x, y)` | Internal Asymmetric | Ignores mirroring. |
| `esxy(x, y)` | External Symmetric | Applies rotation context symmetrically. |
| `eaxy(x, y)` | External Asymmetric | Applies rotation context asymmetrically. |

Each returns an object with `x`, `y`, and `str` fields.

---

## Top-Level PCB Options

| Name | Type | Description |
|------|------|-------------|
| `outlines` | object | Edge cut and layer outline definitions. |
| `footprints` | object / array | Footprint placement configurations. |
| `references` | boolean | Whether to include reference designators in output. |
| `template` | string | KiCad output template name (default: `kicad5`). |
| `params` | object | Extra parameters passed to the template. |

---

## Nets

Each unique net string is assigned a numeric index for KiCad.

| Field | Description |
|-------|-------------|
| `name` | Unique string identifier. |
| `index` | Numeric KiCad index. |
| `str` | Full representation: `"(net ${index} \"${name}\")"`. |

## Notes

- Generated `.kicad_pcb` files are un-routed; all pads and nets are defined but traces are not drawn.
- The template `body` function receives a `parts` object containing: `name`, `version`, `author`, `nets`, `footprints`, `outlines`, and `custom` (user-supplied parameters from `pcbs.<pcb_name>.params`).
- `version` and `author` in the output come from the `meta` section.

## Related

- [Metadata](./metadata.md)
- [Outlines](./outlines.md)
- [Points](./points.md)
