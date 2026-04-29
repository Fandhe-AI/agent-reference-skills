# Pointing

Configuration for pointing device (mouse) functionality, including input listeners, input processors, and split peripheral input routing.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_POINTING` | bool | n | Enable general pointing/mouse functionality |
| `CONFIG_ZMK_POINTING_SMOOTH_SCROLLING` | bool | n | Enable smooth scrolling via HID Resolution Multipliers |
| `CONFIG_INPUT_THREAD_STACK_SIZE` | int | 512 (1024 on split peripherals) | Stack size for the dedicated input event processing thread |

## Devicetree

### Input Listener

**Compatible:** `zmk,input-listener`

Connects an input device to ZMK's input processing pipeline.

| Property | Type | Description |
|----------|------|-------------|
| `device` | phandle | Input device handle |
| `input-processors` | phandle-array | List of input processors (with parameters) to apply to input events |

#### Layer-Specific Override Child Nodes

| Property | Type | Description |
|----------|------|-------------|
| `layers` | array | Layer indices where this override applies |
| `input-processors` | phandle-array | Processors to apply when on specified layers |
| `process-next` | bool | Continue processing with the parent config after this override |

### Input Split

**Compatible:** `zmk,input-split`

Routes pointing device input from a split keyboard peripheral to the central.

| Property | Type | Description |
|----------|------|-------------|
| `device` | phandle | Input device handle on the peripheral |
| `input-processors` | phandle-array | List of input processors to apply to input events |

## Notes

- `CONFIG_ZMK_POINTING_SMOOTH_SCROLLING` requires HID Resolution Multiplier support on the host OS.
- Layer-specific overrides in `zmk,input-listener` child nodes take precedence over the parent `input-processors` for the specified layers.

## Related

- [Behaviors](./behaviors.md)
- [Split](./split.md)
- [System](./system.md)
