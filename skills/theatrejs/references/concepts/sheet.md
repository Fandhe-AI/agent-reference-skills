# Sheet

A container that groups one or more Sheet Objects that can be animated together. Each sheet has its own Sequence (timeline), which can be played independently.

## Signature / Usage

```javascript
// Create or retrieve a sheet within a project
const sheet = project.sheet('Animated Scene')

// Sheet instances — independent copies of the same animation template
const submitBtn = project.sheet('Button', 'Submit')
const cancelBtn = project.sheet('Button', 'Cancel')

// Play the sheet's sequence
sheet.sequence.play()
```

## Options / Props

`project.sheet(sheetName, instanceId?)`:

| Name | Type | Description |
|------|------|-------------|
| `sheetName` | `string` | Name of the sheet template |
| `instanceId` | `string` | Optional identifier; creates an independent instance of the same template |

## Notes

- Calling `project.sheet()` with an existing name returns the same sheet (idempotent)
- Sheet instances share the same authored keyframe structure but each maintains independent playback position and prop values
- Access the animation timeline via `sheet.sequence`
- Add animated objects to a sheet via `sheet.object()`

## Related

- [Project](./project.md)
- [Sheet Object](./sheet-object.md)
- [Sequence](./sequence.md)
