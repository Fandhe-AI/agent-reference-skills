---
name: gws
description: >
  Google Workspace CLI (gws) リファレンス。Rust 製。
  `gws <service> <resource> <method>` 形式で Gmail / Drive / Calendar / Sheets /
  Docs / Chat 等 19 サービスを統一操作。Google Discovery Service 経由の動的コマンド生成。
  `+` プレフィックスのヘルパーコマンド（+send, +agenda, +upload, +triage 等）、
  ワークフロー合成（+standup-report, +meeting-prep, +weekly-digest）、
  OAuth / サービスアカウント / CI ヘッドレス認証、env vars / .env / keyring 設定、
  グローバルフラグ（--dry-run, --page-all, --sanitize）、exit codes、Model Armor 統合。
user-invocable: false
---

## ディレクトリ構成

```text
skills/gws/
  SKILL.md
  references/
    core/
      README.md
      command-structure.md
      two-phase-parsing.md
      discovery-cache.md
      installation.md
      output-format.md
    auth/
      README.md
      auth-setup.md
      auth-login.md
      auth-export.md
      service-account.md
      oauth-token.md
      auth-precedence.md
      testing-mode-scopes.md
    flags/
      README.md
      global-flags.md
      pagination.md
      exit-codes.md
      sanitize-flag.md
      timezone-flag.md
    helpers/
      README.md
      helpers-overview.md
      gmail-helpers.md
      sheets-helpers.md
      calendar-helpers.md
      drive-helpers.md
      docs-chat-helpers.md
      workflow-helpers.md
      events-helpers.md
      modelarmor-helpers.md
      script-helpers.md
    config/
      README.md
      env-vars.md
      dotenv-file.md
      ci-headless.md
      keyring-backend.md
      logging.md
      project-id.md
  samples/
    README.md
    gmail-send-reply.md
    calendar-agenda.md
    drive-upload-search.md
    sheets-read-write.md
    ci-auth-setup.md
    workflow-compose.md
  scripts/
    README.md
    install.md
    auth.md
    common-operations.md
    workflow-recipes.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの README.md を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| コマンド構造・サービス一覧を知りたい | core | [references/core/README.md](references/core/README.md) |
| Discovery Document のキャッシュ・`gws schema` を使いたい | core | [references/core/README.md](references/core/README.md) |
| インストール方法を調べたい | core | [references/core/README.md](references/core/README.md) |
| 出力形式（JSON / NDJSON / exit code）を確認したい | core | [references/core/README.md](references/core/README.md) |
| 初回 OAuth 認証セットアップをしたい | auth | [references/auth/README.md](references/auth/README.md) |
| サービスアカウントで認証したい | auth | [references/auth/README.md](references/auth/README.md) |
| CI / ヘッドレス環境へ認証情報をエクスポートしたい | auth | [references/auth/README.md](references/auth/README.md) |
| 認証の優先順位（env var / keyring / トークン）を確認したい | auth | [references/auth/README.md](references/auth/README.md) |
| --dry-run / --params / --json / --upload フラグを使いたい | flags | [references/flags/README.md](references/flags/README.md) |
| ページネーション（--page-all / --page-limit）を使いたい | flags | [references/flags/README.md](references/flags/README.md) |
| タイムゾーン指定（--timezone / --tz）をしたい | flags | [references/flags/README.md](references/flags/README.md) |
| Model Armor で応答をサニタイズしたい（--sanitize） | flags | [references/flags/README.md](references/flags/README.md) |
| `+` ヘルパーコマンドの一覧・設計思想を知りたい | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Gmail の送信・返信・トリアージをしたい（+send, +triage 等） | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Calendar のアジェンダ取得・イベント作成をしたい（+agenda, +insert） | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Drive へのファイルアップロードをしたい（+upload） | helpers | [references/helpers/README.md](references/helpers/README.md) |
| ワークフロー合成（+standup-report, +weekly-digest 等）を使いたい | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Push 通知のサブスクライブ・更新をしたい（+subscribe, +renew） | helpers | [references/helpers/README.md](references/helpers/README.md) |
| 環境変数・.env ファイルの設定を確認したい | config | [references/config/README.md](references/config/README.md) |
| キーリングバックエンド・ログ設定をしたい | config | [references/config/README.md](references/config/README.md) |
| GCP プロジェクト ID の設定・クォートを確認したい | config | [references/config/README.md](references/config/README.md) |
| 典型的な使い方・コード例を参照したい | samples | [samples/README.md](samples/README.md) |
| インストール・認証・頻出操作のコマンドをコピペしたい | scripts | [scripts/README.md](scripts/README.md) |
