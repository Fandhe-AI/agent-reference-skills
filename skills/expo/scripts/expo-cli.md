---
source: https://docs.expo.dev/more/expo-cli/
---

# Expo CLI

Expo CLI（`expo` パッケージ同梱、`npx expo ...`）の開発・ビルド・エクスポート・設定コマンド集。

## 開発サーバーの起動

```sh
npx expo start
```

`npx expo` は `npx expo start` のエイリアス。既定は `http://localhost:8081`。

## 起動先の固定

```sh
npx expo start --dev-client
npx expo start --go
```

`--dev-client` は常に development build、`--go` は常に Expo Go。未指定時は `expo-dev-client` があれば development build。

## ローカルホスト限定・ポート指定

```sh
npx expo start --localhost
npx expo start --port 0
```

`--port 0` は最初の空きポートを使用。

## トンネル接続

```sh
npm i -g @expo/ngrok
npx expo start --tunnel
```

事前に `@expo/ngrok` のインストールが必要。トンネル URL は公開される。

## オフライン起動

```sh
npx expo start --offline
```

## iOS / Android のローカルビルドと実行

```sh
npx expo run:ios
npx expo run:android
```

ネイティブディレクトリが無ければ先に `npx expo prebuild` が実行される。`run:ios` は Mac と Xcode、`run:android` は Android Studio と Java が必要。

## 実機・デバイス指定

```sh
npx expo run:ios --device
```

`--device [device]` で名前または ID を指定。`--device generic` はビルドのみ。

## Android バリアント

```sh
npx expo run:android --variant debug
npx expo run:android --variant debugOptimized
npx expo run:android --variant release
```

`debugOptimized` は SDK 54 以降。`release` は Google Play 提出用の署名なし。

## Android の product flavor

```sh
npx expo run:android --variant freeDebug --app-id dev.expo.myapp.free
```

## iOS Release 構成

```sh
npx expo run:ios --configuration Release
```

App Store 提出用の署名ではない。

## iOS Simulator 向けビルドのみ

```sh
npx expo run:ios --configuration Release --device generic --output ./build
```

`--output` でビルド済みバイナリのコピー先を指定。

## ビルド済みバイナリのインストール

```sh
npx expo run:ios --binary <path>
```

`--binary <path>` 指定時はビルドを省略してインストールする。その他の共通オプション: `--no-build-cache` / `--no-install` / `--no-bundler` / `-p, --port`。

## JavaScript とアセットのエクスポート

```sh
npx expo export
```

既定の出力先は `dist`、`--platform` の既定は `all`。

## エクスポートのオプション

```sh
npx expo export --platform ios --output-dir dist --clear
```

他に `--dev` / `--max-workers <number>` / `--no-minify` / `--no-bytecode` / `--no-ssg, --api-only`。`--no-bytecode` は bundle サイズ分析用で、ネイティブに出荷しない。

## webpack でのエクスポート (非推奨)

```sh
npx expo export:web
```

SDK 50 以降 Expo Webpack は非推奨（universal Metro の `npx expo export` を使用）。`expo.web.bundler: 'metro'` の場合は無効。

## ネイティブコードの生成 (Prebuild)

```sh
npx expo prebuild
```

## ネイティブディレクトリの再生成

> **警告**: `--clean` は既存のネイティブディレクトリを再生成し、手動変更を失う。変更を git で追跡し、使い捨てのブランチまたはクローンで実行すること。公式は iOS 向けに `npx expo prebuild -p ios --clean` を例示。

```sh
npx expo prebuild -p ios --clean
```

## Lint

```sh
npx expo lint
```

初回は ESLint を Expo 向け設定でセットアップする。既定の対象は **src** / **app** / **components**。

## Lint の自動修正と対象指定

```sh
npx expo lint --fix
npx expo lint ./utils constants.ts
npx expo lint --ext .ts,.tsx
npx expo lint -- --no-error-on-unmatched-pattern
```

`--` 以降は ESLint へ渡る。

## app config の評価

```sh
npx expo config
```

## app config の出力オプション

```sh
npx expo config --full --json
npx expo config --type public
```

`-t, --type` は `public` / `prebuild` / `introspect`。

## 設定ファイルの生成

```sh
npx expo customize
```

babel.config.js / webpack.config.js / metro.config.js / tsconfig.json から選択する。

## 認証

```sh
npx expo register
npx expo login
npx expo whoami
npx expo logout
```

認証情報は Expo CLI と EAS CLI で共有される。

## 環境変数

```sh
EXPO_NO_TELEMETRY=1 npx expo start
```

主な変数: `EXPO_OFFLINE` / `EXPO_NO_TELEMETRY` / `EXPO_DEBUG` / `CI` / `EXPO_EDITOR` / `EXPO_NO_GIT_STATUS`（`prebuild --clean` 時の git 警告を抑止）。全一覧は `references/workflow/expo-cli.md` の環境変数表を参照。
