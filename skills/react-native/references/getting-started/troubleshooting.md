---
source: https://reactnative.dev/docs/0.87/troubleshooting
---

# Troubleshooting

Common issues encountered while setting up React Native. If something is not listed, search GitHub issues (https://github.com/react/react-native/issues/).

## Signature / Usage

```shell
sudo lsof -i :8081
kill -9 <PID>
```

## Notes

### Port already in use

The Metro bundler (https://metrobundler.dev/) runs on port 8081. If another process is using that port, terminate it or change the bundler port.

Find the process id listening on 8081 and terminate it (commands above). On Windows, find the process using port 8081 with Resource Monitor (https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows) and stop it using Task Manager.

Use a port other than 8081 with the `port` parameter, from the project root:

**npm**

```shell
npm start -- --port=8088
```

**Yarn**

```shell
yarn start --port 8088
```

You will also need to update your applications to load the JavaScript bundle from the new port. If running on device from Xcode, update occurrences of `8081` to your chosen port in the `ios/__App_Name__.xcodeproj/project.pbxproj` file.

### NPM locking error

If you encounter an error such as `npm WARN locking Error: EACCES` while using the React Native CLI:

```shell
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Missing libraries for React

If you added React Native manually, include all relevant dependencies you use, like `RCTText.xcodeproj`, `RCTImage.xcodeproj`. The binaries built by these dependencies have to be linked to your app binary using the `Linked Frameworks and Binaries` section in the Xcode project settings (details: `linking-libraries-ios`).

With CocoaPods, verify React is added along with the subspecs to the `Podfile`. For example, to use the `<Text />`, `<Image />` and `fetch()` APIs:

```text
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

Then run `pod install` and confirm a `Pods/` directory was created with React installed. CocoaPods will instruct you to use the generated `.xcworkspace` file henceforth.

#### React Native does not compile when being used as a CocoaPod

The CocoaPods plugin cocoapods-fix-react-native (https://github.com/orta/cocoapods-fix-react-native) handles any potential post-fixing of the source code due to differences when using a dependency manager.

#### Argument list too long: recursive header expansion failed

In the project's build settings, `User Search Header Paths` and `Header Search Paths` specify where Xcode looks for `#import` header files. For Pods, CocoaPods uses a default array of specific folders. Verify this config is not overwritten and that none of the configured folders are too large; otherwise Xcode recursively searches the entire directory and throws this error. To revert both settings to the CocoaPods defaults, select the entry in the Build Settings panel and hit delete.

### No transports available

React Native implements a polyfill for WebSockets, initialized as part of the react-native module (https://github.com/react/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js). If you load another module that requires WebSockets, such as Firebase (https://github.com/react/react-native/issues/3645), load/require it after react-native:

```text
import Firebase from 'firebase';
```

### Shell Command Unresponsive Exception

For:

```text
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

restart the ADB server:

```text
adb kill-server
adb start-server
```

### Unable to start react-native package manager (on Linux)

Case 1: Error `"code":"ENOSPC","errno":"ENOSPC"`. Caused by the number of directories inotify (used by watchman on Linux) can monitor (https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers). Run:

```shell
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Error: spawnSync ./gradlew EACCES

If `npm run android` or `yarn android` on macOS throws this error, run `sudo chmod +x android/gradlew` to make `gradlew` files executable.

## Related

- [Set Up Your Environment](./set-up-your-environment.md)
- [Get Started Without a Framework](./getting-started-without-a-framework.md)
