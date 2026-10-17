---
source: https://reactnative.dev/docs/0.87/set-up-your-environment
---

# Set Up Your Environment

Set up Android Studio and Xcode so you can run a React Native project on Android emulators and iOS simulators and build the app locally.

## Signature / Usage

macOS, Android and iOS:

```shell
brew install node
brew install watchman
```

## Options / Props

Development OS x Target OS support:

| Development OS | Android | iOS |
| --- | --- | --- |
| macOS | Supported (see macOS / Android) | Supported (see macOS / iOS) |
| Windows | Supported (see Windows / Android) | Unsupported |
| Linux | Supported (see Linux / Android) | Unsupported |

## Notes

- This guide requires Android Studio or Xcode. If one is already installed, setup takes a few minutes; otherwise expect about an hour installing and configuring.
- Setting up your environment is not required if you are using a Framework (`/architecture/glossary#react-native-framework`): the Framework builds the native app for you. If you cannot use a Framework or want to write your own, setup is required; afterwards see `getting-started-without-a-framework`.
- Windows / iOS and Linux / iOS are Unsupported: a Mac is required to build projects with native code for iOS. You can use Expo Go (https://expo.dev/go) from Expo (`environment-setup#start-a-new-react-native-project-with-expo`) to develop on your iOS device.
- Node 22.11.0 or newer is required (macOS, Windows and Linux sections). JDK 17 is recommended; higher JDK versions may cause problems.
- Android builds with native code require the `Android 15 (VanillaIceCream)` SDK (`Android SDK Platform 35`, Build-Tools `36.0.0`).

## macOS, Android

### Installing dependencies

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio. While you can use any editor, you need Android Studio to set up the tooling to build your React Native app for Android.

#### Node and Watchman

Install with Homebrew (https://brew.sh/):

```shell
brew install node
brew install watchman
```

If Node is already installed, make sure it is Node 22.11.0 or newer. Watchman (https://facebook.github.io/watchman) is a tool by Facebook for watching changes in the filesystem; installing it is highly recommended for better performance.

#### Java Development Kit

Azul **Zulu** OpenJDK via Homebrew is recommended:

```shell
brew install --cask zulu@17

# Get path to where cask was installed to find the JDK installer
brew info --cask zulu@17

# ==> zulu@17: <version number>
# https://www.azul.com/downloads/
# Installed
# /opt/homebrew/Caskroom/zulu@17/<version number> (185.8MB) (note that the path is /usr/local/Caskroom on non-Apple Silicon Macs)
# Installed using the formulae.brew.sh API on 2024-06-06 at 10:00:00

# Navigate to the folder
open /opt/homebrew/Caskroom/zulu@17/<version number> # or /usr/local/Caskroom/zulu@17/<version number>
```

In Finder, double click `Double-Click to Install Azul Zulu JDK 17.pkg`. After installation, add or update `JAVA_HOME` in `~/.zshrc` (or `~/.bash_profile`). The JDK will likely be at `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`:

```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

The Zulu OpenJDK distribution offers JDKs for both Intel and M1 Macs, making builds faster on M1 Macs than with an Intel-based JDK. If a JDK is already installed, JDK 17 is recommended; higher versions may cause problems.

#### Android development environment

1. Install Android Studio: download from https://developer.android.com/studio. In the installation wizard check `Android SDK`, `Android SDK Platform`, `Android Virtual Device`, then "Next". If the checkboxes are grayed out you can install these components later.
2. Install the Android SDK: Android Studio installs the latest SDK by default, but building with native code requires `Android 15 (VanillaIceCream)`. Open Android Studio, "More Actions" > "SDK Manager" (also under **Languages & Frameworks** > **Android SDK** in "Settings"). In "SDK Platforms" check "Show Package Details", expand `Android 15 (VanillaIceCream)` and check:
   - `Android SDK Platform 35`
   - `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image` or (for Apple M1 Silicon) `Google APIs ARM 64 v8a System Image`

   In "SDK Tools" check "Show Package Details", expand "Android SDK Build-Tools" and select `36.0.0` and `Android SDK Command-line Tools (latest)`. Click "Apply".
3. Configure the ANDROID_HOME environment variable: add to `~/.zprofile` or `~/.zshrc` (for `bash`, `~/.bash_profile` or `~/.bashrc`):

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Run `source ~/.zprofile` (or `source ~/.bash_profile` for `bash`), then verify with `echo $ANDROID_HOME` and `echo $PATH`. Use the correct SDK path shown in Android Studio "Settings" under **Languages & Frameworks** > **Android SDK**.

### Preparing the Android device

You need a physical Android device or an Android Virtual Device (AVD).

- Physical device: plug it in over USB and follow `running-on-device`.
- Virtual device: if you open `./AwesomeProject/android` in Android Studio, open the "AVD Manager". If recently installed, create a new AVD (https://developer.android.com/studio/run/managing-avds.html): "Create Virtual Device...", pick any Phone, "Next", select the **VanillaIceCream** API Level 35 image, "Next" then "Finish". Click the green triangle next to your AVD to launch it.

## macOS, iOS

### Installing dependencies

You will need Node, Watchman, the React Native command line interface, Xcode and CocoaPods. You need Xcode to set up the tooling to build for iOS.

#### Node and Watchman

```shell
brew install node
brew install watchman
```

Node 22.11.0 or newer; Watchman is highly recommended for better performance.

#### Xcode

Use the **latest version** of Xcode, installed from the Mac App Store (https://itunes.apple.com/us/app/xcode/id497799835?mt=12). It also installs the iOS Simulator and all necessary tools.

Command Line Tools: open Xcode, **Settings... (or Preferences...)** from the Xcode menu, go to the Locations panel and select the most recent version in the Command Line Tools dropdown.

Installing an iOS Simulator: open **Xcode > Settings... (or Preferences...)**, select the **Platforms (or Components)** tab and select a simulator with the iOS version you want. With Xcode 14.0 or greater, open **Xcode > Settings > Platforms**, click "+" and select **iOS...**.

#### CocoaPods

CocoaPods (https://cocoapods.org/) is a dependency management system for iOS, a Ruby gem installable using the Ruby that ships with the latest macOS. See the CocoaPods Getting Started guide: https://guides.cocoapods.org/using/getting-started.html

#### [Optional] Configuring your environment

Starting from React Native 0.69, you can configure the Xcode environment using the `.xcode.env` file provided by the template. It exports the path to the `node` executable in the `NODE_BINARY` variable. This is the **suggested approach** to decouple the build infrastructure from the system version of `node`; customize it with your own path or node version manager. You can add other environment variables and source `.xcode.env` in your build script phases, which decouples build phases from a specific environment.

If you already use NVM (https://nvm.sh/) and zsh (https://ohmyz.sh/), move the code that initializes NVM from `~/.zshrc` into `~/.zshenv` so Xcode finds your Node executable:

```zsh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

Also ensure all "shell script build phase" of your Xcode project use `/bin/zsh` as the shell.

## Windows, Android

### Installing dependencies

You will need Node, the React Native command line interface, a JDK, and Android Studio.

#### Node, JDK

Install Node via Chocolatey (https://chocolatey.org/install). An LTS version of Node is recommended; to switch between versions use nvm-windows (https://github.com/coreybutler/nvm-windows). React Native also requires a JDK (https://openjdk.java.net/projects/jdk/17/), installable with Chocolatey. In an Administrator Command Prompt:

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

Node must be 22.11.0 or newer; JDK 17 is recommended. Other Node installation options: https://nodejs.org/en/download/

If you are using the latest JDK, change the Gradle version of your project so it recognizes the JDK: edit the `distributionUrl` value in `{project root folder}\android\gradle\wrapper\gradle-wrapper.properties` (Gradle releases: https://gradle.org/releases/).

#### Android development environment

1. Install Android Studio (https://developer.android.com/studio). In the wizard check `Android SDK`, `Android SDK Platform`, `Android Virtual Device`, and, if you are not already using Hyper-V, `Performance (Intel ® HAXM)` (AMD or Hyper-V: https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html).
2. Install the Android SDK: `Android 15 (VanillaIceCream)` with `Android SDK Platform 35` and `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`; in SDK Tools, "Android SDK Build-Tools" `36.0.0` and `Android SDK Command-line Tools (latest)`. Click "Apply".
3. Configure the ANDROID_HOME environment variable: open the **Windows Control Panel**, click **User Accounts** twice, click **Change my environment variables**, then **New...** to create an `ANDROID_HOME` user variable pointing to your Android SDK. The default location:

```powershell
%LOCALAPPDATA%\Android\Sdk
```

Open a new Command Prompt, then in PowerShell run `Get-ChildItem -Path Env:\\` and verify `ANDROID_HOME` was added.

4. Add platform-tools to Path: Control Panel > User Accounts > Change my environment variables > select **Path** > **Edit** > **New** and add:

```powershell
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

### Preparing the Android device

Same as macOS: use a physical device (`running-on-device`) or an AVD created in the AVD Manager with the **VanillaIceCream** API Level 35 image. If HAXM is not installed, click "Install HAXM" or follow https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows, then return to the AVD Manager.

## Linux, Android

### Installing dependencies

You will need Node, the React Native command line interface, a JDK, and Android Studio.

- Node: follow the installation instructions for your Linux distribution (https://nodejs.org/en/download/package-manager/) to install Node 22.11.0 or newer.
- JDK: React Native recommends version 17 of the JDK; higher versions may cause problems. Install OpenJDK from AdoptOpenJDK (https://adoptopenjdk.net/) or your system packager.
- Android Studio and Android SDK: as in the macOS section (in Android Studio click "Configure" > "SDK Manager"; the system image is `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`).
- ANDROID_HOME: add to `$HOME/.bash_profile` or `$HOME/.bashrc` (for `zsh`, `~/.zprofile` or `~/.zshrc`):

```shell
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

`.bash_profile` is specific to `bash`; for another shell edit the appropriate config file. Load it with `source $HOME/.bash_profile` (bash) or `source $HOME/.zprofile`, then verify with `echo $ANDROID_HOME` and `echo $PATH`.

- Watchman: follow the Watchman installation guide (https://facebook.github.io/watchman/docs/install#buildinstall) to compile and install from source. It is highly recommended for better performance and increased compatibility in certain edge cases.
- Android device: same as macOS; VM acceleration is recommended (https://developer.android.com/studio/run/emulator-acceleration.html#vm-linux).

## After setup

- Congratulations, the development environment is set up. To add React Native code to an existing application see `integration-with-existing-apps`; to learn more see `getting-started`.
- Distance: Android Studio, the Android SDK, and Gradle as native tooling are covered by the android-architecture and android-build-gradle skills; Xcode and CocoaPods distribution tooling by apple-uikit and apple-distribution. Expo-managed setup (Expo SDK, EAS) is outside this skill.

## Related

- [Get Started with React Native](./environment-setup.md)
- [Get Started Without a Framework](./getting-started-without-a-framework.md)
- [Troubleshooting](./troubleshooting.md)
