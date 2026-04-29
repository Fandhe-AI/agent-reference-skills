# Bootloader Integration Overview

The `&bootloader` behavior sets a boot mode value, resets the MCU, and relies on SoC-specific initialization code to enter bootloader mode. Proper retained memory setup is required.

## Signature / Usage

Two bootloader categories exist:

### Magic Value Bootloaders
Enter bootloader mode when they find a specific magic value in reserved memory. ZMK provides a mapping layer translating Zephyr's retained boot mode value to the bootloader-expected magic value.

Supported:
- [Adafruit nRF52](./adafruit-nrf52.md)
- [TinyUF2](./tinyuf2.md)
- [SAMD21 UF2](./samd21-uf2.md)

### Jump-To Bootloaders
Directly accessible from firmware initialization code. Require a retained memory instance to persist the boot mode across resets.

Supported:
- [RP2040/RP2350](./rp2.md)
- [STM32](./stm32.md)

## Notes

- Bootloader configuration applies to **boards only**, not keyboard shields.
- Most SoCs use Zephyr's generic retained memory driver to store the boot mode between resets.
- Magic value bootloaders require additional configuration beyond basic retained memory setup.
- All bootloader integrations require these Kconfig symbols: `RETAINED_MEM`, `RETENTION`, `RETENTION_BOOT_MODE`.

## Related

- [New Board](../new-board.md)
- [Adafruit nRF52 Bootloader](./adafruit-nrf52.md)
- [RP2040/RP2350 Bootloader](./rp2.md)
- [SAMD21 UF2 Bootloader](./samd21-uf2.md)
- [STM32 ROM Bootloader](./stm32.md)
- [TinyUF2 Bootloader](./tinyuf2.md)
