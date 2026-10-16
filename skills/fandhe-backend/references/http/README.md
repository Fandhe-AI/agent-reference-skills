# http

| Name | Description | Path |
| --- | --- | --- |
| body | body フレーミングの意味解釈（sans-IO）。読むべき body のバイト数を決定する。 | [body.md](./body.md) |
| buffer | 接続単位で再利用する読み取りバッファ。1 コネクションにつき 1 つ保持し `read_request` へ繰り返し渡す。 | [buffer.md](./buffer.md) |
| chunked | chunked transfer-coding（RFC 9112 §7.1）のデコーダー / エンコーダー（sans-IO）。 | [chunked.md](./chunked.md) |
| connection | keep-alive 判定と、1 リクエスト分を読み取る非同期 `read_request`。本クレートで唯一 tokio に依存する箇所。 | [connection.md](./connection.md) |
| cookie | Cookie の読み取り（`parse_cookie_header`）と書き込み（`SetCookie`）の 2 つのヘルパー。 | [cookie.md](./cookie.md) |
| error | `Result<T, E>` から `Response` への変換と JSON エラーボディの共通化ヘルパー。 | [error.md](./error.md) |
| form | `application/x-www-form-urlencoded` ボディパーサー（sans-IO）。query と percent を合成して提供する。 | [form.md](./form.md) |
| location | 同一オリジンの絶対パスに限る構築時検証済みリダイレクト先型（オープンリダイレクト対策、イシュー #828）。 | [location.md](./location.md) |
| overview（crate ルート） | `fandhe-backend-http` の最小 HTTP/1.1 コア。sans-IO パーサーで、依存グラフの末端に位置する。 | [overview.md](./overview.md) |
| percent | RFC 3986 percent-encoding の逆変換ヘルパー（opt-in、sans-IO）。 | [percent.md](./percent.md) |
| query | クエリ文字列の key-value パーサー（sans-IO）。`?` より後の生文字列を `&` / `=` へ分解する。 | [query.md](./query.md) |
| request | HTTP/1.1 リクエストライン・ヘッダの sans-IO パーサー。`parse_request_head` は純関数。 | [request.md](./request.md) |
| response | HTTP/1.1 レスポンス直列化。任意ヘッダを受け付けず、CRLF 注入（レスポンス分割）を型レベルで排除する。 | [response.md](./response.md) |
| socket | 接続受理直後の TCP ソケットオプション設定。feature `net`（既定 off）が有効なときのみ対象。 | [socket.md](./socket.md) |
