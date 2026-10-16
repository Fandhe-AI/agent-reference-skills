---
name: storybook
description: >
  Storybook (UI カタログ) リファレンス。CSF Next (CSF Factories), args, argTypes,
  decorators, play function, autodocs, main.ts / preview.ts,
  Storybook MCP server, components manifest, Vitest addon, test-runner,
  アドオン作成, upgrade / migration。
user-invocable: false
model: sonnet
---

# Storybook リファレンス

Storybook 公式ドキュメントを網羅した API リファレンススキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

対象: Storybook 10.6.2 (出典: storybookjs/storybook タグ v10.6.2 の docs/、取得日 2026-10-16)。

## ディレクトリ構成

```text
skills/storybook/
  SKILL.md
  references/
    get-started/
      README.md
      browse-stories.md
      frameworks.md
      install.md
      setup.md
      whats-a-story.md
      why-storybook.md
      frameworks/
        README.md
        angular.md
        angular-vite.md
        nextjs.md
        nextjs-vite.md
        preact-vite.md
        react-native-web-vite.md
        react-vite.md
        react-webpack5.md
        svelte-vite.md
        sveltekit.md
        tanstack-react.md
        vue3-vite.md
        web-components-vite.md
    writing-stories/
      README.md
      args.md
      build-pages.md
      decorators.md
      loaders.md
      mocking-modules.md
      mocking-network-requests.md
      mocking-providers.md
      multiple-components.md
      naming-and-hierarchy.md
      parameters.md
      play-function.md
      tags.md
      typescript.md
    writing-tests/
      README.md
      accessibility-testing.md
      in-ci.md
      interaction-testing.md
      portable-stories.md
      snapshot-testing.md
      stories-in-end-to-end-tests.md
      test-coverage.md
      test-runner.md
      vitest-addon.md
      vitest-addon-migration-guide.md
      visual-testing.md
    writing-docs/
      README.md
      autodocs.md
      build-documentation.md
      code-panel.md
      doc-blocks.md
      mdx.md
    essentials/
      README.md
      actions.md
      backgrounds.md
      controls.md
      highlight.md
      measure-and-outline.md
      toolbars-and-globals.md
      viewport.md
    configure/
      README.md
      addons.md
      change-detection.md
      compilers.md
      environment-variables.md
      eslint-plugin.md
      features-and-behavior.md
      frameworks.md
      frameworks-feature-support.md
      images-and-assets.md
      sidebar-and-urls.md
      story-layout.md
      story-rendering.md
      styling-and-css.md
      telemetry.md
      theming.md
      typescript.md
    builders/
      README.md
      builder-api.md
      vite.md
      webpack.md
    sharing/
      README.md
      design-integrations.md
      embed.md
      package-composition.md
      publish-storybook.md
      storybook-composition.md
    api/
      README.md
      arg-types.md
      cli-options.md
      csf.md
      csf-next.md
      new-frameworks.md
      parameters.md
      main-config/
        README.md
        addons.md
        babel.md
        babel-default.md
        build.md
        core.md
        docs.md
        env.md
        features.md
        framework.md
        indexers.md
        log-level.md
        manager-head.md
        preview-annotations.md
        preview-body.md
        preview-head.md
        refs.md
        security.md
        static-dirs.md
        stories.md
        swc.md
        tags.md
        typescript.md
        vite-final.md
        webpack-final.md
      doc-blocks/
        README.md
        arg-types.md
        canvas.md
        color-palette.md
        controls.md
        description.md
        icon-gallery.md
        markdown.md
        meta.md
        primary.md
        source.md
        stories.md
        story.md
        subtitle.md
        table-of-contents.md
        title.md
        typeset.md
        unstyled.md
        use-of.md
      portable-stories/
        README.md
        jest.md
        playwright.md   # 10.6.0 で削除済み (履歴ページ)
        vitest.md
    ai/
      README.md
      agentic-review.md
      agentic-setup.md
      best-practices.md
      manifests.md
      mcp-server.md
      mcp-server-api.md
      mcp-sharing.md
      overview.md
    addons/
      README.md
      addon-knowledge-base.md
      addon-migration-guide.md
      addon-types.md
      addons-api.md
      configure-addons.md
      install-addons.md
      integration-catalog.md
      introduction.md
      writing-addons.md
      writing-presets.md
    releases/
      README.md
      feature-lifecycle.md
      migration-guide.md
      migration-guide-from-older-version.md
      upgrading.md
  samples/
    README.md
    accessibility-testing.md
    args-composition.md
    autodocs.md
    basic-story.md
    decorators.md
    global-styles-setup.md
    loaders.md
    parameters.md
    play-function.md
  scripts/
    README.md
    addons.md
    build.md
    cli.md
    install.md
    sandbox.md
    test.md
    upgrade.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、セットアップ、フレームワーク選択、ストーリーとは何か | get-started | [references/get-started/README.md](references/get-started/README.md) |
| Args、Decorators、Play function、Loaders、Tags、Mocking、TypeScript | writing-stories | [references/writing-stories/README.md](references/writing-stories/README.md) |
| Interaction テスト、A11y テスト、Visual テスト、Vitest addon (移行含む)、test-runner、E2E でのストーリー利用、CI、テストカバレッジ | writing-tests | [references/writing-tests/README.md](references/writing-tests/README.md) |
| Autodocs、MDX、Doc Blocks、ドキュメントビルド、Code Panel | writing-docs | [references/writing-docs/README.md](references/writing-docs/README.md) |
| Actions、Controls、Viewport、Backgrounds、Toolbars、Highlight | essentials | [references/essentials/README.md](references/essentials/README.md) |
| CSS、TypeScript、Theming、Telemetry、環境変数、サイドバー、アドオン登録、コンパイラー、変更検出 (change detection)、ESLint plugin、フレームワーク別機能対応表 | configure | [references/configure/README.md](references/configure/README.md) |
| Vite、Webpack、Builder API | builders | [references/builders/README.md](references/builders/README.md) |
| Storybook の公開・共有、デザインツール連携、Composition、埋め込み | sharing | [references/sharing/README.md](references/sharing/README.md) |
| CSF、CSF Next (CSF Factories)、ArgTypes、Parameters、CLI オプション、新フレームワーク追加 | api | [references/api/README.md](references/api/README.md) |
| main.js / main.ts の framework、stories、addons、features、babel、security 等の設定 | api/main-config | [references/api/main-config/README.md](references/api/main-config/README.md) |
| Canvas、Source、Meta、Controls 等の Doc Block コンポーネント | api/doc-blocks | [references/api/doc-blocks/README.md](references/api/doc-blocks/README.md) |
| Vitest・Jest での Portable Stories (Playwright 版は 10.6.0 で削除済み) | api/portable-stories | [references/api/portable-stories/README.md](references/api/portable-stories/README.md) |
| Storybook MCP server (@storybook/addon-mcp)、components manifest、agentic setup / review | ai | [references/ai/README.md](references/ai/README.md) |
| アドオンのインストール・設定・自作、presets、Addon API | addons | [references/addons/README.md](references/addons/README.md) |
| アップグレード、移行ガイド (8→9、9→10、10.x)、feature lifecycle | releases | [references/releases/README.md](references/releases/README.md) |
| フレームワーク別セットアップ (Next.js / TanStack React / Angular Vite / Vue / SvelteKit 等) | get-started/frameworks | [references/get-started/frameworks/README.md](references/get-started/frameworks/README.md) |
| 典型的な使い方・実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・ビルド・テスト実行・アップグレードを知りたい | scripts | [scripts/README.md](scripts/README.md) |
