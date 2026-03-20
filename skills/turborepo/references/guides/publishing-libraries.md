# ライブラリの公開

## ビルド設定（tsup）

```json
{ "scripts": { "build": "tsup src/index.ts --format cjs,esm --dts" } }
```

## キャッシュ設定

```json
{ "tasks": { "build": { "outputs": ["dist/**"] } } }
```

## パッケージエントリーポイント

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts"
}
```

## バージョン管理と公開（Changesets）

| コマンド | 説明 |
|---|---|
| `changeset` | 新しい changeset を追加 |
| `changeset version` | 新しいバージョンを作成 |
| `changeset publish` | npm に公開 |

```json
{
  "scripts": {
    "publish-packages": "turbo run build lint test && changeset version && changeset publish"
  }
}
```

スクリプト名を `publish` ではなく `publish-packages` にして npm ビルトインとの競合を防ぐ。

## 代替ツール

- intuit/auto — PR ラベルに基づいたリリース生成
- microsoft/beachball — セマンティックバージョン管理
