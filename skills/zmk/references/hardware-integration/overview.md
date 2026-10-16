# Hardware Integration Overview

Introduction to getting ZMK firmware running on keyboards, covering boards, shields, physical layouts, and optional features.

## Signature / Usage

ZMK hardware integration requires three core components per keyboard:

1. **Physical Layout** — describes the electrical and physical keyboard structure (kscan driver + matrix transform + optional key positions)
2. **Keymap** — binds key positions to behaviors across layers
3. **Optional Configuration** — encoders, lighting, battery sensing, etc.

## Boards vs. Shields

**Boards** define PCBs containing the MCU. Two categories:
- Complete keyboards with integrated MCU
- Small MCU boards (e.g. nice!nano or Seeed Studio Xiao RP2040) designed to combine with larger keyboard PCBs

**Shields** are PCBs or hardwired component sets that combine with MCU-only boards. This modular approach enables mix-and-match of compatible controllers.

## File Organization

### Self-Contained Keyboards (Board)
Located in `<board_root>/boards/<vendor or designer>/<keyboard_name>`, where `<board_root>` is `zmk/app` or a module root (e.g. `zmk/app/boards/olkb/planck/`). There can be multiple files with `<board_name>`s, one per keyboard part for split keyboards.

```
<keyboard_name>
├── Kconfig.defconfig
├── Kconfig.<board_name>
├── <board_name>_defconfig
├── <board_name>.dts
├── <keyboard_name>.keymap
├── board.cmake
├── board.yml
└── <keyboard_name>.zmk.yml
```

### Composite Keyboards (Shield + Board)

Located in `<board_root>/boards/shields/<keyboard_name>` (e.g. `zmk/app/boards/shields/clueboard_california/`). There can be multiple `<shield_name>`s, one per keyboard part for split keyboards.

```
<keyboard_name>
├── Kconfig.shield
├── Kconfig.defconfig
├── <shield_name>.overlay
├── <keyboard_name>.keymap
└── <keyboard_name>.zmk.yml
```

## Notes

- Every keyboard needs at minimum a kscan driver and a matrix transform wired together via a `zmk,physical-layout` node.
- Split keyboards define separate left/right shield variants with one side designated `ZMK_SPLIT_ROLE_CENTRAL`.
- `board.yml` contains information about the board and its variants; see the new board guide for creating a ZMK-compatible board variant.
- The `chosen` node of a board's `.dts` (or a shield's overlay) must include the `zmk,physical-layout` property, referring to the defined physical layout node.
- A shield's kscan node uses the interconnect nexus-node aliases such as `&pro_micro` for GPIO pins.
- ZMK Studio requires the optional `keys` property in the physical layout node with physical key position data.

## Related

- [New Board](./new-board.md)
- [New Shield](./new-shield.md)
- [Physical Layouts](./physical-layouts.md)
- [Hardware Metadata Files](./hardware-metadata-files.md)
