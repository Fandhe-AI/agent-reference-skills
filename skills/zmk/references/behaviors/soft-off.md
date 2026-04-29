# Soft Off

Forces the keyboard into a deep low-power off state. The device can be reactivated with a dedicated on/off button (if present) or the reset button.

## Signature / Usage

```dts
&soft_off
```

Optional hold-to-activate configuration:

```dts
&soft_off {
    hold-time-ms = <5000>;
};
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `hold-time-ms` | integer | Key must be held this many ms before soft off activates; default: activates on release (no hold required) |
| `split-peripheral-off-on-press` | flag | Peripheral side of a split enters soft off immediately on press, ignoring `hold-time-ms`; improves reliability |

## Notes

- Requires soft-off to be enabled in the device configuration.
- On split keyboards, peripheral halves always activate immediately when the behavior triggers for reliability; the `/delete-property/` directive can remove `split-peripheral-off-on-press` if you accept the reliability trade-off.

## Related

- [Power](./power.md)
- [Reset](./reset.md)
