# Connection Issues

Troubleshooting wireless connection issues of ZMK devices.

## Common Issues

### Split Keyboard Parts Unable to Pair

**Symptom:** Split keyboard halves fail to pair automatically.

**Causes:**
- Changed which part is the central
- Replaced the controller for one of the parts

**Solution:** Flash settings reset firmware to both controllers to clear pairing data:
- GitHub Actions: Add `settings_reset` shield to `build.yaml`
- Local build: Pass `-DSHIELD=settings_reset` to the build command

Reset both halves simultaneously (ground reset pins or use power switches), then re-pair with host devices.

**Note:** This erases all settings including Bluetooth profiles and RGB colors.

---

### Unable to Connect to Device

**Wrong Bluetooth profile selected:**
- Verify the correct profile is active; see [Bluetooth features](/docs/features/bluetooth)
- Use `&bt` behavior to switch profiles

**Hardware problems:**
- See [Hardware Issues — Wireless Connectivity](./hardware-issues.md)

**Windows / Intel Mac compatibility:**
- Disable PHY 2Mbps: `CONFIG_BT_CTLR_PHY_2M=n`

**Windows work/managed devices:**
- Enable passkey entry: `CONFIG_ZMK_BLE_PASSKEY_ENTRY=y`

**Dual-boot systems:**
- Cannot simultaneously pair to different OSes; refer to ArchWiki for documented workarounds

**Faulty oscillator (nRF52840):**
- Use internal RC oscillator: `CONFIG_CLOCK_CONTROL_NRF_K32SRC_RC=y` (increases power draw)

---

### Unreliable or Weak Connection

**Solution:** Increase Bluetooth transmit power:
```kconfig
CONFIG_BT_CTLR_TX_PWR_PLUS_8=y
```
Also improves split keyboard half connectivity.

---

### Bluetooth Output Ignored When USB Is Connected

**Solution:** Use the [output selection behavior](/docs/keymaps/behaviors/outputs) to prefer Bluetooth over USB.

---

### macOS — Connected but Not Working

1. Remove the keyboard from Bluetooth settings
2. Invoke `&bt BT_CLR` with the macOS profile active
3. Reconnect

---

### Windows — Connected but Not Working

1. Remove the keyboard and invoke `&bt BT_CLR`
2. Toggle Bluetooth off then on in Windows settings
3. Re-pair (may require passkey entry configuration)

## Related

- [Hardware Issues](./hardware-issues.md)
- [Flashing Issues](./flashing-issues.md)
