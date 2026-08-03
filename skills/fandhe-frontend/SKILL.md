---
name: fandhe-frontend
description: >
  Rust 製フロントエンドフレームワーク fandhe-frontend のリファレンス。
  SSR / SPA / SSG / View Transitions 統合、hydration、単一実行ファイル配布。
  既定エスケープ・forbid(unsafe_code) の安全設計。
  主要クレート core / app / interactive / headless-ui(Primitives) / pre-styled-ui(Themes) /
  server(SSG generate_pages/generate_assets)（fandhe-frontend- 接頭）。
  CLI fw（new / gate / structure / impact）。
user-invocable: false
---

# fandhe-frontend

fandhe-frontend は Rust 製フロントエンドフレームワーク。SSR / SPA / SSG / View Transitions を単一フレームワークで網羅し、単一実行ファイル（Docker 想定）でのデプロイまでを担う。テキスト補間の既定エスケープ・`unsafe` の排除（`core` / `interactive` は `forbid(unsafe_code)`）・依存クレート数の上限管理を製品仕様として固定した、AI 時代のセキュリティリスク低減志向の設計。

**他スキルとの使い分け** — 本スキルの Primitives（`fandhe-frontend-headless-ui`）・Themes（`fandhe-frontend-pre-styled-ui`）はコンポーネント名・anatomy 構成が Ark UI / Chakra UI v3 と対応するが、**すべて Rust API** であり `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは別物（相互に import できない）。Primitives はスタイル無しの anatomy と状態機械のみを提供する headless 層（`skills/ark-ui/` 相当）、Themes は Primitives に既定 CSS と variant を足した薄い styled ラッパー層（`skills/chakra-ui/` 相当）。React/JS プロジェクトの調査には `skills/ark-ui/` `skills/chakra-ui/` を、Rust プロジェクトの調査には本スキルを使うこと。バックエンド（Rust 製 HTTP サーバーフレームワーク）を調べる場合は `skills/fandhe-backend/` を参照すること。

公式ドキュメント: https://fandhe-ai.github.io/fandhe-frontend/ / リポジトリ: https://github.com/Fandhe-AI/fandhe-frontend

## ディレクトリ構成

```text
skills/fandhe-frontend/
  SKILL.md
  references/
    getting-started/
      README.md
      introduction.md
      quickstart.md
    guides/
      README.md
      component-authoring.md
      embedding-guide.md
      view-transitions.md
      npm-asset-build.md
      no-js-ssg.md
    api/
      README.md
      component-api.md
      app-api.md
      interactive-api.md
      hydration-api.md
      hydration-state-format.md
      router-path-matching.md
      headless-ui-api.md
      pre-styled-ui-api.md
      pre-styled-recipe-api.md
      server-api.md
    primitives/                    # fandhe-frontend-headless-ui（Rust, unstyled）
      form/                        # 22 ページ
        README.md
        checkbox.md
        slider.md
        color-picker.md
        ...
      collections/                 # 9 ページ
        README.md
        combobox.md
        select.md
        tree-view.md
        ...
      overlays/                    # 10 ページ
        README.md
        dialog.md
        popover.md
        toast.md
        ...
      disclosure/                  # 5 ページ
        README.md
        accordion.md
        tabs.md
        splitter.md
        ...
      date-time/                   # 4 ページ
        README.md
        calendar.md
        date-input.md
        date-picker.md
        timer.md
      navigation/                  # 6 ページ
        README.md
        breadcrumb.md
        navigation-menu.md
        skip-nav.md
        ...
      display/                     # 7 ページ
        README.md
        avatar.md
        progress.md
        qr-code.md
        ...
    themes/                        # fandhe-frontend-pre-styled-ui（Rust, styled）
      forms/                       # 24 ページ
        README.md
        button.md
        checkbox.md
        input.md
        ...
      data-display/                # 15 ページ
        README.md
        card.md
        table.md
        badge.md
        ...
      typography/                  # 14 ページ
        README.md
        heading.md
        text.md
        link.md
        ...
      charts/                      # 11 ページ
        README.md
        charts.md
        bar-chart.md
        line-chart.md
        ...
      collections/                 # 10 ページ
        README.md
        select.md
        menu.md
        tree-view.md
        ...
      overlays/                    # 10 ページ
        README.md
        dialog.md
        toast.md
        tooltip.md
        ...
      feedback/                    # 6 ページ
        README.md
        alert.md
        spinner.md
        skeleton.md
        ...
      navigation/                  # 5 ページ
        README.md
        breadcrumb.md
        navigation-menu.md
        toolbar.md
        ...
      disclosure/                  # 4 ページ
        README.md
        accordion.md
        scroll-area.md
        splitter.md
        tabs.md
      date-time/                   # 4 ページ
        README.md
        calendar.md
        date-input.md
        date-picker.md
        timer.md
      utilities/                   # 4 ページ
        README.md
        download-trigger.md
        separator.md
        skip-nav.md
        visually-hidden.md
  samples/
    README.md
    ssr-routing.md
    ssg-blog.md
    dist-server-docker.md
    interactive-view-transitions.md
    headless-pre-styled-ui.md
  scripts/
    README.md
    install.md
    cli.md
    build.md
    deploy.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す（`primitives/*` と `themes/*` はコンポーネント名が重複するため、Rust API のスタイル無し版が必要か styled 版が必要かで区別する）
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| fandhe-frontend とは何か、特徴・設計思想を知りたい / `fw new` での最短経路 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| マクロ非依存のコンポーネント記述 / 既存 HTML への埋め込み / View Transitions 有効化 / NPM 静的アセット取り込み | guides | [references/guides/README.md](references/guides/README.md) |
| `el`/`text`/`render`/`raw_html` などコア API、App/Loader/Router API、Hydration API・状態フォーマット、headless-ui/pre-styled-ui の公開 API・slot recipe | api | [references/api/README.md](references/api/README.md) |
| クライアント JS ゼロの SSG 構成での制約・代替パターン、`fandhe-frontend-server` の SSG API（`generate`/`generate_with`/`generate_pages`/`generate_assets`） | guides / api | [references/guides/README.md](references/guides/README.md) / [references/api/README.md](references/api/README.md) |
| Checkbox, Slider, Color Picker などフォーム系 Primitives（unstyled）API を知りたい | primitives/form | [references/primitives/form/README.md](references/primitives/form/README.md) |
| Combobox, Select, Tree View などコレクション系 Primitives（unstyled）API を知りたい | primitives/collections | [references/primitives/collections/README.md](references/primitives/collections/README.md) |
| Dialog, Popover, Toast などオーバーレイ系 Primitives（unstyled）API を知りたい | primitives/overlays | [references/primitives/overlays/README.md](references/primitives/overlays/README.md) |
| Accordion, Tabs, Splitter などディスクロージャー系 Primitives（unstyled）API を知りたい | primitives/disclosure | [references/primitives/disclosure/README.md](references/primitives/disclosure/README.md) |
| Calendar, Date Picker, Timer など日時系 Primitives（unstyled）API を知りたい | primitives/date-time | [references/primitives/date-time/README.md](references/primitives/date-time/README.md) |
| Breadcrumb, NavigationMenu, SkipNav などナビゲーション系 Primitives（unstyled）API を知りたい | primitives/navigation | [references/primitives/navigation/README.md](references/primitives/navigation/README.md) |
| Avatar, Progress, QrCode などディスプレイ系 Primitives（unstyled）API を知りたい | primitives/display | [references/primitives/display/README.md](references/primitives/display/README.md) |
| Button, Checkbox, Input などフォーム系 Themes（styled）部品を知りたい | themes/forms | [references/themes/forms/README.md](references/themes/forms/README.md) |
| Card, Table, Badge, Avatar などデータ表示系 Themes（styled）部品を知りたい | themes/data-display | [references/themes/data-display/README.md](references/themes/data-display/README.md) |
| Heading, Text, Link, List などタイポグラフィ系 Themes（styled）部品を知りたい | themes/typography | [references/themes/typography/README.md](references/themes/typography/README.md) |
| BarChart, LineChart, PieChart などチャート系 Themes（styled）部品を知りたい | themes/charts | [references/themes/charts/README.md](references/themes/charts/README.md) |
| Select, Menu, Tree View などコレクション系 Themes（styled）部品を知りたい | themes/collections | [references/themes/collections/README.md](references/themes/collections/README.md) |
| Dialog, Toast, Tooltip などオーバーレイ系 Themes（styled）部品を知りたい | themes/overlays | [references/themes/overlays/README.md](references/themes/overlays/README.md) |
| Alert, Spinner, Skeleton などフィードバック系 Themes（styled）部品を知りたい | themes/feedback | [references/themes/feedback/README.md](references/themes/feedback/README.md) |
| Breadcrumb, NavigationMenu, Toolbar などナビゲーション系 Themes（styled）部品を知りたい | themes/navigation | [references/themes/navigation/README.md](references/themes/navigation/README.md) |
| Accordion, Tabs, Splitter などディスクロージャー系 Themes（styled）部品を知りたい | themes/disclosure | [references/themes/disclosure/README.md](references/themes/disclosure/README.md) |
| Calendar, Date Picker, Timer など日時系 Themes（styled）部品を知りたい | themes/date-time | [references/themes/date-time/README.md](references/themes/date-time/README.md) |
| Separator, SkipNav, VisuallyHidden などユーティリティ系 Themes（styled）部品を知りたい | themes/utilities | [references/themes/utilities/README.md](references/themes/utilities/README.md) |
| SSR ルーティング、SSG 静的書き出し、単一バイナリ配布、View Transitions を伴う状態機械 dispatch、headless/pre-styled 部品を横断した典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| `fw` CLI・WASM ツールチェーン導入、ビルド、デプロイ前検証コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
