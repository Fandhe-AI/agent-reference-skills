# error

エラーレスポンス共通化ヘルパー。各ハンドラが都度自前定義していた `Result<T, E> -> Response` 変換・JSON エラーボディの定型記述を共通化する最小 trait と関数を提供する。

## Signature / Usage

```rust
pub trait IntoResponse {
    fn into_response(self) -> Response;
}

// impl IntoResponse for Response（恒等変換）
// impl IntoResponse for HttpError（error_response へ委譲）
// impl<T: IntoResponse, E: IntoResponse> IntoResponse for Result<T, E>

pub struct HttpError { /* 非公開: status: u16, message: &'static str */ }
impl HttpError {
    pub fn new(status: u16, message: &'static str) -> Self;
    pub fn status(&self) -> u16;
    pub fn message(&self) -> &'static str;
}

pub fn error_response(status: u16, message: &'static str) -> Response;
```

```rust
use fandhe_backend_http::error::{HttpError, IntoResponse};
use fandhe_backend_http::response::Response;

fn find_item(id: u64) -> Result<Vec<u8>, HttpError> {
    if id == 1 {
        Ok(b"{}".to_vec())
    } else {
        Err(HttpError::new(404, "item not found"))
    }
}

fn handler(id: u64) -> Result<Response, HttpError> {
    let body = find_item(id)?;
    Ok(Response::new(200, body).with_content_type("application/json"))
}

let err = handler(2).into_response();
assert_eq!(err.status, 404);
assert_eq!(err.body, br#"{"error":"item not found"}"#);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `HttpError::new` の `message` | `&'static str` | ソースコード上に静的に書かれた文字列リテラルのみ渡せる（情報漏えい対策） |
| `error_response` の `message` | `&'static str` | JSON エラーボディ `{"error":"<message>"}` の値。RFC 8259 準拠エスケープを適用 |

## Notes

- `message` を `&'static str` に限定するのは情報漏えい対策。実行時エラー（DB エラー詳細・ファイルパス・スタックトレース）の `Display` / `Debug` 出力をそのままエラーボディへ流し込む経路が構造的に存在しない
- `error_response` は serde 等の直列化 crate に依存せず、`"` `\` と U+0000–U+001F の制御文字を手実装エスケープで直列化する（JSON インジェクション対策）
- `Content-Type` は `Response::with_content_type` を使って設定する（このクレートの唯一の CRLF 混入対策済みヘッダ付与経路）
- `IntoResponse` は `Result<T, E>`（両辺が `IntoResponse` を実装）にも blanket impl されており、ハンドラ内で `?` 演算子によりエラーを伝播させたあと境界で 1 回だけ `.into_response()` を呼ぶ使い方を想定する
- `HttpError` は `Display` / `std::error::Error` を実装する（`<status> <message>` 形式）

## Related

- [response](./response.md)
