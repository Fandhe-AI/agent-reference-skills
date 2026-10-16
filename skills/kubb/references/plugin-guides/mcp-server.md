# plugin-mcp: Server

型付き tool と HTTP クライアントを備えた MCP サーバーを生成して起動する。

## Signature / Usage

### Generate the server

`pluginMcp` と並べて TypeScript 型・Zod schema・Axios または Fetch クライアントを登録する。登録されたクライアントが 1 つなら自動検出される。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginMcp } from '@kubb/plugin-mcp'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs({ output: { path: 'types', mode: 'directory' } }),
    pluginZod(),
    pluginAxios({ baseURL: 'https://petstore.swagger.io/v2' }),
    pluginMcp({ output: { path: 'mcp', mode: 'directory' } }),
  ],
})
```

`kubb generate` を実行すると、tool ハンドラー・`server.ts`・`start.ts`・`.mcp.json` が出力される。各ハンドラーは HTTP operation を呼び、キャンセル signal を転送し、非 2xx で throw する。tool result はテキストコンテンツと構造化レスポンスデータを含む。`server.ts` は Zod の入出力 schema 付きで tool を登録し、`start.ts` が `startServer()` を呼んで stdio で提供する。

### Start the server

生成サーバーの runtime 依存と TypeScript ランナーをインストールする:

```shell
npm install @modelcontextprotocol/server@^2 zod@^4.2 axios@^1.20.0
npm install -D tsx
```

プロジェクトルートから生成エントリを実行する:

```shell
npx tsx src/gen/mcp/start.ts
```

サーバーは stdin から MCP メッセージを読み、起動時は何も出力せず、transport エラーを stderr に出す。停止は `Ctrl+C`。

### Connect a client

生成された `.mcp.json` は同じコマンドを実行する:

```json
{
  "mcpServers": {
    "Swagger Petstore": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "./src/gen/mcp/start.ts"]
    }
  }
}
```

### Use your own entry file

環境変数の読み込みなど先に処理を走らせたい場合は、生成された `server.ts` の `startServer` を自前エントリで import し、`args` を `start.ts` ではそのファイルに向ける。

```typescript
// mcp.ts
import { startServer } from './src/gen/mcp/server'

startServer()
```

### Select a client

両方の HTTP プラグインを登録する場合は [`client`](https://kubb.dev/extensions/kubb-labs/plugin-mcp/options#client) を明示する。生成ファイルが上書きされないよう、クライアントごとに出力ディレクトリを分ける:

```typescript
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginMcp } from '@kubb/plugin-mcp'

const clients = [
  pluginAxios({ output: { path: 'clients-axios', mode: 'directory' } }),
  pluginFetch({ output: { path: 'clients-fetch', mode: 'directory' } }),
  pluginMcp({ output: { path: 'mcp', mode: 'directory' }, client: 'axios' }),
]
```

## Notes

- サーバー名は OpenAPI spec の `info.title` から決まる
- MCP クライアントは自身の作業ディレクトリからコマンドを起動するため、`args` のパスは `.mcp.json` のフォルダーではなく Kubb の `root` 相対。Claude Code はプロジェクトルートの `.mcp.json` を読むので、`mcpServers` 配下のエントリをそのファイルへコピーする。Claude Desktop のように別フォルダーで起動するクライアントでは `start.ts` への絶対パスを使う
- 上の client 選択の配列は `defineConfig.plugins` に `pluginTs` / `pluginZod` と並べて追加する。ハンドラーは `clients-axios` から operation を import する
- Source: https://kubb.dev/extensions/kubb-labs/plugin-mcp/guides/server （`@kubb/plugin-mcp@5.2.3`）

## Related

- [plugin-mcp](../plugins/plugin-mcp.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [axios-calling-operations](./axios-calling-operations.md)
