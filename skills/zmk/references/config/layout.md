# Layout

Configuration for mapping the physical keyboard matrix to logical key positions, supporting matrix transforms, physical layouts, and multi-layout position mapping for ZMK Studio.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_PHYSICAL_LAYOUT_KEY_ROTATION` | bool | y | Enable storage and support for key rotation information |

## Devicetree

### Matrix Transform

**Compatible:** `zmk,matrix-transform`

Maps logical keymap positions to physical keyboard scan (kscan) coordinates.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `rows` | int | required | Number of transformed matrix rows |
| `columns` | int | required | Number of transformed matrix columns |
| `row-offset` | int | 0 | Row offset for matrix lookups |
| `col-offset` | int | 0 | Column offset for matrix lookups |
| `map` | array | required | Position transforms using `RC(row, col)` macro |

The `map` array uses the `RC(row, column)` macro from `dt-bindings/zmk/matrix_transform.h`, with one entry per logical keymap position.

```dts
#include <dt-bindings/zmk/matrix_transform.h>

/ {
    default_transform: keymap_transform_0 {
        compatible = "zmk,matrix-transform";
        columns = <3>;
        rows = <2>;
        map = <
            RC(0,0) RC(0,1) RC(0,2)
            RC(1,0) RC(1,1) RC(1,2)
        >;
    };
};
```

### Physical Layout

**Compatible:** `zmk,physical-layout`

Combines matrix transform, keyboard scan, and physical key attributes.

| Property | Type | Description |
|----------|------|-------------|
| `display-name` | string | Layout display name in ZMK Studio |
| `transform` | phandle | Associated matrix transform |
| `kscan` | phandle | Associated keyboard scan (falls back to `/chosen` `zmk,kscan`) |
| `keys` | phandle-array | Physical key attributes |

#### Key Physical Attributes

Each key entry: `<&key_physical_attrs width height x y rotation rotation_x rotation_y>`

| Field | Unit | Description |
|-------|------|-------------|
| width | centi-keyunit | Key cap width |
| height | centi-keyunit | Key cap height |
| x | centi-keyunit | Top-left X position |
| y | centi-keyunit | Top-left Y position |
| rotation | centi-degree | Rotation angle (positive = clockwise) |
| rotation_x | centi-keyunit | Rotation origin X |
| rotation_y | centi-keyunit | Rotation origin Y |

### Physical Layout Position Map

**Compatible:** `zmk,physical-layout-position-map`

Preserves key mappings across different physical layouts when switching in ZMK Studio.

| Property | Type | Description |
|----------|------|-------------|
| `complete` | bool | Indicates mapping covers all keys; prevents position-based fallback |
| `physical-layout` | phandle | References the corresponding physical layout |
| `positions` | array | Key position array matching sibling position-map nodes |

## Notes

- `key_physical_attrs` must be imported from `dts/physical_layouts.dtsi`.
- Multiple matrix transforms can be defined; select the active one via the `/chosen` node.
- Matrix `row-offset` / `col-offset` allow adjustment without modifying individual `RC()` entries.
- Position maps enable seamless layout switching in ZMK Studio without remapping keys.

## Related

- [Kscan](./kscan.md)
- [Keymap](./keymap.md)
- [Studio](./studio.md)
