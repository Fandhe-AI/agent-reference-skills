# Operations

各 SDK の基本的な操作コマンド集。接続確認・データ操作・メッセージ送受信など。

## @upstash/redis: 環境変数の設定

```sh
export UPSTASH_REDIS_REST_URL="https://<DB_NAME>.upstash.io"
export UPSTASH_REDIS_REST_TOKEN="<DB_TOKEN>"
```

## @upstash/redis: クライアントの初期化と接続確認（TypeScript）

```ts
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 環境変数から自動読み込み
const redis = Redis.fromEnv();
```

## @upstash/redis: SET コマンド

```ts
await redis.set("my-key", { my: "value" });
```

有効期限付き（60 秒）:

```ts
await redis.set("my-key", { my: "value" }, { ex: 60 });
```

キーが存在する場合のみ更新:

```ts
await redis.set("my-key", { my: "value" }, { xx: true });
```

## @upstash/redis: GET コマンド

```ts
const value = await redis.get("my-key");
```

## REST API 経由: curl による接続確認（PING）

```sh
curl https://<DB_NAME>.upstash.io/ping \
  -H "Authorization: Bearer <DB_TOKEN>"
```

## REST API 経由: curl による SET

```sh
curl https://<DB_NAME>.upstash.io/set/foo/bar \
  -H "Authorization: Bearer <DB_TOKEN>"
```

## REST API 経由: curl による GET

```sh
curl https://<DB_NAME>.upstash.io/get/foo \
  -H "Authorization: Bearer <DB_TOKEN>"
```

## REST API 経由: パイプライン（複数コマンドを1リクエストで送信）

```sh
curl https://<DB_NAME>.upstash.io/pipeline \
  -H "Authorization: Bearer <DB_TOKEN>" \
  -X POST \
  -d '[["SET","key1","value1"],["GET","key1"]]'
```

## @upstash/qstash: メッセージの送信

```ts
import { Client } from "@upstash/qstash";

const client = new Client({
  token: process.env.QSTASH_TOKEN,
});

const res = await client.publishJSON({
  url: "https://my-api.example.com/endpoint",
  body: {
    hello: "world",
  },
});
console.log(res);
// { messageId: "msg_xxxxxxxxxxxxxxxx" }
```

## @upstash/qstash: 受信メッセージの署名検証

```ts
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});

const isValid = await receiver.verify({
  signature: "<SIGNATURE_HEADER>",
  body: "<RAW_REQUEST_BODY>",
  url: "https://your-api.example.com/handler", // must match the JWT sub claim
});
```

## @upstash/vector: 環境変数の設定

```sh
export UPSTASH_VECTOR_REST_URL="your_rest_url"
export UPSTASH_VECTOR_REST_TOKEN="your_rest_token"
```

## @upstash/vector: インデックスの初期化

```ts
import { Index } from "@upstash/vector";

const index = new Index();
```

認証情報を直接渡す場合:

```ts
const index = new Index({
  url: "<UPSTASH_VECTOR_REST_URL>",
  token: "<UPSTASH_VECTOR_REST_TOKEN>",
});
```

## @upstash/ratelimit: レートリミッターの作成と確認

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

const { success } = await ratelimit.limit("api");
if (!success) {
  return "Unable to process at this time";
}
```

## @upstash/workflow: ワークフローの定義（Next.js App Router）

```ts
import { serve } from "@upstash/workflow/nextjs";

export const { POST } = serve(async (context) => {
  await context.run("initial-step", () => {
    console.log("initial step ran");
  });

  await context.run("second-step", () => {
    console.log("second step ran");
  });
});
```

## @upstash/workflow: ワークフローのトリガー

```ts
import { Client } from "@upstash/workflow";

const client = new Client({ token: process.env.QSTASH_TOKEN });

const { workflowRunId } = await client.trigger({
  url: "http://localhost:3000/api/workflow",
  retries: 3,
});
```

`trigger()` はサーバーサイドのコードから呼び出すこと。クライアントサイドから呼び出すと認証情報が漏洩する。
