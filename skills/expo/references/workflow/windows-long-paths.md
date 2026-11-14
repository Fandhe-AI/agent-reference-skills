---
source: https://docs.expo.dev/troubleshooting/windows-long-paths/
---

# "Filename longer than 260 characters" error on Windows

Fix the "Filename longer than 260 characters" error that can fail the native (C++) build when building an Android app on Windows.

## Signature / Usage

The error looks like this:

```text
Execution failed for task ':app:buildCMakeDebug[arm64-v8a]'.
  C++ build system [build] failed while executing:
  ninja: error: Stat(safeareacontext_autolinked_build/CMakeFiles/react_codegen_safeareacontext.dir/D_/my-project/node_modules/react-native-safe-area-context/common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewShadowNode.cpp.o): Filename longer than 260 characters
```

### Enable long paths in Windows

Set the `LongPathsEnabled` registry value. Run the following command in PowerShell as an administrator, then restart the computer:

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

### Use a newer CMake version

Enabling long paths is not enough on its own, because Ninja 1.10.2 does not support them. Install a newer CMake package, which includes a newer Ninja. For example, the Android SDK's CMake 3.31.6 package includes Ninja 1.12.1.

1. In Android Studio, open **Settings** > **Languages & Frameworks** > **Android SDK** > **SDK Tools**, select **Show Package Details**, and install **CMake 3.31.6** under **CMake**.
2. Set the `android.cmakeVersion` Gradle property in the **gradle.properties** file in the Gradle user home, **%USERPROFILE%\.gradle\gradle.properties**. Create the file if it does not exist:

```properties
android.cmakeVersion=3.31.6
```

3. Delete **android/app/.cxx** and **android/app/build** so that CMake regenerates its build files, and then build again.

### Set the CMake version in the project

To apply the setting to every build of the project, set `android.cmakeVersion` with `expo-build-properties` in **app.json** or in **android/gradle.properties**. If the project uses prebuild, set it only when building on Windows by adding the `expo-build-properties` entry in **app.config.js** instead of **app.json**:

```js
const isWindows = process.platform === 'win32';

export default ({ config }) => ({
  ...config,
  plugins: [
    ...(config.plugins ?? []),
    ['expo-build-properties', { android: isWindows ? { cmakeVersion: '3.31.6' } : {} }],
  ],
});
```

### Move the project to a shorter path

To confirm that the path length is the cause, or as a workaround, move the project to a short folder such as **C:\dev\my-app** and build again.

## Notes

- Cause: the New Architecture compiles C++ code for each native library, and the generated object files are nested deeply under **android/app/.cxx**. With a project in a deep folder, or a package with a long name, their full paths exceed 260 characters, the default path limit on Windows. The error comes from Ninja, the build tool that CMake uses. Ninja supports longer paths in version 1.12.0 and later; by default Android builds use the Android SDK's CMake 3.22.1 package, which includes Ninja 1.10.2. Ninja 1.12 also needs long paths to be enabled in Windows.
- For other ways to enable long paths, such as Group Policy, see "Maximum Path Length Limitation" in the Windows documentation: https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation
- In SDK 57 and later, Expo reads the `android.cmakeVersion` property from the Gradle user home, both in projects that use prebuild and in projects that include an **android** directory. That file is on the computer and is not part of the project, so builds on Expo Build and on other computers keep using the default CMake version.
- Setting `android.cmakeVersion` in the project (through `expo-build-properties` or **android/gradle.properties**) also applies to builds on Expo Build. Expo Build runs Android builds on Linux, where the path limit does not apply, and CMake 3.31.6 is not installed there, so the build fails with `CMake '3.31.6' was not found in SDK, PATH, or by cmake.dir property`. Expo Build runs `npx expo prebuild` on its Linux build server, so the Windows-only **app.config.js** variant leaves `cmakeVersion` unset there. After changing the config on the computer, run `npx expo prebuild --clean`.
- The `git config core.longpaths true` setting does not affect the Android build. It only matters if Git fails to check out files with long paths.
- Source: https://docs.expo.dev/troubleshooting/windows-long-paths/ (docs/pages/troubleshooting/windows-long-paths.mdx at tag expo@58.0.25). The PowerShell command is the official `Terminal` snippet with its JavaScript string escapes (`\\`) resolved to single backslashes.

## Related

- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
- [Expo CLI](./expo-cli.md)
