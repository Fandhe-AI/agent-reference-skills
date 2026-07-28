# Download Trigger

単一の `a[download]` アナトミーパートとして実装された、宣言的で JS 不要なダウンロードトリガー。ark-ui/chakra-ui の JS 主導・Blob ベースのトリガーとは異なる。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::download_trigger;

download_trigger::root("/assets/report.pdf", Some("report.pdf"), vec![], vec![/* text("Download") */]);
```

`download_trigger::root(href: &str, file_name: Option<&str>, attrs, children) -> Node`

## Anatomy

- `root` — 唯一のパート、`<a href="..." download="...">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `href` | `&str` | 事前解決済みの配信 URL（呼び出し側が事前に解決する。`Blob`/非同期データ解決は行わない） |
| `file_name` | `Option<&str>` | `Some(name)` → `download="<name>"`。`None` → `download=""`（元のファイル名を使用） |

## Notes

- `data`/`mimeType` プロパティは持たない（ark-ui/chakra-ui とは異なる）。Blob 生成は設計上対象外（静的 HTML ファーストのセキュリティポリシー）
- 危険な URL スキーム（`javascript:`, `data:`, `blob:`, `vbscript:`）はコアの `render()` にある URL スキームのアローリストによってフェイルクローズで拒否され、`href` 属性ごと省略される
- 仕様上、`download` はクロスオリジンの `href` に対してはブラウザに無視される（同一オリジン/`blob:`/`data:` のみ有効）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）
