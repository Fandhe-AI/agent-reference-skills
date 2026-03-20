# リポジトリの構造化

## 推奨ディレクトリ構成

```
apps/       # アプリケーション・サービス
packages/   # ライブラリ・ツール設定
turbo.json
package.json
```

## 最低限必要なもの

1. パッケージマネージャーのワークスペース定義
2. ロックファイル
3. ルート `package.json`
4. ルート `turbo.json`
5. 各パッケージの `package.json`

## ワークスペース定義

**pnpm** (`pnpm-workspace.yaml`):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**npm / yarn / bun** (ルート `package.json`):
```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

## exports フィールド

```json
{
  "exports": {
    ".": "./src/constants.ts",
    "./add": "./src/add.ts",
    "./subtract": "./src/subtract.ts"
  }
}
```

バレルファイルを避け、条件付きエクスポートが可能。IDE の自動補完が効く。

## 制約

- ネストしたパッケージは非対応（`apps/**` は不可）
- ロックファイル必須
- パッケージ名には名前空間プレフィックス推奨（例: `@acme/name`）
- パッケージ間を相対パス（`../`）でアクセスしない
