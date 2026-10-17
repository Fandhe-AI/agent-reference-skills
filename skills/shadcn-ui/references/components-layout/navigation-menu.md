---
source: https://ui.shadcn.com/docs/components/base/navigation-menu
---

# Navigation Menu

A collection of links for navigating websites.

## Signature / Usage

```bash
npx shadcn@latest add navigation-menu
# manual: npm install @base-ui/react
```

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

Link component via the `render` prop, styled as a trigger with `navigationMenuTriggerStyle()`:

```tsx
<NavigationMenuLink
  render={<Link href="/docs" />}
  className={navigationMenuTriggerStyle()}
>
  Documentation
</NavigationMenuLink>
```

Composition also includes `NavigationMenuIndicator` (sibling of `NavigationMenuList`).

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- The docs' API Reference defers to Base UI: https://base-ui.com/react/components/navigation-menu#api-reference
- Radix variant (https://ui.shadcn.com/docs/components/radix/navigation-menu): installs `radix-ui` and uses `asChild` on `NavigationMenuLink` instead of `render`.
- No React Aria variant of Navigation Menu exists under `/docs/components/aria/`.
- RTL: the example sets `dir` and `align={dir === "rtl" ? "end" : "start"}` on `NavigationMenu`, and `dir` on `NavigationMenuContent`.

## Related

- [Tabs](./tabs.md)
- [Breadcrumb](./breadcrumb.md)
