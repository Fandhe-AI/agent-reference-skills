# Supported Hardware

ZMK supports a wide range of microcontroller platforms built on Zephyr RTOS, including Nordic nRF52, Raspberry Pi RP2040/RP2350, ST STM32, and Microchip SAMD21. Hardware is organized into two main categories: onboard controller keyboards and composite keyboards.

## Hardware Categories

### Onboard Controller Keyboards

Single-PCB keyboards where the controller is integrated directly on the board. Examples include Advantage 360 Pro, Glove80, and Planck Rev6.

### Composite Keyboards

Separate controller boards paired with keyboard PCBs (shields), organized by interconnect type:

| Interconnect | Example Controllers | Example Shields |
|---|---|---|
| Pro Micro | nice!nano, nRFMicro, Adafruit KB2040 | Corne, Kyria, Lily58 |
| Seeed XIAO | XIAO nRF52840, XIAO RP2040 | Hummingbird |
| Arduino Uno Rev3 | Nordic dev kits | ZMK Uno |
| BlackPill | PillBug, BlackPill (STM32) | — |
| MakerDiary nRF52840 M.2 | M.2 form factor modules | — |

## Notes

- ZMK does **not** support AVR 8-bit processors (e.g., original Arduino Uno, SparkFun Pro Micro) because Zephyr only supports 32-bit and 64-bit platforms.
- Tested boards are pre-configured by contributors and marked with a `zmk` board variant (e.g. `nice_nano//zmk`, `planck//zmk`); Zephyr boards alone ship minimal configuration.
- The official page is organized as Composite Keyboards (per interconnect: Boards + Shields lists), Onboard Controller Keyboards (flat list of board identifiers), and Other Hardware (encoders, RGB underglow, backlight, displays; AVR 8-bit such as ATmega32U4 unsupported).
- Source: zmkfirmware/zmk `main` (commit 4dd95d7840eb3d5a3f59bb29fbf1ab054715ef85, committed 2026-10-09, fetched 2026-10-16), development docs; latest release is v0.3.0.
- Any Zephyr-supported platform can theoretically run ZMK, but only a subset has been tested by contributors.
- New keyboard shield support requires following the contributor documentation and clean room design requirements.

## Related

- [FAQ](./faq.md)
- [Installing ZMK](./user-setup.md)
