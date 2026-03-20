# Expect マッチャー

`expect(value)` でアサーションラッパーを作成し、マッチャーをチェーンする。
`.not` でマッチャーを否定できる。

## 等値マッチャー

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | `Object.is` による厳密等値。プリミティブ・参照比較向き |
| `toEqual(value)` | 再帰的な構造等値。`undefined` プロパティは無視 |
| `toStrictEqual(value)` | `toEqual` + `undefined` プロパティ・配列の疎密・オブジェクト型も検査 |
| `toMatchObject(subset)` | オブジェクトが指定サブセットのプロパティを持つか検査 |

```ts
expect(1 + 1).toBe(2)
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
```

## 型・値マッチャー

| Matcher | Description |
|---------|-------------|
| `toBeTruthy()` | truthy な値 |
| `toBeFalsy()` | falsy な値 |
| `toBeNull()` | `null` |
| `toBeUndefined()` | `undefined` |
| `toBeDefined()` | `undefined` でない |
| `toBeNaN()` | `NaN` |
| `toBeInstanceOf(Class)` | 指定クラスのインスタンス |

## 数値マッチャー

| Matcher | Description |
|---------|-------------|
| `toBeGreaterThan(n)` | `value > n` |
| `toBeGreaterThanOrEqual(n)` | `value >= n` |
| `toBeLessThan(n)` | `value < n` |
| `toBeLessThanOrEqual(n)` | `value <= n` |
| `toBeCloseTo(n, precision?)` | 浮動小数点の近似比較（デフォルト精度 2 桁） |

## コレクションマッチャー

| Matcher | Description |
|---------|-------------|
| `toContain(item)` | 配列にアイテムを含む / 文字列に部分文字列を含む |
| `toContainEqual(item)` | 配列に構造的に等しいアイテムを含む（`toEqual` ロジック） |
| `toHaveLength(n)` | `.length === n` |
| `toHaveProperty(keyPath, value?)` | プロパティの存在確認（ドット記法・配列パス対応） |

```ts
expect([1, 2, 3]).toContain(2)
expect([{ id: 1 }, { id: 2 }]).toContainEqual({ id: 1 })
expect({ user: { name: 'Alice' } }).toHaveProperty('user.name', 'Alice')
```

## 文字列マッチャー

| Matcher | Description |
|---------|-------------|
| `toMatch(pattern)` | 正規表現または部分文字列にマッチ |

```ts
expect('hello world').toMatch(/world/)
expect('hello world').toMatch('world')
```

## エラーマッチャー

| Matcher | Description |
|---------|-------------|
| `toThrow(error?)` | 関数が例外をスローする（メッセージ/クラスで検証可能） |
| `toThrowError(error?)` | `toThrow` のエイリアス |

```ts
expect(() => JSON.parse('{')).toThrow(SyntaxError)
expect(() => fn()).toThrow('expected message')
expect(() => fn()).toThrow(/pattern/)
```

## スナップショットマッチャー

| Matcher | Description |
|---------|-------------|
| `toMatchSnapshot(hint?)` | 保存済みスナップショットと比較。初回は作成 |
| `toMatchInlineSnapshot(snapshot?)` | テストファイル内にインラインでスナップショット保存 |
| `toMatchFileSnapshot(filepath)` | 指定ファイルとスナップショット比較（async） |
| `toThrowErrorMatchingSnapshot(hint?)` | `toThrow` + `toMatchSnapshot` |
| `toThrowErrorMatchingInlineSnapshot(snapshot?)` | `toThrow` + `toMatchInlineSnapshot` |

```ts
expect({ a: 1 }).toMatchSnapshot()

expect({ a: 1 }).toMatchInlineSnapshot(`
  {
    "a": 1,
  }
`)
```

## モック/スパイマッチャー

| Matcher | Description |
|---------|-------------|
| `toHaveBeenCalled()` | 1回以上呼ばれた |
| `toHaveBeenCalledTimes(n)` | ちょうど n 回呼ばれた |
| `toHaveBeenCalledWith(...args)` | 指定引数で呼ばれた（任意の呼び出し） |
| `toHaveBeenCalledExactlyOnceWith(...args)` | 1回だけ指定引数で呼ばれた |
| `toHaveBeenLastCalledWith(...args)` | 最後の呼び出しが指定引数 |
| `toHaveBeenNthCalledWith(n, ...args)` | n 番目の呼び出しが指定引数（1始まり） |
| `toHaveReturned()` | 1回以上正常にリターンした |
| `toHaveReturnedTimes(n)` | ちょうど n 回リターンした |
| `toHaveReturnedWith(value)` | 指定値をリターンした |
| `toHaveLastReturnedWith(value)` | 最後のリターン値が一致 |
| `toHaveNthReturnedWith(n, value)` | n 番目のリターン値が一致 |

```ts
const fn = vi.fn(() => 42)
fn('hello')
expect(fn).toHaveBeenCalledWith('hello')
expect(fn).toHaveReturnedWith(42)
```

## 非同期マッチャー

| Modifier | Description |
|----------|-------------|
| `resolves` | Promise の解決値をアンラップ（`await` 必須） |
| `rejects` | Promise の拒否理由をアンラップ（`await` 必須） |

```ts
await expect(Promise.resolve(42)).resolves.toBe(42)
await expect(Promise.reject(new Error('fail'))).rejects.toThrow('fail')
```

## アサーション制御

| Method | Description |
|--------|-------------|
| `expect.assertions(n)` | テスト内でちょうど n 個のアサーションが実行されることを検証 |
| `expect.hasAssertions()` | 少なくとも 1 つのアサーションが実行されることを検証 |
| `expect.unreachable(msg?)` | 到達すべきでないコードパス（到達時に失敗） |

```ts
test('async callback is called', async () => {
  expect.assertions(1)
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

## ソフトアサーション

```ts
expect.soft(a).toBe(1)  // 失敗してもテスト続行
expect.soft(b).toBe(2)  // 全失敗をまとめて報告
```

## poll（リトライアサーション）

```ts
await expect.poll(() => fetchStatus()).toBe('ready')
// デフォルト: interval 50ms, timeout 1000ms
await expect.poll(() => count, { interval: 100, timeout: 5000 }).toBeGreaterThan(10)
```

## 非対称マッチャー

`toEqual` / `toMatchObject` 内で使用可能。

| Matcher | Description |
|---------|-------------|
| `expect.anything()` | `null` / `undefined` 以外の任意の値 |
| `expect.any(Class)` | 指定クラスのインスタンス |
| `expect.arrayContaining(items)` | 指定アイテムを全て含む配列 |
| `expect.objectContaining(obj)` | 指定プロパティを含むオブジェクト |
| `expect.stringContaining(str)` | 部分文字列を含む文字列 |
| `expect.stringMatching(pattern)` | 正規表現にマッチする文字列 |
| `expect.closeTo(n, precision?)` | 浮動小数点の近似マッチ |

```ts
expect({ id: 1, name: 'Alice', createdAt: new Date() }).toEqual({
  id: expect.any(Number),
  name: expect.stringContaining('Ali'),
  createdAt: expect.any(Date),
})

expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 3]))
```

## 関連

- [Test API](./test-api.md)
- [Vi ユーティリティ](./vi.md)
- [モックパターン](../patterns/mocking.md)
