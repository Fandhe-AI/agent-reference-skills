---
name: figma
description: >
  Figma REST API / Plugin API / Widget API / Code Connect / MCP Server リファレンス
  OAuth / PAT / Plan Access Token, files, folders, variables, VariableComposedColor, webhooks, SCIM
  FrameNode, figma.variables, figma.codegen, textWrapStyle, variable fonts, useSyncedState, AutoLayout
  Code Connect template files (.figma.ts) / legacy parser (React / SwiftUI / Compose / HTML)
  MCP html_to_figma, generate_image, get_motion_context, generative plugins / shaders, Figma Weave
user-invocable: false
---

対象: developers.figma.com（2026-10-17 取得）/ Code Connect CLI `@figma/code-connect` v2.0.2 / Plugin API typings `@figma/plugin-typings` v1.142.0（docs の Update 141）/ REST API OpenAPI `figma/rest-api-spec` v0.44.0

## ディレクトリ構成

```text
skills/figma/
  SKILL.md
  references/
    rest-api/
      README.md
      authentication.md
      oauth-apps.md
      personal-access-tokens.md
      plan-access-tokens.md
      scopes.md
      rate-limits.md
      errors.md
      files.md
      file-versions.md
      comments.md
      users.md
      projects.md
      folders.md
      components.md
      variables.md
      dev-resources.md
      webhooks.md
      activity-logs.md
      ai-usage.md
      developer-logs.md
      discovery.md
      library-analytics.md
      payments.md
      oembed.md
      scim.md
    plugin-api/
      README.md
      manifest.md
      editor-types.md
      figma-global.md
      figma-ui.md
      figma-viewport.md
      figma-clientStorage.md
      figma-variables.md
      figma-codegen.md
      figma-payments.md
      figma-teamLibrary.md
      figma-parameters.md
      figma-annotations.md
      figma-timer.md
      figma-util.md
      figma-constants.md
      figma-textreview.md
      global-fetch.md
      node-document.md
      node-page.md
      node-frame.md
      node-group.md
      node-component.md
      node-component-set.md
      node-instance.md
      node-text.md
      node-vector.md
      node-boolean-operation.md
      node-shapes.md
      node-section-sticky-connector.md
      node-slides.md
      node-other.md
      node-properties.md
      data-types.md
    figma-mcp-server/
      README.md
      overview.md
      remote-server-installation.md
      desktop-server-installation.md
      rate-limits-access.md
      tools-and-prompts.md
      generative-plugins-and-shaders.md
      weave-tools.md
      create-skills.md
      make-context-resources.md
      write-to-canvas.md
      code-to-canvas.md
      code-connect-integration.md
      structure-figma-file.md
      write-effective-prompts.md
      trigger-specific-tools.md
      add-custom-rules.md
      avoid-large-frames.md
    code-connect/
      README.md
      overview.md
      quickstart.md
      ui-setup.md
      ui-github.md
      comparing-cc.md
      config-file.md
      template-files.md
      template-api.md
      batch-files.md
      cli-reference.md
      react.md
      html.md
      swiftui.md
      compose.md
      storybook.md
      custom-parsers.md
      templates-migration-guide.md
      common-issues.md
      ci-cd.md
    widget-api/
      README.md
      overview.md
      manifest.md
      setup-guide.md
      how-widgets-run.md
      widget-state-and-multiplayer.md
      figma-figjam-widgets.md
      handling-user-events.md
      using-the-plugin-api.md
      managing-multiple-widgets.md
      register.md
      waitForTask.md
      colorMapToOptions.md
      useSyncedState.md
      useSyncedMap.md
      useEffect.md
      usePropertyMenu.md
      useWidgetId.md
      useStickable.md
      useStickableHost.md
      AutoLayout.md
      Frame.md
      Text.md
      Input.md
      Rectangle.md
      Ellipse.md
      Image.md
      SVG.md
      Line.md
      Span.md
      Fragment.md
  samples/
    README.md
    rest-api-fetch-file-image-comments.md
    plugin-hello-world.md
    mcp-design-to-code-workflow.md
    code-connect-react-setup.md
    widget-minimal-counter.md
  scripts/
    README.md
    code-connect.md
    rest-api.md
    plugin-widget-dev.md
    mcp-server.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ファイル・画像・コメントを REST API で取得したい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| OAuth 認証・Personal / Plan Access Token を設定したい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| Variables・Dev Resources・Webhooks を REST API で操作したい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| SCIM・activity-logs・library-analytics (Enterprise) を使いたい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| folders（旧 projects）を REST API で一覧したい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| AI credit usage を日次・ユーザー単位で取得したい | rest-api | [references/rest-api/README.md](references/rest-api/README.md) |
| Plugin を開発したい（manifest・figma グローバル・node 操作） | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| figma.variables / figma.codegen / figma.ui を使いたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| FrameNode・TextNode・ComponentNode などのノード型を調べたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| data types (RGB, Paint, Effect, Transform 等) を調べたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| Figma MCP Server をセットアップしたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP ツール一覧・プロンプトパターンを調べたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| Code to Canvas・Write to Canvas を使いたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP のレート制限・プラン・AI credits を確認したい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP で generative plugin / shader のソースを読み書きしたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP から Figma Weave の tool / model を実行したい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP での効果的なプロンプトの書き方・カスタムルールを知りたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| Code Connect を template files（推奨）または legacy parser（React / SwiftUI / Compose / HTML）で導入したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| parser ベースの Code Connect を template file へ移行したい・publish エラー（413 等）を解決したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Code Connect の CLI コマンド・config ファイルを調べたい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Code Connect を Storybook・CI/CD と連携したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Template API・カスタムパーサーを実装したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Widget を開発したい（manifest・セットアップ・実行モデル） | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| useSyncedState / useSyncedMap でマルチプレイヤー状態を管理したい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| Widget の UI コンポーネント (AutoLayout, Text, Input 等) を使いたい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| usePropertyMenu・useEffect・useWidgetId を調べたい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
