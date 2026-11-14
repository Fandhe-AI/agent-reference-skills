---
name: gcp-services-index
description: >
  Google Cloud (GCP) の全プロダクト索引。プロダクト名→担当スキル・gcloud グループ・IAM role prefix・旧名の逆引き、対象外判定、gcp-* 深層スキルへの導線。
  旧→新 Vertex AI→(Gemini Enterprise) Agent Platform、Cloud Functions→Cloud Run functions、Dataplex→Knowledge Catalog、Dataproc/Cloud Composer→Managed Service for Apache Spark/Airflow、reCAPTCHA Enterprise→Fraud Defense、Vertex AI Search→Agent Search、BigLake→Lakehouse。
  Azure・AWS・Cloudflare・Firebase とは別。
user-invocable: false
---

# gcp-services-index

Google Cloud (GCP) 全プロダクトの索引スキル。プロダクト名から担当する深層スキル・gcloud グループ・IAM role prefix・旧名を引く。
深層スキルへの導線であり、代替ではない。

## 深層スキルの状況

深層スキル 23 件（`gcp-foundation` / `gcp-cli` / `gcp-run` / `gcp-storage` / `gcp-client-libraries` / `gcp-databases-relational` /
`gcp-databases-nosql` / `gcp-gke` / `gcp-compute` / `gcp-networking` / `gcp-security` / `gcp-observability` /
`gcp-messaging-workflows` / `gcp-devops` / `gcp-iac` / `gcp-bigquery` / `gcp-agent-platform` / `gcp-data-pipelines` /
`gcp-agent-platform-ml` / `gcp-ai-apis` / `gcp-api-management` / `gcp-hybrid-migration` / `gcp-architecture`）は
いずれも未収録（予定）。収録しなかったプロダクトは「対象外」として `references/products/out-of-scope.md` に分離する。

範囲方針は深層スキル側で定義する。gcloud・REST・IAM は全件、ガイド系ページは各プロダクトの主要ページに絞る。

## 対象バージョン・出典

- 取得時点: 2026-11-14
- gcloud: 593.0.0
- プロダクト一覧: IAM roles-permissions の 329 サービス
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）

## 他スキルとの使い分け

- `google-gemini-api` — Gemini Developer API・Google GenAI SDK。Vertex AI 全般は対象外
- `gws` — Google Workspace CLI。Workspace API は本スキルの対象外
- `anthropic-claude-code-deploy` — Vertex 経由の Claude Code 設定のみ。GCP 側のプロダクト解説は本スキル
- `docker` — Docker Engine / Dockerfile / Compose。Artifact Registry 等の GCP 側は本スキルから引く
- `uv` — Python パッケージ管理。GCP のクライアントライブラリ導入は深層スキル側
- `cloudflare-*` — Workers / Storage / KV 等の名前が GCP 製品と衝突するが別基盤
- `supabase` / `upstash` — 別ベンダーの DB・Redis。Cloud SQL / Firestore / Memorystore とは別

## 対象外

次は対象外。Firebase は本スキルでは扱わない。

- Firebase
- Maps Platform
- Workspace API
- Looker / Data Studio
- Google SecOps / Chronicle
- 業界別 API（Healthcare / Life Sciences / Financial Services）
- Marketplace
- 認定試験・Cloud Skills Boost

これらは現時点で収録しない。追加する場合は本スキルの対象外記載とあわせて更新する。

## ディレクトリ構成

```text
skills/gcp-services-index/
  SKILL.md
  references/
    products/
      README.md
      out-of-scope.md
      gcp-agent-platform.md
      gcp-agent-platform-ml.md
      gcp-ai-apis.md
      gcp-api-management.md
      gcp-bigquery.md
      gcp-compute.md
      gcp-data-pipelines.md
      gcp-databases-nosql.md
      gcp-databases-relational.md
      gcp-devops.md
      gcp-foundation.md
      gcp-gke.md
      gcp-hybrid-migration.md
      gcp-iac.md
      gcp-messaging-workflows.md
      gcp-networking.md
      gcp-observability.md
      gcp-run.md
      gcp-security.md
      gcp-storage.md
    lookup/
      README.md
      product-to-skill.md
    gcloud-groups/
      README.md
      assignment.md
    renames/
      README.md
      renamed-products.md
    lifecycle/
      README.md
      shutdown-and-deprecated.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 担当の深層スキルが未収録（予定）の間は、公式ドキュメントを確認する前提で索引情報のみ使う
5. 製品ページ（`references/products/`）の Lifecycle 列と Notes を見て、終了済み・廃止予定かを確認する

提供状況の記載は公式ページで確認できた製品のみ。記載が無い製品が提供中であるとは限らないため、利用前に公式の製品ページで確認する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| プロダクト名から担当スキルを知りたい | lookup | [references/lookup/README.md](references/lookup/README.md) |
| 担当スキルごとのプロダクト一覧を見たい | products | [references/products/README.md](references/products/README.md) |
| 収録対象外のプロダクトか確認したい | products | [references/products/README.md](references/products/README.md) |
| gcloud グループの担当スキルを知りたい | gcloud-groups | [references/gcloud-groups/README.md](references/gcloud-groups/README.md) |
| 旧名・改称前の名前から現行名を引きたい | renames | [references/renames/README.md](references/renames/README.md) |
| 製品が終了済み・廃止予定か知りたい | lifecycle | [references/lifecycle/README.md](references/lifecycle/README.md) |
