# Features

| Name | Description | Path |
|------|-------------|------|
| Battery Level | Reports battery level to connected Bluetooth hosts and optionally to the keyboard's display. | [battery.md](./battery.md) |
| Bluetooth | Enables wireless keyboard connectivity via Bluetooth Low Energy (BLE), supporting both host connections and split keyboard communication. | [bluetooth.md](./bluetooth.md) |
| Debouncing | ZMK uses a cycle-based debounce algorithm where each key is debounced independently. | [debouncing.md](./debouncing.md) |
| Displays | Proof-of-concept support for OLED and ePaper displays on ZMK-powered keyboards. | [displays.md](./displays.md) |
| Encoders | Support for EC11 rotary encoders with push buttons. | [encoders.md](./encoders.md) |
| LED Indicators | Displays the five standard HID indicator states (Num Lock, Caps Lock, Scroll Lock, Compose, Kana) via LEDs. | [led-indicators.md](./led-indicators.md) |
| Lighting | ZMK supports two independent lighting systems: RGB Underglow (addressable RGB LEDs) and Backlight (single-color parallel LEDs). | [lighting.md](./lighting.md) |
| Low Power States | ZMK provides three low-power modes to extend battery life: Idle, Deep Sleep, and Soft Off. | [low-power-states.md](./low-power-states.md) |
| Modules | ZMK leverages Zephyr modules to incorporate external source code or configuration into builds. | [modules.md](./modules.md) |
| Pointing Devices | Supports physical pointing devices (trackpads, trackballs) and mouse emulation behaviors for sending HID pointing events. | [pointing.md](./pointing.md) |
| Split Keyboards | Enables keyboards split into multiple physical parts with independent controllers. | [split-keyboards.md](./split-keyboards.md) |
| ZMK Studio | Enables runtime keymap updates without reflashing firmware. | [studio.md](./studio.md) |
