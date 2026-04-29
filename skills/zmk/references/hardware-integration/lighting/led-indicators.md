# LED Indicators

Maps HID specification LED states (Caps Lock, Num Lock, etc.) to GPIO or PWM LEDs.

## Signature / Usage

### LED Definition (GPIO)

```devicetree
/ {
    leds {
        compatible = "gpio-leds";
        num_lock_led: num_lock_led {
            gpios = <&gpio0 1 GPIO_ACTIVE_HIGH>;
        };
        caps_lock_led: caps_lock_led {
            gpios = <&gpio0 2 GPIO_ACTIVE_HIGH>;
        };
    };
};
```

### Indicator Configuration

```devicetree
#include <dt-bindings/zmk/hid_indicators.h>

/ {
    indicators {
        compatible = "zmk,indicator-leds";
        num_lock_indicator: num_lock {
            indicator = <HID_INDICATOR_NUM_LOCK>;
            leds = <&num_lock_led>;
        };
        caps_lock_indicator: caps_lock {
            indicator = <HID_INDICATOR_CAPS_LOCK>;
            leds = <&caps_lock_led>;
        };
    };
};
```

## Options / Props

### Indicator Values

| Constant | HID State |
|----------|-----------|
| `HID_INDICATOR_NUM_LOCK` | Num Lock |
| `HID_INDICATOR_CAPS_LOCK` | Caps Lock |
| `HID_INDICATOR_SCROLL_LOCK` | Scroll Lock |
| `HID_INDICATOR_COMPOSE` | Compose |
| `HID_INDICATOR_KANA` | Kana |

### Standard Label Conventions

| Indicator | Node Label |
|-----------|------------|
| Num Lock | `num_lock_indicator` |
| Caps Lock | `caps_lock_indicator` |
| Scroll Lock | `scroll_lock_indicator` |
| Compose | `compose_indicator` |
| Kana | `kana_indicator` |

## Notes

- Use `pwm-leds` instead of `gpio-leds` for adjustable brightness — this slightly increases power usage when LEDs are on.
- Multiple LEDs per indicator: `leds = <&led_1 &led_2>;`
- LED strip drivers (e.g. WS2812) are **not** currently supported for indicators — they use a different API that would conflict with the underglow system.

## Related

- [Lighting Overview](./overview.md)
- [Backlight](./backlight.md)
- [Underglow](./underglow.md)
