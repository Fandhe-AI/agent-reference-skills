# Cursor (Motion+)

React component for custom cursors, follow-along effects and magnetic snapping to UI elements. Built on Motion's layout animations.

## Signature / Usage

```tsx
import { Cursor } from "motion-plus/react"

<Cursor />
```

Rendering it hides the browser's default cursor; removing it restores the cursor.

```tsx
{isCursorVisible ? <Cursor /> : null}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `className` | string | CSS class for styling the cursor |
| `style` | CSSProperties | Inline styles; default cursor is neutral grey |

```tsx
<Cursor className="my-cursor" style={{ backgroundColor: "red" }} />
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- Two modes: replace the default cursor, or a "follow" cursor effect. It adapts when hovering links, buttons, selectable text, and when pressed; can snap magnetically to interactive elements.
- Customisable with CSS, Motion variants and custom React components; can be disabled for reduced motion.
- Mode, magnetic and variant props are in the members-only part of the page and are not documented here.
- A vanilla JS version is documented at the same page URL.

## Related

- [motion](./motion.md)
