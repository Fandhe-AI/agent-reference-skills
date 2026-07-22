# Radio Group

Enables single selection from multiple options within a form context.

## Anatomy

- `Root` — main container wrapper
- `Label` — optional label for the group
- `Item` — individual radio option, renders as `<label>`
- `ItemControl` — visual radio button indicator
- `ItemText` — label text for each option
- `ItemHiddenInput` — hidden input for form submission
- `Indicator` — optional visual indicator element

## Signature / Usage

```tsx
import { RadioGroup } from '@ark-ui/react/radio-group'

<RadioGroup.Root>
  <RadioGroup.Label>Select an option</RadioGroup.Label>
  <RadioGroup.Item value="option1">
    <RadioGroup.ItemHiddenInput />
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
  </RadioGroup.Item>
</RadioGroup.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` | Controlled component value |
| `defaultValue` | `string` | Initial selected value |
| `onValueChange` | `function` | Fires when selection changes |
| `disabled` | `boolean` | Disables entire group |
| `name` | `string` | Form submission name |
| `orientation` | `'horizontal' \| 'vertical'` | Layout direction |

## Notes

- Must include `ItemHiddenInput` for proper form integration and submission
- When using `asChild`, render a `<label>` element as the direct child of `Item` for accessibility compliance
- Complies with the WAI-ARIA radio pattern
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Checkbox](./checkbox.md)
- [Segment Group](./segment-group.md)
