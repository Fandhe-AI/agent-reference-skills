# Edge Functions テスト

Edge Functions のユニットテストとローカルテストの方法。

## 概要

Edge Functions のテストには主に 2 つのアプローチがある。(1) `Deno.test` を使ったユニットテスト、(2) `supabase functions serve` でローカルサーバーを起動しての統合テスト。Deno の組み込みテストランナーを使って、アサーション、モック、テストヘルパーを活用できる。

### テスト戦略

- **ユニットテスト**: ビジネスロジックを関数として切り出し、`Deno.test` でテスト
- **統合テスト**: `supabase functions serve` でローカルサーバーを起動し、HTTP リクエストでテスト
- **E2E テスト**: デプロイ済み関数に対してリクエストを送信してテスト

## コード例

### ユニットテスト（Deno.test）

```typescript
// supabase/functions/tests/hello-world_test.ts
import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts'

// テスト対象のビジネスロジック
function greet(name: string): string {
  return `Hello ${name}!`
}

Deno.test('greet returns correct message', () => {
  assertEquals(greet('World'), 'Hello World!')
  assertEquals(greet('Supabase'), 'Hello Supabase!')
})

Deno.test('greet handles empty string', () => {
  assertEquals(greet(''), 'Hello !')
})
```

### ビジネスロジックの分離

```typescript
// supabase/functions/_shared/business-logic.ts
export function calculateDiscount(price: number, percentage: number): number {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100')
  }
  return price * (1 - percentage / 100)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

```typescript
// supabase/functions/tests/business-logic_test.ts
import { assertEquals, assertThrows } from 'https://deno.land/std@0.208.0/assert/mod.ts'
import { calculateDiscount, validateEmail } from '../_shared/business-logic.ts'

Deno.test('calculateDiscount applies correct discount', () => {
  assertEquals(calculateDiscount(100, 10), 90)
  assertEquals(calculateDiscount(200, 50), 100)
  assertEquals(calculateDiscount(100, 0), 100)
})

Deno.test('calculateDiscount throws for invalid percentage', () => {
  assertThrows(
    () => calculateDiscount(100, -1),
    Error,
    'Percentage must be between 0 and 100',
  )
  assertThrows(
    () => calculateDiscount(100, 101),
    Error,
    'Percentage must be between 0 and 100',
  )
})

Deno.test('validateEmail validates correctly', () => {
  assertEquals(validateEmail('user@example.com'), true)
  assertEquals(validateEmail('invalid-email'), false)
  assertEquals(validateEmail(''), false)
})
```

### テストの実行

```bash
# 特定のテストファイルを実行
deno test supabase/functions/tests/business-logic_test.ts

# tests ディレクトリ内のすべてのテストを実行
deno test supabase/functions/tests/

# 環境変数を設定してテスト
deno test --env=supabase/.env.local supabase/functions/tests/
```

### 統合テスト（ローカルサーバー経由）

```typescript
// supabase/functions/tests/integration_test.ts
import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts'

const FUNCTION_URL = 'http://localhost:54321/functions/v1'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // ローカルの anon key

Deno.test('hello-world function returns greeting', async () => {
  const response = await fetch(`${FUNCTION_URL}/hello-world`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify({ name: 'Test' }),
  })

  assertEquals(response.status, 200)

  const data = await response.json()
  assertEquals(data.message, 'Hello Test!')
})

Deno.test('hello-world returns 401 without auth', async () => {
  const response = await fetch(`${FUNCTION_URL}/hello-world`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Test' }),
  })

  assertEquals(response.status, 401)
})
```

### モック（外部 API のスタブ）

```typescript
// supabase/functions/tests/with-mock_test.ts
import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts'
import { stub } from 'https://deno.land/std@0.208.0/testing/mock.ts'

Deno.test('fetches and processes data', async () => {
  // globalThis.fetch をモック
  const fetchStub = stub(
    globalThis,
    'fetch',
    () =>
      Promise.resolve(
        new Response(JSON.stringify({ id: 1, name: 'test' }), {
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
  )

  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()

    assertEquals(data.id, 1)
    assertEquals(data.name, 'test')
  } finally {
    fetchStub.restore()
  }
})
```

### deno.json テスト設定

```json
{
  "test": {
    "include": ["tests/"],
    "exclude": ["tests/fixtures/"]
  },
  "imports": {
    "@std/assert": "https://deno.land/std@0.208.0/assert/mod.ts",
    "@std/testing": "https://deno.land/std@0.208.0/testing/mod.ts"
  }
}
```

## 注意点

- `Deno.test` は Deno 組み込みのテストランナーで、追加のインストールは不要
- 統合テストを実行する前に `supabase start` と `supabase functions serve` を起動すること
- ビジネスロジックを HTTP ハンドラから分離すると、テストが容易になる
- `--allow-net` フラグが必要な場合がある（`deno test --allow-net`）
- `Deno.env.get()` をテスト内で使う場合、`--env` フラグで `.env` ファイルを指定する
- `_shared/` ディレクトリのコードは直接テスト可能
- CI/CD でのテスト実行も可能（GitHub Actions 等）

## 関連

- [クイックスタート](./quickstart.md)
- [デバッグ](./debugging.md)
- [デプロイ](./deploy.md)
- [ルーティング](./routing.md)
