---
source: https://react.dev/learn/react-compiler/installation
---

# Compiler

React Compiler と ESLint プラグインのインストール。

## babel-plugin-react-compiler のインストール

```sh
npm install -D babel-plugin-react-compiler@latest
```

```sh
yarn add -D babel-plugin-react-compiler@latest
```

```sh
pnpm install -D babel-plugin-react-compiler@latest
```

devDependency として追加。Babel パイプラインでは最初に実行する必要がある。

## Vite 用 Babel プラグイン

```sh
npm install -D @rolldown/plugin-babel
```

`@vitejs/plugin-react` 6.0.0 以降で `reactCompilerPreset` と併用する場合。設定コードは https://react.dev/learn/react-compiler/installation を参照。

## React Router (Vite) 用 Babel プラグイン

```sh
npm install vite-plugin-babel
```

## eslint-plugin-react-hooks のインストール

```sh
npm install -D eslint-plugin-react-hooks@latest
```

コンパイラ関連ルールは `recommended-latest` プリセットで有効。
