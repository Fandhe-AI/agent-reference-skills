# Flashing Issues

Troubleshooting issues when flashing ZMK firmware to devices.

## Common Issues

### File Transfer Error (Windows / Linux / macOS)

**Symptom:** Warning messages or error notifications appear during firmware upload.

**Cause:** The microcontroller resets itself before the OS receives confirmation that the file transfer is complete.

**Solution:** These errors are expected and can be ignored. Verify a successful flash by attempting Bluetooth pairing or connecting via USB.

---

### macOS Ventura — Error Code 100093

**Symptom:** Finder reports error code `100093` when copying `.uf2` files to the microcontroller.

**Cause:** Bug in macOS 13.0 Finder.

**Solution:** Use the Terminal or a third-party file manager instead of Finder. This issue is resolved in macOS 13.1 and later.

---

### macOS Sonoma — Error Code -36 / I/O Error

**Symptom:** Finder shows `"Error code -36"` or Terminal shows `"fcopyfile failed: Input/output error"`.

**Cause:** The bootloader disconnects automatically after a successful file transfer, which triggers OS error reporting.

**Solution:** These errors can be safely ignored; the upload completes successfully despite the messages.

## Related

- [Building Issues](./building-issues.md)
- [Connection Issues](./connection-issues.md)
- [Hardware Issues](./hardware-issues.md)
