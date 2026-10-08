---
name: fandhe-frontend
description: >
  Rust 製フロントエンドフレームワーク fandhe-frontend のリファレンス。
  SSR / SPA / SSG / View Transitions、hydration、単一実行ファイル配布、Vercel デプロイ、既定エスケープ。
  クレート core / app / interactive / server(generate_pages) / headless-ui(Primitives) /
  pre-styled-ui(Themes, motion feature) / wireframe-ui(Wireframes) /
  animation(fandhe-animation, data-* 属性) / wasm-full(feature 選択)。
  Blocks(Hero / Pricing / Cart 等セクション例 329 件)。CLI fw。
user-invocable: false
---

# fandhe-frontend

fandhe-frontend は Rust 製フロントエンドフレームワーク。SSR / SPA / SSG / View Transitions を単一フレームワークで網羅し、単一実行ファイル（Docker 想定）でのデプロイまでを担う。テキスト補間の既定エスケープ・`unsafe` の排除（`core` / `interactive` は `forbid(unsafe_code)`）・依存クレート数の上限管理を製品仕様として固定した、AI 時代のセキュリティリスク低減志向の設計。

**他スキルとの使い分け** — 本スキルの Primitives（`fandhe-frontend-headless-ui`）・Themes（`fandhe-frontend-pre-styled-ui`）はコンポーネント名・anatomy 構成が Ark UI / Chakra UI v3 と対応するが、**すべて Rust API** であり `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは別物（相互に import できない）。Primitives はスタイル無しの anatomy と状態機械のみを提供する headless 層（`skills/ark-ui/` 相当）、Themes は Primitives に既定 CSS と variant を足した薄い styled ラッパー層（`skills/chakra-ui/` 相当）。React/JS プロジェクトの調査には `skills/ark-ui/` `skills/chakra-ui/` を、Rust プロジェクトの調査には本スキルを使うこと。バックエンド（Rust 製 HTTP サーバーフレームワーク）を調べる場合は `skills/fandhe-backend/` を参照すること。

Wireframes（`fandhe-frontend-wireframe-ui`）は低忠実度ワイヤーフレーム部品であり、Primitives / Themes とは別物（別クレート・別 API。名前が近い部品でも相互に置き換えない）。Blocks は新規 API ではなく、Themes / Primitives / core 部品を合成した完成済みセクション例（コードは未公開 crate `docs-site` 由来でコピー利用前提）。

公式ドキュメント: https://fandhe-ai.github.io/fandhe-frontend/ / リポジトリ: https://github.com/Fandhe-AI/fandhe-frontend

## 対象バージョン

| クレート | バージョン |
| --- | --- |
| core | 0.4.3 |
| app | 0.2.6 |
| interactive | 0.2.7 |
| server | 0.2.6 |
| headless-ui | 0.69.2 |
| pre-styled-ui | 0.241.0 |
| wireframe-ui | 0.52.0 |
| cli (`fw`) | 0.5.2 |
| wasm-full | 0.46.0 |
| animation | 0.17.1 |

公式 docs サイトは commit 4c8c7d1 時点（2026-10-08）。`api/keyed-list-api.md` と `api/binding-api.md` は公式 docs 索引外で、crate ソース由来。

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
      wasm-full-features.md
      pre-styled-ui-motion-feature.md
      animation-core.md
      animation.md
      deployment.md
      docs-site-external-repos.md
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
      keyed-list-api.md
      binding-api.md
    primitives/                    # fandhe-frontend-headless-ui（Rust, unstyled）計 75 ページ
      form/                        # 25 ページ
        README.md
        checkbox.md
        slider.md
        color-picker.md
        ...
      collections/                 # 10 ページ
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
      navigation/                  # 7 ページ
        README.md
        breadcrumb.md
        navigation-menu.md
        skip-nav.md
        ...
      display/                     # 14 ページ
        README.md
        avatar.md
        progress.md
        qr-code.md
        ...
    themes/                        # fandhe-frontend-pre-styled-ui（Rust, styled）計 123 ページ
      forms/                       # 29 ページ
        README.md
        button.md
        checkbox.md
        input.md
        ...
      data-display/                # 22 ページ
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
      charts/                      # 12 ページ
        README.md
        charts.md
        bar-chart.md
        line-chart.md
        ...
      collections/                 # 11 ページ
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
      navigation/                  # 6 ページ
        README.md
        breadcrumb.md
        navigation-menu.md
        toolbar.md
        ...
      disclosure/                  # 5 ページ
        README.md
        accordion.md
        scroll-area.md
        splitter.md
        tabs.md
        ...
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
    wireframes/                    # fandhe-frontend-wireframe-ui（Rust, 低忠実度ワイヤーフレーム）計 49 部品
      foundations/                 # common-types
        README.md
        common-types.md
      layout/
        README.md
        overview.md
        frame.md
        stack.md
        ...
      text/
        README.md
        overview.md
        text.md
        ...
      forms/
        README.md
        overview.md
        button.md
        input.md
        ...
      navigation/
        README.md
        overview.md
        tabs.md
        ...
      overlay-feedback/
        README.md
        overview.md
        modal.md
        ...
      data-display/
        README.md
        overview.md
        card-basic.md
        ...
      media/
        README.md
        overview.md
        image.md
        ...
    blocks/                        # Themes / Primitives / core の合成例。4 区分・計 65 カテゴリ・329 block
      marketing/                   # 23 カテゴリ
        README.md
        overview.md                # 区分集約ページ
        hero.md
        pricing.md
        ...
      application/                 # 26 カテゴリ
        README.md
        overview.md
        app-shell.md
        dashboard.md
        ...
      ecommerce/                   # 12 カテゴリ
        README.md
        overview.md
        cart.md
        checkout.md
        ...
      docs/                        # 4 カテゴリ
        README.md
        overview.md
        api-reference.md
        code-block.md
        docs-layout.md
        example-preview.md
  samples/
    README.md
    ssr-routing.md
    ssg-blog.md
    dist-server-docker.md
    interactive-view-transitions.md
    headless-pre-styled-ui.md
    wireframe-ui.md
    vercel-ssg.md
    vercel-ssr.md
  scripts/
    README.md
    install.md
    cli.md
    build.md
    deploy.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す（`primitives/*` と `themes/*` はコンポーネント名が重複するため、Rust API のスタイル無し版が必要か styled 版が必要かで区別する。`wireframes/*` は低忠実度モック用の別クレート、`blocks/*` は完成済みセクションの合成例）
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| fandhe-frontend とは何か、特徴・設計思想を知りたい / `fw new` での最短経路 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| マクロ非依存のコンポーネント記述 / 既存 HTML への埋め込み / View Transitions 有効化 / NPM 静的アセット取り込み | guides | [references/guides/README.md](references/guides/README.md) |
| `el`/`text`/`render`/`raw_html` などコア API、App/Loader/Router API、Hydration API・状態フォーマット、headless-ui/pre-styled-ui の公開 API・slot recipe、keyed list diff（`keyed`/`keyed_diff`）、属性・テキスト・class バインディング（`bind`/`binding`） | api | [references/api/README.md](references/api/README.md) |
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
| アニメーション（`data-*` 属性機能・`fandhe-animation` コア/Web アダプタ）、`pre-styled-ui` の `motion` feature、`wasm-full` の feature 選択、Vercel デプロイ（SSG / SSR）を知りたい | guides | [references/guides/README.md](references/guides/README.md) |
| docs サイト生成器（`docs-site`）を外部リポジトリで使う（導入・`nav.toml`・ブランドキー・GitHub Pages 公開） | guides | [references/guides/README.md](references/guides/README.md) |
| LP・マーケティングサイトの完成済みセクション例（Hero / Pricing / CTA / FAQ / Footer 等）を探す | blocks/marketing | [references/blocks/marketing/README.md](references/blocks/marketing/README.md) |
| アプリ画面の完成済みセクション例（App Shell / Dashboard / Auth / Settings / Dialog 等）を探す | blocks/application | [references/blocks/application/README.md](references/blocks/application/README.md) |
| EC の完成済みセクション例（Cart / Checkout / Filter / Category 等）を探す | blocks/ecommerce | [references/blocks/ecommerce/README.md](references/blocks/ecommerce/README.md) |
| ドキュメントサイト向けの完成済みセクション例（API reference / Code block / Docs layout / Example preview）を探す | blocks/docs | [references/blocks/docs/README.md](references/blocks/docs/README.md) |
| ワイヤーフレーム（低忠実度モック）を組む際の共通型（common-types） | wireframes/foundations | [references/wireframes/foundations/README.md](references/wireframes/foundations/README.md) |
| ワイヤーフレームのレイアウト部品（Frame / Stack / Grid / Divider） | wireframes/layout | [references/wireframes/layout/README.md](references/wireframes/layout/README.md) |
| ワイヤーフレームのテキスト系部品（Text / Paragraph / Link / Tag / RichText / Annotation） | wireframes/text | [references/wireframes/text/README.md](references/wireframes/text/README.md) |
| ワイヤーフレームのフォーム系部品（Button / Input / Select / Checkbox / Slider など） | wireframes/forms | [references/wireframes/forms/README.md](references/wireframes/forms/README.md) |
| ワイヤーフレームのナビゲーション系部品（Tabs / Menu / Breadcrumbs / Pagination / Accordion など） | wireframes/navigation | [references/wireframes/navigation/README.md](references/wireframes/navigation/README.md) |
| ワイヤーフレームのオーバーレイ・フィードバック系部品（Modal / Toast / Tooltip / Alert / Spinner / Progress） | wireframes/overlay-feedback | [references/wireframes/overlay-feedback/README.md](references/wireframes/overlay-feedback/README.md) |
| ワイヤーフレームのデータ表示系部品（Card / List / Stat / Avatar / Icon など） | wireframes/data-display | [references/wireframes/data-display/README.md](references/wireframes/data-display/README.md) |
| ワイヤーフレームのメディア系部品（Image / Chart / Map / Table / Media） | wireframes/media | [references/wireframes/media/README.md](references/wireframes/media/README.md) |
| SSR ルーティング、SSG 静的書き出し、単一バイナリ配布、View Transitions を伴う状態機械 dispatch、headless/pre-styled 部品を横断した典型的な使い方、ワイヤーフレーム構成、Vercel デプロイ例を知りたい | samples | [samples/README.md](samples/README.md) |
| `fw` CLI・WASM ツールチェーン導入、ビルド、デプロイ（Vercel 含む）・デプロイ前検証コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
