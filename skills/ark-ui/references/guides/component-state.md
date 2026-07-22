# Component State

Three approaches to reading and controlling component state in Ark UI: `Component.Context`, `use*Context` hooks, and `useComponent` + `RootProvider`.

## Signature / Usage

```tsx
import { Accordion, useAccordion } from '@ark-ui/react/accordion'

const accordion = useAccordion({
  multiple: true,
  defaultValue: ['ark-ui'],
})

<Accordion.RootProvider value={accordion}>
  {/* accordion items */}
</Accordion.RootProvider>
```

```tsx
import { useDialogContext } from '@ark-ui/react/dialog'

function CloseButton() {
  const dialog = useDialogContext()
  return <button onClick={() => dialog.setOpen(false)}>Close</button>
}
```

## Notes

- `Component.Context` (e.g. `Avatar.Context`) gives inline access to state via render props; best for quick conditional rendering. Requires the `'use client'` directive when used with React Server Components.
- `use*Context` hooks (e.g. `useDialogContext`, `useMenuContext`) let any descendant read state without render-prop nesting; best for building reusable custom child components.
- `useComponent` + `RootProvider` (e.g. `useAccordion` + `Accordion.RootProvider`) lets you control a component from outside its tree (e.g. opening a dialog from a menu item). When using `RootProvider`, omit the `Root` component — do not use both together.

## Related

- [Composition](./composition.md)
- [Refs](./ref.md)
