# Kscan (Keyboard Scan)

Configuration for key detection drivers supporting direct GPIO, matrix, demux, charlieplex, composite, mock, and sideband behavior configurations.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_KSCAN_EVENT_QUEUE_SIZE` | int | 4 | Buffer size for pending scan events |
| `CONFIG_ZMK_KSCAN_INIT_PRIORITY` | int | 40 | Driver initialization order priority |
| `CONFIG_ZMK_KSCAN_DEBOUNCE_PRESS_MS` | int | -1 | Global press debounce override (ms); overrides per-device when set |
| `CONFIG_ZMK_KSCAN_DEBOUNCE_RELEASE_MS` | int | -1 | Global release debounce override (ms); overrides per-device when set |

### Driver-Specific Kconfig

| Option | Type | Description |
|--------|------|-------------|
| `CONFIG_ZMK_KSCAN_DIRECT_POLLING` | bool | Use polling instead of interrupts for direct GPIO driver |
| `CONFIG_ZMK_KSCAN_MATRIX_POLLING` | bool | Use polling instead of interrupts for matrix driver |
| `CONFIG_ZMK_KSCAN_MATRIX_WAIT_BEFORE_INPUTS` | int | Matrix input settling time in ticks (default: 0) |
| `CONFIG_ZMK_KSCAN_MATRIX_WAIT_BETWEEN_OUTPUTS` | int | Matrix output settling delay in ticks (default: 0) |
| `CONFIG_ZMK_KSCAN_CHARLIEPLEX_WAIT_BEFORE_INPUTS` | int | Charlieplex input settling time |
| `CONFIG_ZMK_KSCAN_CHARLIEPLEX_WAIT_BETWEEN_OUTPUTS` | int | Charlieplex output settling time |

## Devicetree

### `/chosen` node

| Property | Type | Description |
|----------|------|-------------|
| `zmk,kscan` | path | Active keyboard scan driver |
| `zmk,matrix-transform` | path | Associated matrix transform node |

### Direct GPIO Driver

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `input-gpios` | GPIO array | required | One GPIO entry per key |
| `debounce-press-ms` | int | 5 | Press debounce in milliseconds |
| `debounce-release-ms` | int | 5 | Release debounce in milliseconds |
| `toggle-mode` | bool | false | Minimize power drain for toggle switches |
| `wakeup-source` | bool | false | Enable keyboard wake capability |

### Matrix Driver

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `row-gpios` | GPIO array | required | Row pin connections |
| `col-gpios` | GPIO array | required | Column pin connections |
| `diode-direction` | string | required | `"row2col"` or `"col2row"` |
| `debounce-press-ms` | int | 5 | Press debounce in milliseconds |
| `debounce-release-ms` | int | 5 | Release debounce in milliseconds |
| `wakeup-source` | bool | false | Enable wake capability |

### Demux Driver

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `input-gpios` | GPIO array | required | GPIO inputs |
| `output-gpios` | GPIO array | required | Demultiplexer address lines |
| `debounce-period` | int | 5 | Debounce period in milliseconds |
| `polling-interval-msec` | int | 25 | Polling interval in milliseconds |

### Charlieplex Driver

| Property | Type | Description |
|----------|------|-------------|
| `gpios` | GPIO array | GPIOs used bidirectionally as input and output |
| `interrupt-gpios` | GPIO array | Optional single GPIO for interrupt-based operation |
| `debounce-press-ms` | int | Press debounce (default: 5ms) |
| `debounce-release-ms` | int | Release debounce (default: 5ms) |

### Composite Driver

| Property | Type | Description |
|----------|------|-------------|
| `rows` | int | Total composite matrix rows |
| `columns` | int | Total composite matrix columns |

Child nodes specify individual drivers with optional `row-offset` and `col-offset`.

### Mock Driver

| Property | Type | Description |
|----------|------|-------------|
| `events` | array | Array of simulated key events |
| `event-period` | int | Milliseconds between generated events |
| `exit-after` | bool | Terminate program after event sequence |

### Kscan Sideband Behavior Driver

| Property | Type | Description |
|----------|------|-------------|
| `kscan` | phandle | Reference to the underlying scan driver |
| `auto-enable` | bool | Unconditionally activate on startup |

Child nodes specify `row`, `col`, and `bindings` for each key to intercept.

## Notes

- When global `CONFIG_ZMK_KSCAN_DEBOUNCE_*` values are set, they override per-device debounce settings uniformly.
- The demux driver does not honor `CONFIG_ZMK_KSCAN_DEBOUNCE_*` global overrides.
- GPIO flags differ between `row2col` and `col2row` matrix configurations.

## Related

- [Keymap](./keymap.md)
- [Layout](./layout.md)
- [Encoders](./encoders.md)
