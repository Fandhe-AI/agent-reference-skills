# JwtGate

`fandhe-backend-plugin-jwt` の `JwtPolicy` で検証ポリシーを定義し、`JwtAuthenticator` から `JwtGate` を作る例。ハンドラ用に認証器を clone し、未知 `kid` の通知フックも設定できる。

```toml
[dependencies]
fandhe-backend-core = "0.5.0"
fandhe-backend-plugin-jwt = "0.5.0"
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

- `JwtPolicy::new(issuer, audiences, allowed_algorithms, token_type)` は 4 引数。0.5.0 では hub-wiring の `TenantGateConfig::new` / `from_jwks_json` も `JwtPolicy` を必須引数に取る
- `JwtGate::check` は同期・I/O なし。拒否は 401（本文は固定の `{"error":"invalid_token"}`、トークン・`kid`・失敗理由は反映しない）。クレームは `GateOutcome` に載せられないため、ハンドラは `JwtGate::authenticator()` または `Server::gate` へ渡す前に clone した認証器から得る
- `JwtAuthenticator` の `Clone` は `Arc` 共有で、署名検証結果のキャッシュも共有される
- Cookie 認証の画面では CSRF ゲートを JWT ゲートより先に登録する（[csrf-gate.md](./csrf-gate.md) 参照）
