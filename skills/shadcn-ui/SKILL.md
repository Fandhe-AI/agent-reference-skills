---
name: shadcn-ui
description: >
  shadcn/ui (Tailwind CSS + Base UI / Radix のコピー配布型 React コンポーネント集・shadcn CLI) のリファレンス。
  shadcn init / add / build, components.json, registry.json, registry-item.json, components/ui,
  Data Table, Sonner, AI Elements, @shadcn/react, @shadcn/helpers, CSS variables テーマ, dark mode, RTL, monorepo。
user-invocable: false
---

# shadcn/ui

コンポーネントを npm 依存ではなくソースとして `components/ui/` へコピー配布する React UI 集と、その導入・配布を担う `shadcn` CLI のリファレンス。

## 対象バージョン

- shadcn CLI 4.22.0（GitHub release tag `shadcn@4.22.0`、commit `ad0a097d30cf9524ac4a3b5294c9513c5c344672`、2026-10-16）
- Markdown twin（`https://ui.shadcn.com/<path>.md`）を 2026-10-16 に取得。preview ページを除き、タグ時点の `.mdx` とバイト一致を確認済み
- 同梱パッケージ: `@shadcn/react` 0.3.1 / `@shadcn/helpers` 0.3.0 / `@shadcn/registry` 0.2.0
- ドキュメントサイトの依存（タグ時点）: `@base-ui/react` 1.6.0 / `radix-ui` ^1.4.3 / `react-aria-components` 1.20.0 / `tailwindcss` ^4.3.0 / `react` 19.2.3
- canary / beta / rc は対象外

## ディレクトリ構成

```text
skills/shadcn-ui/
  SKILL.md
  references/
    getting-started/        # 15 ページ: introduction, installation, manual, フレームワーク別 (next, vite, astro, ...), tailwind-v4, react-19
      README.md
    cli-config/             # 7 ページ: cli, components-json, package-imports, monorepo, skills, mcp, figma
      README.md
    theming/                # 14 ページ: theming, dark-mode-*, rtl-*, typeset, shimmer, scroll-fade
      README.md
    forms/                  # 5 ページ: forms, react-hook-form, tanstack-form, formisch, next
      README.md
    components-form/        # 17 ページ: button, input, select, checkbox, field, calendar, date-picker, combobox, ...
      README.md
    components-display/     # 20 ページ: card, table, data-table, chart, carousel, sonner, toast, typography, ...
      README.md
    components-layout/      # 11 ページ: sidebar, tabs, accordion, navigation-menu, resizable, direction, ...
      README.md
    components-overlay/     # 11 ページ: dialog, alert-dialog, sheet, drawer, popover, dropdown-menu, command, ...
      README.md
    components-chat/        # 8 ページ: message, bubble, message-scroller, questionnaire, trace, code-block, ...
      README.md
    ai-elements/            # 22 ページ: ai-elements, chat, message, prompt-input, tool, reasoning, ...
      README.md
    registry/               # 15 ページ: registry, getting-started, registry-json, registry-item-json, namespace, mcp, ...
      README.md
    packages/               # 4 ページ: helpers-ai-sdk, helpers-tanstack-ai, react-message-scroller, react-questionnaire
      README.md
  samples/
    README.md
    nextjs-init-and-first-component.md
    form-react-hook-form-zod.md
    form-tanstack-form-zod.md
    form-server-actions-nextjs.md
    data-table-tanstack-table.md
    dark-mode-next-themes.md
    sidebar-app-layout.md
    chat-ui-ai-sdk-helper.md
    custom-registry-build.md
    github-registry.md
    monorepo-setup.md
  scripts/
    README.md
    install.md
    cli.md
    mcp.md
    registry.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 動く実例は `samples/`、コピペ実行できるコマンドは `scripts/` の README から引く

## ark-ui / chakra-ui / fandhe-frontend との使い分け

`components-*` と `ai-elements` の各ページは、ark-ui（ヘッドレス）・chakra-ui（スタイル付き）・fandhe-frontend（Rust）と同名のコンポーネントを扱う。shadcn/ui は npm パッケージではなくコピー配布で、ソースは `components/ui/` に置かれる。import 元（`@/components/ui/...`）で区別する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| shadcn/ui とは何か、思想を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Next.js / Vite / Astro / React Router / TanStack Start 等への導入 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Tailwind v4 / React 19 対応、手動インストール | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `shadcn` CLI のサブコマンド、`components.json` 設定 | cli-config | [references/cli-config/README.md](references/cli-config/README.md) |
| monorepo 構成、package imports（`#` エイリアス） | cli-config | [references/cli-config/README.md](references/cli-config/README.md) |
| MCP server / 公式 Agent Skill / Figma ファイルの利用 | cli-config | [references/cli-config/README.md](references/cli-config/README.md) |
| CSS variables によるテーマ、dark mode、RTL 対応 | theming | [references/theming/README.md](references/theming/README.md) |
| typeset / shimmer / scroll-fade ユーティリティ | theming | [references/theming/README.md](references/theming/README.md) |
| フォーム構築（React Hook Form / TanStack Form / Formisch / Server Actions） | forms | [references/forms/README.md](references/forms/README.md) |
| Button / Input / Select / Checkbox / Field / Calendar / Combobox の API | components-form | [references/components-form/README.md](references/components-form/README.md) |
| Card / Table / Data Table / Chart / Carousel / Sonner / Skeleton の API | components-display | [references/components-display/README.md](references/components-display/README.md) |
| Sidebar / Tabs / Accordion / Navigation Menu / Resizable / Direction の API | components-layout | [references/components-layout/README.md](references/components-layout/README.md) |
| Dialog / Sheet / Drawer / Popover / Dropdown Menu / Command の API | components-overlay | [references/components-overlay/README.md](references/components-overlay/README.md) |
| チャット UI（Message / Bubble / Message Scroller / Questionnaire / Trace） | components-chat | [references/components-chat/README.md](references/components-chat/README.md) |
| エージェント UI パターン（Prompt Input / Tool / Reasoning / Plan / Terminal） | ai-elements | [references/ai-elements/README.md](references/ai-elements/README.md) |
| 自前レジストリの作成・配信（registry.json / registry-item.json） | registry | [references/registry/README.md](references/registry/README.md) |
| 名前空間・認証・GitHub レジストリ・Open in v0・レジストリ MCP | registry | [references/registry/README.md](references/registry/README.md) |
| `@shadcn/helpers` / `@shadcn/react` パッケージの API | packages | [references/packages/README.md](references/packages/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
