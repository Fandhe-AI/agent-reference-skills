---
source: https://reactnative.dev/docs/0.87/headless-js-android
---

# Headless JS

Headless JS is a way to run tasks in JavaScript while your app is in the background. It can be used, for example, to sync fresh data, handle push notifications, or play music.

## Signature / Usage

A task is an async function that you register on `AppRegistry`, similar to registering React applications:

```tsx
import {AppRegistry} from 'react-native';
AppRegistry.registerHeadlessTask('SomeTaskName', () =>
  require('./SomeTaskName'),
);
```

Then, in `SomeTaskName.js`:

```tsx
module.exports = async taskData => {
  // do stuff
};
```

You can do anything in your task such as network requests, timers and so on, as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved), React Native will go into "paused" mode (unless there are other tasks running, or there is a foreground app).

### The Platform API

This still requires some thin native code: extend `HeadlessJsTaskService` and override `getTaskConfig`.

**Java**

```java
package com.your_application_name;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class MyTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "SomeTaskName",
          Arguments.fromBundle(extras),
          5000, // timeout in milliseconds for the task
          false // optional: defines whether or not the task is allowed in foreground. Default is false
        );
    }
    return null;
  }
}
```

**Kotlin**

```kotlin
package com.your_application_name;

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class MyTaskService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent?): HeadlessJsTaskConfig? {
        return intent?.extras?.let {
            HeadlessJsTaskConfig(
                "SomeTaskName",
                Arguments.fromBundle(it),
                5000, // timeout for the task
                false // optional: defines whether or not the task is allowed in foreground.
                // Default is false
            )
        }
    }
}
```

Then add the service to your `AndroidManifest.xml` file inside the `application` tag:

```xml
<service android:name="com.your_application_name.MyTaskService" />
```

Now, whenever you start your service (see Android `Context.startService`), e.g. as a periodic task or in response to some system event / broadcast, JS will spin up, run your task, then spin down.

**Java**

```java
Intent service = new Intent(getApplicationContext(), MyTaskService.class);
Bundle bundle = new Bundle();

bundle.putString("foo", "bar");
service.putExtras(bundle);

// MyTaskService must call startForeground() with a notification (and declare android:foregroundServiceType on API 34+), otherwise use startService when the app is allowed to start background services
getApplicationContext().startForegroundService(service);
```

**Kotlin**

```kotlin
val service = Intent(applicationContext, MyTaskService::class.java)
val bundle = Bundle()

bundle.putString("foo", "bar")

service.putExtras(bundle)

// MyTaskService must call startForeground() with a notification (and declare android:foregroundServiceType on API 34+), otherwise use startService when the app is allowed to start background services
applicationContext.startForegroundService(service)
```

### Retries

By default, the headless JS task will not perform any retries. In order to do so, you need to create a `HeadlessJsTaskRetryPolicy` and throw a specific `Error`.

`LinearCountingRetryPolicy` is an implementation of `HeadlessJsTaskRetryPolicy` that allows you to specify a maximum number of retries with a fixed delay between each attempt. If that does not suit your needs then you can implement your own `HeadlessJsTaskRetryPolicy`. These policies can be passed as an extra argument to the `HeadlessJsTaskConfig` constructor.

**Java**

```java
// import com.facebook.react.jstasks.HeadlessJsTaskRetryPolicy;
// import com.facebook.react.jstasks.LinearCountingRetryPolicy;
HeadlessJsTaskRetryPolicy retryPolicy = new LinearCountingRetryPolicy(
  3, // Max number of retry attempts
  1000 // Delay between each retry attempt
);

return new HeadlessJsTaskConfig(
  "SomeTaskName",
  Arguments.fromBundle(extras),
  5000,
  false,
  retryPolicy
);
```

**Kotlin**

```kotlin
val retryPolicy: HeadlessJsTaskRetryPolicy =
    LinearCountingRetryPolicy(
        3, // Max number of retry attempts
        1000 // Delay between each retry attempt
    )

return HeadlessJsTaskConfig("SomeTaskName", Arguments.fromBundle(extras), 5000, false, retryPolicy)
```

A retry attempt will only be made when a specific `Error` is thrown. Inside a headless JS task, you can import the error and throw it when a retry attempt is required.

```tsx
import HeadlessJsTaskError from 'react-native/Libraries/ReactNative/HeadlessJsTaskError';

module.exports = async taskData => {
  const condition = ...;
  if (!condition) {
    throw new HeadlessJsTaskError();
  }
};
```

If you wish all errors to cause a retry attempt, you will need to catch them and throw the above error.

### Example Usage

Service can be started from Java API. First you need to decide when the service should be started and implement your solution accordingly. The example reacts to network connection change. Register the broadcast receiver in the Android manifest:

```xml
<!-- outside <application>, required by ConnectivityManager -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Not delivered to manifest-declared receivers when targetSdk >= 24 -->
<receiver android:name=".NetworkChangeReceiver" android:exported="false" >
  <intent-filter>
    <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
  </intent-filter>
</receiver>
```

Broadcast receiver then handles intent that was broadcasted in onReceive function. This is a great place to check whether your app is on foreground or not. If app is not on foreground we can prepare our intent to be started, with no information or additional information bundled using `putExtra` (keep in mind bundle can handle only parcelable values). In the end service is started and wakelock is acquired.

**Java**

