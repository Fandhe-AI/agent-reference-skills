# Hardware Integration

| Name | Description | Path |
|------|-------------|------|
| Overview | Introduction to boards, shields, physical layouts, and file organization | [./overview.md](./overview.md) |
| New Board | Creating a ZMK board definition for MCU boards and standalone keyboards | [./new-board.md](./new-board.md) |
| New Shield | Creating a ZMK keyboard shield for use with MCU boards like Pro Micro | [./new-shield.md](./new-shield.md) |
| Hardware Metadata Files | YAML metadata format (`*.zmk.yml`) for boards and shields | [./hardware-metadata-files.md](./hardware-metadata-files.md) |
| Physical Layouts | Devicetree physical layout nodes with kscan, matrix transform, and key positions | [./physical-layouts.md](./physical-layouts.md) |
| Pinctrl | Pin control configuration for SPI/I2C/UART peripherals on boards | [./pinctrl.md](./pinctrl.md) |
| Battery | Battery sensing drivers and devicetree configuration | [./battery.md](./battery.md) |
| Dongle | USB BLE dongle setup for wireless split keyboards | [./dongle.md](./dongle.md) |
| Encoders | EC11 rotary encoder integration via devicetree and keymap | [./encoders.md](./encoders.md) |
| Pointing Devices | Trackpad/trackball integration using Zephyr's input API | [./pointing.md](./pointing.md) |
| Shift Registers | 74HC595 shift register GPIO expansion via SPI | [./shift-registers.md](./shift-registers.md) |
| Soft Off Setup | Hardware-triggered soft power-off with GPIO or matrix-integrated wakeup | [./soft-off-setup.md](./soft-off-setup.md) |
| Bootloader | Bootloader integration subcategory (magic value and jump-to types) | [./bootloader/README.md](./bootloader/README.md) |
| Lighting | RGB underglow, backlight, and LED indicator subcategory | [./lighting/README.md](./lighting/README.md) |
