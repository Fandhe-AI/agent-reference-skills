# Segment Group

Organizes and navigates between sections in a view, functioning as a radio-button-style selector for switching between multiple content areas.

## Anatomy

- `Root` — container element wrapping the entire group
- `Indicator` — visual element showing the active selection
- `Item` — individual selectable segment
- `ItemText` — text label within a segment
- `ItemControl` — interactive control area of the item
- `ItemHiddenInput` — hidden input for form submission

## Signature / Usage

```tsx
import { SegmentGroup } from '@ark-ui/react/segment-group'

<SegmentGroup.Root>
  <SegmentGroup.Indicator />
  <SegmentGroup.Item value="option1">
    <SegmentGroup.ItemText>Option 1</SegmentGroup.ItemText>
  </SegmentGroup.Item>
</SegmentGroup.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` | Controlled selection value |
| `defaultValue` | `string` | Initial selected value |
| `onValueChange` | `function` | Fires when selection changes |
| `disabled` | `boolean` | Disables the group |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction |

## Notes

- Complies with the Radio WAI-ARIA design pattern
- Arrow keys navigate between items; Space selects
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Radio Group](./radio-group.md)
