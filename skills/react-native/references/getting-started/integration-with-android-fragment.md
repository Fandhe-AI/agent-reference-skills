---
source: https://reactnative.dev/docs/0.87/integration-with-android-fragment
---

# Integration with an Android Fragment

Use React Native components within Android Fragments of an existing app (the base guide integrates a full-screen Activity).

## Signature / Usage

```kotlin
val reactNativeFragment = ReactFragment.Builder()
    .setComponentName("HelloWorld")
    .setLaunchOptions(Bundle().apply { putString("message", "my value") })
    .build()
supportFragmentManager
    .beginTransaction()
    .add(R.id.react_native_fragment, reactNativeFragment)
    .commit()
```

### 1. Add React Native to your app

Follow `integration-with-existing-apps` until the end so you can safely run your React Native app in a full screen Activity.

### 2. Add a FrameLayout for the React Native Fragment

A `FrameLayout` hosts the Fragment; the approach can be adapted to other layouts such as Bottom Sheets or Tab Layouts. Add to your Activity's layout (e.g. `main_activity.xml` in `res/layouts`):

```xml
<FrameLayout
    android:id="@+id/react_native_fragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### 3. Make your host Activity implement `DefaultHardwareBackBtnHandler`

Because the host activity is not a `ReactActivity`, implement `DefaultHardwareBackBtnHandler` to handle back button press events.

**Kotlin**

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

-class MainActivity : AppCompatActivity() {
+class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
            // Handle button click
        }
    }

+   override fun invokeDefaultOnBackPressed() {
+       onBackPressedDispatcher.onBackPressed()
+   }
}
```

**Java**

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

-class MainActivity extends AppCompatActivity {
+class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
            // Handle button click
        });
    }

+   @Override
+   public void invokeDefaultOnBackPressed() {
+       getOnBackPressedDispatcher().onBackPressed();
+   }
}
```

### 4. Add a React Native Fragment to the FrameLayout

Assume your Activity has a button with id `sample_button` that, when clicked, renders a React Native Fragment into the FrameLayout. Update `onCreate`:

**Kotlin**

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

public class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
+           val reactNativeFragment = ReactFragment.Builder()
+               .setComponentName("HelloWorld")
+               .setLaunchOptions(Bundle().apply { putString("message", "my value") })
+               .build()
+           supportFragmentManager
+               .beginTransaction()
+               .add(R.id.react_native_fragment, reactNativeFragment)
+               .commit()
        }
    }

   override fun invokeDefaultOnBackPressed() {
       super.onBackPressed()
   }
}
```

**Java**

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.ReactFragment;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
+           Bundle launchOptions = new Bundle();
+           launchOptions.putString("message", "my value");
+
+           ReactFragment fragment = new ReactFragment.Builder()
+                   .setComponentName("HelloWorld")
+                   .setLaunchOptions(launchOptions)
+                   .build();
+           getSupportFragmentManager()
+                   .beginTransaction()
+                   .add(R.id.react_native_fragment, fragment)
+                   .commit();
        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

### 5. Test your integration

Run `yarn start` to run the bundler, then run your Android app in Android Studio. The app loads the JavaScript/TypeScript code from the development server and displays it in the React Native Fragment.

## Options / Props

`ReactFragment.Builder()` methods:

| Name | Type | Description |
| --- | --- | --- |
| setComponentName | String | Name of the component to render; the same string specified in your `index.js` inside `registerComponent`. |
| setLaunchOptions | Bundle (optional) | Initial props to pass to your component. Can be removed if unused. |

## Notes

- Adapted (not in the official docs): in the Kotlin diff of step 3 the old class declaration is marked as a removed (-) line; the official diff lists both declarations as added.
- Deprecated (original warning on `Activity.onBackPressed()`): it has been deprecated since API level 33. On Android 16 devices with apps targeting API level 36 it will no longer be called (https://developer.android.com/about/versions/16/behavior-changes-16#predictive-back) and `OnBackPressedDispatcher` (https://developer.android.com/reference/androidx/activity/OnBackPressedDispatcher) should be used instead.
- Distance: the Activity / Fragment / `FragmentManager` APIs themselves are native Android, see android-architecture; Gradle setup is in android-build-gradle. `ReactFragment` and `DefaultHardwareBackBtnHandler` are React Native APIs.

## Related

- [Integration with Existing Apps](./integration-with-existing-apps.md)
- [Set Up Your Environment](./set-up-your-environment.md)
