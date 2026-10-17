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

> 分割 PR の途中段階。現在収録済み: references/{backgrounds-borders, core-concepts, effects}。description に挙げた残りのカテゴリは後続 PR で追加し、最終 PR でこの行を削除する。

対象バージョン: Tailwind CSS v4.3.3 (npm latest, GitHub tag `tailwindlabs/tailwindcss@v4.3.3`, 2026-07-16 リリース)。

- docs リポジトリ `tailwindlabs/tailwindcss.com` にはタグが無いため、`main` の HEAD commit `7f92c2213315c195dae583d68752da4042da3ade` (2026-09-09) に pin。取得日は 2026-10-16

## ディレクトリ構成

```text
skills/tailwindcss/
  SKILL.md
  references/
    core-concepts/           # 10 ページ: theme, colors, dark-mode, responsive-design, preflight, functions-and-directives 等
      README.md
    backgrounds-borders/     # 16 ページ: background-*, border-*, outline-*
      README.md
    effects/                 # 14 ページ: box-shadow, text-shadow, opacity, mask-*, mix-blend-mode
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
| `@theme` / テーマ変数、色、ダークモード、レスポンシブ、状態バリアント、Preflight | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| `@source` によるクラス検出、`@utility` / `@apply` / `@variant` 等のディレクティブ、カスタム CSS の追加 | core-concepts | [references/core-concepts/README.md](references/core-concepts/README.md) |
| background / border / border-radius / outline | backgrounds-borders | [references/backgrounds-borders/README.md](references/backgrounds-borders/README.md) |
| box-shadow / text-shadow / opacity / mask / blend mode | effects | [references/effects/README.md](references/effects/README.md) |
