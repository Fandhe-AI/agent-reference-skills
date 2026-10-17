---
source: https://reactnative.dev/docs/0.87/the-new-architecture/codegen-cli
---

# The Codegen CLI

A CLI that runs `@react-native/codegen` for your project, instead of calling Gradle or the generation script manually.

## Signature / Usage

```sh
npx @react-native-community/cli codegen --help
```

Output:

```text
Usage: rnc-cli codegen [options]

Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root. (default: "/Users/MyUsername/projects/my-app")
  --platform <string>  Target platform. Supported values: "android", "ios", "all". (default: "all")
  --outputPath <path>  Path where generated artifacts will be output to.
  -h, --help           display help for command
```

Read `package.json` from the current working directory, generate code based on its codegenConfig:

```shell
npx @react-native-community/cli codegen
```

Generate iOS code in the location defined in the codegenConfig:

```shell
npx @react-native-community/cli codegen --platform ios
```

Read `package.json` from `third-party/some-library`, generate Android code in `third-party/some-library/android/generated`:

```shell
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| --verbose | flag | | Increase logging verbosity |
| --path | path | project root of the current directory | Path to the React Native project root. |
| --platform | string | `"all"` | Target platform. Supported values: "android", "ios", "all". |
| --outputPath | path | | Path where generated artifacts will be output to. |
| -h, --help | flag | | display help for command |

## Notes

- Deviation: command output shown in the same block on the official page is split into a separate text block.
- Including generated code in libraries: normally the generated code is not included in the library and the app that uses the library runs Codegen at build time. Codegen also offers the `includesGeneratedCode` property in the library's `codegenConfig` to include the generated code in the library itself.
- Benefits of `includesGeneratedCode = true`: no need to rely on the app to run Codegen; implementation files are always consistent with the generated interfaces; no need to include two sets of files to support both architectures on Android (only the New Architecture one is kept, guaranteed to be backwards compatible); the native part of the library can be shipped as a prebuild.
- Drawback: the generated code uses the React Native version defined inside your library. A library shipping with React Native 0.76 generates code based on that version, which may be incompatible with apps using a previous React Native version (e.g. 0.75).
- To enable: add `includesGeneratedCode` set to `true` in the library's `codegenConfig` field in `package.json`; run Codegen locally with the codegen CLI; update `package.json`, the `podspec` and `build.Gradle` to include the generated code; update `cmakeListsPath` in `react-native.config.js` so that Gradle looks for the CMakeLists file in your outputDir rather than the build directory.

## Related

- [What is Codegen?](./what-is-codegen.md)
- [Using Codegen](./using-codegen.md)
- [Create a Library for Your Module](./create-module-library.md)
