# Sheet

A collection of animatable Objects that share a single Sequence timeline. Created via `project.sheet()`.

## Signature / Usage

```ts
const sheet = project.sheet(sheetId: string, instanceId?: string): Sheet

// Create objects on the sheet
const obj = sheet.object('Box', { position: { x: 0, y: 0 } })

// Access the sequence for playback control
sheet.sequence.play()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `sheet.sequence` | `Sequence` | The animation sequence for this sheet |
| `sheet.project` | `Project` | Reference to the parent project |
| `sheet.address` | `{ projectId, sheetId, sheetInstanceId }` | Unique identifier for this sheet instance |
| `sheet.object(key, config, opts?)` | `(string, Props, ObjectOpts?) => Object` | Creates or returns a Sheet Object |
| `sheet.detachObject(key)` | `(string) => void` | Removes a child Object (v0.5.1+) |

## Notes

- Use `instanceId` in `project.sheet(name, instanceId)` to create multiple independent timeline instances of the same sheet (e.g., multiple animated cards)
- `detachObject()` does not automatically unsubscribe any `onValuesChange` listeners; unsubscribe manually before detaching
- All objects on a sheet share the same sequence timeline

## Related

- [Project](./project.md)
- [Sequence](./sequence.md)
- [Object](./object.md)
