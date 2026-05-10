---
name: hermes-agent
description: >
  Hermes Agent CLI リファレンス。
  インストール、CLI コマンド (chat, model, gateway, config, skills, cron, webhook, mcp, profile 等)、
  Configuration (Terminal Backends 6種, Memory, TTS/STT, Compression, Display, Auxiliary Models 等)、
  Features (Tools, Skills, MCP, Memory, Voice Mode, Personality, Context Files)、
  Messaging Gateway (14+ プラットフォーム)、
  Security (5層防御モデル, Container Isolation, Tirith, SSRF Protection)、
  Architecture
user-invocable: false
model: sonnet
---

# Hermes Agent リファレンス

Hermes Agent — Nous Research が開発したオープンソース AI CLI エージェント。
マルチ LLM プロバイダー対応、メッセージングプラットフォーム統合、MCP 連携、音声モード、スキルシステムを備える。
CLI 操作・設定カスタマイズ・機能活用・デプロイ時に参照する。

## ディレクトリ構造

```
.claude/skills/hermes-agent/
├── SKILL.md                                    ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md               ← Getting Started 索引（3ページ）
    ├── cli/README.md                           ← CLI 索引（2ページ）
    ├── configuration/README.md                 ← Configuration 索引（1ページ）
    ├── features/README.md                      ← Features 索引（7ページ）
    ├── messaging/README.md                     ← Messaging Gateway 索引（1ページ）
    ├── security/README.md                      ← Security 索引（1ページ）
    ├── guides/README.md                        ← Guides 索引（3ページ）
    ├── architecture/README.md                  ← Architecture 索引（1ページ）
    └── reference/README.md                     ← Reference 索引（2ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、クイックスタート、学習パス、プロバイダー設定 | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| CLI 起動オプション、キーバインド、スラッシュコマンド、全 CLI コマンドリファレンス | cli | [references/cli/README.md](./references/cli/README.md) |
| config.yaml 設定、Terminal Backend (Docker/SSH/Modal 等)、TTS/STT、Display、Compression | configuration | [references/configuration/README.md](./references/configuration/README.md) |
| Tools & Toolsets、Memory、Skills、MCP、Voice Mode、Personality、Context Files | features | [references/features/README.md](./references/features/README.md) |
| Messaging Gateway、Telegram/Discord/Slack/WhatsApp 等の連携、サービス管理 | messaging | [references/messaging/README.md](./references/messaging/README.md) |
| セキュリティモデル、Dangerous Command Approval、Container Isolation、SSRF Protection | security | [references/security/README.md](./references/security/README.md) |
| MCP 実践ガイド、Voice Mode セットアップ、Tips & Best Practices | guides | [references/guides/README.md](./references/guides/README.md) |
| 内部アーキテクチャ、サブシステム構成、設計原則 | architecture | [references/architecture/README.md](./references/architecture/README.md) |
| FAQ、トラブルシューティング、Skills Hub 概要 | reference | [references/reference/README.md](./references/reference/README.md) |
