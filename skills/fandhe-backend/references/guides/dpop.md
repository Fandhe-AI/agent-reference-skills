# DPoP 結合トークンの検証（dpop）

`fandhe-backend-plugin-jwt` の opt-in feature `dpop` は、RFC 9449 の DPoP（Demonstrating Proof of Possession）で結合されたアクセストークンを検証する。アクセストークンが盗まれても、対応する秘密鍵を持たない者は使えなくなる。

DPoP を設定したゲートが行うこと:

- `Authorization: DPoP <token>` と `DPoP` ヘッダ（proof）を読み、アクセストークンの検証に加えて proof の署名、`htm`・`htu`・`ath`・`iat`・`jti`、トークンの `cnf.jkt` との一致を毎回検査する
- DPoP で結合されたトークンを `Bearer` で提示された場合は拒否する（格下げ拒否）
- 拒否は 401 と `WWW-Authenticate: DPoP`（`error` は `invalid_token` か `invalid_dpop_proof`、`algs` に許可する proof の `alg`）で返す
- 同じ proof の再使用を、`iat` の窓の間だけ `jti` を保持して拒否する

しないこと: `DPoP-Nonce` は扱わない。`jti` の保持は複数インスタンス間で共有しない。

## Signature / Usage

有効化:

```toml
[dependencies]
fandhe-backend-plugin-jwt = { version = "0.6.1", features = ["dpop"] }
# hub 共通配線から使うとき
fandhe-backend-plugin-hub-wiring = { version = "0.6.1", features = ["dpop"] }
```

無効のままなら依存もコードも増えない。有効にしても新しい依存は増えない（暗号は既存の `ring` のみ）。

配線（原本の注記: 説明用で、コンパイル検証の対象外。API の呼び出し方は rustdoc の doc test（`JwtAuthenticatorBuilder::dpop`、`TenantGateConfig::from_authenticator`）が「正」）。plugin-jwt を直接使う場合:

```rust,ignore
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

hub 共通配線を使う場合は、DPoP を設定した認証器を `Authenticator::from_jwt` で包んで渡す。

```rust,ignore
let auth = JwtAuthenticator::<HubClaims>::builder(keys, policy).dpop(cfg).build();
let config = TenantGateConfig::from_authenticator(Authenticator::from_jwt(auth));
```

テナント境界の `org_id` による 403 は、DPoP の検査が通った後に判定される。DPoP の拒否は 401 のまま変わらない。

ハンドラで検証結果を読む: 1 要求につき `authenticate` は 1 回だけ呼ばれる。ハンドラは `authenticate` をもう一度呼ばず、ゲートが渡した結果を読む（plugin-jwt: `JwtGate::verified(head)` / hub: `TenantGate::verified(head)`）。同じ proof で再検証すると `jti` が再使用扱いになり `Replayed` で失敗する。ゲートを通っていない要求では `NotAdmitted` が返る。同じ型のゲートを二重に登録した場合は、上書きせず 500 で拒否する。

## Options / Props

`DpopConfig::new(mode, origin, algs)` の 3 引数はすべて必須で既定値はない（設定漏れが「検証しない」へ静かに倒れないようにするため）。

| Name | Description |
|------|-------------|
| `DpopMode::Required` | すべての要求で DPoP を必須にする。`cnf.jkt` のないトークンは `Bearer` でも `DPoP` でも拒否 |
| `DpopMode::AllowUnboundBearer` | `cnf.jkt` のないトークンに限り `Bearer` を受理する移行期間用。結合トークンの `Bearer` 提示は拒否 |
| `PublicOrigin` | 公開オリジン（`scheme://host[:port]`）。proof の `htu` と突き合わせる。本番は https にする |
| `AllowedAlgorithms` | 許可する proof の `alg`（RS256・ES256） |
| `IatWindow` | `iat` の許容幅。既定は過去 60 秒・未来 5 秒、上限は過去 300 秒・未来 60 秒 |
| `with_replay_capacity` | `jti` の保持数の上限。既定 131,072、上限 4,194,304 |

拒否の応答:

| 状況 | 応答 |
|------|------|
| 資格情報なし | 401、`WWW-Authenticate: DPoP algs="..."`（`AllowUnboundBearer` のときは `Bearer` の行も加わる） |
| アクセストークンが不正 | 401、使われたスキームの行に `error="invalid_token"` |
| proof が不正（欠落・重複・署名・`htm`・`htu`・`ath`・`iat`・再使用・`cnf.jkt` 不一致） | 401、`error="invalid_dpop_proof"` |
| 結合トークンを `Bearer` で提示 | 401 |

本文は固定の JSON で、トークン・proof・`jwk` の値は含まない。

## Notes

- DPoP を設定していないゲートは、結合トークンも bearer として受理する。feature を有効にしただけでは検査は始まらない。強制したい下流のゲートは必ず `JwtAuthenticatorBuilder::dpop` で設定する
- `PublicOrigin` は設定で与える値で、要求の `Host` や `X-Forwarded-*` から導出しない。パス接頭辞を剥がす前段プロキシの構成は対象外
- 容量の目安は「ピーク時の DPoP の rps × (過去側 + 未来側の秒数)」。既定の窓なら 131,072 で約 2,000 rps 相当。1 項目あたりのメモリは `fandhe_backend_plugin_jwt::dpop::ReplayStore` の doc を参照。満杯になると新しい proof を拒否する（フェイルクローズ）。窓や容量を広げるほど再使用を許す余地と保持メモリが増えるので必要以上に広げない
- 既知の限界: `jti` の保持はゲートごと・プロセスごとで、複数インスタンス間では共有しない。写し取った proof を `iat` の窓の中で別インスタンスへ送る使い回しは防げないため、窓を短くして余地を限る。アクセストークンだけの写しは、秘密鍵を持たない者には proof を作れず使えない
- `DPoP-Nonce` は扱わない
- feature が無効、または DPoP 未設定の下流は結合トークンも bearer として受理する。feature の統合で plugin-jwt の `dpop` だけが有効になり hub の `dpop` が無効のままだと、チャレンジが付かないことがある（拒否は 401 のまま）
- 満杯になってから最初の `register` は、期限切れ項目をまとめて掃除するため約 20 ms ロックを持つ（原本記載の `benches/reports/issue906-jwt-dpop-gate-performance.md`）
- トークン・proof・`jwk`・`jti` をログに出さない。本クレートのエラー型の `Debug` もこれらを含まない
- 追加コストは proof の署名検証が支配的（RS256 で約 13.8 µs、ES256 で約 32.2 µs。計測条件は上記レポート）
- v0.6.0 で追加（crates.io 公開版 0.6.0 で利用可）。設計の詳細は原本記載の `docs/design/jwt-verify-plugin.md` 9 章、受け入れ結果は `docs/acceptance/req16-jwt-verify.md`
- Adapted: 原本の依存例は `version = "..."` だが、本スキルの対象版 0.6.1 を明記した
- 出典: https://fandhe-ai.github.io/fandhe-backend/guides/dpop/

## Related

- [jwt](../plugins/jwt.md)
- [hub-wiring](../plugins/hub-wiring.md)
- [jwt-dpop](../plugins/jwt-dpop.md)
- [jwks-refresh](./jwks-refresh.md)
