---
name: cloudflare-sandbox-containers
description: >
  Cloudflare Sandbox SDK 1.0 / Containers (Durable Object から起動するコンテナ) の
  リファレンス。@cloudflare/sandbox、exec / processes / files / preview URLs / terminals / code interpreter、
  Container class (defaultPort / sleepAfter / getContainer)、
  instance types、wrangler containers、Sandbox SDK 0.x → 1.0 migration。
  Durable Objects は cloudflare-stateful、Wrangler は cloudflare-wrangler、Docker 本体は docker。
user-invocable: false
---

# Cloudflare Sandbox SDK / Containers リファレンス

Cloudflare 開発者プラットフォームの Sandbox SDK（`@cloudflare/sandbox`。Worker から隔離環境でコマンド・プロセス・ファイル・プレビュー・ターミナル・コードインタープリター・コーディングエージェントを扱う）と Containers（Durable Object から起動・管理するコンテナ。`Container` クラス、`wrangler.jsonc` の `containers` 設定、イメージ、スケーリング、料金・制限）を扱う。Sandbox SDK 0.x から 1.0 への移行手順も収録する。

セキュリティ方針: 本スキルのコマンド・コード例は使い捨てサンドボックス（またはコンテナ）内で実行するものであり、ホスト環境では実行しない。

## 対象バージョン

- `@cloudflare/sandbox` 1.0.3（0.x 系の本体は対象外、移行のみ `references/sandbox-migration/` に収録）
- `@cloudflare/containers` 0.3.7
- 出典: developers.cloudflare.com（公式 Markdown twin）。docs にタグが無いため、`cloudflare/cloudflare-docs` の production SHA `d0995b91312add6db730afec4f4944cee834abc6` と取得日 2026-11-03 で pin

## 他スキルとの使い分け

- cloudflare-stateful: Durable Objects 本体（storage / alarms / WebSocket 等）。本スキルは Durable Object から起動するコンテナ側（`Container` クラス・Sandbox SDK）のみ扱う
- cloudflare-workers: `env` / bindings の概念、ランタイム API、service bindings。本スキルはコンテナ・サンドボックスを呼ぶ側の API のみ扱う
- cloudflare-wrangler: Wrangler 全般。`wrangler containers` サブコマンドは同スキルの `commands/containers.md`、`wrangler.jsonc` の `containers` キー仕様は `configuration/containers.md` が一次情報。本スキルは運用・デプロイ視点の `references/containers/wrangler-configuration.md` と `scripts/` を扱う
- cloudflare-agents: Agents SDK 側のサンドボックスツール利用は同スキルが担当。本スキルは Sandbox SDK 自体の API を扱う
- docker: Docker Engine / Dockerfile / Compose / Buildx 本体。本スキルは Cloudflare Containers へのイメージ登録・デプロイのみ扱う
- anthropic-claude-code / openai-codex: エージェント本体（CLI・設定・機能）は各スキル。本スキルはサンドボックス内で動かす方法（`references/sandbox/claude-code.md` / `codex.md` ほか）のみ扱う
- cloudflare-ai / cloudflare-pages / cloudflare-storage: Workers AI・AI Gateway 等の AI 基盤、Pages、KV / D1 / R2 / Hyperdrive は各スキル。いずれにも無い Cloudflare 製品は公式 docs（`https://developers.cloudflare.com/<product>/`）を参照

## ディレクトリ構成

```text
skills/cloudflare-sandbox-containers/
  SKILL.md
  references/
    sandbox/
      README.md
      back-up-a-directory-to-r2.md
      build-a-coding-agent-runner.md
      build-an-ai-code-interpreter.md
      call-an-authenticated-api.md
      choose-a-sandbox-environment.md
      claude-code.md
      clone-a-private-repository.md
      codex.md
      coding-agents-overview.md
      directory-backup-api.md
      files-api.md
      follow-a-background-process.md
      list-sandboxes.md
      manage-files.md
      mount-an-r2-bucket.md
      open-a-terminal-in-the-browser.md
      opencode.md
      overview.md
      pi.md
      preview-a-web-application.md
      run-a-linux-command.md
      run-a-server-in-the-background.md
      run-background-processes.md
      run-code-when-a-sandbox-stops.md
      run-javascript-dynamic-workers.md
      run-python-code.md
      run-tests-from-git-repository.md
      s3-mount-api.md
      sandbox-lifetime.md
      sandbox-package.md
      sandbox-security.md
      save-a-sandbox-automatically.md
      save-and-restore-a-workspace.md
      serve-previews-on-their-own-hostnames.md
      stream-command-output.md
    containers/
      README.md
      api-comparison.md
      architecture.md
      container-class.md
      deploy.md
      durable-object-container.md
      environment-variables.md
      execute-commands.md
      faq.md
      get-started.md
      image-management.md
      limits.md
      local-dev.md
      outbound-traffic.md
      overview.md
      placement.md
      pricing.md
      rollouts.md
      scaling-and-routing.md
      scheduling-policy.md
      snapshots.md
      ssh.md
      workers-connections.md
      wrangler-configuration.md
    sandbox-migration/
      README.md
      api-map.md
      commands-and-processes.md
      files-and-storage.md
      networking-and-other.md
      overview.md
      plan-and-move.md
  samples/
    README.md
    call-authenticated-api-from-sandbox.md
    container-backend.md
    cron-container.md
    env-vars-and-secrets.md
    r2-fuse-mount.md
    run-tests-in-sandbox.md
    stateless-instances.md
    status-hooks.md
    stream-command-output.md
    websocket-to-container.md
  scripts/
    README.md
    deploy.md
    dev.md
    images.md
    install.md
    operate.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリ（sandbox / containers / sandbox-migration / samples / scripts）を探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は直下の `README.md`）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Sandbox SDK の概要・パッケージ・サンドボックスの寿命・セキュリティを知りたい | sandbox | [references/sandbox/README.md](references/sandbox/README.md) |
| サンドボックスでコマンド実行・出力ストリーミング・バックグラウンドプロセスを扱いたい | sandbox | [references/sandbox/README.md](references/sandbox/README.md) |
| ファイル操作・R2 マウント・ディレクトリのバックアップ / 復元をしたい | sandbox | [references/sandbox/README.md](references/sandbox/README.md) |
| プレビュー URL・ブラウザーターミナル・コードインタープリターを構築したい | sandbox | [references/sandbox/README.md](references/sandbox/README.md) |
| Claude Code / Codex / OpenCode / Pi などをサンドボックス内で動かしたい | sandbox | [references/sandbox/README.md](references/sandbox/README.md) |
| Container class（defaultPort / sleepAfter / getContainer）で Durable Object からコンテナを起動したい | containers | [references/containers/README.md](references/containers/README.md) |
| Containers のデプロイ・イメージ管理・instance types・スケーリングを設定したい | containers | [references/containers/README.md](references/containers/README.md) |
| コンテナの環境変数・外向き通信・ローカル開発・SSH・スナップショットを扱いたい | containers | [references/containers/README.md](references/containers/README.md) |
| Containers の制限・料金・FAQ を確認したい | containers | [references/containers/README.md](references/containers/README.md) |
| Sandbox SDK 0.x から 1.0 への移行手順・API 対応表を知りたい | sandbox-migration | [references/sandbox-migration/README.md](references/sandbox-migration/README.md) |
| 典型的な使い方を知りたい（Container バックエンド・cron・WebSocket・サンドボックスでのテスト実行） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド（wrangler containers、デプロイ、イメージ、運用）を知りたい | scripts | [scripts/README.md](scripts/README.md) |
