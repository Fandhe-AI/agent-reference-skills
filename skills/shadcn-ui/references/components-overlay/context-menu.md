---
source: https://ui.shadcn.com/docs/components/base/context-menu
---

# Context Menu

Displays a menu of actions triggered by a right click.

## Signature / Usage

```bash
npx shadcn@latest add context-menu
# manual
npm install @base-ui/react
```

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

Composition:

```text
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuCheckboxItem
    │   └── ContextMenuCheckboxItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuRadioGroup
    │       ├── ContextMenuRadioItem
    │       └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuGroup
                ├── ContextMenuItem
                └── ContextMenuItem
```

## Notes

- Also exported: `ContextMenuShortcut`; `ContextMenuItem` accepts `disabled` and `variant="destructive"` in the official demo.
- The official page has no props table; see the Base UI Context Menu API reference (https://base-ui.com/react/components/context-menu#api-reference).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/context-menu. React Aria variant: https://ui.shadcn.com/docs/components/aria/context-menu.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dropdown Menu](./dropdown-menu.md)
- [Menubar](./menubar.md)
