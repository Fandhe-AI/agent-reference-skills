# shadcn/ui

## セットアップ

モノレポ用の canary バージョンを使用:

```bash
pnpm dlx shadcn@canary init
```

セットアップウィザードで monorepo オプションを選択。

## コンポーネントの追加

```bash
pnpm dlx shadcn@canary add [COMPONENT]
```

## 注意点

- モノレポサポートは `@canary` バージョンが必須
- npm パッケージではなくファイルが直接コピーされる
- Tailwind CSS が前提条件
