---
name: gcp-client-libraries
description: >
  Google Cloud (GCP) クライアントライブラリ (Node.js / Python / Rust) の ADC / credentials・impersonation・ID token・API key・ClientOptions・retry / timeout・LRO / polling・pagination・emulator / endpoint override・universe domain・logging / OpenTelemetry・mocking。google-gax / google-auth-library / google-api-core / google-cloud-gax。google-genai (Gemini SDK) は google-gemini-api、ADC の gcloud 設定は gcp-foundation
user-invocable: false
---

# gcp-client-libraries

Google Cloud (GCP) クライアントライブラリ（Cloud Client Libraries）の言語横断の使い方スキル。Node.js・Python・Rust を対象に、クライアントの生成と設定（ClientOptions / ClientBuilder・エンドポイント・universe domain）、クライアント側の認証（ADC・サービスアカウント・impersonation・ID トークン・API キー・外部アカウント）、呼び出しの制御（retry / backoff / timeout・LRO / polling・pagination・ストリーミング・エラー）、エミュレーターとリージョナルエンドポイント、ログと OpenTelemetry、Rust のパターンとテスト（フィールドマスク・etag 楽観的同時実行制御・モック）を収録する。

参照本文は英語（公式ドキュメント・GitHub のタグ固定 README・docstring の原語）。

## ディレクトリ構成

```text
skills/gcp-client-libraries/
  SKILL.md
  references/
    concepts/                     # Cloud Client Libraries と Google API Client Libraries の違い・gRPC・ベストプラクティス・HTTP ガイドライン・システムパラメーター・言語別パッケージ名
      README.md
      <page>.md                   # 例: client-libraries-explained.md / http-guidelines.md / system-parameters.md / nodejs-packages.md
    authentication/               # クライアントライブラリ側から見た認証: 暗黙の ADC・API キー・impersonation の ADC ファイル
      README.md
      <page>.md                   # 例: client-libraries.md / api-keys-use.md / use-service-account-impersonation.md
    endpoints-emulators/          # リージョナルエンドポイントの ClientOptions 指定・各種エミュレーターの環境変数
      README.md
      <page>.md                   # 例: firestore-regional-endpoints.md / pubsub-emulator.md / spanner-emulator.md
    nodejs/                       # Node.js (google-gax): セットアップ・クライアントと呼び出しオプション・REST fallback・retry / timeout・LRO・ストリーミング・pagination・logging・proxy
      README.md
      <page>.md                   # 例: client-options.md / rest-fallback.md / retry-timeout.md / long-running-operations.md / auto-pagination.md
```

## 対象バージョンと pin

