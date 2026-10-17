---
source: https://ui.shadcn.com/docs/components/base/input-group
---

# Input Group

Add addons, buttons, and helper content to inputs.

## Signature / Usage

```bash
npx shadcn@latest add input-group
```

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

```tsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

Composition:

```text
InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText
```

## Options / Props

| Component | Prop | Type | Default |
| --- | --- | --- | --- |
| `InputGroup` | `className` | `string` | |
| `InputGroupAddon` | `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `InputGroupAddon` | `className` | `string` | |
| `InputGroupButton` | `size` | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"` | `"xs"` |
| `InputGroupButton` | `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `InputGroupButton` | `className` | `string` | |
| `InputGroupInput` | `className` | `string` | |
| `InputGroupTextarea` | `className` | `string` | |

## Notes

- For proper focus management, place `InputGroupAddon` after `InputGroupInput` or `InputGroupTextarea` in the DOM and use `align` to position it visually.
- For `InputGroupInput` use `inline-start` or `inline-end`; for `InputGroupTextarea` use `block-start` or `block-end`.
- `InputGroupInput` / `InputGroupTextarea` replace `<Input />` / `<Textarea />` inside a group; they use `data-slot="input-group-control"` for focus state handling and pass all other props through to the underlying component.
- `InputGroupAddon` can hold multiple `InputGroupButton` components and icons.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/input-group and https://ui.shadcn.com/docs/components/aria/input-group.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Input](./input.md)
- [Textarea](./textarea.md)
- [Button Group](./button-group.md)
