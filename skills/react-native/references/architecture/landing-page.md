---
source: https://reactnative.dev/architecture/landing-page
---

# About the New Architecture

Since 2018, the React Native team has been redesigning the core internals of React Native to enable developers to create higher-quality experiences. As of 2024, this version of React Native has been proven at scale and powers production apps by Meta. The term _New Architecture_ refers to both the new framework architecture and the work to bring it to open source.

## Signature / Usage

Opt out of the New Architecture (Android): in `android/gradle.properties`, toggle `newArchEnabled` from `true` to `false`.

```diff
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
-newArchEnabled=true
+newArchEnabled=false
```

Opt out (iOS): add `ENV['RCT_NEW_ARCH_ENABLED'] = '0'` in the main scope of `ios/Podfile`, then reinstall pods.

```diff
+ ENV['RCT_NEW_ARCH_ENABLED'] = '0'
# Resolve react_native_pods.rb with node to allow for hoisting
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
```

```shell
bundle exec pod install
```

### Why a New Architecture?

After many years of building with React Native, the team identified a set of limitations that prevented developers from crafting certain experiences with a high polish. These limitations were fundamental to the existing design of the framework, so the New Architecture started as an investment in the future of React Native.

### Synchronous Layout and Effects

With `onLayout`, state updates within the callback may apply after painting the previous render, so users may see intermediate states or visual jumps. With the New Architecture, synchronous access to layout information and properly scheduled updates avoid this. Legacy approach (tooltip example):

```jsx
function ViewWithTooltip() {
  // ...

  // We get the layout information and pass to Tooltip to position itself
  const onLayout = React.useCallback(event => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      // This state update is not guaranteed to run in the same commit
      // This results in a visual "jump" as the Tooltip repositions itself
      setTargetRect({x, y, width, height});
    });
  }, []);

  return (
    <>
      <View ref={targetRef} onLayout={onLayout}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

With the New Architecture, `useLayoutEffect` measures and applies layout updates in a single commit:

```jsx
function ViewWithTooltip() {
  // ...

  useLayoutEffect(() => {
    // The measurement and state update for `targetRect` happens in a single commit
    // allowing Tooltip to position itself without intermediate paints
    targetRef.current?.measureInWindow((x, y, width, height) => {
      setTargetRect({x, y, width, height});
    });
  }, [setTargetRect]);

  return (
    <>
      <View ref={targetRef}>
        <Text>Some content that renders a tooltip above</Text>
      </View>
      <Tooltip targetRect={targetRect} />
    </>
  );
}
```

#### Support for Concurrent Renderer and Features

The New Architecture supports concurrent rendering and features that have shipped in React 18 and beyond: Suspense for data-fetching, Transitions, and other new React APIs. The concurrent renderer also brings out-of-the-box improvements like automatic batching, which reduces re-renders in React. State updates from native event handlers (for example a native Slider) are now batched.

Transitions let you express the priority of UI updates; marking an update as lower priority tells React it can "interrupt" rendering to handle higher priority updates. `startTransition` also provides an `isPending` flag.

```jsx
function TileSlider({value, onValueChange}) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <View>
        <Text>
          Render {value} Tiles
        </Text>
        <ActivityIndicator animating={isPending} />
      </View>
      <Slider
        value={1}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        onValueChange={newValue => {
          startTransition(() => {
            onValueChange(newValue);
          });
        }}
      />
    </>
  );
}

function ManyTiles() {
  const [value, setValue] = useState(1);
  const tiles = generateTileViews(value);
  return (
      <TileSlider onValueChange={setValue} value={value} />
      <View>
        {tiles}
      </View>
  )
}
```

#### Fast JavaScript/Native Interfacing

The New Architecture removes the asynchronous bridge between JavaScript and native and replaces it with JavaScript Interface (JSI). JSI is an interface that allows JavaScript to hold a reference to a C++ object and vice-versa. With a memory reference, you can directly invoke methods without serialization costs.

JSI enables VisionCamera, a popular camera library for React Native, to process frames in real time. Typical frame buffers are ~30 MB, which amounts to roughly 2 GB of data per second, depending on the frame rate. JSI can expose other complex instance-based types such as databases, images, audio samples, etc.

JSI adoption in the New Architecture removes this class of serialization work from all native-JavaScript interop. This includes initializing and re-rendering native core components like `View` and `Text`.

### What can I expect from enabling the New Architecture?

Enabling the New Architecture for your app or library may not immediately improve the performance or user experience. Your code may need refactoring to leverage new capabilities like synchronous layout effects or concurrent features. Although JSI will minimize the overhead between JavaScript and native memory, data serialization may not have been a bottleneck for your app's performance.

Web alignment is an active area of exploration at Meta (links from the source page):

- Updates to the event loop model (react-native-community/discussions-and-proposals proposal 0744-well-defined-event-loop)
- Node and layout APIs (proposal 0607-dom-traversal-and-layout-apis)
- Styling and layout conformance (Yoga v2.0.0 release)

### Should I use the New Architecture today?

With 0.76, The New Architecture is enabled by default in all the React Native projects. If you find anything that is not working well, open an issue using the New Architecture bug report template of the React Native repository.

## Notes

- Illustrative snippet verbatim from the official page; the adjacent elements in the `ManyTiles` `return` would need a fragment wrapper to run.
- The page states the New Architecture has been available for experimental opt-in since React Native 0.68 and is enabled by default since 0.76.
- Source images and "See code" gists of the original page are omitted; the three tooltip / batching / transition examples above are the original code blocks.

## Related

- [Architecture Overview](./overview.md)
- [Fabric](./fabric-renderer.md)
- [Glossary](./glossary.md)
- [Turbo Native Modules Introduction](../native-development/turbo-native-modules-introduction.md)
