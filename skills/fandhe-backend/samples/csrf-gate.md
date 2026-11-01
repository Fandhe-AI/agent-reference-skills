# CsrfGate

`fandhe-backend-plugin-csrf` の `CsrfGate` を builder で構築し、Cookie 認証の画面では CSRF ゲートを認証ゲートより先に登録する例。

```toml
[dependencies]
fandhe-backend-core = "0.6.1"
fandhe-backend-http = "0.6.1"
fandhe-backend-plugin-csrf = "0.6.1"
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_core::extension::{GateContext, GateOutcome, RequestExtensions, RequestGate};
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_plugin_csrf::CsrfGate;

// 認証ゲートの代役（実際は `JwtGate` や利用者独自のゲート）。
struct Auth;
impl RequestGate for Auth {
    fn name(&self) -> &'static str {
        "auth"
    }
    fn check(
        &self,
        _head: &RequestHead,
        _ctx: &GateContext,
        _extensions: &mut RequestExtensions,
    ) -> GateOutcome {
        GateOutcome::Allow
    }
}

fn main() {
    // builder: 許可 Origin と除外パス（完全一致）を指定する
    let gate = CsrfGate::builder()
        .allow_origin("https://app.example.com")
        .exempt_path("/token")
        .build()
        .unwrap();
    let _ = gate;

    // 登録順: CSRF ゲートを先に、認証ゲートをその後に
    let csrf = CsrfGate::builder().allow_origin("https://app.example.com").build().unwrap();
    let _server = Server::new()
        .gate(csrf) // 1. 送信元の検査（安価・副作用なし）
        .gate(Auth); // 2. 資格情報の検査
}
```

## Notes

- 判定規則: `GET` / `HEAD` / `OPTIONS` は無条件許可。それ以外は `Sec-Fetch-Site` が `same-origin` / `none` のときのみ許可し、同ヘッダが無ければ `Origin` が許可リストとバイト完全一致する場合のみ許可する。どちらも無ければ拒否（フェイルクローズ）。拒否は常に同一の 403・本文なし
- 除外パス（`exempt_path`）は完全一致のみ。`/token?x=1` は除外されるが、`/token/`・`/tok%65n` は除外されず検査を受ける
- `allow_origin` はブラウザがシリアライズする形（小文字 scheme・小文字ホスト・既定ポート省略・パスなし）でなければ `build()` が `Err` を返す
- 登録順は許可/拒否の結論には影響しない（複数ゲートは AND 結合）。CSRF を先にすると、送信元検査に落ちた要求が資格情報を評価するゲートの副作用（キャッシュ書き込み・監査等）へ届かない
- Migration (v0.5 → v0.6): `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が追加された。値を入れない自作ゲートは `_extensions` で受ける（`RequestExtensions` は `fandhe_backend_core::extension` から import）
- 出典: https://docs.rs/crate/fandhe-backend-plugin-csrf/0.5.0/source/src/lib.rs
- 出典: https://docs.rs/crate/fandhe-backend-plugin-csrf/0.5.0/source/src/gate.rs
