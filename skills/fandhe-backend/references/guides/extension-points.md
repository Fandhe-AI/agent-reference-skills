# 拡張点自作ガイド

fandhe-backend のコアは、拡張点を 3 種の trait（`Middleware` / `UpgradeHandler` / `RequestGate`、定義は `crates/core/src/extension.rs`）に集約する。

## Signature / Usage

```rust,ignore
use fandhe_backend_core::{GateOutcome, RequestGate};
use fandhe_backend_http::request::RequestHead;

/// `X-Api-Key` ヘッダの有無だけを見る例（フェイルクローズ）。
struct ApiKeyGate;

impl RequestGate for ApiKeyGate {
    fn name(&self) -> &'static str {
        "api-key-gate"
    }

    fn check(&self, head: &RequestHead) -> GateOutcome {
        match head.header("x-api-key") {
            Some(_) => GateOutcome::Allow,
            None => GateOutcome::Reject {
                status: 401,
                body: Vec::new(),
            },
        }
    }
}

let server = Server::new().handler(router).gate(ApiKeyGate);
```

```rust,ignore
use fandhe_backend_core::UpgradeHandler;
use fandhe_backend_http::request::RequestHead;

struct WebSocketUpgrade;

impl UpgradeHandler for WebSocketUpgrade {
    fn name(&self) -> &'static str {
        "websocket-upgrade"
    }

    fn matches(&self, head: &RequestHead) -> bool {
        head.header("upgrade")
            .is_some_and(|v| v.eq_ignore_ascii_case("websocket"))
    }
}
```

## Options / Props

| trait | 呼ばれるタイミング | できること | できないこと | 登録メソッド | 複数登録時の評価 | 実例プラグイン |
|-------|-------------------|-----------|-------------|-------------|-----------------|---------------|
| `RequestGate` | ルーティング・アップグレード判定より前 | `GateOutcome::Allow` / `Reject` による早期拒否（認証・認可・同意ゲート等） | レスポンス内容の加工（拒否時の status / body 指定のみ） | `Server::gate` | 登録順に評価し、最初の `Reject` を優先 | `plugin-hub-wiring`（`TenantGate`） |
| `UpgradeHandler` | `RequestGate` 通過後、既定 `Handler` より前 | 長時間接続（WebSocket 等）への委譲判定（`matches` が `bool` を返す） | フレーミング・接続奪取後の読み書き（プラグイン側の責務） | `Server::upgrade_handler` | 登録順に `matches` を評価 | `plugin-websocket` |
| `Middleware` | `on_request`: ヘッド受理後・ルーティング前 / `on_response`: レスポンス送出後 | ロギング・メトリクス等の観測 | リクエスト・レスポンスの変更（`head` は不変参照のみ） | `Server::middleware` | 登録順に `on_request` / `on_response` を呼ぶ | `plugin-tracing` |

## Notes

- 3 trait はいずれも同期 API である。`async fn` を trait に持ち込むと `Box<dyn Middleware>` 等の trait object としてコアループが拡張点を保持する構成（dyn 互換性）が壊れる。既定ハンドラ（`Handler::handle`）のみが async 契約であり、この非対称は意図的な設計である
- 3 trait とも `Send + Sync` 境界が必須。拡張点の実装は複数ワーカースレッドから共有参照される
- 拡張点の評価順序（`RequestGate` → `UpgradeHandler` → パスインターセプト型プラグイン → 既定 `Handler`）は固定であり、利用者側で変更できない
- `RequestGate`: 判定に必要な情報が欠落・不正・判定不能な場合は必ず `Reject` を返す（フェイルクローズ）。`Reject` の `status` は数値（`u16`）のみを運び、ステータス行の組み立てはコア側の責務（レスポンス分割・ヘッダインジェクションの型レベル排除）。拒否レスポンス送出後も登録済み `Middleware` の `on_response` は呼ばれる。`GateOutcome` は許可/拒否の判定結果のみを運び、JWT クレーム等のプラグイン固有データをコアへ持ち込まない（依存方向は常に「プラグイン → コア」の一方向）
- `UpgradeHandler`: 実例の `websocket` feature では利用者は `UpgradeHandler` を直接書かず `Server::websocket(config)` を呼ぶ。`matches` が `true` を返したのに委譲先の Upgrade 型プラグインが存在しない場合（feature 無効・未登録）、コアは黙って落とさず 501 を返して接続を閉じる。委譲が成立した接続では `Middleware::on_response` は呼ばれない（`Middleware` 実装側は「`on_request` が必ず `on_response` を伴う」と仮定してはならない）
- `Middleware`: 実装内で同期ブロッキング I/O を行ってはならない（実測で最大 25% のスループット劣化を確認済み）。ロギング等で I/O が必要な場合はチャネル送信パターン（`on_request` / `on_response` では非同期チャネルへの送信・アトミック操作等の非ブロッキング操作に留め、実際の I/O は別タスクで行う）に従う。`head` を変更してはならない契約だが、コアはこれを型では強制しない（実装者が守る規約）。`name()` が返す識別名・ログ出力にリクエスト内容（トークン・PII）を含めない
- 各 trait の完全な実装例（doc test として `cargo test --doc -p fandhe-backend-core` で検証）は `crates/core/src/extension.rs` の doc comment を正とする

## Related

- [tutorial](./tutorial.md)
- [feature-samples](./feature-samples.md)
- [streaming](./streaming.md)
