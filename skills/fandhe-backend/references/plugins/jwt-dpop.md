# jwt-dpop

`fandhe-backend-plugin-jwt` の opt-in feature `dpop`（v0.6.0 で追加）。RFC 9449 の DPoP（Demonstrating Proof of Possession）で結合されたアクセストークンを検証する。アクセストークンが盗まれても、対応する秘密鍵を持たない者は使えなくなる。

- crate 名: `fandhe-backend-plugin-jwt`（feature `dpop`。新規依存なし、暗号は既存の `ring` のみ。無効時はコードも依存も増えない）
- 親ページ: [jwt](./jwt.md)（`JwtGate` / `JwtAuthenticator` / `Claims` / `VerifyError`）
- 設計は `docs/design/jwt-verify-plugin.md` 9 章
- ガイド: https://fandhe-ai.github.io/fandhe-backend/guides/dpop/

## Signature / Usage

```toml
[dependencies]
fandhe-backend-plugin-jwt = { version = "0.6.1", features = ["dpop"] }
# hub 共通配線から使うとき
fandhe-backend-plugin-hub-wiring = { version = "0.6.1", features = ["dpop"] }
```

ガイドの配線例（説明用でコンパイル検証の対象外）:

```rust
use fandhe_backend_plugin_jwt::dpop::{DpopConfig, DpopMode, IatWindow, PublicOrigin};
use fandhe_backend_plugin_jwt::{Algorithm, AllowedAlgorithms, JwtAuthenticator, JwtGate, NoExtraClaims};

let cfg = DpopConfig::new(
    DpopMode::Required,
    PublicOrigin::new("https://api.example")?, // 設定で固定する。Host ヘッダからは作らない
    AllowedAlgorithms::only(Algorithm::Es256),
)
.with_iat_window(IatWindow::new(Duration::from_secs(30), Duration::from_secs(5))?)
.with_replay_capacity(65_536)?;

let auth = JwtAuthenticator::<NoExtraClaims>::builder(keys, policy)
    .dpop(cfg)
    .build();
let gate = JwtGate::new(auth); // Server::gate(gate) で登録する
```

hub 共通配線を使う場合は、DPoP を設定した認証器を `Authenticator::from_jwt` で包んで渡す:

```rust
let auth = JwtAuthenticator::<HubClaims>::builder(keys, policy).dpop(cfg).build();
let config = TenantGateConfig::from_authenticator(Authenticator::from_jwt(auth));
```

主要 API（`fandhe_backend_plugin_jwt::dpop`）:

```rust
// proof の検証（状態なし・sans-IO。時刻は呼び出し側が注入）
pub fn verify_proof(
    proof: &str,
    ctx: &ProofContext<'_>,
    now_unix: u64,
) -> Result<VerifiedProof, DpopError>;

impl<'a> ProofContext<'a> {
    pub fn new(
        method: &'a str,
        htu: &'a ExpectedHtu,
        access_token: &'a str,
        algs: &'a AllowedAlgorithms,
        window: IatWindow,
    ) -> Self;
}
impl VerifiedProof {
    pub fn thumbprint(&self) -> &JwkThumbprint;
    pub fn jti(&self) -> &str;
    pub fn iat(&self) -> u64; // UNIX 秒
}

// 設定
pub enum DpopMode { Required, AllowUnboundBearer } // #[non_exhaustive]、Default なし
impl DpopConfig {
    pub fn new(mode: DpopMode, origin: PublicOrigin, algs: AllowedAlgorithms) -> Self;
    pub fn with_iat_window(self, window: IatWindow) -> Self;
    pub fn with_replay_capacity(self, capacity: usize) -> Result<Self, DpopConfigError>;
    pub fn mode(&self) -> DpopMode;
    pub fn origin(&self) -> &PublicOrigin;
    pub fn algorithms(&self) -> &AllowedAlgorithms;
    pub fn iat_window(&self) -> IatWindow;
    pub fn replay_capacity(&self) -> Option<usize>; // None なら ReplayStore の既定
}
impl IatWindow {
    pub fn new(past: Duration, future: Duration) -> Result<Self, DpopConfigError>;
    pub fn past(&self) -> Duration;
    pub fn future(&self) -> Duration;
}

// 公開オリジンと期待 htu
impl PublicOrigin {
    pub fn new(origin: &str) -> Result<Self, OriginError>;
    pub fn as_str(&self) -> &str;
    pub fn expected_htu(&self, path: &str) -> Result<ExpectedHtu, DpopError>;
}
impl ExpectedHtu { pub fn as_str(&self) -> &str; }

// jti の再使用検知（状態を持つ唯一の部品）
impl ReplayStore {
    pub fn new(window: IatWindow) -> Self;
    pub fn with_capacity(window: IatWindow, capacity: usize) -> Result<Self, DpopConfigError>;
    pub fn register(&self, proof: &VerifiedProof, now_unix: u64) -> Result<(), DpopError>;
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
    pub fn capacity(&self) -> usize;
}

// JWK サムプリント（RFC 7638）
pub fn jwk_thumbprint(jwk_json: &str) -> Result<JwkThumbprint, DpopError>;
impl JwkThumbprint { pub fn as_str(&self) -> &str; } // base64url 43 文字、Display 実装あり
```

