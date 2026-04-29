# Encoders

Support for EC11 rotary encoders with push buttons. Push button and rotation behaviors are configured independently.

## Signature / Usage

```kconfig
# .conf
CONFIG_EC11=y
CONFIG_EC11_TRIGGER_GLOBAL_THREAD=y
```

```dts
/* keymap — rotation bindings */
sensor-bindings = <&inc_dec_kp C_VOL_UP C_VOL_DN &inc_dec_kp PG_UP PG_DN>;
```

## Options / Props

| Name | Description |
|------|-------------|
| `CONFIG_EC11` | Enables EC11 encoder driver |
| `CONFIG_EC11_TRIGGER_GLOBAL_THREAD` | Uses global thread for encoder event triggering |
| `sensor-bindings` | Keymap property; list of `<BINDING [CW_KEY] [CCW_KEY]>` per encoder |

## Notes

- The encoder push button connects to the keyboard matrix and is mapped like any standard key.
- `sensor-bindings` accepts one entry per encoder; `&inc_dec_kp` is the built-in behavior for sending keycodes on rotation.
- After editing `.conf`, push and flash the updated firmware to activate the changes.

## Related

- [behaviors/sensor-rotate](../behaviors/sensor-rotate.md)
- [development/hardware-integration/encoders](../development/hardware-integration/encoders.md)
