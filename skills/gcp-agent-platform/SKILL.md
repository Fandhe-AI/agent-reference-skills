---
name: gcp-agent-platform
description: >
  Google Cloud (GCP) の Gemini Enterprise Agent Platform (旧 Vertex AI) の Gemini 推論 (function calling・grounding・context caching・embeddings・Live API)・Model Garden・tuning・evaluation・Provisioned Throughput・Agent Runtime (旧 Agent Engine)・Agent Gateway・Memory Bank・Agent Identity・Agent Registry・RAG Engine・Vector Search。gcloud ai。Gemini Developer API は google-gemini-api
user-invocable: false
---

# gcp-agent-platform

Google Cloud (GCP) の Gemini Enterprise Agent Platform（以下 Agent Platform。旧 Vertex AI）のスキル。収録範囲は次のとおり。

- 概要・セットアップ・認証・SDK（Google Gen AI SDK）・Gemini Developer API からの移行
- Gemini モデルの利用（text generation・structured output・function calling・thinking・grounding・context caching・batch inference・embeddings・Live API）
- Model Garden とオープン / パートナーモデル、tuning、Gen AI evaluation service
- Provisioned Throughput・消費モデル・クォータ（429）、safety と responsible AI
- IAM・VPC Service Controls・CMEK・data residency、online inference・Model Registry・ML Diagnostics の基本
- Agent Runtime（旧 Agent Engine）の開発・デプロイ・管理、Sessions と Memory Bank
- Agent Gateway とガバナンス、Agent Identity と Agent Registry
- RAG Engine、Vector Search 2.0（旧称は Vertex AI Vector Search 2.0、現称 Agent Retrieval。gcloud グループは `vector-search` のまま）
- Gemini Cloud Assist と Gemini Code Assist（概要と終了告知のみ）

機械生成の層として、gcloud 8 グループ（`ai` / `ai-platform` / `gemini` / `vector-search` / `agent-identity` / `agent-registry` / `developer-knowledge` / `mldiagnostics`）、REST 5 API（`aiplatform` / `agentregistry` / `deepreview` / `ml` / `datalabeling`）、メッセージスキーマ、IAM ロール・権限を収録する。分割投入中のため、未投入のカテゴリ（`gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-sdk` / `text-generation-structured-output` / `function-calling-thinking` / `grounding` / `context-cache-batch-inference` / `embeddings` / `live-api` / `model-garden-open-partner-models` / `tuning` / `evaluation` / `consumption-provisioned-throughput` / `safety-responsible-ai` / `security-iam-vpc-sc-cmek` / `ml-inference-registry-diagnostics` / `sessions-memory-bank` / `rag-engine` / `vector-search-agent-retrieval` / `gemini-cloud-assist-code-assist`）は後続 PR で追加する。現時点で収録済みのカテゴリは下記のツリーとマッピング表のもの。

製品名の変更: Vertex AI → Agent Platform、Vertex AI Agent Engine → Agent Runtime、Vertex AI Vector Search 2.0 → Agent Retrieval、Vertex AI Search → Agent Search（別スキル `gcp-agent-search`）、Agentspace → Gemini Enterprise。API 名・gcloud グループ・IAM ロール接頭辞（`roles/aiplatform.*`）・SDK モジュール（`vertexai`）は旧名のまま。

参照本文は英語（公式ドキュメントの原語）。

**Vertex AI SDK の generative AI モジュールは非推奨**。公式の deprecations ページは「Generative AI module in the Vertex AI SDK」を非推奨日 2025-06-24、削除日 2026-06-24 としている。`vertexai.generative_models` 等を使うコードは現行のものとして扱わず、Google Gen AI SDK を使う。

## ディレクトリ構成

```text
skills/gcp-agent-platform/
  SKILL.md
  references/
    agent-runtime-develop/           # 8 ページ
    agent-runtime-deploy-manage/     # 6 ページ
    agent-gateway-governance/        # 6 ページ
    agent-identity-registry/         # 8 ページ
```

完成形では手書きの 22 カテゴリが合計 158 ページ（各カテゴリに README.md あり）。各カテゴリ・API 直下の `README.md` は索引表。

