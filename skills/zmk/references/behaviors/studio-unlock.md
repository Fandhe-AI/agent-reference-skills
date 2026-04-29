# ZMK Studio Unlock

Unlocks the device for live editing via ZMK Studio. The device remains unlocked until an inactivity timeout or disconnection occurs.

## Signature / Usage

```dts
&studio_unlock
```

No parameters.

## Notes

- Unlock duration is controlled by the inactivity timeout configured in studio settings.
- Disconnecting from ZMK Studio automatically re-locks the device.
- This is a development/experimental feature; see the ZMK Studio documentation for setup requirements.

## Related

- [Soft Off](./soft-off.md)
- [Reset](./reset.md)
