---
source: https://reactnative.dev/docs/0.87/the-new-architecture/layout-measurements
---

# Measuring the Layout

Native methods to measure the current layout of views, to apply changes to the overall layout or make decisions based on the measurements.

## Signature / Usage

The best way to invoke the measure methods is in a `useLayoutEffect` hook: this gives you the most recent values and lets you apply changes in the same frame when the measurements are computed.

```tsx
import {useLayoutEffect, useRef, type ReactNode, type ComponentRef} from 'react';
import {View} from 'react-native';

function AComponent({children}: {children?: ReactNode}) {
  const targetRef = useRef<ComponentRef<typeof View>>(null)

  useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      //do something with the measurements
    });
  }, [ /* add dependencies here */]);

  return (
    <View ref={targetRef}>
     {children}
    </View>
  );
}
```

## Options / Props

`measure(callback)` callback arguments:

| Name | Type | Description |
| --- | --- | --- |
| x | number | The `x` coordinate of the view's origin relative to its parent view. |
| y | number | The `y` coordinate of the view's origin relative to its parent view. |
| width | number | The `width` of the view. |
| height | number | The `height` of the view. |
| pageX | number | The `x` coordinate of the view relative to the root view (typically the whole screen). |
| pageY | number | The `y` coordinate of the view relative to the root view (typically the whole screen). |

`measureInWindow(callback)` callback arguments:

| Name | Type | Description |
| --- | --- | --- |
| x | number | The `x` coordinate of the view in the current window. |
| y | number | The `y` coordinate of the view in the current window. |
| width | number | The `width` of the view. |
| height | number | The `height` of the view. |

## Notes

- Deviation from the official page: the official snippet is untyped (useRef(null), untyped children); explicit types and imports are added so it compiles under strict TypeScript.
- Corrected: the official snippet left View unclosed and took props as children.
- Deviation from the official page: the official text describes x/y as viewport coordinates; they are relative to the parent view, while pageX/pageY are relative to the root view.
- `measure(callback)`: determines the location (`x` and `y` relative to the parent view; `pageX` and `pageY` relative to the root view), `width`, and `height` of the given view. Returns the values via an async callback.
- `measureInWindow(callback)`: determines the location (`x` and `y`) of the given view in the window and returns the values via an async callback. If the React root view is embedded in another native view, this gives you the absolute coordinates.
- The methods are available on most of the default components provided by React Native. They are not available on composite components that are not directly backed by a native view, which generally includes most components defined in your own app.

## Related

- [Direct Manipulation](./direct-manipulation-new-architecture.md)
- [Advanced Topics (Components)](./advanced-topics-components.md)
