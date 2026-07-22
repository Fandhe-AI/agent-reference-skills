# External State with RootProvider

Control a component from outside its own tree by creating its state with `use*()` and passing it to `Component.RootProvider`.

```tsx
import { Accordion, useAccordion } from '@ark-ui/react/accordion'

function App() {
  const accordion = useAccordion({
    multiple: true,
    defaultValue: ['ark-ui'],
  })

  return (
    <div>
      {/* Control the accordion from a sibling outside Accordion.Root */}
      <button onClick={() => accordion.setValue(['ark-ui'])}>Expand first item</button>

      <Accordion.RootProvider value={accordion}>
        <Accordion.Item value="ark-ui">
          <Accordion.ItemTrigger>Ark UI</Accordion.ItemTrigger>
          <Accordion.ItemContent>Headless component library.</Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.RootProvider>
    </div>
  )
}
```

## Notes

- When using `RootProvider`, omit `Component.Root` entirely — do not combine `useAccordion()` + `Accordion.RootProvider` with `Accordion.Root` in the same tree.
- This pattern enables cross-component control (e.g. opening a `Dialog` from a `Menu.Item`, or driving a `Tabs` from a router).
- For read-only access inside descendants without lifting state, prefer `use*Context()` hooks (e.g. `useAccordionContext()`) instead.
