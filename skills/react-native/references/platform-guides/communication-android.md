---
source: https://reactnative.dev/docs/0.87/communication-android
---

# Communication between native and React Native

Summarizes the techniques for communicating between native Android components and React Native components when they are mixed: properties, events, and native modules.

## Signature / Usage

Pass properties from native to React Native by providing a custom `ReactActivityDelegate` in your main activity. Override `getLaunchOptions` to return a `Bundle` with the desired properties.

**Java**

```java
public class MainActivity extends ReactActivity {
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected Bundle getLaunchOptions() {
        Bundle initialProperties = new Bundle();
        ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
                "https://dummyimage.com/600x400/ffffff/000000.png",
                "https://dummyimage.com/600x400/000000/ffffff.png"
        ));
        initialProperties.putStringArrayList("images", imageList);
        return initialProperties;
      }
    };
  }
}
```

**Kotlin**

```kotlin
class MainActivity : ReactActivity() {
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle {
                val imageList = arrayListOf("https://dummyimage.com/600x400/ffffff/000000.png", "https://dummyimage.com/600x400/000000/ffffff.png")
                val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
                return initialProperties
            }
        }
    }
}
```

```tsx
import React from 'react';
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`ReactRootView` provides a read-write property `appProperties`. After `appProperties` is set, the React Native app is re-rendered with new properties. The update is only performed when the new updated properties differ from the previous ones.

**Java**

```java
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "https://dummyimage.com/600x400/ff0000/000000.png",
        "https://dummyimage.com/600x400/ffffff/ff0000.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

**Kotlin**

```kotlin
var updatedProps: Bundle = reactRootView.getAppProperties()
var imageList = arrayListOf("https://dummyimage.com/600x400/ff0000/000000.png", "https://dummyimage.com/600x400/ffffff/ff0000.png")
updatedProps.putStringArrayList("images", imageList)

reactRootView.setAppProperties(updatedProps)
```

### Passing properties from React Native to native

Properties that are to be reflected in JavaScript need to be exposed as a setter method annotated with `@ReactProp`, then used in React Native as if the component was an ordinary React Native component (see the Legacy "Native UI Components" Android guide).

### Calling React Native functions from native (events)

Events are described in the Legacy Native UI Components Android guide. Using events gives no guarantees about execution time, as the event is handled on a separate thread.

### Calling native functions from React Native (native modules)

Native modules are Java/Kotlin classes that are available in JS. Typically one instance of each module is created per JS bridge. They can export arbitrary functions and constants to React Native (see the Legacy Native Modules Android guide).

## Notes

- React import added; the official snippet uses React.* at runtime without importing it.
- Updating `appProperties` is fine at any time, but updates have to be performed on the main thread. The getter can be used on any thread.
- There is no way to update only a few properties at a time. Build it into your own wrapper instead.
- After an appProperties update the root component re-renders with the new props; handle them in render, componentDidUpdate, or a useEffect that depends on the props (componentDidMount runs only on the initial mount).
- Corrected: the official page says new props are available in componentDidMount and mentions a non-existent componentWillUpdateProps lifecycle.
- Corrected: the official Kotlin snippet omitted putStringArrayList and setAppProperties.
- Limit of properties: cross-language properties do not support callbacks, so bottom-up data bindings are not possible via props. Cross-language callbacks (Legacy Native Modules guide) are intended to trigger a native action from JS and handle its result in JS, not to be passed as properties.
- Event pitfalls: events can be sent from anywhere and can introduce spaghetti-style dependencies; events share a namespace so name collisions are not detected statically; to distinguish several instances of the same component you will likely need identifiers (the native view's `reactTag` can be used).
- All native modules share the same namespace. Watch out for name collisions when creating new ones.
- The linked guides (native UI components, native modules) are in the Legacy Architecture; the current equivalents are Turbo Native Modules and Fabric Native Components.
- The native side (Activity, Bundle, Kotlin/Java classes) is plain Android; see the android-architecture skill for Android components. This is React Native interop, not a Kotlin or Compose API.

## Related

- [Communication between native and React Native (iOS)](./communication-ios.md)
- [Headless JS](./headless-js-android.md)
- [Native Modules intro (Legacy)](../legacy/native-modules-intro.md)
- [Turbo Native Modules (Android)](../native-development/turbo-native-modules-android.md)
