# Test API

## describe

テストスイートを定義する。ネスト可能。

```ts
describe(name: string, fn: () => void, timeout?: number): void
```

```ts
describe('math utils', () => {
  it('adds numbers', () => {
    expect(1 + 1).toBe(2)
  })

  describe('edge cases', () => {
    it('handles zero', () => {
      expect(0 + 0).toBe(0)
    })
  })
})
```

### describe のモディファイア

| Modifier | Description |
|----------|-------------|
| `describe.only` | このスイートのみ実行 |
| `describe.skip` | スキップ |
| `describe.todo` | 未実装マーク |
| `describe.concurrent` | 内部テストを並列実行 |
| `describe.sequential` | concurrent コンテキスト内で順次実行を強制 |
| `describe.shuffle` | ランダム順で実行 |
| `describe.each(table)` | テーブル駆動でスイートを繰り返し |

```ts
describe.each([
  { input: 1, expected: 2 },
  { input: 2, expected: 4 },
])('double($input)', ({ input, expected }) => {
  it(`returns ${expected}`, () => {
    expect(input * 2).toBe(expected)
  })
})
```

## test / it

個別のテストケースを定義する。`it` は `test` のエイリアス。

```ts
test(name: string, fn?: () => void | Promise<void>, timeout?: number): void
```

```ts
test('returns correct value', () => {
  expect(sum(1, 2)).toBe(3)
})

test('async test', async () => {
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

### test のオプション

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeout` | `number` | `5000` | タイムアウト（ms） |
| `retry` | `number` | `0` | 失敗時のリトライ回数 |
| `repeats` | `number` | `0` | テストの繰り返し回数 |
| `concurrent` | `boolean` | `false` | 並列実行 |
| `sequential` | `boolean` | `true` | 順次実行 |
| `tags` | `string[]` | `[]` | テストタグ |

### test のモディファイア

| Modifier | Description |
|----------|-------------|
| `test.only` | このテストのみ実行（CI では使用禁止エラー） |
| `test.skip` | スキップ |
| `test.todo` | 未実装マーク（body 不要） |
| `test.fails` | テストが失敗することを期待 |
| `test.concurrent` | 並列実行 |
| `test.sequential` | concurrent スイート内で順次実行 |
| `test.skipIf(condition)` | 条件が truthy ならスキップ |
| `test.runIf(condition)` | 条件が truthy の場合のみ実行 |

### test.each（テーブル駆動テスト）

配列またはテンプレートリテラルを受け取る。

```ts
test.each([
  [1, 1, 2],
  [2, 3, 5],
  [0, 0, 0],
])('add(%i, %i) = %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
```

フォーマット指定子: `%s`（文字列）, `%d`（数値）, `%i`（整数）, `%f`（浮動小数点）, `%j`（JSON）, `%#`（インデックス）, `%$`（テスト番号）

### test.for

`test.each` の代替。配列引数をスプレッドせず、TestContext にアクセス可能。

```ts
test.for([
  { a: 1, b: 1, expected: 2 },
  { a: 2, b: 3, expected: 5 },
])('add($a, $b) = $expected', ({ a, b, expected }, { expect }) => {
  expect(a + b).toBe(expected)
})
```

### test.extend（フィクスチャ）

テストコンテキストにカスタムフィクスチャを追加する。

```ts
const myTest = test.extend<{ db: Database }>({
  db: async ({}, use) => {
    const db = await createTestDb()
    await use(db)
    await db.cleanup()
  },
})

myTest('uses fixture', ({ db }) => {
  expect(db).toBeDefined()
})
```

## ライフサイクルフック

```ts
beforeAll(fn: () => void | Promise<void>, timeout?: number): void
afterAll(fn: () => void | Promise<void>, timeout?: number): void
beforeEach(fn: () => void | Promise<void>, timeout?: number): void
afterEach(fn: () => void | Promise<void>, timeout?: number): void
```

```ts
describe('database tests', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('queries data', async () => {
    const result = await db.query('SELECT 1')
    expect(result).toBeDefined()
  })
})
```

### フックの実行順序

- `beforeEach`: 外側 → 内側
- `afterEach`: 内側 → 外側
- トップレベル（`describe` 外）のフックはファイル内の全テストに適用

## 関連

- [Expect マッチャー](./expect.md)
- [Vi ユーティリティ](./vi.md)
