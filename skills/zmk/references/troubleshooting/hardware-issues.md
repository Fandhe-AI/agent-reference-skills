# Hardware Issues

Troubleshooting common hardware issues with ZMK keyboards.

## Common Issues

### Electrical Net Connections — Keys Not Working

**Symptoms:**
- One or more keyswitches not functioning
- Entire rows or columns of keys failing

**Causes:**
- Broken GPIO pins
- Defective solder joints
- Solder bridges or lifted pads

**Diagnosis methods:**

1. **Tester shield** — Specialized shields for Pro Micro and Seeed Studio XIAO boards test GPIO pins via flashed firmware. Shorting a GPIO pin to ground triggers an informative keyboard message.
2. **Multimeter** — Check voltage levels, diode orientation, keyswitch circuit closure, and solder joint quality. (SparkFun tutorial is referenced in official docs.)
3. **Visual inspection** — Look for solder bridges, exposed copper, broken PCB traces, and lifted pads.

**Solutions:**
- Rework affected solder joints
- "Bodge" wire from a spare GPIO pin to the broken connection
- Update the `kscan` configuration in the `.keymap` file to redirect to alternate pins

---

### Hardware-Related Wireless Connectivity Issues

**Symptoms:**
- Reduced Bluetooth range
- Unstable wireless connections

**Causes:**
- Physical obstructions (metal is particularly problematic)
- 2.4 GHz interference from other wireless devices
- Faulty oscillator hardware
- Insufficient power to antenna
- Missing external antenna
- USB 3 device interference
- PCB design issues (low-frequency pins used for high-frequency signals, antenna tuning problems)

**Solution:** Systematic troubleshooting steps:
1. Enable BLE and clear Bluetooth profiles
2. Minimize physical barriers between keyboard and host
3. Reduce number of competing 2.4 GHz devices nearby
4. Position antenna as close to the host device as possible

## Related

- [Connection Issues](./connection-issues.md)
