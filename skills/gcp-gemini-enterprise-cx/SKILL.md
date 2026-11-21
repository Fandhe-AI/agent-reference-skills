---
name: gcp-gemini-enterprise-cx
description: >
  Google Cloud (GCP) の Gemini Enterprise for Customer Experience (CX Agent Studio, ces API) と Customer Experience Insights (旧 Contact Center AI Insights, Quality AI, BigQuery export) と CCAI Platform (contactcenteraiplatform, virtual agents, Web SDK v3)。agents / tools / A2A / MCP、evaluation、IAM・REST。gcloud なし。Gemini Developer API は google-gemini-api、Dialogflow は gcp-ai-apis（予定）。
user-invocable: false
---

# gcp-gemini-enterprise-cx

Google Cloud (GCP) のカスタマーエクスペリエンス（コンタクトセンター）向け AI 系スキル。3 製品を扱う。

- Gemini Enterprise for Customer Experience（CX Agent Studio、`ces` API）— agent と agent application・instruction・variable・callback・handoff・guardrail・tools（OpenAPI・MCP・Python・client function・data store・agent as a tool・A2A）・deploy・API access・version・evaluation・アクセス制御・VPC Service Controls・CMEK
- Customer Experience Insights（旧 Contact Center AI Insights、`contactcenterinsights` API）— 会話データの ingest・analysis（analysis rule・summarization・topic modeling・queryMetrics）・Quality AI・BigQuery export・Pub/Sub 通知・fine-grained access control・CMEK・リージョン
- CCAI Platform（`contactcenteraiplatform` API）— instance の作成と設定・audit logging・VPC Service Controls・カスタム組織ポリシー制約・virtual agents・Apps API / Manager API・Web SDK v3・モバイル SDK・webhooks

加えて REST（Discovery）3 API と IAM のロール・権限を機械生成で収録する。

参照本文は英語（公式ドキュメントの原語）。**gcloud のグループはこれらのプロダクトに無い**ため `references/gcloud/` は無く、手順の正は REST とコンソール（`gcloud auth print-access-token` は REST 呼び出しの bearer token を得るためだけに使う）。

製品名の変更: Contact Center AI Insights → Customer Experience Insights。API 名（`contactcenterinsights`）・IAM ロール接頭辞は旧名のまま。

## ディレクトリ構成

```text
skills/gcp-gemini-enterprise-cx/
  SKILL.md
  references/
    rest/                          # 機械生成: Discovery 由来のメソッド表（3 API）
      README.md
      ces/                         # README.md + ces.md
      contactcenteraiplatform/     # README.md + contactcenteraiplatform.md
      contactcenterinsights/       # README.md + contactcenterinsights-1.md, -2.md
    rest-schemas/                  # 機械生成: Discovery 由来のメッセージスキーマ
      README.md
      ces/                         # README.md + ces-1.md ... ces-3.md
      contactcenteraiplatform/     # README.md + contactcenteraiplatform.md
      contactcenterinsights/       # README.md + contactcenterinsights-1.md ... -5.md
    iam/                           # 機械生成: IAM roles-permissions reference（5 ファイル）
      README.md
      ces-1.md, ces-2.md
      contactcenteraiplatform.md
      contactcenterinsights-1.md, contactcenterinsights-2.md
    cx-agent-studio-overview-build/            # 11 ページ
      README.md
      <page>.md
    cx-agent-studio-tools/                     # 11 ページ
      README.md
      <page>.md
    cx-agent-studio-deploy-evaluate-access/    # 7 ページ
      README.md
      <page>.md
    insights-ingest-analysis/                  # 10 ページ
      README.md
      <page>.md
    insights-quality-export-access/            # 10 ページ
      README.md
      <page>.md
    ccai-platform-overview-setup/              # 4 ページ
      README.md
      <page>.md
    ccai-platform-virtual-agents/              # 7 ページ
      README.md
      <page>.md
    ccai-platform-apis-sdks/                   # 10 ページ
      README.md
      <page>.md
```

手書きのガイドは 8 カテゴリ・計 70 ページ。`references/rest/` `references/rest-schemas/` の API（3）: `ces`（Gemini Enterprise for Customer Experience API）/ `contactcenteraiplatform`（Contact Center AI Platform API）/ `contactcenterinsights`（Contact Center AI Insights API）。

