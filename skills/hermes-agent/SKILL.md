---
name: hermes-agent
description: >
  Hermes Agent CLI リファレンス。
  インストール、CLI コマンド (chat, model, gateway, config, skills, cron, webhook, mcp, profile)、
  Configuration (Terminal Backends, Memory, TTS / STT, Compression, Display, Auxiliary Models)、
  Features (Tools, Skills, MCP, Memory, Voice Mode, Personality, Context Files)、
  Messaging Gateway (14+ プラットフォーム)、Security、Architecture。
user-invocable: false
model: sonnet
---

# Hermes Agent リファレンス

Hermes Agent — Nous Research が開発したオープンソース AI CLI エージェント。
マルチ LLM プロバイダー対応、メッセージングプラットフォーム統合、MCP 連携、音声モード、スキルシステムを備える。
CLI 操作・設定カスタマイズ・機能活用・デプロイ時に参照する。

## ディレクトリ構成

```text
skills/hermes-agent/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      quickstart.md
      learning-path.md
    cli/
      README.md
      commands.md
      interface.md
    configuration/
      README.md
      configuration.md
    features/
      README.md
      tools.md
      skills.md
      mcp.md
      memory.md
      voice-mode.md
      personality.md
      context-files.md
    messaging/
      README.md
      messaging.md
    security/
      README.md
      security.md
    guides/
      README.md
      mcp-guide.md
      voice-mode-guide.md
      tips.md
    architecture/
      README.md
      architecture.md
    reference/
      README.md
      faq.md
      skills-hub.md
  samples/
    README.md
    basic-chat.md
    mcp-server-setup.md
    messaging-gateway.md
    skills-install.md
    memory-management.md
    voice-mode.md
    docker-terminal.md
    cron-scheduling.md
  scripts/
    README.md
    install.md
    cli.md
    setup.md
    gateway.md
    skills.md
    mcp.md
    sessions.md
    auth.md
    cron.md
    plugins.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、クイックスタート、学習パス、プロバイダー設定 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| CLI 起動オプション、キーバインド、スラッシュコマンド、全 CLI コマンドリファレンス | cli | [references/cli/README.md](references/cli/README.md) |
| config.yaml 設定、Terminal Backend (Docker/SSH/Modal 等)、TTS/STT、Display、Compression | configuration | [references/configuration/README.md](references/configuration/README.md) |
| Tools & Toolsets、Memory、Skills、MCP、Voice Mode、Personality、Context Files | features | [references/features/README.md](references/features/README.md) |
| Messaging Gateway、Telegram/Discord/Slack/WhatsApp 等の連携、サービス管理 | messaging | [references/messaging/README.md](references/messaging/README.md) |
| セキュリティモデル、Dangerous Command Approval、Container Isolation、SSRF Protection | security | [references/security/README.md](references/security/README.md) |
| MCP 実践ガイド、Voice Mode セットアップ、Tips & Best Practices | guides | [references/guides/README.md](references/guides/README.md) |
| 内部アーキテクチャ、サブシステム構成、設計原則 | architecture | [references/architecture/README.md](references/architecture/README.md) |
| FAQ、トラブルシューティング、Skills Hub 概要 | reference | [references/reference/README.md](references/reference/README.md) |
| 典型的な使い方を知りたい（チャット、MCP、音声、Docker、スケジュール等） | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・ゲートウェイ起動・認証・Cron 等を実行したい | scripts | [scripts/README.md](scripts/README.md) |
