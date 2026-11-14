# TextInput

Represents a text input event: typed text delivered to the focused text input.

## Signature / Usage

Adapted (not in the official docs): the following handler illustrates reading `TextInput.text` from a `ListenerContext`; the official page lists the field only.

```lua
local input = context:asTextInput()
if input then
  print(input.text)
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `text` | The input text |

## Notes

- Adapted from the official docs: the snippet under Signature / Usage is not on the source page; it combines the documented `asTextInput()` accessor and `text` field.
- Source: https://rive.app/docs/scripting/api-reference/artboards/text-input.md (fetched 2026-11-14)

## Related

- [artboard-listener-context.md](./artboard-listener-context.md)
