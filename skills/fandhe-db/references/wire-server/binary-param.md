---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/binary_param.rs
---

# binary_param

Bind のバイナリ形式パラメータ（format code = 1）を正規テキストへ復号する（WIRE-14・TASK-218・Issue #1345）。`extended_query` の Bind 処理がスロットごとの `BinaryParam` に従って PostgreSQL の受信形式（ネットワークバイトオーダー）で解釈し、テキスト形式で送った場合と同一の文字列へ変換する。変換後の値は engine の `bind_prepared`（UTF-8・NUL 検証・型付きリテラル置換）へそのまま渡るため、バイナリ ≡ テキストが構造的に保証される（第 2 の実行器・値検証を作らない）。結果側の符号化は `result_encoder::binary` が担い、本モジュールはその逆変換。

## Signature / Usage

~~~rust,ignore
pub(crate) enum BinaryParam {
    Unsupported, // バイナリ非対応（fail-closed）
    Utf8Identity, // text 系。受信バイト列を UTF-8 の恒等表現としてそのまま渡す
    Int4,   // 4 バイト
    Int8,   // 8 バイト
    Float4, // 4 バイト
    Float8, // 8 バイト
    Bool,   // 1 バイト
    Bytea,  // 任意長。`\x` 16 進テキストへ変換
    Uuid,   // 16 バイト
}

/// バイナリ値の長さが型の受信形式と合わない（`08P01`）。
pub(crate) struct BinaryParamError;

pub(crate) fn decode_to_text(kind: BinaryParam, raw: &[u8]) -> Result<Vec<u8>, BinaryParamError>
~~~

## Options / Props

| BinaryParam | 受信長 | テキスト表現 |
|-------------|--------|--------------|
| `Utf8Identity` | 任意 | 受信バイト列そのまま |
| `Int4` | 4 | `i32` の 10 進 |
| `Int8` | 8 | `i64` の 10 進 |
| `Float4` / `Float8` | 4 / 8 | 有限値は最短往復桁、`NaN` / `Infinity` / `-Infinity` |
| `Bool` | 1 | 0 以外は `t`、0 は `f`（PostgreSQL の `boolrecv` と同じ） |
| `Uuid` | 16 | 正規 UUID 文字列 |
| `Bytea` | 任意 | `engine::bytea::format_hex_text`（空は `\x`、例 `\x00abff`） |
| `Unsupported` | - | 常に `Err(BinaryParamError)` |

## Notes

- モジュールは `pub(crate)`（crate 外非公開）。受信データ経路のため `unwrap` / `expect` / 添字アクセスを使わず、固定長は `try_from` による完全一致で検証する。不一致は `BinaryParamError`（`08P01`）。
- `Unsupported` は呼び出し側が事前に弾く契約（binary 指定は `0A000`）だが、念のため本関数でも拒否する（fail-closed）。
- どのスロットがどの `BinaryParam` になるかは Parse 時に `extended_query` が決める（[extended-query.md](./extended-query.md) 参照）。

## Related

- [extended-query.md](./extended-query.md)
- [result-encoder.md](./result-encoder.md)
