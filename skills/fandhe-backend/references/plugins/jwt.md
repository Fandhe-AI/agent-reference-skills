# jwt

汎用 JWT 検証プラグイン（REQ-16、イシュー #812 系）。`Authorization: Bearer` の JWT（RFC 9068 のアクセストークン）を RS256 / ES256 で検証する `RequestGate` 実装 `JwtGate` と、その構成要素（検証ポリシー・JWKS 鍵集合・検証関数・認証器・未知 `kid` 通知口）を提供する。

- crate 名: `fandhe-backend-plugin-jwt`（v0.5.0 で初公開。署名検証は `ring`）
- 拡張点: `RequestGate`（`Server::gate(...)` に登録）
- 依存方向: プラグイン → コアの一方向。コア側に feature や再エクスポートは追加しない。`#![forbid(unsafe_code)]`
- `iss`・`aud`・`typ`・許可 `alg` の欠けた構成は型の段階で作れない。`none`・HS 系は `Algorithm` に変種がなく型として表現できない（RFC 8725 3.1・3.8・3.9・3.11・3.12、RFC 9068 4 節）
- 設計は `docs/design/jwt-verify-plugin.md`（https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/docs/design/jwt-verify-plugin.md）
- opt-in feature（いずれも既定は無効）: `dpop`（v0.6.0 で追加。RFC 9449 の DPoP 結合トークン検証。詳細は [jwt-dpop](./jwt-dpop.md)）、`jwks-refresh`（v0.6.0 で追加。`SharedKeySet` の取り直しタスク。詳細は [jwt-jwks-refresh](./jwt-jwks-refresh.md)）

## Signature / Usage

```rust
use fandhe_backend_core::extension::RequestGate;
use fandhe_backend_plugin_jwt::*;

let policy = JwtPolicy::new(
    Issuer::new("https://issuer.example")?,
    Audiences::single("api")?,
    AllowedAlgorithms::only(Algorithm::Es256),
    TokenType::AccessToken,
);
let auth = JwtAuthenticator::<NoExtraClaims>::builder(SharedKeySet::new(KeySet::empty()), policy)
    .build();
let handler_side = auth.clone(); // ハンドラ用。Server::gate へ渡す前に取り出す
let gate = JwtGate::new(auth);
assert_eq!(gate.name(), "jwt-gate");
```

主要 API:

