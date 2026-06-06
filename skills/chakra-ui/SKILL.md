---
name: chakra-ui
description: >
  Chakra UI v3 (React コンポーネントライブラリ) リファレンス。
  別名: Chakra, chakra, chakra-ui。
  コンポーネント (Button, Input, Modal, Drawer, Toast, Menu, Tabs, Tooltip 等)、
  レイアウト、フォーム、オーバーレイ、チャート、テーマ、レシピ、
  スタイルプロップ、レスポンシブ、ダークモード、Chakra UI Pro ブロック。
user-invocable: false
model: sonnet
---

# Chakra UI v3 リファレンス

Chakra UI v3 公式ドキュメントを網羅したスキル。
タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定すること。

## ディレクトリ構成

```text
skills/chakra-ui/
  SKILL.md
  references/
    get-started/
      README.md
      cli.md
      framework-next-app.md
      framework-next-pages.md
      framework-remix.md
      framework-vite.md
      framework-storybook.md
      migration.md
      env-iframe.md
      env-shadow-dom.md
      playground.md
      figma.md
      contributing.md
      changelog.md
      ai-llms.md
      ai-rules.md
      ai-mcp-server.md
    components/
      README.md
      concepts/
      layout/
      typography/
      buttons/
      date-time/
      forms/
      collections/
      overlays/
      disclosure/
      feedback/
      data-display/
      i18n/
      utilities/
    charts/
      README.md
      installation.md
      area-chart.md
      bar-chart.md
      bar-list.md
      bar-segment.md
      axes.md
      cartesian-grid.md
      donut-chart.md
      line-chart.md
      pie-chart.md
      radar-chart.md
      scatter-chart.md
      sparkline.md
      use-chart.md
    styling/
      README.md
      concepts/
      compositions/
      style-props/
    theming/
      README.md
      concepts/
      design-tokens/
      compositions/
      customization/
    blocks/
      README.md
      ai.md
      app-headers.md
      app-navbars.md
      authentication.md
      banners.md
      blogs.md
      cards.md
      careers.md
      charts.md
      contacts.md
      cta.md
      dividers.md
      docs-changelog.md
      docs-code-block.md
      docs-example-preview.md
      docs-header.md
      docs-navbar.md
      docs-pagination.md
      docs-parameter-field.md
      docs-sidebar.md
      docs-step.md
      docs-toc.md
      faqs.md
      features.md
      feeds.md
      footers.md
      help-center.md
      heroes.md
      layouts.md
      logos.md
      marketing-headers.md
      marketing-navbars.md
      notifications.md
      onboarding.md
      org-switcher.md
      pricing.md
      product-categories.md
      product-grid.md
      product-reviews.md
      profiles.md
      property-panels.md
      settings.md
      sharing.md
      shopping-carts.md
      sidebars.md
      stats.md
      store-signup-offers.md
      teams.md
      testimonials.md
      webhooks.md
  samples/
    README.md
    provider-setup.md
    dark-mode.md
    responsive-styles.md
    theme-customization.md
    component-recipes.md
    chakra-factory.md
    form-field-input.md
    dialog.md
    toast.md
    table.md
  scripts/
    README.md
    install.md
    cli.md
    generate.md
    migration.md
    test.md
    mcp.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、フレームワーク統合（Next.js/Remix/Vite）、環境設定、CLI、移行 | get-started | [references/get-started/README.md](references/get-started/README.md) |
| コンポーネントの使い方、Props、バリアント、レイアウト、フォーム、オーバーレイ | components | [references/components/README.md](references/components/README.md) |
| チャートの表示、BarChart/LineChart/PieChart、useChart、データ可視化 | charts | [references/charts/README.md](references/charts/README.md) |
| スタイルプロップ、レスポンシブデザイン、ダークモード、CSS 変数、Chakra Factory | styling | [references/styling/README.md](references/styling/README.md) |
| デザイントークン、レシピ、スロットレシピ、カスタマイズ、defineConfig | theming | [references/theming/README.md](references/theming/README.md) |
| UI ブロックテンプレート（ヒーロー、ナビバー、フッター等、要 CHAKRA_PRO_API_KEY） | blocks | [references/blocks/README.md](references/blocks/README.md) |
| 典型的な使い方（Provider 設定、ダークモード、フォーム、ダイアログ等） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド、コード生成、マイグレーション、テスト、MCP | scripts | [scripts/README.md](scripts/README.md) |
