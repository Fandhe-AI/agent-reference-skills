---
source: https://v2.tauri.app/develop/plugins/develop-mobile/
---

# Mobile Plugin Development

Plugins can run native mobile code written in Kotlin (or Java) and Swift. The default plugin template includes an Android library project using Kotlin and a Swift package, with an example mobile command showing how to trigger it from Rust.

## Signature / Usage

Initialize with the steps of the Plugin Development guide. For an existing plugin, `plugin android init` and `plugin ios init` bootstrap the mobile library projects. The template splits the implementation into `desktop.rs` (Rust implementation) and `mobile.rs` (sends a message to native mobile code and gets a result back). Shared logic can be defined in `lib.rs`:

`src/lib.rs`

```rust
use tauri::Runtime;

impl<R: Runtime> <plugin-name><R> {
  pub fn do_something(&self) {
    // do something that is a shared implementation between desktop and mobile
  }
}
```

#### Android plugin

A Kotlin class that extends `app.tauri.plugin.Plugin` and is annotated with `app.tauri.annotation.TauriPlugin`. Each method annotated with `app.tauri.annotation.Command` can be called by Rust or JavaScript. Kotlin is the default; to switch to Java, right click the plugin class in Android Studio and select "Convert Kotlin file to Java file".

#### iOS plugin

A Swift class that extends the `Plugin` class from the `Tauri` package. Each function with the `@objc` attribute and the `(_ invoke: Invoke)` parameter (e.g. `@objc private func download(_ invoke: Invoke) { }`) can be called by Rust or JavaScript. The plugin is a Swift package, so its package manager manages dependencies.

### Plugin configuration

The plugin instance on mobile has a getter for the plugin configuration.

**Android**

```kotlin
import android.app.Activity
import android.webkit.WebView
import app.tauri.annotation.TauriPlugin
import app.tauri.annotation.InvokeArg

@InvokeArg
class Config {
    var timeout: Int? = 3000
}

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  private var timeout: Int? = 3000

  override fun load(webView: WebView) {
    getConfig(Config::class.java).let {
       this.timeout = it.timeout
    }
  }
}
```

**iOS**

```swift
struct Config: Decodable {
  let timeout: Int?
}

class ExamplePlugin: Plugin {
  var timeout: Int? = 3000

  @objc public override func load(webview: WKWebView) {
    do {
      let config = try parseConfig(Config.self)
      self.timeout = config.timeout
    } catch {}
  }
}
```

### Lifecycle events

- `load`: when the plugin is loaded into the web view (execute plugin initialization code)
- `onNewIntent`: Android only, when the activity is re-launched (e.g. a notification is clicked or a deep link is accessed; see `Activity#onNewIntent`)

Additional lifecycle events are in the Plugin Development guide.

**load, Android**

```kotlin
import android.app.Activity
import android.webkit.WebView
import app.tauri.annotation.TauriPlugin

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  override fun load(webView: WebView) {
    // perform plugin setup here
  }
}
```

**load, iOS**

```swift
class ExamplePlugin: Plugin {
  @objc public override func load(webview: WKWebView) {
    let timeout = self.config["timeout"] as? Int ?? 30
  }
}
```

**onNewIntent, Android**

```kotlin
import android.app.Activity
import android.content.Intent
import app.tauri.annotation.TauriPlugin

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  override fun onNewIntent(intent: Intent) {
    // handle new intent event
  }
}
```

### Adding mobile commands

Commands defined in the plugin class of the mobile project can be called by Rust.

**Android**

```kotlin
import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.TauriPlugin

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  @Command
  fun openCamera(invoke: Invoke) {
    val ret = JSObject()
    ret.put("path", "/path/to/photo.jpg")
    invoke.resolve(ret)
  }
}
```

To use a Kotlin `suspend` function, use a custom coroutine scope:

