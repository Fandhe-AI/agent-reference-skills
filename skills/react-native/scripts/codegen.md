---
source: https://reactnative.dev/docs/0.87/the-new-architecture/codegen-cli
---

# Codegen

Commands for running Codegen. Other source: https://reactnative.dev/docs/0.87/the-new-architecture/using-codegen.

## Show Codegen CLI options

```sh
npx @react-native-community/cli codegen --help
```

Options: `--verbose`, `--path <path>`, `--platform <string>` (`android`, `ios`, `all`; default `all`), `--outputPath <path>`, `-h, --help`.

## Run Codegen from the project root

```sh
npx @react-native-community/cli codegen
```

Reads `package.json` from the current directory and generates code based on its `codegenConfig`.

## Generate iOS code only

```sh
npx @react-native-community/cli codegen --platform ios
```

Output goes to the location defined in `codegenConfig`.

## Generate Android code for a library

```sh
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## Run Codegen through Gradle (Android)

```sh
./gradlew generateCodegenArtifactsFromSchema
```

Run from the `android` folder. The task runs on the app and all linked Node modules.

## Run the Codegen script directly (iOS)

```sh
node node_modules/react-native/scripts/generate-codegen-artifacts.js
```

Run from the app root. Without arguments it prints usage: `-p` path, `-t` target platform (`android`, `ios`, `all`), `-o` output path.

## Generate iOS artifacts with explicit arguments

```sh
node node_modules/react-native/scripts/generate-codegen-artifacts.js \
    --path . \
    --outputPath ios/ \
    --targetPlatform ios
```

Files are generated under `ios/build/generated/ios`.