ゲート側（`dpop` feature 時のみ存在）:

```rust
impl<E> JwtAuthenticatorBuilder<E> {
    pub fn dpop(mut self, cfg: DpopConfig) -> Self; // 枠は 1 つ。再度呼ぶと後勝ち
}
impl<E> JwtAuthenticator<E> {
    pub fn dpop_mode(&self) -> Option<DpopMode>; // DPoP 未設定なら None
    pub fn unauthorized_response(&self, head: &RequestHead, err: &VerifyError) -> Response;
}
impl<E> Claims<E> {
    pub fn cnf_jkt(&self) -> Option<&str>; // cnf.jkt。結合なし・jkt として使えない cnf は None
}
// VerifyError に Dpop(DpopError) 変種が加わる（#[non_exhaustive] への追加）
```

## Options / Props

`DpopConfig::new(mode, origin, algs)` の 3 引数はすべて必須で既定値はない（設定漏れが「検証しない」へ静かに倒れないようにするため）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `DpopMode` | 必須 | `Required`: すべての要求で DPoP 必須。`cnf.jkt` のないトークンは `Bearer` でも `DPoP` でも拒否。`AllowUnboundBearer`: `cnf.jkt` のないトークンに限り `Bearer` を受理する移行期間用。結合トークンの `Bearer` 提示は拒否、結合のないトークンの `DPoP` スキーム提示も拒否 |
| `origin` | `PublicOrigin` | 必須 | 公開オリジン（`scheme://host[:port]`）。proof の `htu` と突き合わせる。本番は https |
| `algs` | `AllowedAlgorithms` | 必須 | 許可する proof の `alg`（RS256・ES256）。アクセストークン側のポリシーとは独立 |
| `with_iat_window` | `IatWindow` | 過去 60 秒・未来 5 秒 | `iat` の許容窓。`jti` の保持期間も同じ窓から決まる |
| `with_replay_capacity` | `usize` | `DEFAULT_REPLAY_CAPACITY`（131,072） | `jti` の保持数の上限。0 と `MAX_REPLAY_CAPACITY`（4,194,304）超は構築時に拒否 |

定数（`dpop` モジュール）:

