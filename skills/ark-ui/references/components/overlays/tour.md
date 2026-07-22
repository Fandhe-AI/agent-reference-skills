# Tour

Guides users through an interface by highlighting elements and presenting contextual step content, useful for onboarding experiences.

## Anatomy

- `Tour.Root` - container
- `Tour.Backdrop` - overlay
- `Tour.Spotlight` - highlight around the target element
- `Tour.Positioner` - positioning container
- `Tour.Content` - step content wrapper
- `Tour.Arrow` / `Tour.ArrowTip` - pointer element
- `Tour.Title` - step heading
- `Tour.Description` - step text
- `Tour.ProgressText` - progress indicator
- `Tour.CloseTrigger` - dismiss button
- `Tour.Actions` / `Tour.ActionTrigger` - action buttons

## Signature / Usage

```jsx
import { Tour, useTour } from '@ark-ui/react'

const tour = useTour({ steps: [/* ... */] })

<Tour.Root tour={tour}>
  <Tour.Backdrop />
  <Tour.Spotlight />
  <Tour.Positioner>
    <Tour.Content>
      <Tour.Arrow>
        <Tour.ArrowTip />
      </Tour.Arrow>
      <Tour.Title />
      <Tour.Description />
      <Tour.ProgressText />
      <Tour.CloseTrigger />
    </Tour.Content>
  </Tour.Positioner>
</Tour.Root>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | — | Unique step identifier |
| type | 'tooltip' \| 'dialog' \| 'floating' \| 'wait' | — | Step display type |
| placement | string | — | Positioning, e.g. `"top-start"` |
| target | function | — | Selector returning the target DOM element |
| title | string | — | Step title |
| description | string | — | Step body text |
| arrow | boolean | — | Show/hide the pointer |
| backdrop | boolean | — | Show/hide the overlay |
| actions | array | — | Step action button definitions |
| effect | function | — | Lifecycle logic; receives `next()`, `show()`, `update()` |

## Notes

- Set `box-sizing: border-box` on all elements for accurate target measurement.
- Ensure `body` has `position: relative`.
- `wait`-type steps cannot call `show()` but support async operations before advancing.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Tooltip](./tooltip.md)
- [Popover](./popover.md)
- [Dialog](./dialog.md)
