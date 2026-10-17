---
source: https://ui.shadcn.com/docs/components/base/tabs
---

# Tabs

A set of layered sections of content, known as tab panels, that are displayed one at a time.

## Signature / Usage

```bash
npx shadcn@latest add tabs
# manual: npm install @base-ui/react
```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `variant="line"` (on `TabsList`) | `"line"` | Line style |
| `orientation` (on `Tabs`) | `"vertical"` | Vertical tabs |
| `disabled` (on `TabsTrigger`) | `boolean` | Disable a trigger |

The docs' API Reference defers to Base UI Tabs: https://base-ui.com/react/components/tabs#api-reference

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Radix variant (https://ui.shadcn.com/docs/components/radix/tabs): installs `radix-ui`; same `defaultValue` / `orientation` usage.
- React Aria variant (https://ui.shadcn.com/docs/components/aria/tabs): installs `react-aria-components` and uses `defaultSelectedKey` instead of `defaultValue`.
- RTL example passes `dir` to both `Tabs` and `TabsList`.

## Related

- [Accordion](./accordion.md)
- [Navigation Menu](./navigation-menu.md)
