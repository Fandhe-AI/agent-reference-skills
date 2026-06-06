# figma.parameters

Sub-API for handling quick-action parameter input. Registers callbacks that fire on every keystroke to power autocomplete suggestions in the quick actions menu.

## Signature / Usage

```ts
figma.parameters.on('input', ({ key, query, parameters, result }) => {
  if (key === 'color') {
    result.setSuggestions(['red', 'green', 'blue'].filter(c => c.startsWith(query)));
  }
});

// Plugin runs after parameters are resolved; access via RunEvent
figma.on('run', ({ parameters }) => {
  const color = parameters?.['color'];
});
```

## Options / Props

### Methods on `figma.parameters`

| Name | Signature | Description |
|------|-----------|-------------|
| `on('input', cb)` | `(event: ParameterInputEvent) => void` | Register handler; fires on every keystroke |
| `once('input', cb)` | `(event: ParameterInputEvent) => void` | Single-use handler |
| `off('input', cb)` | `(event: ParameterInputEvent) => void` | Remove handler |

### ParameterInputEvent fields

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Parameter key from manifest |
| `query` | `string` | Current user input string |
| `parameters` | `ParameterValues` | Already-resolved earlier parameters |
| `result` | `SuggestionResults` | Object used to push suggestions or errors |

### SuggestionResults methods

| Name | Signature | Description |
|------|-----------|-------------|
| `setSuggestions()` | `(suggestions: Array<string \| SuggestionObject>) => void` | Populate autocomplete dropdown |
| `setError()` | `(message: string) => void` | Show error and block progression (not available with `allowFreeform`) |
| `setLoadingMessage()` | `(message: string) => void` | Customize loading text while suggestions load |

### SuggestionObject shape

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Display label (required) |
| `data` | `any` | Hidden data returned when selected |
| `icon` | `string \| Uint8Array` | SVG string or raster icon |
| `iconUrl` | `string` | URL-based icon |

## Notes

- `manifest.json` must define `parameters` entries with `name` and `key`.
- `ParameterValues` resolved value priority: `data` → `name` → string suggestion → freeform query → `undefined` (optional, skipped).
- `setError()` is unavailable when `allowFreeform: true` is set on the parameter.

## Related

- [manifest](./manifest.md)
- [figma global object](./figma-global.md)
