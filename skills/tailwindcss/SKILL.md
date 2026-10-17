---
name: tailwindcss
description: >
  Tailwind CSS (ユーティリティファースト CSS フレームワーク, v4) のリファレンス。
  @theme, @source, @utility, @custom-variant, @apply, @import "tailwindcss", Preflight,
  CSS-first 設定, @tailwindcss/vite, @tailwindcss/postcss, @tailwindcss/cli, upgrade ツール,
  variants, arbitrary values, container queries。
  Chakra UI のトークン・style props は chakra-ui スキルの担当。
user-invocable: false
---

# Tailwind CSS

対象バージョン: Tailwind CSS v4.3.3 (npm latest, GitHub tag `tailwindlabs/tailwindcss@v4.3.3`, 2026-07-16 リリース)。

- docs リポジトリ `tailwindlabs/tailwindcss.com` にはタグが無いため、`main` の HEAD commit `7f92c2213315c195dae583d68752da4042da3ade` (2026-09-09) に pin。取得日は 2026-10-16
- v3 (npm `v3-lts` 3.4.19, `v3.tailwindcss.com` で配信) は対象外。v3 → v4 の移行は `references/getting-started/upgrade-guide.md` と `scripts/upgrade.md`

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
    spacing-sizing/          # 14 ページ: padding, margin, width, height, min/max-*, inline-size, block-size
      README.md
    typography/              # 14 ページ: font-*, line-height, letter-spacing, line-clamp, list-style-*
      README.md
    text/                    # 18 ページ: color, text-align, text-decoration-*, text-wrap, white-space, word-break 等
      README.md
    backgrounds-borders/     # 16 ページ: background-*, border-*, outline-*
      README.md
    effects/                 # 14 ページ: box-shadow, text-shadow, opacity, mask-*, mix-blend-mode
      README.md
    filters/                 # 20 ページ: filter-*, backdrop-filter-*
      README.md
    interactivity/           # 24 ページ: cursor, scroll-*, scrollbar-*, user-select, fill, stroke, touch-action 等
      README.md
    transitions-transforms/  # 17 ページ: transition-*, animation, transform, rotate, scale, translate, perspective 等
      README.md
  samples/
    README.md
    install-<framework>.md   # nextjs, react-router, tanstack-start, sveltekit, nuxt, astro, angular, laravel, rspack, solidjs
    <framework>.md           # v4 版: 上記 + qwik, parcel
    theme-custom-colors-fonts.md, custom-utility.md, layer-components.md, source-detection.md,
    dark-mode-toggle.md, group-peer-data-variants.md, state-variants.md, container-queries.md, arbitrary-values.md
  scripts/
    README.md
    install.md
    cli.md
    upgrade.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する（utilities はプロパティ名がそのままファイル名）
3. 該当ページの `.md` を Read して詳細を確認する
4. 導入手順は `samples/` のフレームワーク別ファイル、コマンドは `scripts/` を参照する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Vite / PostCSS / CLI / Play CDN での導入、v3 からの移行、ブラウザ互換 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `@theme` / テーマ変数、色、ダークモード、レスポンシブ、状態バリアント、Preflight | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| `@source` によるクラス検出、`@utility` / `@apply` / `@variant` 等のディレクティブ、カスタム CSS の追加 | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| display / position / overflow / aspect-ratio / columns / z-index / object-fit | layout | [references/layout/README.md](references/layout/README.md) |
| flex / grid / gap / justify / align / place / order | flexbox-grid | [references/flexbox-grid/README.md](references/flexbox-grid/README.md) |
| padding / margin / width / height / min-max / logical size | spacing-sizing | [references/spacing-sizing/README.md](references/spacing-sizing/README.md) |
| font-family / font-size / font-weight / line-height / letter-spacing / list-style | typography | [references/typography/README.md](references/typography/README.md) |
| text color / text-align / text-decoration / text-overflow / white-space / word-break / content | text | [references/text/README.md](references/text/README.md) |
| background / border / border-radius / outline | backgrounds-borders | [references/backgrounds-borders/README.md](references/backgrounds-borders/README.md) |
| box-shadow / text-shadow / opacity / mask / blend mode | effects | [references/effects/README.md](references/effects/README.md) |
| filter / backdrop-filter（blur, brightness, grayscale 等） | filters | [references/filters/README.md](references/filters/README.md) |
| cursor / pointer-events / scroll-snap / scrollbar / user-select / SVG fill・stroke / accent-color | interactivity | [references/interactivity/README.md](references/interactivity/README.md) |
| transition / animation / transform / rotate / scale / translate / perspective | transitions-transforms | [references/transitions-transforms/README.md](references/transitions-transforms/README.md) |
| 典型的な使い方を知りたい（フレームワーク別導入、`@theme` / `@utility` / dark mode / container queries の実例） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI・アップグレードコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
