# @kubb/plugin-faker

OpenAPI スキーマから Faker.js モックデータジェネレーターを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-faker
```

## 設定オプション（v5）

`dateType` / `unknownType` / `emptySchemaType` は `adapterOas` に移動した。`mapper` / `paramsCasing` / `contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。`locale` が新設された。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'mocks' }` | 出力先パス |
| `group` | `Group` | — | tag / path によるフォルダー分割 |
| `dateParser` | `'faker' \| 'dayjs' \| 'moment' \| string` | `'faker'` | 日付フォーマットライブラリ |
| `regexGenerator` | `'faker' \| 'randexp'` | `'faker'` | 正規表現文字列生成ライブラリ |
| `locale` | `string` | `'en'` | 生成値の Faker ロケールコード |
| `seed` | `number \| number[]` | — | `faker.seed(...)` に渡す固定シード値 |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverFaker>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterFakerNodes }` | — | スキーマ種別ごとのハンドラー差し替え |

### dateParser の例

```typescript
// dateParser: 'dayjs'（日付フィールドの型は adapterOas の dateType に従う）
dayjs(faker.date.anytime()).format("YYYY-MM-DD")

// adapterOas の dateType: 'date' を使う場合
faker.date.anytime()
```

## 設定例

```typescript
pluginFaker({
  output: { path: './mocks' },
  group: { type: 'tag', name: ({ group }) => `${group}Service` },
  dateParser: 'dayjs',
  locale: 'en',
  seed: [100],
})
```
