# graphql

GraphQL プラグイン実装（TASK-5.1）。パスインターセプト型のプラグイン境界パターンを維持したまま、`async-graphql` による実クエリ実行を提供する。

- feature 名: `graphql`
- crate 名: `fandhe-backend-plugin-graphql`（crates/plugin-graphql）
- 配線パターン: パスインターセプト型（`try_intercept`）。設定登録型（`GraphQlConfig` 未登録時はフォールスルー）

## 登録方法

`fandhe_backend_core::Server::graphql` へ `GraphQlConfig` を登録する。未登録の場合 `graphql` feature が有効でも `POST /graphql` はフォールスルー（404）する。

```rust,ignore
let config = GraphQlConfig::new(schema); // schema: async_graphql::Executor 実装
```

## Signature

```rust,ignore
pub const GRAPHQL_PATH: &str = "/graphql";

pub async fn try_handle_graphql(
    head: &RequestHead,
    body: &[u8],
    config: &GraphQlConfig,
) -> Option<self::Response>;

impl GraphQlConfig {
    pub fn new<E>(executor: E) -> Self
    where
        E: Executor + Clone + Send + Sync + 'static;
}
```

## Config

`GraphQlConfig`（`GraphQlConfig::new(executor)` のみで構築、既定値なし）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `executor`（コンストラクタ引数） | `impl Executor + Clone + Send + Sync + 'static` | —（必須） | 実行対象のスキーマ（`async_graphql::Schema<Q, M, S>` 等） |

クエリ深さ・複雑度制限（`Schema::limit_depth` / `Schema::limit_complexity`）・introspection 無効化（`Schema::disable_introspection`）はスキーマ登録者（呼び出し元）の責務。本クレートは既定値を提供しない。

## Notes

- `POST /graphql` のみ対象（`GET /graphql` の GraphQL over HTTP GET クエリ形式はスコープ外）
- body は `{"query": String, "variables"?: Value, "operationName"?: String}` としてパースする。JSON 不正・`query` 欠落は `400` + 固定 body（リクエスト由来の値を一切エコーしない）
- 実行時エラー（バリデーション・resolver エラー）は GraphQL over HTTP の慣行どおり `200` + 応答 body の `"errors"` フィールドで表現する
- `async-graphql` の推移的依存は大きく、`graphql` feature 経由でのみ依存グラフへ載る
- `executor` は `GraphQlConfig::new` の必須引数であり既定値を持たない（`GraphQlConfig` は空の状態を構築できない設計）

## Related

- [openapi](./openapi.md)
- [webrtc](./webrtc.md)
- [webrtc-proxy](./webrtc-proxy.md)
