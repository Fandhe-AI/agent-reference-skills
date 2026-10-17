---
source: https://ui.shadcn.com/docs/components/base/sidebar
---

# Sidebar App Layout

Wrap an app in `SidebarProvider` and compose an `AppSidebar` from the sidebar parts.

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

## Notes

- Full composition per the docs: `SidebarProvider` > `Sidebar` (`SidebarHeader`, `SidebarContent` > `SidebarGroup` > `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton`, `SidebarFooter`, `SidebarRail`), plus `SidebarInset` for the `inset` variant and `SidebarTrigger`.
- `SidebarHeader` and `SidebarFooter` are sticky; `SidebarContent` scrolls between them.
- This is the shadcn/ui copy-in component (source in your `components/ui/sidebar.tsx`), distinct from sidebar components in skills ark-ui, chakra-ui and fandhe-frontend.
