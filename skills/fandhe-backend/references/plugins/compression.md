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

## Options / Props

`CompressionConfig`（`CompressionConfig::builder()` 経由で構築、infallible。型は `CompressionConfig`/`CompressionConfigBuilder` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `min_size(usize)` | `usize` | `1024`（`DEFAULT_MIN_SIZE`） | 圧縮対象とする body の最小バイト数 |
| `compressible_types(Vec<String>)` | `Vec<String>` | `["text/", "application/json", "application/javascript", "application/xml", "application/xhtml+xml", "image/svg+xml"]`（`DEFAULT_COMPRESSIBLE_TYPES`） | 圧縮対象 `Content-Type` パターンを丸ごと差し替え |
| `add_compressible_type(content_type)` | `String`（`compressible_types: Vec<String>` へ追加） | — | 圧縮対象 `Content-Type` パターンを 1 件追加（既定リストへの追記） |

圧縮は以下をすべて満たす場合のみ行う（フェイルセーフ、判定不能・条件不足は常に無圧縮側へ倒す）: ステータスが 2xx かつ 204 以外／実効 `Content-Type` が対象リストに一致／body 長が閾値以上／`Accept-Encoding` が gzip を受理／`Content-Encoding` 未設定（二重圧縮防止）。条件 3・4 を満たした時点で圧縮成否に関わらず `Vary: Accept-Encoding` を付与する。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（圧縮ミドルウェア）とは別物
- `matches_content_type(content_type)`（v0.2.0 で公開）: `;` 以降のパラメータ（`; charset=utf-8` 等）を無視し type/subtype 部分のみを大文字小文字無視で比較する。登録パターンが末尾 `/` の場合は type プレフィックス一致、それ以外は完全一致
- BREACH 類似の情報漏洩リスク（TLS 上の圧縮応答で秘密情報と攻撃者制御入力が混在する場合）は opt-in 設計と `compressible_types` / `min_size` の調整で緩和する。完全な解消はできない
- `flate2` は `default-features = false` + `rust_backend`（miniz_oxide）に固定し C 実装（zlib）へのリンクを排除する
- gzip 圧縮は同期 CPU 処理であり「同期ブロッキング I/O 禁止」規約の対象外（I/O 待ちが発生しないため）

## Related

- [cors](./cors.md)
- [static](./static.md)
