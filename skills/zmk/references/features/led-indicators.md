# LED Indicators

Displays the five standard HID indicator states (Num Lock, Caps Lock, Scroll Lock, Compose, Kana) via LEDs when the hardware supports them.

## Signature / Usage

```dts
&caps_lock_indicator {
    active-brightness = <0>;
    inactive-brightness = <100>;
    disconnected-brightness = <50>;
};
```

## Options / Props

| Property | Description |
|----------|-------------|
| `active-brightness` | Brightness when indicator state is active |
| `inactive-brightness` | Brightness when indicator state is inactive |
| `disconnected-brightness` | Brightness when not connected to a host |
| `on-while-idle` | Prevents the LED from turning off during idle on battery power |

Available node labels: `num_lock_indicator`, `caps_lock_indicator`, `scroll_lock_indicator`, `compose_indicator`, `kana_indicator`.

## Notes

- Default behavior: off when idle on battery, off when disconnected, on at full brightness when active.
- Brightness values greater than 0 default to maximum on LEDs that lack PWM support.
- PWM brightness control is available but slightly increases power consumption.

## Related

- [development/hardware-integration/lighting/led-indicators](../development/hardware-integration/lighting/led-indicators.md)
