# Rating Group

Allows users to rate items using a set of icons.

## Anatomy

- `Root` — container element
- `Label` — label text
- `Control` — wrapper for rating items
- `Item` — individual rating element
- `ItemContext` — context provider for item state
- `HiddenInput` — form submission support

## Signature / Usage

```tsx
import { RatingGroup } from '@ark-ui/react/rating-group'

<RatingGroup.Root count={5}>
  <RatingGroup.Label>Rate us</RatingGroup.Label>
  <RatingGroup.Control>
    <RatingGroup.Context>
      {(api) =>
        api.items.map((index) => (
          <RatingGroup.Item key={index} index={index} />
        ))
      }
    </RatingGroup.Context>
  </RatingGroup.Control>
  <RatingGroup.HiddenInput />
</RatingGroup.Root>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `count` | `number` | Total number of ratings, default `5` |
| `allowHalf` | `boolean` | Enables 0.5 value increments |
| `value` | `number` | Controlled value |
| `onValueChange` | `function` | Controlled state callback |
| `disabled` | `boolean` | Disables interaction |
| `readOnly` | `boolean` | Prevents modification |
| `required` | `boolean` | Marks as required |
| `name` | `string` | Form field identifier |

## Notes

- Can be wrapped in `Field` for enhanced accessibility with ARIA labels and error handling
- Keyboard: Arrow Right/Left navigates between stars, Enter selects the focused star
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Field](./field.md)
