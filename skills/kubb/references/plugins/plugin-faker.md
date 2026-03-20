# @kubb/plugin-faker

OpenAPI スキーマから Faker.js モックデータジェネレーターを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-faker
```

## 設定オプション

### output

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `output.path` | `string` | `'mocks'` |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — |
| `output.override` | `boolean` | `false` |

### データ生成オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `dateType` | `'string' \| 'date'` | `'string'` | 日付フィールドの型（Date vs ISO文字列） |
| `dateParser` | `'faker' \| 'dayjs' \| 'moment' \| string` | `'faker'` | 日付フォーマットライブラリ |
| `regexGenerator` | `'faker' \| 'randexp'` | `'faker'` | 正規表現文字列生成ライブラリ |
| `seed` | `number` | — | テスト用の固定シード値 |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'any'` | 不明な型のフォールバック |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` の値 | 空スキーマの型 |

### その他

| オプション | 型 | デフォルト |
|-----------|-----|----------|
| `mapper` | `Record<string, string>` | — |
| `paramsCasing` | `'camelcase'` | — |
| `contentType` | `'application/json' \| string` | — |
| `group.type` | `'tag'` | — |
| `include` / `exclude` | `Array<{type, pattern}>` | — |
| `override` | `Array<{type, pattern, options}>` | — |
| `transformers.name` | `(name, type?) => string` | — |
| `generators` | `Generator[]` | — |

### dateParser の例

```typescript
// dateParser: 'dayjs', dateType: 'string'
dayjs(faker.date.anytime()).format("YYYY-MM-DD")

// dateType: 'date'
faker.date.anytime()
```

## 設定例

```typescript
pluginFaker({
  output: { path: './mocks', barrelType: 'named' },
  group: { type: 'tag', name: ({ group }) => `${group}Service` },
  dateType: 'date',
  seed: [100],
})
```
