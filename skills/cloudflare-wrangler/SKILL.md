---
name: cloudflare-wrangler
description: >
  Cloudflare Workers 開発ツール (Wrangler CLI v4 / @cloudflare/vite-plugin) の
  リファレンス。wrangler dev / deploy / versions / rollback / tail / secret / types の全フラグ、
  グローバルフラグ、製品別サブコマンド、wrangler.jsonc、.dev.vars、remote bindings、source maps。
user-invocable: false
---

# Cloudflare Workers 開発ツール リファレンス

> 分割 PR で順次追加中の部分版。現時点で収録済みなのは下記「ディレクトリ構成」とマッピング表に載っているカテゴリのみ。

Wrangler CLI・設定ファイル (wrangler.jsonc / wrangler.toml)・ローカル開発・Vite プラグイン・Vitest 統合・Miniflare・CI/CD・オブザーバビリティを扱う。Workers の開発・テスト・デプロイ・運用を設計・実装するときに参照する。

## 対象バージョン

- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため `cloudflare/cloudflare-docs` production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin
- wrangler 4.156.2（依存 workerd 1.20261102.1 / miniflare 5.20261102.0-beta。npm latest の miniflare は 4.20260730.0）
- @cloudflare/vite-plugin 1.67.0（2.0.0-beta は対象外）
- @cloudflare/vitest-plugin 1.5.0（公式移行ガイドに「`@cloudflare/vitest-plugin` replaces `@cloudflare/vitest-pool-workers`」と明記。旧パッケージ 0.23.0）
- 新 `cf` CLI（beta）は対象外

## 他スキルとの使い分け

- cloudflare-workers: ランタイム API（handlers / bindings 概念 / RPC / Web API / Node.js 互換）と、compatibility flags・cron・routes などランタイム側の挙動。本スキルの `configuration` カテゴリは設定ファイルのキー仕様を扱う
- cloudflare-storage: KV / D1 / R2 / Hyperdrive の API と、`wrangler kv|d1|r2|hyperdrive` のタスク別コマンド。全フラグ表は本スキルの `commands` にもある
- vite / vitest / github-docs: 各ツール本体の設定 API・構文。本スキルは Cloudflare 連携部分（`@cloudflare/vite-plugin`、`@cloudflare/vitest-plugin`、Workers 向け GitHub Actions）に限る
- 未収録の Cloudflare 製品は公式 docs を参照する
- cloudflare-workers / cloudflare-storage は同ファミリーの分割 PR で順次追加中。未マージの間は公式 docs（cloudflare-workers: https://developers.cloudflare.com/workers/runtime-apis/、cloudflare-storage: https://developers.cloudflare.com/kv/ ・ /d1/ ・ /r2/ ・ /hyperdrive/）を参照

## ディレクトリ構成

```text
skills/cloudflare-wrangler/
  SKILL.md
  references/
    commands/
      README.md
      overview.md
      global-flags.md
      general.md
      workers.md
      workers-versions.md
      workers-for-platforms.md
      api.md
      kv.md
      d1.md
      r2.md
      hyperdrive.md
      queues.md
      vectorize.md
      pipelines.md
      workflows.md
      secrets-store.md
      containers.md
      browser.md
      vpc.md
      tunnel.md
      certificates.md
      artifacts.md
      flagship.md
      pages.md
    configuration/
      README.md
      overview.md
      top-level-keys.md
      environments.md
      source-of-truth.md
      generated-config.md
      profiles.md
      install-and-update.md
      system-environment-variables.md
      proxy-support.md
      dev-settings.md
      routes.md
      triggers.md
      limits.md
      observability.md
      source-maps.md
      assets.md
      workers-sites.md
      secrets.md
      automatic-provisioning.md
      bindings-storage.md
      bindings-durable-objects.md
      bindings-workflows.md
      bindings-queues.md
      bindings-services-dispatch.md
      bindings-misc.md
      containers.md
      containers-durable-object-policy.md
      custom-builds.md
      bundling.md
      bundling-rules.md
      module-aliasing.md
      deprecations.md
      migration-v3-to-v4.md
      migration-v2-to-v3.md
      migration-v1-to-v2.md
      legacy-wrangler-v1.md
    local-development/
      README.md
      overview.md
      wrangler-vs-vite.md
      environment-variables.md
      bindings-per-env.md
      local-data.md
      local-explorer.md
      local-dev-tunnels.md
      multi-workers.md
    vite-plugin/
      README.md
      overview.md
      get-started.md
      tutorial.md
      api.md
      programmatic-configuration.md
      cloudflare-environments.md
      vite-environments.md
      static-assets.md
      secrets.md
      non-javascript-modules.md
      debugging.md
      migrating-from-wrangler-dev.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| `wrangler deploy` / `dev` / `tail` / `secret` / `types` のフラグを調べたい | commands | [references/commands/README.md](references/commands/README.md) |
| `wrangler versions` / `rollback` のコマンドを知りたい | commands | [references/commands/README.md](references/commands/README.md) |
| `wrangler kv` / `d1` / `r2` / `queues` / `vectorize` 等のサブコマンド全フラグを調べたい | commands | [references/commands/README.md](references/commands/README.md) |
| 全コマンド共通のグローバルフラグを知りたい | commands | [references/commands/README.md](references/commands/README.md) |
| wrangler.jsonc / wrangler.toml のトップレベルキーを調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| environments (`env.<name>`) の継承・上書きルールを知りたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| bindings 設定（KV / D1 / R2 / DO / Queues / Workflows / services）の記述形式を知りたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| routes / triggers / assets / limits / observability 設定キーを調べたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| bundling・custom build・module aliasing・Containers 設定を知りたい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Wrangler のインストール・更新、v1 / v2 / v3 からの移行、非推奨項目を確認したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| `wrangler dev` のローカル実行・ローカルデータ・remote bindings を扱いたい | local-development | [references/local-development/README.md](references/local-development/README.md) |
| `.dev.vars` / `.env` と環境別 bindings を設定したい | local-development | [references/local-development/README.md](references/local-development/README.md) |
| 複数 Worker のローカル連携・ローカル tunnel・Local Explorer を使いたい | local-development | [references/local-development/README.md](references/local-development/README.md) |
| wrangler dev と Vite 開発サーバーのどちらを使うか決めたい | local-development | [references/local-development/README.md](references/local-development/README.md) |
| `@cloudflare/vite-plugin` を導入・設定したい | vite-plugin | [references/vite-plugin/README.md](references/vite-plugin/README.md) |
| Vite の Cloudflare environments・静的アセット・secrets を扱いたい | vite-plugin | [references/vite-plugin/README.md](references/vite-plugin/README.md) |
| `wrangler dev` から Vite プラグインへ移行したい | vite-plugin | [references/vite-plugin/README.md](references/vite-plugin/README.md) |
