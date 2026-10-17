---
source: https://reactnative.dev/docs/0.87/fabric-native-components-introduction
---

# Fabric Native Component Walkthrough

Build a `CustomWebView` Fabric Native Component: TypeScript spec, Codegen config, Android (Kotlin) view/manager/package, iOS (Objective-C++) view, and JS usage.

Create the app and folders, then enter the project root (all later commands run from `Demo/`):

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
cd Demo
```

1. Spec (`Demo/specs/WebViewNativeComponent.ts`; the file name must end with `NativeComponent`):

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

2. `package.json` Codegen config:

```json
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
```

3a. Android. Run Codegen once, from `Demo/`:

```bash
(cd android && ./gradlew generateCodegenArtifactsFromSchema)
```

`ReactWebView.kt`:

```kotlin
package com.webview

import android.content.Context
import android.util.AttributeSet
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

class ReactWebView: WebView {
  constructor(context: Context) : super(context) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
    configureComponent()
  }

  private fun configureComponent() {
    this.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
    this.webViewClient = object : WebViewClient() {
      override fun onPageFinished(view: WebView, url: String) {
        emitOnScriptLoaded(OnScriptLoadedEventResult.success)
      }
    }
  }

  fun emitOnScriptLoaded(result: OnScriptLoadedEventResult) {
    val reactContext = context as ReactContext
    val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
    val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
    val payload =
        Arguments.createMap().apply {
          putString("result", result.name)
        }
    val event = OnScriptLoadedEvent(surfaceId, id, payload)

    eventDispatcher?.dispatchEvent(event)
  }

  enum class OnScriptLoadedEventResult {
    success,
    error;
  }

  inner class OnScriptLoadedEvent(
      surfaceId: Int,
      viewId: Int,
      private val payload: WritableMap
  ) : Event<OnScriptLoadedEvent>(surfaceId, viewId) {
    override fun getEventName() = "onScriptLoaded"

    override fun getEventData() = payload
  }
}
```

`ReactWebViewManager.kt`:

```kotlin
package com.webview

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.CustomWebViewManagerInterface;
import com.facebook.react.viewmanagers.CustomWebViewManagerDelegate;

@ReactModule(name = ReactWebViewManager.REACT_CLASS)
class ReactWebViewManager(context: ReactApplicationContext) : SimpleViewManager<ReactWebView>(), CustomWebViewManagerInterface<ReactWebView> {
  private val delegate: CustomWebViewManagerDelegate<ReactWebView, ReactWebViewManager> =
    CustomWebViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ReactWebView> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): ReactWebView = ReactWebView(context)

  @ReactProp(name = "sourceUrl")
  override fun setSourceURL(view: ReactWebView, sourceURL: String?) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error)
      return;
    }
    view.loadUrl(sourceURL, emptyMap())
  }

  companion object {
    const val REACT_CLASS = "CustomWebView"
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> =
      mapOf(
          "onScriptLoaded" to
              mapOf(
                  "phasedRegistrationNames" to
                      mapOf(
                          "bubbled" to "onScriptLoaded",
                          "captured" to "onScriptLoadedCapture"
                      )))
}
```

`ReactWebViewPackage.kt`:

```kotlin
package com.webview

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class ReactWebViewPackage : BaseReactPackage() {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(ReactWebViewManager(reactContext))
  }

  override fun getModule(s: String, reactApplicationContext: ReactApplicationContext): NativeModule? = null

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider { emptyMap() }
}
```

`MainApplication.kt` (register with `add(ReactWebViewPackage())`):

```kotlin
package com.demo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.webview.ReactWebViewPackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              add(ReactWebViewPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}
```

3b. iOS. Run Codegen via CocoaPods, from `Demo/`:

```bash
(cd ios && bundle install && bundle exec pod install)
```

Prepare the iOS project using Xcode:

1. Open the CocoaPods generated Xcode Workspace:

```bash
# from the ios folder
open Demo.xcworkspace
```

2. Right click on app and select New Group, call the new group `WebView`.
3. In the `WebView` group, create New -> File from Template.
4. Use the Objective-C File template, and name it `RCTWebView`.
5. Repeat step 4 and create a header file named `RCTWebView.h`.
6. Rename `RCTWebView.m` to `RCTWebView.mm` making it an Objective-C++ file.

`RCTWebView.h`:

```objc
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

`RCTWebView.mm`:

```objc
#import "RCTWebView.h"

#import <react/renderer/components/AppSpec/ComponentDescriptors.h>
#import <react/renderer/components/AppSpec/EventEmitters.h>
#import <react/renderer/components/AppSpec/Props.h>
#import <react/renderer/components/AppSpec/RCTComponentViewHelpers.h>
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
}

-(instancetype)init
{
  if(self = [super init]) {
    static const auto defaultProps = std::make_shared<const CustomWebViewProps>();
    _props = defaultProps;
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);

  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL) {
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    if ([self urlIsValid:newViewProps.sourceURL] && _sourceURL) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
  }

  [super updateProps:props oldProps:oldProps];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;

}

#pragma mark - WKNavigationDelegate

-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    if (_eventEmitter) {
      CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};

      self.eventEmitter.onScriptLoaded(result);
    }
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

@end
```

4. Use it (`Demo/App.tsx`):

```tsx
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

Run from the project root (`Demo/`):

```bash
yarn run android
yarn run ios
```

## Notes

- Create the .h/.mm files through Xcode (File from Template) so they are members of the app target; files only written to disk are not compiled.
- The name passed to `codegenNativeComponent` (`CustomWebView`) must match the Android `getName()` and the iOS `componentProvider` mapping.
- iOS needs the WebKit framework linked in Xcode (target, General, Frameworks, Libraries, and Embedded Content) for this web view only.
- The source page also gives Java variants of the Android classes and a Flow spec. The Android manager in the source uses `@ReactProp(name = "sourceUrl")` while the spec prop is `sourceURL`, reproduced as written.
- 0.88: iOS SceneDelegate support is available through `RCTReactNativeFactory` (per the 0.88 release blog); this guide does not use it.
- This guide targets the New Architecture only.
- The source runs the Android and iOS Codegen steps on separate pages, each from `Demo/`; here they are wrapped in subshells (and `cd Demo` added) so the steps can run in sequence.
- Deviation: `cd Demo` added; the official page omits it before the platform steps.
- Corrected: inside a WebView subclass the unqualified LayoutParams resolves to AbsoluteLayout.LayoutParams (no 2-arg constructor), so ViewGroup.LayoutParams is used (as in the Fabric Native Components: Android reference page).
- Corrected: the official package returned the ViewManager from getModule and registered it as a TurboModule; view managers are registered only via createViewManagers.
- Corrected: _props is initialized with a default CustomWebViewProps in init (the official init leaves the base ViewProps, so the first updateProps static_pointer_casts the wrong type).
- Corrected: the error event is emitted only when _eventEmitter is set, because updateProps runs before updateEventEmitter on first mount.
- Corrected: the request is not loaded when _sourceURL is nil (empty sourceURL).
- The 0.87 app template's MainApplication uses getDefaultReactHost(applicationContext, packageList = PackageList(this).packages.apply { add(...) }) and loadReactNative(this); the DefaultReactNativeHost form shown is the official page's older shape (isHermesEnabled is deprecated and ignored, isNewArchEnabled=false is unsupported since 0.82).
- 0.85: UIManagerHelper (getSurfaceId / getEventDispatcherForReactTag) is deprecated as part of the legacy architecture cleanup; the 0.87 guide still uses it.
