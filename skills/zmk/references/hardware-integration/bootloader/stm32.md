# STM32 ROM Bootloader

Jump-to bootloader for STM32 microcontrollers. Supports "double tap reset to enter bootloader" by default — useful when BOOT pins are not exposed.

## Signature / Usage

### Step 1: Kconfig (`Kconfig.<board>`)

```kconfig
config BOARD_MY_BOARD
    imply RETAINED_MEM
    imply RETENTION
    imply RETENTION_BOOT_MODE
```

### Step 2: Adjust SRAM Node

Reduce existing SRAM by 1 byte to reserve the last byte for retained memory:

```devicetree
&sram0 {
    reg = <0x20000000 0x3FFF>;
};
```

Adjust `0x3FFF` based on total RAM minus 1 byte in hexadecimal.

### Step 3: Retained Memory Region

```devicetree
/ {
    sram@20003FFF {
        compatible = "zephyr,memory-region", "mmio-sram";
        reg = <0x20003FFF 0x1>;
        zephyr,memory-region = "RetainedMem";
        status = "okay";
        retainedmem {
            compatible = "zephyr,retained-ram";
            status = "okay";
            #address-cells = <1>;
            #size-cells = <1>;
            retention0: retention@0 {
                compatible = "zephyr,retention";
                status = "okay";
                reg = <0x0 0x1>;
            };
        };
    };

    chosen {
        zephyr,boot-mode = &retention0;
    };
};
```

The address `0x20003FFF` = base RAM address (`0x20000000`) + reduced RAM size (`0x3FFF`).

## Notes

- Double-tap reset behavior is enabled by default.
- STM32 only needs 1 reserved byte (not 4 like RP2040/SAMD21).
- The `0x20000000` base address is standard for most STM32 targets; verify for your specific MCU.
- Use `imply` in Kconfig so users can override if needed.

## Related

- [Bootloader Overview](./overview.md)
- [New Board](../new-board.md)