```kotlin
import android.app.Activity
import app.tauri.annotation.Command
import app.tauri.annotation.TauriPlugin

// Change to Dispatchers.IO if it is intended for fetching data
val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  @Command
  fun openCamera(invoke: Invoke) {
    scope.launch {
      openCameraInner(invoke)
    }
  }

  private suspend fun openCameraInner(invoke: Invoke) {
    val ret = JSObject()
    ret.put("path", "/path/to/photo.jpg")
    invoke.resolve(ret)
  }
}
```

On Android native commands are scheduled on the main thread; long-running operations freeze the UI and can cause an "Application Not Responding" (ANR) error. For blocking IO launch a coroutine:

```kotlin
CoroutineScope(Dispatchers.IO).launch {
  val result = myLongRunningOperation()
  invoke.resolve(result)
}
```

**iOS**

```swift
class ExamplePlugin: Plugin {
	@objc public func openCamera(_ invoke: Invoke) throws {
    invoke.resolve(["path": "/path/to/photo.jpg"])
	}
}
```

Call a mobile command from Rust with `tauri::plugin::PluginHandle`:

```rust
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CameraRequest {
  quality: usize,
  allow_edit: bool,
}

#[derive(Deserialize)]
pub struct Photo {
  path: PathBuf,
}


impl<R: Runtime> <plugin-name;pascal-case><R> {
  pub fn open_camera(&self, payload: CameraRequest) -> crate::Result<Photo> {
    self
      .0
      .run_mobile_plugin("openCamera", payload)
      .map_err(Into::into)
  }
}
```

### Command arguments

Arguments are serialized to commands and parsed on the mobile plugin with `Invoke::parseArgs`, taking a class describing the argument object.

**Android**: a class annotated with `@app.tauri.annotation.InvokeArg`; inner objects must also be annotated.

```kotlin
import android.app.Activity
import android.webkit.WebView
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin

@InvokeArg
internal class OpenAppArgs {
  lateinit var name: String
  var timeout: Int? = null
}

@InvokeArg
internal class OpenArgs {
  lateinit var requiredArg: String
  var allowEdit: Boolean = false
  var quality: Int = 100
  var app: OpenAppArgs? = null
}

@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
  @Command
  fun openCamera(invoke: Invoke) {
    val args = invoke.parseArgs(OpenArgs::class.java)
  }
}
```

- Optional: `var <argumentName>: Type? = null`
- With default value: `var <argumentName>: Type = <default-value>`
- Required: `lateinit var <argumentName>: Type`

**iOS**: a class that inherits `Decodable`; inner objects must also inherit `Decodable`.

```swift
class OpenAppArgs: Decodable {
  let name: String
  var timeout: Int?
}

class OpenArgs: Decodable {
  let requiredArg: String
  var allowEdit: Bool?
  var quality: UInt8?
  var app: OpenAppArgs?
}

class ExamplePlugin: Plugin {
	@objc public func openCamera(_ invoke: Invoke) throws {
    let args = try invoke.parseArgs(OpenArgs.self)

    invoke.resolve(["path": "/path/to/photo.jpg"])
	}
}
```

- Optional: `var <argumentName>: Type?`
- Required: `let <argumentName>: Type`
- Arguments with default values are NOT supported; use a nullable type and set the default value on the command function instead.

### Calling Rust from mobile plugins

Tauri provides no direct mechanism, but JNI on Android and FFI on iOS let plugins call shared Rust code, even when the application WebView is suspended.

#### Android

`Cargo.toml`

```toml
[target.'cfg(target_os = "android")'.dependencies]
jni = "0.21"
```

Load the application library statically and define native functions in Kotlin. Here the Kotlin class is `com.example.HelloWorld` (the full package name is referenced from the Rust side).

```kotlin
private const val TAG = "MyPlugin"

init {
  try {
    // Load the native library (libapp_lib.so)
    // This is the shared library built by Cargo with crate-type = ["cdylib"]
    System.loadLibrary("app_lib")
    Log.d(TAG, "Successfully loaded libapp_lib.so")
  } catch (e: UnsatisfiedLinkError) {
    Log.e(TAG, "Failed to load libapp_lib.so", e)
    throw e
  }
}

external fun helloWorld(name: String): String?
```

