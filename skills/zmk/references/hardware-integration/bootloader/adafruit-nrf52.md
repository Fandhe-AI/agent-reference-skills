# Adafruit nRF52 Bootloader

Magic value bootloader for nRF52840. Stores a magic value in the `GPREGRET` register; ZMK maps Zephyr's retained boot mode to the expected value.

## Signature / Usage

### Step 1: Kconfig (`Kconfig.<board>`)

```kconfig
config BOARD_MY_BOARD
    imply RETAINED_MEM
    imply RETENTION
    imply RETENTION_BOOT_MODE
```

### Step 2: Bootloader Type (`Kconfig.defaults`)

```kconfig
choice ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE
    default ZMK_BOOTMODE_MAGIC_VALUE_BOOTLOADER_TYPE_ADAFRUIT_NRF52
endchoice
```

### Step 3a: Devicetree — Simple Include (Recommended)

```devicetree
#include <common/nordic/nrf52840_uf2_boot_mode.dtsi>
```

### Step 3b: Devicetree — Manual Setup

```devicetree
&gpregret1 {
    adafruit_boot_retention: retention@0 {
        compatible = "zephyr,retention";
        status = "okay";
        reg = <0x0 0x1>;
    };
};

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
        zmk,magic-boot-mode = &adafruit_boot_retention;
    };
};
```

## Notes

- The nRF52840 `GPREGRET` register persists across resets — Zephyr has a built-in retained memory driver for it.
- Use `imply` (not `select`) in Kconfig so users can disable these features if needed.
- The simple include path handles all devicetree setup automatically.

## Related

- [Bootloader Overview](./overview.md)
- [New Board](../new-board.md)
