# Diagnostics

ライブラリ内部の実行時診断（accept 失敗・TCP_NODELAY 設定失敗・graceful shutdown / rebind の grace 超過強制クローズ）の送信先を利用側で差し替えるための診断シンク。`Diagnostics` trait・`DiagnosticEvent` enum・既定シンク `StderrDiagnostics` から成る（v0.4.2 で追加、イシュー #720）。

## Signature / Usage

```rust
use fandhe_backend_core::{Diagnostics, DiagnosticEvent, StderrDiagnostics};
use fandhe_backend_core::server::Server;

pub trait Diagnostics: Send + Sync + 'static {
    fn report(&self, event: &DiagnosticEvent<'_>);
}

#[non_exhaustive]
pub enum DiagnosticEvent<'a> {
    AcceptFailed { error: &'a io::Error },
    TcpNodelayFailed { error: &'a io::Error },
    ShutdownGraceExceeded { grace: Duration },
    RebindDrainGraceExceeded { grace: Duration },
}

#[derive(Debug, Default, Clone, Copy)]
pub struct StderrDiagnostics;

// Server::diagnostics
pub fn diagnostics(mut self, sink: impl Diagnostics) -> Self
```

```rust
use fandhe_backend_core::{Diagnostics, DiagnosticEvent};
use fandhe_backend_core::server::Server;
use std::sync::mpsc;

// 実運用では `_rx` を別スレッド/タスクで受信し、そこで初めて実際の I/O を行う。
let (tx, _rx) = mpsc::sync_channel::<String>(1024);
let server = Server::new().diagnostics(move |event: &DiagnosticEvent<'_>| {
    // `try_send` は満杯時に待機せず即座に失敗を返す（非ブロッキング）。
    let _ = tx.try_send(event.to_string());
});
```

出力を抑止する場合は no-op クロージャを登録する:

```rust
let server = Server::new().diagnostics(|_event: &DiagnosticEvent<'_>| {});
```

## Options / Props

`DiagnosticEvent` の variant（`Debug` derive、`#[non_exhaustive]`）:

| Name | Type | Description |
|------|------|-------------|
| `AcceptFailed { error }` | `&'a io::Error` | `listener.accept()` が失敗した（`BoundServer::run_until` の主 accept ループ）。バックオフ後に再試行する |
| `TcpNodelayFailed { error }` | `&'a io::Error` | accept 直後のソケットへの TCP_NODELAY 設定が失敗した（`configure_accepted_stream`）。フェイルオープンで接続は継続する |
| `ShutdownGraceExceeded { grace }` | `Duration` | 最終 graceful shutdown（`BoundServer::run_until`）で in-flight 完了待ちが `grace` を超過し、残存接続を強制クローズする。`grace` は `Server::shutdown_grace_period` の値 |
| `RebindDrainGraceExceeded { grace }` | `Duration` | rebind（`RebindHandle::rebind`）による旧世代接続の drain が `grace` を超過し、残存接続を強制クローズする。`grace` は `Server::shutdown_grace_period` の値 |

その他の公開アイテム:

| Name | Type | Description |
|------|------|-------------|
| `Diagnostics::report(&self, event)` | `&DiagnosticEvent<'_>` | 1 件の診断イベントを受け取る同期メソッド |
| `StderrDiagnostics` | `struct`（`Debug, Default, Clone, Copy`） | 既定シンク。現行の `eprintln!` 出力と完全互換（文言・接頭辞・出力先が一致）。`report` は同期 `eprintln!` を実行する |
| `impl<F> Diagnostics for F` | `F: Fn(&DiagnosticEvent<'_>) + Send + Sync + 'static` | クロージャをそのままシンクとして登録できる blanket impl |
| `Server::diagnostics(sink)` | `impl Diagnostics -> Self` | シンクを差し替える。複数回呼ぶと最後の登録が有効（置き換え式、単一シンクのみ保持）。未登録時の既定は `StderrDiagnostics` |
| `DiagnosticEvent` の `Display` | `fmt::Display` | 接頭辞（`fandhe_backend_core::server: `）を含まない本文を返す。接頭辞は `StderrDiagnostics` のみが付与する |

## Notes

- 出典: https://docs.rs/crate/fandhe-backend-core/0.4.2/source/src/diagnostics.rs
- `report` はブロッキング I/O を行ってはならない。accept ループ・rebind の背景 drain タスク上で同期的に呼ばれる（dyn 互換のため同期 API、`Middleware` と同じ規約）。I/O が必要な実装は非同期チャネルへの送信に留め、実際の I/O は別タスクで行う
- `report` は panic してはならない。コア側は `std::panic::catch_unwind` で境界を守るが、`panic = "abort"` ビルドでは捕捉できず、フェイルクローズの保証にはならない
- 既定シンク `StderrDiagnostics` は上記の非ブロッキング契約の対象外（後方互換のための意図的な例外）。`DiagnosticEvent` の 4 種はいずれも accept 失敗・grace 超過等の低頻度なエラー・シャットダウン経路限定のイベントで、per-request のホットパスではない
- stderr が詰まると `eprintln!` がブロックしうる。`AcceptFailed` は次回 accept 再試行が遅延、`TcpNodelayFailed` は該当 1 接続の処理が遅延する。`ShutdownGraceExceeded` / `RebindDrainGraceExceeded` は強制クローズの完了を確定させた後に通知するため、詰まっても強制クローズ自体は妨げられない。ただし `ShutdownGraceExceeded` は通知の完了を最大 200ms だけ待って `run_until` から返るため、その後すぐプロセスが終了すると通知が失われうる
- 緩和策は有界チャネルへ `try_send` して別スレッド/タスクが書き込む非ブロッキングシンクの登録（`tracing-appender` の non-blocking writer への転送も有効）
- `Server::diagnostics` を一度でも呼ぶと「既定シンク」扱いから外れる。`StderrDiagnostics` を明示的に再登録した場合も同様で、`ShutdownGraceExceeded` 通知は「有界時間だけ待って fire-and-forget へフォールバック」する経路になる
- クロージャで登録する場合、引数の型注釈（`|_event: &DiagnosticEvent<'_>|`）は必須。`|_| {}` のみでは HRTB が絡み型推論に失敗する
- `DiagnosticEvent` が運搬する値は `io::Error` と `Duration` のみ。peer address・リクエスト内容・ヘッダ等は現在も将来も含めない方針
- `tracing` / `log` への外部依存は持たない（新規依存ゼロ、feature ゲート不要）。`tracing::warn!` 等へ転送するシンクを利用側で実装することで連携できる
- この診断シンクは Rust 製 `fandhe-backend` 固有の API であり、`pino` や Fastify の logger とは別物

## Related

- [Server](./server.md)
- [BoundServer](./bound-server.md)
- [RebindHandle](./rebind-handle.md)
- [Middleware](./middleware.md)
