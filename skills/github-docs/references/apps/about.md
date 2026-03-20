# GitHub Apps 概要

## GitHub Apps とは

GitHub Apps は GitHub の機能を拡張するための公式に推奨されるインテグレーション方式。細かい権限制御、リポジトリレベルのアクセス管理、短命トークンによる高いセキュリティを提供する。

## App の種類

### GitHub Apps（推奨）

- 細粒度の権限モデル
- ユーザーがアクセスを許可するリポジトリを制御可能
- 短命トークン（1 時間で失効）を使用
- ユーザーの介入なしに独立して動作可能
- Bot アカウントとして動作（Enterprise のシートを消費しない）

### OAuth Apps

- ブロードなスコープベースの権限
- ユーザーのアクセス可能なすべてのリソースにアクセス
- トークンは取り消されるまで有効
- ユーザーコンテキストが常に必要
- 新規開発では GitHub Apps を推奨

## ユースケース

### GitHub 上の操作

- Issue の作成・コメント
- プルリクエストのレビュー・マージ
- プロジェクトの管理
- ブランチ保護ルールの設定
- コードの自動チェック・レビュー

### 外部サービスとの連携

- Issue 作成時に Slack 通知を送信
- CI/CD パイプラインのトリガー
- 外部イシュートラッカーとの同期
- デプロイメントの自動化

## 権限モデル

GitHub Apps は 3 つのカテゴリの権限を持つ。

| カテゴリ | 例 |
|---------|-----|
| **リポジトリ権限** | Contents, Issues, Pull requests, Actions, Checks, Deployments, Pages |
| **Organization 権限** | Members, Projects, Administration, Custom properties |
| **ユーザー権限** | Email addresses, Followers, GPG keys, SSH keys |

各権限は以下のアクセスレベルを設定できる:

- **No access**: アクセスなし
- **Read-only**: 読み取りのみ
- **Read & write**: 読み書き

## セキュリティ上の利点

| 側面 | 説明 |
|------|------|
| **最小権限の原則** | 必要な権限のみを要求 |
| **短命トークン** | インストールアクセストークンは 1 時間で失効 |
| **リポジトリレベルの制御** | ユーザーが App のアクセス先リポジトリを選択 |
| **漏洩時の影響最小化** | 認証情報が漏洩した場合のダメージを限定 |

## 公式ドキュメント

- [About apps](https://docs.github.com/en/apps/overview)