| Name | Value | Description |
| --- | --- | --- |
| `MAX_PROOF_LEN` | `MAX_TOKEN_LEN`（8192） | proof 全体の最大バイト長 |
| `MAX_JTI_LEN` | `256` | `jti` の最大バイト長 |
| `DEFAULT_IAT_PAST` | 60 秒 | `iat` 過去側の既定幅 |
| `MAX_IAT_PAST` | 300 秒 | `iat` 過去側の上限（0 は拒否） |
| `DEFAULT_IAT_FUTURE` | 5 秒 | `iat` 未来側（時計ずれ）の既定幅 |
| `MAX_IAT_FUTURE` | 60 秒 | `iat` 未来側の上限 |
| `DEFAULT_REPLAY_CAPACITY` | `131_072` | `jti` 保持数の既定上限（既定の窓で約 2,000 rps） |
| `MAX_REPLAY_CAPACITY` | `4_194_304` | `jti` 保持数の上限として指定できる最大値 |
| `MAX_ORIGIN_LEN` | `512` | 公開オリジン文字列の最大バイト長 |
| `MAX_HTU_LEN` | `4096` | `htu`（期待 URI・proof の `htu`）の最大バイト長 |

`DpopError`（`#[non_exhaustive]`、文字列を持たず proof・`jti`・`jwk` の値を含まない）:

| Variant | Description |
| --- | --- |
| `MissingProof` | proof が空 |
| `TooLong` | proof が `MAX_PROOF_LEN` 超 |
| `Malformed` | 構造不正（区画数・base64・JSON・型・重複キーなど） |
| `InvalidType` | `typ` の欠落、または `dpop+jwt` ではない |
| `AlgorithmNotAllowed` | `alg` が許可リスト外（`none`・HS 系・未知の名前を含む） |
| `CriticalHeader` | ヘッダに `crit` がある |
| `MissingJwk` | ヘッダに `jwk` がない |
| `PrivateKeyMaterial` | `jwk` に秘密鍵の要素（共通鍵を含む）がある |
| `UnsupportedKey` | `jwk` の種別・曲線・`use` が未対応 |
| `KeyAlgorithmMismatch` | `jwk` の種別とヘッダの `alg`（または `jwk.alg`）が食い違う |
| `InvalidKey` | `jwk` の鍵成分が不正（欠落・長さ・正規形でない表現） |
| `InvalidSignature` | 署名検証に失敗 |
| `MissingClaim` | 必須クレーム（`jti`・`htm`・`htu`・`iat`・`ath`）の欠落 |
| `InvalidJti` | `jti` が空、または `MAX_JTI_LEN` 超 |
| `MethodMismatch` | `htm` がリクエストのメソッドと一致しない |
| `UriMismatch` | `htu` が期待 URI と一致しない（解析できない場合を含む） |
| `AccessTokenHashMismatch` | `ath` がアクセストークンのハッシュと一致しない |
| `IssuedAtOutOfWindow` | `iat` が許容窓の外 |
| `InvalidRequestTarget` | リクエストターゲットから期待 `htu` を作れない |
| `Replayed` | `jti` が窓の中で既に使われている（`ReplayStore::register`） |
| `ReplayStoreFull` | `jti` の保持が上限に達している（`ReplayStore::register`） |
| `MultipleProofs` | `DPoP` ヘッダが複数ある（ちょうど 1 つでなければ拒否） |
| `ThumbprintMismatch` | proof のサムプリントがアクセストークンの `cnf.jkt` と一致しない |
| `BoundTokenAsBearer` | `cnf.jkt` を持つ DPoP 結合トークンが `Bearer` で提示された（格下げの拒否） |
| `UnboundToken` | `cnf.jkt` を持たないトークンが、DPoP を要する経路で提示された |

`DpopConfigError`（`#[non_exhaustive]`）: `IatPastZero`（過去側 0。1 秒未満を含む）/ `IatPastTooLarge` / `IatFutureTooLarge` / `ReplayCapacityZero` / `ReplayCapacityTooLarge`。

`OriginError`（`#[non_exhaustive]`、入力値を含まない）: `TooLong` / `InvalidScheme`（`https` / `http` 以外、`://` なし）/ `InvalidHost` / `InvalidPort`（1〜65535 の 10 進数以外）/ `UserInfo` / `PathNotAllowed`（空と `/` 以外のパス）/ `QueryOrFragment`。

拒否の応答（`WWW-Authenticate: DPoP`）:

