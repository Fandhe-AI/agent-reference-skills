# location

同一オリジンに限るリダイレクト先（`Location`）の構築時検証済み型（イシュー #828）。`Response::redirect` はワイヤ上の妥当性しか検証せず、外部入力由来の値を渡すとオープンリダイレクト（OWASP A01）になりうるため、同一オリジンの絶対パス（`/` 始まり）だけを型として表現可能にし、`Response::see_other` が受け取る唯一の入力とする。

## Signature / Usage

```rust
#[non_exhaustive]
pub enum SameOriginLocationError {
    Empty,
    NotRootRelative,
    SchemeRelative,
    Backslash,
    ControlCharacter,
}

pub fn validate_same_origin_location(value: &str) -> Result<(), SameOriginLocationError>;

pub struct SameOriginLocation { /* value: String */ }

impl SameOriginLocation {
    pub fn new(value: impl Into<String>) -> Result<Self, SameOriginLocationError>;
    pub fn as_str(&self) -> &str;
    pub fn into_string(self) -> String;
}
// TryFrom<&str> / TryFrom<String> / AsRef<str> / Display
```

```rust
use fandhe_backend_http::location::SameOriginLocation;

let loc = SameOriginLocation::new("/%2F%2Fevil.com").unwrap();
assert_eq!(loc.as_str(), "/%2F%2Fevil.com");
assert!(SameOriginLocation::new("https://evil.com").is_err());
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `validate_same_origin_location` | `fn(&str) -> Result<(), SameOriginLocationError>` | sans-IO 純関数（割り当てなし・O(n)・panic なし）。fuzz target `same_origin_location` の対象。判定順は空 → 先頭 `/` → scheme-relative → 全体走査（`\`・制御文字の先に見つかった方） |
| `SameOriginLocation::new` / `TryFrom<&str>` / `TryFrom<String>` | `Result<SameOriginLocation, SameOriginLocationError>` | 唯一の構築経路。検証通過値のみ保持（フェイルクローズ） |
| `SameOriginLocation::as_str` / `into_string` | `&str` / `String` | 検証済みの値を入力とバイト同一で返す |
| `SameOriginLocationError::Empty` | variant | 空文字列 |
| `SameOriginLocationError::NotRootRelative` | variant | 先頭が `/` でない（絶対 URL・相対参照・`\` 始まり等） |
| `SameOriginLocationError::SchemeRelative` | variant | 2 文字目が `/` または `\`（scheme-relative URL） |
| `SameOriginLocationError::Backslash` | variant | `\` を含む |
| `SameOriginLocationError::ControlCharacter` | variant | 制御文字（HTAB 含む）を含む |

## Notes

- 受理条件（すべて満たすもののみ）: 空でない / 先頭が `/` / 2 文字目が `/` でも `\` でもない / 全体に `\` を含まない / 全体に制御文字（`char::is_control`: C0・DEL・C1）を含まない。スペースと制御文字以外の非 ASCII は受理する
- HTAB も拒否する: WHATWG URL パーサは ASCII タブ・改行を除去するため `/<TAB>/evil.com` が `//evil.com` と解釈されうる
- `\` を全体で拒否するのは、ブラウザが `\` を `/` と同一視するため
- 非デコード契約: percent デコード・`.` / `..` 解決・大文字小文字正規化を一切行わない。`/%2F%2Fevil.com` や `/%5Cevil.com` は不透明なバイト列として受理され、送出値も検証値とバイト同一（ブラウザは `%2F` をパス区切りへ復号しない）
- 外部入力をデコードする場合は、デコード後の最終値を本型へ通すこと。本型の値を後段でデコードして再利用してはならない（二重デコード禁止）
- `SameOriginLocationError` は `#[non_exhaustive]`。`Display` は拒否理由のみを出し、入力値は含めない（ログ汚染・機密混入防止）
- `Response::see_other(location)` は POST 後の 303 See Other を、検証済み `SameOriginLocation` のみを受け取る infallible 構築で行う。`Response::redirect` は別経路で挙動不変であり、外部入力由来の `location` の許可リスト検証は呼び出し元の責務
- 出典: https://docs.rs/crate/fandhe-backend-http/0.5.0/source/src/location.rs

## Related

- [response](./response.md)
- [percent](./percent.md)
