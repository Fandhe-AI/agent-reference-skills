# Devicetree Overview

ZMK uses devicetree as a declarative way to describe hardware, keymaps, behaviors, and board configuration. It is the primary mechanism for both defining and customizing ZMK firmware.

## Signature / Usage

Basic node syntax:

```dts
[label:] name {
    compatible = "zmk,behavior-mod-morph";
    #binding-cells = <0>;
    bindings = <&kp SPACE>, <&kp UNDERSCORE>;
    mods = <(MOD_LSFT|MOD_RSFT)>;
};
```

Overriding an existing node by phandle:

```dts
&existing_node {
    property = <2>;
};
```

Deleting nodes or properties:

```dts
/delete-node/ &node_label;
/delete-property/ property-name;
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `compatible` | string | Maps a node to its driver/binding; identifies valid properties |
| `status` | string | `"okay"` (enabled) or `"disabled"` |
| `#binding-cells` | int | Number of parameters a phandle binding accepts |

**Property value types:**

| Type | Syntax Example | Description |
|------|---------------|-------------|
| bool | (property present) | True when present, false when absent |
| int | `<42>` | Single integer in angle brackets |
| string | `"value"` | Text in double quotes |
| array | `<1 2 3>` | Space-separated integers in angle brackets |
| phandle | `<&label>` | Reference to another node |
| phandle-array | `<&label param>` | Reference with associated parameters |

## Notes

- File types: `.dtsi` (shared includes), `.dts` (board base), `.overlay` (board modifications), `.keymap` (ZMK-specific final overlay)
- Preprocessing happens in two passes: the C preprocessor and devicetree's own merge system. Later files overwrite earlier properties.
- Binding files in `app/dts/bindings/` are authoritative for valid properties per `compatible` value.
- Phandle-based node overrides must not place the override block inside the root node `/`.
- Use `/omit-if-no-ref/ &node_label;` to drop unreferenced nodes from the build output.

## Related

- [new-behavior](./new-behavior.md)
- [ZMK Bindings Directory](https://github.com/zmkfirmware/zmk/tree/main/app/dts/bindings)
- [Zephyr Devicetree Guide](https://docs.zephyrproject.org/latest/build/dts/index.html)
