---
name: gcp-foundation
description: >
  Google Cloud (GCP) の基盤 (IAM / リソース階層 / 認証 / 課金) の gcloud・REST・IAM ロール・ガイド。
  IAM allow・deny・conditions・PAB・サービスアカウント・WIF・Workforce・PAM、Organization Policy、Cloud Billing 予算、Cloud Quotas、Service Usage、Cloud Asset Inventory、Customer Care、ADC・API キー・impersonation、Policy Intelligence、Essential Contacts、MCP servers。
  gcloud 全般は gcp-cli、言語別 ADC は gcp-client-libraries、KMS・VPC-SC・IAP は gcp-security とは別。
user-invocable: false
---

# gcp-foundation

Google Cloud (GCP) の基盤スキル。IAM・リソース階層・Organization Policy・Cloud Billing・Cloud Quotas / Service Usage・Cloud Asset Inventory・Customer Care・認証（ADC / トークン / API キー / impersonation）・Policy Intelligence・Essential Contacts・Identity Platform / Cloud Identity API・Google Cloud MCP servers の概要を扱う。

参照本文は英語（公式ドキュメントの原語）。

## ディレクトリ構成

```text
skills/gcp-foundation/
  SKILL.md
  references/
    asset-support/
      asset-inventory-core/
      asset-feeds-export/
      asset-analysis/
      support-cases/
      support-plans/              # 各ディレクトリに README.md と個別ページ
    auth-mcp/
      adc/
      api-keys/                   # 各ディレクトリに README.md と個別ページ
```

段階投入中の暫定版: 現時点で収録しているのは上記 2 カテゴリのみ。残り（gcloud / rest / rest-schemas / iam / iam-guides / resource-hierarchy / billing / samples / scripts と auth-mcp の残りカテゴリ）は後続 PR で追加され、最終 PR で本ファイルが完全版に置き換わる。


## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. （後続 PR で追加）gcloud コマンド → 下記マッピング表で `gcloud` を選び、`references/gcloud/<group>/README.md` からページ（GA は全文）を引く
2. （後続 PR で追加）REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`
3. （後続 PR で追加）IAM ロール・権限 → `references/iam/<service>.md`（ロール ID・権限名のサービス接頭辞で引く。例: `roles/orgpolicy.*` → `orgpolicy.md`）
4. 概念・手順 → 各ガイド（`iam-guides` / `resource-hierarchy` / `billing` / `asset-support` / `auth-mcp`）の README.md から個別ページを特定して Read する
5. （後続 PR で追加）作業例 → `samples/README.md`、コマンド集 → `scripts/README.md`

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud Asset Inventory の概要・アセットタイプ・クォータ | asset-support/asset-inventory-core | [references/asset-support/asset-inventory-core/README.md](references/asset-support/asset-inventory-core/README.md) |
| アセットのフィード・エクスポート（Pub/Sub / Cloud Storage / BigQuery） | asset-support/asset-feeds-export | [references/asset-support/asset-feeds-export/README.md](references/asset-support/asset-feeds-export/README.md) |
| アセット・IAM ポリシーの検索・SQL 分析 | asset-support/asset-analysis | [references/asset-support/asset-analysis/README.md](references/asset-support/asset-analysis/README.md) |
| サポートケース（Customer Care）の作成・管理 | asset-support/support-cases | [references/asset-support/support-cases/README.md](references/asset-support/support-cases/README.md) |
| サポートプランを比較・選びたい | asset-support/support-plans | [references/asset-support/support-plans/README.md](references/asset-support/support-plans/README.md) |
| ADC の仕組み・設定・トラブルシューティング | auth-mcp/adc | [references/auth-mcp/adc/README.md](references/auth-mcp/adc/README.md) |
| API キーの作成・制限・ベストプラクティス | auth-mcp/api-keys | [references/auth-mcp/api-keys/README.md](references/auth-mcp/api-keys/README.md) |

## 他スキルとの使い分け

- `gcp-cli` — gcloud 全般のインストール・設定・出力フォーマット・`gcloud auth` の使い方。基盤の 20 グループのコマンドは本スキル
- `gcp-client-libraries` — 言語別の ADC コード。ADC の仕組み・設定は本スキル
- `gcp-security` — KMS / Secret Manager / VPC Service Controls / IAP / SCC。IAM・Organization Policy は本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `google-gemini-api` — Gemini API キー。Google Cloud の API キー全般は本スキル
- `anthropic-claude-code-deploy` — Claude Code の Vertex 設定のみ。GCP 側の IAM・認証は本スキル
- `gws` — Google Workspace CLI。Workspace API は対象外
- Firebase は別計画（`firebase-*`）。本スキルでは扱わない

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-14、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/` `references/rest/` `references/rest-schemas/` `references/iam/` は機械生成（gcloud 593.0.0 / Discovery / IAM reference、取得 2026-11-14）で、別 PR で後から投入される。未投入の間は公式ドキュメントを確認する
- gcloud は GA コマンドが gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
- ガイドは主要ページの要約で、公式の全ページではない
- 変更ログ（release notes）と言語別サンプルは未収録（言語別コードは `gcp-client-libraries`）
- 権限の一括対応表（deny-permissions-support）は収録せず公式 URL を参照する
