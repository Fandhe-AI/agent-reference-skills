---
source: https://docs.expo.dev/more/create-expo-module/
---

# create-expo-module

Expo Modules API 用のモジュール（ローカル・スタンドアロン）を生成するコマンド集。

## ローカルモジュールの作成

```sh
npx create-expo-module@latest --local
```

既存の Expo プロジェクトのディレクトリで実行。既定は **modules** ディレクトリに作成され、`expo.autolinking.nativeModulesDir` を `package.json` で定義していればそのディレクトリに作成される。yarn は `yarn create expo-module --local`、pnpm は `pnpm create expo-module --local`、bun は `bun create expo-module --local`。

## スタンドアロンモジュールの作成

```sh
npx create-expo-module@latest my-module
```

example アプリ付きで生成される。Git リポジトリ外では新規リポジトリを初期化して初回コミットを作成する。

## プラットフォームの指定

```sh
npx create-expo-module@latest my-module --platform android apple
```

指定可能な値は `android` / `apple` / `web`。

## 機能例の指定

```sh
npx create-expo-module@latest my-module --features Function AsyncFunction
npx create-expo-module@latest my-module --features all
```

`Constant` / `Function` / `AsyncFunction` / `Event` / `View` / `ViewEvent` / `SharedObject` / `all`。`--full-example` は `--features all` と同等。

## example アプリなしで作成

```sh
npx create-expo-module@latest my-module --no-example
```

## 非対話での作成

```sh
npx create-expo-module@latest my-module --name MyModule --package expo.modules.mymodule --platform android apple --features Function AsyncFunction --description "My module" --license MIT --module-version 0.1.0
```

CI や stdin が TTY でない環境では対話プロンプトを省略する。明示しない値は既定値で埋められ警告が出る。

## 既存モジュールへのプラットフォーム追加

```sh
npx create-expo-module@latest add-platform-support
npx create-expo-module@latest add-platform-support ./packages/my-module
npx create-expo-module@latest add-platform-support --platform android --features Function Event
```

モジュールルートで実行する（パスも指定可）。非対話モードでは `--platform` が必須。既存のネイティブディレクトリ（android / ios 等）は上書きしない。

## スタンドアロンモジュールの開発

```sh
cd my-module
npm run open:android
npm run open:ios
cd example
npx expo start
```

`open:ios` は macOS と Xcode が必要。ネイティブコードを変更したら example アプリを再ビルドする。

## beta テンプレートの使用

```sh
EXPO_BETA=1 npx create-expo-module@latest my-module
```
