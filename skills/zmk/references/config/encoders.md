# Encoders

Configuration for EC11 rotary encoders, including thread settings and per-sensor rotation triggers.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_EC11` | bool | n | Enable EC11 encoder support |
| `CONFIG_EC11_THREAD_PRIORITY` | int | 10 | Encoder processing thread priority |
| `CONFIG_EC11_THREAD_STACK_SIZE` | int | 1024 | Encoder processing thread stack size in bytes |

### Trigger Mode (required when `CONFIG_EC11=y`, select one)

| Option | Description |
|--------|-------------|
| `CONFIG_EC11_TRIGGER_NONE` | Disable encoder interrupt/polling |
| `CONFIG_EC11_TRIGGER_GLOBAL_THREAD` | Process encoder interrupts on the global thread |
| `CONFIG_EC11_TRIGGER_OWN_THREAD` | Process encoder interrupts on a dedicated thread |

## Devicetree

### Keymap Sensor Configuration

| Property | Type | Description |
|----------|------|-------------|
| `triggers-per-rotation` | int | Number of times to trigger the bound behavior per full rotation |

Global settings apply to all sensors. Per-sensor overrides use ordered child nodes inside the `zmk,keymap-sensors` node; child node naming is arbitrary and order-based.

### EC11 Node Properties

**Compatible:** `alps,ec11`

| Property | Type | Description |
|----------|------|-------------|
| `a-gpios` | GPIO array | Encoder A pin connection |
| `b-gpios` | GPIO array | Encoder B pin connection |
| `steps` | int | Number of encoder pulses per complete rotation |

## Notes

- Per-sensor overrides in `zmk,keymap-sensors` apply in sequential order to the listed sensors; child node names are ignored.

## Related

- [Keymap](./keymap.md)
- [Kscan](./kscan.md)