`references/iam/` のファイル（5）: `ces-1`（11 ロール・13 権限）/ `ces-2`（続きの 72 権限）/ `contactcenteraiplatform`（3 ロール・14 権限）/ `contactcenterinsights-1`（6 ロール・87 権限）/ `contactcenterinsights-2`（続きの 104 権限）。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（references 直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）。製品の切り分けは `cx-agent-studio-*`（CX Agent Studio）・`insights-*`（Customer Experience Insights）・`ccai-platform-*`（CCAI Platform）
2. gcloud コマンド → このスキルには無い。公式ドキュメントの手順はコンソールと REST。REST を `curl` で呼ぶときの bearer token は `gcloud auth print-access-token` で得る
3. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。`<api>` は `ces` / `contactcenteraiplatform` / `contactcenterinsights` の 3 つ
4. IAM ロール・権限 → `references/iam/README.md` の索引から引く。ロール ID（例: `roles/ces.*`・`roles/contactcenterinsights.*`・`roles/contactcenteraiplatform.*`）で `references/iam/` 配下を grep して該当ファイルを特定する。`ces` と `contactcenterinsights` は 2 ファイルに分かれるため、両方を grep する
5. CX Agent Studio のロール・条件付きバインディングは `cx-agent-studio-deploy-evaluate-access/access-control.md`、Insights の閲覧範囲の制御は `insights-quality-export-access/` の fine-grained access control の 2 ページ
6. Dialogflow や Agent Assist は他スキル（下記「他スキルとの使い分け」）

