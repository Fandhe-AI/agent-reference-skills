# Sheets

Container that holds one or more Sheet Objects animated together. Each sheet has its own Sequence for independent playback control.

## Signature / Usage

```javascript
// Create or retrieve a sheet
const sheet = project.sheet('My Sheet')

// Sheet instances — multiple independent copies of the same animation
const submitBtn = project.sheet('Button', 'Submit')
const cancelBtn = project.sheet('Button', 'Cancel')

// Play the sheet's animation sequence
sheet.sequence.play()
```

## Options / Props

`project.sheet(sheetName, instanceId?)` accepts two arguments:

| Name | Type | Description |
|------|------|-------------|
| `sheetName` | `string` | Unique name for the sheet template |
| `instanceId` | `string` | Optional identifier for independent instances of the same sheet |

## Notes

- Calling `project.sheet()` with an existing name returns the existing sheet
- Each instance (via `instanceId`) maintains independent animation state — playing one does not affect others
- Access the animation timeline via `sheet.sequence`
- Sheet Objects are added to a sheet via `sheet.object()`

## Related

- [Projects](./projects.md)
- [Sheet Objects](./objects.md)
- [Sequences](./sequences.md)
