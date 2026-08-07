# Building Issues

Troubleshooting compilation errors when building ZMK firmware: CMake errors, West/keymap syntax errors, and devicetree diagnostics.

## Signature / Usage

```
-- Using keymap file: /path/to/keymap/file/<keyboard>.keymap
-- Found BOARD.dts: /path/to/board.dts
-- Found devicetree overlay: /path/to/overlay.overlay
-- Found devicetree overlay: /path/to/keymap.keymap
```

## Options / Props

| Issue | Cause | Solution |
| --- | --- | --- |
| CMake Error (`generic_toolchain.cmake:64 (include)`) | Zephyr environment variables not properly defined | Configure Zephyr environment variables per Zephyr's CMake Package documentation |
| `Keymap node not found` | Keymap file missing/not discovered, or missing/misspelled `compatible = "zmk,keymap"` | Verify `<keyboard>.keymap` exists in the expected location; check build logs for the `-- Using keymap file:` line; ensure the keymap node declares `compatible = "zmk,keymap"` |
| Devicetree parse error (`expected ';' or ','`) | Syntax error in `.keymap` file | Check the exact line/column reported (post-preprocessor, may not match editor display) for missing semicolons or commas |
| `lacks #binding-cells` | Incorrect binding syntax, e.g. `&kp BT_SEL 0` instead of `&bt BT_SEL 0` | Verify the binding uses the correct behavior node and parameter count |
| `devicetree_generated.h undeclared` | Keycode used without `&kp` prefix, e.g. `&kp A SPACE &kp B` instead of `&kp A &kp SPACE &kp B` | Ensure every keycode binding has a leading `&kp` (or other behavior) prefix |

## Notes

- To verify applied Kconfig changes: check the `<keyboard> Kconfig file` step in GitHub Actions logs, or inspect `<build_folder>/zephyr/.config` for local builds.
- To verify devicetree processing: check the `<keyboard> Devicetree file` step in GitHub Actions logs, or inspect `<build_folder>/zephyr/zephyr.dts` for local builds (keycodes appear as hex, e.g. `0x7002a` for `SPACE`).

## Related

- [Keymaps](../keymaps/overview.md)
- [Config](../config/overview.md)
- [Flashing Issues](./flashing-issues.md)
