# RP2040 / RP2350 Bootloader

Jump-to bootloader for RP2040/RP2350. Supports "double tap reset to enter bootloader" by default — useful when the BOOTSEL pin is not exposed.

## Signature / Usage

### Step 1: Kconfig (`Kconfig.<board>`)

```kconfig
config BOARD_MY_BOARD
    select SOC_RP2040
    imply RETAINED_MEM
    imply RETENTION
    imply RETENTION_BOOT_MODE
```

### Step 2a: Devicetree — Quick Include (Recommended)

```devicetree
/dts-v1/;
#include <raspberrypi/rpi_pico/rp2040.dtsi>
#include <arm/raspberrypi/rp2040-boot-mode-retention.dtsi>
```

### Step 2b: Devicetree — Manual Setup

Adjust SRAM to reserve 4 bytes:

```devicetree
&sram0 {
    reg = <0x20000004 ((DT_SIZE_K(264)) - 4)>;
};
```

Define retained memory region:

```devicetree
/ {
    sram@20000000 {
        compatible = "zephyr,memory-region", "mmio-sram";
        reg = <0x20000000 0x4>;
        zephyr,memory-region = "RetainedMem";
        status = "okay";
        retainedmem {
            compatible = "zephyr,retained-ram";
            status = "okay";
            boot_mode: retention@0 {
                compatible = "zephyr,retention";
                reg = <0x0 0x1>;
            };
        };
    };

    chosen {
        zephyr,boot-mode = &boot_mode;
    };
};
```

## Notes

- Double-tap reset behavior is enabled by default — no extra config needed for it.
- Use `imply` so users can override Kconfig settings.
- For the manual setup, the reserved 4 bytes are at the very start of SRAM (`0x20000000`); remaining SRAM starts at `0x20000004`.

## Related

- [Bootloader Overview](./overview.md)
- [New Board](../new-board.md)
- [Pinctrl](../pinctrl.md)
