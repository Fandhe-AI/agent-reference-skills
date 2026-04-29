# TinyUF2 Bootloader

Magic value bootloader that reserves 4 bytes at the top of RAM and uses a mapper node to translate Zephyr's boot mode into the TinyUF2-expected magic value.

## Signature / Usage

### Step 1: Kconfig (`Kconfig.<board>`)

```kconfig
config BOARD_MY_BOARD
    imply RETAINED_MEM
    imply RETENTION
    imply RETENTION_BOOT_MODE
```

### Step 2: Adjust SRAM Node

Reduce SRAM by 4 bytes (total RAM − 4, in hexadecimal):

```devicetree
&sram0 {
    reg = <0x20000000 0x1FFFC>;
};
```

### Step 3: Retained Memory Region

```devicetree
/ {
    sram@2001FFFC {
        compatible = "zephyr,memory-region", "mmio-sram";
        reg = <0x2001FFFC 0x4>;
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

Address `0x2001FFFC` = base RAM address + reduced RAM size.

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
    default ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_TINYUF2
endchoice
```

## Notes

- The example uses 128 KB RAM (`0x20000` total); adjust addresses for your target's RAM size.
- `magic_retention` is 4 bytes; `boot_retention` is 1 byte — both live in the same retained memory region.
- Use `imply` in Kconfig to allow user overrides.

## Related

- [Bootloader Overview](./overview.md)
- [New Board](../new-board.md)