```rust
// gate
pub struct JwtGate<E = NoExtraClaims>;
impl<E> JwtGate<E> {
    pub fn new(auth: JwtAuthenticator<E>) -> Self;
    pub fn authenticator(&self) -> JwtAuthenticator<E>; // ハンドラと共有する clone
    // v0.6.0 で追加: ゲートが載せた検証済みクレームをハンドラから読む（検証は繰り返さない）
    pub fn verified(head: &RequestHead) -> Result<&Claims<E>, NotAdmitted>;
}

// v0.6.0 で追加。フィールド・コンストラクタは非公開（JwtGate::check だけが RequestExtensions へ入れられる）
pub struct GateVerified<E = NoExtraClaims>;
impl<E> GateVerified<E> {
    pub fn claims(&self) -> &Claims<E>;
}

// v0.6.0 で追加。Debug / Clone / Copy / PartialEq / Eq / Display / std::error::Error を実装
pub struct NotAdmitted;

// v0.6.0 で BREAKING（コアの RequestGate::check に第 3 引数 extensions を追加）に追随
impl<E> RequestGate for JwtGate<E> {
    fn name(&self) -> &'static str; // "jwt-gate"
    fn check(
        &self,
        head: &RequestHead,
        _ctx: &GateContext,
        extensions: &mut RequestExtensions,
    ) -> GateOutcome;
}

// auth
pub fn bearer_token(head: &RequestHead) -> Option<&str>;
impl<E> JwtAuthenticator<E> {
    pub fn builder(keys: SharedKeySet, policy: JwtPolicy) -> JwtAuthenticatorBuilder<E>;
    pub fn authenticate(&self, head: &RequestHead) -> Result<Claims<E>, VerifyError>;
    pub fn authenticate_at(&self, head: &RequestHead, now_unix: u64) -> Result<Claims<E>, VerifyError>;
    pub fn cache_hits(&self) -> u64;
    pub fn cache_misses(&self) -> u64;
}
impl<E> JwtAuthenticatorBuilder<E> {
    pub fn unknown_key_notifier(self, n: impl UnknownKeyNotifier + 'static) -> Self;
    pub fn unknown_key_min_interval(self, d: Duration) -> Self;
    pub fn build(self) -> JwtAuthenticator<E>;
}

// verify
pub fn verify<E: DeserializeOwned>(
    token: &str,
    keys: &KeySet,
    policy: &JwtPolicy,
    now_unix: u64,
) -> Result<Claims<E>, VerifyError>;

// jwks
impl KeySet {
    pub fn empty() -> Self;
    pub fn from_json(json: &str) -> Result<Self, JwksError>;
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
    pub fn skipped(&self) -> usize;
    pub fn keys_for<'a>(&'a self, kid: &'a str) -> impl Iterator<Item = &'a Jwk> + 'a;
}
impl SharedKeySet {
    pub fn new(set: KeySet) -> Self;
    pub fn from_json(json: &str) -> Result<Self, JwksError>;
    pub fn snapshot(&self) -> Arc<KeySet>;
    pub fn set(&self, set: KeySet);
}

// policy
impl JwtPolicy {
    pub fn new(issuer: Issuer, audiences: Audiences, algorithms: AllowedAlgorithms, token_type: TokenType) -> Self;
    pub fn with_clock_skew(self, skew: Duration) -> Result<Self, PolicyError>;
    pub fn issuer(&self) -> &Issuer;
    pub fn audiences(&self) -> &Audiences;
    pub fn algorithms(&self) -> &AllowedAlgorithms;
    pub fn token_type(&self) -> TokenType;
    pub fn clock_skew(&self) -> Duration;
}

// notify
pub trait UnknownKeyNotifier: Send + Sync {
    fn notify(&self, event: &UnknownKeyEvent<'_>);
}
```

## Options / Props

`JwtPolicy`（構築後は不変。`Default` なし・構造体リテラル不可）:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `issuer` | `Issuer` | 必須 | 期待する `iss`。完全一致（大文字小文字・前後空白も区別）。空は `PolicyError::EmptyIssuer` |
| `audiences` | `Audiences` | 必須 | 受理する `aud` 集合。トークンの `aud` が文字列でも配列でも、どれか 1 つが一致すれば受理。`Audiences::new(iter)` は重複除去、`Audiences::single(v)` は 1 個 |
| `algorithms` | `AllowedAlgorithms` | 必須 | 許可 `alg` の非空集合。`AllowedAlgorithms::new(iter)` / `only(alg)` |
| `token_type` | `TokenType` | 必須 | ヘッダ `typ`。`TokenType::AccessToken` のみ（`at+jwt` と `application/at+jwt` を ASCII 大文字小文字無視で受理） |
| `clock_skew` | `Duration` | `Duration::ZERO` | 時刻ずれの許容幅（leeway）。`with_clock_skew` で設定、`MAX_CLOCK_SKEW` 超過は `PolicyError::ClockSkewTooLarge` |

`Algorithm`（`#[non_exhaustive]`）: `Rs256`（RSASSA-PKCS1-v1_5 + SHA-256）、`Es256`（ECDSA P-256 + SHA-256）。`as_jose_name()` / `from_jose_name(name)`（大文字小文字区別の完全一致、`none`・HS 系は `None`）。

上限定数:

| Name | Value | Description |
| --- | --- | --- |
| `MAX_CLOCK_SKEW` | 300 秒 | leeway の上限 |
| `MAX_CLAIM_VALUE_LEN` | `1024` | `iss` および各 `aud` 値のバイト長上限 |
| `MAX_AUDIENCES` | `16` | ポリシーの `aud` 個数上限 |
| `MAX_TOKEN_LEN` | `8192` | トークン全体の最大バイト長 |
| `MAX_TOKEN_AUDIENCES` | `16` | トークン側 `aud` 配列の最大要素数 |
| `MAX_JWKS_DOC_LEN` | `64 * 1024` | JWKS 文書長の上限 |
| `MAX_KEYS` | `32` | 採用する鍵の総数上限 |
| `MAX_KEYS_PER_KID` | `3` | 同一 `kid` の鍵数上限（前・現・次） |
| `MAX_KID_LEN` | `256` | `kid` の長さ上限 |
| `CACHE_CAPACITY` | `1024` | 署名検証結果キャッシュの最大件数 |
| `DEFAULT_UNKNOWN_KEY_MIN_INTERVAL` | 10 秒 | 未知 `kid` 通知の既定最小間隔 |

