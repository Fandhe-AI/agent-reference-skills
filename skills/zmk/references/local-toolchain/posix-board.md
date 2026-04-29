# Native POSIX Board Target

Use the `native_sim` board target to build and run ZMK firmware directly on your workstation with simulated key events, without requiring physical hardware.

## Signature / Usage

### Build

```bash
west build --pristine --board native_sim/native/64 -- \
  -DZMK_CONFIG=tests/none/normal/
```

### Run

```bash
./build/zephyr/zmk.exe
```

## Notes

- Virtual key presses are defined in `boards/extensions/native_sim/native_sim_64.overlay`; edit this file to customize test sequences (e.g., Mod-Tap scenarios)
- On Debian-based systems, install 32-bit compiler support before building:
  ```bash
  apt install -y gcc-multilib
  ```
- Useful for rapid iteration on firmware features without a flash/hardware cycle

## Related

- [Tests](./tests.md)
- [Build and Flash](./build-flash.md)
