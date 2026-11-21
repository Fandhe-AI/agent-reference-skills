---
name: gcp-agent-search
description: >
  Google Cloud (GCP) の Agent Search (旧 Vertex AI Search、Discovery Engine API) と Gemini Enterprise (旧 Agentspace)。app・engine・data store・ingestion・search / streamAnswer / summarySpec・ranking・serving controls・user events・autocomplete・CMEK・コネクタ・ADK / A2A agent 登録・REST・IAM。Gemini Developer API は google-gemini-api、Agent Platform は gcp-agent-platform。
user-invocable: false
---

# gcp-agent-search

Google Cloud (GCP) の検索・アンサー生成・社内エージェント基盤スキル。Agent Search（旧 Vertex AI Search。API は引き続き Discovery Engine、`discoveryengine.googleapis.com`）と Gemini Enterprise（旧 Agentspace）を扱う。

- Agent Search: app（engine）・data store・取り込み（website / 非構造化 / 構造化 / FHIR）・スキーマ・parse と chunk・ドメイン検証・search / `searchLite`・filter・boost・`streamAnswer`・check grounding・`summarySpec`・snippets・ranking API・custom ranking・serving controls・user events・autocomplete・CMEK・データソースのアクセス制御・VPC Service Controls・Organization Policy
- Gemini Enterprise: エディションとライセンス・app 作成・Assistant 設定・コネクタと data store（Cloud Storage・BigQuery・Knowledge Catalog・custom MCP server）・ADK / A2A agent の登録と共有・`streamAssist` による agent 呼び出し・Agent Registry からの取り込み・app 単位の IAM policy・identity provider（Workforce Identity Federation）
- 機械生成: REST（Discovery）`discoveryengine` 1 API、メッセージスキーマ 1688 件、IAM（`roles/discoveryengine.*`）

参照本文は英語（公式ドキュメントの原語）。**gcloud のグループはこれらのプロダクトに無い**ため `references/gcloud/`（後続 PR で投入） は無く、手順の正は REST・クライアントライブラリ・コンソール（`gcloud auth print-access-token` は REST 呼び出しの bearer token を得るためだけに使う）。

名称の対応（出典 https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes 、取得 2026-11-21）: Vertex AI Search → Agent Search、Agentspace → Gemini Enterprise、Vertex AI → Gemini Enterprise Agent Platform（Agent Platform）。API 名・IAM ロールの接頭辞（`roles/discoveryengine.*`）は旧名のまま。

## ディレクトリ構成

```text
skills/gcp-agent-search/
  SKILL.md
  references/
    agent-search-overview-setup/         # 14 ページ: 概要・セットアップ・認証・IAM・app 作成・LRO
      README.md
      <page>.md
    data-stores-ingestion/               # 6 ページ: データ準備・スキーマ・parse / chunk・website indexing
      README.md
      <page>.md
    answers-summaries/                   # 7 ページ: streamAnswer・grounding・summary・snippets・モデル
      README.md
      <page>.md
    gemini-enterprise-agents-admin/      # 6 ページ: ADK / A2A agent の登録・共有・呼び出し・IAM
      README.md
      <page>.md
```

