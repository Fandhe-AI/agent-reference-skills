---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/durability_opt.rs
---

# durability_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--durability` opt-in CLI 引数の閉じた語彙パーサ（Issue #850）。`engine::storage::WriteDurability`（書き込みトランザクション durability の構築時オプション。`EngineCore::open_with_durability` / `Storage::open_with_durability` へ渡す）へ untrusted な CLI 文字列から到達する唯一の入口。

## Signature / Usage

~~~rust,ignore
pub const FLAG: &str = "--durability";
pub const TOKENS: [&str; 2] = ["immediate", "none"];

pub fn parse(raw: &str) -> Result<WriteDurability, String>
pub fn token_for(d: WriteDurability) -> &'static str
~~~

## Options / Props

| Token | `WriteDurability` | Description |
|-------|-------------------|-------------|
| `immediate`（既定） | `Immediate` | `WriteDurability::default()` と一致 |
| `none` | `None` | commit 成功応答が永続を保証しなくなる |

## Notes

- `parse` は厳密一致のみ受理（trim・大文字小文字の読み替えなし）。typo で意図と異なる durability が選ばれる事故を fail-closed で防ぐ。
- `WriteDurability` は `#[non_exhaustive]` ではない（`engine::storage` の「値の追加は破壊的変更として扱う」）。variant が追加される場合は `TOKENS` / `parse` / `token_for` の `match` を明示的に更新する契約。
- `WriteDurability::None` の損失ウィンドウの詳細は `docs/design/ingest-write-path.md`「Issue #849 追記」節。非既定値を選んだ場合の起動時警告出力は `main.rs::run_server` の責務で、本モジュールは値の受理・拒否のみ。
- `token_for` が自由関数なのは `WriteDurability` が engine クレート定義で、本クレートに inherent メソッドを持てないため。

## Related

- [search-engine-opt.md](./search-engine-opt.md)
- [main-cli.md](./main-cli.md)
