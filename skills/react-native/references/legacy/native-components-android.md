---
source: https://reactnative.dev/docs/0.87/legacy/native-components-android
---

# Android Native UI Components

Legacy Architecture guide: wrap an Android view for use from JavaScript with a `ViewManager` / `SimpleViewManager`, `@ReactProp` setters, and `requireNativeComponent`. The walkthrough implements a subset of `ImageView`.

## Signature / Usage

Steps: create the `ViewManager` subclass, implement `createViewInstance`, expose setters with `@ReactProp` (or `@ReactPropGroup`), register the manager in `createViewManagers` of the application package, implement the JavaScript module.

**Kotlin**

```kotlin
class ReactImageManager(
    private val callerContext: ReactApplicationContext
) : SimpleViewManager<ReactImageView>() {

  override fun getName() = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext) =
      ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, callerContext)

  @ReactProp(name = "src")
  fun setSrc(view: ReactImageView, sources: ReadableArray?) {
    view.setSource(sources)
  }

  @ReactProp(name = "borderRadius", defaultFloat = 0f)
  override fun setBorderRadius(view: ReactImageView, borderRadius: Float) {
    view.setBorderRadius(borderRadius)
  }

  companion object {
    const val REACT_CLASS = "RCTImageView"
  }
}
```

**Java**

```java
public class ReactImageManager extends SimpleViewManager<ReactImageView> {

  public static final String REACT_CLASS = "RCTImageView";
  ReactApplicationContext mCallerContext;

  public ReactImageManager(ReactApplicationContext reactContext) {
    mCallerContext = reactContext;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
  }

  @ReactProp(name = "src")
  public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
    view.setSource(sources);
  }
}
```

Register in the application package:

```kotlin
override fun createViewManagers(
    reactContext: ReactApplicationContext
) = listOf(ReactImageManager(reactContext))
```

```java
@Override
public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
  return Arrays.<ViewManager>asList(
    new ReactImageManager(reactContext)
  );
}
```

JavaScript module:

```tsx
import {requireNativeComponent} from 'react-native';

/**
 * Composes `View`.
 *
 * - src: Array<{url: string}>
 * - borderRadius: number
 * - resizeMode: 'cover' | 'contain' | 'stretch'
 */
export default requireNativeComponent('RCTImageView');
```

### Events

Native code sends an event to the JS representation of the view; the two views are linked by `getId()`.

```kotlin
class MyCustomView(context: Context) : View(context) {
  fun onReceiveNativeEvent() {
    val event = Arguments.createMap().apply {
      putString("message", "MyMessage")
    }
    val reactContext = context as ReactContext
    reactContext
        .getJSModule(RCTEventEmitter::class.java)
        .receiveEvent(id, "topChange", event)
  }
}
```

Map `topChange` to the `onChange` callback prop by overriding `getExportedCustomBubblingEventTypeConstants` in the `ViewManager`:

```kotlin
override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
  return mapOf(
    "topChange" to mapOf(
      "phasedRegistrationNames" to mapOf(
        "bubbled" to "onChange"
      )
    )
  )
}
```

Process the raw event in a wrapper component:

```tsx
import {useCallback} from 'react';
import {requireNativeComponent} from 'react-native';

const RCTMyCustomView = requireNativeComponent('RCTMyCustomView');

export default function MyCustomView(props: {
  onChangeMessage: (message: string) => unknown;
}) {
  const onChange = useCallback(
    event => {
      props.onChangeMessage?.(event.nativeEvent.message);
    },
    [props.onChangeMessage],
  );

  return <RCTMyCustomView {...props} onChange={onChange} />;
}
```

### Integration with an Android Fragment

To tie custom logic to lifecycle methods (`onViewCreated`, `onPause`, `onResume`), host a `Fragment` instead of returning a `View` from the `ViewManager`: create a custom view, a `Fragment` that returns it from `onCreateView`, a `ViewGroupManager<FrameLayout>` whose `createFragment` replaces the React Native view with the fragment, register the `ViewManager` and `Package`, and trigger creation from JS with a command.

```kotlin
class MyViewManager(
    private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>() {
  override fun getName() = REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext) =
      FrameLayout(reactContext)

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  @ReactPropGroup(names = ["width", "height"], customType = "Style")
  fun setStyle(view: FrameLayout, index: Int, value: Int) { /* store width/height */ }

  fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
    val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
    setupLayout(parentView)

    val myFragment = MyFragment()
    val activity = reactContext.currentActivity as FragmentActivity
    activity.supportFragmentManager
        .beginTransaction()
        .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
        .commit()
  }
}
```

```tsx
import {useEffect, useRef} from 'react';
import {PixelRatio, UIManager, findNodeHandle} from 'react-native';
import {MyViewManager} from './my-view-manager';

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyViewManager.Commands.create.toString(),
    [viewId],
  );

export const MyView = () => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <MyViewManager
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
    />
  );
};
```

## Notes

- Deprecation notice (verbatim): "Native Module and Native Components are our stable technologies used by the legacy architecture. They will be deprecated in the future when the New Architecture will be stable. The New Architecture uses Turbo Native Module and Fabric Native Components to achieve similar results."
- `@ReactProp` requires a public setter taking the view first and the value second, returning void/`Unit`. Supported value types (Java): `boolean`, `int`, `float`, `double`, `String`, `Boolean`, `Integer`, `ReadableArray`, `ReadableMap` (Kotlin: `Boolean`, `Int`, `Float`, `Double`, `String`, `ReadableArray`, `ReadableMap`). Optional `defaultBoolean` / `defaultInt` / `defaultFloat` are passed when the prop is removed; complex types receive `null`.
- `ViewManager` subclasses are singletons (one instance per bridge) and are typically the delegates for their views.
- A wrapper React component is needed for anything beyond trivial use, such as custom event handling.
- Local libraries can hold native components too; see `local-library-setup.md`.
- Android Fragment/Gradle/Kotlin platform topics: see android-architecture and android-build-gradle.
- Intended New Architecture replacement: `native-development/fabric-native-components-android.md`.

## Related

- [native-components-ios.md](./native-components-ios.md)
- [native-modules-android.md](./native-modules-android.md)
- [local-library-setup.md](./local-library-setup.md)
- Fabric Native Components (Android)
- [Integration with an Android Fragment](../getting-started/integration-with-android-fragment.md)
