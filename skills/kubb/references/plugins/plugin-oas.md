# @kubb/plugin-oas

OpenAPI 仕様のパース・バリデーションを行う Kubb の基盤プラグイン。ほとんどの他プラグインがこのプラグインに依存する。

## インストール

```bash
npm install --save-dev @kubb/plugin-oas
```

## 設定オプション

### output

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'schemas'` | 生成ファイルの出力先パス |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` | バレルファイルのエクスポート制御 |
| `output.banner` | `string \| (oas: Oas) => string` | — | ファイル先頭のコメント |
| `output.footer` | `string \| (oas: Oas) => string` | — | ファイル末尾のコメント |
| `output.override` | `boolean` | `false` | 既存ファイルの上書き |

### group

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `group.type` | `'tag'` | — | グループ化の基準（group 定義時は必須） |
| `group.name` | `(context: GroupContext) => string` | `'${ctx.group}Controller'` | グループ名の生成関数 |

### バリデーション・サーバー

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `validate` | `boolean` | `true` | `@readme/openapi-parser` による入力バリデーション |
| `serverIndex` | `number` | — | `servers` 配列から使用するサーバーのインデックス |
| `serverVariables` | `Record<string, string>` | — | OpenAPI サーバー変数のオーバーライド |

### discriminator

- **型**: `'strict' \| 'inherit'`
- **デフォルト**: `'strict'`

discriminator の解釈方法:
- **strict**: `oneOf` スキーマをそのまま使用。discriminator は型の絞り込みのみ
- **inherit**: 子スキーマに discriminator プロパティと enum 値を追加

OpenAPI 3.0/3.1、`oneOf`/`anyOf`、インラインスキーマ、`$ref` 参照をサポート。

### その他

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `collisionDetection` | `boolean` | `false` | スキーマ間の名前衝突を解決（v5 でデフォルト化予定） |
| `contentType` | `'application/json' \| string` | — | コンテンツタイプの指定 |
| `oasClass` | `typeof Oas` | — | Oas クラスのオーバーライド |
| `generators` | `Generator[]` | — | カスタムジェネレーター（空配列でスキーマ生成を無効化） |

## 設定例

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginOas({
      validate: true,
      output: { path: './json' },
      serverIndex: 0,
      contentType: 'application/json',
      collisionDetection: true,
    }),
  ],
})
```

## discriminator の例（inherit モード）

```typescript
// 生成結果
export type Cat = {
  type: CatTypeEnum
  name?: string
  indoor: boolean
}

export type Dog = {
  type: DogTypeEnum
  name: string
}
```
