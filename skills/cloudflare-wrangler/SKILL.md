---
name: cloudflare-wrangler
description: >
  Cloudflare Workers 開発ツール (Wrangler CLI v4 / @cloudflare/vite-plugin / Vitest 統合 / Miniflare) の
  リファレンス。wrangler dev / deploy / versions / rollback / tail / secret / types の全フラグ、
  wrangler.jsonc、.dev.vars、remote bindings、
  @cloudflare/vitest-plugin (旧 vitest-pool-workers)、gradual deployments、
  Workers Builds、source maps。
  ランタイム API は cloudflare-workers、KV / D1 / R2 は cloudflare-storage。
user-invocable: false
---

# Cloudflare Workers 開発ツール リファレンス

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
- 同ファミリーの他製品: Durable Objects / Queues / Workflows は cloudflare-stateful、Pages / Pages Functions は cloudflare-pages、Sandbox SDK / Containers は cloudflare-sandbox-containers、Workers AI / AI Gateway / Vectorize / AI Search は cloudflare-ai、Agents SDK は cloudflare-agents。製品スキルは API・概念とタスク別コマンド、`wrangler` の全フラグ表は本スキルの `commands`

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
    vitest-integration/
      README.md
      vitest-overview.md
      testing-overview.md
      write-your-first-test.md
      configuration.md
      test-apis.md
      isolation-and-concurrency.md
      mock-outbound-requests.md
      recipes.md
      debugging.md
      known-issues.md
      migrate-to-vitest-plugin.md
      migrate-from-vitest-3-to-vitest-4.md
      migrate-from-unstable-dev.md
      migrate-from-miniflare-2.md
    miniflare/
      README.md
      overview.md
      get-started.md
      writing-tests.md
      compatibility.md
      fetch-events.md
      scheduled-events.md
      queues.md
      modules.md
      multiple-workers.md
      web-standards.md
      websockets.md
      variables-secrets.md
      cache.md
      kv.md
      d1.md
      r2.md
      durable-objects.md
      debugger.md
      live-reload.md
      migrating-from-v2.md
      unstable-startworker.md
      test-harness-overview.md
      test-harness-get-started.md
      test-harness-configure.md
      test-harness-prepare-test-state.md
      test-harness-interact-with-workers.md
      test-harness-integrations.md
    ci-cd-deployments/
      README.md
      builds-overview.md
      builds-configuration.md
      builds-branches-and-paths.md
      builds-build-image.md
      builds-git-integration.md
      builds-api-reference.md
      builds-deploy-hooks.md
      builds-event-subscriptions.md
      builds-troubleshoot.md
      external-ci-github-actions.md
      external-ci-gitlab-cicd.md
      versions-overview.md
      versions-gradual-deployments.md
      versions-version-affinity.md
      versions-version-overrides.md
      versions-version-urls.md
      previews-overview.md
      previews-compare-workflows.md
      previews-configuration.md
      previews-custom-domains.md
      previews-test-and-debug.md
      previews-examples.md
      previews-resources.md
    observability/
      README.md
      overview.md
      workers-logs.md
      real-time-logs.md
      tail-workers.md
      logpush.md
      traces.md
      custom-spans.md
      spans-and-attributes.md
      opentelemetry-export.md
      metrics-and-analytics.md
      query-builder.md
      errors.md
      issues.md
      issues-investigate.md
      source-maps.md
      devtools.md
      cpu-profiling.md
      memory-profiling.md
      profiling-in-production.md
  samples/
    README.md
    dev-vars-secrets.md
    remote-bindings.md
    vite-react-spa-api.md
    vite-cloudflare-environments.md
    vitest-first-test.md
    vitest-mock-outbound-requests.md
    vitest-d1-migrations.md
    vitest-scheduled-queue-durable-objects.md
    vitest-workflow-introspection.md
    miniflare-node-test.md
    miniflare-dispatch-events.md
    test-harness-first-test.md
    test-harness-prepare-state.md
    github-actions-deploy.md
    gradual-deployment.md
  scripts/
    README.md
    install-auth.md
    dev.md
    environments.md
    secrets-env.md
    deploy-versions.md
    vite-plugin.md
    testing.md
    ci.md
    observability.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 動く実例は `samples/README.md`、コピペ実行できるコマンドは `scripts/README.md` を併せて引く

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
| `@cloudflare/vitest-plugin` で Workers のテストを書きたい | vitest-integration | [references/vitest-integration/README.md](references/vitest-integration/README.md) |
| テスト API（`cloudflare:test`）・分離と並行実行・外部リクエストのモックを知りたい | vitest-integration | [references/vitest-integration/README.md](references/vitest-integration/README.md) |
| `vitest-pool-workers` や `unstable_dev` からの移行手順を知りたい | vitest-integration | [references/vitest-integration/README.md](references/vitest-integration/README.md) |
| Miniflare を Node.js から起動して Worker をテストしたい | miniflare | [references/miniflare/README.md](references/miniflare/README.md) |
| test harness / `unstable_startWorker` の使い方を知りたい | miniflare | [references/miniflare/README.md](references/miniflare/README.md) |
| Miniflare の KV / D1 / R2 / DO / Queues シミュレーションを調べたい | miniflare | [references/miniflare/README.md](references/miniflare/README.md) |
| Workers Builds（Git 連携ビルド）を設定・トラブルシュートしたい | ci-cd-deployments | [references/ci-cd-deployments/README.md](references/ci-cd-deployments/README.md) |
| GitHub Actions / GitLab CI/CD から Worker をデプロイしたい | ci-cd-deployments | [references/ci-cd-deployments/README.md](references/ci-cd-deployments/README.md) |
| gradual deployments・version affinity・version overrides を使いたい | ci-cd-deployments | [references/ci-cd-deployments/README.md](references/ci-cd-deployments/README.md) |
| preview URLs・Preview 環境の設定とカスタムドメインを知りたい | ci-cd-deployments | [references/ci-cd-deployments/README.md](references/ci-cd-deployments/README.md) |
| Workers Logs / Real-time logs / Logpush / Tail Workers を設定したい | observability | [references/observability/README.md](references/observability/README.md) |
| traces・custom spans・OpenTelemetry エクスポートを設定したい | observability | [references/observability/README.md](references/observability/README.md) |
| source maps・CPU / メモリプロファイリング・DevTools でデバッグしたい | observability | [references/observability/README.md](references/observability/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
