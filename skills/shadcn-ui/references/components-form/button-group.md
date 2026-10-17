---
source: https://ui.shadcn.com/docs/components/base/button-group
---

# Button Group

A container that groups related buttons together with consistent styling.

## Signature / Usage

```bash
npx shadcn@latest add button-group
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
```

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

Composition:

```text
ButtonGroup
├── Button or Input
├── ButtonGroupSeparator
└── ButtonGroupText
```

Rendering a custom component as the text:

```tsx
<ButtonGroup>
  <ButtonGroupText render={<Label htmlFor="name" />}>Text</ButtonGroupText>
  <Input placeholder="Type something here..." id="name" />
</ButtonGroup>
```

## Options / Props

| Component | Prop | Type | Default |
| --- | --- | --- | --- |
| `ButtonGroup` | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `ButtonGroupSeparator` | `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |
| `ButtonGroupText` | `render` | `React.ReactElement` | |

## Notes

- `ButtonGroup` sets `role="group"`; label it with `aria-label` or `aria-labelledby`. Use Tab to move between buttons.
- Nest `<ButtonGroup>` components to create groups with spacing.
- Buttons with variant `outline` need no separator since they have a border; for other variants a `ButtonGroupSeparator` is recommended. A split button is two buttons separated by a `ButtonGroupSeparator`.
- Use `ButtonGroup` to group buttons that perform an action; use `ToggleGroup` to group buttons that toggle a state.
- Radix variant (https://ui.shadcn.com/docs/components/radix/button-group) installs `radix-ui` and uses `asChild` on `ButtonGroupText` instead of `render`. React Aria variant: https://ui.shadcn.com/docs/components/aria/button-group.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Button](./button.md)
- [Input Group](./input-group.md)
