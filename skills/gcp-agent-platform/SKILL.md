---
name: gcp-agent-platform
description: >
  Google Cloud (GCP) の Gemini Enterprise Agent Platform (旧 Vertex AI) の Gemini 推論 (function calling・grounding・context caching・embeddings・Live API)・Model Garden・tuning・evaluation・Provisioned Throughput・Agent Runtime (旧 Agent Engine)・Memory Bank・Agent Identity・Agent Registry・RAG Engine・Vector Search。gcloud ai。Gemini Developer API は google-gemini-api
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

機械生成の層として、gcloud 8 グループ（`ai` / `ai-platform` / `gemini` / `vector-search` / `agent-identity` / `agent-registry` / `developer-knowledge` / `mldiagnostics`）、REST 5 API（`aiplatform` / `agentregistry` / `deepreview` / `ml` / `datalabeling`）、メッセージスキーマ、IAM ロール・権限を収録する。

製品名の変更: Vertex AI → Agent Platform、Vertex AI Agent Engine → Agent Runtime、Vertex AI Vector Search 2.0 → Agent Retrieval、Vertex AI Search → Agent Search（別スキル `gcp-agent-search`）、Agentspace → Gemini Enterprise。API 名・gcloud グループ・IAM ロール接頭辞（`roles/aiplatform.*`）・SDK モジュール（`vertexai`）は旧名のまま。

参照本文は英語（公式ドキュメントの原語）。

**Vertex AI SDK の generative AI モジュールは非推奨**。公式の deprecations ページは「Generative AI module in the Vertex AI SDK」を非推奨日 2025-06-24、削除日 2026-06-24 としている。`vertexai.generative_models` 等を使うコードは現行のものとして扱わず、Google Gen AI SDK を使う。

## ディレクトリ構成

```text
skills/gcp-agent-platform/
  SKILL.md
  references/
    gcloud/                          # 機械生成: gcloud 593.0.0 の help（8 グループ）
      README.md
      ai/ ai-platform/ gemini/ vector-search/
      agent-identity/ agent-registry/ developer-knowledge/ mldiagnostics/
        README.md
        <command>.md
    rest/                            # 機械生成: Discovery 由来のメソッド表（5 API）
      README.md
      aiplatform/ agentregistry/ deepreview/ ml/ datalabeling/
    rest-schemas/                    # 機械生成: メッセージスキーマ（5 API）
      README.md
      aiplatform/ agentregistry/ deepreview/ ml/ datalabeling/
    iam/                             # 機械生成: IAM roles-permissions（19 ファイル）
      README.md
      aiplatform-1.md ... aiplatform-6.md
      automl.md automlrecommendations.md cloudaicompanion-1.md cloudaicompanion-2.md
      datalabeling.md geminicloudassist-1.md ... geminicloudassist-4.md
      geminicodeassistmanagement.md ml.md seclm.md vectorsearch.md
    overview-setup-sdk/              # 11 ページ
    text-generation-structured-output/  # 3 ページ
    function-calling-thinking/       # 2 ページ
    grounding/                       # 6 ページ
    context-cache-batch-inference/   # 5 ページ
    embeddings/                      # 5 ページ
    live-api/                        # 8 ページ
    model-garden-open-partner-models/   # 12 ページ
    tuning/                          # 5 ページ
    evaluation/                      # 12 ページ
    consumption-provisioned-throughput/ # 8 ページ
    safety-responsible-ai/           # 8 ページ
    security-iam-vpc-sc-cmek/        # 7 ページ
    ml-inference-registry-diagnostics/  # 9 ページ
    agent-runtime-develop/           # 8 ページ
    agent-runtime-deploy-manage/     # 6 ページ
    sessions-memory-bank/            # 5 ページ
    agent-gateway-governance/        # 6 ページ
    agent-identity-registry/         # 8 ページ
    rag-engine/                      # 10 ページ
    vector-search-agent-retrieval/   # 6 ページ
    gemini-cloud-assist-code-assist/ # 8 ページ
```

手書きの 22 カテゴリは合計 158 ページ（各カテゴリに README.md あり）。各カテゴリ・API 直下の `README.md` は索引表。

