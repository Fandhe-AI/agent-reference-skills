# Hardware Metadata Files

YAML files (`{item_id}.zmk.yml`) that provide high-level hardware information for boards and shields, used by setup utilities, the ZMK website, and related tooling.

## Signature / Usage

```yaml
file_format: "1"
id: corne
name: Corne
type: shield
url: https://github.com/foostan/crkbd/
requires:
  - pro_micro
exposes:
  - i2c_oled
features:
  - keys
  - display
siblings:
  - corne_left
  - corne_right
```

## Options / Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `file_format` | string | yes | Always `"1"` (only supported version) |
| `id` | string | yes | Identifier — board/shield name without split suffixes |
| `name` | string | yes | Human-readable display name |
| `type` | string | yes | `board`, `shield`, or `interconnect` |
| `url` | string | no | Canonical resource URL (vendor site or GitHub) |
| `requires` | list | no | Interconnect IDs this hardware needs (shields) |
| `exposes` | list | no | Interconnect IDs this hardware provides (boards) |
| `features` | list | no | Available hardware capabilities (see below) |
| `siblings` | list | no | IDs of components designed to work together (split halves) |

### `features` Values

| Value | Description |
|-------|-------------|
| `keys` | Keyboard key matrix |
| `display` | Display hardware |
| `encoder` | Rotary encoder support |
| `underglow` | Underglow LEDs |
| `backlight` | Backlight LEDs |
| `studio` | ZMK Studio compatibility |
| `pointer` | Pointer input device |

## Notes

- File name must match `{id}.zmk.yml` (without split suffixes like `_left`/`_right`).
- Validate locally with `west metadata check`.
- JSON Schema available at `app/dts/bindings/hardware-metadata.schema.json` in the ZMK repo.

## Related

- [New Shield](./new-shield.md)
- [New Board](./new-board.md)
