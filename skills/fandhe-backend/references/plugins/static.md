# static

静的ファイル配信プラグイン。パストラバーサル対策・`spawn_blocking` I/O を備えたディレクトリ配信を提供する（イシュー #318）。

- feature 名: `static`
- crate 名: `fandhe-backend-plugin-static`（crates/plugin-static）
- 配線パターン: パスインターセプト型（`try_intercept`）の `spawn_blocking` ファイル I/O 変種。設定登録型（`Server::static_files(config)` 未登録時はフォールスルー）

## Signature / Usage

`Server::static_files(config)`（コア側 API）へ `StaticFilesConfig` を登録する。未登録時は `static` feature が有効でもフォールスルーする。

```rust,ignore
let config = StaticFilesConfig::builder("/static", "./public").build()?;
```

```rust,ignore
pub async fn try_handle_static(head: &RequestHead, config: &StaticFilesConfig) -> Option<Response>;
```

## Options / Props

`StaticFilesConfig`（`StaticFilesConfig::builder(mount, root)` 経由で構築、`build()` は `Result` を返す。型は `StaticFilesConfig` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `mount`（`builder` 引数） | `String` | —（必須） | マウントプレフィックス（例 `"/static"`） |
| `root`（`builder` 引数） | `PathBuf` | —（必須） | 配信対象ディレクトリ（`build()` 時に `canonicalize`） |
| `max_file_bytes(u64)` | `u64` | `8 * 1024 * 1024`（8 MiB、`DEFAULT_MAX_FILE_BYTES`） | 配信を許可する 1 ファイルあたりの最大バイト数 |
| `mime(ext, content_type)`（v0.2.0 で追加） | `ext: impl Into<String>` / `content_type: &'static str`（拡張子 → Content-Type） | 組み込み MIME テーブル（`html`/`htm`/`css`/`js`/`mjs`/`json`/`map`/`webmanifest`/`xml`/`txt`/`md`/`svg`/`png`/`jpg`/`jpeg`/`gif`/`webp`/`avif`/`ico`/`wasm`/`woff`/`woff2`/`ttf`/`otf`/`pdf`/`mp3`/`wav`/`ogg`/`mp4`/`webm` 等） | 拡張子ごとの Content-Type 上書きを登録する（`.mime("custom", "application/x-custom")` のように呼ぶ）。拡張子は先頭 `.` を除去・小文字化し、重複登録は後勝ち。ヘッダインジェクション対策として Content-Type は `&'static str` に限定 |
| `fallthrough_on_miss(bool)`（v0.2.0 で追加） | `bool` | `false` | `false`: マウント配下で未一致のパスは `404`（フェイルクローズ）。`true`: `None` を返しデフォルトハンドラへ委譲する（`mount = "/"` と動的ルートの共存を可能にする） |

`build()` は `StaticConfigError::InvalidMount(String)` / `RootNotAccessible(io::Error)` / `RootNotADirectory` / `InvalidMimeMapping(String)` を返しうる。`InvalidMimeMapping` は `mime()` の拡張子が空・`.`/`/`/`\`/NUL/制御文字を含む場合、または Content-Type が空・CR/LF・その他制御文字を含む場合（ヘッダインジェクション対策）。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（静的ファイル配信）とは別物
- 二層防御: (1) I/O 前の字句検証（空・`.`・`..`・NUL・`\`・`:`・先頭が `.` のセグメントを拒否、パーセントデコードはしない）、(2) `canonicalize` 後の実パスが正規化済み root 配下であることの検証（シンボリックリンク経由の脱出を拒否）に加え、残余コンポーネントを再検証する `resolved_path_is_safe`
- v0.4.1 セキュリティ修正（イシュー #680）: 字句検証（`is_safe_segment`）が `:` を拒否するようになった。Windows のドライブレター（`C:` 等）が `PathBuf::push` で `root` ごと置き換えるドライブ相対パスへの迂回と、NTFS ADS 構文（`file.txt:hidden:$DATA`）を OS を問わず遮断する。あわせて `canonicalize` 後の実パスを `resolved_path_is_safe`（内部で `is_safe_segment_relaxed`）で再検証し、字句検証をすり抜けた NTFS 8.3 短縮ファイル名エイリアス（`ENV~1` → `.env` 等）や、シンボリックリンク先の実ファイル名に含まれる `:`・先頭 `.` を拒否する。これらは非公開関数で、本番コードに `cfg(unix)` 分岐はなく 3 OS で同一コードパス
- 末尾スラッシュ 1 個は「ディレクトリ要求」として受理し `index.html` を解決する（`/posts/hello/` 形式）。連続スラッシュ `//` は空セグメントとして拒否し、末尾スラッシュ付き要求が通常ファイルに解決された場合は 404。301 リダイレクトによる URL 正規化はスコープ外
- 応答は `Vec<u8>` へ丸ごと読み込むため、`max_file_bytes` が 1 リクエストあたりのメモリ使用量の上限になる
- 既知の限界: `canonicalize` と読み込みの間にシンボリックリンクへ差し替わる TOCTOU の残余リスクがある。大小文字非区別ファイルシステム（NTFS / APFS）では `App.js` が `app.js` を返しうる（パストラバーサル防御とは無関係の OS 差異）
- ファイル未検出・検証失敗・権限エラー・サイズ超過は一律 404（存在オラクルを作らないフェイルクローズ）。ディレクトリリスティングは実装しない
- `canonicalize`・`metadata`・`read` は単一の `tokio::task::spawn_blocking` クロージャ内に閉じる（Tokio ワーカースレッドをブロックしない）
- ディレクトリ解決時は `index.html` を試す（SPA 向けの最小既定）
- `fallthrough_on_miss(true)` は未一致時に `None` を返すのみで、二層防御（字句検証・`canonicalize` 後 root 配下チェック）自体はマウント一致リクエストに対して従来どおり適用される
- 組み込み MIME テーブルに `webmanifest`（`application/manifest+json`）を含む。`mime()` で未登録でも Web App Manifest はテーブルのみで正しい Content-Type が解決される

## Related

- [cors](./cors.md)
- [compression](./compression.md)
- [openapi](./openapi.md)
