# Setup

プロジェクトのリンク・初期化・設定取得、コーディングエージェントのセットアップ

## コーディングエージェントのセットアップ

Claude Code / Codex 向け Vercel プラグインのインストールと、ローカルのコーディングエージェントの AI Gateway 接続を行う。各ステップの前に確認が入り、マシン上に無いエージェントはスキップされる。

```sh
vercel setup
```

AI Gateway への接続のみ実行（プラグインのステップをスキップ）。

```sh
vercel setup --gateway
```

Vercel プラグインのみを Codex 向けにインストール。

```sh
vercel setup --plugin --agent codex
```

変更内容のプレビュー（ファイルは書き込まない）。

```sh
vercel setup --dry-run
```

確認プロンプトをスキップして実行。

```sh
vercel setup --yes
```

## ローカルディレクトリを Vercel プロジェクトにリンク

```sh
vercel link
```

特定ディレクトリを指定してリンク。

```sh
vercel link [path-to-directory]
```

対話形式の確認をスキップしてリンク。

```sh
vercel link --yes
```

プロジェクト名または ID を指定してリンク（非インタラクティブ用途）。

```sh
vercel link --yes --project [project-name]
```

モノレポ内の全プロジェクトを一括リンク（Git 連携が必要）。

```sh
vercel link --repo
```

## サンプルプロジェクトの初期化

```sh
vercel init
```

プロジェクト名を指定して初期化。

```sh
vercel init [project-name]
```

## 環境変数・プロジェクト設定のローカルキャッシュ取得

`vercel build` や `vercel dev` を使う前に実行することを推奨。

```sh
vercel pull
```

Preview 環境の設定を取得。

```sh
vercel pull --environment=preview
```

Production 環境の設定を取得。

```sh
vercel pull --environment=production
```

特定ブランチの設定を取得。

```sh
vercel pull --environment=preview --git-branch=feature-branch
```

カスタム環境（例: staging）の設定を取得。

```sh
vercel pull --environment=staging
```

## Vercel ダッシュボードで現在のプロジェクトを開く

```sh
vercel open
```

## プロジェクトの一覧・管理

プロジェクト一覧を表示。

```sh
vercel project ls
```

プロジェクトを追加。

```sh
vercel project add
```

プロジェクトの詳細を確認。

```sh
vercel project inspect [project-name]
```

プロジェクトを削除。

> **警告**: 削除したプロジェクトは元に戻せない。関連するデプロイメントもすべて削除される。

```sh
vercel project rm
```
