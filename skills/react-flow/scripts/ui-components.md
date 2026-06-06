# UI Components

React Flow UI（shadcn/ui ベースのコンポーネント）のセットアップと追加コマンド。

## shadcn/ui の初期化

```sh
npx shadcn@latest init
```

```sh
pnpm dlx shadcn@latest init
```

```sh
yarn dlx shadcn@latest init
```

```sh
bun x shadcn@latest init
```

## React Flow UI コンポーネントの追加

`component-name` を実際のコンポーネント名（例: `base-node`, `labeled-handle`, `button-edge`）に置き換える。

```sh
npx shadcn@latest add https://ui.reactflow.dev/component-name
```

```sh
pnpm dlx shadcn@latest add https://ui.reactflow.dev/component-name
```

```sh
yarn dlx shadcn@latest add https://ui.reactflow.dev/component-name
```

```sh
bun x shadcn@latest add https://ui.reactflow.dev/component-name
```

コンポーネントのコードはプロジェクトの `components/` フォルダーにコピーされ、依存パッケージは自動でインストールされる。
