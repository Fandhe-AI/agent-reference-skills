---
source: https://ui.shadcn.com/docs/components/base/sidebar
---

# Sidebar

A composable, themeable and customizable sidebar component.

## Signature / Usage

```bash
npx shadcn@latest add sidebar
```

```tsx
// app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
```

```tsx
// components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
```

Composition:

```text
SidebarProvider
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   │   └── SidebarGroup (SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu)
│   │       └── SidebarMenuItem (SidebarMenuButton, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSub)
│   ├── SidebarFooter
│   └── SidebarRail
├── SidebarInset
└── SidebarTrigger
```

Also documented: `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuSkeleton`.

## Options / Props

`SidebarProvider`:

| Name | Type | Description |
| --- | --- | --- |
| `defaultOpen` | `boolean` | Default open state of the sidebar |
| `open` | `boolean` | Open state of the sidebar (controlled) |
| `onOpenChange` | `(open: boolean) => void` | Sets open state of the sidebar (controlled) |

`Sidebar`:

| Name | Type | Description |
| --- | --- | --- |
| `side` | `left` or `right` | The side of the sidebar |
| `variant` | `sidebar`, `floating`, or `inset` | The variant of the sidebar |
| `collapsible` | `offcanvas`, `icon`, or `none` | Collapsible state: `offcanvas` slides in from the left or right, `icon` collapses to icons, `none` is non-collapsible |

`useSidebar()` returns:

| Property | Type | Description |
| --- | --- | --- |
| `state` | `expanded` or `collapsed` | The current state of the sidebar |
| `open` | `boolean` | Whether the sidebar is open |
| `setOpen` | `(open: boolean) => void` | Sets the open state of the sidebar |
| `openMobile` | `boolean` | Whether the sidebar is open on mobile |
| `setOpenMobile` | `(open: boolean) => void` | Sets the open state of the sidebar on mobile |
| `isMobile` | `boolean` | Whether the sidebar is on mobile |
| `toggleSidebar` | `() => void` | Toggles the sidebar. Desktop and mobile |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Width: edit `SIDEBAR_WIDTH = "16rem"` / `SIDEBAR_WIDTH_MOBILE = "18rem"` in `sidebar.tsx`, or set `--sidebar-width` / `--sidebar-width-mobile` via `style` on `SidebarProvider` for multiple sidebars.
- Keyboard shortcut: `cmd+b` (Mac) / `ctrl+b` (Windows); configured by `SIDEBAR_KEYBOARD_SHORTCUT = "b"`.
- With `variant="inset"`, wrap main content in `SidebarInset`.
- `SidebarMenuButton` renders a button by default; use `render={<a href="#" />}` for links and `isActive` to mark the active item. Make a `SidebarGroup` collapsible by wrapping it in `Collapsible` and using `SidebarGroupLabel render={<CollapsibleTrigger />}`.
- Theming uses `--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` (the docs' Theming snippet shows HSL values in `:root` and `.dark`).
- RTL changelog: add `dir` prop to `Sidebar` (forwarded to `SheetContent`), `data-side={side}` on the container, data-attribute positioning classes, and `rtl:rotate-180` on the `SidebarTrigger` icon; then `<Sidebar dir="rtl" side="right">`.
- Radix variant (https://ui.shadcn.com/docs/components/radix/sidebar): uses `asChild` (e.g. `SidebarMenuButton asChild`) instead of `render`.
- React Aria variant: https://ui.shadcn.com/docs/components/aria/sidebar (installs `react-aria-components`).

## Related

- [Collapsible](./collapsible.md)
- [Resizable](./resizable.md)
