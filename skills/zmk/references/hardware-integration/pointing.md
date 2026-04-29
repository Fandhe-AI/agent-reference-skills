# Pointing Devices

Integration of pointing hardware (trackpads, trackballs) into ZMK keyboards using Zephyr's input API, supporting both unibody and split configurations.

## Signature / Usage

### Device Node (SPI Example — Cirque Pinnacle)

```devicetree
&pro_micro_spi {
    status = "okay";
    cs-gpios = <&pro_micro 19 GPIO_ACTIVE_LOW>;

    glidepoint: glidepoint@0 {
        compatible = "cirque,pinnacle";
        reg = <0>;
        spi-max-frequency = <1000000>;
        status = "okay";
        dr-gpios = <&pro_micro 5 (GPIO_ACTIVE_HIGH)>;
        sensitivity = "4x";
        sleep;
        no-taps;
    };
};
```

### Input Listener (Unibody / Central)

```devicetree
/ {
    glidepoint_listener: glidepoint_listener {
        compatible = "zmk,input-listener";
        device = <&glidepoint>;
    };
};
```

### Input Listener with Processors

```devicetree
#include <dt-bindings/zmk/input_transform.h>

/ {
    glidepoint_listener {
        compatible = "zmk,input-listener";
        device = <&glidepoint>;
        input-processors = <&zip_xy_transform
            (INPUT_TRANSFORM_XY_SWAP | INPUT_TRANSFORM_X_INVERT | INPUT_TRANSFORM_Y_INVERT)>;
    };
};
```

### Split Peripheral — Shared `.dtsi`

```devicetree
/ {
    glidepoint_listener: glidepoint_listener {
        compatible = "zmk,input-listener";
        status = "disabled";
    };
};
```

Enable in the central overlay and wire the split input device in the peripheral overlay.

## Options / Props

### Kconfig (`Kconfig.defconfig`)

```kconfig
if SHIELD_MY_KEYBOARD
config ZMK_POINTING
    default y
endif
```

For optional pointing support, users must also enable the relevant SPI/I2C protocol config.

### Input Split Node Requirements

| Property | Description |
|----------|-------------|
| `#address-cells = <1>` | Required on parent node |
| `#size-cells = <0>` | Required on parent node |
| `reg` | Unique integer per split pointer |

## Notes

- Device node placement: unibody → main overlay; split central → central overlay; split peripheral → peripheral overlay.
- The listener always goes on the keyboard side that has the device attached.
- Input processors handle axis swapping, inversion, and other transformations.
- Consult specific driver devicetree bindings for required properties.
- Pin control configuration may be needed for SPI/I2C bus setup; see [pinctrl](./pinctrl.md).

## Related

- [Pinctrl](./pinctrl.md)
- [New Shield](./new-shield.md)
