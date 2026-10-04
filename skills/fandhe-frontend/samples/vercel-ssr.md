# Request-time SSR on Vercel Container Images

`fandhe-frontend-dist-server` の `route_request` を hyper でラップし、`PORT` 環境変数による bind 先解決と GET / HEAD 限定の応答を行う。Vercel Container Images 上でリクエスト時 SSR を実行する。

```rust
use fandhe_frontend_dist_server::routes::route_request;
use http_body_util::Full;
use hyper::body::Bytes;
use hyper::{Method, Response};

const DEFAULT_BIND_ADDR: &str = "127.0.0.1:3100";

#[derive(Debug, PartialEq, Eq)]
enum BindAddrError {
    InvalidPort,
}

fn non_empty(value: Option<&str>) -> Option<&str> {
    value.filter(|value| !value.is_empty())
}

fn resolve_bind_addr(bind_addr: Option<&str>, port: Option<&str>) -> Result<String, BindAddrError> {
    if let Some(bind_addr) = non_empty(bind_addr) {
        return Ok(bind_addr.to_string());
    }

    match non_empty(port) {
        Some(port) => match port.parse::<u16>() {
            Ok(0) | Err(_) => Err(BindAddrError::InvalidPort),
            Ok(port) => Ok(format!("0.0.0.0:{port}")),
        },
        None => Ok(DEFAULT_BIND_ADDR.to_string()),
    }
}

fn response_for(method: &Method, path: &str) -> Response<Full<Bytes>> {
    if method != Method::GET && method != Method::HEAD {
        return Response::builder()
            .status(405)
            .header(hyper::header::CONTENT_TYPE, "text/plain; charset=utf-8")
            .header(hyper::header::ALLOW, "GET, HEAD")
            .body(Full::new(Bytes::from_static(b"405 Method Not Allowed")))
            .unwrap_or_else(|_| fallback_500());
    }

    let route_response = route_request(path);

    let mut builder = Response::builder().status(route_response.status);
    if let Some(headers) = builder.headers_mut() {
        headers.insert(
            hyper::header::CONTENT_TYPE,
            hyper::header::HeaderValue::from_static(route_response.content_type),
        );
        if let Some(cache_control) = route_response.cache_control {
            headers.insert(
                hyper::header::CACHE_CONTROL,
                hyper::header::HeaderValue::from_static(cache_control),
            );
        }
    }

    builder
        .body(Full::new(Bytes::from(route_response.body)))
        .unwrap_or_else(|_| fallback_500())
}

fn fallback_500() -> Response<Full<Bytes>> {
    Response::builder()
        .status(500)
        .body(Full::new(Bytes::from_static(b"500 Internal Server Error")))
        .expect("fallback response with fixed, valid status/body must build")
}
```

```toml
[dependencies]
fandhe-frontend-dist-server = "0.3.4"
hyper = { version = "1", default-features = false, features = ["http1", "server"] }
hyper-util = { version = "0.1", default-features = false, features = ["http1", "server", "tokio", "server-graceful"] }
http-body-util = { version = "0.1", default-features = false }
tokio = { version = "1", default-features = false, features = ["rt-multi-thread", "net", "signal", "time"] }
```

```bash
vercel link
vercel deploy
vercel deploy --prod
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/examples/vercel-ssr/
- 出典は公式 `examples/vercel-ssr`。公式の `src/main.rs` は上記に加え、`SIGTERM` / `SIGINT` 受信後に listener を drop し、`hyper_util::server::graceful::GracefulShutdown` で処理中の接続を最大 `DRAIN_TIMEOUT_SECS`（25 秒、Vercel の 30 秒猶予より短い）まで待つ graceful shutdown（`ShutdownSignals` / `drain_within`）と accept ループを持つ。ここでは bind 先解決とレスポンス組み立てのみ抜粋。
- bind 先の優先順位は `FANDHE_FRONTEND_BIND_ADDR` > `PORT`（`0.0.0.0:$PORT`）> 既定 `127.0.0.1:3100`。`FANDHE_FRONTEND_BIND_ADDR` が設定されていれば `PORT` は検証されない。`PORT` が `1..=65535` 以外なら起動失敗（fail-closed）。
- Vercel のプロジェクト環境変数 `PORT` に 1024 以上（例 `3100`）の設定が必須。`Dockerfile.vercel` は非 root（`USER 65532:65532`）で実行するため 1024 未満（Container Images 既定の `80`）へ bind できない。`Dockerfile.vercel` が `FANDHE_FRONTEND_BIND_ADDR` を設定しないのは、`PORT` より優先されて Vercel の上書きが効かなくなるため。
- crates.io の外部依存では `/static/*` と WASM が出荷されず、`/static/*` は常に 404。Container Images は Beta 機能（チームで有効化が必要な場合あり）。`vercel deploy` が `Dockerfile.vercel` を自動検出してビルドするため `--prebuilt` は付けない（静的配置は `vercel-ssg`）。Vercel 実機でのデプロイ確認は公式側でも未実施。
