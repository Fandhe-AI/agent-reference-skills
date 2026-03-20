# CloseButton

A button for dismissing or closing UI elements, renders an `×` icon by default.

## Import

```tsx
import { CloseButton } from "@chakra-ui/react"
```

## Usage

```tsx
<CloseButton />
```

## Props

`CloseButton` inherits all `Button` / `IconButton` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"ghost" \| "outline" \| "subtle" \| "solid"` | `"ghost"` | Visual style |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | — | Button size |
| `disabled` | `boolean` | — | Disables the button |
| `aria-label` | `string` | `"Close"` | Accessibility label |

## Notes

- Renders an `×` (`LuX`) icon by default; override by passing children
- Used inside overlays such as Dialogs, Drawers, Alerts, and Toasts
- `aria-label` defaults to `"Close"` for accessibility

## Related

- [Button](./button.md)
- [IconButton](./icon-button.md)
