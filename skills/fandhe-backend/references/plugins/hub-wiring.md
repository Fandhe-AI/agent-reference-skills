# hub-wiring

hub 共通配線プラグイン（TASK-9.1 / TASK-9.2）。コアの `RequestGate` 拡張点上に `TenantGate` を実装し、`org_id` 抽出とテナント境界のフェイルクローズ配線を集約する。JWT の検証（署名・`iss`・`aud`・`typ`・`exp`・`nbf`・JWKS 鍵集合・検証結果キャッシュ）は v0.5.0（#820）から汎用 JWT 検証クレート `fandhe-backend-plugin-jwt` へ委譲され、本クレートはその全体を `jwt` として再エクスポートする。

- feature 名: `dpop`（v0.6.0 で追加。opt-in で既定は無効。`fandhe-backend-plugin-jwt/dpop` の転送のみで新規依存なし。有効にしただけでは挙動は変わらない）。それ以外に feature ゲートはなく、利用側サービスが本クレートを依存に追加するだけで有効化する依存逆転型プラグイン
- crate 名: `fandhe-backend-plugin-hub-wiring`（crates/plugin-hub-wiring）
- 配線パターン: RequestGate 型（依存逆転型）。既存 4 プラグイン（コア → プラグインの optional 依存 + feature ゲート）とは逆に、本クレートが `fandhe-backend-core` へ一方向に依存する。`crates/core` の `Cargo.toml`・`server.rs`・`plugin.rs` は本クレートのために一切変更しない

## Signature / Usage

利用側サービスが本クレートを依存に追加し、検証ポリシーを添えて `Server::gate(TenantGate::new(config))`（`crates/core/src/server.rs`）で登録する。ポリシーなしの構成は型として作れない。

```rust,ignore
use fandhe_backend_plugin_hub_wiring::jwt::{
    Algorithm, AllowedAlgorithms, Audiences, Issuer, JwtPolicy, TokenType,
};
let policy = JwtPolicy::new(
    Issuer::new("https://issuer.example")?,
    Audiences::single("hub-api")?,
    AllowedAlgorithms::only(Algorithm::Rs256),
    TokenType::AccessToken,
);
let config = TenantGateConfig::from_jwks_json(&jwks_json, policy)?;
let authenticator = config.authenticator(); // ハンドラ側で再利用する場合は消費前に取り出す
let gate = TenantGate::new(config);
// server.gate(gate) へ登録
```

```rust,ignore
impl TenantGateConfig {
    pub fn new(jwks: SharedKeySet, policy: JwtPolicy) -> Self;
    pub fn from_jwks_json(json: &str, policy: JwtPolicy) -> Result<Self, JwksError>;
    // v0.6.0 で追加: 構築済みの Authenticator から設定を組み立てる（DPoP を使うときの入口）
    pub fn from_authenticator(authenticator: Authenticator) -> Self;
    pub fn authenticator(&self) -> Authenticator;
}

impl RequestGate for TenantGate {
    fn name(&self) -> &'static str; // "hub-tenant-gate"
    fn check(
        &self,
        head: &RequestHead,
        _ctx: &GateContext,
        extensions: &mut fandhe_backend_core::extension::RequestExtensions, // v0.6.0 で追加
    ) -> GateOutcome;
}

// v0.6.0 で追加（feature によらない）。pub use gate::{NotAdmitted, TenantGate, TenantGateConfig, TenantVerified}
impl TenantGate {
    pub fn verified(head: &RequestHead) -> Result<&TenantClaims, NotAdmitted>;
}
pub struct TenantVerified; // フィールド非公開・Clone なし。ゲートだけが RequestExtensions へ入れる
impl TenantVerified {
    pub fn tenant(&self) -> &TenantClaims;
}
pub struct NotAdmitted; // Debug / Clone / Copy / PartialEq / Eq / Display / std::error::Error

pub use fandhe_backend_plugin_jwt as jwt; // JwtPolicy / SharedKeySet / KeySet / JwksError など
pub use auth::{AuthError, Authenticator, HubClaims, TenantClaims};
pub use auth::bearer_token; // plugin-jwt からの再エクスポート

#[non_exhaustive]
pub enum AuthError { Jwt(VerifyError), MissingOrgId }

impl Authenticator {
    pub fn new(keys: SharedKeySet, policy: JwtPolicy) -> Self;
    pub fn from_jwt(inner: JwtAuthenticator<HubClaims>) -> Self;
    pub fn authenticate(&self, head: &RequestHead) -> Result<TenantClaims, AuthError>;
    pub fn cache_hits(&self) -> u64;
    pub fn cache_misses(&self) -> u64;
}

impl TenantClaims {
    pub fn org_id(&self) -> &str;                 // trim 済み・非空
    pub fn claims(&self) -> &Claims<HubClaims>;   // iss / sub / aud / exp など
}
```

## Options / Props

`TenantGateConfig`（`new(jwks, policy)` または `from_jwks_json(json, policy)` で構築）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `jwks` / `json` | `SharedKeySet` / `&str` | — | 取得済みの JWKS 鍵集合。`SharedKeySet::set()` で再起動なしローテーション |
| `policy` | `JwtPolicy` | — | 必須。発行者（`Issuer`）・受信者（`Audiences`）・許可アルゴリズム（`AllowedAlgorithms`）・トークン種別（`TokenType`） |
| `authenticator`（内部保持、`authenticator()` で取得） | `Authenticator` | — | 検証成功済みトークンのキャッシュ。ゲートとハンドラで共有すると署名検証の重複実行を避けられる |

