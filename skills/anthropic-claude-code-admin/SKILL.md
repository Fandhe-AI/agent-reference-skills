---
name: anthropic-claude-code-admin
description: >
  Claude Code (code.claude.com) の権限・セキュリティ・企業管理リファレンス。
  permissions (allow / ask / deny), permission modes, auto mode (classifier billing),
  sandboxing, sandbox environments, sandboxed Bash, zero data retention, data usage, HIPAA,
  managed settings (MDM / plist / registry), server-managed settings, managedMcpServers,
  allowedProviders, admin setup, authentication (SSO), network config, corporate launcher,
  OpenTelemetry monitoring, analytics, costs, large codebases, communications kit / champion kit。
user-invocable: false
---

# anthropic-claude-code-admin

Claude Code (code.claude.com) の権限管理・セキュリティ・企業導入設定のリファレンス。
permission modes / sandboxing / zero data retention などの権限・セキュリティ、
admin setup / authentication / network config / corporate launcher などの企業導入設定、
analytics / monitoring / costs / large codebases の利用状況管理をカバーする。

CLI 本体の `settings.json` は `anthropic-claude-code`、Agent SDK の permissions は `anthropic-agent-sdk`、
組織 API（Admin / Usage / Compliance）は `anthropic-admin-platform` を参照（本スキルは Claude Code CLI の
権限モード・サンドボックス・企業展開設定のみを担当）。
plugins / mods の組織ポリシー系ページは `anthropic-claude-code-extend` が担当。

## ディレクトリ構成

```text
skills/anthropic-claude-code-admin/
  SKILL.md
  references/
    permissions-security/
      README.md
      permissions.md
      permission-modes.md
      security.md
      security-guidance.md
      claude-security.md
      sandbox-environments.md
      sandboxing.md
      zero-data-retention.md
      data-usage.md
      legal-and-compliance.md
      hipaa-setup.md
      auto-mode-classifier-billing.md
    enterprise-setup/
      README.md
      admin-setup.md
      authentication.md
      network-config.md
      managed-settings.md
      server-managed-settings.md
      corporate-launcher.md
      managed-mcp.md
      third-party-integrations.md
      platforms.md
    usage-analytics/
      README.md
      analytics.md
      monitoring-usage.md
      costs.md
      large-codebases.md
    adoption/
      README.md
      communications-kit.md
      champion-kit.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 権限ルール（allow / ask / deny）・permission modes・auto mode・auto mode classifier 課金通知（CLAUDE_CODE_AUTO_MODE_SERVER）・サンドボックス環境選択・sandboxed Bash・zero data retention・データ使用ポリシー・HIPAA 対応設定（local mode）・脆弱性スキャン（Claude Security）・法的コンプライアンスを知りたい | permissions-security | [references/permissions-security/README.md](references/permissions-security/README.md) |
| 組織向け導入設定・authentication（SSO / OAuth / API キー）・企業ネットワーク設定（プロキシ / CA / mTLS）・managed settings の配布（MDM / plist / registry / managed-settings.json、managed sources の組み合わせ、policyHelper、managed-only keys）・allowedProviders・server-managed settings・corporate launcher 経由での運用・組織単位の MCP サーバーアクセス制御（managed MCP）・プラットフォーム別統合を知りたい | enterprise-setup | [references/enterprise-setup/README.md](references/enterprise-setup/README.md) |
| チーム利用状況の analytics・OpenTelemetry monitoring・コスト管理・モノレポ/大規模コードベースでの運用設定を知りたい | usage-analytics | [references/usage-analytics/README.md](references/usage-analytics/README.md) |
| 社内ロールアウト告知・drip campaign メッセージ・FAQ 返信・champion 向けプレイブック・30 日プランを知りたい | adoption | [references/adoption/README.md](references/adoption/README.md) |
