# スナップショットテスト

## 基本

### toMatchSnapshot()

値をスナップショットファイル（`__snapshots__/` ディレクトリ）に保存し、次回以降の実行で比較する。

```ts
expect(result).toMatchSnapshot()
expect(result).toMatchSnapshot('optional hint')
```

### toMatchInlineSnapshot()

スナップショットをテストファイル内にインラインで保存する。初回実行時に Vitest が自動的にテストファイルを更新する。

```ts
expect({ a: 1, b: 2 }).toMatchInlineSnapshot(`
  {
    "a": 1,
    "b": 2,
  }
`)
```

### toMatchFileSnapshot()

指定ファイルパスとスナップショットを比較する（async）。HTML や JSON など構文ハイライトを活かしたい場合に有用。

```ts
await expect(htmlOutput).toMatchFileSnapshot('./snapshots/output.html')
```

## スナップショットの更新

```bash
# CLI フラグで更新
vitest run -u

# ウォッチモードでは 'u' キーを押す
```

### CI での挙動

`process.env.CI` が truthy の場合、スナップショットの書き込みは無効化される。
不一致・未作成・不要なスナップショットはテスト失敗になる。

## カスタムシリアライザ

```ts
expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    return `Pretty: ${printer(val.foo, config, indentation, depth, refs)}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
})
```

または `vitest.config.ts` の `snapshotSerializers` で設定:

```ts
export default defineConfig({
  test: {
    snapshotSerializers: ['./my-serializer.ts'],
  },
})
```

## エラースナップショット

```ts
expect(() => throwingFn()).toThrowErrorMatchingSnapshot()
expect(() => throwingFn()).toThrowErrorMatchingInlineSnapshot(`"error message"`)
```

## 関連

- [Expect マッチャー](../api/expect.md)
- [CLI](./cli.md)