- npm: `node>=22`。google-gax 6.17.0、google-auth-library 11.3.4、gaxios 8.3.3、@google-cloud/common 8.2.2、google-logging-utils 2.2.0
- PyPI: Python `>=3.10`。google-api-core 2.44.0、google-auth 2.62.2、google-cloud-core 2.8.0
- crates: rust_version 1.91.0。google-cloud-gax 1.15.0、google-cloud-auth 1.19.0、google-cloud-lro 1.12.0、google-cloud-wkt 1.11.0
- Rust ユーザーガイドはタグ `release-20261111` に pin
- docs.cloud.google.com の Markdown twin の取得日は 2026-11-16
- docs.cloud.google.com 上の各ライブラリ README は上記 pin より古いため、タグ固定の GitHub README を本文の出典にした。版数の根拠はこの節の pin を正とする

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 言語を決める。Node.js は `nodejs` / `nodejs-auth`（後続 PR で投入）、Python は `python`（後続 PR で投入） / `python-calls`（後続 PR で投入） / `python-auth`（後続 PR で投入）、Rust は `rust-setup`（後続 PR で投入） / `rust-calls`（後続 PR で投入） / `rust-patterns-testing`（後続 PR で投入）。言語に依らない概念・パッケージ名・エンドポイント・エミュレーターは `concepts` / `authentication` / `endpoints-emulators`
2. 下記マッピング表でタスクに対応するカテゴリを選び、そのカテゴリの README.md から個別ページを引く。ガイド直下に README.md は無く、各カテゴリ（サブディレクトリ）に README.md がある
3. 該当ページの `.md` を Read して詳細を確認する
4. サービス固有の API（Cloud Storage・Cloud Run のメソッド等）、gcloud 側の ADC 設定・IAM は他スキルの担当。下記「他スキルとの使い分け」を参照する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| Cloud Client Libraries と Google API Client Libraries の違い・gRPC・クライアントの使い回し・エラーコード / メッセージ / details を知りたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| Cloud API の HTTP ガイドライン・システムパラメーター（`$fields` / `X-Goog-User-Project`）・サービスから npm / PyPI / crate 名を引きたい | concepts | [references/concepts/README.md](references/concepts/README.md) |
| クライアントライブラリが暗黙に使う ADC・クォータプロジェクトの環境変数・外部認証情報の検証 | authentication | [references/authentication/README.md](references/authentication/README.md) |
| API キーをクライアントのコンストラクターに渡したい・ローカルの impersonation ADC ファイルをクライアントから使いたい | authentication | [references/authentication/README.md](references/authentication/README.md) |
| Firestore / Datastore のリージョナル / マルチリージョナルエンドポイントを ClientOptions で指定したい | endpoints-emulators | [references/endpoints-emulators/README.md](references/endpoints-emulators/README.md) |
| Pub/Sub・Firestore・Datastore・Bigtable・Spanner のエミュレーター（`*_EMULATOR_HOST`）に接続したい | endpoints-emulators | [references/endpoints-emulators/README.md](references/endpoints-emulators/README.md) |
| Node.js のセットアップ・対応 Node.js バージョン・クライアントの生成と `initialize()` / `close()` | nodejs | [references/nodejs/README.md](references/nodejs/README.md) |
| Node.js のクライアントオプション・REST fallback・呼び出しオプション（`CallOptions`）・キャンセル | nodejs | [references/nodejs/README.md](references/nodejs/README.md) |
| Node.js の retry / timeout（`RetryOptions` / `BackoffSettings` / `clientConfig`）・LRO（`Operation`）・ストリーミング・auto-pagination | nodejs | [references/nodejs/README.md](references/nodejs/README.md) |
| Node.js のログ（`GOOGLE_SDK_NODE_LOGGING`）・OpenTelemetry・gaxios の proxy・resumable upload | nodejs | [references/nodejs/README.md](references/nodejs/README.md) |

後続 PR で投入するカテゴリ（分割投入中。投入後にツリーと上の表へ追加する）: `nodejs-auth` / `python` / `python-calls` / `python-auth` / `rust-setup` / `rust-calls` / `rust-patterns-testing`

## 他スキルとの使い分け

- `gcp-foundation` — gcloud 側の ADC 設定（`gcloud auth application-default login`）・IAM・サービスアカウント・Workload Identity Federation のセットアップ。本スキルはクライアントライブラリ側で認証情報を読む・渡す・上書きするコードのみ
- `gcp-cli` — gcloud のインストール・設定・コマンド全般。本スキルは言語別ライブラリのコードのみ
- `gcp-run` / `gcp-storage` — 各プロダクト固有の API・リソース・IAM ロール。本スキルはプロダクトを問わず共通のクライアント設定・認証・呼び出し制御のみ
- `google-gemini-api` — Gemini API と `google-genai` SDK。Google Cloud のクライアントライブラリ（`google-cloud-*` / `@google-cloud/*` / `google-cloud-*` crate）とは別系統
- Node.js の `googleapis` パッケージ（Google API Client Libraries）は Cloud Client Libraries とは別物で、`references/concepts/` で違いを概念として扱うのみ。個別 API の使い方は収録しない
- 対象言語は Node.js・Python・Rust のみ。Go・Java・C#・C++・PHP・Ruby は対象外
- `gcp-services-index` — 製品名から担当スキルを引く索引。担当が不明なときの入口

## 鮮度・ライセンス・既知の制約

- 取得日: 2026-11-16（docs.cloud.google.com の Markdown twin）。版数は上記「対象バージョンと pin」を正とする
- Python の `python-calls` 配下は docstring 由来、`python/universe-domain.md` はソースのみが根拠
- ライセンス: docs 本文は CC BY 4.0、コードサンプルは Apache 2.0（https://developers.google.com/site-policies）
- 各ライブラリは頻繁に更新される。新しい版の挙動は各パッケージの公式 README・リリースノートで確認する
