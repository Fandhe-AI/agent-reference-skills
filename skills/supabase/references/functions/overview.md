# Edge Functions 概要

Supabase Edge Functions は Deno ランタイム上で動作するサーバーサイド TypeScript 関数であり、グローバルエッジで実行される。

## 概要

Edge Functions は Deno Deploy インフラストラクチャ上で動作し、ユーザーに最も近いエッジロケーションでコードを実行する。TypeScript、JavaScript、WASM をサポートし、`Deno.serve()` ベースの HTTP ハンドラとして実装される。

### アーキテクチャ

- **ランタイム**: Deno（V8 エンジンベース）
- **実行環境**: グローバルエッジネットワーク（世界中のリージョンに分散）
- **エンドポイント**: `https://<project-ref>.supabase.co/functions/v1/<function-name>`
- **対応言語**: TypeScript / JavaScript / WebAssembly
- **HTTP ハンドラ**: `Deno.serve()` ベース（Web 標準の Request / Response API）

### 特徴

- **コールドスタートが高速**: Deno の軽量ランタイムにより、起動が非常に速い
- **Web 標準 API**: Fetch API、Web Crypto API、URL Pattern API など標準 API を使用可能
- **TypeScript ファーストクラスサポート**: 設定不要で TypeScript をそのまま実行
- **組み込みの Supabase 統合**: 環境変数として SUPABASE_URL、SUPABASE_ANON_KEY 等が自動設定
- **セキュリティ**: デフォルトで JWT 検証が有効

### ファイル構成

```
supabase/
├── functions/
│   ├── _shared/         # 共有コード（関数間で共通利用）
│   │   └── cors.ts
│   ├── function-one/
│   │   └── index.ts     # 関数エントリポイント
│   └── function-two/
│       └── index.ts
└── config.toml          # プロジェクト設定
```

## コード例

```typescript
// supabase/functions/hello-world/index.ts
Deno.serve(async (req: Request) => {
  const { name } = await req.json()

  const data = {
    message: `Hello ${name}!`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

## 注意点

- Edge Functions は Deno ランタイムで動作するため、Node.js 固有の API（fs、path 等）は直接使用できない（npm: プレフィックスで一部利用可能）
- 各関数は独立した Deno isolate で実行される
- レスポンスの最大サイズに制限がある
- `Deno.serve()` はトップレベルで 1 回だけ呼び出す
- `_shared/` ディレクトリ内のファイルは関数としてデプロイされない（共有ユーティリティ用）

## 関連

- [クイックスタート](./quickstart.md)
- [デプロイ](./deploy.md)
- [制限事項](./limits.md)
- [依存関係管理](./dependencies.md)
