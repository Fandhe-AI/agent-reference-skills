# Building Issues

Troubleshooting issues when compiling ZMK firmware.

## Common Issues

### CMake Error

**Symptom:** Error referencing `generic_toolchain.cmake:64 (include)` — include file cannot be found.

**Cause:** Zephyr environment variables are not properly configured.

**Solution:** Review [Zephyr's CMake Package documentation](https://docs.zephyrproject.org/4.1.0/build/zephyr_cmake_package.html) to ensure environment variables are correctly set.

---

### West Build — Keymap Node Not Found

**Symptom:** `"Keymap node not found, check a keymap is available..."`

**Causes:**
- Keymap file is missing or not discovered by the build system
- `compatible = "zmk,keymap"` is misspelled or absent in the keymap node

**Solutions:**
- Verify the `<keyboard>.keymap` file exists in the expected location
- Confirm the build log shows `"Using keymap file: /path/to/keymap/file"`
- Check that `compatible = "zmk,keymap"` is correctly declared

---

### Devicetree Parse Error

**Symptom:** Error referencing a line number with `"parse error: expected ';' or ','"`

**Solution:** Check the exact line position for missing punctuation. Column numbers may not match due to preprocessor expansion.

---

### Devicetree — `lacks #binding-cells`

**Symptom:** Error mentioning `lacks #binding-cells` with reference to `empty_file.c`

**Cause:** Improper binding parameters (e.g., `&kp BT_SEL 0` instead of `&bt BT_SEL 0`)

**Solution:** Verify correct binding syntax for the behavior being used.

---

### Devicetree — Undeclared Variable in `devicetree_generated.h`

**Symptom:** `"undeclared here"` error with a node reference like `IDX_12_PH`

**Cause:** Incorrect number of parameters for behavior nodes (`&kp`, `&mt`, etc.) or missing `&kp` prefix on keycodes.

**Solution:** Ensure keycodes use proper binding syntax (e.g., `&kp SPACE` not `SPACE`).

---

### Diagnosing Unexpected Build Results

**Configuration issues:**
- GitHub Actions: Check the `"<keyboard> Kconfig file"` step in the build job
- Local builds: Inspect `<build_folder>/zephyr/.config`

**Devicetree issues:**
- GitHub Actions: Check the `"<keyboard> Devicetree file"` step
- Local builds: Inspect `<build_folder>/zephyr/zephyr.dts`

## Related

- [Flashing Issues](./flashing-issues.md)
- [Connection Issues](./connection-issues.md)
- [Hardware Issues](./hardware-issues.md)
