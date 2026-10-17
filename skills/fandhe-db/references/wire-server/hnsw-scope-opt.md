---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/hnsw_scope_opt.rs
---

# hnsw_scope_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--hnsw-scope` CLI 引数の閉じた語彙パーサ（Issue #1065・オーナー判断 2026-09-28）。`engine::search_engine::HnswScope`（HNSW opt-in 時に HNSW 経路を使うテーブルの範囲。`EngineCore::with_hnsw_scope` へ渡す）へ untrusted な CLI 文字列から到達する唯一の入口。

## Signature / Usage

~~~rust,ignore
pub const FLAG: &str = "--hnsw-scope";
pub const TOKENS: [&str; 2] = ["all", "declared"];

pub fn parse(raw: &str) -> Result<HnswScope, String>
pub fn token_for(scope: HnswScope) -> &'static str
~~~

## Options / Props

| Token | `HnswScope` | Description |
|-------|-------------|-------------|
| `all`（既定） | `All` | HNSW opt-in 時は全テーブル HNSW。`USING hnsw` 宣言はカタログへ記録されるだけで経路を変えない（宣言導入前と同一の挙動） |
| `declared` | `Declared` | `CREATE INDEX ... USING hnsw` を宣言したテーブルだけ HNSW、未宣言テーブルは厳密（brute-force） |

## Notes

- HNSW opt-in（`--search-engine hnsw*`）が無効な構成では値は参照されず（全テーブル厳密のまま）、組合せによる起動エラーにもしない（オーナー判断: opt-in 無効時は scope は無関係）。判定の詳細は `docs/design/index-declaration-effects.md`「HNSW（テーブル単位）」。
- `parse` は厳密一致のみ受理（trim・大文字小文字の読み替えなし）。typo を黙って既定へ読み替えると意図と異なる経路で検索する事故を fail-closed で防げなくなるため。
- `HnswScope` に variant が追加される場合は `TOKENS` / `parse` / `token_for` の `match` を明示的に更新する契約。

## Related

- [search-engine-opt.md](./search-engine-opt.md)
- [main-cli.md](./main-cli.md)
