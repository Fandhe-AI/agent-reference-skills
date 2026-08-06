---
name: openai-apps-sdk
description: >
  OpenAI Apps SDK / ChatGPT plugins (developers.openai.com/plugins) のリファレンス。
  ChatGPT 内で動くアプリを MCP サーバーとして公開する側の API。
  window.openai, useOpenAiGlobal, registerAppTool, ui://widget,
  _meta, openai/outputTemplate, OAuth 認証, Checkout API,
  接続テスト・審査・申請。
user-invocable: false
---

## ディレクトリ構成

```text
skills/openai-apps-sdk/
  SKILL.md
  references/
    concepts/
      README.md
      quickstart.md
      plugin-architecture.md
      mcp-server.md
      plugin-skills.md
      ui-guidelines.md
      plan-use-cases.md
      define-tools.md
    build/
      README.md
      app-quickstart.md
      mcp-server.md
      chatgpt-ui.md
      auth.md
      build-skills.md
      package-plugin.md
      checkout-monetization.md
    reference/
      README.md
      window-openai-bridge.md
      file-apis.md
      host-backed-navigation.md
      tool-descriptor-meta.md
      tool-annotations.md
      component-resource-meta.md
      tool-results.md
      client-provided-meta.md
    deploy/
      README.md
      connect-and-test.md
      review-requirements.md
      submission.md
      submission-errors.md
      troubleshooting.md
      app-guidelines.md
    guides/
      README.md
      optimize-metadata.md
      security-privacy.md
  samples/
    README.md
    minimal-mcp-server.md
    tool-with-ui-resource.md
    window-openai-state.md
    oauth-auth-flow.md
    file-input-tool.md
    checkout-flow.md
    read-only-annotations.md
  scripts/
    README.md
    install.md
    local-dev-and-inspector.md
    package-and-marketplace.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（または `samples/README.md` / `scripts/README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

`concepts/mcp-server.md` と `build/mcp-server.md`、`concepts/quickstart.md` と `build/app-quickstart.md` は同名・類似名だが別ページ。`concepts` は「MCP サーバーが何を公開するか・呼び出しフローの概念」、`build` は「実装・結果返却・認証・デプロイの実作業」を扱う。目的が概念理解か実装かでカテゴリを判定する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プラグインの形状（skills/MCP/UI）を理解したい、MCP サーバーの構成要素を知りたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| ChatGPT に接続して個人プラグインとして試したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| ツール定義の契約（read/write, safety annotation）を設計したい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| MCP サーバーを実装してツール・結果返却・デプロイを作り込みたい | build | [references/build/README.md](references/build/README.md) |
| MCP Apps ブリッジで UI（iframe / window.openai 拡張）を追加したい | build | [references/build/README.md](references/build/README.md) |
| OAuth 2.1 認証・plugin.json マニフェスト・課金（checkout）を実装したい | build | [references/build/README.md](references/build/README.md) |
| `window.openai` API・`_meta` フィールド・tool annotations の詳細シグネチャを調べたい | reference | [references/reference/README.md](references/reference/README.md) |
| ファイルアップロード API・ホスト連携ナビゲーションの仕様を調べたい | reference | [references/reference/README.md](references/reference/README.md) |
| ChatGPT への接続テスト・審査要件・提出フォームを知りたい | deploy | [references/deploy/README.md](references/deploy/README.md) |
| プラグイン提出時のエラーコード・トラブルシューティングを調べたい | deploy | [references/deploy/README.md](references/deploy/README.md) |
| ツール名・description・パラメータのメタデータを最適化したい | guides | [references/guides/README.md](references/guides/README.md) |
| セキュリティ・プライバシー・プロンプトインジェクション対策を確認したい | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方を知りたい（動く MCP サーバー / UI リソース / OAuth / Checkout の実例） | samples | [samples/README.md](samples/README.md) |
| インストール・ローカル開発・パッケージング・マーケットプレイス CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
