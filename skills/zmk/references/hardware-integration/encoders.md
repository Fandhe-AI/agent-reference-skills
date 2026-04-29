# Encoders (EC11)

Integration of EC11 rotary encoders into ZMK keyboards via devicetree configuration, Kconfig, and keymap sensor bindings.

## Signature / Usage

### Kconfig (`<shield>.conf`)

```kconfig
CONFIG_EC11=y
CONFIG_EC11_TRIGGER_GLOBAL_THREAD=y
```

### Devicetree — Encoder Node

```devicetree
left_encoder: encoder_left {
    compatible = "alps,ec11";
    a-gpios = <&pro_micro 21 (GPIO_ACTIVE_HIGH | GPIO_PULL_UP)>;
    b-gpios = <&pro_micro 20 (GPIO_ACTIVE_HIGH | GPIO_PULL_UP)>;
    steps = <80>;
    status = "disabled";
};
```

### Devicetree — Sensor List

```devicetree
sensors: sensors {
    compatible = "zmk,keymap-sensors";
    sensors = <&left_encoder &right_encoder>;
    triggers-per-rotation = <20>;
};
```

### Enable Encoder in `.dts` / `.overlay`

```devicetree
&left_encoder {
    status = "okay";
};
```

### Keymap Binding

```devicetree
sensor-bindings = <&inc_dec_kp C_VOL_UP C_VOL_DN>;
```

## Options / Props

### Encoder Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `compatible` | string | `"alps,ec11"` |
| `a-gpios` | phandle-array | GPIO pin for channel A |
| `b-gpios` | phandle-array | GPIO pin for channel B |
| `steps` | int | Pulses per full rotation (from datasheet) |
| `status` | string | `"disabled"` by default; set to `"okay"` to enable |

### `zmk,keymap-sensors` Properties

| Property | Type | Description |
|----------|------|-------------|
| `sensors` | phandle-list | Ordered list of encoder nodes |
| `triggers-per-rotation` | int | Behavior trigger count per full rotation |

## Notes

- These Kconfig lines are commented out by default in shields where encoders are optional.
- For split keyboards, add Kconfig settings to both the individual half config and the combined config.
- `steps` can be overridden by users who install different encoder hardware.
- Order of sensors in the `sensors` list determines the order of `sensor-bindings` entries in the keymap.
- Enable encoders in `.dts`/`.overlay` files, not in shared `.dtsi` files.

## Related

- [New Shield](./new-shield.md)
- [Physical Layouts](./physical-layouts.md)
