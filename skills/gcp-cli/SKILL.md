---
name: gcp-cli
description: >
  Google Cloud (GCP) の gcloud CLI 横断機能
  (Google Cloud CLI の install・init・components・config・auth・format・filter・projections・emulators・Cloud Shell・Open in Cloud Shell・DeployStack・gcloud terraform vet・gcloud topic・interactive・CLOUDSDK_*) のリファレンス・ガイド・サンプル。
  プロダクト別コマンドは各 gcp-* スキル、ADC・IAM は gcp-foundation、言語別 SDK は gcp-client-libraries、Google Workspace CLI は gws とは別。
user-invocable: false
---

# gcp-cli

Google Cloud (GCP) の gcloud CLI 横断機能スキル。Google Cloud CLI のインストール・初期化・コンポーネント管理・configurations / properties・認証コマンド・出力制御（`--format` / `--filter` / projections）・エミュレーター・Cloud Shell・Cloud Shell チュートリアル（DeployStack を含む）・横断グループ（`gcloud topic` / `help` / `interactive` / `terraform` ほか）を扱う。プロダクトごとの gcloud グループ（`gcloud run` / `gcloud storage` / `gcloud iam` など）は担当しない。各プロダクトスキルの `references/gcloud/` を引く。

参照本文は英語（公式ドキュメント・`gcloud help` の原語）。

## ディレクトリ構成

```text
skills/gcp-cli/
  SKILL.md
  references/
    install-setup/                # 公式ガイド由来（手書き）: インストール・初期化・components・proxy・Docker・アンインストール
      README.md
      <page>.md                   # 例: install-sdk.md / initializing.md / components.md / proxy-settings.md
    config-auth/                  # 公式ガイド由来: configurations・properties・認証・スクリプト化・cheat sheet
      README.md
      <page>.md                   # 例: configurations.md / properties.md / authorizing-service-accounts.md / scripting-gcloud.md
    cloud-shell/                  # 公式ガイド由来: Cloud Shell・Editor・Web Preview・設定・クォータ
      README.md
      <page>.md                   # 例: overview.md / using-cloud-shell.md / using-web-preview.md / quotas-limits.md
```

gcloud の横断グループ（21、後続 PR で `references/commands/` に投入）: `gcloud`（ルートとグローバルフラグ）/ `alpha` / `auth` / `beta` / `cheat-sheet` / `cloud-shell` / `code` / `components` / `config` / `docker` / `emulators` / `feedback` / `help` / `info` / `init` / `interactive` / `onboarding` / `survey` / `terraform` / `topic` / `version`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 手順・概念（インストール、configurations、認証、Cloud Shell、チュートリアル）→ 下記マッピング表で `install-setup` / `config-auth` / `cloud-shell` を選び、その README.md から個別ページを引く
2. gcloud コマンド・グローバルフラグ・`--format` / `--filter` の全文（機械生成の `references/commands/`）と Cloud Shell API（`references/rest/` `references/rest-schemas/`）は後続 PR で投入する。未投入の間は `gcloud help` と公式 reference を確認する
3. Cloud Shell チュートリアルの作成ガイド（`references/shell-tutorials/`）・作業例（`samples/`）・コマンド集（`scripts/`）は次の PR で投入する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud CLI をインストール・アップグレード・アンインストールしたい（アーカイブ / apt / dnf / snap / Docker、proxy、usage statistics） | install-setup | [references/install-setup/README.md](references/install-setup/README.md) |
| configurations・properties・認証（ユーザー / サービスアカウント / Workforce Identity Federation）・スクリプト化・cheat sheet | config-auth | [references/config-auth/README.md](references/config-auth/README.md) |
| Cloud Shell の起動・Editor・Web Preview・設定・ファイル転送・クォータ・Open in Cloud Shell | cloud-shell | [references/cloud-shell/README.md](references/cloud-shell/README.md) |

## 他スキルとの使い分け

- プロダクト別の gcloud グループ（`gcloud run` / `gcloud storage` / `gcloud compute` など）— 各プロダクトスキル（`gcp-run` / `gcp-storage` ほか）の `references/gcloud/`。本スキルは横断機能のみ
- `gcp-foundation` — ADC の仕組み・設定、IAM、サービスアカウント、Workload / Workforce Identity Federation、基盤 20 グループ（`gcloud iam` / `projects` / `billing` / `services` / `asset` ほか）のコマンド。本スキルは `gcloud auth` コマンドと認証手順の使い方のみ
- `gcp-client-libraries` — Node.js / Python / Rust の言語別コード。本スキルは CLI のみ
- `gcp-run` — Cloud Run の `gcloud run`。Cloud Shell でのデプロイ手順の概要は本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gws` — Google Workspace CLI。`gcloud` とは別の CLI で、Workspace API は対象外
- `docker` — Docker 一般。本スキルは gcloud CLI の公式イメージと `gcloud docker` のみ
- `terraform` 本体の文法・プロバイダーは対象外。`gcloud terraform` コマンドのみ本スキル
- Firebase は別計画（`firebase-*`）。本スキルでは扱わない

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-14、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/commands/` `references/rest/` `references/rest-schemas/` は機械生成（gcloud 593.0.0 の help / Discovery、取得 2026-11-14）で、後続 PR で投入する。`install-setup` `config-auth` `cloud-shell` `shell-tutorials` は公式ガイド由来の手書き
- alpha / beta トラックのコマンドは NAME + SYNOPSIS のみ（フラグ全文は GA のみ）
- 変更ログ（gcloud release notes）は未収録
- `shell-tutorials/`（Cloud Shell チュートリアル作成ページと DeployStack）は次の PR で投入する
- gcloud は頻繁に更新される。新しいバージョンのフラグは `gcloud help` と公式 reference で確認する
