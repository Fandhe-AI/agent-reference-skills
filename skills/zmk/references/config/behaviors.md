# Behaviors

Configurable properties that adjust how keyboard actions function. Behaviors serve as templates for custom actions; built-in nodes can be overridden in your keymap file.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BEHAVIORS_QUEUE_SIZE` | int | 64 | Maximum number of behaviors to queue from a macro or other complex behavior |
| `CONFIG_ZMK_BEHAVIOR_HOLD_TAP_MAX_HELD` | int | 10 | Max simultaneous held hold-tap behaviors |
| `CONFIG_ZMK_BEHAVIOR_HOLD_TAP_MAX_CAPTURED_EVENTS` | int | 40 | Max captured events for hold-tap |
| `CONFIG_ZMK_MACRO_DEFAULT_WAIT_MS` | int | 15 | Default wait time between macro steps |
| `CONFIG_ZMK_MACRO_DEFAULT_TAP_MS` | int | 30 | Default tap duration for macro key presses |
| `CONFIG_ZMK_BEHAVIOR_STICKY_KEY_MAX_HELD` | int | 10 | Max simultaneous held sticky-key behaviors |
| `CONFIG_ZMK_BEHAVIOR_TAP_DANCE_MAX_HELD` | int | 10 | Max simultaneous held tap-dance behaviors |

## Devicetree

### Common Property

| Property | Type | Description |
|----------|------|-------------|
| `display-name` | string | Layer name for display or ZMK Studio |

### Hold-Tap (`zmk,behavior-hold-tap`)

Default nodes: `&lt` (layer-tap), `&mt` (mod-tap).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tapping-term-ms` | int | — | Milliseconds before triggering hold |
| `quick-tap-ms` | int | -1 | Window for double-tap to force tap; -1 disables |
| `flavor` | string | — | One of: `hold-preferred`, `balanced`, `tap-preferred`, `tap-unless-interrupted` |
| `hold-trigger-key-positions` | array | — | Key indices that trigger tap when non-listed keys are pressed |

### Macro (`zmk,behavior-macro` / `zmk,behavior-macro-one-param` / `zmk,behavior-macro-two-param`)

| `#binding-cells` | Compatible |
|-----------------|------------|
| 0 | `zmk,behavior-macro` |
| 1 | `zmk,behavior-macro-one-param` |
| 2 | `zmk,behavior-macro-two-param` |

Control behaviors: `&macro_tap`, `&macro_press`, `&macro_release`, `&macro_pause_for_release`, `&macro_wait_time`, `&macro_param_*`

### Sticky Key (`zmk,behavior-sticky-key`)

Default nodes: `&sk` (sticky key), `&sl` (sticky layer).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `release-after-ms` | int | 1000 | Release timeout in milliseconds |
| `quick-release` | bool | false | Release before the next key is released |
| `lazy` | bool | false | Do not activate until another key is pressed |
| `ignore-modifiers` | bool | true | Do not release when a modifier is pressed |

### Tap Dance (`zmk,behavior-tap-dance`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `tapping-term-ms` | int | 200 | Max time between taps before triggering a binding |

### Caps Word (`zmk,behavior-caps-word`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `continue-list` | array | `<UNDERSCORE BACKSPACE DELETE>` | Keycodes that do not deactivate caps word |
| `mods` | int | `<MOD_LSFT>` | Modifier bit field to apply |

### Two Axis Input (`zmk,behavior-input-two-axis`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `x-input-code` | int | — | Relative event code for X axis |
| `y-input-code` | int | — | Relative event code for Y axis |
| `trigger-period-ms` | int | 16 | Period between input event triggers |
| `acceleration-exponent` | int | 1 | Acceleration curve exponent |

## Notes

- Binding definitions are in `app/dts/bindings/behaviors/` in the ZMK repository.
- All behavior configuration is compile-time; re-flash after changes.

## Related

- [Keymap](./keymap.md)
- [Combos](./combos.md)
- [Overview](./overview.md)
