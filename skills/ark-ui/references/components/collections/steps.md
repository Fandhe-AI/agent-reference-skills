# Steps

Guides users through a series of sequential steps in a process, with validation, skippable steps, and controlled navigation.

## Signature / Usage

```tsx
import { Steps } from "@ark-ui/react"

const App = () => (
  <Steps.Root count={3}>
    <Steps.List>
      {[0, 1, 2].map((index) => (
        <Steps.Item key={index} index={index}>
          <Steps.Trigger>
            <Steps.Indicator>{index + 1}</Steps.Indicator>
          </Steps.Trigger>
          <Steps.Separator />
        </Steps.Item>
      ))}
    </Steps.List>
    <Steps.Content index={0}>Step 1 Content</Steps.Content>
    <Steps.Content index={1}>Step 2 Content</Steps.Content>
    <Steps.Content index={2}>Step 3 Content</Steps.Content>
    <Steps.CompletedContent>All steps done</Steps.CompletedContent>
    <Steps.PrevTrigger>Prev</Steps.PrevTrigger>
    <Steps.NextTrigger>Next</Steps.NextTrigger>
  </Steps.Root>
)
```

## Anatomy

- `Steps.Root` — main container
- `Steps.List` — wrapper for step items
- `Steps.Item` — individual step container
- `Steps.Trigger` — clickable button for each step
- `Steps.Indicator` — visual marker showing step status
- `Steps.Separator` — visual connector between steps
- `Steps.Content` — step-specific content area
- `Steps.CompletedContent` — final completion message
- `Steps.PrevTrigger` / `Steps.NextTrigger` — navigation buttons

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `count` | `number` | Total number of steps |
| `step` | `number` | Controlled step value |
| `linear` | `boolean` | Requires steps to be completed in order |
| `orientation` | `"horizontal" \| "vertical"` | Layout direction |
| `isStepValid()` | `function` | Validates step completion |
| `isStepSkippable()` | `function` | Allows bypassing steps |
| `onStepChange()` | `function` | Fires when step changes |

## Notes

- Data attributes: `[data-scope="steps"]`, `[data-part]`, `[data-state="open"|"closed"]`, `[data-complete]`, `[data-current]`, `[data-incomplete]`.
- Programmatic control via context: `goToNextStep()`, `goToPrevStep()`, `setStep()`, `isCompleted`, `getItemState()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Pagination](./pagination.md)
