# Composition with asChild

Delegate a part's rendered element to a custom component with `asChild`, keeping the part's behavior and accessibility wiring.

```tsx
import { Popover } from '@ark-ui/react/popover'
import { CustomButton } from './custom-button'

export const Example = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <CustomButton>Open</CustomButton>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
```

```tsx
// The `ark` factory turns any element into an Ark-compatible primitive
import { ark } from '@ark-ui/react/factory'

const Link = ark('a')

export const Nav = () => (
  <ark.nav className="flex gap-4">
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
  </ark.nav>
)
```

## Notes

- `asChild` requires exactly one child element; `CustomButton` must forward `ref` and spread received props onto its root DOM element.
- Some components (e.g. `Checkbox.Root`, `RadioGroup.Item`) impose additional child-element requirements beyond a single child.
- When the underlying element changes via `asChild`, you are responsible for preserving accessibility semantics (e.g. keeping it a real `<button>`).
- Use `ark(tag)` when you need a plain element to participate in Ark's styling/behavior conventions without wrapping an existing component.
