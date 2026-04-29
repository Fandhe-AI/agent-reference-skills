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
- Small MCU boards (e.g. `nice_nano`) designed to combine with larger keyboard PCBs

**Shields** are PCBs or hardwired component sets that combine with MCU-only boards. This modular approach enables mix-and-match of compatible controllers.

## File Organization

### Self-Contained Keyboards (Board)
```
boards/<vendor>/<keyboard_name>/
  Kconfig            # toplevel settings
  Kconfig.defconfig  # default values
  <board>.dts        # kscan, matrix, layout definitions
  <board>.keymap     # default keymap
  <board>.zmk.yml    # metadata
```

### Composite Keyboards (Shield + Board)
```
boards/shields/<keyboard_name>/
  Kconfig.shield     # shield name definition
  Kconfig.defconfig  # default config values
  <shield>.overlay   # devicetree overlay
  <shield>.keymap    # default keymap
  <shield>.zmk.yml   # metadata
```

## Notes

- Every keyboard needs at minimum a kscan driver and a matrix transform wired together via a `zmk,physical-layout` node.
- Split keyboards define separate left/right shield variants with one side designated `ZMK_SPLIT_ROLE_CENTRAL`.
- ZMK Studio requires the optional `keys` property in the physical layout node with physical key position data.

## Related

- [New Board](./new-board.md)
- [New Shield](./new-shield.md)
- [Physical Layouts](./physical-layouts.md)
- [Hardware Metadata Files](./hardware-metadata-files.md)