- `references/gcloud/`（後続 PR で投入） のコマンド数（リリーストラック合算）: `ai` 267 / `ai-platform` 91 / `gemini` 96 / `vector-search` 54 / `agent-identity` 99 / `agent-registry` 81 / `developer-knowledge` 9 / `mldiagnostics` 13
- `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） の API（5）: `aiplatform`（Agent Platform API。スキーマ 3859）/ `agentregistry`（74）/ `deepreview`（28）/ `ml`（旧 AI Platform Training & Prediction。86）/ `datalabeling`（194）。各メソッドの `Versions` 行で v1 / v1beta1 等を確認する
- `references/iam/`（後続 PR で投入） は Agent Platform（`aiplatform-1` ... `aiplatform-6`）、AutoML、Recommendations、Gemini for Google Cloud API、Gemini Cloud Assist、Gemini Code Assist Management、AI Platform、SecLM、Vector Search の事前定義ロールと権限

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でカテゴリを選び、その README.md から個別ページを特定して Read する
2. 旧名で探されたとき → Vertex AI は Agent Platform、Agent Engine は Agent Runtime、Vector Search 2.0 は Agent Retrieval を引く

未投入カテゴリ（`gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-sdk` / `text-generation-structured-output` / `function-calling-thinking` / `grounding` / `context-cache-batch-inference` / `embeddings` / `live-api` / `model-garden-open-partner-models` / `tuning` / `evaluation` / `consumption-provisioned-throughput` / `safety-responsible-ai` / `security-iam-vpc-sc-cmek` / `ml-inference-registry-diagnostics` / `sessions-memory-bank` / `rag-engine` / `vector-search-agent-retrieval` / `gemini-cloud-assist-code-assist`）の探索手順は投入時に追加する。それまで上の手順が未投入カテゴリを指すときは、該当する公式ガイド（https://docs.cloud.google.com/ 配下）を引く。gcloud コマンド・REST・IAM ロールは公式リファレンス（https://docs.cloud.google.com/sdk/gcloud/reference 、https://docs.cloud.google.com/iam/docs/roles-permissions ）を引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Agent Runtime の概要・セットアップ・ADK / カスタムエージェントの開発 | agent-runtime-develop | [references/agent-runtime-develop/README.md](references/agent-runtime-develop/README.md) |
| エージェントのデプロイ（コード / コンテナ）・設定・runtime contract・管理・呼び出し | agent-runtime-deploy-manage | [references/agent-runtime-deploy-manage/README.md](references/agent-runtime-deploy-manage/README.md) |
| Agent Gateway のセットアップと管理・semantic governance・governance 用 IAM | agent-gateway-governance | [references/agent-gateway-governance/README.md](references/agent-gateway-governance/README.md) |
| Agent Identity・Agent Registry・エージェントとツールの検索・identity delegation | agent-identity-registry | [references/agent-identity-registry/README.md](references/agent-identity-registry/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `gcloud` / `rest` / `rest-schemas` / `iam` / `overview-setup-sdk` / `text-generation-structured-output` / `function-calling-thinking` / `grounding` / `context-cache-batch-inference` / `embeddings` / `live-api` / `model-garden-open-partner-models` / `tuning` / `evaluation` / `consumption-provisioned-throughput` / `safety-responsible-ai` / `security-iam-vpc-sc-cmek` / `ml-inference-registry-diagnostics` / `sessions-memory-bank` / `rag-engine` / `vector-search-agent-retrieval` / `gemini-cloud-assist-code-assist`。収録済みのページは各カテゴリの README.md の索引で確認する

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API（aistudio.google.com、Google AI Studio の API キー）と、それに対する Gen AI SDK。本スキルは Agent Platform のエンドポイントと ADC を使う側
- `anthropic-*` — Claude 自体。Model Garden の Claude ページは本スキルに収録せず、GCP 側の有効化は `model-garden-open-partner-models/control-model-access.md`（後続 PR で投入） のみ。Claude Code を Vertex 経由で使う設定は `anthropic-claude-code-deploy`。本スキルの ADK / Agent Runtime は Google のもので、Claude Code / Agent SDK / OpenAI Agents とは別物
- `gcp-agent-search` — Agent Search（旧 Vertex AI Search）と Gemini Enterprise（旧 Agentspace）。Discovery Engine API
- `gcp-gemini-enterprise-cx` — Gemini Enterprise for Customer Experience（CX Agent Studio）・Customer Experience Insights・CCAI Platform
- `gcp-foundation` — IAM 全般・サービスアカウント・Workload Identity Federation・ADC・Organization Policy・クォータ全般。Agent Identity API（`agentidentity`）と Developer Knowledge API の REST ページも同スキル
- `gcp-cli` — gcloud のインストール・認証
- `gcp-client-libraries` — Python / Node.js / Rust のクライアントライブラリ共通パターン
- `gcp-security` — Cloud KMS・Secret Manager・VPC Service Controls の本体
- `gcp-security-compliance` — Model Armor と Security Command Center（AI protection・Agent Platform Threat Detection）
- `gcp-observability` — Cloud Logging / Monitoring / Trace
- `gcp-bigquery` — BigQuery・BigQuery ML・BigQuery AI 関数
- `gcp-knowledge-catalog` — Knowledge Catalog
- `gcp-storage` — Cloud Storage
- `gcp-run` — Cloud Run
- `gcp-gke` — GKE
- `gcp-integration` — Application Integration と Integration Connectors
- `gcp-agent-platform-ml`（予定）— custom training・pipelines・Feature Store・Workbench・Colab Enterprise・Ray・model monitoring
- `gcp-ai-apis`（予定）— Speech-to-Text・Text-to-Speech・Translation・Vision・Video Intelligence・Natural Language・Document AI・Dialogflow・Agent Assist・Retail API / AI Commerce Search
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口

## 対象外

次は収録していない。必要なときは公式ドキュメントを確認する（https://docs.cloud.google.com/ 配下）。

- Model Garden の Claude ページ 12 件（`anthropic-*` の担当。GCP 側の有効化は `control-model-access.md` のみ）
- Grounded Generation API（非推奨。公式は「Google isn't accepting new requests for the Grounded Generation API」としている）
- Gemini Code Assist は概要と終了告知の 2 ページのみ
- `vectorsearch` / `geminicloudassist` の REST（同梱の Discovery に無い）
- custom training・pipelines・Feature Store・Workbench・Colab Enterprise・Ray・model monitoring は `gcp-agent-platform-ml`（予定）
- Agent Assist・AI Commerce Search・Speech / Translation / Vision 等は `gcp-ai-apis`（予定）
- 料金（取得していない）。公式の料金ページで確認する
- Console の操作手順の細部（各ページの Notes に省略した形式を記載）

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-21（ガイド。`docs.cloud.google.com/<path>.md.txt` の Markdown twin。URL に版が無いため取得日で pin）、2026-11-14（IAM roles-permissions）
- gcloud は 593.0.0 の help、REST は `google-api-python-client` 同梱の Discovery document（commit は未取得）
- SDK 名の照合に使った版（PyPI wheel）: google-genai 3.6.1、google-cloud-agentplatform 2.10.0、google-cloud-aiplatform 2.10.0、google-adk 2.15.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/gcloud/`（後続 PR で投入） `references/rest/`（後続 PR で投入） `references/rest-schemas/`（後続 PR で投入） `references/iam/`（後続 PR で投入） は機械生成。他の 22 カテゴリは公式ガイド由来の手書き
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に `Corrected from the official docs:` として元の記述を残す
- 変更・終了（references で確認したもの）:
  - Vertex AI SDK の generative AI モジュール: 非推奨日 2025-06-24、削除日 2026-06-24（Google Gen AI SDK へ移行）
  - Gemini Code Assist Standard / Enterprise: 2026-10-09 以降、新規購入不可（`gemini-cloud-assist-code-assist/`）
  - Gemini Cloud Assist の investigations: 非推奨日 2026-04-10 以降は Premium Support 契約者または申請済みのユーザーのみ
- 新しいメソッド・モデル・機能は公式 reference で確認する
