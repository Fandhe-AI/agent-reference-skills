# Physical Layouts

A devicetree entity that aggregates all details about a keyboard layout: a kscan driver, matrix transform, and optional physical key positions (required for ZMK Studio).

## Signature / Usage

```devicetree
/ {
    physical_layout0: physical_layout_0 {
        compatible = "zmk,physical-layout";
        display-name = "Default Layout";
        kscan = <&kscan0>;
        transform = <&default_transform>;
    };

    chosen {
        zmk,physical-layout = &physical_layout0;
    };
};
```

### With Physical Key Positions (ZMK Studio)

```devicetree
#include <physical_layouts.dtsi>

/ {
    macropad_physical_layout: macropad_physical_layout {
        compatible = "zmk,physical-layout";
        display-name = "Macro Pad";
        transform = <&default_transform>;
        kscan = <&kscan0>;
        keys
            = <&key_physical_attrs 100 100   0   0 0 0 0>
            , <&key_physical_attrs 100 100 100   0 0 0 0>
            , <&key_physical_attrs 100 100   0 100 0 0 0>
            , <&key_physical_attrs 100 100 100 100 0 0 0>
            ;
    };
};
```

### Using a Predefined Layout

```devicetree
#include <layouts/cuddlykeyboards/ferris.dtsi>

&cuddlykeyboards_ferris_layout {
    transform = <&default_transform>;
    kscan = <&kscan0>;
};
```

## Options / Props

### `zmk,physical-layout` Node Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `compatible` | string | yes | `"zmk,physical-layout"` |
| `display-name` | string | no | Human-readable name shown in ZMK Studio |
| `kscan` | phandle | yes | Reference to the kscan driver node |
| `transform` | phandle | yes | Reference to the matrix transform node |
| `keys` | array | no | Physical attributes per key; required for ZMK Studio |

### `keys` Entry Format: `<&key_physical_attrs w h x y r rx ry>`

| Field | Unit | Description |
|-------|------|-------------|
| `w` (width) | centi-keyunit | Key cap width; must be > 0 |
| `h` (height) | centi-keyunit | Key cap height; must be > 0 |
| `x` | centi-keyunit | Key top-left X position |
| `y` | centi-keyunit | Key top-left Y position |
| `r` (rotation) | centi-degree | Clockwise rotation; negative values use `(-N)` syntax |
| `rx` | centi-keyunit | Rotation origin X |
| `ry` | centi-keyunit | Rotation origin Y |

### Position Map (`zmk,physical-layout-position-map`)

```devicetree
/ {
    position_map {
        compatible = "zmk,physical-layout-position-map";
        complete;

        layout1: layout1 {
            physical-layout = <&physical_layout1>;
            positions = <0 1 2 3 4>;
        };
        layout2: layout2 {
            physical-layout = <&physical_layout2>;
            positions = <0 1 2 3>;
        };
    };
};
```

The `complete` property indicates all binding transfers are defined. Without it, ZMK Studio auto-determines assignments for unmapped keys.

## Notes

- By convention, layouts and position maps live in `<keyboard>-layouts.dtsi`, imported by overlay or device files.
- Predefined layouts are in `app/dts/layouts/` in the ZMK repo.
- Multiple physical layouts (e.g. for removable columns) need separate matrix transforms per layout.
- Useful tools:
  - Physical layout converter: https://zmk-physical-layout-converter.streamlit.app/
  - KLE to QMK JSON: https://nickcoutsos.github.io/keymap-layout-tools/
  - Position map writer: https://zmk-layout-helper.netlify.app/

## Related

- [New Shield](./new-shield.md)
- [New Board](./new-board.md)
