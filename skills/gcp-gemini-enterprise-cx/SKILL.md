---
name: gcp-gemini-enterprise-cx
description: >
  Google Cloud (GCP) の Gemini Enterprise for Customer Experience (CX Agent Studio, ces API) と CCAI Platform (contactcenteraiplatform, virtual agents, Web SDK v3) と Customer Experience Insights (旧 Contact Center AI Insights, Quality AI, BigQuery export)。agents / tools / A2A / MCP、evaluation、IAM・REST。製品専用の gcloud グループなし。Gemini Developer API は google-gemini-api、Dialogflow は gcp-ai-apis（予定）。
user-invocable: false
---

# gcp-gemini-enterprise-cx

Google Cloud (GCP) のカスタマーエクスペリエンス（コンタクトセンター）向け AI 系スキル。3 製品を扱う。

分割投入中: 以下の収録範囲と機械生成の層は完成形の内容。分割投入中のため、未投入のカテゴリ（`rest` / `rest-schemas` / `iam` / `cx-agent-studio-tools` / `insights-ingest-analysis` / `insights-quality-export-access`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。未投入の機能は、投入までは公式ドキュメント（https://docs.cloud.google.com/ ）を引く。

- Gemini Enterprise for Customer Experience（CX Agent Studio、`ces` API）— agent と agent application・instruction・variable・callback・handoff・guardrail・tools（OpenAPI・MCP・Python・client function・data store・agent as a tool・A2A）・deploy・API access・version・evaluation・アクセス制御・VPC Service Controls・CMEK
- Customer Experience Insights（旧 Contact Center AI Insights、`contactcenterinsights` API）— 会話データの ingest・analysis（analysis rule・summarization・topic modeling・queryMetrics）・Quality AI・BigQuery export・Pub/Sub 通知・fine-grained access control・CMEK・リージョン
- CCAI Platform（`contactcenteraiplatform` API）— instance の作成と設定・audit logging・VPC Service Controls・カスタム組織ポリシー制約・virtual agents・Apps API / Manager API・Web SDK v3・モバイル SDK・webhooks

加えて REST（Discovery）3 API と IAM のロール・権限を機械生成で収録する。

参照本文は英語（公式ドキュメントの原語）。**製品専用の gcloud グループはこれらのプロダクトに無い**ため本スキルは gcloud のカテゴリを持たず、手順の正は REST とコンソール。API の有効化・組織ポリシー・サービス境界・認証・Cloud Run へのデプロイ・Model Armor の floor setting といった共通の gcloud コマンドは、使う手順のページに例として収録する（探索手順 2）。

製品名の変更: Contact Center AI Insights → Customer Experience Insights。API 名（`contactcenterinsights`）・IAM ロール接頭辞は旧名のまま。

## ディレクトリ構成

```text
skills/gcp-gemini-enterprise-cx/
  SKILL.md
  references/
    cx-agent-studio-overview-build/            # 11 ページ
      README.md
      <page>.md
    cx-agent-studio-deploy-evaluate-access/    # 7 ページ
      README.md
      <page>.md
    ccai-platform-overview-setup/              # 4 ページ
      README.md
      <page>.md
    ccai-platform-virtual-agents/              # 7 ページ
      README.md
      <page>.md
    ccai-platform-apis-sdks/                   # 9 ページ
      README.md
      <page>.md
```

