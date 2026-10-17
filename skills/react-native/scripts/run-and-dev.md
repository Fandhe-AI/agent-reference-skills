---
source: https://reactnative.dev/docs/0.87/running-on-device
---

# Run and Dev

Commands for starting Metro and running the app on emulators, simulators and devices. Other sources: https://reactnative.dev/docs/0.87/get-started-without-a-framework, https://reactnative.dev/docs/0.87/running-on-simulator-ios, https://reactnative.dev/docs/0.87/troubleshooting.

## Start the Metro development server

```sh
npm start
```

```sh
yarn start
```

Run from the project folder and keep it running in its own terminal.

## Run on Android

```sh
npm run android
```

```sh
yarn android
```

Run from a second terminal in the project folder. Works for an emulator or a USB-connected device.

## Run on the iOS Simulator

```sh
npm run ios
```

```sh
yarn ios
```

macOS with Xcode only.

## Specify the iOS simulator device

```sh
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

```sh
yarn ios --simulator "iPhone SE (3rd generation)"
```

The docs state the default is `"iPhone 14"`. Device names correspond to the list in Xcode.

## Specify the iOS simulator device and OS version

```sh
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

```sh
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

Needed when multiple iOS versions are installed.

## List available simulators

```sh
xcrun simctl list devices
```

## Specify the iOS simulator by UDID

```sh
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

```sh
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

Replace the placeholder with a UDID returned by `xcrun simctl list devices`.

## Check the connected Android device

```sh
adb devices
```

`device` in the right column means the device is connected. Only one device may be connected at a time.

## Forward the Metro port to an Android device

```sh
adb -s "${DEVICE_SERIAL}" reverse tcp:8081 tcp:8081
```

Recommended method for Android 5.0 or newer with USB debugging. Set `DEVICE_SERIAL` to the value in the left column of `adb devices`. The docs also use this command for the `unauthorized` case and the "bridge configuration isn't available" error.

## Open the Android Dev Menu from the command line

```sh
adb shell input keyevent 82
```

Source: https://reactnative.dev/docs/0.87/debugging.

## Allow the Android device through udev (Linux)

> **警告**: `sudo tee` で `/etc/udev/rules.d/` を書き換える。システム設定を変更するため、自分のマシンで内容を理解したうえで実行する。

```sh
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

Replace `22b8` with the vendor ID obtained from `lsusb` for your device.

## Find the USB vendor ID (Linux)

```sh
lsusb
```

On macOS, `lsusb` must be installed first (see the docs link to jlhonora/lsusb).

## Run on Android in release mode

```sh
yarn android --mode release
```

Available only after signing is configured (see `build-release.md`).

## Use a port other than 8081

```sh
npm start -- --port=8088
```

```sh
yarn start --port 8088
```

The app must also be updated to load the bundle from the new port.

## Find the process using port 8081

```sh
lsof -i :8081
```

## Terminate the process using port 8081

> **警告**: `kill -9` はプロセスを強制終了する。直前の `lsof` で特定した PID が意図したプロセスであることを確認してから実行する。

```sh
kill -9 "${PID}"
```

Set `PID` to the value shown in the output of the preceding `lsof` command.

## Restart the ADB server

```sh
adb kill-server
adb start-server
```

For `ShellCommandUnresponsiveException` during `:app:installDebug`.

## Fix npm locking error

> **警告**: `sudo chown -R` でグローバルの npm ディレクトリの所有者を変更する。対象パスを確認し、共有マシンでは実行しない。

```sh
sudo chown -R "${USER}" "${HOME}/.npm"
sudo chown -R "${USER}" /usr/local/lib/node_modules
```

For `npm WARN locking Error: EACCES`.

## Increase the inotify watcher limit (Linux)

> **警告**: `/etc/sysctl.conf` に追記しカーネル設定を再読み込みする。システム全体に影響するため、自分のマシンでのみ実行する。

```sh
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

For Metro failing with `ENOSPC` (watchman on Linux).

## Make gradlew executable

```sh
chmod +x android/gradlew
```

For `spawnSync ./gradlew EACCES`, which the docs describe for macOS.

## Notes

- The troubleshooting page prefixes `lsof -i :8081` and `chmod +x android/gradlew` with `sudo`; dropped here because both normally act on files and processes the user owns.
- The troubleshooting page writes `$USER` and `~/.npm` unquoted; quoted here as `"${USER}"` and `"${HOME}/.npm"`.
- The source writes these placeholders as `<device name>` and `<PID>`; replaced here with quoted shell variables because `<` is a redirection.
