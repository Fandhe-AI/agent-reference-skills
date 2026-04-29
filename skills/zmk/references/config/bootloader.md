# Bootloader

Configuration for bootloader integration, including double-tap reset entry, STM32 option byte setup, and magic value bootmode mapping.

## Kconfig

### Double Tap To Bootloader

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_DBL_TAP_BOOTLOADER` | bool | enabled on STM32/RP2040/RP2350 | Enable double-tap reset to enter bootloader |
| `CONFIG_ZMK_DBL_TAP_BOOTLOADER_TIMEOUT_MS` | int | 500 | Duration in ms to wait for a second reset to enter bootloader |

### STM32 nBOOT_SEL Option Byte Setup

Manages the `nBOOT_SEL` option byte on STM32C0/STM32G0 chips that can block system ROM bootloader access.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BOOT_STM32_ENFORCE_NBOOT_SEL` | bool | enabled on STM32C0/STM32G0 | Ensure the nBOOT_SEL bit is not set |

### Bootmode Magic Value Mapper

For SoCs using magic value mappings to select bootloader mode.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BOOTMODE_BOOTLOADER_MAGIC_VALUE` | hex | — | Magic value for retained memory bootloader boot mode |
| `CONFIG_ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_TINYUF2` | bool | false | Default magic value for TinyUF2 bootloader |
| `CONFIG_ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_ADAFRUIT_BOSSA` | bool | false | Default magic value for Adafruit BOSSA (SAMD21) bootloader |
| `CONFIG_ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_ADAFRUIT_NRF52` | bool | false | Default magic value for Adafruit nRF52 bootloader |

## Notes

- Definition file: `zmk/app/src/boot/Kconfig`
- Double-tap bootloader is automatically enabled for STM32, RP2040, and RP2350 targets; explicitly disable if not desired.

## Related

- [System](./system.md)
- [Overview](./overview.md)
