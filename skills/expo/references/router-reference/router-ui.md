---
source: https://docs.expo.dev/versions/v58.0.0/sdk/router/ui/
---

# Router UI

`expo-router/ui` is a submodule of `expo-router` that exports headless components and hooks to build custom tab layouts. Use it instead of the built-in navigators bundled with Expo Router, such as JavaScript tabs and native tabs.

## Signature / Usage

```js
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
```

```tsx
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

## Options / Props

### Components

| Component | Description |
| --- | --- |
| `Tabs` | Root component for the headless tabs. Hook version: `useTabsWithChildren`. |
| `TabList` | Wrapper for `TabTrigger`s; the triggers within it define the tabs. |
| `TabSlot` | Renders the current tab. Hook version: `useTabSlot`. |
| `TabTrigger` | Creates a trigger to navigate to a tab. Inside `TabList`, `href` is required and the trigger defines which routes are present in the `Tabs`. Outside `TabList`, `href` is not required. |
| `TabContext` | `Context<ExpoTabsNavigatorScreenOptions>`. |

`Tabs` props (inherits `ViewProps`):

| Name | Type | Description |
| --- | --- | --- |
| `activityEnabled` | `boolean` (default `false`) | Enables React Activity for tab screens. Inactive tabs are hidden while preserving their state. |
| `asChild` | `boolean` | Forward props to the child component and remove the extra `<View>`. |
| `options` | `UseTabsOptions` | Options for the Tab Router. |

`TabList` props (inherits `ViewProps`): `asChild` (`boolean`) forwards props to the child and removes the extra `<View>`.

`TabSlot` props (inherits `ComponentProps<ScreenContainer>`):

| Name | Type | Description |
| --- | --- | --- |
| `detachInactiveScreens` | `boolean` | Remove inactive screens. |
| `renderFn` | `defaultTabsSlotRender` | Override how the `Screen` component is rendered. |

`TabTrigger` props (inherits `PressablePropsWithoutFunctionChildren`):

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | Name of the tab. Within a `TabList` it sets the name; otherwise it references the name. |
| `href` | `Href` | Required when used within a `TabList`. |
| `activityEnabled` | `boolean` | Overrides React Activity behavior inherited from `Tabs` for this route when used in a `TabList`. |
| `asChild` | `boolean` | Forward props to the child component. |
| `resetOnFocus` | `boolean` | Resets the route when switching to a tab. |

### Hooks

| Hook | Description |
| --- | --- |
| `useTabSlot(namedParameters?)` | Returns a `ReactElement` of the current tab. `namedParameters`: `TabSlotProps`. |
| `useTabsWithChildren(options)` | Hook version of `Tabs`; render the returned `NavigationContent`. Requires the `<TabList />` and `<TabTrigger />` components. `options`: `UseTabsWithChildrenOptions`. Returns `{ describe, descriptors, navigation, NavigationContent, state }`. |
| `useTabsWithTriggers(options)` | Alternative hook version of `Tabs` that uses explicit triggers instead of `children`. `options`: `UseTabsWithTriggersOptions`. Same return shape. |
| `useTabTrigger(options)` | Utility hook creating a custom `TabTrigger`. `options`: `TabTriggerProps`. Returns `UseTabTriggerResult`. |

```tsx
export function MyTabs({ children }) {
 const { NavigationContent } = useTabsWithChildren({ children })

 return <NavigationContent />
}
```

### Types

| Type | Definition |
| --- | --- |
| `ExpoTabsNavigatorScreenOptions` | `{ detachInactiveScreens?: boolean; freezeOnBlur?: boolean (deprecated, no effect in Expo Router); lazy?: boolean; unmountOnBlur?: boolean }` |
| `ExpoTabsScreenOptions` | `Pick<BottomTabNavigationOptions, 'title' \| 'lazy' \| 'freezeOnBlur' \| 'hidden'>` extended by `{ action: NavigationAction; params?: object; title: string }` |
| `ExpoTabsNavigationProp`, `ExpoTabsNavigatorOptions` | React Navigation based navigation prop and navigator options types. |
| `SwitchToOptions` | `{ resetOnFocus?: boolean }`: navigate and reset the history on route focus (options for `switchTab`). |
| `TabNavigationEventMap` | `tabLongPress: { data: undefined }` (long press on the tab); `tabPress: { canPreventDefault: true, data: undefined }` (tap on the tab). |
| `TabsContextValue` | `ReturnType<useNavigationBuilder>`: result of the tab navigation builder used by custom tabs. |
| `TabsSlotRenderOptions` | `{ detachInactiveScreens: boolean; index: number; isFocused: boolean; loaded: boolean }` |
| `TabTriggerOptions` | `{ href: Href; name: string }` |
| `Trigger` | `{ hidden: boolean; isFocused: boolean; resolvedHref: string; route?: [number] }` |
| `UseTabsOptions` | `Omit<DefaultNavigatorOptions<...>, 'activityEnabled' \| 'children' \| 'initialRouteName'>` extended by `activityEnabled?: boolean` and `backBehavior?: TabRouterOptions['backBehavior']` |
| `UseTabsWithChildrenOptions` | `PropsWithChildren<UseTabsOptions>` |
| `UseTabsWithTriggersOptions` | `UseTabsOptions` extended by `triggers: ScreenTrigger[]` |
| `UseTabTriggerResult` | `{ getTrigger: (name: string) => Trigger \| undefined; switchTab: (name: string, options: SwitchToOptions) => void; trigger?: Trigger; triggerProps: TriggerProps }` |

## Notes

- Platforms: android, ios, tvos, web, expo-go. Requires `expo-router` and its config plugin (`"plugins": ["expo-router"]`).
- Expo Router UI is the headless counterpart of the built-in JavaScript tabs and native tabs; it is a different API from react-router and tanstack-router.
- Source: https://docs.expo.dev/versions/v58.0.0/sdk/router/ui/ (modificationDate September 29, 2026).

## Related

- [Router](./router-api.md)
- [Router Native tabs](./router-native-tabs.md)
- [Router Stack](./router-stack.md)
