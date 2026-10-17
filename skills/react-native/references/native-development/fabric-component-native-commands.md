---
source: https://reactnative.dev/docs/0.87/the-new-architecture/fabric-component-native-commands
---

# Invoking native functions on your native component

Native Commands let a custom Fabric component call functions implemented in native code imperatively, for example to programmatically reload a web page.

## Signature / Usage

Starts from the Fabric Native Components guide (web view example) and assumes familiarity with Codegen.

### 1. Update your component specs

Update `WebViewNativeComponent.ts` (TypeScript):

```diff
import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
-import {codegenNativeComponent} from 'react-native';
+import {codegenNativeCommands, codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

Flow variant (`WebViewNativeComponent.js`):

```diff
// @flow strict-local

import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
-import {codegenNativeComponent} from 'react-native';
+import {codegenNativeCommands, codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: ?CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent>;
|}>;

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);
```

These changes require you to:

1. Import the `codegenNativeCommands` function from `react-native`. This instructs codegen that it has to generate the code for `NativeCommands`.
2. Define an interface that contains the methods we want to invoke in native. All the Native Commands must have a first parameter of type `React.ElementRef`.
3. Export the `Commands` variable that is the result of the invocation of `codegenNativeCommands`, passing a list of the supported commands.

### 2. Update the App code to use the new command

```diff
+import React from 'react';
-import {Alert, StyleSheet, View} from 'react-native';
-import WebView from './specs/WebViewNativeComponent';
+import {Alert, StyleSheet, Pressable, Text, View} from 'react-native';
+import WebView, {Commands} from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
+    const webViewRef = React.useRef<React.ElementRef<typeof View> | null>(null);
+
+    const refresh = () => {
+        if (webViewRef.current) {
+            Commands.reload(webViewRef.current);
+        }
+    };

  return (
    <View style={styles.container}>
      <WebView
+       ref={webViewRef}
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
+      <View style={styles.tabbar}>
+        <Pressable onPress={refresh} style={styles.button}>
+            {({pressed}) => (
+                !pressed ? <Text style={styles.buttonText}>Refresh</Text> : <Text style={styles.buttonTextPressed}>Refresh</Text>) }
+        </Pressable>
+      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
-    height: '100%',
+    height: '90%',
  },
+  tabbar: {
+    flex: 1,
+    backgroundColor: 'gray',
+    width: '100%',
+    alignItems: 'center',
+    alignContent: 'center',
+  },
+  button: {
+    margin: 10,
+  },
+  buttonText: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF',
+    width: '100%',
+  },
+  buttonTextPressed: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF77',
+    width: '100%',
+  },
});

export default App;
```

The relevant changes: import the `Commands` const from the spec file (an object that lets you call the methods in native); declare a ref to the `WebView` custom native component using `useRef` and pass it to the native command; implement `refresh`, which checks that the ref is not null and then calls the command; add a pressable to call the command. The remaining changes are regular React changes.

### 3. Rerun Codegen

Rerun codegen to generate the new types needed by the native code.

**Android**: Codegen is executed through the `generateCodegenArtifactsFromSchema` Gradle task (automatically run when you build your Android application):

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

**iOS**: Codegen is run as part of the script phases that are automatically added to the project generated by CocoaPods:

```bash
cd ios
bundle install
bundle exec pod install
```

The output will look like this:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

### 4. Implement the Native Code

**Android**: only the `ReactWebViewManager` needs to change. Building before this fails, because the current `ReactWebViewManager` does not implement the new `reload` method.

Java:

```diff
//...
  @ReactProp(name = "sourceUrl")
  @Override
  public void setSourceURL(ReactWebView view, String sourceURL) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error);
      return;
    }
    view.loadUrl(sourceURL, new HashMap<>());
  }

+  @Override
+  public void reload(ReactWebView view) {
+    view.reload();
+  }

  public static final String REACT_CLASS = "CustomWebView";
//...
```

Kotlin:

```diff
  @ReactProp(name = "sourceUrl")
  override fun setSourceURL(view: ReactWebView, sourceURL: String?) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error)
      return;
    }
    view.loadUrl(sourceURL, emptyMap())
  }

+  override fun reload(view: ReactWebView) {
+    view.reload()
+  }

  companion object {
    const val REACT_CLASS = "CustomWebView"
  }
```

It is enough to call `view.reload()` directly because `ReactWebView` inherits from Android's `WebView`. For a custom function that is not available in your custom view, you might also have to implement the required method in the Android View managed by the `ViewManager`.

**iOS**: modify `RCTWebView.mm`:

```diff
  // Event emitter convenience method
  - (const CustomWebViewEventEmitter &)eventEmitter
  {
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
  }

+  - (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args
+  {
+  RCTCustomWebViewHandleCommand(self, commandName, args);
+  }
+
+  - (void)reload
+  {
+  [_webView reloadFromOrigin];
+  }

  + (ComponentDescriptorProvider)componentDescriptorProvider
  {
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
  }
```

1. Add a `handleCommand:args` function, invoked by the components infrastructure to handle the commands. The implementation is similar for every component: call an `RCT<componentNameInJS>HandleCommand` function generated by Codegen. It validates that the command is among the supported ones and that the parameters match the expected ones, then invokes the proper native method.
2. Implement the `reload` method; here it calls the `reloadFromOrigin` function of the WebKit's WebView.

### 5. Run your app

Run your app with the usual commands. Tap the refresh button to see the page getting reloaded.

## Notes

- Diff context aligned with the Fabric Native Components introduction spec (root react-native imports, CodegenTypes namespace); the official page uses deep imports from react-native/Libraries/...
- React import added; the official snippet uses React.* at runtime without importing it.
- In TypeScript, `React.ElementRef` is deprecated; the correct type is `React.ComponentRef`. However, due to a bug in Codegen, using `ComponentRef` will crash the app (per the official page; the fix needs a new React Native release).
- Corrected: the official App diff imports `../specs/WebViewNativeComponent`, but the introduction guide places `App.tsx` and `specs/` side by side in `Demo/`; the import path is `./specs/WebViewNativeComponent` here.
- All Native Commands must have a first parameter of type `React.ElementRef`.
- Deviation from official docs: Flow nullable type written as ?T (the official sample's postfix T? is not valid Flow syntax).
- Cross-skill: Android `WebView` / WebKit `WKWebView` APIs belong to android-architecture / apple-uikit; this page covers only the React Native native-command boundary.

## Related

- [Fabric Native Components Introduction](./fabric-native-components-introduction.md)
- [Fabric Native Modules: Android](./fabric-native-components-android.md)
- [Fabric Native Components: iOS](./fabric-native-components-ios.md)
- [What is Codegen?](./what-is-codegen.md)
