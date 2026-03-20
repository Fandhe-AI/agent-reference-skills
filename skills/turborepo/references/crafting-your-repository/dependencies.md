# 依存関係の管理

## 内部パッケージの依存宣言

**pnpm / bun**: `"@repo/ui": "workspace:*"`
**npm / yarn**: `"@repo/ui": "*"`

## 複数パッケージへの一括インストール

```bash
# pnpm
pnpm add jest --save-dev --recursive --filter=web --filter=@repo/ui

# npm
npm install jest --workspace=web --workspace=@repo/ui --save-dev

# yarn (2+)
yarn workspaces foreach -R --from '{web,@repo/ui}' add jest --dev
```

## ベストプラクティス

- **使う場所にインストール**: 依存関係は使用するパッケージの `package.json` に直接書く
- **ルートには管理ツールのみ**: turbo / husky / lint-staged 等
- Turborepo は依存関係の管理自体には関与しない（パッケージマネージャーの仕事）

## バージョン統一ツール

- `syncpack`, `manypkg`, `sherif` 等の専用ツール
- pnpm v9.5+ の **catalogs** 機能
