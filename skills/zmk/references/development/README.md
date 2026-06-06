# Development

| Name | Description | Path |
|------|-------------|------|
| Devicetree Overview | ZMK uses devicetree as a declarative way to describe hardware, keymaps, behaviors, and board configuration. | [devicetree.md](./devicetree.md) |
| ZMK Events | ZMK's event manager decouples behaviors and peripherals from core firmware by providing a pub/sub system for typed events. | [events.md](./events.md) |
| Module Creation | ZMK modules are the recommended way to extend ZMK firmware with new keyboards, behaviors, drivers, or features. | [module-creation.md](./module-creation.md) |
| New Behavior | Step-by-step guide for creating a custom ZMK behavior—the action invoked when a key is pressed or released. | [new-behavior.md](./new-behavior.md) |
| Studio RPC Protocol | The ZMK Studio UI communicates with ZMK devices over a custom RPC protocol built on Protocol Buffers with a simple byte-framing scheme. | [studio-rpc-protocol.md](./studio-rpc-protocol.md) |
| USB Logging | USB logging redirects ZMK's printk, console output, and Zephyr log messages to a USB CDC ACM serial device. | [usb-logging.md](./usb-logging.md) |
