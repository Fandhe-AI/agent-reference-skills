---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/link/
---

# Router Link

An Expo Router API that provides `Link`, `Redirect`, preview, menu, and zoom transition components for navigating between routes.

## Signature / Usage

```tsx
import { Link } from 'expo-router';

export default function Page() {
  return <Link href="/about">About</Link>;
}
```

```js
import { Link, Redirect } from 'expo-router';
```

## Options / Props

### `Link`

Renders a link using `href` to another route. By default it accepts children and wraps them in a `<Text>` component. Uses an anchor tag (`<a>`) on web and performs client-side navigation (works with single-page apps and static rendering). Inherits `Omit<TextProps, 'href'>` and `WebAnchorProps`. Platforms: Android, iOS, tvOS, Web.

| Name | Type | Description |
| --- | --- | --- |
| `href` | `string \| HrefObject` | The path of the route to navigate to: a full path like `/profile/settings`, a relative path like `../settings`, or an object with `pathname` and optional `params`. |
| `asChild` | `boolean` | Forwards all props to the first child of the `Link`. The child must accept `onPress` or `onClick`; `href` and `role` are also passed to the child. |
| `className` | `string` | On native, usable with CSS interop tools like Nativewind. On web, sets the HTML `class` directly. |
| `dangerouslySingular` | `SingularOptions` | When navigating in a Stack, screens in the history that match the uniqueness constraint are removed if the target is valid. With `push`, the history is filtered even if no navigation occurs. |
| `dismissTo` | `boolean` | In a stack, dismisses screens until the provided `href` is reached; if not found, replaces the current screen with `href`. |
| `onPress` | `(event: MouseEvent<HTMLAnchorElement, MouseEvent> \| GestureResponderEvent) => void` | Called on press. |
| `prefetch` | `boolean` | Prefetches the route when the component is rendered on a focused screen. |
| `push` | `boolean` | Always pushes a new route, never pops or replaces an existing route. |
| `ref` | `Ref<Text>` | Ref to the underlying `Text`. |
| `relativeToDirectory` | `boolean` | Relative URL references are relative to the directory or the document. By default, relative paths are relative to the document. |
| `replace` | `boolean` | Removes the current route from the history and replaces it with the specified URL. |
| `withAnchor` | `boolean` | Replaces the initial screen with the current route. |

### `Redirect`

Redirects to the `href` as soon as the component is mounted. Platforms: Android, iOS, tvOS, Web.

| Name | Type | Description |
| --- | --- | --- |
| `href` | `Href` | The path of the route to navigate to (string or object with `pathname` and optional `params`). |
| `relativeToDirectory` | `boolean` | Relative to the directory or the document (default document). |
| `withAnchor` | `boolean` | Replaces the initial screen with the current route. |

### `Link.AppleZoom` (iOS 18+)

When used inside a `Link`, a zoom transition is used when navigating to the link's href.

| Name | Type | Description |
| --- | --- | --- |
| `alignmentRect` | `{ height: number, width: number, x: number, y: number }` | Rectangle used for the zoom transition's alignment, specified in the zoomed screen's coordinate space. |

`Link.AppleZoomTarget` (iOS 18+; `children: ReactNode`) defines the target for an Apple zoom transition.

### `Link.Menu` (iOS)

Groups context menu actions for a link. If multiple `Link.Menu` components are used within a single `Link`, only the first is rendered. Only `Link.MenuAction` and `Link.Menu` are allowed as children.

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Menu actions. |
| `destructive` | `boolean` | Displays the menu item as destructive. Deprecated: use `palette` prop instead. |
| `displayAsPalette` | `boolean` | Deprecated: use `inline` prop instead. |
| `displayInline` | `boolean` | Inline display. |
| `elementSize` | `'auto' \| 'small' \| 'medium' \| 'large'` | Preferred size of the menu elements (iOS 16.0+). Ignored when `palette` is used. |
| `icon` | `SFSymbols7_0` | SF Symbol displayed alongside the menu item. |
| `image` | `SharedRef<'image', Record<never, never>> \| null` | Custom image from the `useImage()` hook of `expo-image`. Takes priority over `icon` when both are provided. |
| `inline` | `boolean` | Displays the menu inline (not collapsed). |
| `palette` | `boolean` | Displays the menu as a palette (one row). `elementSize` is ignored and all items are `small`. Palette menus are only supported in submenus. |
| `subtitle` | `string` | Subtitle for the submenu. Does not appear on `inline` menus. |
| `title` | `string` | Title of the menu item. |

### `Link.MenuAction` (iOS)