| 状況 | 応答 |
| --- | --- |
| 資格情報なし | 401、`WWW-Authenticate: DPoP algs="..."`（`AllowUnboundBearer` のときは `Bearer` の行も加わる） |
| アクセストークンが不正 | 401、使われたスキームの行に `error="invalid_token"` |
| proof が不正（欠落・重複・署名・`htm`・`htu`・`ath`・`iat`・再使用・`cnf.jkt` 不一致） | 401、`error="invalid_dpop_proof"` |
| 結合トークンを `Bearer` で提示 | 401 |

本文は固定の JSON（proof 側は `{"error":"invalid_dpop_proof"}`、トークン側は `{"error":"invalid_token"}`）で、トークン・proof・`jwk` の値は含まない。

## Notes

- v0.6.0 で追加（crates.io 公開版 0.5.0 には未収録）。feature `dpop` が必要で既定は無効。`fandhe-backend-plugin-hub-wiring` 側にも feature `dpop` があり、`fandhe-backend-plugin-jwt/dpop` の転送のみ（新規依存なし）
- **DPoP を設定していないゲートは、結合トークンも bearer として受理する。** feature を有効にしただけでは検査は始まらない。feature が無効、または未設定の下流でも同じ。DPoP を強制したいゲートは必ず `JwtAuthenticatorBuilder::dpop` で設定する（`cnf` を持つトークンも bearer として受理される点は CHANGELOG 記載）
- hub-wiring: `dpop` feature を有効にしただけでは挙動は変わらず、DPoP を設定した認証器を `TenantGateConfig::from_authenticator` に渡したときだけ DPoP の検証と `WWW-Authenticate: DPoP` が働く（CHANGELOG）。plugin-jwt の `dpop` だけが有効で hub の `dpop` が無効のままだと、チャレンジが付かないことがある（拒否は 401 のまま）。テナント境界の `org_id` による 403 は DPoP の検査が通った後に判定され、DPoP の拒否は 401 のまま。詳細は [hub-wiring](./hub-wiring.md)
- **`jti` の保持はゲートごと・プロセスごと。複数インスタンス間では共有しない。** 写し取った proof を `iat` の窓の中で別インスタンスへ送る使い回しは防げないため、窓を短くして余地を限る。アクセストークンだけの写しは、秘密鍵を持たない者には proof を作れないため使えない。`DPoP-Nonce` は扱わない
- `ReplayStore` は SHA-256(サムプリント + `jti`) を `iat + past` まで保持する（生の `jti` は保持しない）。未来側の `iat` により最長 `past + future` 秒保持しうる。満杯（期限切れを除いてなお上限）になると新しい proof を `ReplayStoreFull` で拒否（フェイルクローズ）。容量の目安は「ピーク時の DPoP の rps × (過去側 + 未来側の秒数)」。窓を広げる・容量を大きくするほど、再使用を許す余地と保持するメモリが増える。満杯になってから最初の `register` は期限切れ項目の掃除で約 20 ms ロックを持つ（ガイド記載）。確認と登録は同一ロック区間で原子的
- `ReplayStore` の窓と `register` の `now_unix` は、同じ要求で `verify_proof` に渡したものと揃える（食い違うと再使用の隙間が開く）。`register` は 1 要求につき 1 回、すべての検査が通った最後に呼ぶ（2 回呼ぶと 2 回目は `Replayed`）。`register` は `VerifiedProof` だけを受けるので、署名のない入力で保持を埋められない
- `verify_proof` の検査順序（契約）: 1) 長さと 3 区画構造、2) ヘッダ解析 → `crit` 拒否 → `typ`（`dpop+jwt`、`application/` 接頭辞と大文字小文字は不問）→ `alg`（許可リスト）→ `jwk` の存在、3) `jwk` の検査（秘密鍵の要素・種別と `alg` の食い違い・サイズ）、4) 署名検証（鍵は `jwk` のみ。`jku`・`x5u`・`x5c`・`kid` は読まない）、5) 署名検証が済むまで payload は解析しない、6) `jti` → `htm` → `htu` → `iat` → `ath`。`htm` は大文字小文字を区別して完全一致。`iat` は非負整数のみ（小数・負数・型違いは `Malformed`）。どのような入力でもパニックせず `Err` を返す
- `PublicOrigin` は設定で与える値。要求の `Host` や `X-Forwarded-*` から導出しない（パス接頭辞を剥がす前段プロキシの構成は対象外）。`new` は末尾 `/` 1 個を許し、scheme・host は小文字化、既定ポート（https 443 / http 80）は省略、IPv6 は角括弧形。`expected_htu(path)` の `path` は `/` で始まりクエリ・フラグメントを含まない origin-form（`*` や absolute-form は `InvalidRequestTarget`）。パスはパーセントデコードせず `%XX` の 16 進数字だけ大文字化、`.` / `..` セグメント（`%2E` 表記含む）・制御文字・空白・非 ASCII・`\` は拒否。proof の `htu` は同じ規則で正規化（クエリ・フラグメントは捨てる）され、`ExpectedHtu` とバイト単位で完全一致したときだけ受理
- `JwkThumbprint` は RFC 7638 の SHA-256 を base64url にした 43 文字。公開鍵のハッシュで秘密ではないため `Debug` にも出る。`jwk_thumbprint` は proof ヘッダの `jwk` と同じ規則（RSA は 2048 bit 以上、EC は P-256 のみ、秘密鍵の要素・共通鍵・正規形でない整数は拒否、`kid` 等の余分なメンバは無視）で検査し、入力は `MAX_PROOF_LEN` バイトまで
- 認証器の判定順（`authenticate`）: アクセストークンの検証（キャッシュ含む）→ `cnf` の解釈 → 方式とスキームによる振り分け → proof の検証 → `cnf.jkt` とのサムプリント比較 → `jti` の登録。`jkt` として使えない `cnf`（`x5t#S256` のみ・型違い・形式不正）は結合を確認できないので `VerifyError::Malformed`。proof の署名はキャッシュせず毎回検証する。`DPoP` ヘッダが無ければ `MissingProof`、複数なら `MultipleProofs`
- DPoP を設定した認証器の `authenticate` は `jti` の登録を伴うため、**1 要求につきゲートが 1 回だけ**呼ぶ。ハンドラは再呼び出しせず `JwtGate::verified(head)`（hub は `TenantGate::verified(head)`）で結果を読む。同じ proof で再検証すると `Replayed`、ゲートを通っていない要求は `NotAdmitted`。同じ型のゲートの二重登録は 500。詳細は [jwt](./jwt.md) の「ゲート通過後のクレーム取得」
- `unauthorized_response` は DPoP 未設定なら従来どおり `Bearer` 1 行。ヘッダの付与に失敗した場合はヘッダ無しの 401 に倒す。`dpop_mode()` は hub 共通配線が DPoP 用チャレンジを付けるか決めるために使う
- トークン・proof・`jwk`・`jti` をログに出さない。本クレートのエラー型の `Debug` もこれらを含まず、`ProofContext` の `Debug` はアクセストークンを、`VerifiedProof` の `Debug` は `jti` を出さない
- 追加コストは proof の署名検証が支配的（ガイド記載: RS256 で約 13.8 µs、ES256 で約 32.2 µs。計測条件は repo 内 `benches/reports/issue906-jwt-dpop-gate-performance.md`）
- Adapted: 原本の依存例は `version = "..."` だが、本スキルの対象版 0.6.1 を明記した
- 出典: https://fandhe-ai.github.io/fandhe-backend/guides/dpop/ ・ https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/dpop.rs

## Related

- [jwt](./jwt.md)
- [jwt-jwks-refresh](./jwt-jwks-refresh.md)
- [hub-wiring](./hub-wiring.md)
- [dpop guide](../guides/dpop.md)
