# request-reply

対象 Fastify v5.12.1

Node.js ネイティブの HTTP サーバーである Fastify の `Request` / `Reply` オブジェクトのリファレンス。`hono` / `go-echo` / `fandhe-backend` の同名概念とは別の Fastify 固有 API。

| Name | Description | Path |
|------|-------------|------|
| Request | ハンドラー第一引数。query/body/params/headers/host/hostname/port/ip/routeOptions 等の全プロパティと validation ヘルパー | [request.md](./request.md) |
| Reply Methods | code/statusCode/mediaType/header(s)/getHeader(s)/removeHeader/hasHeader/writeEarlyHints/type | [reply-methods.md](./reply-methods.md) |
| Reply.send() | send() のペイロード型別挙動（Objects/Strings/Streams/Buffers/TypedArrays/ReadableStream/Response/Promise） | [reply-send.md](./reply-send.md) |
| Reply Serialization | getSerializationFunction/compileSerializationSchema/serializeInput/serializer | [reply-serialization.md](./reply-serialization.md) |
| Reply.redirect() | リダイレクトのシグネチャとステータスコード優先順位 | [reply-redirect.md](./reply-redirect.md) |
| Reply Error Handling | callNotFound()、Error インスタンス送信時の構造化レスポンス、setErrorHandler/setNotFoundHandler | [reply-errors.md](./reply-errors.md) |
| Reply Hijack, Trailers & Timing | hijack()/elapsedTime/raw/sent/trailer(s) | [reply-hijack-trailers.md](./reply-hijack-trailers.md) |
