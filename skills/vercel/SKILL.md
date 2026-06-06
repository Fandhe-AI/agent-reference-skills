---
name: vercel
description: >
  Vercel プラットフォームリファレンス。Vercel CLI、vercel.json / vercel.ts 設定、
  Vercel Functions（Node.js / Edge / Fluid Compute / ISR / Middleware）、
  Vercel Blob、Edge Config、Marketplace Storage（Neon / Upstash / Supabase）、
  デプロイメント管理（Git 連携 / rollback / rolling release）、
  環境変数、ドメイン、DNS、ログ、キャッシュ、CDN。
user-invocable: false
---

## ディレクトリ構成

```text
skills/vercel/
  SKILL.md
  references/
    cli/
      README.md
      overview.md
      global-options.md
      activity.md
      agent.md
      alerts.md
      alias.md
      api.md
      bisect.md
      blob.md
      build.md
      buy.md
      cache.md
      certs.md
      contract.md
      curl.md
      deploy.md
      dev.md
      dns.md
      domains.md
      env.md
      firewall.md
      flags.md
      git.md
      guidance.md
      help.md
      httpstat.md
      init.md
      inspect.md
      install.md
      integration.md
      link.md
      list.md
      login.md
      logout.md
      logs.md
      mcp.md
      metrics.md
      microfrontends.md
      open.md
      project.md
      promote.md
      pull.md
      redeploy.md
      redirects.md
      remove.md
      rollback.md
      rolling-release.md
      routes.md
      sandbox.md
      skills-cmd.md
      switch.md
      target.md
      teams.md
      telemetry.md
      traces.md
      usage.md
      webhooks.md
      whoami.md
    configuration/
      README.md
      vercel-json.md
      vercel-ts.md
      git-configuration.md
      build-output-api.md
    functions/
      README.md
      overview.md
      fluid-compute.md
      node-js-runtime.md
      edge-runtime.md
      runtimes.md
      configuring-functions.md
      regions.md
      max-duration.md
      memory.md
      limitations.md
      routing-middleware.md
      isr.md
      image-optimization.md
      streaming.md
      usage-and-pricing.md
    storage/
      README.md
      overview.md
      vercel-blob/
        README.md
        overview.md
        blob-sdk.md
        private-storage.md
        public-storage.md
        server-upload.md
        client-upload.md
        pricing.md
      edge-config/
        README.md
        overview.md
        edge-config-sdk.md
        vercel-api.md
        using-edge-config.md
        limits.md
      marketplace/
        README.md
        overview.md
        neon.md
        upstash.md
        supabase.md
    deployment/
      README.md
      overview.md
      environments.md
      git-integration.md
      vercel-for-github.md
      vercel-for-gitlab.md
      vercel-for-bitbucket.md
      generated-urls.md
      deploy-hooks.md
      managing-deployments.md
      promoting-deployments.md
      instant-rollback.md
      rolling-releases.md
      rolling-release-deployment.md
  samples/
    README.md
    deploy-cli.md
    deploy-git-integration.md
    vercel-json-config.md
    env-vars.md
    blob-storage.md
  scripts/
    README.md
    install.md
    auth.md
    setup.md
    deploy.md
    env.md
    logs.md
    promote-rollback.md
    domains.md
    ops.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの README.md を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| CLI コマンドの使い方を知りたい（deploy, dev, env, rollback など） | cli | [references/cli/README.md](references/cli/README.md) |
| CLI のグローバルオプション（--token, --scope, --debug）を確認したい | cli | [references/cli/README.md](references/cli/README.md) |
| vercel.json / vercel.ts の設定項目を確認したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Build Output API の仕様を確認したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Vercel Functions の概要・ランタイムを知りたい | functions | [references/functions/README.md](references/functions/README.md) |
| Fluid Compute / Edge Runtime / Node.js Runtime の違いを確認したい | functions | [references/functions/README.md](references/functions/README.md) |
| ISR・Middleware・ストリーミング・画像最適化を知りたい | functions | [references/functions/README.md](references/functions/README.md) |
| Functions のリージョン・最大実行時間・メモリ制限を確認したい | functions | [references/functions/README.md](references/functions/README.md) |
| Vercel Blob の使い方（アップロード・一覧・削除）を知りたい | storage/vercel-blob | [references/storage/vercel-blob/README.md](references/storage/vercel-blob/README.md) |
| Edge Config の読み取り・更新 API を確認したい | storage/edge-config | [references/storage/edge-config/README.md](references/storage/edge-config/README.md) |
| Neon / Upstash / Supabase の接続方法を知りたい | storage/marketplace | [references/storage/marketplace/README.md](references/storage/marketplace/README.md) |
| ストレージ製品の比較・選定をしたい | storage | [references/storage/README.md](references/storage/README.md) |
| Git 連携・自動デプロイの設定を知りたい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| デプロイ環境（Preview / Production / Custom）を理解したい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| rollback・rolling release・promote の手順を確認したい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| Deploy Hooks・生成 URL・デプロイ管理を知りたい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを実行したい | scripts | [scripts/README.md](scripts/README.md) |