A context menu action for a link; use only as a child of `Link.Menu` or `LinkMenu`.

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Title of the menu item. |
| `destructive` | `boolean` | Displays the item as destructive. |
| `disabled` | `boolean` | Disabled and not selectable. |
| `discoverabilityLabel` | `string` | Elaborated title that explains the purpose of the action. |
| `hidden` | `boolean` (default `false`) | Whether the menu element is hidden. |
| `icon` | `SFSymbols7_0` | SF Symbol displayed alongside the item. |
| `image` | `SharedRef<'image', Record<never, never>> \| null` | Custom image from `useImage()`. Takes priority over `icon`. |
| `imageRenderingMode` | `'template' \| 'original'` | `'template'`: iOS applies tint color; `'original'`: preserves original icon colors. |
| `isOn` | `boolean` | Displays the item as selected. |
| `onPress` | `() => void` | Press handler. |
| `subtitle` | `string` | Subtitle. Deprecated: use `children` prop instead. |
| `title` | `string` | Title of the menu item. |
| `unstable_keepPresented` | `boolean` | Keeps the menu presented after the action is selected. Unstable: selecting an action recreates the menu, closing opened submenus and resetting the scroll position. |

### `Link.Preview` (iOS)

Renders and customizes the link preview. Without props it renders a preview of the `href` passed to the `Link`. If multiple `Link.Preview` components are used within a single `Link`, only the first is rendered.

| Name | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Custom preview content. |
| `style` | `LinkPreviewStyle` | Custom styles for the preview container; some styles may not work as they are limited or reset by the native view. |

### `Link.Trigger` (iOS)

Serves as the trigger for a link; its content is rendered as part of the base link. If multiple are used within a single `Link`, only the first is rendered.

| Name | Type | Description |
| --- | --- | --- |
| `withAppleZoom` | `boolean` | Shorthand for enabling the Apple Zoom Transition (iOS 18+). Wraps the trigger with `Link.AppleZoom`; throws if another `Link.AppleZoom` is already inside `Link.Trigger`. |

### Hooks

| Hook | Platforms | Description |
| --- | --- | --- |
| `useIsPreview()` | Android, iOS, tvOS, Web | Returns `boolean`: `true` if the current route is rendered inside a preview. |
| `usePreventZoomTransitionDismissal(_options?)` | iOS | Limits the screen area where interactive dismissal gestures are allowed for zoom transitions. Call from the destination screen. Only one instance per screen; the last to render takes effect. `_options`: `UsePreventZoomTransitionDismissalOptions`. |

`UsePreventZoomTransitionDismissalOptions`: `unstable_dismissalBoundsRect?: DismissalBoundsRect`. `DismissalBoundsRect` has optional `maxX`, `maxY`, `minX`, `minY` (`number`) giving the bounds where dismissal gestures are allowed; undefined coordinates place no restriction on that dimension.

### `WebAnchorProps` (web)

| Name | Type | Description |
| --- | --- | --- |
| `download` | `string` | Download the `href` instead of navigating; the value is the filename. Passed to the `<a>` tag. |
| `rel` | `string` | Relationship between the `href` and the current route (`nofollow`, `noopener`, `noreferrer`). Passed to the `<a>` tag. |
| `target` | `'_self' \| '_blank' \| '_parent' \| '_top' \| string & object` | Where to open the `href`. Default `'_self'`. Passed to the `<a>` tag. |

Examples:

```tsx
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

<Link href="/home" asChild>
  <Pressable>
    <Text>Home</Text>
  </Pressable>
</Link>

<Link
  href={{
    pathname: '/user/[id]',
    params: { id: 'bacon' }
  }}>
  View user
</Link>

<Link href="/about">
  <Link.Preview />
</Link>

<Link.Menu>
  <Link.MenuAction title="Action 1" onPress={() => {}} />
  <Link.MenuAction title="Action 2" onPress={() => {}} />
</Link.Menu>
```

## Notes

- Platforms: android, ios, tvos, web, expo-go; `Link.AppleZoom` and `Link.AppleZoomTarget` need iOS 18+; `Link.Menu`, `Link.MenuAction`, `Link.Preview`, `Link.Trigger` and `usePreventZoomTransitionDismissal` are iOS only.
- Expo Router `Link` and `Redirect` are file-based routing components built on React Navigation. They are different APIs from the same-named `Link` in react-router and tanstack-router.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/link/ (modificationDate September 16, 2026).

## Related

- [Router](./router-api.md)
- [Redirects](./redirects.md)
- [Link preview](./link-preview.md)
- [Router Stack](./router-stack.md)
