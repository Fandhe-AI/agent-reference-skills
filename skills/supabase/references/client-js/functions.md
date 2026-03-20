# Functions

Supabase Edge Functions の呼び出しメソッド群。Deno ベースのサーバーレス関数を実行する。

## メソッド一覧

### `invoke()`

Edge Function を呼び出す。

**Signature:**
```typescript
supabase.functions.invoke<T = any>(
  functionName: string,
  options?: {
    body?: any;
    headers?: Record<string, string>;
    method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
    region?: FunctionRegion;
  }
): Promise<{ data: T | null, error: FunctionsHttpError | FunctionsRelayError | FunctionsFetchError | null }>
```

**Usage:**
```typescript
// 基本的な呼び出し
const { data, error } = await supabase.functions.invoke('hello-world')

// JSON ボディ付き
const { data, error } = await supabase.functions.invoke('process-order', {
  body: {
    orderId: '123',
    items: ['item-a', 'item-b'],
  },
})

// カスタムヘッダ付き
const { data, error } = await supabase.functions.invoke('protected-function', {
  headers: {
    'x-custom-header': 'custom-value',
  },
  body: { key: 'value' },
})

// GET メソッド
const { data, error } = await supabase.functions.invoke('get-status', {
  method: 'GET',
})

// リージョン指定
const { data, error } = await supabase.functions.invoke('nearby-function', {
  body: { query: 'test' },
  region: 'ap-northeast-1',
})

// FormData の送信
const formData = new FormData()
formData.append('file', file)
const { data, error } = await supabase.functions.invoke('upload', {
  body: formData,
})

// ストリーミングレスポンス
const { data, error } = await supabase.functions.invoke('stream', {
  body: { prompt: 'Hello' },
})
if (data) {
  const reader = data.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    console.log(new TextDecoder().decode(value))
  }
}
```

**Parameters:**
- `functionName` (string) — 呼び出す Edge Function の名前
- `options.body` (any) — リクエストボディ。オブジェクトの場合は自動で JSON にシリアライズ。`FormData` / `Blob` / `ArrayBuffer` / `string` も可
- `options.headers` (Record<string, string>) — カスタムリクエストヘッダ（省略可）
- `options.method` (string) — HTTP メソッド（デフォルト: `'POST'`）
- `options.region` (FunctionRegion) — 実行リージョン（省略可）

**Returns:** `{ data: T | null, error }`

---

### `setAuth()`

Functions の呼び出しに使用する認証トークンを設定する。

**Signature:**
```typescript
supabase.functions.setAuth(token: string): void
```

**Usage:**
```typescript
supabase.functions.setAuth('custom-jwt-token')
```

**Parameters:**
- `token` (string) — JWT トークン

**Returns:** `void`

---

## エラータイプ

### `FunctionsHttpError`

Edge Function が 4xx/5xx ステータスコードを返した場合。

```typescript
const { data, error } = await supabase.functions.invoke('my-function', {
  body: { key: 'value' },
})

if (error instanceof FunctionsHttpError) {
  const errorMessage = await error.context.json()
  console.log('Function returned an error:', errorMessage)
}
```

### `FunctionsRelayError`

Supabase Relay（プロキシ）でエラーが発生した場合。

```typescript
if (error instanceof FunctionsRelayError) {
  console.log('Relay error:', error.message)
}
```

### `FunctionsFetchError`

ネットワークエラーなどで関数に到達できなかった場合。

```typescript
if (error instanceof FunctionsFetchError) {
  console.log('Fetch error:', error.message)
}
```

---

## レスポンスの型

```typescript
// JSON レスポンス
const { data, error } = await supabase.functions.invoke<{ result: string }>('my-function')
// data の型: { result: string } | null

// Blob レスポンス（ファイルダウンロード等）
const { data, error } = await supabase.functions.invoke('generate-pdf', {
  body: { reportId: '123' },
})
// Edge Function 側で Content-Type を適切に設定すると data は Blob になる

// ReadableStream レスポンス（ストリーミング）
const { data, error } = await supabase.functions.invoke('stream-response')
// Edge Function 側で ReadableStream を返すと data は ReadableStream になる
```

---

## エラーハンドリング例

```typescript
import { FunctionsHttpError, FunctionsRelayError, FunctionsFetchError } from '@supabase/supabase-js'

const { data, error } = await supabase.functions.invoke('my-function', {
  body: { key: 'value' },
})

if (error) {
  if (error instanceof FunctionsHttpError) {
    // Edge Function がエラーレスポンスを返した
    const errorData = await error.context.json()
    console.error('Function error:', errorData)
  } else if (error instanceof FunctionsRelayError) {
    // Relay エラー（タイムアウト等）
    console.error('Relay error:', error.message)
  } else if (error instanceof FunctionsFetchError) {
    // ネットワークエラー
    console.error('Network error:', error.message)
  }
} else {
  console.log('Success:', data)
}
```

---

## CORS 設定

Edge Function 側で CORS ヘッダを設定する必要がある。

```typescript
// Edge Function 内（Deno）
Deno.serve(async (req) => {
  // CORS preflight 対応
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  const { name } = await req.json()

  return new Response(JSON.stringify({ message: `Hello ${name}!` }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
})
```

---

## 注意点
- `invoke()` はデフォルトで現在のセッションの JWT を `Authorization` ヘッダに自動付与する
- `body` にオブジェクトを渡すと自動で `Content-Type: application/json` が設定される
- `FormData` を渡す場合は `Content-Type` を手動設定しない（ブラウザが自動で `multipart/form-data` を設定）
- Edge Function のタイムアウトはプランにより異なる（Free: 150秒、Pro: 400秒）
- ストリーミングレスポンスを受け取るには、Edge Function 側で `ReadableStream` を返す必要がある
- `region` を指定すると、特定リージョンの Edge Function を呼び出せる
- CORS エラーが発生する場合は、Edge Function 側で適切なヘッダを設定する

## 関連
- [Initialization](./initialization.md)
- [Auth](./auth.md)
