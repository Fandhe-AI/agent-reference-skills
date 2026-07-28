# overview（crate ルート）

`fandhe-backend-http`: fandhe-backend の最小 HTTP コア。sans-IO な HTTP/1.1 パーサー実装であり、workspace 依存グラフ（`server → routes → http`）の末端に位置する。実行時依存は tokio の `io-util`（`AsyncRead`/`AsyncReadExt`）のみ。feature `net` を有効化すると tokio `net` のみが追加され、`socket` モジュールが公開される。

## モジュール構成

| モジュール | 責務 |
| --- | --- |
| `request` | sans-IO なリクエストヘッドパーサー |
| `body` | body フレーミング解釈（`Content-Length` / `Transfer-Encoding` の意味決定） |
| `connection` | keep-alive 判定・ソケット読み取りループ |
| `buffer` | 読み取りバッファの接続単位再利用 |
| `socket` | `TCP_NODELAY` 最適化（feature `net` 前提） |
| `response` | HTTP/1.1 レスポンス直列化 |
| `chunked` | chunked transfer-coding のデコード・エンコード |
| `query` | クエリ文字列 key-value パーサー |
| `cookie` | `Cookie` / `Set-Cookie` ヘッダの読み取り・構築時検証済み書き込み型 |
| `percent` | percent-decode ヘルパー（opt-in） |
| `form` | `application/x-www-form-urlencoded` ボディパーサー |
| `error` | エラーレスポンス共通化ヘルパー（`IntoResponse`） |

## Notes

- 全パーサー・エンコーダーは sans-IO（ソケット I/O を持たない純関数・状態機械）として実装される。入力不足は `Incomplete` を返し、呼び出し元が追い読みして再入力する契約
- エラー型に `thiserror` 等を使わず手実装している（依存最小化のため）
- 各モジュールの DoS 対策上限値は [`body`](./body.md)・[`chunked`](./chunked.md)・[`query`](./query.md)・[`form`](./form.md)・[`cookie`](./cookie.md)・[`request`](./request.md) の各ページを参照

## Related

- [request](./request.md)
- [body](./body.md)
- [connection](./connection.md)
- [response](./response.md)
