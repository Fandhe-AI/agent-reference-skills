# New Board

Guide for adding a ZMK board definition, covering boards with interconnects (used with shields) and standalone keyboard boards.

## Signature / Usage

### Module Repository

Create a ZMK module using the [unified-zmk-config-template](https://github.com/zmkfirmware/unified-zmk-config-template). Name it `zmk-keyboard-<name>` (keyboards) or `zmk-component-<name>` (boards with interconnects) in `zephyr/module.yml`.

### Step 1: Zephyr Board Definition

Follow the [Zephyr board porting guide](https://docs.zephyrproject.org/latest/hardware/porting/board_porting.html) to create the base hardware definition. Verify with Zephyr samples (LEDs, Bluetooth, sensors).

### Step 2: ZMK Variant

Add a `zmk` variant to `board.yml`:

```yaml
board:
  # ...
socs:
  - name: <soc-1>
    variants:
      - name: zmk
```

Create `<your-board>_zmk_defconfig` with ZMK-specific Kconfig flags:

```kconfig
CONFIG_ARM_MPU=y
CONFIG_SYS_CLOCK_HW_CYCLES_PER_SEC=125000000
CONFIG_RETAINED_MEM=y
CONFIG_RETENTION=y
CONFIG_ZMK_USB=y
CONFIG_ZMK_BLE=y
CONFIG_NVS=y
CONFIG_SETTINGS_NVS=y
CONFIG_FLASH=y
CONFIG_GPIO=y
```

Add a `.dts` file for the ZMK variant:

```c
#include <../boards/<vendor>/<board>/<board>.dts>
#include <arm/raspberrypi/rp2040-boot-mode-retention.dtsi>

&uart0 { status = "disabled"; };

&code_partition {
    reg = <0x100 (DT_SIZE_M(2) - 0x100 - DT_SIZE_K(512))>;
};

&flash0 {
    reg = <0x10000000 DT_SIZE_M(2)>;
    partitions {
        storage_partition: partition@180000 {
            reg = <0x180000 DT_SIZE_K(512)>;
            read-only;
        };
    };
};
```

## Notes

- Boards considered for the main ZMK repo must be reliably commercially available and in use across multiple shields.
- Understand each Kconfig flag before enabling — some may conflict with specific hardware.
- For standalone keyboard boards, continue with the Kconfig.defconfig step from the new shield guide.
- For boards with interconnects, create a tester shield to verify ZMK compatibility.
- Reference existing in-tree boards with the same SoC for configuration examples.

## Related

- [New Shield](./new-shield.md)
- [Pinctrl](./pinctrl.md)
- [Bootloader](./bootloader/overview.md)
