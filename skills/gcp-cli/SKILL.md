---
name: gcp-cli
description: >
  Google Cloud (GCP) の gcloud CLI 横断機能
  (Google Cloud CLI の install・init・components・config・auth・format・filter・projections・emulators・Cloud Shell・Open in Cloud Shell・DeployStack・gcloud beta terraform vet・gcloud topic・interactive・CLOUDSDK_*) のリファレンス・ガイド・サンプル。
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
    shell-tutorials/              # 公式ガイド由来: Cloud Shell チュートリアル作成・DeployStack
      README.md
      <page>.md                   # 例: writing-tutorials.md / directives-layout.md / deploystack-overview.md
    commands/                     # 機械生成: gcloud 593.0.0 の help、取得 2026-11-14
      README.md
      <group>/
        README.md
        <group>-<sub>.md          # GA は gcloud help の verbatim、alpha / beta は NAME + SYNOPSIS のみ
                                  # 単独コマンドのグループは <group>.md（例: gcloud/gcloud.md・init/init.md）
                                  # 大きいものは <group>-<sub>-<N>.md に分割
    rest/                         # 機械生成: Discovery 由来のメソッド表、取得 2026-11-14
      README.md
      cloudshell/
        README.md
        cloudshell.md
    rest-schemas/                 # 機械生成: Discovery 由来のメッセージスキーマ、取得 2026-11-14
      README.md
      cloudshell/
        README.md
        cloudshell.md
  samples/
    README.md
    named-configurations-multi-project.md
    non-interactive-ci-scripting.md
    format-and-projections.md
    filter-and-flatten.md
    impersonate-service-account-flag.md
    local-emulators-env-init.md
    cloud-shell-persistent-setup.md
    cloud-shell-web-preview.md
    open-in-cloud-shell-tutorial.md
    behind-corporate-proxy.md
    extend-gcloud-docker-image.md
  scripts/
    README.md
    install.md
    config.md
    auth.md
    output-formatting.md
    scripting.md
    components-emulators.md
    cloud-shell.md