The Rust function name format is `Java_package_class_method`:

```rust
#[cfg(target_os = "android")]
#[no_mangle]
pub extern "system" fn Java_com_example_HelloWorld_helloWorld(
    mut env: JNIEnv,
    _class: JClass,
    name: JString,
) -> jstring {
    log::debug!("Calling JNI Hello World!");
    let name: String = match env.get_string(&name) {
        Ok(s) => s.into(),
        Err(e) => {
            log::error!("Failed to read JString: {}", e);
            return std::ptr::null_mut();
        }
    };
    let result = format!("Hello, {}!", name);

    match env.new_string(result) {
        Ok(jstr) => jstr.into_raw(),
        Err(e) => {
            log::error!("Failed to create JString: {}", e);
            std::ptr::null_mut()
        }
    }
}
```

#### iOS

iOS uses standard C FFI and needs no new dependencies. Functions can be named anything valid but must be annotated with `@_silgen_name(FFI_FUNC)`, where `FFI_FUNC` is the function name called from Rust:

```swift
@_silgen_name("hello_world_ffi")
private static func helloWorldFFI(_ name: UnsafePointer<CChar>) -> UnsafeMutablePointer<CChar>?

@_silgen_name("free_hello_result_ffi")
private static func freeHelloResult(_ result: UnsafeMutablePointer<CChar>)

static func helloWorld(name: String) -> String? {
  // Call Rust FFI
  guard let resultPtr = name.withCString({ helloWorldFFI($0) }) else {
    return nil
  }

  // Convert C string to Swift String
  let result = String(cString: resultPtr)

  // Free the C string
  freeHelloResult(resultPtr)

  return result
}
```

The Rust `extern` functions must match the `@_silgen_name` annotations:

```rust
#[no_mangle]
pub unsafe extern "C" fn hello_world_ffi(c_name: *const c_char) -> *mut c_char {
    let name = match CStr::from_ptr(c_name).to_str() {
        Ok(s) => s,
        Err(e) => {
            log::error!("[iOS FFI] Failed to convert C string: {}", e);
            return std::ptr::null_mut();
        }
    };

    let result = format!("Hello, {}!", name);

    match CString::new(result) {
        Ok(c_str) => c_str.into_raw(),
        Err(e) => {
            log::error!("[iOS FFI] Failed to create C string: {}", e);
            std::ptr::null_mut()
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn free_hello_result_ffi(result: *mut c_char) {
    if !result.is_null() {
        drop(CString::from_raw(result));
    }
}
```

### Android 16KB memory pages

Google is moving to make 16KB memory pages a requirement in all new Android app submissions. Building with NDK 28 or higher should automatically generate compliant bundles. If an older NDK must be used or generated files are not 16KB aligned, add to `.cargo/config.toml`:

```toml
[target.aarch64-linux-android]
rustflags = ["-C", "link-arg=-Wl,-z,max-page-size=16384"]
```

### Permissions

Tauri simplifies checking and requesting end-user permissions.

**Android**: define the permissions and an alias inside the `TauriPlugin` annotation:

```kotlin
@TauriPlugin(
  permissions = [
    Permission(strings = [Manifest.permission.POST_NOTIFICATIONS], alias = "postNotification")
  ]
)
class ExamplePlugin(private val activity: Activity): Plugin(activity) { }
```

**iOS**: override `checkPermissions` and `requestPermissions`:

```swift
class ExamplePlugin: Plugin {
  @objc public override func checkPermissions(_ invoke: Invoke) {
    invoke.resolve(["postNotification": "prompt"])
  }

  @objc public override func requestPermissions(_ invoke: Invoke) {
    // request permissions here
    // then resolve the request
    invoke.resolve(["postNotification": "granted"])
  }
}
```

Tauri automatically implements the commands `checkPermissions` and `requestPermissions`, callable from JavaScript or Rust.

JavaScript:

