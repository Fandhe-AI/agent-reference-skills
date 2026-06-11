# Form Field with Input

Compose Input with Field for accessible labels, helper text, and error validation.

```tsx
import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react"
import { useState } from "react"

export function ContactForm() {
  const [error, setError] = useState(false)

  return (
    <Stack gap="4" maxW="md">
      {/* Basic field with label */}
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input placeholder="Jane Doe" />
      </Field.Root>

      {/* Field with helper text */}
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input type="email" placeholder="jane@example.com" />
        <Field.HelperText>We'll never share your email.</Field.HelperText>
      </Field.Root>

      {/* Field with validation error */}
      <Field.Root invalid={error}>
        <Field.Label>Username</Field.Label>
        <Input
          placeholder="username"
          onChange={(e) => setError(e.target.value.length < 3)}
        />
        <Field.ErrorText>Must be at least 3 characters</Field.ErrorText>
      </Field.Root>

      {/* Required field */}
      <Field.Root required>
        <Field.Label>
          Message <Field.RequiredIndicator />
        </Field.Label>
        <Textarea placeholder="Your message..." />
        <Field.HelperText>Max 500 characters</Field.HelperText>
      </Field.Root>

      <Button type="submit" colorPalette="blue">Send</Button>
    </Stack>
  )
}
```

## Notes

- Labels are provided as `Field.Label` children; `Field.Root` has no `label` prop
- `Field.Root` renders the appropriate ARIA attributes (`aria-invalid`, `aria-describedby`) automatically
- `Field.ErrorText` is only visible when `invalid` is true
- `invalid`, `required`, and `disabled` props on `Field.Root` propagate to child inputs via context
- Input `variant` options: `outline` (default), `subtle`, `flushed`
