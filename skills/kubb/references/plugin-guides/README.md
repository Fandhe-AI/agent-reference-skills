# plugin-guides

| Name | Description | Path |
|------|-------------|------|
| plugin-axios: Authentication | 生成クライアントに `auth` resolver を設定する。operation は OpenAPI の security scheme を使い… | [axios-authentication.md](./axios-authentication.md) |
| plugin-axios: Base URL | `baseURL` をクライアントプラグインまたは生成クライアントに設定する。 | [axios-base-url.md](./axios-base-url.md) |
| plugin-axios: Calling operations | 生成クライアントは各 operation でグループ化されたリクエストオプションを受け取り、既定で型付き… | [axios-calling-operations.md](./axios-calling-operations.md) |
| plugin-axios: Error handling | 生成クライアントの失敗を扱う。`ResponseError` を catch する、`throwOnError` でエラー結果の… | [axios-error-handling.md](./axios-error-handling.md) |
| plugin-axios: Interceptors | `client.interceptors.request` / `.response` / `.error` にハンドラーを登録し、呼び出し全体に… | [axios-interceptors.md](./axios-interceptors.md) |
| plugin-axios: Serialization | 生成クライアントは OpenAPI の `style` / `explode` でパラメーターをエンコードし、content type… | [axios-serialization.md](./axios-serialization.md) |
| plugin-axios: Server-sent events | `text/event-stream` を返す operation は `RequestResult` ではなく型付きストリームを返す。 | [axios-server-sent-events.md](./axios-server-sent-events.md) |
| plugin-axios: Transport | 実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築… | [axios-transport.md](./axios-transport.md) |
| plugin-client: Authentication | 認証は自前の `client` 内にある。`@kubb/plugin-client` は資格情報を送らず、各 operation が… | [client-authentication.md](./client-authentication.md) |
| plugin-client: Calling operations | 各生成関数はグループ化された 1 つのオプションオブジェクトを受け取り、client の promise を返す。 | [client-calling-operations.md](./client-calling-operations.md) |
| plugin-client: Validate requests and responses | `@kubb/plugin-client` 自体は検証しない。`validator` を設定すると schema を自前 client に渡し… | [client-validate-requests-and-responses.md](./client-validate-requests-and-responses.md) |
| plugin-client: Write your client | 生成関数は `importPath` 経由で自前モジュールを import する。そのモジュールが生成関数の呼ぶ唯一の… | [client-write-your-client.md](./client-write-your-client.md) |
| plugin-fetch: Authentication | 生成クライアントに `auth` resolver を設定する。operation は OpenAPI の security scheme を使い… | [fetch-authentication.md](./fetch-authentication.md) |
| plugin-fetch: Base URL | `baseURL` をクライアントプラグインまたは生成クライアントに設定する。 | [fetch-base-url.md](./fetch-base-url.md) |
| plugin-fetch: Calling operations | 生成クライアントは各 operation でグループ化されたリクエストオプションを受け取り、既定で型付き… | [fetch-calling-operations.md](./fetch-calling-operations.md) |
| plugin-fetch: Error handling | 生成クライアントの失敗を扱う。`ResponseError` を catch する、`throwOnError` でエラー結果の… | [fetch-error-handling.md](./fetch-error-handling.md) |
| plugin-fetch: Interceptors | `client.interceptors.request` / `.response` / `.error` にハンドラーを登録し、呼び出し全体に… | [fetch-interceptors.md](./fetch-interceptors.md) |
| plugin-fetch: Serialization | 生成クライアントは OpenAPI の `style` / `explode` でパラメーターをエンコードし、content type… | [fetch-serialization.md](./fetch-serialization.md) |
| plugin-fetch: Server-sent events | `text/event-stream` を返す operation は `RequestResult` ではなく型付きストリームを返す。 | [fetch-server-sent-events.md](./fetch-server-sent-events.md) |
| plugin-fetch: Transport | 実行時に transport を設定して、ネットワーク送信を置き換える。クライアントは引き続き URL 構築… | [fetch-transport.md](./fetch-transport.md) |
| plugin-mcp: Server | 型付き tool と HTTP クライアントを備えた MCP サーバーを生成して起動する。 | [mcp-server.md](./mcp-server.md) |
| plugin-msw: Mock API | 生成された MSW ハンドラーを設定し、テストまたはブラウザー worker に登録する。 | [msw-mock-api.md](./msw-mock-api.md) |
| plugin-react-query: Calling operations | `@kubb/plugin-react-query` は operation ごとに型付き TanStack Query フックを生成できる。 | [react-query-calling-operations.md](./react-query-calling-operations.md) |
| plugin-swr: Calling operations | `@kubb/plugin-swr` は operation ごとに型付き SWR フックを生成する。 | [swr-calling-operations.md](./swr-calling-operations.md) |
| plugin-ts: Customization | 生成される型をカスタマイズする。TypeScript の名前に prefix を付ける、schema 型の出力を変える… | [ts-customization.md](./ts-customization.md) |
| plugin-vue-query: Calling operations | `@kubb/plugin-vue-query` は operation ごとに型付き TanStack Query composable を生成できる。 | [vue-query-calling-operations.md](./vue-query-calling-operations.md) |
| plugin-zod: Customization | 生成される schema をカスタマイズする。inferred 型に prefix を付ける、Zod validator を変える… | [zod-customization.md](./zod-customization.md) |
