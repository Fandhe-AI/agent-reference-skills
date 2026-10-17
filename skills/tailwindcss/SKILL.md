---
name: tailwindcss
description: >
  Tailwind CSS (ユーティリティファースト CSS フレームワーク, v4) のリファレンス。
  @theme, @source, @utility, @custom-variant, @apply, @import "tailwindcss", Preflight,
  @tailwindcss/vite, @tailwindcss/postcss, @tailwindcss/cli, variants, arbitrary values。
user-invocable: false
---

# Tailwind CSS

> 分割 PR の途中段階。現在収録済み: references/{backgrounds-borders, core-concepts, effects, filters, flexbox-grid, getting-started, interactivity, layout}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

対象バージョン: Tailwind CSS v4.3.3 (npm latest, GitHub tag `tailwindlabs/tailwindcss@v4.3.3`, 2026-07-16 リリース)。

- docs リポジトリ `tailwindlabs/tailwindcss.com` にはタグが無いため、`main` の HEAD commit `7f92c2213315c195dae583d68752da4042da3ade` (2026-09-09) に pin。取得日は 2026-10-16

## ディレクトリ構成

```text
skills/tailwindcss/
  SKILL.md
  references/
    getting-started/         # 8 ページ: compatibility, editor-setup, framework-guides, play-cdn, tailwind-cli, upgrade-guide, using-postcss, using-vite
      README.md
    core-concepts/           # 10 ページ: theme, colors, dark-mode, responsive-design, preflight, functions-and-directives 等
      README.md
    layout/                  # 23 ページ: display, position, overflow, aspect-ratio, columns, z-index 等
      README.md
    flexbox-grid/            # 24 ページ: flex, gap, grid-template-columns, justify-*, align-*, place-* 等
      README.md
    backgrounds-borders/     # 16 ページ: background-*, border-*, outline-*
      README.md
    effects/                 # 14 ページ: box-shadow, text-shadow, opacity, mask-*, mix-blend-mode
      README.md
    filters/                 # 20 ページ: filter-*, backdrop-filter-*
      README.md
    interactivity/           # 24 ページ: cursor, scroll-*, scrollbar-*, user-select, fill, stroke, touch-action 等
      README.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する（utilities はプロパティ名がそのままファイル名）
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Vite / PostCSS / CLI / Play CDN での導入、v3 からの移行、ブラウザ互換 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `@theme` / テーマ変数、色、ダークモード、レスポンシブ、状態バリアント、Preflight | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| `@source` によるクラス検出、`@utility` / `@apply` / `@variant` 等のディレクティブ、カスタム CSS の追加 | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| display / position / overflow / aspect-ratio / columns / z-index / object-fit | layout | [references/layout/README.md](references/layout/README.md) |
| flex / grid / gap / justify / align / place / order | flexbox-grid | [references/flexbox-grid/README.md](references/flexbox-grid/README.md) |
| background / border / border-radius / outline | backgrounds-borders | [references/backgrounds-borders/README.md](references/backgrounds-borders/README.md) |
| box-shadow / text-shadow / opacity / mask / blend mode | effects | [references/effects/README.md](references/effects/README.md) |
| filter / backdrop-filter（blur, brightness, grayscale 等） | filters | [references/filters/README.md](references/filters/README.md) |
| cursor / pointer-events / scroll-snap / scrollbar / user-select / SVG fill・stroke / accent-color | interactivity | [references/interactivity/README.md](references/interactivity/README.md) |
