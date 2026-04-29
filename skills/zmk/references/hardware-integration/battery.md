# Battery Sensing

Configuration for reporting battery charge levels on wireless keyboards. Supported boards include this automatically; custom boards require manual setup.

## Signature / Usage

```devicetree
/ {
    chosen {
        zmk,battery = &vbatt;
    };

    vbatt: vbatt {
        compatible = "zmk,battery-nrf-vddh";
    };
};
```

### Voltage Divider Driver

```devicetree
/ {
    chosen {
        zmk,battery = &vbatt;
    };

    vbatt: vbatt {
        compatible = "zmk,battery-voltage-divider";
        io-channels = <&adc 2>;
        output-ohms = <100000>;
        full-ohms = <(100000 + 100000)>;
    };
};
```

## Options / Props

### Built-in Drivers

| Driver | `compatible` | Description |
|--------|-------------|-------------|
| Voltage divider | `zmk,battery-voltage-divider` | Monitors voltage on an analog input pin |
| nRF VDDH | `zmk,battery-nrf-vddh` | Reads power supply voltage on Nordic nRF52 VDDH pin |

### Third-party Fuel Gauge ICs

Zephyr supports TI `bq274xx` and Maxim `MAX17xxx` series. Custom drivers must expose the `SENSOR_CHAN_GAUGE_STATE_OF_CHARGE` sensor channel.

## Notes

- If your board is already supported in ZMK, battery sensing is likely preconfigured.
- Custom drivers must be contributed to Zephyr or ZMK to be usable.
- Consult the dedicated battery level configuration page for per-driver property details.

## Related

- [New Board](./new-board.md)
