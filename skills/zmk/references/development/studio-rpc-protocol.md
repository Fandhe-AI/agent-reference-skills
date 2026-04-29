# Studio RPC Protocol

The ZMK Studio UI communicates with ZMK devices over a custom RPC protocol built on Protocol Buffers with a simple byte-framing scheme, transmitted over USB serial or BLE.

## Signature / Usage

**Message framing control bytes:**

| Byte | Value | Role |
|------|-------|------|
| SoF (Start of Frame) | `0xAB` | Marks the beginning of a message |
| Esc (Escape) | `0xAC` | Escapes a control byte appearing in payload data |
| EoF (End of Frame) | `0xAD` | Marks the end of a message |

When a payload byte matches a control byte value, it is escaped by prefixing it with `0xAC`.

**Message flow:**

```
Client → Device : Request  (protobuf-encoded, framed)
Device → Client : Response → RequestResponse  (reply to a request)
Device → Client : Response → Notification     (unsolicited state update)
```

## Options / Props

**BLE Transport (GATT):**

| Attribute | Value |
|-----------|-------|
| Service UUID | `00000000-0196-6107-c967-c5cfb1c2482a` |
| Characteristic UUID | `00000001-0196-6107-c967-c5cfb1c2482a` |
| Device-to-client direction | GATT Indications |

**USB Transport:**

- USB class: CDC/ACM (serial port over USB)
- Framed messages are sent over the CDC/ACM UART interface.

## Notes

- Protocol Buffer message definitions live in the [zmk-studio-messages](https://github.com/zmkfirmware/zmk-studio-messages) repository.
- Review the ZMK clean room policy before contributing to protocol-related code.

## Related

- [usb-logging](./usb-logging.md)
- [zmk-studio-messages](https://github.com/zmkfirmware/zmk-studio-messages)
