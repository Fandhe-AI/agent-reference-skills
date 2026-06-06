---
name: figma
description: >
  Figma REST API / Plugin API / Widget API / Code Connect / MCP Server リファレンス。
  OAuth / Personal Access Token / Plan Access Token 認証、files, variables, webhooks,
  Dev Mode, Dev Resources, SCIM, activity-logs, library-analytics エンドポイント。
  figma グローバルオブジェクト、node types (FrameNode, TextNode, ComponentNode 等)、
  data types、figma.variables、figma.codegen、figma.ui。
  useSyncedState, useSyncedMap, usePropertyMenu, AutoLayout, register。
  Code Connect CLI / UI / React / SwiftUI / Compose / HTML / Storybook / custom parsers。
  Figma MCP Server ツール・プロンプト・Code to Canvas・Write to Canvas。
user-invocable: false
---

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
      components.md
      variables.md
      dev-resources.md
      webhooks.md
      activity-logs.md
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
      tools-and-prompts.md
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
| Plugin を開発したい（manifest・figma グローバル・node 操作） | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| figma.variables / figma.codegen / figma.ui を使いたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| FrameNode・TextNode・ComponentNode などのノード型を調べたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| data types (RGB, Paint, Effect, Transform 等) を調べたい | plugin-api | [references/plugin-api/README.md](references/plugin-api/README.md) |
| Figma MCP Server をセットアップしたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP ツール一覧・プロンプトパターンを調べたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| Code to Canvas・Write to Canvas を使いたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| MCP での効果的なプロンプトの書き方・カスタムルールを知りたい | figma-mcp-server | [references/figma-mcp-server/README.md](references/figma-mcp-server/README.md) |
| Code Connect を React / SwiftUI / Compose / HTML に導入したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Code Connect の CLI コマンド・config ファイルを調べたい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Code Connect を Storybook・CI/CD と連携したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Template API・カスタムパーサーを実装したい | code-connect | [references/code-connect/README.md](references/code-connect/README.md) |
| Widget を開発したい（manifest・セットアップ・実行モデル） | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| useSyncedState / useSyncedMap でマルチプレイヤー状態を管理したい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| Widget の UI コンポーネント (AutoLayout, Text, Input 等) を使いたい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| usePropertyMenu・useEffect・useWidgetId を調べたい | widget-api | [references/widget-api/README.md](references/widget-api/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
