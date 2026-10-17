---
source: https://docs.flutter.dev/install/manual
---

# Install, Upgrade, and Doctor

Commands for installing the Flutter SDK, adding it to PATH, upgrading or switching channels, and validating the toolchain. Commands that modify PATH, delete directories, or change system settings are meant for a throwaway environment (VM, container, or a machine you can rebuild).

## Install prerequisites (macOS)

Source: https://docs.flutter.dev/install/manual

```sh
xcode-select --install
```

Downloads the Xcode command-line tools that Flutter relies on, including Git.

## Install prerequisites (Linux and ChromeOS)

Source: https://docs.flutter.dev/install/manual

```sh
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
```

Debian-based distros with `apt-get`, such as Ubuntu.

## Extract the SDK bundle (macOS)

Source: https://docs.flutter.dev/install/manual

```sh
unzip <sdk_zip_path> -d <destination_directory_path>
```

Example from the docs (the file name is the docs' example, not the current release):

```sh
unzip ~/Downloads/flutter_macos_3.47.5-stable.zip -d ~/develop/
```

## Extract the SDK bundle (Linux and ChromeOS)

Source: https://docs.flutter.dev/install/manual

```sh
tar -xf <sdk_zip_path> -C <destination_directory_path>
```

Example from the docs:

```sh
tar -xf ~/Downloads/flutter_linux_3.47.5-stable.tar.xz -C ~/develop/
```

## Extract the SDK bundle (Windows, PowerShell)

Source: https://docs.flutter.dev/install/manual

```powershell
Expand-Archive -Path <sdk_zip_path> -DestinationPath <destination_directory_path>
```

Example from the docs:

```powershell
Expand-Archive `
  -Path "$env:USERPROFILE\Downloads\flutter_windows_3.47.5-stable.zip" `
  -DestinationPath "$env:USERPROFILE\develop"
```

## Extract the SDK bundle (Windows, Command prompt)

Source: https://docs.flutter.dev/install/manual

```bat
tar -xf <sdk_zip_path> -C <destination_directory_path>
```

Example from the docs:

```bat
tar -xf "%USERPROFILE%\Downloads\flutter_windows_3.47.5-stable.zip" -C "%USERPROFILE%\develop"
```

## Add Flutter to PATH (macOS, Zsh)

> **Warning**: Edits a shell profile file. Use a throwaway environment.

Source: https://docs.flutter.dev/install/add-to-path

Append to `~/.zprofile` (create it if missing). Replace `<path-to-sdk>` with the SDK path.

```sh
export PATH="<path-to-sdk>/bin:$PATH"
```

Example from the docs:

```sh
export PATH="$HOME/develop/flutter/bin:$PATH"
```

## Add Flutter to PATH (Linux, per shell)

> **Warning**: Appends to shell startup files. Use a throwaway environment.

Source: https://docs.flutter.dev/install/add-to-path

Check the default shell first:

```sh
echo $SHELL
```

bash:

```sh
echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.bashrc
```

zsh:

```sh
echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.zshenv
```

fish:

```sh
fish_add_path -U -p <path-to-sdk>/bin
```

csh:

```sh
echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.cshrc
```

tcsh:

```sh
echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.tcshrc
```

ksh and sh:

```sh
echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.profile
```

Example from the docs (bash):

```sh
echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bashrc
```

## Add Flutter to PATH (ChromeOS)

> **Warning**: Appends to a shell startup file. Use a throwaway environment.

Source: https://docs.flutter.dev/install/add-to-path

```sh
echo 'export PATH="<path-to-sdk>:$PATH"' >> ~/.bash_profile
```

The placeholder above is verbatim from the docs and omits `/bin`; the docs' own example below includes it.

```sh
echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bash_profile
```

## Add Flutter to PATH (Windows)

Source: https://docs.flutter.dev/install/add-to-path

The docs use the Environment Variables dialog (no command). Add this entry to the user `Path` variable:

```text
%USERPROFILE%\develop\flutter\bin
```

## Validate PATH setup

Source: https://docs.flutter.dev/install/add-to-path

```sh
flutter --version
dart --version
```

Open a new terminal session first so the PATH change is applied.

## Check the toolchain

Source: https://docs.flutter.dev/platform-integration/android/setup

```sh
flutter doctor
```

Verbose output (used by the Windows, macOS, iOS, and Linux setup pages):

```sh
flutter doctor -v
```

## List devices and emulators

Source: https://docs.flutter.dev/platform-integration/android/setup

```sh
flutter devices
```

```sh
flutter emulators && flutter devices
```

## Accept Android SDK licenses

Source: https://docs.flutter.dev/install/troubleshoot

Requires the Android SDK Command-line Tools component.

```sh
flutter doctor --android-licenses
```

## Set up Xcode for iOS and macOS

> **Warning**: Uses `sudo` and changes the active Xcode. Use a machine you can rebuild.

Source: https://docs.flutter.dev/platform-integration/ios/setup

```sh
sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
```

Replace `/Applications/Xcode.app` if Xcode lives elsewhere. Review and sign the Xcode licenses:

```sh
sudo xcodebuild -license
```

Download iOS platform support and the latest iOS Simulator runtimes:

```sh
xcodebuild -downloadPlatform iOS
```

## Start the iOS simulator

Source: https://docs.flutter.dev/platform-integration/ios/setup

The simulator is renamed to Device Hub on Xcode 27:

```sh
open -a DeviceHub
```

On Xcode 26 or earlier:

```sh
open -a Simulator
```

## Install Linux desktop build dependencies

Source: https://docs.flutter.dev/platform-integration/linux/setup

```sh
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y clang cmake ninja-build pkg-config libgtk-3-dev libstdc++-12-dev
```

## Upgrade the Flutter SDK

Source: https://docs.flutter.dev/install/upgrade

```sh
flutter upgrade
```

Gets the most recent SDK version available on the current channel.

## Show or switch channels

Source: https://docs.flutter.dev/install/upgrade

```sh
flutter channel
```

```sh
flutter channel beta
flutter upgrade
```

Channel syntax is `flutter channel <channel-name>`; run `flutter upgrade` afterward to download that channel's SDK.

## Switch to a specific Flutter version

> **Warning**: Checks out a git ref inside the SDK directory. Use a throwaway environment.

Source: https://docs.flutter.dev/install/upgrade

```sh
cd /path/to/flutter
git checkout <Flutter version>
```

Find the SDK path with `flutter doctor --verbose`; find versions on the SDK archive page.

## Windows long path fix for upgrade

> **Warning**: Changes system-wide Git config and a Windows registry value. Requires administrator privileges. Use a throwaway environment.

Source: https://docs.flutter.dev/install/upgrade

For the `Filename too long` error during `flutter upgrade`:

```sh
git config --system core.longpaths true
```

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

## Allow Flutter scripts on Windows PowerShell

> **Warning**: Changes the PowerShell execution policy. Use a throwaway environment.

Source: https://docs.flutter.dev/install/troubleshoot

For the `Invoke-Expression: You cannot call a method on a null-valued expression` error, run in an Administrator PowerShell window:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Uninstall the Flutter SDK

> **Warning**: Recursively deletes the SDK and optional configuration and cache directories. Use a throwaway environment.

Source: https://docs.flutter.dev/install/uninstall

macOS, Linux, ChromeOS:

```sh
rm -rf ~/develop/flutter
```

```sh
rm -rf  ~/.flutter ~/.flutter-devtools ~/.flutter_settings
```

```sh
rm -rf  ~/.dart ~/.dart-tool ~/.dartServer
```

```sh
rm -rf ~/.pub-cache
```

Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force -Path (Join-Path $env:USERPROFILE "develop\flutter")
```

```powershell
Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".flutter-devtools")
```

```powershell
Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".dart"), (Join-Path $env:APPDATA ".dart-tool"), (Join-Path $env:LOCALAPPDATA ".dartServer")
```

```powershell
Remove-Item -Recurse -Force -Path (Join-Path $env:LOCALAPPDATA "Pub\Cache")
```

The configuration and pub cache removals are optional.
