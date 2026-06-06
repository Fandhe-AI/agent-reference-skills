---
name: storybook
description: >
  Storybook (UI コンポーネントカタログ・テストツール) リファレンス。
  story, CSF (Component Story Format)、args, argTypes, decorators、
  play function、interaction tests、autodocs、
  main.ts / preview.ts 設定、アドオン (a11y, controls, viewport, themes)。
user-invocable: false
model: sonnet
---

# Storybook リファレンス

Storybook 公式ドキュメントを網羅した API リファレンススキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

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
      test-coverage.md
      vitest-addon.md
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
      compilers.md
      environment-variables.md
      features-and-behavior.md
      frameworks.md
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
    api/
      README.md
      arg-types.md
      cli-options.md
      csf.md
      new-frameworks.md
      parameters.md
      main-config/
        README.md
        addons.md
        babel.md
        build.md
        core.md
        docs.md
        env.md
        framework.md
        indexers.md
        log-level.md
        manager-head.md
        preview-annotations.md
        preview-body.md
        preview-head.md
        refs.md
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
        playwright.md
        vitest.md
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
| Interaction テスト、A11y テスト、Visual テスト、Vitest addon、CI、テストカバレッジ | writing-tests | [references/writing-tests/README.md](references/writing-tests/README.md) |
| Autodocs、MDX、Doc Blocks、ドキュメントビルド、Code Panel | writing-docs | [references/writing-docs/README.md](references/writing-docs/README.md) |
| Actions、Controls、Viewport、Backgrounds、Toolbars、Highlight | essentials | [references/essentials/README.md](references/essentials/README.md) |
| CSS、TypeScript、Theming、Telemetry、環境変数、サイドバー、アドオン登録、コンパイラー | configure | [references/configure/README.md](references/configure/README.md) |
| Vite、Webpack、Builder API | builders | [references/builders/README.md](references/builders/README.md) |
| CSF、ArgTypes、Parameters、CLI オプション、新フレームワーク追加 | api | [references/api/README.md](references/api/README.md) |
| main.js / main.ts の framework、stories、addons、features 等の設定 | api/main-config | [references/api/main-config/README.md](references/api/main-config/README.md) |
| Canvas、Source、Meta、Controls 等の Doc Block コンポーネント | api/doc-blocks | [references/api/doc-blocks/README.md](references/api/doc-blocks/README.md) |
| Vitest・Jest・Playwright での Portable Stories | api/portable-stories | [references/api/portable-stories/README.md](references/api/portable-stories/README.md) |
| 典型的な使い方・実装例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・ビルド・テスト実行・アップグレードを知りたい | scripts | [scripts/README.md](scripts/README.md) |
