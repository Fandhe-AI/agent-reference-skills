# Toast

Display ephemeral notifications using the `toaster` singleton and `Toaster` component.

```tsx
// 1. Add the snippet
// npx @chakra-ui/cli snippet add toaster

// 2. Render Toaster once at the app root
import { Toaster } from "@/components/ui/toaster"

export function App() {
  return (
    <>
      <Toaster />
      {/* rest of app */}
    </>
  )
}

// 3. Trigger toasts from anywhere
import { toaster } from "@/components/ui/toaster"
import { Button, Stack } from "@chakra-ui/react"

export function ToastExamples() {
  return (
    <Stack direction="row" gap="3">
      <Button
        onClick={() =>
          toaster.create({
            title: "Saved",
            description: "Your changes have been saved.",
            type: "success",
            closable: true,
          })
        }
      >
        Success Toast
      </Button>

      <Button
        onClick={() =>
          toaster.create({
            title: "Confirm",
            description: "Do you want to undo?",
            action: {
              label: "Undo",
              onClick: () => console.log("Undone"),
            },
          })
        }
      >
        Toast with Action
      </Button>

      <Button
        onClick={() => {
          const promise = fetch("/api/save")
          toaster.promise(promise, {
            loading: { title: "Saving..." },
            success: { title: "Saved!" },
            error:   { title: "Failed to save" },
          })
        }}
      >
        Promise Toast
      </Button>
    </Stack>
  )
}
```

## Notes

- `toaster` is a module-level singleton; no React context or hook needed to call it
- `type` options: `"info"`, `"success"`, `"warning"`, `"error"`, `"loading"`
- `toaster.dismiss(id)` dismisses a specific toast; `toaster.dismiss()` dismisses all
- `toaster.promise()` automatically transitions between loading, success, and error states
