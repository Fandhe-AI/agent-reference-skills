---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/main.rs
---

# main (CLI)

`wire-server` バイナリのエントリポイント。クライアント接続の受け付け・wire プロトコルのパース/応答整形を担い、クエリの実処理は `engine` crate へ委譲する。CLI 引数は clap ではなく `main()` 内の手書きループでパースする（すべて非公開関数。ライブラリ crate の `pub` API ではない）。

## Signature / Usage

~~~bash
wire-server --users <path> --db <path> [--bind <addr:port>] [--surface sql|nosql]
  [--planner-endpoint <host:port> --planner-model <name>]
  [--embedder-hashing-dim <N>]
  [--search-engine default|hnsw|hnsw_f16|hnsw_i8]
  [--hnsw-full-scan-ratio <num>/<den>]
  [--hnsw-acorn-max-visible-ratio <num>/<den>]
  [--hnsw-sparse-visited-max <N>]
  [--hnsw-scope all|declared]
  [--durability immediate|none]
  [--max-dml-affected-rows <1-1000000>] [--max-insert-rows <1-1000000>]
  [--batch-max-files <1-1000000>]
  [--partitioned-dml-chunk-rows <1-1000000>] [--partitioned-dml-scan-budget <1-1000000>]
  [--partitioned-dml-max-hold-ms <100-5000>]
  [--partitioned-dml-max-jobs-per-tenant <1-64>] [--partitioned-dml-max-jobs <1-64>]
  [--partitioned-dml-max-interrupted-records <1-1000000>]
  [--ddl-allowed-users <user1>[,<user2>...]]
  [--auth-method cleartext|scram-sha-256] [--scram-mock-key-file <path>]
  [--tls-cert <pem> --tls-key <pem> [--tls-mode require|allow]
   [--tls-scram-channel-binding enable|disable]]
  [--fault-inject post-commit-panic]   # feature `fault-injection` 有効ビルドのみ

# 補助コマンド: ユーザーストア登録行の生成（stdin からパスワードを読む）
wire-server hash-password [--with-scram-sha-256]
~~~

