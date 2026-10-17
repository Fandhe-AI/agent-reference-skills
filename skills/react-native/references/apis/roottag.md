---
source: https://reactnative.dev/docs/0.87/roottag
---

# RootTag

`RootTag` is an opaque identifier assigned to the native root view of your React Native surface (the `ReactRootView` / `RCTRootView` instance on Android / iOS). In short, a surface identifier.

## Signature / Usage

```js
import {RootTagContext} from 'react-native';
import NativeAnalytics from 'native-analytics';
import NativeNavigation from 'native-navigation';

function ScreenA() {
  const rootTag = useContext(RootTagContext);

  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };

  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };

  // ...
}

class ScreenB extends React.Component {
  static contextType: typeof RootTagContext = RootTagContext;

  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }

  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }

  // ...
}
```

## Notes

- Most developers will not need `RootTag`s. They are useful when an app renders multiple React Native root views and you must handle native API calls differently per surface, e.g. native navigation where each screen is a separate root view (`Activity` on Android, `UINavigationViewController` on iOS), or when attributing a JS-to-native call to its originating root view.
- Access via `RootTagContext` (React Context API). In 0.65 and below it was accessed through a legacy context; 0.65 supports both.
- Breaking change in 0.65: `unstable_RootTagContext` was renamed `RootTagContext`. Breaking change in 0.66: legacy context access to `RootTag` removed and replaced by `RootTagContext`.
- Future plans: keep `RootTag` opaque. Do not rely on `RootTag` currently aliasing a number.

## Related

- [AppRegistry](./appregistry.md)
