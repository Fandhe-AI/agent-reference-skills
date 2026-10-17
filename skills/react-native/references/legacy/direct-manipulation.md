---
source: https://reactnative.dev/docs/0.87/legacy/direct-manipulation
---

# Direct Manipulation

`setNativeProps` is the React Native equivalent of setting properties directly on a DOM node: it changes a component without using state/props to trigger a re-render of the subtree. Also documents the other native methods `measure`, `measureInWindow`, `measureLayout`, `focus`, `blur`.

## Signature / Usage

`TouchableOpacity` uses `setNativeProps` internally to update the opacity of its child:

```tsx
const viewRef = useRef<View>();
const setOpacityTo = useCallback(value => {
  // Redacted: animation related code
  viewRef.current.setNativeProps({
    opacity: value,
  });
}, []);
```

Composite components are not backed by a native view, so forward a ref to a native-backed child (and pass props down so touch handling works):

```tsx
import {forwardRef, ElementRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = forwardRef<ElementRef<typeof View>, {label: string}>(
  (props, ref) => (
    <View {...props} ref={ref} style={{marginTop: 50}}>
      <Text>{props.label}</Text>
    </View>
  ),
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);
```

Editing a `TextInput` value:

```tsx
const inputRef = useRef<TextInputInstance>(null);
const editText = useCallback(() => {
  inputRef.current?.setNativeProps({text: 'Edited Text'});
}, []);
```

## Options / Props

Native methods available on most default components (not on composite components):

| Name | Signature | Description |
| --- | --- | --- |
| measure | `measure(callback)` | Location on screen, width and height in the viewport via async callback with `x`, `y`, `width`, `height`, `pageX`, `pageY`. Not available until rendering completes in native. |
| measureInWindow | `measureInWindow(callback)` | Location of the view in the window via async callback with `x`, `y`, `width`, `height`. Absolute coordinates if the React root view is embedded in another native view. |
| measureLayout | `measureLayout(relativeToNativeComponentRef, onSuccess, onFail)` | Like `measure()` but relative to an ancestor; coordinates are relative to the ancestor origin. |
| focus | `focus()` | Requests focus for the given input or view; behavior depends on platform and view type. |
| blur | `blur()` | Removes focus from an input or view. |

## Notes

- Caution (verbatim): "Use `setNativeProps` when frequent re-rendering creates a performance bottleneck! Direct manipulation will not be a tool that you reach for frequently. You will typically only be using it for creating continuous animations to avoid the overhead of rendering the component hierarchy and reconciling many views. `setNativeProps` is imperative and stores state in the native layer (DOM, UIView, etc.) and not within your React components, which makes your code more difficult to reason about. Before you use it, try to solve your problem with `setState` and `shouldComponentUpdate`."
- Without a forwarded ref, `TouchableOpacity` on a composite child fails with `Touchable child must either be native or forward setNativeProps to a native component`.
- If a property updated via `setNativeProps` is also managed by the render function, the value set by `setNativeProps` is overridden on the next re-render.
- If you need measurements as soon as possible and do not need `pageX`/`pageY`, use the `onLayout` prop instead; `measure()` width/height are those in the viewport.
- `measureLayout` can also take a `relativeToNativeNode` handler instead of a reference, but that variant is obsolete with the New Architecture.
- Under the New Architecture, see `native-development/direct-manipulation-new-architecture.md`.

## Related

- [view.md](../components/view.md)
- [textinput.md](../components/textinput.md)
- [touchableopacity.md](../components/touchableopacity.md)
- [Direct Manipulation (New Architecture)](../native-development/direct-manipulation-new-architecture.md)
