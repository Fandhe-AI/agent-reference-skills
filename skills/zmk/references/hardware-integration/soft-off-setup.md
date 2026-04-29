# Soft Off Setup

Implements hardware-triggered soft power-off for keyboards, with three approaches: dedicated GPIO pin, matrix-integrated pin, or firmware-only wakeup key.

## Signature / Usage

### Behavior Instance

```devicetree
/ {
    behaviors {
        hw_soft_off: hw_soft_off {
            compatible = "zmk,behavior-soft-off";
            #binding-cells = <0>;
            split-peripheral-off-on-press;
            hold-time-ms = <2000>;
        };
    };
};
```

### Approach 1: Direct GPIO Pin

```devicetree
/ {
    keys {
        compatible = "gpio-keys";
        soft_off_gpio_key: soft_off_gpio_key {
            gpios = <&gpio0 2 (GPIO_ACTIVE_LOW | GPIO_PULL_UP)>;
        };
    };

    wakeup_scan: wakeup_scan {
        compatible = "zmk,kscan-gpio-direct";
        input-keys = <&soft_off_gpio_key>;
        wakeup-source;
    };

    side_band_behavior_triggers: side_band_behavior_triggers {
        compatible = "zmk,kscan-sideband-behaviors";
        kscan = <&wakeup_scan>;
        auto-enable;
        wakeup-source;
        soft_off {
            column = <0>;
            row = <0>;
            bindings = <&hw_soft_off>;
        };
    };

    chosen {
        zmk,kscan = &side_band_behavior_triggers;
    };
};
```

### Approach 2: Matrix-Integrated Pin

```devicetree
/ {
    keys {
        compatible = "gpio-keys";
        soft_off_gpio_key: soft_off_gpio_key {
            gpios = <&gpio0 2 (GPIO_ACTIVE_HIGH | GPIO_PULL_DOWN)>;
        };
    };
};
```

Add the soft-off input pin to the existing kscan matrix without modifying the matrix transform.

### Wakeup Trigger Device

```devicetree
/ {
    wakeup_scan: wakeup_scan {
        compatible = "zmk,gpio-key-wakeup-trigger";
        trigger = <&soft_off_gpio_key>;
        wakeup-source;
        extra-gpios = <&gpio0 12 GPIO_ACTIVE_HIGH>;
    };

    soft_off_wakers {
        compatible = "zmk,soft-off-wakeup-sources";
        wakeup-sources = <&wakeup_scan>;
    };
};
```

## Options / Props

### `zmk,behavior-soft-off` Properties

| Property | Type | Description |
|----------|------|-------------|
| `#binding-cells` | int | Must be `<0>` |
| `split-peripheral-off-on-press` | bool | Also powers off split peripherals |
| `hold-time-ms` | int | Duration to hold before triggering soft off |

## Notes

- `extra-gpios` references MCU output pins (e.g. column pins for col2row matrices) that must be driven to detect the key press during wakeup.
- Adding a kscan to the `wakeup-sources` array will wake the keyboard on any key press in that kscan.
- Approach 3 (wakeup-only key switch) requires no hardware changes — pure firmware configuration.
- For matrix-integrated setups, two switches should ideally be driven by the same matrix output pin so both activate simultaneously.

## Related

- [New Shield](./new-shield.md)
- [Encoders](./encoders.md)
