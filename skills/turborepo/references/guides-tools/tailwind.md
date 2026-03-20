# Tailwind CSS

## クイックスタート

```bash
pnpm dlx create-turbo@latest -e with-tailwind
```

## アーキテクチャ

### 共有 Tailwind 設定パッケージ

```css
/* packages/tailwind-config/shared-styles.css */
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
}
```

### UI パッケージ

`ui:` プレフィックスを付けてスタイル優先度の競合を防ぐ:

```html
<button class="ui:bg-blue-500 ui:text-white">Button</button>
```

## ベストプラクティス

スタイルビルドとコンポーネントビルドを別タスクに分離し、並列実行しつつ依存関係を正しく管理する。
