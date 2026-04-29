# Build and Flash

Compile ZMK firmware and flash it to a keyboard. All `west build` commands must be run from the `app/` subdirectory of the ZMK repository.

## Signature / Usage

### Basic build (onboard MCU keyboard)

```bash
west build -b planck_rev6
```

### Shield + board (add-on MCU)

```bash
west build -b proton_c -- -DSHIELD=kyria_left
```

### Pristine build (clears existing build artifacts)

```bash
west build -p -b nice_nano -- -DSHIELD=kyria_left
```

### Split keyboard (build each half separately)

```bash
west build -d build/left  -b nice_nano -- -DSHIELD=kyria_left
west build -d build/right -b nice_nano -- -DSHIELD=kyria_right
```

### With Kconfig flags

```bash
west build -b planck_rev6 -- -DCONFIG_ZMK_SLEEP=y
```

### With external modules

```bash
west build -b nice_nano -- -DSHIELD=vendor_shield \
  -DZMK_EXTRA_MODULES="path/to/module"
```

### With a zmk-config folder

```bash
west build -b nice_nano -- -DSHIELD=kyria_left \
  -DZMK_CONFIG="C:/path/to/config"
```

### Flash

```bash
west flash
```

Build output: `build/zephyr/zmk.uf2` (split halves: `build/left/zephyr/zmk.uf2`, `build/right/zephyr/zmk.uf2`).  
The `.uf2` file can be copied to a USB mass-storage bootloader or flashed via DFU mode.

## Notes

- Always `cd app/` before building; failing to do so causes `ERROR: source directory "." does not contain a CMakeLists.txt`
- Split keyboards require separate build + flash for each half on first flash
- To persist CMake arguments across builds: `west config build.cmake-args -- "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON"`
- nRF5340 boards require separate network-core firmware setup

## Related

- [Setup Overview](./setup.md)
- [IDE Integration](./ide-integration.md)
- [Tests](./tests.md)
