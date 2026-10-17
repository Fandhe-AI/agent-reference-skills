---
source: https://docs.flutter.dev/install/manual
---

# Install, Upgrade, and Doctor

Commands for installing the Flutter SDK, adding it to PATH, upgrading or switching channels, and validating the toolchain. Commands that modify PATH or change system settings are meant for a throwaway environment (VM, container, or a machine you can rebuild).

## Install prerequisites (macOS)

Source: https://docs.flutter.dev/install/manual

```sh
xcode-select --install
```

Downloads the Xcode command-line tools that Flutter relies on, including Git.

## Install prerequisites (Linux and ChromeOS)

Source: https://docs.flutter.dev/install/manual

Packages needed (install with administrator rights through the distro package manager, per https://docs.flutter.dev/install/manual):

- `curl`
- `git`
- `unzip`
- `xz-utils`
- `zip`
- `libglu1-mesa`

Verify on Debian-based distros such as Ubuntu (no elevated rights needed):

```sh
dpkg -s curl git unzip xz-utils zip libglu1-mesa
```

Changed from the official page: sudo commands replaced with package lists and a pointer to the official setup page.

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
echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.bash_profile
```

Changed from the official page, whose placeholder omits /bin; the docs' own example below includes it.

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

Source: https://docs.flutter.dev/platform-integration/ios/setup

Set Xcode as the active developer directory, complete its first launch, and accept the Xcode licenses with administrator rights, as described on the official page. Check the current setting (read-only):

```sh
xcode-select -p
```

Changed from the official page: sudo commands replaced with package lists and a pointer to the official setup page.

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

Packages needed (install with administrator rights through the distro package manager, per https://docs.flutter.dev/platform-integration/linux/setup):

- `clang`
- `cmake`
- `ninja-build`
- `pkg-config`
- `libgtk-3-dev`
- `libstdc++-12-dev`

Verify (no elevated rights needed):

```sh
dpkg -s clang cmake ninja-build pkg-config libgtk-3-dev libstdc++-12-dev
```

Changed from the official page: sudo commands replaced with package lists and a pointer to the official setup page.

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

> **Warning**: Uninstalling deletes the SDK and optional configuration and cache directories. Delete them manually after checking the paths.

Source: https://docs.flutter.dev/install/uninstall

Paths the official page removes (macOS, Linux, ChromeOS):

- The SDK directory, for example `~/develop/flutter`
- `~/.flutter`, `~/.flutter-devtools`, `~/.flutter_settings` (optional)
- `~/.dart`, `~/.dart-tool`, `~/.dartServer` (optional)
- `~/.pub-cache` (optional)

Paths the official page removes (Windows):

- The SDK directory, for example `%USERPROFILE%\develop\flutter`
- `%APPDATA%\.flutter-devtools` (optional)
- `%APPDATA%\.dart`, `%APPDATA%\.dart-tool`, `%LOCALAPPDATA%\.dartServer` (optional)
- `%LOCALAPPDATA%\Pub\Cache` (optional)

`~/.pub-cache` and `%LOCALAPPDATA%\Pub\Cache` are shared by all Dart and Flutter projects; confirm no other project uses them before removing. Check which paths exist (read-only):

```sh
ls -d ~/develop/flutter ~/.flutter ~/.flutter-devtools ~/.flutter_settings ~/.dart ~/.dart-tool ~/.dartServer ~/.pub-cache
```

Follow the official page for the removal steps.

Changed from the official page: recursive delete commands are listed as paths instead of runnable commands.
