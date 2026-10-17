---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/auth_method_opt.rs
---

# auth_method_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る `--auth-method` opt-in CLI 引数の閉じた語彙パーサ（Issue #940・WIRE-18・TASK-222）。untrusted な CLI 文字列から `crate::auth::AuthMethod` へ到達する唯一の入口。認証方式はサーバー全体で 1 つに固定し、ユーザーごとには切り替えない（`Authentication*` の種類自体からユーザーの存在・方式が判別できてしまうのを避ける設計判断）。

## Signature / Usage

~~~rust,ignore
pub const FLAG: &str = "--auth-method";
pub const SCRAM_MOCK_KEY_FILE_FLAG: &str = "--scram-mock-key-file";
pub const SCRAM_MOCK_KEY_FILE_MIN_LEN: usize = crate::auth::scram::KEY_LEN;
pub const SCRAM_MOCK_KEY_FILE_MAX_LEN: usize = 1024 * 1024;
pub const TOKENS: [&str; 2] = ["cleartext", "scram-sha-256"];

pub fn parse(raw: &str) -> Result<AuthMethod, String>
pub fn token_for(m: AuthMethod) -> &'static str
~~~

## Options / Props

| Flag / Constant | Token / Value | Description |
|-----------------|---------------|-------------|
| `--auth-method` | `cleartext`（既定） | `AuthMethod::Cleartext`。未指定は `AuthMethod::default()` と同一でビット同一 |
| `--auth-method` | `scram-sha-256` | `AuthMethod::ScramSha256` |
| `--scram-mock-key-file` | ファイルパス | `scram-sha-256` を選んだときのみ必須。生バイト列を `UserStore::require_scram` のモック鍵導出用秘密として渡す |
| `SCRAM_MOCK_KEY_FILE_MIN_LEN` | `scram::KEY_LEN` | ファイル内容の最小バイト数 |
| `SCRAM_MOCK_KEY_FILE_MAX_LEN` | 1 MiB | 読み込み最大バイト数 |

## Notes

- `parse` は `TOKENS` の厳密一致のみ受理（trim・大文字小文字の読み替えなし）。
- `--scram-mock-key-file` はユーザーストアの内容（ServerKey・行順）から独立した秘密であることが契約。`cleartext`（既定）との組合せ・値欠落・短すぎるファイル・2 回目以降の指定はいずれも fail-closed（`main.rs` 側で検証。本モジュールはフラグ名の単一情報源のみ）。
- 最大長は巨大ファイルや `/dev/zero` のような終端しない特殊ファイルによる listen 前のメモリ枯渇（DoS）を防ぐため。`main.rs` が上限 + 1 バイトまでだけ `Read::take` で読み、超過を拒否する。

## Related

- [auth.md](./auth.md)
- [tls-opt.md](./tls-opt.md)
- [main-cli.md](./main-cli.md)