完成形の収録ページ数は機械生成 20（rest 4・rest-schemas 12・iam 4）と手書き 68 の計 88。`references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） の API は `discoveryengine`（Discovery Engine API）のみ。メソッドは 4 分割（billingAccounts・projects。`projects.locations.collections.dataStores` / `engines`・`userEvents`・`rankingConfigs`・`sampleQuerySets` 等）、IAM は 4 分割（`discoveryengine-1` はロール 6、`discoveryengine-2` はロール 11 と権限、`discoveryengine-3` / `discoveryengine-4` は権限の続き）。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でガイドのカテゴリを選び、その README.md から個別ページを特定して Read する（各カテゴリ（サブディレクトリ）に README.md がある。ガイド直下に README.md は無い）。Agent Search（検索 app）は `agent-search-overview-setup` から、Gemini Enterprise（社内アシスタント・agent）は、agent の登録・共有・呼び出しなら `gemini-enterprise-agents-admin`、app の作成・設定・アシスタントの機能なら `gemini-enterprise-overview-apps`（後続 PR で投入） から入る
2. gcloud コマンド → このスキルには無い。REST かクライアントライブラリ、コンソールの手順を引く。REST を `curl` で呼ぶときの bearer token は `gcloud auth print-access-token` で得る
3. 検索の挙動の調整（filter・boost・ranking・serving controls・relevance filter）は `search-query-results`（後続 PR で投入） と `ranking-serving-controls`（後続 PR で投入）、生成回答（`streamAnswer`・summary・grounding）は `answers-summaries`
4. エージェントの登録・共有・呼び出しは `gemini-enterprise-agents-admin`。Agent Runtime 上に ADK agent を作る側は `gcp-agent-platform`（予定を含む他スキルは下記「他スキルとの使い分け」）

未投入カテゴリ（`rest` / `rest-schemas` / `iam` / `search-query-results` / `user-events-autocomplete` / `ranking-serving-controls` / `security-identity-access` / `gemini-enterprise-overview-apps` / `gemini-enterprise-connectors-data-stores`）の探索手順は投入時に追加する。それまで gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Agent Search の始め方（プロジェクト・課金・API の有効化）・カスタム検索のチェックリスト・Enterprise edition | agent-search-overview-setup | [references/agent-search-overview-setup/README.md](references/agent-search-overview-setup/README.md) |
| 認証（ADC・API キー・impersonation）・IAM ロール・検索 app（engine）の作成・対応言語 | agent-search-overview-setup | [references/agent-search-overview-setup/README.md](references/agent-search-overview-setup/README.md) |
| long-running operation の確認・Programmable Search Engine からの移行 | agent-search-overview-setup | [references/agent-search-overview-setup/README.md](references/agent-search-overview-setup/README.md) |
| データの準備（website・非構造化・構造化・FHIR）・data store の作成と取り込み | data-stores-ingestion | [references/data-stores-ingestion/README.md](references/data-stores-ingestion/README.md) |
| スキーマの指定・ドキュメントの parse と chunk（RAG 向け）・advanced website indexing・ドメイン検証 | data-stores-ingestion | [references/data-stores-ingestion/README.md](references/data-stores-ingestion/README.md) |
| `streamAnswer` による生成回答・check grounding・検索の要約（`summarySpec`）・snippets・extractive content | answers-summaries | [references/answers-summaries/README.md](references/answers-summaries/README.md) |
| agentic retrieval のストリーミング・回答生成モデルのバージョン・safety settings と fallback | answers-summaries | [references/answers-summaries/README.md](references/answers-summaries/README.md) |
| ADK agent・A2A agent の登録と管理・Agent Registry からの取り込み・agent の共有と所有権の移転 | gemini-enterprise-agents-admin | [references/gemini-enterprise-agents-admin/README.md](references/gemini-enterprise-agents-admin/README.md) |
| `streamAssist` での agent 呼び出し・app 単位の IAM policy（`getIamPolicy` / `setIamPolicy`） | gemini-enterprise-agents-admin | [references/gemini-enterprise-agents-admin/README.md](references/gemini-enterprise-agents-admin/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `rest` / `rest-schemas` / `iam` / `search-query-results` / `user-events-autocomplete` / `ranking-serving-controls` / `security-identity-access` / `gemini-enterprise-overview-apps` / `gemini-enterprise-connectors-data-stores`。収録済みのページは各カテゴリの README.md の索引で確認する

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API（aistudio.google.com、Google AI Studio の API キー）と Gen AI SDK。本スキルは Google Cloud 上の Agent Search / Gemini Enterprise
- `gcp-agent-platform` — Agent Platform（旧 Vertex AI）。Gemini モデルの呼び出し・RAG Engine・Vector Search（Agent Retrieval）・Agent Runtime（旧 Agent Engine）での ADK agent の開発とデプロイ・Agent Registry / Agent Gateway・Agent Identity。本スキルは登録済み agent を Gemini Enterprise の app から使う側
- `gcp-gemini-enterprise-cx` — Gemini Enterprise for Customer Experience（CX Agent Studio）・Customer Experience Insights・CCAI Platform。名称が似ているが別製品で、本スキルの Gemini Enterprise はナレッジワーカー向けの社内アシスタント・検索
- `gcp-integration` — Application Integration と Integration Connectors。Gemini Enterprise のコネクタとは別製品（名称が近い）
- `gcp-knowledge-catalog` — Knowledge Catalog。本スキルは Gemini Enterprise からの federated query 接続のページのみ
- `gcp-bigquery` — BigQuery。本スキルは BigQuery を data store として接続するガイドのみ
- `gcp-storage` — Cloud Storage。本スキルは Cloud Storage を data store として取り込むガイドのみ
- `gcp-security` — Cloud KMS・Secret Manager・VPC Service Controls の本体。本スキルは Agent Search の CMEK 登録と VPC-SC の設定のガイド
- `gcp-security-compliance` — Model Armor・Security Command Center（AI protection）
- `gcp-foundation` — IAM 全般・サービスアカウント・Workload Identity Federation・ADC・Organization Policy・クォータ全般。本スキルは製品別ロールの機械生成ページと Workforce Identity の設定
- `gcp-observability` — Cloud Logging / Monitoring / Trace
- `gcp-cli` — gcloud 全般のインストール・設定・認証・出力フォーマット
- `gcp-client-libraries` — Node.js / Python / Rust のクライアントライブラリ共通パターン
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gcp-ai-apis`（予定）— Retail API / AI Commerce Search・Agent Assist・Speech / Translation / Vision 等
- `anthropic-*` — Claude 自体。Google 側の Agent Runtime / ADK は Claude Code・Agent SDK・OpenAI Agents とは別

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- Gemini Enterprise のコネクタ別ページ 331 件（主要コネクタの概要は `gemini-enterprise-connectors-data-stores/introduction-to-connectors-and-data-stores.md`（後続 PR で投入） のみ収録）
- Retail API / AI Commerce Search（`gcp-ai-apis`（予定）の担当）
- 料金（取得していない。公式の料金ページを確認する）
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-21（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（IAM。roles-permissions reference）
- REST・スキーマは `google-api-python-client` 同梱の Discovery document（commit は未取得）。gcloud は本スキルに無い（gcloud 593.0.0 の help も未使用）
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） `references/iam/`（後続 PR で投入） は機械生成。他の 10 カテゴリは公式ガイド由来の手書き
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に `Corrected from the official docs:` 等で理由を残す
- 終了・非推奨（references で確認したもの）:
  - Agent Search for healthcare は非推奨で 2027-05-15 以降は利用できない（`data-stores-ingestion/prepare-data.md` の出典 https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data ）
  - Grounded Generation API は非推奨で新規リクエストを受け付けない。本スキルは現行機能として扱わない（`answers-summaries` 参照。出典 https://docs.cloud.google.com/generative-ai-app-builder/docs/grounded-gen ）
- 新しいメソッド・機能は公式 reference で確認する
