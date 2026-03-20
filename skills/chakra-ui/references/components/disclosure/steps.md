# Steps

A multi-step navigation component for guiding users through sequential tasks.

## Import

```tsx
import { Steps } from "@chakra-ui/react"
```

## Usage

```tsx
<Steps.Root defaultStep={0} count={steps.length}>
  <Steps.List>
    {steps.map((step, index) => (
      <Steps.Item key={index} index={index}>
        <Steps.Indicator />
        <Steps.Title>{step.title}</Steps.Title>
        <Steps.Separator />
      </Steps.Item>
    ))}
  </Steps.List>

  {steps.map((step, index) => (
    <Steps.Content key={index} index={index}>
      {step.description}
    </Steps.Content>
  ))}
  <Steps.CompletedContent>All steps complete!</Steps.CompletedContent>

  <ButtonGroup size="sm" variant="outline">
    <Steps.PrevTrigger asChild><Button>Prev</Button></Steps.PrevTrigger>
    <Steps.NextTrigger asChild><Button>Next</Button></Steps.NextTrigger>
  </ButtonGroup>
</Steps.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Total number of steps |
| `step` | `number` | — | Controlled current step |
| `defaultStep` | `number` | — | Initial step (uncontrolled) |
| `linear` | `boolean` | — | Require steps to be completed in order |
| `orientation` | `"vertical" \| "horizontal"` | `"horizontal"` | Layout orientation |
| `onStepChange` | `(details: StepChangeDetails) => void` | — | Callback when step changes |
| `onStepComplete` | `VoidFunction` | — | Callback when all steps are completed |
| `variant` | `"solid" \| "subtle"` | `"solid"` | Visual variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

### Steps.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — | **Required.** Index of this step |

### Steps.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — | **Required.** Index of the step this content belongs to |

### Steps.Status

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `complete` | `ReactNode` | — | Content shown when step is complete |
| `incomplete` | `ReactNode` | — | Content shown when step is incomplete |
| `current` | `ReactNode` | — | Content shown when step is current |

## Variants / Sizes

- **variant**: `"solid"` (default), `"subtle"`
- **size**: `"xs"`, `"sm"`, `"md"` (default), `"lg"`

## Notes

- `Steps.CompletedContent` is shown only after all steps are complete (index equals count)
- Use `Steps.Trigger` to make step indicators clickable for non-linear navigation
- Use `useSteps()` hook with `Steps.RootProvider` for external state control

## Related

- [Pagination](./pagination.md)
- [Breadcrumb](./breadcrumb.md)
