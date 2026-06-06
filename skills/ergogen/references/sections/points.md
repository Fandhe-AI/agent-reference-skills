# Points

The `points` section defines the 2D key positions `[x, y, r°]` that form the keyboard layout. It is built from zones (column/row grids) with optional post-layout adjustments (rotation, mirroring).

## Signature / Usage

```yaml
points:
  key:                        # global key defaults
    padding: u
  zones:
    matrix:
      anchor:
        shift: [0, 0]
      columns:
        outer:
          rows:
            bottom:
            top:
          key:
            stagger: 5
      rows:
        bottom:
        top:
      key:
        spread: u
  rotate: -10
  mirror:
    ref: matrix_outer_top
    distance: 250
```

---

## Anchors

An anchor computes a 2D point `[x, y, r°]` relative to an existing point via translation and rotation.

### Anchor Forms

| Form | Description |
|------|-------------|
| string | Reference an existing named point with no modification. |
| array | Multi-anchor: each item's result becomes the starting point for the next. |
| object | Full declaration (see attributes below). |

### Anchor Attributes

| Name | Type | Description |
|------|------|-------------|
| `ref` | string / anchor | Starting point; parsed recursively. |
| `aggregate` | object | Combines multiple points. Contains `parts` (array of anchors) and `method` (`"average"` only). |
| `orient` | number / anchor | Pre-rotation before `shift`. A number adds degrees; an anchor makes the point "turn towards" the reference. |
| `shift` | [x, y] / number | Translation on the XY plane respecting current rotation. Single number becomes `[n, n]`. |
| `rotate` | number / anchor | Post-rotation after `shift`. Same behavior as `orient`. |
| `affect` | string / array | Restricts which fields are modified: any subset of `"x"`, `"y"`, `"r"`. |
| `resist` | boolean | Prevents special mirroring treatment for this point. |

### Anchor Example

```yaml
anchor:
  aggregate.parts:
    - left_key
    - right_key
  shift: [1, 0]
  rotate: 180
```

---

## Zones

Zones organize keys into column-staggered grids. Columns are processed left-to-right; rows bottom-to-top.

### Zone Structure

```yaml
points:
  zones:
    zone_name:
      anchor: <anchor>       # optional; default [0, 0, 0°]
      columns:
        col_name:
          rows:
            row_name: <key_attrs>
          key: <key_attrs>   # column-level defaults
      rows:
        row_name: <key_attrs>
      key: <key_attrs>       # zone-level defaults
  key: <key_attrs>           # global defaults
```

### Inheritance Order (lowest → highest priority)

1. Built-in hardcoded defaults
2. Global `points.key`
3. Zone `points.zones.<zone>.key`
4. Column `points.zones.<zone>.columns.<col>.key`
5. Row `points.zones.<zone>.rows.<row>`
6. Key-specific `points.zones.<zone>.columns.<col>.rows.<row>`

Use the `$unset` directive to remove an inherited value.

### Key-Level Attributes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `stagger` | number | 0 | Cumulative vertical offset per column. |
| `spread` | unit | `u` | Horizontal distance between columns. |
| `splay` | number | 0 | Column rotation (around `origin`). |
| `origin` | [x, y] | [0, 0] | Pivot point for splay. |
| `padding` | unit | `u` | Vertical distance between rows. |
| `orient` | number | 0 | Cumulative pre-rotation within a column. |
| `shift` | [x, y] | [0, 0] | Cumulative positional shift. |
| `rotate` | number | 0 | Cumulative post-rotation. |
| `adjust` | anchor | {} | Independent additional adjustment. |
| `bind` | number / array | -1 | Directional reach for outline binding. |
| `autobind` | number | 10 | Automatic binding reach. |
| `skip` | boolean | false | Exclude this key from output. |
| `asym` | string | `"both"` | Side assignment: `"source"`, `"clone"`, or `"both"`. |
| `mirror` | object | {} | Attribute overrides applied only to mirrored copy. |
| `colrow` | string | auto | Auto-generated as `{{col.name}}_{{row}}`. |
| `name` | string | auto | Auto-generated as `{{zone.name}}_{{colrow}}`. |
| `width` / `height` | unit | 18 | Keycap size for visualization only. |

---

## Adjustments

Post-layout rotation and mirroring applied at zone or global scope.

### Options

| Name | Type | Scope | Description |
|------|------|-------|-------------|
| `rotate` | number | zone or global | Rotates all relevant points around `[0, 0]`. Simulates inter-half angle for one-piece boards. |
| `mirror` | number / anchor | zone or global | Creates mirrored copies along an axis. Number = x-coordinate of axis; anchor form supports an extra `distance` field. |

### Mirroring and `asym`

| `asym` value | Effect |
|---|---|
| `"both"` (default) | Key appears on both original and mirrored side. |
| `"source"` | Key exists only on the original side. |
| `"clone"` | Key exists only on the mirrored side. |

Aliases for `asym`: `origin`/`image`, `base`/`derived`, `primary`/`secondary`, `left`/`right`.

### Adjustment Example

```yaml
points:
  zones:
    matrix:
      rotate: 10
      mirror:
        ref: matrix_inner_top
        distance: 200
  rotate: -5
  mirror: 100
```

## Templating

String values in the config can reference point attributes using `{{field_name}}` syntax. This is evaluated per-point when a declaration is placed at multiple locations.

Common template expressions:

| Expression | Resolves to |
|------------|-------------|
| `{{col.name}}` | Column name of the point |
| `{{row}}` | Row name of the point |
| `{{zone.name}}` | Zone name of the point |
| `{{colrow}}` | Auto-generated `{{col.name}}_{{row}}` |
| `{{name}}` | Global point name `{{zone.name}}_{{colrow}}` |

## Related

- [Units](./units.md)
- [Outlines](./outlines.md)