`JwtAuthenticatorBuilder`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `unknown_key_notifier(n)` | `impl UnknownKeyNotifier` | なし | 未知 `kid` の通知口。`Fn(&UnknownKeyEvent<'_>) + Send + Sync + 'static` のクロージャも可 |
| `unknown_key_min_interval(d)` | `Duration` | `DEFAULT_UNKNOWN_KEY_MIN_INTERVAL` | 通知の最小間隔（秒精度。1 秒未満は 0 秒扱い、0 で未知 `kid` のたびに通知） |

`Claims<E = NoExtraClaims>` のアクセサ: `iss()` / `sub()` / `aud()`（文字列 1 個でも配列に正規化）/ `exp()` / `nbf()` / `iat()` / `jti()` / `client_id()` / `scope()`（空白区切りの生文字列）/ `extra()` / `into_extra()`。追加クレームを使わないときの既定型は `NoExtraClaims`（任意の値を読み捨てる）。

`VerifyError`（`#[non_exhaustive]`、文字列を持たずトークン・`kid`・クレーム値を含まない）:

| Variant | Description |
| --- | --- |
| `MissingToken` | トークンが空 |
| `TooLong` | `MAX_TOKEN_LEN` 超過 |
| `Malformed` | 構造不正（区画数・base64・JSON・型・上限超過など） |
| `AlgorithmNotAllowed` | `alg` が許可リスト外（`none`・HS 系・未知の名前を含む） |
| `MissingKeyId` | ヘッダに `kid` がない、または空 |
| `UnknownKeyId` | `kid` に一致する鍵がない（鍵集合が空の場合を含む） |
| `KeyAlgorithmMismatch` | `kid` の鍵はあるが、ヘッダの `alg` と方式が一致する鍵がない |
| `InvalidSignature` | 署名検証に失敗 |
| `CriticalHeader` | ヘッダに `crit` がある（拒否） |
| `InvalidType` | `typ` の欠落、またはポリシーの種別と不一致 |
| `IssuerMismatch` | `iss` がポリシーと不一致 |
| `AudienceMismatch` | `aud` がポリシーのどの値とも不一致 |
| `Expired` | `exp` 切れ |
| `NotYetValid` | `nbf` 前 |
| `MissingClaim` | 必須クレーム（`iss`・`aud`・`exp`）の欠落 |
| `InvalidExtraClaims` | 追加クレーム型 `E` への読み込みに失敗 |

`JwksError`（`#[non_exhaustive]`、固定文言）: `DocumentTooLarge` / `InvalidJson` / `TooManyKeys` / `TooManyKeysForKeyId` / `MissingKeyId` / `KeyIdTooLong` / `MissingAlgorithm` / `KeyAlgorithmMismatch` / `UnsupportedCurve` / `ForbiddenAlgorithm` / `SymmetricKey` / `PrivateKeyMaterial` / `MissingKeyComponent` / `InvalidKeyEncoding` / `KeyTooLarge` / `InvalidKeyLength` / `DuplicateKey` / `NoUsableKeys`。

