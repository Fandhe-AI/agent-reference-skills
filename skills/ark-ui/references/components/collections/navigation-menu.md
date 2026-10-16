# Navigation Menu

A collection of links and menus for website navigation. Complies with the Navigation Menubar WAI-ARIA design pattern.

## Signature / Usage

```tsx
import { NavigationMenu } from "@ark-ui/react/navigation-menu"

export const Basic = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item value="products">
        <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
          <NavigationMenu.Link href="#commerce">Commerce</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item value="docs">
        <NavigationMenu.Link href="#docs" current>Documentation</NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Indicator />
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
```

Anatomy:

```tsx
<NavigationMenu.Root>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger />
      <NavigationMenu.ItemIndicator />
      <NavigationMenu.Content>
        <NavigationMenu.Link />
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Indicator>
      <NavigationMenu.Arrow />
    </NavigationMenu.Indicator>
  </NavigationMenu.List>
  <NavigationMenu.ViewportPositioner>
    <NavigationMenu.Viewport />
  </NavigationMenu.ViewportPositioner>
</NavigationMenu.Root>
```

Shared animated panel (render `Viewport` so one panel resizes between triggers), vertical (`orientation="vertical"`), controlled (`value` / `onValueChange`), `RootProvider` + `useNavigationMenu`, and `NavigationMenu.Context` / `useNavigationMenuContext` are also supported.

Controlled:

```tsx
const [value, setValue] = useState<string>("")

<NavigationMenu.Root value={value} onValueChange={(e) => setValue(e.value)}>
  {/* ... */}
</NavigationMenu.Root>
```

Custom (client-side routing) links via `asChild`:

```tsx
import { Link as RouterLink } from "react-router-dom"
import { NavigationMenu } from "@ark-ui/<framework>/navigation-menu"

export const MenuLink = (props: NavigationMenu.LinkProps) => (
  <NavigationMenu.Link {...props} asChild>
    <RouterLink to={props.href ?? "#"}>{props.children}</RouterLink>
  </NavigationMenu.Link>
)
```

## Options / Props

Root:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `defaultValue` | `string` | — | Controlled / initial active item value |
| `onValueChange` | `(details: ValueChangeDetails) => void` | — | Called when the value changes |
| `orientation` | `'horizontal' \| 'vertical'` | `"horizontal"` | Orientation |
| `openDelay` | `number` | `200` | Delay before the menu opens |
| `closeDelay` | `number` | `300` | Delay before the menu closes |
| `disableClickTrigger` | `boolean` | — | Disable the click trigger |
| `disableHoverTrigger` | `boolean` | — | Disable the hover trigger |
| `disablePointerLeaveClose` | `boolean` | — | Disable closing on pointer leave |
| `hideMode` | `HideMode` | `'display-none'` | `'display-none'` (HTML `hidden`, effects stay alive) or `'activity'` (React 19 `<Activity mode="hidden">`, requires React 19+) |
| `lazyMount` | `boolean` | `false` | Lazy mounting |
| `unmountOnExit` | `boolean` | `false` | Unmount on exit |
| `translations` | `IntlTranslations` | — | Localized accessibility strings |
| `id` / `ids` | `string` / `Partial<{ root, list, item, trigger(value), content(value), viewport }>` | — | Element ids |
| `asChild` | `boolean` | — | Render the child element instead |

Parts:

| Part | Prop | Type | Default | Description |
|------|------|------|---------|-------------|
| Item | `value` (required) | `string` | — | Item value |
| Item / Trigger | `disabled` | `boolean` | — | Disable the item |
| Content | `value` | `string` | — | Item this content belongs to |
| Link | `current` | `boolean` | — | Marks the current page; renders `aria-current="page"` and `data-current` |
| Link | `closeOnClick` | `boolean` | `true` | Close the menu on click |
| Link | `onSelect` | `(event: CustomEvent<any>) => void` | — | Called when the link is selected |
| Link | `value` | `string` | — | Item this link belongs to |
| ViewportPositioner | `align` | `'center' \| 'start' \| 'end'` | — | Placement for `--viewport-x` / `--viewport-y` |
| RootProvider | `value` (required) | `UseNavigationMenuReturn` | — | Return value of `useNavigationMenu` |

Context API: `value`, `setValue(value)`, `open`, `isViewportRendered`, `getViewportNode()`, `orientation`, `reposition()`.

## Notes

- Keyboard: `ArrowRight` / `ArrowLeft` move between triggers (horizontal) or links inside content; `ArrowDown` / `ArrowUp` move between triggers in vertical orientation; `Home` / `End` go to first / last trigger or link.
- CSS variables on `Root` and `Viewport`: `--trigger-width`, `--trigger-height`, `--trigger-x`, `--trigger-y`, `--viewport-width`, `--viewport-height`, `--viewport-x`, `--viewport-y`. `Indicator` slides using `--trigger-x` / `--trigger-width`.
- Data attributes: `data-scope="navigation-menu"`, `data-part`, `data-state="open"|"closed"`, `data-orientation`, `data-value`, `data-disabled`, `data-current` (Link).
- Large menus: constrain the viewport with `max-height: min(var(--viewport-height), 70vh)` and scroll the content.
- Use `RootProvider` instead of `Root` when using `useNavigationMenu`; do not use both.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead of `@ark-ui/react`.
- The asChild link example is verbatim from the official docs, where `@ark-ui/<framework>/navigation-menu` is a placeholder; in React use `@ark-ui/react/navigation-menu` (as in the basic example).
- Source: https://ark-ui.com/react/docs/components/navigation-menu (Ark UI @ark-ui/react 5.39.3)

## Related

- [Menu](./menu.md)
- [Tree View](./tree-view.md)
