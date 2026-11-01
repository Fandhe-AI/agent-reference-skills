# JwtGate

`fandhe-backend-plugin-jwt` の `JwtPolicy` で検証ポリシーを定義し、`JwtAuthenticator` から `JwtGate` を作る例。ハンドラ用に認証器を clone し、未知 `kid` の通知フックも設定できる。

```toml
[dependencies]
fandhe-backend-core = "0.6.1"
fandhe-backend-plugin-jwt = "0.6.1"
```

```rust
use fandhe_backend_core::extension::RequestGate;
use fandhe_backend_plugin_jwt::*;

fn main() -> Result<(), PolicyError> {
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
    let _ = handler_side;
    Ok(())
}
```

未知 `kid` の通知フック（`unknown_key_notifier`）を付ける場合:

```rust
use fandhe_backend_plugin_jwt::*;

fn main() -> Result<(), PolicyError> {
    let policy = JwtPolicy::new(
        Issuer::new("https://issuer.example")?,
        Audiences::single("api")?,
        AllowedAlgorithms::only(Algorithm::Es256),
        TokenType::AccessToken,
    );
    let auth = JwtAuthenticator::<NoExtraClaims>::builder(SharedKeySet::new(KeySet::empty()), policy)
        .unknown_key_notifier(|e: &UnknownKeyEvent<'_>| { let _ = e.kid(); })
        .build();
    assert_eq!(auth.cache_hits(), 0);
    Ok(())
}
```

## Notes

- `JwtPolicy::new(issuer, audiences, allowed_algorithms, token_type)` は 4 引数。0.5.0 以降、hub-wiring の `TenantGateConfig::new` / `from_jwks_json` も `JwtPolicy` を必須引数に取る
- v0.6.1: `JwtGate::check` は検証成功時に検証済み `Claims` を `GateVerified<E>` として `RequestExtensions` へ入れる。ハンドラは `JwtGate::<E>::verified(head: &RequestHead) -> Result<&Claims<E>, NotAdmitted>` で読み、検証を繰り返さない。ゲートを通っていない要求は `NotAdmitted`（フェイルクローズ）。`E` は登録したゲートの追加クレーム型と同じにすること（違うと `NotAdmitted`）
- `JwtGate::check` は同期・I/O なし。拒否は 401（本文は固定の `{"error":"invalid_token"}`、トークン・`kid`・失敗理由は反映しない）。v0.5 まではクレームをゲートから渡せず、ハンドラは `JwtGate::authenticator()` または `Server::gate` へ渡す前に clone した認証器から得ていた
- Migration (v0.5 → v0.6): `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が追加された。`JwtGate` 自体の構築 API は変わらない
- `JwtAuthenticator` の `Clone` は `Arc` 共有で、署名検証結果のキャッシュも共有される
- `JwtGate` は `Authorization: Bearer` のみを検査し Cookie は見ない。Cookie だけで認証する画面に `JwtGate` を登録すると正当な要求も 401 になるため、Cookie 認証の画面では `CsrfGate` の後に Cookie セッションを検証する独自ゲートを登録する（[csrf-gate.md](./csrf-gate.md) 参照）
- `JwtGate` と `CsrfGate` を併用するのは、要求が Bearer 資格情報も送る場合に限る。その場合も CSRF ゲートを先に登録する。ゲートにはパス単位の使い分けが無い
- 出典: https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/gate.rs
- 出典: https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/auth.rs