JWKS の取得（HTTP フェッチ・自動リフレッシュ）は本クレートの責務外。利用側サービスが取得済み JWKS JSON を注入する。

判定ポリシー: トークン欠落・形式不正・アルゴリズム不正・`kid` 欠落・未知 `kid`・署名不一致・期限切れ・`iss` / `aud` / `typ` 不一致 → `401`。署名は妥当だが `org_id` クレーム欠落・空 → `403`。それ以外の検証成功時のみ `Allow`。JWKS 鍵セットが空の場合は全リクエストが `401`（フェイルオープンにしない）。401 / 403 の判定と応答本文は v0.5.0 でも変わらない。

トークン要件（v0.5.0）: ヘッダ `typ` は `at+jwt`（`application/at+jwt` も可、大文字小文字は区別しない）が必須。payload は `iss`（ポリシーと完全一致）・`aud`（ポリシーのいずれかと一致、文字列でも配列でも可）・`exp` が必須で、`org_id` も必須。`nbf` があれば検証し、`crit` ヘッダがあれば拒否。`kid` は 256 バイトまで。ES256 はポリシーの許可リストに入れたときだけ受理する。

## Notes

- `GateOutcome` は許可/拒否の判定結果のみを運ぶ契約であり、検証で得た `org_id` 等のクレームは `GateOutcome` 経由ではコアへ渡らない。v0.6.0 からは `TenantGate::check` が受理時に `TenantVerified` を `RequestExtensions` へ入れ、ハンドラは `TenantGate::verified(&head)` で `&TenantClaims` を読む（検証は繰り返さない）。ゲートを通っていない要求は `NotAdmitted`（フェイルクローズ）。`TenantVerified` はゲート以外に作れないため、値の存在が「`TenantGate` を通った」ことの証明になる。`TenantGate` を二重登録すると上書きせず 500（`{"error":"internal_error"}`）で拒否する。`Debug` は値を出さない
- DPoP（v0.6.0 で追加、`dpop` feature）: `JwtAuthenticator::<HubClaims>::builder(..).dpop(cfg).build()` を `Authenticator::from_jwt` で包み `TenantGateConfig::from_authenticator` に渡したときだけ、DPoP の検証と拒否 401 への `WWW-Authenticate: DPoP` チャレンジが働く。設定しない認証器では `TenantGateConfig::new` と同じ応答になる。DPoP を設定した認証器ではハンドラが `Authenticator::authenticate` を呼び直せない（`jti` の再使用になる）ため、`org_id` は `TenantGate::verified` で取り出す。DPoP 自体の詳細は [jwt-dpop](./jwt-dpop.md)
- Migration (v0.5.0 → v0.6.0): コアの `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が加わった（BREAKING）。`TenantGate` はシグネチャの追随に加えて検証結果を `TenantVerified` として載せるようになったが、401 / 403 の判定と応答は変わらない
- `RequestGate::check` は同期・I/O なしの契約。JWT 検証は `fandhe-backend-plugin-jwt` が担い（Cargo.toml の依存に `ring` を持つ）、本クレートに残るのは `org_id` の取り出しとテナント境界（欠落・空・空白のみは `AuthError::MissingOrgId` → 403）、Outbox・同意ゲート・越境アクセス監査のみ
- `RequestGate` はコアループ内で `UpgradeHandler`・`plugin::try_intercept` より先に評価されるため、WebSocket アップグレード等の長時間接続もこの認証をバイパスできない
- `audit`（越境アクセス監査ログ）・`outbox`（`OutboxStore`）・`consent`（`ConsentStore`）はいずれも同一クレート内の関連モジュールで、`RequestGate::check` の同期 API 制約の対象外（判定通過後にハンドラ層から呼ばれる想定）
- JWKS: 同じ `kid` の鍵を 3 件まで許す（ローテーション用）。採用候補（RSA / EC P-256）の鍵に `kid` や `alg` がない場合、`kty` と `alg` が合わない場合、秘密鍵成分・`oct`・`alg: none` / HS 系がある場合は文書ごと拒否。未対応の方式（EdDSA 等）は読み飛ばす
- Migration (v0.4.2 → v0.5.0): BREAKING。旧公開パスの互換層はない。`TenantGateConfig::from_jwks_json(&jwks_json)?` は `from_jwks_json(&jwks_json, policy)?`、`TenantGateConfig::new(shared_jwks)` は `new(shared_key_set, policy)` に変える（`policy` の組み立ては上記 Usage）
- Migration (v0.4.2 → v0.5.0): 公開パスの対応は `jwks::{JwksKeySet, SharedJwks, JwksError}` → `jwt::{KeySet, SharedKeySet, JwksError}`、`TokenError` → `AuthError`（`Jwt(VerifyError)` / `MissingOrgId`）、`Claims` → `jwt::Claims`（`TenantClaims::claims()` で参照）。`jwks` モジュールと `jwt::verify_token`（`jwt::verify` はポリシーと現在時刻を取る）、`DuplicateKeyId` は削除。`Authenticator::new` は `(SharedKeySet, JwtPolicy)` を取る公開コンストラクタで、`authenticate` は `TenantClaims` を返す
- Migration (v0.4.2 → v0.5.0): `alg` を持たない RSA JWK は旧実装では採用されたが、新実装では文書ごと拒否される。発行元の JWKS に `"alg": "RS256"` を付ける。トークン側にも `typ: at+jwt`・`iss`・`aud` が必須になった

## Related

- [jwt](./jwt.md)
- [jwt-dpop](./jwt-dpop.md)
- [tracing](./tracing.md)
