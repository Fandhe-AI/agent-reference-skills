---
source: https://reactnative.dev/docs/0.87/running-on-device
---

# Running On Device

It's always a good idea to test your app on an actual device before releasing it to your users. This document will guide you through the necessary steps to run your React Native app on a device and to get it ready for production.

## Signature / Usage

**Android** (macOS / Windows / Linux), from the root of your project:

**npm**

```shell
npm run android
```

**Yarn**

```shell
yarn android
```

**iOS** (macOS only): open the `.xcodeproj` (or `.xcworkspace` if using CocoaPods) under the `ios` folder in Xcode, then press **Build and run** (<kbd>Cmd ⌘</kbd> + <kbd>R</kbd>) or select **Run** from the **Product** menu.

## Running your app on Android devices

### 1. Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to **Settings** → **About phone** → **Software information** and then tapping the `Build number` row at the bottom seven times. You can then go back to **Settings** → **Developer options** to enable "USB debugging".

### 2. Plug in your device via USB

Plug in your device via USB to your development machine.

**Linux only:** check the manufacturer code by using `lsusb` (on mac, you must first [install lsusb](https://github.com/jlhonora/lsusb)). Find the line that represents your phone (if in doubt, unplug the phone and run the command again; the line that disappears is the one). From the device ID (for example `22b8:2e76` on `Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`), grab the first four digits (`22b8`, the identifier for Motorola) and input it into your udev rules:

```shell
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

Make sure that you replace `22b8` with the identifier you get in the above command.

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running `adb devices`.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Seeing `device` in the right column means the device is connected. You must have **only one device connected** at a time.

### 3. Run your app

From the root of your project, run `npm run android` / `yarn android` (see Signature / Usage) to install and launch your app on the device.

### Connecting to the development server

You can also iterate quickly on a device by connecting to the development server running on your development machine. There are several ways of accomplishing this, depending on whether you have access to a USB cable or a Wi-Fi network.

#### Method 1: Using adb reverse (recommended)

You can use this method if your device is running Android 5.0 (Lollipop) or newer, it has USB debugging enabled, and it is connected via USB to your development machine.

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

To find the device name, run the following adb command:

```shell
$ adb devices
```

You can now enable Fast Refresh from the Dev Menu. Your app will reload whenever your JavaScript code has changed.

#### Method 2: Connect via Wi-Fi

You can also connect to the development server over Wi-Fi. You'll first need to install the app on your device using a USB cable, but once that has been done you can debug wirelessly by following these instructions. You'll need your development machine's current IP address before proceeding.

Find the IP address:

- **macOS:** **System Settings (or System Preferences)** → **Network**.
- **Windows:** open the command prompt and type `ipconfig`.
- **Linux:** open a terminal and type `/sbin/ifconfig`.

1. Make sure your laptop and your phone are on the **same** Wi-Fi network.
2. Open your React Native app on your device.
3. You'll see a red screen with an error. This is OK. The following steps will fix that.
4. Open the in-app Dev Menu.
5. Go to **Dev Settings** → **Debug server host & port for device**.
6. Type in your machine's IP address and the port of the local dev server (e.g. `10.0.1.1:8081`).
7. Go back to the **Dev Menu** and select **Reload JS**.

You can now enable Fast Refresh from the Dev Menu. Your app will reload whenever your JavaScript code has changed.

### Building your app for production

You have built a great app using React Native, and you are now itching to release it in the Play Store. The process is the same as any other native Android app, with some additional considerations to take into account. Follow the guide for generating a signed APK (see `signed-apk-android` in platform-guides) to learn more.

## Running your app on iOS devices

### macOS

#### 1. Plug in your device via USB

Connect your iOS device to your Mac using a USB to Lightning or USB-C cable. Navigate to the `ios` folder in your project, then open the `.xcodeproj` file, or if you are using CocoaPods open `.xcworkspace`, within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the **Product** menu from Xcode's menubar, then go to **Destination**. Look for and select your device from the list. Xcode will then register your device for development.

#### 2. Configure code signing

Register for an [Apple Developer account](https://developer.apple.com/) if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple Developer account or team is selected under the Team dropdown. Do the same for the tests target (it ends with Tests, and is below your main target).

**Repeat** this step for the **Tests** target in your project.

#### 3. Build and Run your app

If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane (<kbd>Shift ⇧</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>2</kbd>). You can now press the **Build and run** button (<kbd>Cmd ⌘</kbd> + <kbd>R</kbd>) or select **Run** from the **Product** menu. Your app will launch on your device shortly.

If you run into any issues, please take a look at Apple's [Launching Your App on a Device](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) docs.

#### Connecting to the development server

You can also iterate quickly on a device using the development server. You only have to be on the same Wi-Fi network as your computer. Shake your device to open the Dev Menu, then enable Fast Refresh. Your app will reload whenever your JavaScript code has changed.

#### Troubleshooting

If you have any issues, ensure that your Mac and device are on the same network and can reach each other. Many open wireless networks with captive portals are configured to prevent devices from reaching other devices on the network. You may use your device's Personal Hotspot feature in this case. You may also share your internet (Wi-Fi/Ethernet) connection from your Mac to your device via USB and connect to the bundler through this tunnel for very high transfer speeds.

When trying to connect to the development server you might get a red screen with an error saying:

> Connection to `http://localhost:8081/debugger-proxy?role=client` timed out. Are you running node proxy? If you are running on the device, check if you have the right IP address in `RCTWebSocketExecutor.m`.

To solve this issue check the following points.

1. **Wi-Fi network.** Make sure your laptop and your phone are on the **same** Wi-Fi network.
2. **IP address.** Make sure that the build script detected the IP address of your machine correctly (e.g. `10.0.1.123`). Open the **Report navigator** tab, select the last **Build** and search for `IP=` followed by an IP address. The IP address which gets embedded in the app should match your machines IP address.

#### Building your app for production

You have built a great app using React Native, and you are now itching to release it in the App Store. The process is the same as any other native iOS app, with some additional considerations to take into account. Follow the guide for publishing to the Apple App Store (see `publishing-to-app-store` in platform-guides) to learn more.

### Windows / Linux

A Mac is required in order to build your app for iOS devices. Alternatively, you can refer to the environment setup guide to learn how to build your app using Expo CLI, which will allow you to run your app using the Expo client app.

## Notes

- If you used `create-expo-app` to set up your project, you can run your app on a device in Expo Go by scanning the QR code that is displayed when you run `npm start`. Refer to the Expo guide for [running your project on your device](https://docs.expo.dev/get-started/expo-go/) for more information.
- If you see `unauthorized` in the `adb devices` list you will need to run `adb reverse tcp:8081 tcp:8081` and press allow USB debugging on the device (macOS tab of the original page).
- If you get a "bridge configuration isn't available" error, see Method 1: Using adb reverse (macOS and Linux tabs of the original page).
- You can also use the `React Native CLI` to generate and run a `release` build (e.g. from the root of your project: `yarn android --mode release`).
- Expo (Expo SDK, Expo Go, Expo CLI, EAS) is covered by the expo skill, only if that skill is installed; this page covers the React Native CLI flow.

## Related

- [fast-refresh.md](./fast-refresh.md)
- [metro.md](./metro.md)
