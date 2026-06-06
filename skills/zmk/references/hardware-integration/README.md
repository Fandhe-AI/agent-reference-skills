# Hardware Integration

| Name | Description | Path |
|------|-------------|------|
| Battery Sensing | Configuration for reporting battery charge levels on wireless keyboards. | [battery.md](./battery.md) |
| Dongle | Converts a wireless split keyboard into a configuration where a BLE-capable USB dongle acts as the central device. | [dongle.md](./dongle.md) |
| Encoders (EC11) | Integration of EC11 rotary encoders into ZMK keyboards via devicetree configuration. | [encoders.md](./encoders.md) |
| Hardware Metadata Files | YAML files that provide high-level hardware information for boards and shields. | [hardware-metadata-files.md](./hardware-metadata-files.md) |
| New Board | Guide for adding a ZMK board definition, covering boards with interconnects and standalone keyboards. | [new-board.md](./new-board.md) |
| New Shield | Guide for creating a ZMK keyboard shield — a PCB or wired component set. | [new-shield.md](./new-shield.md) |
| Hardware Integration Overview | Introduction to getting ZMK firmware running on keyboards, covering boards, shields, and… | [overview.md](./overview.md) |
| Physical Layouts | A devicetree entity that aggregates all details about a keyboard layout. | [physical-layouts.md](./physical-layouts.md) |
| Pin Control (pinctrl) | Configuration of MCU pins for advanced peripherals using SPI, I2C, or UART. | [pinctrl.md](./pinctrl.md) |
| Shift Registers | Expands GPIO pin count for keyboards with more keys than available MCU pins. | [shift-registers.md](./shift-registers.md) |
| Soft Off Setup | Implements hardware-triggered soft power-off for keyboards, with three approaches. | [soft-off-setup.md](./soft-off-setup.md) |
| Pointing Devices | Integration of pointing hardware (trackpads, trackballs) into ZMK keyboards. | [pointing.md](./pointing.md) |
