# Outlines

The `outlines` section builds 2D shapes by combining geometric primitives placed at key points. Each outline is assembled from an ordered list of parts; parts are combined via boolean operations.

## Signature / Usage

```yaml
outlines:
  _keycaps:
    - what: rectangle
      where: true
      bound: false
      size: [cx, cy]
  board:
    - what: rectangle
      where: true
      bound: true
      size: [cx, cy]
      expand: 2
      fillet: 1
    - what: circle
      where:
        ref: matrix_inner_top
      radius: 5
      operation: subtract
```

---

## Filtering

The `where` attribute accepts filters that select which points receive a shape.

| Filter Type | Behavior |
|-------------|----------|
| undefined | Returns default origin `[0, 0, 0°]` |
| `true` | All points |
| `false` | No points |
| string | Exact name or tag match; prefix with `/` and suffix with `/` for regex |
| `-name` | Negation — excludes matching points |
| object / anchor | Treated as an anchor; returns a single point |
| array (no objects) | Logical combination (see below) |

### Tags

Points can be labelled with the `tags` key-level attribute for use in `where` filters:

```yaml
# array form
key:
  tags: [alpha, home]

# object form
key:
  tags:
    alpha: true
    home: true
```

### Logical Filter Combinations

Array nesting controls logical operators:

| Nesting | Logic |
|---------|-------|
| `[a, b]` (odd) | a OR b |
| `[[a, b]]` (even) | a AND b |

Example: `[alpha, [home, -/pinky/]]` = `alpha OR (home AND NOT pinky)`.

---

## Binding

Binding controls how shapes grow to meet neighboring keys, forming a contiguous outline.

### Explicit Binding (`bind`)

Set on key-level attributes using CSS-like syntax:

| Form | Description |
|------|-------------|
| single number | Applies to all four directions |
| `[num_x, num_y]` | Horizontal / vertical |
| `[num_t, num_r, num_b, num_l]` | Top / right / bottom / left |

### Automatic Binding (`autobind`)

`autobind` (default: `10`) calculates binding reach by examining column bounding boxes. Set `bound: true` on a part to activate it.

---

## Shape Primitives

### rectangle

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `size` | number / [x, y] | yes | Width and height. Single number = square. Introduces units `sx` (width) and `sy` (height). |
| `corner` | number | no | Corner radius (default: 0). |
| `bevel` | number | no | Bevel size (default: 0). Bevels and corners are subtracted from size, not added. |

### circle

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `radius` | number | yes | Circle radius. Introduces unit `r`. |

### polygon

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `points` | array of anchors | yes | Vertices. If `ref` is unspecified, previous point is assumed. First point defaults to `[0, 0, 0°]`. |

### outline (reference)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Name of an existing outline to embed. |
| `origin` | anchor | no | Placement origin within the referenced outline (applied before positioning). |

---

## Common Part Attributes

| Name | Type | Description |
|------|------|-------------|
| `what` | string | Shape type: `rectangle`, `circle`, `polygon`, or `outline`. |
| `where` | filter / anchor | Point(s) at which to place the shape. |
| `operation` | string | Boolean mode (see Operations below). Default: `add`. |
| `bound` | boolean | Activate key-binding (uses `bind`/`autobind` values from points). |
| `asym` | string | Mirror treatment: `source`, `clone`, or `both`. |
| `adjust` | anchor | Additional positional offset relative to each placement point. |
| `scale` | number | Size multiplier (default: 1). |
| `expand` | number | Expand (positive) or shrink (negative) outline in mm. |
| `joints` | number / string | Joint style for expansion: `0`/`round`, `1`/`pointy`, `2`/`beveled`. |
| `fillet` | number | Corner rounding radius (default: 0). |

---

## Operations

Parts are applied sequentially to build a cumulative shape:

| Operation | Description |
|-----------|-------------|
| `add` | Union — merge shape into cumulative result (default). |
| `subtract` | Difference — remove shape from cumulative result. |
| `intersect` | Intersection — keep only overlap with cumulative result. |
| `stack` | Overlay shape without merging geometry. |

---

## Syntactic Sugar

### String Shorthands

Parts can be declared as strings using operation prefixes:

| Shorthand | Equivalent operation |
|-----------|---------------------|
| `+name` or `name` | `add` |
| `-name` | `subtract` |
| `~name` | `intersect` |
| `^name` | `stack` |

### Expand Shorthand

The joint type can be appended to the `expand` value:

| Suffix | Joint style |
|--------|-------------|
| `)` | round |
| `>` | pointy |
| `]` | beveled |

Example: `expand: 3]` equals `expand: 3` with `joints: beveled`.

---

## Exports

- All named outlines are exported by default.
- Prefix a name with `_` (e.g., `_keycaps`) to mark it as private — it can be referenced by other outlines but is not included in final output.

## Notes

- `bind`/`autobind` values set on points control how far a rectangle extends to meet neighboring keys when `bound: true`.
- Parts accept both array and object formats.

## Related

- [Points](./points.md)
- [Cases](./cases.md)
- [PCBs](./pcbs.md)
