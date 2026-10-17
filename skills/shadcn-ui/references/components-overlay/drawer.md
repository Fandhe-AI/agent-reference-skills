---
source: https://ui.shadcn.com/docs/components/base/drawer
---

# Drawer

A drawer component for React, built on Base UI Drawer (replaces Vaul in the base variant).

## Signature / Usage

```bash
npx shadcn@latest add drawer
# manual
npm install @base-ui/react
```

Add to global styles (iOS Safari overlay needs a positioned `body`):

```css
body {
  position: relative;
}
```

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">{/* Content here */}</div>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

Composition:

```text
Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    └── DrawerFooter
```

`DrawerContent` composes the portal, overlay, viewport, and popup from Base UI. `DrawerPortal`, `DrawerOverlay`, and `DrawerSwipeHandle` are also exported.

## Options / Props

Props documented on the official page (see Base UI Drawer API reference for the full list):

| Name | Type | Description |
|------|------|-------------|
| swipeDirection | `"up" \| "right" \| "down" \| "left"` | Side of the drawer. |
| showSwipeHandle | boolean | Renders a swipe handle. |
| modal | `false \| "trap-focus"` | `false` allows interaction with the page; `"trap-focus"` keeps focus inside but leaves scroll and pointer unrestricted. |
| disablePointerDismissal | boolean | Prevents closing on outside presses. |
| snapPoints | `(number \| string)[]` | Numbers in 0-1 are viewport fractions, numbers > 1 are pixels, strings support `px` and `rem`. Vertical drawers only. |
| snapPoint / onSnapPointChange | controlled snap point | Track the active snap point. |
| open / onOpenChange | controlled state | Controlled open state. |
| onOpenChangeComplete | `(open) => void` | Replaces Vaul `onAnimationEnd`. |
| initialFocus | `false` | On `DrawerContent`; replaces Vaul `onOpenAutoFocus` preventDefault. |
| snapToSequentialPoints | boolean | Replaces Vaul `snapToSequentialPoint`. |

Styling variables (set on `DrawerContent`, overlay variable on `[data-slot=drawer-overlay]`):

| Variable | Default | Description |
|----------|---------|-------------|
| `--drawer-inset` | `0px` | Floats the drawer from the viewport edges. |
| `--drawer-bleed-background` | `var(--color-popover)` | Fills the gap behind the drawer on swipe overshoot. |
| `--drawer-overlay-min-opacity` | `0` | Minimum overlay opacity. Defaults to `0.5` when snap points are active. |

Data attributes: `data-swipe-direction` (`up`/`right`/`down`/`left`), `data-swipe-axis` (`x`/`y`), `data-snap-points`, `data-expanded`, `data-swiping`, `data-nested-drawer-open`.

## Notes

- Default sizing: a vertical drawer is content-sized and capped at `calc(100dvh - 6rem)`; a side drawer spans `75%` of viewport width, or `24rem` on larger screens. Customize with `h-*` / `max-h-*` / `w-*` / `max-w-*` on `DrawerContent`; scope per axis with `data-[swipe-axis=y]:max-h-[50vh] data-[swipe-axis=x]:w-96`. Avoid `h-full` in content-sized drawers.
- Migrating from Vaul (base variant): `npm install vaul` becomes `npm install @base-ui/react`; `direction="bottom"` becomes `swipeDirection="down"` (`top` becomes `up`); `asChild` becomes `render`; `activeSnapPoint` / `setActiveSnapPoint` become `snapPoint` / `onSnapPointChange`; `dismissible={false}` becomes `disablePointerDismissal`; `handleOnly`, `repositionInputs`, `shouldScaleBackground` have no one-to-one replacement; `data-vaul-drawer-direction` selectors become `data-swipe-direction`.
- A responsive pattern combines `Dialog` (desktop) and `Drawer` (mobile) with a `useMediaQuery("(min-width: 768px)")` hook.
- Base UI is the canonical variant. The Radix variant (https://ui.shadcn.com/docs/components/radix/drawer) still uses Vaul (`npm install vaul`). The React Aria variant (https://ui.shadcn.com/docs/components/aria/drawer) installs `@base-ui/react`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dialog](./dialog.md)
- [Sheet](./sheet.md)
