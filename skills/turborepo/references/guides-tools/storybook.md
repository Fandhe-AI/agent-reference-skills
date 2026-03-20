# Storybook

## テンプレートから開始

```bash
pnpm dlx create-turbo@latest -e design-system
```

## キャッシュ設定

```json
{ "tasks": { "build": { "outputs": ["storybook-static/**"] } } }
```

`.gitignore` に `storybook-static` を追加。

## Co-Located Stories パターン

大規模デザインシステムで推奨。ストーリーをソースパッケージ内に配置:

1. `.storybook/main.ts` でストーリーのパスをソースパッケージへ向ける
2. ストーリーファイルを本番ビルドの `inputs` から除外してキャッシュを維持

## スタイルの統合

CSS は `.storybook/preview.ts` で手動インポートが必要。
