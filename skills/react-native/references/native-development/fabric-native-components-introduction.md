---
source: https://reactnative.dev/docs/0.87/fabric-native-components-introduction
---

# Fabric Native Components Introduction

Build new React Native Components that wrap a Host Component (e.g. an Android `CheckBox` or an iOS `UIButton`) with a Fabric Native Component. The guide implements a web view component with Android `WebView` and iOS `WKWebView`.

## Signature / Usage

Steps: (1) define a JavaScript specification using Flow or TypeScript; (2) configure the dependency management system to generate code from the spec and to be auto-linked; (3) implement the native code; (4) use the component in an app.

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

```bash
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
```

```text
Demo
├── android/app/src/main/java/com/webview
└── ios
└── specs
```

Specification (spec file name must be `<MODULE_NAME>NativeComponent.{ts|js}`).

**TypeScript** (`Demo/specs/WebViewNativeComponent.ts`)

```typescript
import type {
  CodegenTypes,
  HostComponent,
  ViewProps,
} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

**Flow** (`Demo/RCTWebView/js/RCTWebViewNativeComponent.js`)

```ts
// @flow strict-local

import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

`package.json`:

```json
    "start": "react-native start",
    "test": "jest"
  },
  "codegenConfig": {
    "name": "AppSpec",
    "type": "components",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.webview"
    },
    "ios": {
      "componentProvider": {
        "CustomWebView": "RCTWebView"
      }
    }
  },
  "dependencies": {
```

Use the component (`Demo/App.tsx`):

```javascript
import {Alert, StyleSheet, View} from 'react-native';
import WebView from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <WebView
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
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
    height: '100%',
  },
});

export default App;
```

Run the app. Android:

```bash
yarn run android
```

iOS:

```bash
yarn run ios
```

## Notes

- Folder layout: `android/app/src/main/java/com/webview` holds the Android code, `ios` holds the iOS code, `specs` holds the Codegen specification file.
- The suffix `NativeComponent` is not only a convention: Codegen uses it to detect a spec file. The spec is used by Codegen to generate the C++, Objective-C++ and Java that connect platform code to the JavaScript runtime.
- The spec has three main parts: `WebViewScriptLoadedEvent` (supporting data type for the event data passed from native to JavaScript), `NativeProps` (the props that can be set on the component), and the `codegenNativeComponent` statement (generates code for the custom component and defines a name used to match the native implementations). As with Native Modules, multiple specification files can live in `specs/`. Supported types and platform mappings are in the Appendix (Codegen typings).
- On iOS, the `componentProvider` declaratively maps the name of the JS component exported by the spec (`CustomWebView`) to the iOS class that implements it natively (`RCTWebView`).
- Step 2 (building your native code) is split by platform; the official page embeds the Android and iOS guides. See the Android and iOS pages linked below.
- This guide creates a Native Component that only works with the New Architecture. Supporting both the New Architecture and the Legacy Architecture requires the backwards compatibility guide in the React Native New Architecture working group repository.
- Docusaurus highlight markers from the official page are removed; snippets show the final code.
- Cross-skill: this page covers the React Native native-component boundary; the Android `WebView` and iOS `WKWebView` APIs themselves belong to android-architecture / apple-uikit.

## Related

- [Fabric Native Modules: Android](./fabric-native-components-android.md)
- [Fabric Native Components: iOS](./fabric-native-components-ios.md)
- [Advanced Topics (Components)](./advanced-topics-components.md)
- [Appendix](./appendix.md)
- [What is Codegen?](./what-is-codegen.md)
