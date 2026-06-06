# Configuration

| Name | Description | Path |
|------|-------------|------|
| Battery | Enables detection and reporting of keyboard battery status, including peripheral battery levels for wireless split keyboards. | [battery.md](./battery.md) |
| Behaviors | Configurable properties that adjust how keyboard actions function. Behaviors serve as templates for custom actions; built-in nodes can be overridden in your keymap file. | [behaviors.md](./behaviors.md) |
| Bluetooth | Configuration for Bluetooth connectivity, pairing security, and device appearance in ZMK. | [bluetooth.md](./bluetooth.md) |
| Bootloader | Configuration for bootloader integration, including double-tap reset entry, STM32 option byte setup, and magic value bootmode mapping. | [bootloader.md](./bootloader.md) |
| Combos | Configuration for key combos, which trigger a single action when multiple keys are pressed simultaneously within a time window. | [combos.md](./combos.md) |
| Displays | Configuration for keyboard display support, including widgets, screen type, threading, and LED blanking. | [displays.md](./displays.md) |
| Encoders | Configuration for EC11 rotary encoders, including thread settings and per-sensor rotation triggers. | [encoders.md](./encoders.md) |
| Keymap | Configuration for keyboard layer definitions and sensor bindings using Devicetree syntax. | [keymap.md](./keymap.md) |
| Kscan (Keyboard Scan) | Configuration for key detection drivers supporting direct GPIO, matrix, demux, charlieplex, composite, mock, and sideband behavior configurations. | [kscan.md](./kscan.md) |
| Layout | Configuration for mapping the physical keyboard matrix to logical key positions, supporting matrix transforms, physical layouts, and multi-layout position mapping for ZMK Studio. | [layout.md](./layout.md) |
| LED Indicators | Configuration for mapping HID indicator states (Caps Lock, Num Lock, etc.) to LED devices. | [led-indicators.md](./led-indicators.md) |
| Lighting | Configuration for RGB underglow and backlight LED features. Changes made through lighting behaviors are saved to flash after a one-minute delay. | [lighting.md](./lighting.md) |
| Configuration Overview | ZMK's configuration system allows compile-time customization through Kconfig and Devicetree files. All configuration is set at compile time; changes require building and flashing new firmware. | [overview.md](./overview.md) |
| Pointing | Configuration for pointing device (mouse) functionality, including input listeners, input processors, and split peripheral input routing. | [pointing.md](./pointing.md) |
| Power | Configuration for low power states (idle/sleep/soft-off), external power control, GPIO wakeup triggers, and soft-off wakeup sources. | [power.md](./power.md) |
| Settings | Configuration for persistent runtime settings stored in the controller's flash memory, including save debounce and reset behavior. | [settings.md](./settings.md) |
| Split | Configuration for split keyboard behavior, supporting both Bluetooth and wired (UART) connections between keyboard halves. | [split.md](./split.md) |
| Studio | Configuration for ZMK Studio, including keymap layer name limits, session locking, and BLE transport tuning. | [studio.md](./studio.md) |
| System | General system settings controlling keyboard identity, HID report types, USB descriptors, Bluetooth stack, and logging. | [system.md](./system.md) |
