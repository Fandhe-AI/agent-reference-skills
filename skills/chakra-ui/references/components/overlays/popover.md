# Popover

Floating interactive panel anchored to a trigger element.

## Usage

```tsx
import { Popover } from "@chakra-ui/react"

<Popover.Root>
  <Popover.Trigger asChild>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Portal>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Arrow>
          <Popover.ArrowTip />
        </Popover.Arrow>
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Body>Popover content goes here.</Popover.Body>
        <Popover.CloseTrigger />
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
```

### Multiple Triggers

Don't mount a popover per button. Put `value` on each `Trigger` under one `Root`. Click another trigger and the same popover moves to it. Track the active trigger with `triggerValue` and `onTriggerValueChange` on `Root`. If the target is not a button, use `positioning.getAnchorRect`.

```tsx
<Popover.Root>
  <Popover.Trigger asChild value="profile">
    <Button size="sm" variant="outline">Profile</Button>
  </Popover.Trigger>
  <Popover.Trigger asChild value="settings">
    <Button size="sm" variant="outline">Settings</Button>
  </Popover.Trigger>
  <Portal>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Body>
          <Popover.Context>
            {(api) => <>Opened from the {api.triggerValue} trigger.</>}
          </Popover.Context>
        </Popover.Body>
      </Popover.Content>
    </Popover.Positioner>
  </Portal>
</Popover.Root>
```

## Options / Props

### Popover.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the popover |
| `modal` | `boolean` | `false` | Whether to block interaction outside |
| `autoFocus` | `boolean` | `true` | Whether to auto-focus the first interactive element |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnInteractOutside` | `boolean` | `true` | Close on outside click |
| `portalled` | `boolean` | `true` | Whether to render in a portal |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `positioning` | `PositioningOptions` | `{ placement: "bottom" }` | Floating UI positioning options |
| `lazyMount` | `boolean` | `false` | Mount content only when opened |
| `unmountOnExit` | `boolean` | `false` | Unmount content when closed |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `hideMode` | `"display-none" \| "activity"` | `"display-none"` | How kept-mounted content is hidden when closed. `"activity"` uses React 19 `Activity` and pauses effects (requires React 19+) |
| `translations` | `IntlTranslations` | — | Localized strings for the accessibility elements and their states |
| `finalFocusEl` | `() => MaybeElement` | — | Element to receive focus when the popover is closed |
| `restoreFocus` | `boolean` | `true` | Whether to restore focus to the element that had focus before the popover was opened |
| `persistentElements` | `(() => Element \| null)[]` | — | Elements that should not have pointer-events disabled and should not trigger the dismiss event |
| `triggerValue` | `string` | — | Controlled trigger value (multiple triggers) |
| `onTriggerValueChange` | `(details: TriggerValueChangeDetails) => void` | — | Called when the trigger value changes |

### Popover.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value that identifies this specific trigger |

## Notes

- Sub-parts: `Root`, `Trigger`, `Anchor`, `Content`, `Positioner`, `Arrow`, `ArrowTip`, `Body`, `Header`, `Footer`, `Title`, `Description`, `CloseTrigger`, `Indicator`.
- Sizes: `xs`, `sm`, `md`, `lg`.
- Unlike `Tooltip`, `Popover` supports interactive content (buttons, forms, links) inside.
- Use `Popover.Anchor` to anchor the popover to a different element than the trigger.
- Wrap `Popover.Positioner` in `Portal` to prevent overflow clipping.

## Related

- [tooltip.md](./tooltip.md)
- [hover-card.md](./hover-card.md)
- [dialog.md](./dialog.md)
