# http

| Name | Description | Path |
| --- | --- | --- |
| overview | crate ルート（`lib.rs`）のモジュール構成・設計方針 | [overview.md](./overview.md) |
| request | sans-IO なリクエストヘッド（リクエストライン + ヘッダ）パーサー | [request.md](./request.md) |
| response | HTTP/1.1 レスポンス直列化（`Response`・`AllowedMethods`） | [response.md](./response.md) |
| cookie | `Cookie` 読み取りパーサー + 構築時検証済み `SetCookie` 書き込み型 | [cookie.md](./cookie.md) |
| query | クエリ文字列 key-value パーサー | [query.md](./query.md) |
| form | `application/x-www-form-urlencoded` ボディパーサー | [form.md](./form.md) |
| percent | percent-decode ヘルパー（opt-in） | [percent.md](./percent.md) |
| body | body フレーミング（`Content-Length` / `Transfer-Encoding`）の意味決定 | [body.md](./body.md) |
| chunked | chunked transfer-coding のデコーダー / エンコーダー | [chunked.md](./chunked.md) |
| buffer | 接続単位で再利用する読み取りバッファ（`RecvBuffer`） | [buffer.md](./buffer.md) |
| error | エラーレスポンス共通化ヘルパー（`IntoResponse` / `HttpError`） | [error.md](./error.md) |
| socket | 接続受理直後の TCP ソケットオプション設定（feature `net`） | [socket.md](./socket.md) |
| connection | keep-alive 判定・ソケット読み取りループ | [connection.md](./connection.md) |
