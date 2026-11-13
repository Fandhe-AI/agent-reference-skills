---
name: opencode-console
description: >
  OpenCode Console (opencode.ai/console のモデルゲートウェイ・OpenCode Go サブスク・ワークスペース管理) の
  リファレンス。Inference API, Providers API, API keys, service accounts, SSO (OIDC / SAML), SCIM,
  budgets, billing, x-opencode-actor JWT, hosted web search, Go 利用上限,
  harnesses (Claude Code / Codex / Hermes / Pi / Raycast)。
user-invocable: false
---

# OpenCode Console リファレンス

OpenCode Console（opencode.ai/console）を扱う。従量課金モデルのゲートウェイ（モデル ID・エンドポイント・料金・System One モデル）、自前プロバイダー接続と `x-opencode-actor` JWT、ホスト型 web search、OpenCode Go サブスクリプション（Go / Go Plus / Go Teams、利用上限、プライバシー）、ワークスペース管理（メンバー・SSO・SCIM・予算・課金）、Console の Inference API / Providers API / API キー、外部 harness（Claude Code / Codex / Hermes / Pi / Raycast）からの接続を参照する。

## 対象バージョン

- 出典: https://opencode.ai/docs/console/
- 原本: `anomalyco/opencode` タグ `v2.3.0`（commit `a6b15d3`、2026-11-13）の `services/site/src/docs/content/console/**/*.mdx`

## 他スキルとの使い分け

- opencode: OpenCode CLI・`opencode.jsonc` 設定・agents / models / MCP 等の利用者向け。本スキルは Console（ホスト型ゲートウェイ・Go・ワークスペース）側のみ扱う
- opencode-build: `@opencode/plugin` / `@opencode/client` / `@opencode/sdk` と OpenCode サーバー HTTP API。本スキルの Inference API（`/inference`）は OpenCode サーバー HTTP API とは別物
- anthropic-claude-code / openai-codex / hermes-agent: harness 本体の設定・機能は各スキル。本スキルの `references/harnesses/` は Console を接続先にする手順のみ
- anthropic-api-core / openai-api-core / google-gemini-api: 各社 API 本体の仕様は各スキル。本スキルは Console が互換エンドポイントとして提供する部分のみ
- go-echo: OpenCode Go は Go 言語とは無関係。Go 言語の Web フレームワークは go-echo
- 他スキルへの相対リンクは使わず、スキル名で参照する

## ディレクトリ構成

```text
skills/opencode-console/
  SKILL.md
  references/
    console/
      README.md
      overview.md
      models-overview.md
      models-endpoints.md
      models-system-one.md
      models-pricing.md
      providers.md
      websearch.md
      go-overview.md
      go-usage-limits.md
      go-endpoints.md
      go-privacy.md
    workspace/
      README.md
      workspaces.md
      members.md
      sso.md
      scim.md
      budgets.md
      billing.md
    api/
      README.md
      overview.md
      inference.md
      providers.md
    harnesses/
      README.md
      overview.md
      claude-code.md
      codex.md
      hermes.md
      pi.md
      raycast.md
  samples/
    README.md
    claude-code-via-console.md
    codex-via-console.md
    hermes-via-console.md
    pi-via-console.md
    raycast-via-console.md
    harness-base-urls-sessions.md
    inference-api-requests.md
    providers-api-requests.md
    service-account-api-key.md
    go-subscription-setup.md
    provider-actor-token-verification.md
    sso-oidc-saml-domain-verification.md
    scim-directory-sync.md
    hosted-web-search.md
  scripts/
    README.md
    console-api.md
    harnesses.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（samples / scripts は各 README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Console の概要・始め方・ポリシーを知りたい | console | [references/console/README.md](references/console/README.md) |
| モデル ID・エンドポイント・AI SDK パッケージ・料金・System One モデルを調べたい | console | [references/console/README.md](references/console/README.md) |
| 自前プロバイダーの接続・独自料金・`x-opencode-actor` JWT を知りたい | console | [references/console/README.md](references/console/README.md) |
| ホスト型 web search の料金・有効化を知りたい | console | [references/console/README.md](references/console/README.md) |
| OpenCode Go のプラン・利用上限・エンドポイント・プライバシーを知りたい | console | [references/console/README.md](references/console/README.md) |
| ワークスペースの作成・切替・削除・ロールを知りたい | workspace | [references/workspace/README.md](references/workspace/README.md) |
| メンバー招待・ロール変更・削除をしたい | workspace | [references/workspace/README.md](references/workspace/README.md) |
| SSO (OIDC / SAML)・ドメイン検証・SCIM 2.0 ディレクトリ同期を設定したい | workspace | [references/workspace/README.md](references/workspace/README.md) |
| 予算上限・支払い方法・クレジット・自動チャージ・請求書を扱いたい | workspace | [references/workspace/README.md](references/workspace/README.md) |
| API キー（個人 / service account）・権限・失効を知りたい | api | [references/api/README.md](references/api/README.md) |
| Inference API（OpenAI / Anthropic / Gemini 互換）とコスト取得を知りたい | api | [references/api/README.md](references/api/README.md) |
| Providers API で接続済みプロバイダーを呼びたい | api | [references/api/README.md](references/api/README.md) |
| Claude Code / Codex / Hermes / Pi / Raycast から Console を使いたい | harnesses | [references/harnesses/README.md](references/harnesses/README.md) |
| harness 共通の API キー・base URL・セッション・Console MCP を知りたい | harnesses | [references/harnesses/README.md](references/harnesses/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI・curl コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