`PolicyError`（`#[non_exhaustive]`）: `EmptyIssuer` / `EmptyAudience` / `TooManyAudiences` / `ClaimValueTooLong` / `NoAllowedAlgorithms` / `ClockSkewTooLarge`。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono`（jwt ミドルウェア）や Go の `go-echo` の同名機能、また `zod` 等のスキーマ検証とは別物。`jku` / `x5u` / `jwk` / `x5c` を読まず、鍵はトークン外の `KeySet` からのみ選ぶ
- 検証順序（契約）: 1) 長さと 3 区画構造、2) ヘッダ解析 → `crit` 拒否 → `alg`（ポリシーの許可リスト）→ `kid` → 鍵の特定、3) 署名検証（候補鍵を JWKS 文書順に試し最初に成功した鍵で受理）、4) 署名検証が済むまで payload は解析しない、5) `typ` → payload 解析 → `iss` → `aud` → `exp` → `nbf` → 追加クレーム。ヘッダの `alg` は信用せず、ポリシーの許可リストと鍵に固定された方式の双方に一致したときだけ受理する（RFC 8725 3.1・3.2）。どのような入力でもパニックせず `Err` を返す
- 時刻クレーム: `exp` は必須（欠落は拒否）で `now - leeway < exp`、`nbf` は任意で、あれば `now + leeway >= nbf`。`iat` は判定に使わない。`verify` は時刻を呼び出し側が注入する純関数（I/O・ロックなし）
- JWKS（`KeySet::from_json`）: 文書長 → JSON → 各エントリ → 件数の順に検査し、1 件でも不正なら文書全体を拒否する。採用する鍵は `kid` と `alg` が必須。`kty` / `crv` と `alg` が矛盾する鍵、`oct`・`none`・HS 系・秘密鍵成分を含む鍵は文書全体を拒否。矛盾しない未対応の鍵（`use: enc`、RS384 など、P-256 以外の EC、OKP）は読み飛ばし `KeySet::skipped()` で件数を参照できる。`{"keys":[]}` のみ空集合を返し、`keys` が空でないのに採用できる鍵が 0 件なら `NoUsableKeys`。EC の点が曲線上か、RSA のモジュラスが十分な長さかは解析時には保証せず署名検証時に ring が拒否する
- JWKS の取得（HTTP 等）は本クレートの責務外。`RequestGate::check` は同期・I/O なしの契約のため、利用側が取得した文書を `SharedKeySet::set` で差し替える。`snapshot` は内側の `Arc` を返し、差し替えのたびに新しい `Arc` が作られる
- `JwtAuthenticator` は署名検証結果をキャッシュする（キーはトークンの SHA-256、生トークンは保持しない）。キャッシュヒットを許す条件（fail-closed）: 検証時点の `Arc<KeySet>` が現行と `Arc::ptr_eq`（差し替え後は全件ミス）、ヒット時も `exp` / `nbf` を leeway 付きで毎回再判定、成功だけをキャッシュ。満杯時は期限切れを先に掃き、なお満杯なら FIFO で追い出す。ポリシーは構築後に変更できない（キャッシュは 1 ポリシーに束縛）
- `GateOutcome` はクレームを運べないため、ハンドラは `JwtGate::authenticator()` で取り出した共有ハンドルの `authenticate` を呼んでクレームを得る。ゲート通過時にキャッシュが温まっているため、ハンドラ側は署名検証を再実行しない。`authenticate` は時計異常時 `u64::MAX` を渡して期限切れ側へ倒す
- `bearer_token`: スキーム名は大文字小文字不問、スキームとトークンの間の 1 個以上の SP を許す。トークンが空、スキームが `Bearer` 以外、`Authorization` ヘッダが複数ある場合は `None`
- 拒否応答: `JwtGate` は 401 を返す。本文は固定の `{"error":"invalid_token"}`（`Content-Type: application/json`）で、トークン・`kid`・失敗理由を反映しない。`WWW-Authenticate` はトークンなしなら `Bearer`（RFC 6750 3.1）、トークンはあるが検証失敗なら `Bearer error="invalid_token"`（`error_description` は付けない）。ヘッダ付与に失敗した場合もヘッダ無しの 401 に倒し `Allow` にはしない
- 未知 `kid`: ゲートはその場で 401（フェイルクローズ）にし、鍵ローテーションの可能性だけを同期の `UnknownKeyNotifier` へ通知する（判定確定後に呼び、通知口の遅延・panic は判定結果を変えない）。実装契約はブロックしない・I/O しない（`try_send` 等で利用側の非同期タスクへ合図するだけ）・panic しない（呼び出し側は `catch_unwind` で包むが `panic = "abort"` では効かない）。通知は最小間隔で間引かれ、`UnknownKeyEvent::suppressed()` が前回通知以降に間引かれた件数を返す。`UnknownKeyEvent::kid()` は攻撃者が自由に決められる信頼できない値で、ログへ出す場合はエスケープし、鍵取得先の URL やファイル名の組み立てに直接使わないこと。取り直し（HTTP 取得・`SharedKeySet::set`）は利用側の非同期タスクが担う
- ゲート通過後のクレーム取得（v0.6.0 で追加）: `JwtGate::check` は受理時に `GateVerified<E>` を `RequestExtensions` へ入れ、ハンドラは `JwtGate::<E>::verified(&head)` で読む（検証は繰り返さない）。ゲートを通っていない要求（ゲート未登録・別経路）は `NotAdmitted` を返すので、ハンドラは認証失敗として扱い、クレームを推測や再検証で補わないこと（フェイルクローズ）。`E` は登録したゲートの追加クレーム型と同じにする（違うと値が見つからず `NotAdmitted`）。同じ型のゲートを二重登録すると上書きせず 500（`{"error":"internal_error"}`）で拒否する。`GateVerified` の `Debug` はクレーム値を出さない
- Migration (v0.5.0 → v0.6.0): コアの `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が加わった（BREAKING）。`JwtGate` はシグネチャの追随のみで挙動は変わらない。独自の `RequestGate` 実装は `check` に第 3 引数 `_extensions: &mut RequestExtensions` を足す。従来の `JwtGate::authenticator()` 経由で `authenticate` を呼ぶ方法も使えるが、DPoP を設定した認証器ではハンドラで `authenticate` を呼び直すと `jti` の再使用になるため `JwtGate::verified` を使う
- DPoP（v0.6.0 で追加、`dpop` feature）: `JwtAuthenticatorBuilder::dpop(DpopConfig)` で RFC 9449 の DPoP 結合トークンを検証し、`Claims::cnf_jkt()`・`VerifyError::Dpop`（`#[non_exhaustive]` への追加）・`JwtAuthenticator::dpop_mode()`・`JwtAuthenticator::unauthorized_response(head, err)` が加わる。feature が無効、または DPoP を設定していないゲートは、結合トークンも bearer として受理する（CHANGELOG）。詳細は [jwt-dpop](./jwt-dpop.md)
- JWKS 取り直し（v0.6.0 で追加、`jwks-refresh` feature）: ゲートの外で `SharedKeySet` を最新に保つ取り直しタスクと、未知 `kid` を契機とする `JwtAuthenticatorBuilder::jwks_refresh_trigger(RefreshTrigger)` が加わる。HTTP クライアントと TLS は持たず取得関数（`JwksFetcher`）をアプリが渡す。詳細は [jwt-jwks-refresh](./jwt-jwks-refresh.md)
- `Claims` は `sub` などの識別子を含むためログへ出さないこと（`Debug` は `sub` / `jti` / `client_id` / `scope` / `extra` の値を出さず有無のみ示す）
- Cookie 認証の画面と併用する場合は CSRF ゲートを先に登録する。`JwtGate` は `Authorization: Bearer` のみを見て Cookie は見ない
- v0.5.0 の BREAKING CHANGES（CHANGELOG）: `fandhe-backend-plugin-hub-wiring` の JWT 検証部を本クレートへ移した。検証ポリシー（発行者・受信者・許可アルゴリズム・トークン種別）が `TenantGateConfig` の構築に必須となり、旧公開パスの互換層は無い。移行は `TenantGateConfig::from_jwks_json(&jwks_json, policy)?`（旧: `from_jwks_json(&jwks_json)?`）。詳細は [hub-wiring](./hub-wiring.md) を参照
- 出典: https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/lib.rs
- 設計文書: https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/docs/design/jwt-verify-plugin.md

## Related

- [jwt-dpop](./jwt-dpop.md)
- [jwt-jwks-refresh](./jwt-jwks-refresh.md)
- [dpop](../guides/dpop.md)
- [jwks-refresh](../guides/jwks-refresh.md)
- [csrf](./csrf.md)
- [hub-wiring](./hub-wiring.md)
