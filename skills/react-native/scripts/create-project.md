---
source: https://reactnative.dev/docs/0.87/get-started-without-a-framework
---

# Create Project

Commands for environment setup and project creation, as written in the official docs. Other sources: https://reactnative.dev/docs/0.87/set-up-your-environment and https://reactnative.dev/docs/0.87/environment-setup.

## Create a new Expo project (recommended Framework)

```sh
npx create-expo-app@latest
```

The docs recommend a Framework for new apps. Continue with the Expo getting started guide after creation (covered by the Expo documentation, not by this skill).

## Remove a previously installed global CLI

```sh
npm uninstall -g react-native-cli @react-native-community/cli
```

Run this before creating a project without a Framework. The global `react-native-cli` package may cause unexpected issues.

## Create a new project without a Framework

```sh
npx @react-native-community/cli@latest init AwesomeProject
```

Not needed when integrating React Native into an existing app or when Expo is already installed in the project.

## Create a project with a specific version

```sh
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

`--version` takes the target React Native version; the `@react-native-community/cli@X.XX.X` part is the CLI's own version, which is versioned independently of React Native — use `@latest` (as the other official examples do) or the CLI version matching that React Native release. A custom template can be passed with `--template` (see the React Native Community CLI `init` docs; flag usage is not shown in the React Native docs, so confirm there).

## Reinstall iOS dependencies

```sh
cd ios
bundle install
bundle exec pod install
```

For iOS trouble after project creation. Run from the project root; requires macOS with Ruby (CocoaPods is a Ruby gem).

## Install Node and Watchman (macOS)

```sh
brew install node
brew install watchman
```

Node 22.11.0 or newer is required. Watchman is optional but highly recommended.

## Install a JDK (macOS, Android)

```sh
brew install --cask zulu@17
brew info --cask zulu@17
```

The second command prints the Caskroom path used to find the JDK installer package. The docs recommend JDK 17.

## Set Android environment variables (macOS)

```sh
export ANDROID_HOME="${HOME}/Library/Android/sdk"
export PATH="${PATH}:${ANDROID_HOME}/emulator"
export PATH="${PATH}:${ANDROID_HOME}/platform-tools"
```

Add to `~/.zprofile` or `~/.zshrc` (`~/.bash_profile` or `~/.bashrc` for bash). Verify the SDK path in Android Studio under Settings, Languages & Frameworks, Android SDK.

## Set Android environment variables (Linux)

```sh
export ANDROID_HOME="${HOME}/Android/Sdk"
export PATH="${PATH}:${ANDROID_HOME}/emulator"
export PATH="${PATH}:${ANDROID_HOME}/platform-tools"
```

Add to the shell-specific config file (the docs name `.bash_profile` for bash).

## Install Node and JDK (Windows)

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

Run from an Administrator Command Prompt. Requires Chocolatey.

## Notes

- Clarified: the official page uses the same X.XX.X placeholder for both, but the CLI version differs from the React Native version.
- The setup guides write the Android exports unquoted; quoted here in `"${VAR}"` form.