```

`references/commands/` が担当する gcloud グループ（21）: `gcloud`（ルートとグローバルフラグ）/ `alpha` / `auth` / `beta` / `cheat-sheet` / `cloud-shell` / `code`（alpha / beta のみ）/ `components` / `config` / `docker` / `emulators` / `feedback` / `help` / `info` / `init` / `interactive`（alpha / beta のみ）/ `onboarding`（alpha のみ）/ `survey` / `terraform`（alpha / beta のみ）/ `topic` / `version`。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 手順・概念（インストール、configurations、認証、Cloud Shell、チュートリアル）→ 下記マッピング表で `install-setup` / `config-auth` / `cloud-shell` / `shell-tutorials` を選び、その README.md から個別ページを引く
2. グローバルフラグ（`--project` / `--format` / `--filter` / `--impersonate-service-account` / `--quiet` / `--verbosity` など）→ `references/commands/gcloud/gcloud.md`
3. 出力制御 → `--format` は `references/commands/topic/topic-formats.md`、`--filter` は `topic-filters.md`、projections・transforms は `topic-projections.md`、リソースキーは `topic-resource-keys.md`（いずれも `references/commands/topic/`）
4. コマンド・フラグ → `references/commands/README.md` でグループを選び、`references/commands/<group>/README.md` からページを引く（GA は `gcloud help` の全文）
5. alpha / beta トラックのコマンドは NAME + SYNOPSIS のみ（GA は全文）。フラグの詳細は `gcloud alpha|beta <command> --help` か公式ページ（gcloud reference）を参照する。`references/commands/alpha/` と `beta/` はトラックのルート（`gcloud alpha` / `gcloud beta` のグループ help）
6. Cloud Shell の REST API（`cloudshell.googleapis.com`）→ `references/rest/cloudshell/`、メッセージ型 → `references/rest-schemas/cloudshell/`
7. 作業例 → `samples/README.md`、コマンド集 → `scripts/README.md`

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| gcloud CLI をインストール・アップグレード・アンインストールしたい（アーカイブ / apt / dnf / snap / Docker、proxy、usage statistics） | install-setup | [references/install-setup/README.md](references/install-setup/README.md) |
| configurations・properties・認証（ユーザー / サービスアカウント / Workforce Identity Federation）・スクリプト化・cheat sheet | config-auth | [references/config-auth/README.md](references/config-auth/README.md) |
| Cloud Shell の起動・Editor・Web Preview・設定・ファイル転送・クォータ・Open in Cloud Shell | cloud-shell | [references/cloud-shell/README.md](references/cloud-shell/README.md) |
| Cloud Shell チュートリアルの書き方・ディレクティブ・DeployStack ソリューション | shell-tutorials | [references/shell-tutorials/README.md](references/shell-tutorials/README.md) |
| gcloud コマンドグループの一覧から目的のコマンドを探したい | commands | [references/commands/README.md](references/commands/README.md) |
| グローバルフラグ・ルートコマンドを調べたい | commands/gcloud | [references/commands/gcloud/README.md](references/commands/gcloud/README.md) |
| `--format` / `--filter` / projections / datetimes / escaping / `--flags-file` / gcloudignore などのトピックを読みたい | commands/topic | [references/commands/topic/README.md](references/commands/topic/README.md) |
| `gcloud auth`（login / activate-service-account / application-default / print-access-token ほか）のフラグを調べたい | commands/auth | [references/commands/auth/README.md](references/commands/auth/README.md) |
| `gcloud config`（set / get / list / configurations）のフラグを調べたい | commands/config | [references/commands/config/README.md](references/commands/config/README.md) |
| `gcloud init` で初期化したい | commands/init | [references/commands/init/README.md](references/commands/init/README.md) |
| `gcloud info` で環境診断したい | commands/info | [references/commands/info/README.md](references/commands/info/README.md) |
| `gcloud version` でバージョン確認したい | commands/version | [references/commands/version/README.md](references/commands/version/README.md) |
| `gcloud components`（install / update / remove / list）を使いたい | commands/components | [references/commands/components/README.md](references/commands/components/README.md) |
| `gcloud emulators`（Firestore / Spanner / Pub/Sub / Bigtable / Datastore）を起動したい | commands/emulators | [references/commands/emulators/README.md](references/commands/emulators/README.md) |
| `gcloud code`（`code dev` / `code clean-up`、alpha / beta のみ）を調べたい | commands/code | [references/commands/code/README.md](references/commands/code/README.md) |
| `gcloud cloud-shell`（ssh / scp / get-mount-command など）を使いたい | commands/cloud-shell | [references/commands/cloud-shell/README.md](references/commands/cloud-shell/README.md) |
| `gcloud help` でヘルプを引きたい | commands/help | [references/commands/help/README.md](references/commands/help/README.md) |
| `gcloud beta interactive` の対話シェル（alpha / beta のみ）を使いたい | commands/interactive | [references/commands/interactive/README.md](references/commands/interactive/README.md) |
| `gcloud cheat-sheet` を引きたい | commands/cheat-sheet | [references/commands/cheat-sheet/README.md](references/commands/cheat-sheet/README.md) |
| `gcloud feedback` でフィードバックを送りたい | commands/feedback | [references/commands/feedback/README.md](references/commands/feedback/README.md) |
| `gcloud survey` のアンケートを扱いたい | commands/survey | [references/commands/survey/README.md](references/commands/survey/README.md) |
| `gcloud onboarding express`（alpha のみ）を調べたい | commands/onboarding | [references/commands/onboarding/README.md](references/commands/onboarding/README.md) |
| `gcloud docker`（Docker credential helper）を使いたい | commands/docker | [references/commands/docker/README.md](references/commands/docker/README.md) |
| `gcloud beta terraform vet`（Terraform plan のポリシー検証）を使いたい | commands/terraform | [references/commands/terraform/README.md](references/commands/terraform/README.md) |
| `gcloud alpha`（alpha トラックのルート・グループ一覧）を調べたい | commands/alpha | [references/commands/alpha/README.md](references/commands/alpha/README.md) |
| `gcloud beta`（beta トラックのルート・グループ一覧）を調べたい | commands/beta | [references/commands/beta/README.md](references/commands/beta/README.md) |
| Cloud Shell API の REST メソッド・パスを調べたい | rest | [references/rest/README.md](references/rest/README.md)、[references/rest/cloudshell/README.md](references/rest/cloudshell/README.md) |
| Cloud Shell API のリクエスト・レスポンスのメッセージ型を調べたい | rest-schemas | [references/rest-schemas/README.md](references/rest-schemas/README.md)、[references/rest-schemas/cloudshell/README.md](references/rest-schemas/cloudshell/README.md) |
| 典型的な使い方を知りたい（named configuration・CI・format / filter・impersonation・emulator・Cloud Shell・proxy・Docker の 11 件） | samples | [samples/README.md](samples/README.md) |
| コマンドをコピペしたい（install / config / auth / output-formatting / scripting / components-emulators / cloud-shell） | scripts | [scripts/README.md](scripts/README.md) |

## 他スキルとの使い分け

- プロダクト別の gcloud グループ（`gcloud run` / `gcloud storage` / `gcloud compute` など）— 各プロダクトスキル（`gcp-run` / `gcp-storage` ほか）の `references/gcloud/`。本スキルは横断機能のみ
- `gcp-foundation` — ADC の仕組み・設定、IAM、サービスアカウント、Workload / Workforce Identity Federation、基盤 20 グループ（`gcloud iam` / `projects` / `billing` / `services` / `asset` ほか）のコマンド。本スキルは `gcloud auth` コマンドと認証手順の使い方のみ
- `gcp-client-libraries` — Node.js / Python / Rust の言語別コード。本スキルは CLI のみ
- `gcp-run` — Cloud Run の `gcloud run`。Cloud Shell でのデプロイ手順の概要は本スキル
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口
- `gws` — Google Workspace CLI。`gcloud` とは別の CLI で、Workspace API は対象外
- `docker` — Docker 一般。本スキルは gcloud CLI の公式イメージと `gcloud docker` のみ
- `terraform` 本体の文法・プロバイダーは対象外。`gcloud beta terraform` / `gcloud alpha terraform` コマンドのみ本スキル
- Firebase は別計画（`firebase-*`）。本スキルでは扱わない

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-14、gcloud 593.0.0
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- `references/commands/` `references/rest/` `references/rest-schemas/` は機械生成（gcloud 593.0.0 の help / Discovery、取得 2026-11-14）。`install-setup` `config-auth` `cloud-shell` `shell-tutorials` は公式ガイド由来の手書き
- alpha / beta トラックのコマンドは NAME + SYNOPSIS のみ（フラグ全文は GA のみ）
- 変更ログ（gcloud release notes）は未収録
- `shell-tutorials/` は Cloud Shell チュートリアル作成ページと DeployStack ページを収録（DeployStack はソリューション集の概要）
- gcloud は頻繁に更新される。新しいバージョンのフラグは `gcloud help` と公式 reference で確認する
