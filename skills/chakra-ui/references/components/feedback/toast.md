# Toast / Toaster

A brief notification message displayed in response to a user action, rendered outside the normal document flow.

## Import

```tsx
import { createToaster, Toaster, Toast } from "@chakra-ui/react"
```

## Usage

```tsx
// 1. Create a toaster instance (shared across the app)
export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
})

// 2. Render the Toaster component once (e.g. in layout)
export const ToasterProvider = () => (
  <Portal>
    <Toaster toaster={toaster} insetInline={{ mdDown: "4" }}>
      {(toast) => (
        <Toast.Root width={{ md: "sm" }}>
          {toast.type === "loading" ? (
            <Spinner size="sm" color="blue.solid" />
          ) : (
            <Toast.Indicator />
          )}
          <Stack gap="1" flex="1" maxWidth="100%">
            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </Stack>
          {toast.action && (
            <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
          )}
          {toast.closable && <Toast.CloseTrigger />}
        </Toast.Root>
      )}
    </Toaster>
  </Portal>
)

// 3. Trigger toasts imperatively
toaster.create({ title: "Saved", type: "success" })
toaster.create({ description: "Loading...", type: "loading" })
toaster.promise(myPromise, {
  loading: { title: "Uploading..." },
  success: { title: "Done!" },
  error: { title: "Failed" },
})
```

## Props

### Toaster

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toaster` | `CreateToasterReturn` | — | **Required.** The toaster instance from `createToaster()` |
| `dir` | `'ltr' \| 'rtl'` | `"ltr"` | Text direction |

### Toast.Root (inside Toaster render prop)

`toast` object fields:

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Toast title |
| `description` | `string` | Toast description |
| `type` | `"info" \| "success" \| "warning" \| "error" \| "loading"` | Toast type |
| `duration` | `number` | Auto-dismiss duration in ms |
| `closable` | `boolean` | Whether to show a close button |
| `action` | `{ label: string; onClick: () => void }` | Optional action button |
| `onStatusChange` | `(details) => void` | Lifecycle callback |

## Notes

- `createToaster()` accepts `placement` (`"top"`, `"bottom-end"`, etc.) and `pauseOnPageIdle`
- Imperative API: `toaster.create()`, `toaster.success()`, `toaster.error()`, `toaster.loading()`, `toaster.promise()`, `toaster.update()`, `toaster.dismiss()`, `toaster.pause()`, `toaster.resume()`
- `toaster.isVisible(id)` checks if a specific toast is currently shown
- Render `<Toaster>` once at the app root inside a `<Portal>`

## Related

- [Alert](./alert.md)
