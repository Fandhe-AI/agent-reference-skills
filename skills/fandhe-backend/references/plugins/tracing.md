# tracing

可観測性（サンプリング付きトレーシング）プラグイン（TASK-10.1）。REQ-10 の PoC-10 実測（サンプリングなし構成で RPS 劣化 31.6%・p95 悪化 61.7%）を踏まえ、`Middleware` 拡張点上で一定割合のみ span/event を記録する。

- feature 名: `tracing`
- crate 名: `fandhe-backend-plugin-tracing`（crates/plugin-tracing）
- 配線パターン: Middleware 型（`TracingMiddleware` アダプタがコア側 `crates/core/src/server.rs` に存在、`Middleware` trait 上の実装）

## Signature / Usage

`Server::tracing(config)`（コア側 API、`tracing` feature 限定）へ `TracingConfig` を渡すと、コア既存の `middlewares: Vec<Box<dyn Middleware>>` へ `TracingMiddleware` が push される。ログ出力の初期化は `init_tracing` を利用側が呼ぶ。

```rust,ignore
let _guard = fandhe_backend_plugin_tracing::init_tracing(TracingOutput::Stdout);
// _guard はプロセス終了までスコープを保持し続ける
```

```rust,ignore
pub fn init_tracing(output: TracingOutput) -> WorkerGuard;

impl TracingLayer {
    pub fn new(config: &TracingConfig) -> Self;
    pub fn record_response(&self, head: &RequestHead, elapsed: Duration);
}

// v0.2.0 で公開
impl Sampler {
    pub const fn new(interval: NonZeroU64) -> Self;
    pub fn should_sample(&self) -> bool;
}
```

## Options / Props

`TracingConfig`（型は `TracingConfig` の `pub` フィールドに対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `sample_interval` | `NonZeroU64` | `100`（`DEFAULT_SAMPLE_INTERVAL`、100 リクエストに 1 回記録） | サンプリング間隔。`1` で全件記録 |
| `exclude_paths` | `Vec<String>`（`exclude_path(path)` で追記） | 空（全パスがサンプリング対象） | 記録対象から除外するパスの集合（クエリ文字列除去後のパスと完全一致で照合） |

`exclude_paths` はクエリ文字列除去後のパスと完全一致（バイト単位、プレフィックス一致・glob 非対応）で照合し、サンプラーのカウンタ消費より前に判定される。

`TracingOutput`（`init_tracing` の引数）: `Stdout`（既定、唯一の選択肢。ファイル出力はスコープ外）。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（トレーシングミドルウェア）とは別物
- 記録フィールドは `method`・`path`・`elapsed_ms` の 3 つに限定。ヘッダ値（`Authorization`/`Cookie` 等）・ボディ・クエリ文字列は一切記録しない。`path` はクエリ文字列（`?` 以降）を必ず除去してから記録する
- `init_tracing` の戻り値 `WorkerGuard` はプロセス終了までスコープを保持すること。drop すると非同期 writer のフラッシュスレッドが停止し以降のログが失われる
- 非同期・バッファ済み writer は lossy（バックプレッシャ時にイベントを黙って破棄する）。欠落を許容できないログには不向き
- 記録は応答時の 1 イベントに統合済み（TASK-10.2、span は生成しない）
- `Sampler`（v0.2.0 で `pub` 公開）: `interval` 回に 1 回だけ `true` を返す単体のサンプリングカウンタ（`AtomicU64` の `fetch_add` で原子的に判定、複数スレッドから同時呼び出し可）。`TracingLayer` 内部の実装をそのまま外部から再利用したい場合に使う

## Related

- [cors](./cors.md)
- [hub-wiring](./hub-wiring.md)
