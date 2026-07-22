# Composition

Guide on composing default Ark UI components with custom elements via the `asChild` prop, the `ark` factory, and ID composition.

## Signature / Usage

```tsx
import { Popover } from '@ark-ui/react/popover'

// asChild lets Popover.Trigger delegate rendering to a custom child
// while keeping Popover.Trigger's behavior and accessibility
<Popover.Trigger asChild>
  <CustomButton />
</Popover.Trigger>
```

```tsx
import { ark } from '@ark-ui/react/factory'

// The ark factory turns any element into an Ark-compatible primitive
const Link = ark('a')
;<ark.span>
  <Link href="/">Home</Link>
</ark.span>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| asChild | `boolean` | Renders the component's behavior/props onto its single child element instead of a default DOM element |
| ids | `Record<string, string>` | Shares explicit element IDs between related components for correct ARIA wiring |

## Notes

- All Ark components that render a DOM element accept `asChild`, letting you integrate custom components while keeping consistent styling and behavior.
- The `ark` factory (e.g. `ark.div`, `ark.span`) creates elements that behave like native Ark UI primitives, inheriting class/style handling.
- Use the `ids` prop to share IDs between components that must interact (e.g. a `Tooltip` and an `Avatar`), ensuring proper `aria-*` attribute wiring.
- `asChild` requires exactly one child element; some components (e.g. `Checkbox.Root`, `RadioGroup.Item`) impose additional child-element requirements.
- When swapping the underlying element type via `asChild`, you are responsible for preserving accessibility and functional behavior.

## Related

- [Component State](./component-state.md)
- [Styling](./styling.md)