`samples/` と `scripts/` は本スキルに無い。コードは各ガイドのコードブロックを引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| ロール ID の権限一覧・事前定義ロールを調べたい | iam | [references/iam/README.md](references/iam/README.md) |
| REST のメソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| CX Agent Studio API（ces）のメソッド | rest/ces | [references/rest/ces/README.md](references/rest/ces/README.md) |
| CCAI Platform API（contactcenteraiplatform）のメソッド（instance の管理） | rest/contactcenteraiplatform | [references/rest/contactcenteraiplatform/README.md](references/rest/contactcenteraiplatform/README.md) |
| Customer Experience Insights API（contactcenterinsights）のメソッド | rest/contactcenterinsights | [references/rest/contactcenterinsights/README.md](references/rest/contactcenterinsights/README.md) |
| REST のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| ces のメッセージ型 | rest-schemas/ces | [references/rest-schemas/ces/README.md](references/rest-schemas/ces/README.md) |
| contactcenteraiplatform のメッセージ型 | rest-schemas/contactcenteraiplatform | [references/rest-schemas/contactcenteraiplatform/README.md](references/rest-schemas/contactcenteraiplatform/README.md) |
| contactcenterinsights のメッセージ型 | rest-schemas/contactcenterinsights | [references/rest-schemas/contactcenterinsights/README.md](references/rest-schemas/contactcenterinsights/README.md) |
| CX Agent Studio の概要・セットアップ・クイックスタート（weather agent） | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| agent と agent application（root / sub-agent）・instruction・テンプレート構文・variable・callback・handoff rule | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| guardrail・supervisor agent・Dialogflow CX の flow を再利用する flow-based agent | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| tool の作成と種類・OpenAPI tool・MCP server への接続・Python code tool・client function tool | cx-agent-studio-tools | [references/cx-agent-studio-tools/README.md](references/cx-agent-studio-tools/README.md) |
| data store tool・agent as a tool・system tool（customize_response / end_session） | cx-agent-studio-tools | [references/cx-agent-studio-tools/README.md](references/cx-agent-studio-tools/README.md) |
| A2A Protocol・pass-through mode・リモート sub-agent のデプロイ・CX Agent Studio のリモート MCP server | cx-agent-studio-tools | [references/cx-agent-studio-tools/README.md](references/cx-agent-studio-tools/README.md) |
| デプロイのチャネル（web widget 等）・runSession / BidiRunSession・version とリストア | cx-agent-studio-deploy-evaluate-access | [references/cx-agent-studio-deploy-evaluate-access/README.md](references/cx-agent-studio-deploy-evaluate-access/README.md) |
| evaluation（scenario / simulation / golden test case）・IAM ロール・VPC Service Controls・CMEK（CX Agent Studio） | cx-agent-studio-deploy-evaluate-access | [references/cx-agent-studio-deploy-evaluate-access/README.md](references/cx-agent-studio-deploy-evaluate-access/README.md) |
| Customer Experience Insights の概要・API の有効化・会話データの JSON 形式 | insights-ingest-analysis | [references/insights-ingest-analysis/README.md](references/insights-ingest-analysis/README.md) |
| 会話の ingest（UploadConversation / IngestConversations）・分析の作成・bulk analyze・analysis rule | insights-ingest-analysis | [references/insights-ingest-analysis/README.md](references/insights-ingest-analysis/README.md) |
| summarization・topic modeling・queryMetrics（Preview） | insights-ingest-analysis | [references/insights-ingest-analysis/README.md](references/insights-ingest-analysis/README.md) |
| Quality AI（scorecard・スコア計算・モデル調整・ベストプラクティス） | insights-quality-export-access | [references/insights-quality-export-access/README.md](references/insights-quality-export-access/README.md) |
| BigQuery への export とスキーマ（version 19）・Pub/Sub 通知 | insights-quality-export-access | [references/insights-quality-export-access/README.md](references/insights-quality-export-access/README.md) |
| authorized views による fine-grained access control・CMEK・リージョンとエンドポイント（Insights） | insights-quality-export-access | [references/insights-quality-export-access/README.md](references/insights-quality-export-access/README.md) |
| CCAI Platform の概要・instance 作成・サイズとクォータ・ポータルのロール | ccai-platform-overview-setup | [references/ccai-platform-overview-setup/README.md](references/ccai-platform-overview-setup/README.md) |
| CCAI Platform の audit logging・VPC Service Controls と Private Service Connect・カスタム組織ポリシー制約 | ccai-platform-overview-setup | [references/ccai-platform-overview-setup/README.md](references/ccai-platform-overview-setup/README.md) |
| virtual agent（Dialogflow または CX Agent Studio）の連携・queue への割り当て・人間 agent への transfer | ccai-platform-virtual-agents | [references/ccai-platform-virtual-agents/README.md](references/ccai-platform-virtual-agents/README.md) |
| virtual agent へのデータ渡し・custom payload・Insights への送信 | ccai-platform-virtual-agents | [references/ccai-platform-virtual-agents/README.md](references/ccai-platform-virtual-agents/README.md) |
| Apps API / Manager API・認証情報・reporting endpoint・チャットの server 側連携・webhooks | ccai-platform-apis-sdks | [references/ccai-platform-apis-sdks/README.md](references/ccai-platform-apis-sdks/README.md) |
| Web SDK v3・headless web SDK・Flutter / React Native のモバイル SDK・SDK の end user 認証（JWT） | ccai-platform-apis-sdks | [references/ccai-platform-apis-sdks/README.md](references/ccai-platform-apis-sdks/README.md) |

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API（aistudio.google.com）と Google GenAI SDK。本スキルは Google Cloud 上のコンタクトセンター向け製品
- `gcp-agent-platform` — Gemini Enterprise Agent Platform（旧 Vertex AI）。ADK・Agent Runtime（旧 Agent Engine）・Gemini モデルの利用。A2A のリモート sub-agent を Agent Runtime にデプロイする側の一般論は同スキル、本スキルは CX Agent Studio からの接続
- `gcp-agent-search` — Agent Search（旧 Vertex AI Search）と Gemini Enterprise（旧 Agentspace）。data store tool の接続先になる data store の作成・取り込みは同スキル
- `gcp-ai-apis`（予定）— Dialogflow ES / CX API・Agent Assist・Speech-to-Text 等。本スキルの CX Agent Studio は Dialogflow CX の flow を再利用できるが、Dialogflow そのものの API は同スキル
- `gcp-integration` — Application Integration と Integration Connectors。CX Agent Studio の Integration Connector tool が使う connection の作成は同スキル
- `gcp-bigquery` — BigQuery。Insights の export 先テーブルのクエリ・権限は同スキル、本スキルは export の手順とスキーマ
- `gcp-messaging-workflows` — Pub/Sub。Insights の通知の受信側（topic・subscription）は同スキル
- `gcp-security` — Cloud KMS（CMEK の鍵）・VPC Service Controls の境界の一般論
- `gcp-security-compliance` — Model Armor。CX Agent Studio のリモート MCP server が参照する Model Armor の設定は同スキル
- `gcp-observability` — Cloud Logging・Cloud Audit Logs の閲覧
- `gcp-networking` — Private Service Connect・VPC・Service Directory
- `gcp-foundation` — IAM・サービスアカウント・Organization Policy 全般。本スキルは製品別ロールの機械生成ページ
- `gcp-run` — Cloud Run（A2A のリモート sub-agent の置き場）
- `gcp-storage` — Cloud Storage（CX Agent Studio の権限で参照するバケット側）
- `gcp-cli` — gcloud 全般のインストール・設定・認証
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `anthropic-*` / `openai-agents` — Claude・OpenAI の agent。CX Agent Studio の agent は Google Cloud のコンタクトセンター向けで、Claude Code・Agent SDK・OpenAI Agents SDK とは別物
- `mcp-spec` — MCP 仕様。本スキルは CX Agent Studio が MCP server に接続する側と、CX Agent Studio のリモート MCP server の設定

## 対象外

次は現時点の方針として収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- CCAI Platform の SaaS 管理画面ページの大半（約 7% のみ選定。instance 作成・virtual agents・API・SDK・audit logging・VPC SC・組織ポリシー制約に絞った）
- Agent Assist・Dialogflow ES / CX の API は `gcp-ai-apis`（予定）の担当
- 料金（取得していない）。公式の料金ページで確認する
- CX Agent Studio と Customer Experience Insights の監査ログ ページ（メソッドと権限タイプの対応表。CCAI Platform は `ccai-platform-overview-setup/audit-logging.md` を収録）と事前定義ロールの一覧ページ（ロールは `references/iam/` に機械生成）
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-21（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（IAM roles-permissions の機械生成分）
- REST ページは `google-api-python-client` 同梱の Discovery document から機械生成（commit SHA は未取得）
- 機械生成は `references/rest/` `references/rest-schemas/` `references/iam/`。他の 8 カテゴリは公式ガイド由来の手書き
- gcloud のグループは無いため gcloud 593.0.0 の help は使っていない
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に `Corrected from the official docs:` の行で理由を残す
- 新しいメソッド・機能は公式 reference で確認する
