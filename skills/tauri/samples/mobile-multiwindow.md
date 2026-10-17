---
source: https://v2.tauri.app/learn/mobile-multiwindow/
---

# Multi-Window on Mobile

Open additional windows on Android (Activity Embedding split) and iOS (UIScene) from Rust or the frontend.

`src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": ["core:default", "core:webview:allow-create-webview-window"]
}
```

Android: `src-tauri/gen/android/app/build.gradle.kts`

```kotlin
dependencies {
    // ... existing dependencies
    implementation("androidx.window:window:1.5.0")
    implementation("androidx.startup:startup-runtime:1.2.0")
}
```

Android: `DetailActivity.kt` (each extra window type extends `TauriActivity`)

```kotlin
package com.example.app

import android.os.Bundle
import android.os.PersistableBundle

class DetailActivity: TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
  }
}
```

Android: `AndroidManifest.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools">

  <application ...>

    <property
      android:name="android.window.PROPERTY_ACTIVITY_EMBEDDING_SPLITS_ENABLED"
      android:value="true" />

    <!-- Existing MainActivity -->
    <activity
      android:name=".MainActivity"
      android:exported="true"
      ...>
      ...
    </activity>

    <!-- New activity for the detail window -->
    <activity android:name=".DetailActivity" android:exported="true" />

    <!-- Register the split initializer -->
    <provider android:name="androidx.startup.InitializationProvider"
      android:authorities="${applicationId}.androidx-startup"
      android:exported="false"
      tools:node="merge">
      <meta-data android:name="${applicationId}.SplitInitializer"
        android:value="androidx.startup" />
    </provider>

  </application>
</manifest>
```

Android: `SplitInitializer.kt`

```kotlin
package com.example.app

import android.content.Context
import androidx.startup.Initializer
import androidx.window.core.ExperimentalWindowApi
import androidx.window.embedding.RuleController

@OptIn(ExperimentalWindowApi::class)
class SplitInitializer : Initializer<RuleController> {
  override fun create(context: Context): RuleController {
    return RuleController.getInstance(context).apply {
      setRules(RuleController.parseRules(context, R.xml.main_split_config))
    }
  }

  override fun dependencies(): List<Class<out Initializer<*>>> {
    return emptyList()
  }
}
```

Android: `res/xml/main_split_config.xml`

```xml
<resources
  xmlns:window="http://schemas.android.com/apk/res-auto">

  <SplitPairRule
    window:splitRatio="0.33"
    window:splitLayoutDirection="locale"
    window:splitMinWidthDp="840"
    window:splitMaxAspectRatioInPortrait="alwaysAllow"
    window:finishPrimaryWithSecondary="never"
    window:finishSecondaryWithPrimary="never"
    window:clearTop="false">
    <SplitPairFilter
      window:primaryActivityName=".MainActivity"
      window:secondaryActivityName=".DetailActivity"/>
  </SplitPairRule>

</resources>
```

iOS: `src-tauri/Info.ios.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>UIApplicationSceneManifest</key>
  <dict>
    <key>UIApplicationSupportsMultipleScenes</key>
    <true/>
    <key>UISceneConfigurations</key>
    <dict/>
  </dict>
</dict>
</plist>
```

Empty `app.windows` so the main window is created only in setup (`src-tauri/tauri.conf.json`)

```json
{
  "app": {
    "windows": []
  }
}
```

iOS: handle scene requests in `src-tauri/src/lib.rs`

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(target_os = "ios")]
    let mut counter = 0;

    tauri::Builder::default()
        .setup(|app| {
            tauri::WebviewWindowBuilder::new(
                app, "main", tauri::WebviewUrl::default()
            ).build()?;
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(move |app, event| {
            #[cfg(target_os = "ios")]
            if let tauri::RunEvent::SceneRequested { .. } = event {
                counter += 1;
                tauri::WebviewWindowBuilder::new(
                    app,
                    format!("main-{counter}"),
                    tauri::WebviewUrl::default(),
                )
                .build()
                .unwrap();
            }
            #[cfg(not(target_os = "ios"))]
            let _ = (app, event);
        });
}
```

Create a window (JavaScript)

```javascript
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

function openDetail(id) {
  const webview = new WebviewWindow(`detail-${id}`, {
    url: `detail/${id}`,
    activityName: 'DetailActivity',
  });
  webview.once('tauri://created', () => {
    console.log('window created');
  });
  webview.once('tauri://error', (e) => {
    console.error(e);
  });
}
```

Create a window (Rust)

```rust
use tauri::Manager;

let main_window = app.get_webview_window("main").unwrap();
// use the main_window instance so the relationships are determined automatically
let builder = tauri::WebviewWindowBuilder::new(&main_window, "detail", tauri::WebviewUrl::App("detail/1".into()));

#[cfg(target_os = "android")]
let builder = builder.activity_name("DetailActivity");

let window = builder.build()?;
```

## Notes

- Requires Android 12L (API 32)+ and iOS 13+; check at runtime with `await supportsMultipleWindows()` from `@tauri-apps/api/app`.
- Scene-requested iOS windows get dynamic labels (`main-1`, `main-2`, ...); include a wildcard such as `"windows": ["main", "main-*"]` in the capability file.
- On phones the system usually does not show two windows side by side: Android pushes the new activity onto the back stack, and iPhone often replaces the current UI; true concurrent windows are an iPad / large-screen experience.
- Use a browser-history based frontend router (not a hash router) so each window can navigate to a distinct URL path.
- Platform window options: Android `activityName` / `createdByActivityName`, iOS `requestedBySceneIdentifier`; read back with `window.activityName()` / `window.sceneIdentifier()` (Rust: `activity_name()` / `scene_identifier()`).
- app.windows must be empty when setup builds the main window, otherwise the label main is created twice.
- The official snippet passes `main_window` by value; `WebviewWindowBuilder::new` takes `&M`, so a reference is passed here.
