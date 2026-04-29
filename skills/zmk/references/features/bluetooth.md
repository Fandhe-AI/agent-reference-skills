# Bluetooth

Enables wireless keyboard connectivity via Bluetooth Low Energy (BLE), supporting both host connections and split keyboard communication. Requires Bluetooth 4.2 or newer on the host.

## Notes

- ZMK supports up to 5 bonded device profiles by default; profiles must be selected manually when pairing new devices.
- Multiple hosts may show as "connected" simultaneously, but only the active profile receives keystrokes.
- Security uses Elliptic Curve Diffie Hellman (ECDH) for key generation. Numeric Comparison association model (for stronger pairing) is experimental.
- After enabling features that modify the HID descriptor (e.g., mouse keys, NKRO), remove and re-pair the device on the host to refresh the cached descriptor.
- Mismatched bond keys between profiles can cause unexpected behavior.

## Related

- [behaviors/bluetooth](../behaviors/bluetooth.md)
- [split-keyboards](./split-keyboards.md)
- [troubleshooting/connection-issues](../troubleshooting/connection-issues.md)