```java
import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.os.Build;

import com.facebook.react.HeadlessJsTaskService;

import java.util.List;

public class NetworkChangeReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(final Context context, final Intent intent) {
        /**
         This part will be called every time network connection is changed
         e.g. Connected -> Not Connected
         **/
        if (!isAppOnForeground((context))) {
            /**
             We will start our service and send extra info about
             network connections
             **/
            boolean hasInternet = isNetworkAvailable(context);
            Intent serviceIntent = new Intent(context, MyTaskService.class);
            serviceIntent.putExtra("hasInternet", hasInternet);
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
                // MyTaskService must call startForeground() with a notification (and declare android:foregroundServiceType on API 34+), otherwise use startService when the app is allowed to start background services
                context.startForegroundService(serviceIntent);
                HeadlessJsTaskService.acquireWakeLockNow(context);
            } else {
                // Android 12+: background foreground-service starts are disallowed; schedule work with WorkManager (NetworkType.CONNECTED constraint) instead
            }
        }
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         https://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager cm = (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Network networkCapabilities = cm.getActiveNetwork();

            if(networkCapabilities == null) {
                return false;
            }

            NetworkCapabilities actNw = cm.getNetworkCapabilities(networkCapabilities);

            if(actNw == null) {
                return false;
            }

            if(actNw.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) || actNw.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) || actNw.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)) {
                return true;
            }

            return false;
        }

        // deprecated in API level 29
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        return (netInfo != null && netInfo.isConnected());
    }
}
```

**Kotlin**

```kotlin
import android.app.ActivityManager
import android.app.ActivityManager.RunningAppProcessInfo
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import com.facebook.react.HeadlessJsTaskService

class NetworkChangeReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        /**
         * This part will be called every time network connection is changed e.g. Connected -> Not
         * Connected
         */
        if (!isAppOnForeground(context)) {
            /** We will start our service and send extra info about network connections */
            val hasInternet = isNetworkAvailable(context)
            val serviceIntent = Intent(context, MyTaskService::class.java)
            serviceIntent.putExtra("hasInternet", hasInternet)
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
                // MyTaskService must call startForeground() with a notification (and declare android:foregroundServiceType on API 34+), otherwise use startService when the app is allowed to start background services
                context.startForegroundService(serviceIntent)
                HeadlessJsTaskService.acquireWakeLockNow(context)
            } else {
                // Android 12+: background foreground-service starts are disallowed; schedule work with WorkManager (NetworkType.CONNECTED constraint) instead
            }
        }
    }

    private fun isAppOnForeground(context: Context): Boolean {
        /**
         * We need to check if app is in foreground otherwise the app will crash.
         * https://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         */
        val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val appProcesses = activityManager.runningAppProcesses ?: return false
        val packageName: String = context.getPackageName()
        for (appProcess in appProcesses) {
            if (appProcess.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName == packageName
            ) {
                return true
            }
        }
        return false
    }

    companion object {
        fun isNetworkAvailable(context: Context): Boolean {
            val cm = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            var result = false

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val networkCapabilities = cm.activeNetwork ?: return false

                val actNw = cm.getNetworkCapabilities(networkCapabilities) ?: return false

                result =
                    when {
                        actNw.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true
                        actNw.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true
                        actNw.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> true
                        else -> false
                    }

                return result
            } else {
                cm.run {
                    // deprecated in API level 29
                    cm.activeNetworkInfo?.run {
                        result =
                            when (type) {
                                ConnectivityManager.TYPE_WIFI -> true
                                ConnectivityManager.TYPE_MOBILE -> true
                                ConnectivityManager.TYPE_ETHERNET -> true
                                else -> false
                            }
                    }
                }
            }
            return result
        }
    }
}
```

## Notes

- Deviation from official docs: Manifest service name aligned with the example package (com.your_application_name) instead of com.example. `com.your_application_name` stands for the app's own package.
- Deviation from official docs: added the ACCESS_NETWORK_STATE uses-permission required by ConnectivityManager.getActiveNetwork / getNetworkCapabilities / getActiveNetworkInfo (omitted in the official example; without it a SecurityException is thrown).
- Corrected: the official snippets used require('SomeTaskName') (package resolution), intent.extras on a nullable Intent, and a single-quoted Java string; missing java.util.List import.
- By default, your app will crash if you try to run a task while the app is in the foreground. This is to prevent developers from shooting themselves in the foot by doing a lot of work in a task and slowing the UI. You can pass a fourth `boolean` argument to control this behaviour.
- If you start your service from a `BroadcastReceiver`, make sure to call `HeadlessJsTaskService.acquireWakeLockNow()` before returning from `onReceive()`.
- The official page's Java example uses the non-existent type HeadlessJsRetryPolicy; corrected here to HeadlessJsTaskRetryPolicy (com.facebook.react.jstasks, as of v0.87.0).
- The official page imports {HeadlessJsTaskError} from 'HeadlessJsTask' (a Haste module name that does not resolve); corrected to the default export at react-native/Libraries/ReactNative/HeadlessJsTaskError (deep import, v0.87.0).
- HeadlessJsTaskService does not call startForeground(); when started via startForegroundService the subclass must post a notification with startForeground() within the system deadline and declare a foregroundServiceType (Android 14+), which the official page omits.
- Since Android 7.0 (API 24) CONNECTIVITY_CHANGE is not delivered to manifest-declared receivers; register the receiver at runtime with Context.registerReceiver or use ConnectivityManager.NetworkCallback / WorkManager network constraints instead (the official example predates this).
- Deviation from the official page: android:exported="false" is added to the receiver (required when targeting Android 12+).
- Deviation from the official page: the service start is limited to API < 31 because Android 12+ forbids starting foreground services from the background (ForegroundServiceStartNotAllowedException); use WorkManager with a network constraint instead.
- Android only. The native side (Service, BroadcastReceiver, manifest) is plain Android; see the android-architecture skill for Android components in general. This is the React Native `HeadlessJsTaskService` API, not a Kotlin or Compose API.

## Related

- [Communication between native and React Native (Android)](./communication-android.md)
- [React Native Gradle Plugin](./react-native-gradle-plugin.md)
