# Next.js App Router Integration

Next.js App Router と FSD を併用するディレクトリ構成とページ再エクスポートパターン。

```text
project-root/
├── app/                             # Next.js App Router（ルーティング担当）
│   ├── api/
│   │   └── get-example/
│   │       └── route.ts
│   └── example/
│       └── page.tsx
├── pages/                           # 空フォルダ（ビルド競合防止のため必須）
│   └── README.md
└── src/                             # FSD レイヤー群
    ├── app/
    ├── pages/
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

```ts
// app/example/page.tsx — Next.js ルートから FSD ページを再エクスポート
export { ExamplePage as default, metadata } from "@/pages/example";
```

```ts
// src/pages/example/ui/ExamplePage.tsx — FSD 側の実装
export const metadata = { title: "Example" };

export const ExamplePage = () => <main>Example</main>;
```

```ts
// src/pages/example/index.ts — Public API
export { ExamplePage } from "./ui/ExamplePage";
export { metadata } from "./ui/ExamplePage";
```

## Notes

- Next.js の `app/` フォルダがルートに必要なため、FSD の `app` レイヤーは `src/app/` に配置する
- Next.js Pages Router の場合は `pages/_app.tsx` から `export { App as default } from "@/app/custom-app"` を行う
- Middleware と Instrumentation はプロジェクトルートに置く必要がある
- API Routes のロジックは `src/app/api-routes` セグメントに配置し Next.js ルートから再エクスポートする
