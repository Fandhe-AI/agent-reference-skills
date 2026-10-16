---
source: https://r3f.docs.pmnd.rs/getting-started/installation
---

# React Native

React Native / Expo 向けのプロジェクト作成と依存関係のインストール。`@react-three/fiber/native` から import する。

## Expo アプリの作成

```sh
# Create a managed/bare app
npx create-expo-app
cd my-app
```

managed / bare いずれのアプリも `npx create-expo-app` で作成する（公式は `# or` で次節のコマンドと並記）。

## React Native アプリの作成と Expo modules の導入

> **警告**: `npx react-native init` は新規プロジェクトを生成し、`npx install-expo-modules@latest` はプロジェクトに Expo modules を組み込む。既存アプリには実行せず、使い捨ての新規ディレクトリで行う。手動インストール・移行は公式の expo modules installation ガイドを参照。

```sh
# Create and link bare app
npx react-native init my-app
npx install-expo-modules@latest
cd my-app
```

## 依存関係のインストール

```sh
# Automatically install
expo install expo-gl

# Install NPM dependencies
npm install three @react-three/fiber
```

`useLoader` や drei の `useGLTF` / `useTexture` でアセットを読む場合は `metro.config.js` の設定が必要になることがある（内容は references/getting-started/react-native.md を参照）。iOS シミュレーターは OpenGL ES の対応が不完全なため、実機（iOS 16 以降）での確認が公式に推奨されている。