- `references/gcloud/` のコマンド数（リリーストラック合算）: `ai` 267 / `ai-platform` 91 / `gemini` 96 / `vector-search` 54 / `agent-identity` 99 / `agent-registry` 81 / `developer-knowledge` 9 / `mldiagnostics` 13
- `references/rest/` `references/rest-schemas/` の API（5）: `aiplatform`（Agent Platform API。スキーマ 3859）/ `agentregistry`（74）/ `deepreview`（28）/ `ml`（旧 AI Platform Training & Prediction。86）/ `datalabeling`（194）。各メソッドの `Versions` 行で v1 / v1beta1 等を確認する
- `references/iam/` は Agent Platform（`aiplatform-1` ... `aiplatform-6`）、AutoML、Recommendations、Gemini for Google Cloud API、Gemini Cloud Assist、Gemini Code Assist Management、AI Platform、SecLM、Vector Search の事前定義ロールと権限

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 概念・手順 → 下記マッピング表でカテゴリを選び、その README.md から個別ページを特定して Read する
2. gcloud コマンド → `references/gcloud/README.md` でグループを選び、グループの README.md からコマンドを引く。`gcloud ai` は `--region`、`gcloud vector-search` / `gcloud gemini` / `gcloud agent-registry` は `--location` が必須になることが多い。GA と beta / alpha で存在するコマンド・フラグが異なる
3. REST（メソッド・パス・パラメータ）→ `references/rest/<api>/README.md`、メッセージ型 → `references/rest-schemas/<api>/README.md`。`<api>` は `aiplatform` / `agentregistry` / `deepreview` / `ml` / `datalabeling`
4. IAM ロール・権限 → `references/iam/README.md` の索引から引く。ロール ID（例: `roles/aiplatform.user`）で `references/iam/` 配下を grep する。`aiplatform` のロールは 6 ファイルに分かれるため全体を grep する
5. 旧名で探されたとき → Vertex AI は Agent Platform、Agent Engine は Agent Runtime、Vector Search 2.0 は Agent Retrieval を引く
6. Vector Search 2.0 と Gemini Cloud Assist / Gemini Code Assist の REST は同梱の Discovery に無いため、`references/rest/` に無い。gcloud・IAM・ガイドで確認する

