---
source: https://ui.shadcn.com/docs/components/base/menubar
---

# Menubar

A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.

## Signature / Usage

```bash
npx shadcn@latest add menubar
# manual
npm install @base-ui/react
```

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Share</MenubarItem>
        <MenubarItem>Print</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Notes

- Also exported in the official demo: `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`; `MenubarItem` accepts `disabled` and `inset`.
- See the Base UI Menubar API reference (https://base-ui.com/react/components/menubar#api-reference).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/menubar. No React Aria variant of Menubar exists in the docs.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dropdown Menu](./dropdown-menu.md)
- [Context Menu](./context-menu.md)
