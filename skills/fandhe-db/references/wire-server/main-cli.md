---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/main.rs
---

# main (CLI)

`wire-server` バイナリのエントリポイント。クライアント接続の受け付け・wire プロトコルのパース/応答整形を担い、クエリの実処理は `engine` crate へ委譲する。CLI 引数は clap ではなく `main()` 内の手書きループでパースする（すべて非公開関数。ライブラリ crate の `pub` API ではない）。

## Signature / Usage

~~~bash
wire-server --users <path> --db <path> [--bind <addr:port>]
  [--planner-endpoint <host:port> --planner-model <name>]
  [--embedder-hashing-dim <N>]
  [--search-engine default|hnsw|hnsw_f16|hnsw_i8]
  [--hnsw-full-scan-ratio <num>/<den>]
  [--hnsw-acorn-max-visible-ratio <num>/<den>]
  [--hnsw-sparse-visited-max <N>]

# 補助コマンド: ユーザーストア登録行の生成（stdin からパスワードを読む）
wire-server hash-password
~~~

~~~rust,ignore
const DEFAULT_BIND: &str = "127.0.0.1:5432";

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().collect();
    if args.get(1).map(String::as_str) == Some("hash-password") {
        return run_hash_password();
    }
    run_server(&args)
}

/// `wire-server --users <path> --db <path> [--bind <addr:port>]`。
fn run_server(args: &[String]) -> ExitCode

/// `--planner-endpoint <host:port>`／`--planner-model <name>` から
/// `engine::query_planner::OllamaClient` を構築する（TASK-117・PLAN-9）。
fn build_query_planner(
    endpoint: &str,
    model: &str,
) -> Result<Box<dyn engine::query_planner::LlmClient>, String>

/// `--embedder-hashing-dim <N>` から `engine::embedding::HashingEmbedder`
/// （検証用の決定的参照実装。意味的埋め込みではない）を構築する（TASK-117・PLAN-9）。
fn build_hashing_embedder(raw_dim: &str) -> Result<Box<dyn engine::embedding::Embedder>, String>

/// `--search-engine` の値（未指定は `None`）と `--hnsw-*` 探索パラメータの
/// 未パース値（Issue #657）から `EngineCore::open_with_engine` へ渡す
/// `SearchEngineKind` を解決する（Issue #656・#657）。
fn resolve_search_engine(
    raw: Option<&str>,
    tuning_raw: &RawHnswTuning<'_>,
) -> Result<Option<engine::search_engine::SearchEngineKind>, String>

/// `hash-password` サブコマンド: stdin からパスワードを 1 行読み、新規 salt を
/// 生成して PHC 文字列を stdout へ出力する。パスワードを引数・ログに残さない。
fn run_hash_password() -> ExitCode
~~~

## Options / Props

| Flag | 必須 | Description |
|------|------|-------------|
| `--users` | 必須 | ユーザーストアのパス。省略すると `fail-closed: no anonymous login` で起動拒否 |
| `--db` | 必須 | redb ファイルのパス。省略すると `fail-closed: no implicit anonymous/volatile database` で起動拒否 |
| `--bind` | 任意 | 待受アドレス。既定値 `127.0.0.1:5432`（`DEFAULT_BIND`） |
| `--search-engine` | 任意 | `default` / `hnsw` / `hnsw_f16` / `hnsw_i8`（Issue #656）。2 回目以降の指定は fail-closed で拒否（他フラグの last-wins とは方針が異なる）。詳細は [search-engine-opt.md](./search-engine-opt.md) |
| `--hnsw-full-scan-ratio` | 任意 | `<num>/<den>` 形式。`--search-engine` が `hnsw`/`hnsw_f16`/`hnsw_i8` の場合のみ有効。重複指定は fail-closed で拒否 |
| `--hnsw-acorn-max-visible-ratio` | 任意 | `<num>/<den>` 形式。同上 |
| `--hnsw-sparse-visited-max` | 任意 | 非負整数。同上 |
| `--planner-endpoint` | 任意 | `--planner-model` と両方指定して初めて `engine::query_planner::OllamaClient` を構築（片方のみは起動エラー） |
| `--planner-model` | 任意 | 同上。空文字・制御文字混入・256 バイト超は起動時に fail-closed で拒否 |
| `--embedder-hashing-dim` | 任意 | ハッシュ embedding の次元数（`u32`）。`engine::embedding::HashingEmbedder`（決定的・ネットワーク不要な検証用参照実装であり意味的埋め込みではない）を注入 |
| `hash-password`（サブコマンド） | - | 第一引数が `hash-password` の場合のみ発火。stdin から 1 行読み、`auth::generate_salt` で新規 salt を生成し PHC 文字列を stdout へ出力する |

## Notes

- `--users` と `--db` は必須。省略した場合は匿名デフォルトを作らず起動拒否とする（fail-closed）。
- `--bind` 未指定時は `127.0.0.1:5432` にバインドする。psql・psycopg・node pg はクライアント側の変更なしに cleartext password 認証で接続できる。
- `run_server` は起動直後に `engine::recovery::panic_hook::install_panic_hook()`（TASK-97・RECOVER-6）→ `engine::recovery::fail_fast::install()`（TASK-99・RECOVER-8）の順で導入する。この順序は固定契約（`fail_fast::install` が捕捉した直前のフックを先に呼んでから abort するため、逆順にすると緊急応答が退行する）。
- `search_engine_kind` が `None`（未指定/`default`）の場合は `EngineCore::open` を、`Some(kind)` の場合のみ `EngineCore::open_with_engine` を呼ぶ（エラー型・メッセージまで既存経路とビット同一に保つ設計判断。`open_with_engine(default_kind())` へは委譲しない）。
- 終了コードは `ExitCode::SUCCESS` / `ExitCode::FAILURE` のみ。
- `main()` 自体・`run_server`・`build_query_planner`・`build_hashing_embedder`・`resolve_search_engine`・`run_hash_password` はいずれも `pub` ではない（bin crate 内の非公開関数）。
- This is a PostgreSQL wire protocol v3 server binary — distinct from `fandhe-backend`（同 org の別ライブラリ、汎用 Rust HTTP サーバーフレームワーク）や `fastify` / `hono` / `go-echo`（HTTP フレームワーク）。ここでの "server" は Postgres wire protocol の実装であり、HTTP サーバーではない。

## Related

- [search-engine-opt.md](./search-engine-opt.md)
- [server.md](./server.md)
- [auth.md](./auth.md)