`samples/` と `scripts/` は本スキルに無い。コードは各ガイドのコードブロックを引く。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| `gcloud ai` / `ai-platform` / `gemini` / `vector-search` / `agent-identity` / `agent-registry` のコマンドとフラグを調べたい | gcloud | [references/gcloud/README.md](references/gcloud/README.md) |
| Agent Platform API・Agent Registry API 等の REST メソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md) |
| REST のリクエスト・レスポンスのメッセージ型・enum を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md) |
| ロール ID の権限一覧（`roles/aiplatform.*`・`roles/cloudaicompanion.*` 等）を調べたい | iam | [references/iam/README.md](references/iam/README.md) |
| Agent Platform の概要・利用可能なモデル・セットアップ・認証・API キー・Express mode・SDK の一覧 | overview-setup-sdk | [references/overview-setup-sdk/README.md](references/overview-setup-sdk/README.md) |
| Gemini Developer API（Google AI Studio）から Agent Platform への移行・Gen AI SDK の使い分け | overview-setup-sdk | [references/overview-setup-sdk/README.md](references/overview-setup-sdk/README.md) |
| チャット・テキスト生成・system instruction・JSON / structured output | text-generation-structured-output | [references/text-generation-structured-output/README.md](references/text-generation-structured-output/README.md) |
| function calling・thinking | function-calling-thinking | [references/function-calling-thinking/README.md](references/function-calling-thinking/README.md) |
| Google Search / RAG / Agent Search / 自前の検索 API による grounding・Web Grounding for Enterprise | grounding | [references/grounding/README.md](references/grounding/README.md) |
| context caching の作成と利用・batch inference（BigQuery / Cloud Storage） | context-cache-batch-inference | [references/context-cache-batch-inference/README.md](references/context-cache-batch-inference/README.md) |
| テキスト embeddings・task type・batch embeddings | embeddings | [references/embeddings/README.md](references/embeddings/README.md) |
| Live API（WebSocket / SDK・音声・映像ストリーム・セッション管理・言語と音声の設定） | live-api | [references/live-api/README.md](references/live-api/README.md) |
| Model Garden のモデル探索・オープン / パートナーモデルの呼び出しとデプロイ・Hugging Face・vLLM・モデルアクセスの制御 | model-garden-open-partner-models | [references/model-garden-open-partner-models/README.md](references/model-garden-open-partner-models/README.md) |
| supervised tuning・tuning データの準備・tuning ジョブの管理 | tuning | [references/tuning/README.md](references/tuning/README.md) |
| Gen AI evaluation service（データセット・ルーブリック・agent 評価・online 評価・結果の表示） | evaluation | [references/evaluation/README.md](references/evaluation/README.md) |
| Provisioned Throughput の購入と利用・pay-as-you-go（standard / priority）・429 エラーとリトライ | consumption-provisioned-throughput | [references/consumption-provisioned-throughput/README.md](references/consumption-provisioned-throughput/README.md) |
| safety filter・責任ある AI・ブロックされた応答の処理・abuse monitoring・model observability | safety-responsible-ai | [references/safety-responsible-ai/README.md](references/safety-responsible-ai/README.md) |
| アクセス制御・VPC Service Controls・CMEK・data residency・zero data retention・監査ログ | security-iam-vpc-sc-cmek | [references/security-iam-vpc-sc-cmek/README.md](references/security-iam-vpc-sc-cmek/README.md) |
| online inference・endpoint の種類（dedicated / private）・Model Registry・ML Diagnostics | ml-inference-registry-diagnostics | [references/ml-inference-registry-diagnostics/README.md](references/ml-inference-registry-diagnostics/README.md) |
| Agent Runtime の概要・セットアップ・ADK / カスタムエージェントの開発 | agent-runtime-develop | [references/agent-runtime-develop/README.md](references/agent-runtime-develop/README.md) |
| エージェントのデプロイ（コード / コンテナ）・設定・runtime contract・管理・呼び出し | agent-runtime-deploy-manage | [references/agent-runtime-deploy-manage/README.md](references/agent-runtime-deploy-manage/README.md) |
| Sessions・Memory Bank・memory の生成と API 管理 | sessions-memory-bank | [references/sessions-memory-bank/README.md](references/sessions-memory-bank/README.md) |
| Agent Gateway のセットアップと管理・semantic governance・governance 用 IAM | agent-gateway-governance | [references/agent-gateway-governance/README.md](references/agent-gateway-governance/README.md) |
| Agent Identity・Agent Registry・エージェントとツールの検索・identity delegation | agent-identity-registry | [references/agent-identity-registry/README.md](references/agent-identity-registry/README.md) |
| RAG Engine（コーパス・データ取り込み・retrieval と ranking・vector DB の選択・metadata search） | rag-engine | [references/rag-engine/README.md](references/rag-engine/README.md) |
| Vector Search 2.0 / Agent Retrieval（collection・query・embeddings の自動生成・1.0 からの移行） | vector-search-agent-retrieval | [references/vector-search-agent-retrieval/README.md](references/vector-search-agent-retrieval/README.md) |
| Gemini Cloud Assist（investigations・chat・MCP）・Gemini Code Assist の概要と終了告知 | gemini-cloud-assist-code-assist | [references/gemini-cloud-assist-code-assist/README.md](references/gemini-cloud-assist-code-assist/README.md) |

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API（aistudio.google.com、Google AI Studio の API キー）と、それに対する Gen AI SDK。本スキルは Agent Platform のエンドポイントと ADC を使う側
- `anthropic-*` — Claude 自体。Model Garden の Claude ページは本スキルに収録せず、GCP 側の有効化は `model-garden-open-partner-models/control-model-access.md` のみ。Claude Code を Vertex 経由で使う設定は `anthropic-claude-code-deploy`。本スキルの ADK / Agent Runtime は Google のもので、Claude Code / Agent SDK / OpenAI Agents とは別物
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
- `references/gcloud/` `references/rest/` `references/rest-schemas/` `references/iam/` は機械生成。他の 22 カテゴリは公式ガイド由来の手書き
- 一部の公式の例は安全性・正しさのために修正した。該当箇所はコードブロック直前に `Adapted (not in the official docs)` の行を置き、`## Notes` に `Corrected from the official docs:` として元の記述を残す
- 変更・終了（references で確認したもの）:
  - Vertex AI SDK の generative AI モジュール: 非推奨日 2025-06-24、削除日 2026-06-24（Google Gen AI SDK へ移行）
  - Gemini Code Assist Standard / Enterprise: 2026-10-09 以降、新規購入不可（`gemini-cloud-assist-code-assist/`）
  - Gemini Cloud Assist の investigations: 非推奨日 2026-04-10 以降は Premium Support 契約者または申請済みのユーザーのみ
- 新しいメソッド・モデル・機能は公式 reference で確認する
