---
source: https://reactnative.dev/docs/0.87/communication-ios
---

# Communication between native and React Native

Summarizes the techniques for communicating between native iOS views and React Native when they are mixed: properties, events, native modules, and layout computation.

## Signature / Usage

To embed a React Native view in a native component, use `RCTRootView`, a `UIView` that holds a React Native app and provides an interface between the native side and the hosted app. Its initializer takes `initialProperties`, which has to be an instance of `NSDictionary`; it is internally converted into a JSON object that the top-level JS component can reference.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ffffff/000000.png",
                       @"https://dummyimage.com/600x400/000000/ffffff.png"];

NSDictionary *props = @{@"images" : imageList};

RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                 moduleName:@"ImageBrowserApp"
                                          initialProperties:props];
```

```tsx
import React from 'react';
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component<{images: string[]}> {
  renderImage(imgURI: string) {
    return <Image key={imgURI} source={{uri: imgURI}} style={{width: 300, height: 200}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`RCTRootView` also provides a read-write property `appProperties`. After it is set, the React Native app is re-rendered with new properties; the update is only performed when the new properties differ from the previous ones.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ff0000/000000.png",
                       @"https://dummyimage.com/600x400/ffffff/ff0000.png"];

rootView.appProperties = @{@"images" : imageList};
```

### Layout of a React Native component embedded in native

Fixed size root view: set RCTRootView's frame explicitly.

```objectivec title='SomeViewController.m'
- (void)viewDidLoad
{
  [...]
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:appName
                                            initialProperties:props];
  rootView.frame = CGRectMake(0, 0, self.view.bounds.size.width, 200);
  [self.view addSubview:rootView];
}
```

Flexible size root view: `RCTRootView` supports 4 size flexibility modes.

```objectivec title='RCTRootView.h'
typedef NS_ENUM(NSInteger, RCTRootViewSizeFlexibility) {
  RCTRootViewSizeFlexibilityNone = 0,
  RCTRootViewSizeFlexibilityWidth,
  RCTRootViewSizeFlexibilityHeight,
  RCTRootViewSizeFlexibilityWidthAndHeight,
};
```

`RCTRootViewSizeFlexibilityNone` is the default (fixed size, still updatable with `setFrame:`). The other three modes track React Native content size updates and report them to `RCTRootView`'s delegate, called only when the content size has changed.

```objectivec title='FlexibleSizeExampleView.m'
- (instancetype)initWithFrame:(CGRect)frame
{
  [...]

  _rootView = [[RCTRootView alloc] initWithBridge:bridge
  moduleName:@"FlexibilityExampleApp"
  initialProperties:@{}];

  _rootView.delegate = self;
  _rootView.sizeFlexibility = RCTRootViewSizeFlexibilityHeight;
  _rootView.frame = CGRectMake(0, 0, self.frame.size.width, 0);
}

#pragma mark - RCTRootViewDelegate
- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView
{
  CGRect newFrame = rootView.frame;
  newFrame.size = rootView.intrinsicContentSize;

  rootView.frame = newFrame;
}
```

Setting the mode to `RCTRootViewSizeFlexibilityHeight` means `rootViewDidChangeIntrinsicSize:` is called every time the React Native content changes its height. Changing the flexibility mode dynamically schedules a layout recalculation, and the delegate method is called once the content size is known.

## Notes

- The official page uses self.view.width (not a UIView property); corrected to self.view.bounds.size.width.
- Corrected: the official tsx snippet omits the props type and the image size; typed props ({images: string[]}) and a fixed width/height style were added.
- React import added; the official snippet uses React.* at runtime without importing it.
- Property updates may be done at any time but must be performed on the main thread; the getter can be used on any thread. There is no way to update only a few properties at a time; build that into your own wrapper.
- Known issue (as stated in the docs): setting `appProperties` during the bridge startup, the change can be lost (react-native issue 20115).
- Passing properties from React Native to native: export properties with the `RCT_CUSTOM_VIEW_PROPERTY` macro in your custom native component (see the Legacy Native UI Components iOS guide).
- Cross-language properties do not support callbacks, so bottom-up bindings are not possible via props. Cross-language callbacks are meant to trigger a native action from JS and handle its result in JS, not to be passed as properties.
- Events (native to JS) give no guarantee about execution time, as the event is handled on a separate thread. Pitfalls: spaghetti-style dependencies, shared namespace with undetected name collisions, and the need for identifiers (`reactTag`) to distinguish component instances. A common pattern is to make the native component's `RCTViewManager` a delegate for the views, sending events back to JavaScript via the bridge.
- Native modules are Objective-C classes available in JS; typically one instance per JS bridge. Being singletons limits the mechanism for embedding: you must pass an identifier of the parent native view and keep an identifier-to-view mapping (this is used in the internal `RCTUIManager`). All native modules share the same namespace; watch for name collisions.
- With a fixed size root view, respect its bounds on the JS side (Flexbox is easiest). If React components are visible outside the root view's bounds you get overlap with native views, e.g. `TouchableHighlight` will not highlight touches outside the bounds.
- For content of unknown size: wrap the React Native view in a `ScrollView`, or use `RCTRootView`'s flexibility modes.
- Making a dimension flexible in both JS and native leads to undefined behavior (e.g. a flexible top-level component width plus `RCTRootViewSizeFlexibilityWidth`).
- React Native layout calculation is performed on a separate thread, while native UI view updates are done on the main thread. This may cause temporary UI inconsistencies, a known problem the team is working on.
- React Native does not perform any layout calculations until the root view becomes a subview of some other view. To hide the view until its dimensions are known, add the root view as a hidden subview and change its visibility in the delegate method.
- The `RCTRootView` / `initWithBridge:` examples are Objective-C bridge APIs from the 0.87 docs; the guides linked from this page (native UI components, native modules) are in the Legacy Architecture. For native iOS UI and Swift, see the apple-uikit and apple-swift skills; this page covers the React Native interop layer.
- `RCTRootView initWithBridge:` is a Legacy Architecture (bridge) initializer; since 0.84 legacy code is compiled out of iOS builds by default, so New Architecture apps create the root view with `RCTReactNativeFactory` (`[factory.rootViewFactory viewWithModuleName:initialProperties:]`) as in the Integration with Existing Apps guide, passing the same initialProperties dictionary.

## Related

- [Communication between native and React Native (Android)](./communication-android.md)
- [Native Modules intro (Legacy)](../legacy/native-modules-intro.md)
- [Integration with Existing Apps](../getting-started/integration-with-existing-apps.md)