~~~rust,ignore
const DEFAULT_BIND: &str = "127.0.0.1:5432";

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().collect();
    if args.get(1).map(String::as_str) == Some("hash-password") {
        return run_hash_password(&args[2..]);
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

/// `--surface` の値（未指定は `None`）から `wire_server::surface::Surface` を解決する（Issue #734）。
/// 未指定は既定 `Surface::Sql`、語彙外は `Err`（fail-closed）。
fn resolve_surface(raw: Option<&str>) -> Result<wire_server::surface::Surface, String>

/// `--durability` の値から `engine::storage::WriteDurability` を解決する（Issue #850）。
/// 未指定は既定（`Immediate`）、語彙外は `Err`（fail-closed）。
fn resolve_durability(raw: Option<&str>) -> Result<engine::storage::WriteDurability, String>

/// `--hnsw-scope` の値から `engine::search_engine::HnswScope` を解決する（Issue #1065）。
/// 未指定は既定（`All`）、語彙外は `Err`（fail-closed）。
fn resolve_hnsw_scope(raw: Option<&str>) -> Result<engine::search_engine::HnswScope, String>

/// `--auth-method` の値から `wire_server::auth::AuthMethod` を解決する（Issue #940・WIRE-18・TASK-222）。
/// 未指定は既定（`Cleartext`）、語彙外は `Err`（fail-closed）。
fn resolve_auth_method(raw: Option<&str>) -> Result<wire_server::auth::AuthMethod, String>

/// `--tls-cert`／`--tls-key`／`--tls-mode`／`--tls-scram-channel-binding` の未パース値を解決する（Issue #967・#970）。
fn resolve_tls_options(
    cert: Option<&std::path::Path>,
    key: Option<&std::path::Path>,
    mode_raw: Option<&str>,
    scram_channel_binding_raw: Option<&str>,
) -> Result<Option<(PathBuf, PathBuf, wire_server::tls_opt::TlsMode, bool)>, String>

/// `durability`・`search_engine_kind` の組合せから `EngineCore` を構築する choke point（Issue #850）。
fn open_engine_core(
    db_path: &std::path::Path,
    durability: engine::storage::WriteDurability,
    search_engine_kind: Option<engine::search_engine::SearchEngineKind>,
) -> Result<engine::core::EngineCore, String>

/// `hash-password [--with-scram-sha-256]` サブコマンド。既定は PHC 文字列のみを出力する。
/// `--with-scram-sha-256` 付きは `phc:scram_verifier` を出力する。未知の追加引数は fail-closed に拒否する。
fn run_hash_password(args: &[String]) -> ExitCode
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
| `--surface` | 任意 | `sql`（既定）/ `nosql`。クエリインターフェースを SQL wire と HTTP/1.1 NoSQL 表層の 2 択で排他選択（Issue #734・#735）。不正値・値欠落・2 回目以降の指定は fail-closed |
| `--hnsw-scope` | 任意 | `all`（既定）/ `declared`（Issue #1065）。HNSW opt-in 時に HNSW を使うテーブルの範囲。`declared` は `CREATE INDEX ... USING hnsw` を宣言したテーブルのみ。不正値・重複指定は fail-closed |
| `--durability` | 任意 | `immediate`（既定）/ `none`（Issue #850）。`none` は commit 成功応答がディスクへの永続を保証せず、選択時のみ起動ログへ英語の `WARNING` 行を 1 行出す |
| `--max-dml-affected-rows` | 任意 | 述語形 `UPDATE`／`DELETE` の 1 文あたり影響行数上限（`1`〜`1,000,000`）。未指定は上限なし。超過時は `wire_code` `54000`・副作用ゼロ（Issue #997） |
| `--max-insert-rows` | 任意 | 複数行 `VALUES` の 1 文あたり行数上限（`1`〜`1,000,000`）。未指定は上限なし。別途 `batch_limits.max_files_per_batch`（既定 64）も通る（Issue #997） |
| `--batch-max-files` | 任意 | `batch_limits.max_files_per_batch`（既定 64）をプロセス全体に設定（`1`〜`1,000,000`）。優先順位は CLI 明示 > 環境変数 `FANDHE_DB_BATCH_MAX_FILES` > 既定 64（Issue #1166） |
| `--partitioned-dml-chunk-rows` | 任意 | 分割実行 DML のチャンク行数。既定 1,000（Issue #1129） |
| `--partitioned-dml-scan-budget` | 任意 | 分割実行 DML の走査予算。既定 100,000 |
| `--partitioned-dml-max-hold-ms` | 任意 | 分割実行 DML の書き込み保持時間上限（ms、`100`〜`5000`）。既定 1,000 |
| `--partitioned-dml-max-jobs-per-tenant` | 任意 | テナントあたりの同時ジョブ上限（`1`〜`64`）。既定 1 |
| `--partitioned-dml-max-jobs` | 任意 | 全体の同時ジョブ上限（`1`〜`64`）。既定 4。組合せ違反（テナント単位 > 全体）は起動エラー |
| `--partitioned-dml-max-interrupted-records` | 任意 | 中断レコード上限。既定 1,000 |
| `--ddl-allowed-users` | 任意 | DDL（`CREATE TABLE`／`DROP TABLE`／`CREATE VIEW`／`DROP VIEW`／`CREATE INDEX`／`DROP INDEX`／`CREATE TYPE`／`DROP TYPE`）の実行権限を持つ username のカンマ区切り列挙。未指定は全ユーザーが `42501` で拒否（fail-closed）。列挙値は `--users` に実在する必要がある |
| `--auth-method` | 任意 | `cleartext`（既定）/ `scram-sha-256`（Issue #940・WIRE-18）。`scram-sha-256` は全ユーザーの SCRAM 検証子と `--scram-mock-key-file` が必須で、`--surface nosql` とは併用不可（起動時 fail-closed） |
| `--scram-mock-key-file` | 条件付き必須 | `scram-sha-256` 選択時のみ必須。32 バイト以上のファイル。未知ユーザー向けモック検証子の salt 導出用で、ユーザーストアの内容から独立させる |
| `--tls-cert` / `--tls-key` | 任意 | サーバー証明書チェーン PEM と Ed25519 PKCS#8 秘密鍵 PEM。両方揃って初めて有効で、片方のみは fail-closed（Issue #967） |
| `--tls-mode` | 任意 | `require`（既定）/ `allow`。`--tls-cert`／`--tls-key` 指定時のみ有効。`require` は平文 StartupMessage を `08P01` で拒否し、非ループバック bind を許可。`allow` は平文も受理しループバック限定のまま |
| `--tls-scram-channel-binding` | 任意 | `enable` / `disable`（既定 `disable`。Issue #970・#1088）。SCRAM-SHA-256-PLUS（`p=tls-server-end-point`）を機構リストへ提示するか。SQL 表層で Ed25519 など RFC 5929 のハッシュを持たない葉証明書と `enable` の組合せは起動時に拒否される |
| `--fault-inject` | 任意 | `post-commit-panic`。テスト専用で feature `fault-injection` 有効ビルドのみ存在し、既定ビルドでは `unknown argument: --fault-inject` で非 0 終了（Issue #705） |
| `--planner-endpoint` | 任意 | `--planner-model` と両方指定して初めて `engine::query_planner::OllamaClient` を構築（片方のみは起動エラー） |
| `--planner-model` | 任意 | 同上。空文字・制御文字混入・256 バイト超は起動時に fail-closed で拒否 |
| `--embedder-hashing-dim` | 任意 | ハッシュ embedding の次元数（`u32`）。`engine::embedding::HashingEmbedder`（決定的・ネットワーク不要な検証用参照実装であり意味的埋め込みではない）を注入 |
| `hash-password`（サブコマンド） | - | 第一引数が `hash-password` の場合のみ発火。stdin から 1 行読み、`auth::generate_salt` で新規 salt を生成し PHC 文字列を stdout へ出力する。`--with-scram-sha-256` 付きは `<PHC 文字列>:<SCRAM 検証子文字列>` を出力する（パスワードは印字可能 ASCII 0x20〜0x7e に限定）。未知の追加引数は fail-closed で拒否 |

## Notes

- `--users` と `--db` は必須。省略した場合は匿名デフォルトを作らず起動拒否とする（fail-closed）。
- `--bind` 未指定時は `127.0.0.1:5432` にバインドする。psql・psycopg・node pg はクライアント側の変更なしに cleartext password 認証で接続できる。
- `run_server` は起動直後に `engine::recovery::panic_hook::install_panic_hook()`（TASK-97・RECOVER-6）→ `engine::recovery::fail_fast::install()`（TASK-99・RECOVER-8）の順で導入する。この順序は固定契約（`fail_fast::install` が捕捉した直前のフックを先に呼んでから abort するため、逆順にすると緊急応答が退行する）。
- `search_engine_kind` が `None`（未指定/`default`）の場合は `EngineCore::open` を、`Some(kind)` の場合のみ `EngineCore::open_with_engine` を呼ぶ（エラー型・メッセージまで既存経路とビット同一に保つ設計判断。`open_with_engine(default_kind())` へは委譲しない）。
- 終了コードは `ExitCode::SUCCESS` / `ExitCode::FAILURE` のみ。
- `main()` 自体・`run_server`・`build_query_planner`・`build_hashing_embedder`・`resolve_search_engine`・`resolve_surface`・`resolve_durability`・`resolve_hnsw_scope`・`resolve_auth_method`・`resolve_tls_options`・`open_engine_core`・`run_hash_password` はいずれも `pub` ではない（bin crate 内の非公開関数）。
- `--tls-mode`・`--tls-scram-channel-binding` は `--tls-cert`／`--tls-key` を指定したときのみ意味を持ち、単独指定は fail-closed で起動エラー。TLS 有効時は起動ログへ `TLS enabled (mode=require|allow)` を 1 行出す（README より）。`--surface nosql` では同じ TLS 設定が HTTPS 終端になる。
- Migration (0.1.0 → 0.2.0): crate 名は `fandhe-db-wire-server`（バイナリ名 `wire-server` は不変）。バッチ上限の環境変数は `VECTOR_DB_BATCH_MAX_*` から `FANDHE_DB_BATCH_MAX_*` へ改名され、旧名は読まれない（設定されていれば起動時に stderr へ警告）。`--max-dml-affected-rows`／`--max-insert-rows` は README で「未指定時は上限なし」（以前の実装既定値 1,000 を超える行数でも、フラグを指定しない限り成功する BREAKING CHANGE）とされている。
- This is a PostgreSQL wire protocol v3 server binary — distinct from `fandhe-backend`（同 org の別ライブラリ、汎用 Rust HTTP サーバーフレームワーク）や `fastify` / `hono` / `go-echo`（HTTP フレームワーク）。ここでの "server" は Postgres wire protocol の実装であり、HTTP サーバーではない。

## Related

- [search-engine-opt.md](./search-engine-opt.md)
- [server.md](./server.md)
- [auth.md](./auth.md)
