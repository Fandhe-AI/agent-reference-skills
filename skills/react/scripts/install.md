---
source: https://react.dev/learn/add-react-to-an-existing-project
---

# Install

react / react-dom と TypeScript 型定義のインストール。

## react と react-dom のインストール

```sh
npm install react react-dom
```

既存プロジェクトに React を追加する手順のコマンド。公式は事前に JSX・`import` / `export`・npm パッケージを扱える JavaScript 環境（既存の設定、または Vite）を用意するよう案内している。出典: https://react.dev/learn/add-react-to-an-existing-project

## TypeScript 型定義の追加

```sh
npm install --save-dev @types/react @types/react-dom
```

既存の React プロジェクトに TypeScript を追加する場合。`tsconfig.json` の compiler options は公式 https://react.dev/learn/typescript を参照。
