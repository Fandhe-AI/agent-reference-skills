# hub-wiring

hub 共通配線プラグイン（TASK-9.1 / TASK-9.2）。コアの `RequestGate` 拡張点上に `TenantGate` を実装し、RS256 + JWKS による JWT 検証 → `org_id` 抽出 → フェイルクローズの配線を集約する。

- feature 名: なし（feature ゲート不使用の依存逆転型プラグイン。利用側サービスが本クレートを依存に追加するだけで有効化する）
- crate 名: `fandhe-backend-plugin-hub-wiring`（crates/plugin-hub-wiring）
- 配線パターン: RequestGate 型（依存逆転型）。既存 4 プラグイン（コア → プラグインの optional 依存 + feature ゲート）とは逆に、本クレートが `fandhe-backend-core` へ一方向に依存する。`crates/core` の `Cargo.toml`・`server.rs`・`plugin.rs` は本クレートのために一切変更しない

## Signature / Usage

利用側サービスが本クレートを依存に追加し、`Server::gate(TenantGate::new(config))`（`crates/core/src/server.rs`）で登録する。

```rust,ignore
let config = TenantGateConfig::from_jwks_json(jwks_json)?;
let authenticator = config.authenticator(); // ハンドラ側で再利用する場合は消費前に取り出す
let gate = TenantGate::new(config);
// server.gate(gate) へ登録
```

```rust,ignore
impl TenantGateConfig {
    pub fn new(jwks: SharedJwks) -> Self;
    pub fn from_jwks_json(json: &str) -> Result<Self, JwksError>;
    pub fn authenticator(&self) -> Authenticator;
}

impl RequestGate for TenantGate {
    fn name(&self) -> &'static str;
    fn check(&self, head: &RequestHead) -> GateOutcome;
}
```

## Options / Props

`TenantGateConfig`（`new(jwks)` または `from_jwks_json(json)` で構築。型は `TenantGateConfig` のフィールドに対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `authenticator`（内部保持、`authenticator()` で取得） | `Authenticator` | —（`new(jwks)`/`from_jwks_json(json)` の構築結果として必ず設定される） | 検証成功済みトークンのキャッシュ（トークン文字列の SHA-256 ハッシュをキー、生トークンは保持しない）。ゲートとハンドラで共有すると署名検証の重複実行を避けられる |

JWKS の取得（HTTP フェッチ・自動リフレッシュ）は本クレートの責務外。利用側サービスが取得済み JWKS JSON を注入し、`SharedJwks::set()` で再起動なしローテーションする。

判定ポリシー: トークン欠落・形式不正・アルゴリズム不正・`kid` 欠落・未知 `kid`・署名不一致・期限切れ → `401`。署名は妥当だが `org_id` クレーム欠落・空 → `403`。それ以外の検証成功時のみ `Allow`。JWKS 鍵セットが空の場合は全リクエストが `401`（フェイルオープンにしない）。

## Notes

- `GateOutcome` は許可/拒否の判定結果のみを運ぶ契約であり、検証で得た `org_id` 等のクレームはコアへ一切渡らない
- `RequestGate::check` は同期・I/O なしの契約。JWT 検証は `ring`（RS256、定数時間比較の RSA PKCS#1 v1.5）を使用（`rsa` crate は RUSTSEC-2023-0071 のため不採用）
- `RequestGate` はコアループ内で `UpgradeHandler`・`plugin::try_intercept` より先に評価されるため、WebSocket アップグレード等の長時間接続もこの認証をバイパスできない
- `audit`（越境アクセス監査ログ）・`outbox`（`OutboxStore`）・`consent`（`ConsentStore`）はいずれも同一クレート内の関連モジュールで、`RequestGate::check` の同期 API 制約の対象外（判定通過後にハンドラ層から呼ばれる想定）

## Related

- [tracing](./tracing.md)
