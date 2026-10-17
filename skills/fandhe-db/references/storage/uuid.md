---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/uuid.rs
---

# uuid

`UUID` 列型の内部表現・パース・整形（TABLE-13〔検討中〕・TASK-197、Issue #887）。128bit 識別子を RFC 4122 ネットワークバイトオーダー（テキスト表記の先頭 16 進 2 桁が先頭バイト）の `[u8; 16]` で表現する自作実装で、外部クレートに依存しない。`catalog::ColumnType::Uuid`（列宣言）・`row_codec`（行バイト表現）・`sql::parser`（INSERT / UPDATE / UPSERT リテラル束縛）から呼ばれる。

## Signature / Usage

```rust,ignore
/// 正規テキスト表記の長さ（`8-4-4-4-12` 形。ハイフン 4 個 + 16 進数字 32 個）。
pub const TEXT_LEN: usize = 36;

/// 128bit UUID 値。RFC 4122 のネットワークバイトオーダーで保持する。
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct Uuid([u8; 16]);

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum UuidTextError {
    /// 入力バイト長が `TEXT_LEN`（36）と異なる。
    Length,
    /// 長さは正しいがハイフン位置・16 進数字のいずれかが規範形を満たさない。
    Format,
}

impl Uuid {
    pub fn from_bytes(bytes: [u8; 16]) -> Self;
    pub fn as_bytes(&self) -> &[u8; 16];
}

/// UUID テキストリテラルを厳密文法で解析する（U3）。
pub fn parse_uuid_text(s: &str) -> Result<Uuid, UuidTextError> { /* ... */ }
```

```rust,ignore
let u = parse_uuid_text("12345678-9ABC-DEF0-1234-56789ABCDEF0").unwrap();
assert_eq!(u.to_string(), "12345678-9abc-def0-1234-56789abcdef0");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UuidTextError::Length` | variant | 入力バイト長が 36 でない（波括弧付き・`urn:uuid:` 接頭辞も長さで拒否される） |
| `UuidTextError::Format` | variant | ハイフン位置（8・13・18・23）または 16 進数字が不正。ハイフンなし 32 桁・前後空白・非 ASCII も拒否 |

## Notes

- 受理するのはちょうど 36 バイトの `8-4-4-4-12` 形のみ。16 進数字は大文字・小文字混在可。長さは解析前に検査する（DoS 防止）。
- `Display` は小文字 16 進の `8-4-4-4-12` 正規テキストに整形する。wire の DataRow テキスト・HTTP JSON 文字列はこの表記を共有する（U4）。
- version / variant ビットは検証しない（nil `00000000-0000-0000-0000-000000000000`・全 1 `ffffffff-ffff-ffff-ffff-ffffffffffff` も有効値）。
- `Ord`（derive）はバイト列の辞書順（`memcmp` と同じ）で、符号なし 128bit big-endian の大小および正規テキストの辞書順のいずれとも一致する（単体テストで固定。U2）。WHERE 比較・二次索引・ORDER BY がこの順序を共有する唯一の定義とされるが、原文によれば Issue #887 では未結線（対象外は #891・#893 へ申し送り）。

## Related

- [row_codec](./row-codec.md)
- [catalog](./catalog.md)
- [bytea](./bytea.md)
