---
source: https://reactnative.dev/docs/0.87/virtualview
---

# VirtualView

A core component that behaves similar to `View`. When it is the descendent of a `ScrollView`, it gains additional virtualization capabilities to reduce its memory footprint when obscured by the scroll viewport. Experimental.

## Signature / Usage

```tsx
<ScrollView>
  <VirtualView>
    <Text>Hello world!</Text>
  </VirtualView>
</ScrollView>
```

A `VirtualView` without an ancestor `ScrollView` does not have any virtualization capabilities.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| children | React Node | Content to render inside this `VirtualView`. |
| onModeChange | `(ModeChangeEvent) => void` | Invoked when the `VirtualView` changes how it renders its children. May be invoked from different threads and priorities; check the `mode` property on the event. |
| nativeID | string | An identifier for locating this view from native classes. |
| style | View Style | Style of the view. |

`onModeChange` details: if `mode` is `VirtualViewMode.Visible`, the callback is being invoked from the main thread with immediate priority. If `mode` is `VirtualViewMode.Prerender` or `VirtualViewMode.Hidden`, it is invoked from a background thread with transition priority. The callback will never be invoked consecutively with the same `mode` value, there are few guarantees about sequencing of events, and it may never be invoked with `VirtualViewMode.Visible` even if the view becomes visible, if the children were successfully prerendered.

### ModeChangeEvent

Argument supplied to `onModeChange` (type: object).

| Name | Type | Description |
| --- | --- | --- |
| mode | VirtualViewMode | New mode of the `VirtualView`. |
| target | element | `VirtualView` emitting this event. |
| targetRect | Rect | Layout of `target` relative to the nearest ancestor `ScrollView`. |
| thresholdRect | Rect | Layout of the threshold that triggered this event, relative to the nearest ancestor `ScrollView`. |

### VirtualViewMode

| Name | Value | Description |
| --- | --- | --- |
| Visible | `0` | Target view is visible. |
| Prerender | `1` | Target view is hidden, but can be prerendered. |
| Hidden | `2` | Target view is hidden. |

### Static Methods

#### createHiddenVirtualView()

```tsx
static createHiddenVirtualView(height: number): typeof VirtualView;
```

`VirtualView` initially renders its children as visible, even if it is initially obscured by an ancestor `ScrollView`. `createHiddenVirtualView()` creates a component that renders an initially hidden `VirtualView` with the supplied estimated layout.

```tsx
const HiddenVirtualView = createHiddenVirtualView(100);

<ScrollView>
  <HiddenVirtualView>
    <Text>Hello world!</Text>
  </HiddenVirtualView>
</ScrollView>;
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| height | number | Yes | Estimated height of initially rendering `VirtualView`. |

## Notes

- Experimental: "This API is experimental. Experimental APIs may contain bugs and are likely to change in a future version of React Native. Don't use them in production."
- Virtualization: when a `VirtualView` leaves the visible region of a `ScrollView`, it becomes hidden; it caches its most recent layout and may unmount its children. When it returns to the visible region its children are guaranteed to be rendered, by blocking the main thread from rendering the next frame that would reveal the `VirtualView` until its children can be rendered.
- In future developments, a hidden `VirtualView` may instead render its children in an `<Activity mode="hidden">` to preserve state for as long as possible.
- Rendering a React component can block the main thread; this is a new capability enabled by the New Architecture. If an update such as mounting children takes too long it can drop frames, and dropping too many may cause the OS to display a not-responsive modal or terminate the app.
- DevTools does not currently support debugging JavaScript on the main thread; breakpoints in code called from `onModeChange` that runs on the main thread may freeze the debugger.
- Prerendering: by default each `VirtualView` prerenders its children when approaching the visible region, on a background thread at lower priority (using a transition). The prerender logic is not currently configurable and is likely to change in a future release.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from web virtual-scroll libraries (tanstack-virtual) and Compose Lazy layouts (android-compose-ui LazyColumn), and from same-named UI parts in apple-swiftui / apple-uikit, windows-winui-controls, and ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [ScrollView](./scrollview.md)
- [FlatList](./flatlist.md)
- Rect
