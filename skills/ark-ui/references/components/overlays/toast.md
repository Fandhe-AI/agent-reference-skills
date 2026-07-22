# Toast

A message that appears on the screen to provide feedback on an action.

## Anatomy

- `Toast.Root` - main container (rendered per-toast by the `Toaster`)
- `Toast.Title` - toast heading
- `Toast.Description` - toast body text
- `Toast.ActionTrigger` - action button
- `Toast.CloseTrigger` - close button

## Signature / Usage

```jsx
import { createToaster, Toaster, Toast } from '@ark-ui/react'

const toaster = createToaster({ placement: 'bottom-end' })

toaster.success({
  title: 'Success!',
  description: 'Your changes have been saved.',
})

<Toaster toaster={toaster}>
  {(toast) => (
    <Toast.Root>
      <Toast.Title>{toast.title}</Toast.Title>
      <Toast.Description>{toast.description}</Toast.Description>
      <Toast.CloseTrigger />
    </Toast.Root>
  )}
</Toaster>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | 'success' \| 'error' \| 'warning' \| 'info' | — | Toast type/category |
| duration | number \| Infinity | — | Time before auto-dismiss; `Infinity` keeps it visible until manually dismissed |
| placement | 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| ... | — | Screen position for the toaster |
| max | number | — | Maximum number of visible toasts; extras are queued |

## Notes

- Toasts are created via `toaster.create()` or shorthand methods (`toaster.success()`, `toaster.error()`, etc.), configured by a `createToaster()` engine and rendered through `Toaster`.
- Avoid calling toast methods directly inside React effects; wrap in `queueMicrotask()` to prevent `flushSync` warnings.
- Supports promise handling via `toaster.promise()` for async operations.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Dialog](./dialog.md)
- [Popover](./popover.md)
