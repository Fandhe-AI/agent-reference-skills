# http

| Name | Description | Path |
| --- | --- | --- |
| body | body フレーミングの意味解釈（sans-IO）。`parse_request_head` が構文的に正しいと判定したヘッダ列から「body を何バイト読むべきか」を決定する。 | [body.md](./body.md) |
| buffer | 接続単位で再利用する読み取りバッファ。`connection::read_request` の呼び出し元（コアの接続受理ループ）が 1 コネクションにつき `RecvBuffer` を 1 つ保持し、繰り返し `read_request` へ渡す契約。 | [buffer.md](./buffer.md) |
| chunked | chunked transfer-coding のデコーダー / エンコーダー（RFC 9112 §7.1、sans-IO）。 | [chunked.md](./chunked.md) |
| connection | keep-alive 判定・ソケット読み取りループ。`should_keep_alive` は `Connection` ヘッダと HTTP バージョンからの意味判定を行う sans-IO 純関数。 | [connection.md](./connection.md) |
| cookie | Cookie 関連ヘルパー。読み取り側（`parse_cookie_header`、RFC 6265 cookie-pair 構文準拠）と書き込み側（`SetCookie`、構築時検証済みの `Set-Cookie` 専用型）の 2 つの独立した責務を持つ。 | [cookie.md](./cookie.md) |
| error | エラーレスポンス共通化ヘルパー。各ハンドラが都度自前定義していた `Result<T, E> -> Response` 変換・JSON エラーボディの定型記述を共通化する最小 trait と関数を提供する。 | [error.md](./error.md) |
| form | `application/x-www-form-urlencoded` ボディパーサー（sans-IO）。`query`（`&`/`=` 分解）・`percent`（percent-decode）の既存 sans-IO 純関数を合成して提供する。 | [form.md](./form.md) |
| location | 同一オリジンに限るリダイレクト先の構築時検証済み型（イシュー #828）。 | [location.md](./location.md) |
| overview（crate ルート） | `fandhe-backend-http`: fandhe-backend の最小 HTTP コア。sans-IO な HTTP/1.1 パーサー実装であり、workspace 依存グラフ（`server → routes → http`）の末端に位置する。 | [overview.md](./overview.md) |
| percent | RFC 3986 percent-encoding の逆変換ヘルパー（opt-in、sans-IO）。 | [percent.md](./percent.md) |
| query | クエリ文字列 key-value パーサー（sans-IO）。`RequestHead::query()` が返す `?` より後の生文字列を `&`/`=` へ分解する。 | [query.md](./query.md) |
| request | HTTP/1.1 リクエストライン・ヘッダの sans-IO パーサー。`parse_request_head` はソケット I/O を一切持たない純関数（`&[u8]` → 構造体）。 | [request.md](./request.md) |
| response | HTTP/1.1 レスポンス直列化。コアの接続ループが `RequestGate::Reject`・ハンドラ結果・エラー応答をワイヤフォーマットへ直列化する唯一の経路。 | [response.md](./response.md) |
| socket | 接続受理直後の TCP ソケットオプション設定。feature `net`（既定 off）が有効なときのみコンパイル対象になる。 | [socket.md](./socket.md) |
