# Interceptor

リクエストを**確定応答へ差し替える**、またはレスポンスを**書き換える**ための同期フック。`fandhe-backend-core` v0.2.0 で追加された4番目の拡張点。`Middleware`（観測専用）・`RequestGate`（許可/拒否のみ）・`UpgradeHandler`（プロトコル切替のみ）では表現できない「リダイレクト返却」「確定レスポンスの差し替え」を担う。

## Signature / Usage

```rust
use fandhe_backend_core::extension::Interceptor;
use fandhe_backend_http::{request::RequestHead, response::Response};

pub trait Interceptor: Send + Sync {
    fn name(&self) -> &'static str;

    fn intercept(&self, _head: &RequestHead, _body: &[u8]) -> Option<Response> {
        None
    }

    fn map_response(&self, _head: &RequestHead, response: Response) -> Response {
        response
    }
}
```

```rust
struct RedirectInterceptor;

impl Interceptor for RedirectInterceptor {
    fn name(&self) -> &'static str {
        "redirect-interceptor"
    }
    fn intercept(&self, head: &RequestHead, _body: &[u8]) -> Option<Response> {
        if head.path() == "/old-path" {
            Some(Response::redirect("/new-path"))
        } else {
            None
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name(&self)` | `-> &'static str` | 診断・ログ表示用の静的識別名 |
| `intercept(&self, head, body)` | `&RequestHead, &[u8] -> Option<Response>` | ルーティング前のフック。`Some(response)` を返すと以降の処理を打ち切り、その応答を確定させる。既定実装は no-op（`None`） |
| `map_response(&self, head, response)` | `&RequestHead, Response -> Response` | 確定レスポンス生成後のフック。受け取った `response` を書き換えて返す。既定実装は no-op（引数をそのまま返す） |

## Notes

- `Server::interceptor(i)` で登録する。複数登録可能で、`intercept` は登録順に評価され最初に `Some` を返したものが採用される。`map_response` は登録順に逐次適用され、各 Interceptor が前段の結果を受け取る
- 評価位置: `intercept` は `RequestGate::check` / `UpgradeHandler::matches` の後・`plugin::try_intercept` の前。`map_response` は `Handler::handle` の後・`plugin::finalize_response` の前
- 同期 API（`async fn` を含まない、dyn 互換性のため）。実装内で同期ブロッキング I/O を行ってはならない（他拡張点と同じスループット制約）
- `RequestGate` の拒否応答やリクエストのパースエラー応答は fail-closed 対象として `map_response` の書き換え対象から除外される
- `name` 以外の両メソッドに既定実装（no-op）があるため、`intercept` のみ・`map_response` のみのオーバーライドも可能
- feature フラグでの有効/無効切り替えは無い（常時有効な拡張点）

## Related

- [Server](./server.md)
- [Middleware](./middleware.md)
- [RequestGate](./request-gate.md)
- [UpgradeHandler](./upgrade-handler.md)
