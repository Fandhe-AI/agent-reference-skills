# Next.js App Router Integration

Next.js App Router と FSD を併用するディレクトリ構成とページ再エクスポートパターン。FSD の `app` / `pages` レイヤーは `_app` / `_pages` に改名して競合を避ける。

```text
project-root/
├── app/                             # Next.js App Router（ルーティング担当）
│   ├── api/
│   │   └── get-example/
│   │       └── route.ts
│   └── example/
│       └── page.tsx
└── src/                             # FSD コード
    ├── _app/                        # FSD の app レイヤー（改名）
    │   └── api-routes/
    │       ├── index.ts
    │       └── get-example-data.ts
    ├── _pages/                      # FSD の pages レイヤー（改名）
    │   └── example/
    │       ├── index.ts
    │       └── ui/
    │           └── example.tsx
    ├── widgets/
    ├── features/
    ├── entities/
    └── shared/
```

```tsx
// app/example/page.tsx — Next.js ルートから FSD ページを再エクスポート
export { ExamplePage as default, metadata } from '@/_pages/example';
```

```ts
// src/_app/api-routes/get-example-data.ts — Route Handler のロジック
import { getExamplesList } from '@/shared/db';

export const getExampleData = () => {
    try {
        const examplesList = getExamplesList();

        return Response.json({ examplesList });
    } catch {
        return Response.json(null, {
            status: 500,
            statusText: 'Ouch, something went wrong',
        });
    }
};
```

```ts
// app/api/example/route.ts — Next.js ルートから再エクスポート
export { getExampleData as GET } from '@/_app/api-routes';
```

## Server and client public APIs

同一スライスにクライアントで使えるモジュールとサーバー専用モジュールが同居し、サーバー専用モジュールを `index.ts` から export すると、Client Component がそのスライスを import した際にサーバー専用の副作用がクライアントのモジュールグラフへ伝播し、ビルドエラーになりうる。この問題が起きたときに `index.server.ts` を Public API に追加する。

- `index.server.ts`: Server Components や `server-only` を付けたデータアクセス関数など、サーバーでのみ import すべきモジュールを公開する

## Notes

- 公式（Usage with Next.js）: ルーターの種類に関わらず FSD の `app` と `pages` の **両方** を `_app` / `_pages` に改名する（Steiger の prefixed layers 対応と互換）
- 旧方式（root に空の `pages/` フォルダと `README.md` を置く）は撤回され、現行ガイドでは `_app` / `_pages` への改名に置き換わっている
- Next.js の `app/`（Pages Router では `pages/`）はプロジェクトルートに置くと `src` を FSD コード専用にできる（`src` 内でも可）。Middleware と `instrumentation.js` はプロジェクトルート（Next.js の `app` / `pages` と同じ階層）に置く必要がある
- Pages Router の場合は `src/_app/custom-app/custom-app.tsx` に Custom App を置き、`pages/_app.tsx` から再エクスポートする（公式の例どおり）
- Route Handler は `_app` レイヤーの `api-routes` セグメントに置く。FSD は主にフロントエンド向けのため、エンドポイントが多い場合はモノレポの別パッケージに分離を検討する
- 推奨: `shared` レイヤーの `db` セグメントにデータベースクエリを記述し、上位レイヤーで利用する。クエリのキャッシュ・再検証ロジックはクエリと同じ場所に置く
- `widgets` レイヤーは公式ガイドで非推奨（ツリーの `widgets/` は旧来の構成）
- 公式は `index.server.ts` のコード例を載せていないため、本サンプルも散文のみ。ツリーの `api-routes/index.ts` は原本のツリーに無く、`route.ts` の import（`@/_app/api-routes`）から補った