```javascript
import { invoke, PermissionState } from '@tauri-apps/api/core'

interface Permissions {
  postNotification: PermissionState
}

// check permission state
const permission = await invoke<Permissions>('plugin:<plugin-name>|checkPermissions')

if (permission.postNotification === 'prompt-with-rationale') {
  // show information to the user about why permission is needed
}

// request permission
if (permission.postNotification.startsWith('prompt')) {
  const state = await invoke<Permissions>('plugin:<plugin-name>|requestPermissions', { permissions: ['postNotification'] })
}
```

Rust:

```rust
use serde::{Serialize, Deserialize};
use tauri::{plugin::PermissionState, Runtime};

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct PermissionResponse {
  pub post_notification: PermissionState,
}

#[derive(Serialize)]
struct RequestPermission {
  permissions: Vec<String>,
}

impl<R: Runtime> Notification<R> {
  pub fn request_post_notification_permission(&self) -> crate::Result<PermissionState> {
    self.0
      .run_mobile_plugin::<PermissionResponse>("requestPermissions", RequestPermission { permissions: vec!["postNotification".into()] })
      .map(|r| r.post_notification)
      .map_err(Into::into)
  }

  pub fn check_permissions(&self) -> crate::Result<PermissionResponse> {
    self.0
      .run_mobile_plugin::<PermissionResponse>("checkPermissions", ())
      .map_err(Into::into)
  }
}
```

### Plugin events

Plugins emit events at any time with `trigger`.

**Android**

```kotlin
@TauriPlugin
class ExamplePlugin(private val activity: Activity): Plugin(activity) {
    override fun load(webView: WebView) {
      trigger("load", JSObject())
    }

    override fun onNewIntent(intent: Intent) {
      // handle new intent event
      if (intent.action == Intent.ACTION_VIEW) {
        val data = intent.data.toString()
        val event = JSObject()
        event.put("data", data)
        trigger("newIntent", event)
      }
    }

    @Command
    fun openCamera(invoke: Invoke) {
      val payload = JSObject()
      payload.put("open", true)
      trigger("camera", payload)
    }
}
```

**iOS**

```swift
class ExamplePlugin: Plugin {
  @objc public override func load(webview: WKWebView) {
    trigger("load", data: [:])
  }

  @objc public func openCamera(_ invoke: Invoke) {
    trigger("camera", data: ["open": true])
  }
}
```

Listen from the NPM package with `addPluginListener`:

```javascript
import { addPluginListener, PluginListener } from '@tauri-apps/api/core';

export async function onRequest(
	handler: (url: string) => void
): Promise<PluginListener> {
	return await addPluginListener(
		'<plugin-name>',
		'event-name',
		handler
	);
}
```

## Notes

- Listening to plugin events from JavaScript is gated by the same capability and permission system as plugin commands. Add the plugin's permission (commonly `<plugin-name>:default`, or a specific `allow-listen-*` permission if defined) to the `permissions` array of a capability under `src-tauri/capabilities/`; refer to the plugin's own documentation for the exact identifiers:

```json
{
  "identifier": "default",
  "windows": ["main"],
  "permissions": ["<plugin-name>:default"]
}
```

- Upstream JNI example passes a `JString` directly to `format!` (no `Display`); the string is now read with `env.get_string(&name)` first.
- Upstream Swift FFI example passes the nullable `helloWorldFFI` result straight to `String(cString:)` / `freeHelloResult`; a `guard let` now handles `nil`.
- Upstream iOS permissions example declares `checkPermissions` as `@objc open func` without `override`; `public override` added because `Plugin` already defines it (matching `requestPermissions`).
- Upstream Rust example sends `{"postNotification": true}`; it was changed to the `{"permissions": ["postNotification"]}` shape used by the JavaScript example and the built-in `requestPermissions` handler.
- The source page has a TODO noting that the Plugin Events section may duplicate Lifecycle Events.

## Related

- [Plugin Development](./plugin-development.md)
- Capabilities
