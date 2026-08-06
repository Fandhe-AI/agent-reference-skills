# compression

レスポンス圧縮プラグイン。gzip による帯域削減を提供する（イシュー #321）。

- feature 名: `compression`
- crate 名: `fandhe-backend-plugin-compression`（crates/plugin-compression）
- 配線パターン: レスポンス後処理型（`crate::plugin::finalize_response`）の第 2 インスタンス。CORS の後（CORS → 圧縮の順で固定）に適用される

## Signature / Usage

コア側の `Server::compression(config)` に `CompressionConfig` を登録した場合のみ、`finalize_response` シーム経由で `apply_compression` が実リクエストへ圧縮を適用する。未登録時は `compression` feature が有効でも無効化される（opt-in）。

```rust,ignore
pub fn accepts_gzip(head: &RequestHead) -> bool;

pub fn apply_compression(
    head: &RequestHead,
    config: &CompressionConfig,
    response: Response,
) -> Response;

impl CompressionConfig {
    pub fn matches_content_type(&self, content_type: &str) -> bool;
}
```

v0.3.0（issue #468）で `apply_compression` の内部処理を分割公開。`apply_compression` 自体は存続・シグネチャ変更なし。

```rust,ignore
pub fn plan_compression(
    head: &RequestHead,
    config: &CompressionConfig,
    response: Response,
) -> CompressionPlan;

pub fn compress_body(data: &[u8]) -> Vec<u8>;

pub fn attach_compressed(response: Response, compressed: Vec<u8>) -> Response;

pub enum CompressionPlan {
    Skip(Response),
    Compress(Response),
}
```

ストリーミング圧縮（v0.3.0、opt-in）:

```rust,ignore
pub struct StreamingGzipEncoder { /* ... */ }

impl StreamingGzipEncoder {
    pub fn encode_chunk(&mut self, data: &[u8]) -> std::io::Result<Vec<u8>>;
    pub fn finish(self) -> std::io::Result<Vec<u8>>;
}

pub fn begin_streaming_compression(
    head: &RequestHead,
    config: &CompressionConfig,
    response: Response,
) -> (Response, Option<StreamingGzipEncoder>);
```

## Options / Props

`CompressionConfig`（`CompressionConfig::builder()` 経由で構築、infallible。型は `CompressionConfig`/`CompressionConfigBuilder` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `min_size(usize)` | `usize` | `1024`（`DEFAULT_MIN_SIZE`） | 圧縮対象とする body の最小バイト数 |
| `compressible_types(Vec<String>)` | `Vec<String>` | `["text/", "application/json", "application/javascript", "application/xml", "application/xhtml+xml", "image/svg+xml"]`（`DEFAULT_COMPRESSIBLE_TYPES`） | 圧縮対象 `Content-Type` パターンを丸ごと差し替え |
| `add_compressible_type(content_type)` | `String`（`compressible_types: Vec<String>` へ追加） | — | 圧縮対象 `Content-Type` パターンを 1 件追加（既定リストへの追記） |
| `blocking_threshold(usize)` | `usize` | `65536`（64 KiB、v0.3.0 追加、issue #468） | body 長がこの値以上のとき `compress_body` の実行先を `tokio::task::spawn_blocking` へオフロードする閾値。getter `CompressionConfig::blocking_threshold()` あり |
| `compress_streaming(bool)` | `bool` | `false`（opt-in、v0.3.0 追加、issue #461） | チャンク単位のストリーミング gzip 圧縮を有効化する。`Handler::handle_streaming`（chunked レスポンス）のみに作用し、`apply_compression` 経由の通常レスポンスには影響しない。getter `CompressionConfig::compress_streaming()` あり |

圧縮は以下をすべて満たす場合のみ行う（フェイルセーフ、判定不能・条件不足は常に無圧縮側へ倒す）: ステータスが 2xx かつ 204 以外／実効 `Content-Type` が対象リストに一致／body 長が閾値以上／`Accept-Encoding` が gzip を受理／`Content-Encoding` 未設定（二重圧縮防止）。条件 3・4 を満たした時点で圧縮成否に関わらず `Vary: Accept-Encoding` を付与する。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（圧縮ミドルウェア）とは別物
- `matches_content_type(content_type)`（v0.2.0 で公開）: `;` 以降のパラメータ（`; charset=utf-8` 等）を無視し type/subtype 部分のみを大文字小文字無視で比較する。登録パターンが末尾 `/` の場合は type プレフィックス一致、それ以外は完全一致
- v0.3.0（issue #468）: `apply_compression` は内部的に `plan_compression`（適用可否判定 → `CompressionPlan::Skip`/`Compress`）→ `compress_body`（gzip 圧縮の実行）→ `attach_compressed`（圧縮結果をレスポンスへ付与）の 3 段に分割公開された。`blocking_threshold`（既定 64 KiB）以上の body では `compress_body` の実行先が `tokio::task::spawn_blocking` へオフロードされる。CPU 負荷の高い `compress_body` だけを別タスクへ切り出したい呼び出し側は、この 3 関数を個別に呼び出せる
- v0.3.0（issue #461）: `compress_streaming(true)` は `Handler::handle_streaming`（chunked レスポンス）にのみ作用し、`begin_streaming_compression` が body 全体をバッファせず `StreamingGzipEncoder` を返す。`encode_chunk` はチャンクごとに即時 flush して圧縮データを返し、`finish` で末尾を確定する。`apply_compression` 経由の通常（非ストリーミング）レスポンスには影響しない
- BREACH 類似の情報漏洩リスク（TLS 上の圧縮応答で秘密情報と攻撃者制御入力が混在する場合）は opt-in 設計と `compressible_types` / `min_size` の調整で緩和する。完全な解消はできない
- `flate2` は `default-features = false` + `rust_backend`（miniz_oxide）に固定し C 実装（zlib）へのリンクを排除する
- gzip 圧縮は同期 CPU 処理であり「同期ブロッキング I/O 禁止」規約の対象外（I/O 待ちが発生しないため）

## Related

- [cors](./cors.md)
- [static](./static.md)
