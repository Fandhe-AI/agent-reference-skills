# Components Overview

Chakra UI provides accessible, modern, and easy-to-style UI components for React applications.

## Key Concepts

### Component Philosophy

- **Accessibility**: All components are designed with WCAG standards in mind
- **Composition**: Components can be combined and composed together
- **Animation**: Built-in CSS animation support
- **Color Mode**: Automatic light/dark mode support
- **Server Components**: Full support for server-side rendering patterns
- **Testing**: Components designed to be easily testable

### Design Tokens

Chakra UI uses a comprehensive token system:

| Token Type | Range |
|-----------|-------|
| Colors | Extensive palette (gray, red, orange, yellow, green, teal, blue, cyan, purple, pink) |
| Spacing | 0.25rem to 24rem |
| Typography | 2xs (0.625rem) to 9xl (8rem) |
| Border Radius | xs to full |
| Shadows | xs to 2xl |

### Component Categories

| Category | Examples |
|----------|----------|
| Layout | Flex, Grid, Stack, Box, Container, Center |
| Typography | Text, Heading, Link, Code, Blockquote |
| Forms | Input, Select, Checkbox, Radio, Textarea, Slider |
| Buttons | Button, IconButton, CloseButton |
| Collections | Combobox, Listbox, Select, TreeView |
| Overlays | Dialog, Drawer, Menu, Popover, Tooltip |
| Feedback | Alert, Toast, Spinner, Progress, Skeleton |
| Data Display | Avatar, Badge, Card, Table, Timeline |

## Notes

- All components support the `as` prop for semantic HTML customization
- All components support the `asChild` prop for composition patterns
- Components use CSS custom properties for theming

## Related

- [Composition](./composition.md)
- [Animation](./animation.md)
- [Color Mode](./color-mode.md)
- [Server Components](./server-components.md)
- [Testing](./testing.md)
