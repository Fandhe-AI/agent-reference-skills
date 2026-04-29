# SAMD21 UF2 Bootloader

Magic value bootloader for SAMD21 microcontrollers. Requires reserved RAM at the top of SRAM for the bootloader's magic value, plus a mapper node translating Zephyr boot mode to bootloader format.

## Signature / Usage

### Step 1: Kconfig (`Kconfig.<board>`)

```kconfig
config BOARD_MY_BOARD
    imply RETAINED_MEM
    imply RETENTION
    imply RETENTION_BOOT_MODE
```

### Step 2: Adjust SRAM Node

Reserve the last 4 bytes of RAM (subtract 4 from total RAM size):

```devicetree
&sram0 {
    reg = <0x20000000 0x7FFC>;
};
```

### Step 3: Retained Memory Region

Place a new SRAM node at the top of RAM:

```devicetree
/ {
    sram@20007FFC {
        compatible = "zephyr,memory-region", "mmio-sram";
        reg = <0x20007FFC 0x4>;
        zephyr,memory-region = "RetainedMem";
        status = "okay";
        retainedmem {
            compatible = "zephyr,retained-ram";
            status = "okay";
            #address-cells = <1>;
            #size-cells = <1>;
            magic_retention: retention@0 {
                compatible = "zephyr,retention";
                status = "okay";
                reg = <0x0 0x4>;
            };
        };
    };
};
```

### Step 4: Magic Mapper Node

```devicetree
/ {
    magic_mapper {
        compatible = "zmk,bootmode-to-magic-mapper";
        status = "okay";
        #address-cells = <1>;
        #size-cells = <1>;
        boot_retention: retention@0 {
            compatible = "zephyr,retention";
            status = "okay";
            reg = <0x0 0x1>;
        };
    };

    chosen {
        zephyr,boot-mode = &boot_retention;
        zmk,magic-boot-mode = &magic_retention;
    };
};
```

### Step 5: Bootloader Type (`Kconfig.defaults`)

```kconfig
choice ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE
    default ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_ADAFRUIT_BOSSA
endchoice
```

## Notes

- The address `0x7FFC` assumes 32 KB of RAM; adjust based on your target's total RAM.
- The `magic_retention` node is 4 bytes while `boot_retention` is 1 byte — both reside in the same retained memory region.
- Use `imply` in Kconfig to allow user overrides.

## Related

- [Bootloader Overview](./overview.md)
- [New Board](../new-board.md)
