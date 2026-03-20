# 単一パッケージワークスペース

`create-next-app` や `npm create vite` で生成される単一アプリケーション構造でも Turborepo を活用できる。

## 利用可能な機能

- ローカルキャッシング
- リモートキャッシング
- タスクの並列化

## 利用不可能な機能

- パッケージ間タスク（`app#build` のような指定）

## シナリオ 1: タスクの順次実行

```json
{
  "tasks": {
    "dev": { "dependsOn": ["db:seed"], "persistent": true },
    "db:seed": { "dependsOn": ["db:push"] },
    "db:push": {}
  }
}
```

実行順序: `db:push` → `db:seed` → `dev`

## シナリオ 2: タスクの並列実行

```bash
turbo check-types lint format
```

## シナリオ 3: キャッシュ入力の最適化

```json
{
  "tasks": {
    "check-types": { "inputs": ["**/*.{ts,tsx}"] }
  }
}
```
