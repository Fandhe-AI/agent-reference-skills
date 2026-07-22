# Styling with Tailwind CSS

Target Ark UI parts with utility classes and use `data-[state=...]` arbitrary variants to style state transitions.

```tsx
import { Accordion } from '@ark-ui/react/accordion'

export const Example = () => (
  <Accordion.Root className="w-full max-w-md">
    <Accordion.Item value="a" className="border-b border-gray-200">
      <Accordion.ItemTrigger
        className="flex w-full justify-between py-3 data-[state=open]:font-semibold"
      >
        Trigger
        <Accordion.ItemIndicator className="transition-transform data-[state=open]:rotate-180" />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent className="pb-3 text-gray-600">Content</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
)
```

## Notes

- Every rendered part exposes `data-scope` / `data-part` (component & part identity) and `data-state` / `data-disabled` / `data-invalid` (current state), which Tailwind's `data-[key=value]:` arbitrary variant syntax can target directly.
- Prefer `data-[state=open]:...` over conditional `className` logic in JS — Ark UI already reflects state onto the DOM node.
- Combine with `class-variance-authority` or `tailwind-variants` for larger part-based variant sets.
