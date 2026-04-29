# USB Logging

USB logging redirects ZMK's `printk`, console output, and Zephyr log messages to a USB CDC ACM serial device, enabling debugging on keyboards that have no UART interface.

## Signature / Usage

**GitHub Actions `build.yaml` (add snippet to a shield build):**

```yaml
---
include:
  - board: nice_nano
    shield: corne_left
    snippet: zmk-usb-logging
```

**Local build with `west`:**

```bash
west build -b nice_nano -S zmk-usb-logging -- -DSHIELD="corne_left"
```

**Connect on Linux:**

```bash
sudo tio /dev/ttyACM0
```

**Connect on macOS:**

```bash
sudo tio /dev/tty.usbmodem14401
```

## Notes

- USB logging increases power consumption and can noticeably reduce battery life; disable it when not debugging.
- Standard boards such as the nice!nano and Seeed Studio XIAO are pre-configured; no extra board-level changes are needed.
- Custom boards must expose the USB device node with: `zephyr_udc0: &usbd { status = "okay"; }`
- Legacy configurations may use `CONFIG_ZMK_USB_LOGGING=y` in a Kconfig file instead of the snippet.
- Bluetooth logging is not supported by Zephyr; USB logging is the only practical on-device log output method.

## Related

- [new-behavior](./new-behavior.md)
- [Zephyr Logging Documentation](https://docs.zephyrproject.org/4.1.0/services/logging/index.html)
- [Zephyr CDC-ACM Console](https://docs.zephyrproject.org/4.1.0/snippets/cdc-acm-console/README.html)
