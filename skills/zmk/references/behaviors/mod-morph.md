# Mod-Morph

Invokes one of two behaviors depending on whether specified modifier keys are held at the time of the key press. ZMK ships a pre-configured `&gresc` (Grave Escape) instance.

## Signature / Usage

```dts
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/mod-morph.h>

/ {
    behaviors {
        gresc: grave_escape {
            compatible = "zmk,behavior-mod-morph";
            #binding-cells = <0>;
            bindings = <&kp ESC>, <&kp GRAVE>;
            mods = <(MOD_LGUI|MOD_LSFT|MOD_RGUI|MOD_RSFT)>;
        };
    };
};

// Usage: &gresc
```

**Parameters:** None (zero-parameter behavior; behavior is fixed at definition time).

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `bindings` | phandle-array (2) | `[unmodified_behavior, morphed_behavior]` |
| `mods` | bitmask | Modifier(s) that trigger the morphed binding |
| `keep-mods` | bitmask | Modifiers to pass through with the morphed keycode (default: `0`, all suppressed) |

## Available Modifier Constants

`MOD_LSFT`, `MOD_RSFT`, `MOD_LCTL`, `MOD_RCTL`, `MOD_LALT`, `MOD_RALT`, `MOD_LGUI`, `MOD_RGUI`

Combine with `|`: `(MOD_LSFT|MOD_RSFT)`

## Notes

- Mod-morphs can be nested for complex multi-modifier logic.
- macOS users may need to disable "Modify Events" in Karabiner-Elements to avoid conflicts.

## Related

- [Key Press](./key-press.md)
- [Hold-Tap](./hold-tap.md)
- [Macros](./macros.md)
