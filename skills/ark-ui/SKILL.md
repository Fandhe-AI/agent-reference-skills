---
name: ark-ui
description: >
  Ark UI headless / unstyled コンポーネントライブラリ。Zag.js ベース、Chakra UI v3 基盤。
  React / Solid / Vue / Svelte 対応。asChild, RootProvider, createListCollection,
  createTreeCollection, data-* セレクタ。Tour, Signature Pad, Image Cropper,
  Floating Panel, Angle Slider 等のコンポーネント API。
user-invocable: false
---

# Ark UI

Ark UI は Zag.js を基盤とする headless / unstyled コンポーネントライブラリで、Chakra UI v3 のヘッドレス実装基盤でもある。React / Solid / Vue / Svelte に対応する。

**Ark UI と Chakra UI の使い分け** — Ark UI はスタイル無しの振る舞い・アクセシビリティのみを提供するプリミティブ（`asChild` で任意の要素・デザインシステムに接続する）、Chakra UI v3 は同じ Zag.js 基盤の上に構築された styled 実装。既存デザインシステムに手動でスタイルを当て込みたい場合は本スキル、Chakra のスタイルシステムをそのまま使いたい場合は `skills/chakra-ui/` を参照。

## ディレクトリ構成

```text
skills/ark-ui/
  SKILL.md
  references/
    overview/
      README.md
      about.md
      getting-started.md
      changelog.md
      framework-differences.md
      mcp-server.md
      llms-txt.md
    guides/
      README.md
      styling.md
      composition.md
      component-state.md
      animation.md
      forms.md
      ref.md
    collections/
      README.md
      list-collection.md
      tree-collection.md
      async-list.md
      list-selection.md
    components/
      form/
        README.md
        checkbox.md
        field.md
        fieldset.md
        radio-group.md
        switch.md
        slider.md
        angle-slider.md
        number-input.md
        password-input.md
        pin-input.md
        rating-group.md
        segment-group.md
        tags-input.md
        editable.md
        file-upload.md
        signature-pad.md
        image-cropper.md
        color-picker.md
      collections/
        README.md
        select.md
        combobox.md
        listbox.md
        tree-view.md
        menu.md
        carousel.md
        pagination.md
        steps.md
      overlays/
        README.md
        dialog.md
        drawer.md
        popover.md
        hover-card.md
        tooltip.md
        toast.md
        tour.md
        floating-panel.md
      disclosure/
        README.md
        accordion.md
        collapsible.md
        tabs.md
        toggle.md
        toggle-group.md
        splitter.md
        scroll-area.md
      date-time/
        README.md
        date-picker.md
        date-input.md
        timer.md
      display/
        README.md
        avatar.md
        progress-linear.md
        progress-circular.md
        qr-code.md
        clipboard.md
        marquee.md
        highlight.md
        json-tree-view.md
    utilities/
      README.md
      client-only.md
      download-trigger.md
      environment.md
      focus-trap.md
      format-byte.md
      format-number.md
      format-time.md
      format-relative-time.md
      frame.md
      locale.md
      presence.md
      swap.md
  samples/
    README.md
    provider-setup.md
    styling-with-panda-css.md
    styling-with-tailwind-css.md
    composition-with-aschild.md
    external-state-with-root-provider.md
    select-with-list-collection.md
    combobox-with-filtering.md
    react-hook-form-integration.md
    onboarding-tour.md
  scripts/
    README.md
    install.md
    mcp-server.md
    llms-txt-fetch.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す（`references/collections/`「データコレクション」と `references/components/collections/`「コレクション系コンポーネント」は別カテゴリなので混同しないこと）
2. そのカテゴリの `README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Ark UI とは何か、思想・アーキテクチャを知りたい / インストール手順 / フレームワーク間の差異 / MCP Server・llms.txt | overview | [references/overview/README.md](references/overview/README.md) |
| スタイリング規約（data-scope/data-part/data-state）/ asChild による composition / コンポーネント状態管理 / アニメーション / フォーム統合 / ref の取得 | guides | [references/guides/README.md](references/guides/README.md) |
| `createListCollection` / `createTreeCollection` でデータを構築したい / 非同期リスト・選択状態フックを使いたい | collections（データ） | [references/collections/README.md](references/collections/README.md) |
| Checkbox, Slider, Number Input, Tags Input, File Upload, Color Picker などフォーム系コンポーネント API を知りたい | components/form | [references/components/form/README.md](references/components/form/README.md) |
| Select, Combobox, Tree View, Menu, Carousel, Pagination, Steps などコレクション系コンポーネント API を知りたい | components/collections | [references/components/collections/README.md](references/components/collections/README.md) |
| Dialog, Drawer, Popover, Tooltip, Toast, Tour, Floating Panel などオーバーレイ系コンポーネント API を知りたい | components/overlays | [references/components/overlays/README.md](references/components/overlays/README.md) |
| Accordion, Tabs, Toggle, Splitter, Scroll Area などディスクロージャー系コンポーネント API を知りたい | components/disclosure | [references/components/disclosure/README.md](references/components/disclosure/README.md) |
| Date Picker, Date Input, Timer など日時系コンポーネント API を知りたい | components/date-time | [references/components/date-time/README.md](references/components/date-time/README.md) |
| Avatar, Progress, QR Code, Clipboard, Highlight, JSON Tree View など表示系コンポーネント API を知りたい | components/display | [references/components/display/README.md](references/components/display/README.md) |
| EnvironmentProvider, LocaleProvider, フォーマットユーティリティ（format-number 等）、Focus Trap, Presence を使いたい | utilities | [references/utilities/README.md](references/utilities/README.md) |
| 典型的な使い方・実例（Provider Setup, Panda/Tailwind スタイリング, RootProvider による外部状態制御, React Hook Form 統合等）を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・MCP Server セットアップ・llms.txt 取得コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
