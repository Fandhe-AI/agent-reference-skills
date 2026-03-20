# Password Input

Input field that toggles between visible and masked password text.

## Import

```tsx
// Snippet-based component — add via CLI:
// npx @chakra-ui/cli snippet add password-input
import { PasswordInput } from "@/components/ui/password-input"
```

## Usage

```tsx
<Field.Root>
  <Field.Label>Password</Field.Label>
  <PasswordInput placeholder="Enter password" />
</Field.Root>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultVisible` | `boolean` | `false` | Initial visibility state |
| `visible` | `boolean` | — | Controlled visibility state |
| `onVisibleChange` | `(visible: boolean) => void` | — | Callback when visibility toggles |
| `visibilityIcon` | `{ on: ReactNode; off: ReactNode }` | — | Custom icons for show/hide toggle |

## Notes

- This is a **snippet-based** component (not directly exported from `@chakra-ui/react`). It must be added to your project via the Chakra CLI.
- Accepts all standard `Input` props in addition to the above.

## Related

- [input.md](./input.md)
- [field.md](./field.md)
