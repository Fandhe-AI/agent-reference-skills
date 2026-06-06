# Input

An editable text component. Allows users to type or update text directly within the widget.

## Signature / Usage

```tsx
const [text, setText] = useSyncedState("text", "")

<Input
  value={text}
  onTextEditEnd={(e) => setText(e.characters)}
  placeholder="Type here..."
  width={200}
  fontSize={14}
/>
```

## Options / Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| null` | — | Current text content; `null` or `""` shows placeholder |
| `onTextEditEnd` | `(e: TextEditEvent) => void \| Promise<void>` | — | Fires when the user exits edit mode |
| `placeholder` | `string` | — | Text shown when `value` is null/empty |
| `placeholderProps` | `TextProps` | 30% opacity | Styling for placeholder text |
| `inputBehavior` | `"wrap" \| "truncate" \| "multiline"` | `"wrap"` | `"wrap"`: auto-resize height; `"truncate"`: clip overflow; `"multiline"`: Enter creates newlines |
| `inputFrameProps` | `AutoLayoutProps` | — | Customise the wrapping AutoLayout container |
| `width` | `Size` | `200` | Width in pixels; text wraps at this boundary |
| `fontFamily` | `string` | `"Inter"` | Font family |
| `fontSize` | `number` | `16` | Font size in pixels |
| `fontWeight` | `number \| FontWeight` | — | Font weight |
| `fill` | `HexCode \| Color` | `"#000000"` | Text color |
| `italic` | `boolean` | — | Italic style |
| `letterSpacing` | `number \| string` | — | Letter spacing |
| `lineHeight` | `number \| string \| "auto"` | — | Line height |
| `textCase` | `TextCase` | — | Case override |
| `textDecoration` | `"underline" \| "strikethrough"` | — | Decoration |
| `stroke` | `Paint \| Paint[]` | — | Text stroke |
| `strokeWidth` | `number` | — | Stroke thickness |

`TextEditEvent` fields:

| Field | Type | Description |
|-------|------|-------------|
| `characters` | `string` | The final text after editing |

## Notes

- `onTextEditEnd` fires when the user clicks outside, presses Escape, or presses Cmd+Enter (single-line) / Cmd+Enter (multiline).
- Update `useSyncedState` inside `onTextEditEnd`, not on every keystroke.
- `Input` cannot be the root component of a widget.

## Related

- [Text](./Text.md)
- [useSyncedState](./useSyncedState.md)
- [handling-user-events](./handling-user-events.md)
