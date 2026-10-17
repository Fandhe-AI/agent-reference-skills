---
source: https://docs.expo.dev/more/expo-cli/
---

# Install

新規プロジェクト作成とパッケージのインストール・バージョン検証のコマンド集。

## 新規プロジェクトの作成 (SDK 58)

```sh
npx create-expo-app@latest --template default@sdk-58
```

出典: `https://docs.expo.dev/more/create-expo/`。SDK 58 移行期間中は `--template` なしの `create-expo-app@latest` が SDK 57 プロジェクトを作成する（Expo Go を実機で使う場合は SDK 57 を使用）。他のパッケージマネージャーの形式は yarn `yarn create expo-app --template default@sdk-58`、pnpm `pnpm create expo-app --template default@sdk-58`、bun `bun create expo --template default@sdk-58`。

## 既定設定で作成

```sh
npx create-expo-app@latest --yes --template default@sdk-58
```

`--yes` は既定オプションで作成。

## 依存インストールを省略して作成

```sh
npx create-expo-app@latest --no-install --template default@sdk-58
```

npm 依存と CocoaPods のインストールを省略。

## AGENTS.md の生成を省略して作成

```sh
npx create-expo-app@latest --no-agents-md --template default@sdk-58
```

既定では AGENTS.md（Claude Code 検出時は .claude/settings.json も）を生成する。

## 例プロジェクトから作成

```sh
npx create-expo-app --example with-router
```

`--example` のみ指定すると expo/examples の一覧から対話選択する。

## ライブラリのインストール

```sh
npx expo install expo-camera
```

`npm install` の代替。`react-native` の版に合う互換版を選ぶ。複数指定は `npx expo install typescript expo-sms`。

## パッケージマネージャーへの引数の受け渡し

```sh
yarn expo install typescript -- -D
```

`--` 以降は下位のパッケージマネージャーへ渡る（上記は `yarn add typescript -D` 相当）。

## パッケージマネージャーの明示

```sh
npx expo install expo-camera --npm
```

`--bun` / `--npm` / `--pnpm` / `--yarn` で指定。未指定時はロックファイルから判定。

## インストール済みパッケージの版検証

```sh
npx expo install --check
```

不整合のあるパッケージを表示し、ローカルでは修正を促す。CI では非ゼロ終了する。

## 特定パッケージのみ検証

```sh
npx expo install react-native expo-sms --check
```

## 不整合の自動修正

> **警告**: `package.json` とロックファイルが書き換わる。作業ツリーをコミットまたは退避してから、使い捨てのブランチで実行すること。

```sh
npx expo install --fix
```

`--check` と異なり、環境によらず不整合を常に修正する。

## CI での検証

```sh
CI=1 npx expo install --check
```

古いパッケージがあると失敗する（公式の例）。
