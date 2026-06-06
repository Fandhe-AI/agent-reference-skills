# Install

React Flow のインストールと新規プロジェクトのセットアップコマンド。

## Vite プロジェクトの新規作成

```sh
npm init vite my-react-flow-app -- --template react
```

```sh
pnpm create vite my-react-flow-app --template react
```

```sh
yarn create vite my-react-flow-app --template react
```

```sh
bunx create-vite my-react-flow-app --template react
```

## @xyflow/react パッケージのインストール

```sh
npm install @xyflow/react
```

```sh
pnpm add @xyflow/react
```

```sh
yarn add @xyflow/react
```

```sh
bun add @xyflow/react
```

インストール後、アプリのエントリーファイルに `import '@xyflow/react/dist/style.css';` を追加する。このインポートは必須。

## 開発サーバーの起動

```sh
npm run dev
```

```sh
pnpm dev
```

```sh
yarn dev
```

```sh
bun dev
```
