---
source: https://reactnative.dev/docs/0.87/the-new-architecture/using-codegen
---

# Using Codegen

How to configure Codegen through `codegenConfig` in `package.json`, invoke it manually for each platform, and what code it generates.

## Signature / Usage

Prerequisite: a React Native app is always required, even when invoking Codegen manually.

**shell**

```bash
npx @react-native-community/cli@latest init SampleApp --version "<current React Native version>"
```

**package.json**

```json
  "codegenConfig": {
    "name": "<SpecName>",
    "type": "<types>",
    "jsSrcsDir": "<source_dir>",
    "android": {
      "javaPackageName": "<java.package.name>"
    },
    "ios": {
      "modules": {
        "TestModule": {
          "className": "<iOS-class-implementing-the-RCTModuleProvider-protocol>",
          "unstableRequiresMainQueueSetup": false,
          "conformsToProtocols": ["RCTImageURLLoader", "RCTURLRequestHandler", "RCTImageDataDecoder"]
        }
      },
      "components": {
        "TestComponent": {
          "className": "<iOS-class-implementing-the-component>"
        }
      }
    }
  },
```

**Android** (run inside the `android` folder):

```bash
./gradlew generateCodegenArtifactsFromSchema
```

**iOS** (run from the app root):

```bash
node node_modules/react-native/scripts/generate-codegen-artifacts.js
```

Output:

```text
Usage: generate-codegen-artifacts.js -p [path to app] -t [target platform] -o [output path]

Options:
      --help            Show help                                      [boolean]
      --version         Show version number                            [boolean]
  -p, --path            Path to the React Native project root.        [required]
  -t, --targetPlatform  Target platform. Supported values: "android", "ios",
                        "all".                                        [required]
  -o, --outputPath      Path where generated artifacts will be output to.
```

```shell
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

## Options / Props

`codegenConfig` fields:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | | Name of the codegen config. Customizes the codegen output: the filenames, and the code. |
| type | `modules` \| `components` \| `all` | | `modules`: only generate code for modules. `components`: only generate code for components. `all`: generate code for everything. |
| jsSrcsDir | string | | The root folder where all your specs live. |
| android.javaPackageName | string | | Package name of the Android Java codegen output (all `android` fields optional). |
| ios.modules[moduleName].className | string | | This module's ObjC class. Or, if it is a C++-only module, its `RCTModuleProvider` class (all `ios` fields optional). |
| ios.modules[moduleName].unstableRequiresMainQueueSetup | boolean | | Initialize this module on the UI Thread, before running any JavaScript. |
| ios.modules[moduleName].conformsToProtocols | string[] | | Annotate which protocols this module conforms to: `RCTImageURLLoader`, `RCTURLRequestHandler`, `RCTImageDataDecoder`. |
| ios.components[componentName].className | string | | This component's ObjC class (e.g. `TextInput` -> `RCTTextInput`). |

`generate-codegen-artifacts.js` options:

| Name | Required | Description |
| --- | --- | --- |
| `-p`, `--path` | Yes | Path to the React Native project root. |
| `-t`, `--targetPlatform` | Yes | Target platform. Supported values: "android", "ios", "all". |
| `-o`, `--outputPath` | No | Path where generated artifacts will be output to. |

## Notes

- Corrected: the official codegenConfig snippet has a trailing comma after conformsToProtocols, which is invalid JSON; removed.
- Deviation: command output shown in the same block on the official page is split into a separate text block.
- The Turbo Native Modules (iOS), Cross-Platform C++ and Fabric Native Components guides map names with ios.modulesProvider / ios.componentProvider ({"<JS name>": "<ObjC class>"}) instead of ios.modules / ios.components; both forms appear in the 0.87 docs.
- Codegen searches all the dependencies of the app for JS files that respect specific conventions: Turbo Native Module spec files must be prefixed with `Native` (e.g. `NativeLocalStorage.ts`); Fabric Native Component spec files must be suffixed with `NativeComponent` (e.g. `WebViewNativeComponent.ts`).
- The official page's init command interpolates the current docs version into `--version`.
- Android: Codegen is integrated with the React Native Gradle Plugin (RNGP). The task runs `generateCodegenArtifactsFromSchema` on all the imported projects of the app (the app and all the linked node modules). Generated code goes in the corresponding `node_modules/<dependency>` folder, e.g. `SampleApp/node_modules/my-fabric-component/android/build/generated/source/codegen`; for the app, `android/app/build/generated/source/codegen`.
- Android generated layout is split in `java` (platform specific code) and `jni` (C++ code that lets JS and Java interact). In `java`, `com/facebook/react/viewmanagers` holds `<nativeComponent>ManagerDelegate.java` (methods the `ViewManager` can call on the custom Native Component) and `<nativeComponent>ManagerInterface.java` (the `ViewManager` interface). The folder named by `codegenConfig.android.javaPackageName` holds the abstract class a Turbo Native Module has to implement. In `jni`, `<codegenConfig.name>.h` is the interface of custom C++ Turbo Native Modules, `<codegenConfig.name>-generated.cpp` is their glue code, and `react/renderer/components/<codegenConfig.name>` holds all the glue-code of your custom component.
- iOS: Codegen relies on Node scripts under `node_modules/react-native/scripts/`; the main script is `generate-codegen-artifacts.js`. Running it with the arguments above generates files in `ios/build/generated/ios`: `<codegenConfig.name>/<codegenConfig.name>.h` (interface of custom iOS Turbo Native Modules), `<codegenConfig.name>/<codegenConfig.name>-generated.mm` (their glue code), `<codegenConfig.name>JSI.h` (interface of custom C++ Turbo Native Modules), `<codegenConfig.name>JSI-generated.h` (their glue code, as written on the page), and `react/renderer/components/<codegenConfig.name>` (glue-code of custom components: `ComponentDescriptors`, `EventEmitters`, `Props`, `RCTComponentViewHelpers.h`, `ShadowNodes`, `States`). Part of the generated files (e.g. `FBReactNativeSpec`) are used by React Native core.
- The generated structure described on the page uses `all` for `codegenConfig.type`. With `modules`, expect no `react/renderer/components/` folder. With `components`, expect none of the other files.
- Generated Android tree (excerpt):

```text
build
└── generated
    └── source
        └── codegen
            ├── java
            ├── jni
            └── schema.json
```

## Related

- [What is Codegen?](./what-is-codegen.md)
- [The Codegen CLI](./codegen-cli.md)
- [Cross-Platform Native Modules (C++)](./pure-cxx-modules.md)