完成形では手書きのガイドは 8 カテゴリ・計 69 ページ。`references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） の API（3）: `ces`（Gemini Enterprise for Customer Experience API）/ `contactcenteraiplatform`（Contact Center AI Platform API）/ `contactcenterinsights`（Contact Center AI Insights API）。
## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（references 直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある）。製品の切り分けは `cx-agent-studio-*`（CX Agent Studio）・`insights-*`（後続 PR で投入）（Customer Experience Insights）・`ccai-platform-*`（CCAI Platform）
2. gcloud コマンド → 製品専用のコマンドとカテゴリは無い（手順はコンソールと REST。REST を `curl` で呼ぶときの bearer token は `gcloud auth print-access-token` で得る）。共通コマンドの例は次のページにある: `gcloud services enable` は `ccai-platform-overview-setup/get-started.md`、`gcloud org-policies` は `ccai-platform-overview-setup/ccaip-custom-constraints.md`、`gcloud access-context-manager perimeters create` は `ccai-platform-overview-setup/vpc-service-controls.md`、`gcloud auth login` / `gcloud auth application-default login` は `cx-agent-studio-overview-build/quick-setup.md` と `insights-ingest-analysis/before-you-begin.md`（後続 PR で投入）、`gcloud run deploy` は `cx-agent-studio-tools/a2a-remote-agent-deployment.md`（後続 PR で投入）、`gcloud model-armor floorsettings update` は `cx-agent-studio-tools/mcp-server.md`（後続 PR で投入）。各コマンドの全フラグは `gcp-cli` と担当スキル（`gcp-foundation` 等）
3. CX Agent Studio のロール・条件付きバインディングは `cx-agent-studio-deploy-evaluate-access/access-control.md`、Insights の閲覧範囲の制御は `insights-quality-export-access/`（後続 PR で投入） の fine-grained access control の 2 ページ
4. Dialogflow や Agent Assist は他スキル（下記「他スキルとの使い分け」）

未投入カテゴリ（`rest` / `rest-schemas` / `iam` / `cx-agent-studio-tools` / `insights-ingest-analysis` / `insights-quality-export-access`）の探索手順は投入時に追加する。それまで上の手順が未投入カテゴリを指すときは、該当する公式ガイド（https://docs.cloud.google.com/ 配下）を引く。gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| CX Agent Studio の概要・セットアップ・クイックスタート（weather agent） | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| agent と agent application（root / sub-agent）・instruction・テンプレート構文・variable・callback・handoff rule | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| guardrail・supervisor agent・Dialogflow CX の flow を再利用する flow-based agent | cx-agent-studio-overview-build | [references/cx-agent-studio-overview-build/README.md](references/cx-agent-studio-overview-build/README.md) |
| デプロイのチャネル（web widget 等）・runSession / BidiRunSession・version とリストア | cx-agent-studio-deploy-evaluate-access | [references/cx-agent-studio-deploy-evaluate-access/README.md](references/cx-agent-studio-deploy-evaluate-access/README.md) |
| evaluation（scenario / simulation / golden test case）・IAM ロール・VPC Service Controls・CMEK（CX Agent Studio） | cx-agent-studio-deploy-evaluate-access | [references/cx-agent-studio-deploy-evaluate-access/README.md](references/cx-agent-studio-deploy-evaluate-access/README.md) |
| CCAI Platform の概要・instance 作成・サイズとクォータ・ポータルのロール | ccai-platform-overview-setup | [references/ccai-platform-overview-setup/README.md](references/ccai-platform-overview-setup/README.md) |
| CCAI Platform の audit logging・VPC Service Controls と Private Service Connect・カスタム組織ポリシー制約 | ccai-platform-overview-setup | [references/ccai-platform-overview-setup/README.md](references/ccai-platform-overview-setup/README.md) |
| virtual agent（Dialogflow または CX Agent Studio）の連携・queue への割り当て・人間 agent への transfer | ccai-platform-virtual-agents | [references/ccai-platform-virtual-agents/README.md](references/ccai-platform-virtual-agents/README.md) |
| virtual agent へのデータ渡し・custom payload・Insights への送信 | ccai-platform-virtual-agents | [references/ccai-platform-virtual-agents/README.md](references/ccai-platform-virtual-agents/README.md) |
| Apps API / Manager API・認証情報・reporting endpoint・チャットの server 側連携・webhooks | ccai-platform-apis-sdks | [references/ccai-platform-apis-sdks/README.md](references/ccai-platform-apis-sdks/README.md) |
| Web SDK v3・headless web SDK・Flutter / React Native のモバイル SDK・SDK の end user 認証（JWT） | ccai-platform-apis-sdks | [references/ccai-platform-apis-sdks/README.md](references/ccai-platform-apis-sdks/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest` / `rest-schemas` / `iam` / `cx-agent-studio-tools` / `insights-ingest-analysis` / `insights-quality-export-access`。収録済みのページは各カテゴリの README.md の索引で確認する

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API（aistudio.google.com）と Google GenAI SDK。本スキルは Google Cloud 上のコンタクトセンター向け製品
- `gcp-agent-platform`（分割投入中で未配布。それまでは公式ドキュメント https://docs.cloud.google.com/ を引く） — Gemini Enterprise Agent Platform（旧 Vertex AI）。ADK・Agent Runtime（旧 Agent Engine）・Gemini モデルの利用。A2A のリモート sub-agent を Agent Runtime にデプロイする側の一般論は同スキル、本スキルは CX Agent Studio からの接続
- `gcp-agent-search`（分割投入中で未配布。それまでは公式ドキュメント https://docs.cloud.google.com/ を引く） — Agent Search（旧 Vertex AI Search）と Gemini Enterprise（旧 Agentspace）。data store tool の接続先になる data store の作成・取り込みは同スキル
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
- CX Agent Studio と Customer Experience Insights の監査ログ ページ（メソッドと権限タイプの対応表。CCAI Platform は `ccai-platform-overview-setup/audit-logging.md` を収録）と事前定義ロールの一覧ページ（ロールは `references/iam/`（後続 PR で投入） に機械生成）
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-21（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（IAM roles-permissions の機械生成分）
- REST ページは `google-api-python-client` 同梱の Discovery document から機械生成（commit SHA は未取得）
- 機械生成は `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） `references/iam/`（後続 PR で投入）。他の 8 カテゴリ（完成形）は公式ガイド由来の手書き
- 製品専用の gcloud グループは無いため gcloud の機械生成ページは持たない。共通コマンドの例の一部は gcloud 593.0.0 の help から借り、そのページの Notes に `Snippet taken from` で出典を記す（`get-started.md`・`vpc-service-controls.md`）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に `Corrected from the official docs:` の行で理由を残す
- 新しいメソッド・機能は公式 reference で確認する
