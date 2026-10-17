---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/surface.rs
---

# surface

`--surface` opt-in CLI 引数の閉じた語彙パーサ（Issue #734・TASK-171 / HTTP-1）。クエリインターフェースを SQL 表層（PostgreSQL wire プロトコル。現行）と NoSQL 表層（HTTP/1.1 最小サブセット）の 2 表層とし、起動時 CLI で排他選択する契約の入口。

## Signature / Usage

~~~rust,ignore
pub const FLAG: &str = "--surface";
pub const TOKENS: [&str; 2] = ["sql", "nosql"];

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Surface {
    #[default]
    Sql,
    Nosql,
}

pub fn parse(raw: &str) -> Result<Surface, String>
impl Surface { pub fn token(self) -> &'static str }
~~~

## Options / Props

| Token | `Surface` | Description |
|-------|-----------|-------------|
| `sql`（既定） | `Sql` | PostgreSQL wire プロトコル互換の SQL 表層。未指定時は既存の SQL wire 起動経路をそのまま通る |
| `nosql` | `Nosql` | NoSQL 表層（HTTP/1.1 最小サブセット）。受け皿は `http::listener::accept_loop_with_limiter`（Issue #735・#743。読み取り 30 秒タイムアウト・同時接続数 64 を SQL wire と同一契約で適用） |

## Notes

- `sql` / `nosql` 以外の値・値欠落・2 回目以降の重複指定は fail-closed で拒否し、既定へ黙って読み替えない（`main.rs::run_server` の引数ループ）。`parse` は厳密一致のみ。
- `main.rs::run_server` は解決結果に応じて `server::accept_loop_with_engine`（`Sql`）か `http::listener::accept_loop_with_limiter`（`Nosql`）のいずれか 1 本だけを呼ぶ（HTTP-1 の排他方針・Issue #735・#743）。
- 両表層とも bind は単一の `GuardedBindAddrs::resolve` / `bind` 呼び出しを共有した後に分岐するため、`nosql` でも WIRE-7 の bind ガード（TLS 未構成時は loopback 限定）が同じ経路で適用される（HTTP-9）。
- NoSQL 表層の要求解釈・応答生成は、このソース時点の doc では暫定ハンドラにとどまる旨が書かれている（Issue #747 で本体）。

## Related

- [bind-guard.md](./bind-guard.md)
- [server.md](./server.md)
- [main-cli.md](./main-cli.md)
- [search-engine-opt.md](./search-engine-opt.md)
