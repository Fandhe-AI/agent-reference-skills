# Workflow Recipes

`+` ヘルパーコマンドおよび workflow を使ったレシピ集。

## Workflow ヘルパー

### スタンドアップレポートの生成

```sh
gws workflow +standup-report
```

ミーティングと未完了タスクをスタンドアップ形式でまとめる。

### ミーティング準備

```sh
gws workflow +meeting-prep
```

アジェンダ・参加者・関連ドキュメントを取得する。

### 週次ダイジェスト

```sh
gws workflow +weekly-digest
```

### メールをタスクに変換

```sh
gws workflow +email-to-task
```

Gmail のメールを Tasks エントリに変換する。

### ファイルのアナウンス

```sh
gws workflow +file-announce
```

---

## Apps Script

### スクリプトのプッシュ

```sh
gws script +push
```

---

## Events（変更通知）

### イベント購読の開始

```sh
gws events +subscribe
```

### 購読の更新（再有効化）

```sh
gws events +renew
```

---

## Model Armor（コンテンツフィルタリング）

### プロンプトのサニタイズ

```sh
gws modelarmor +sanitize-prompt
```

### レスポンスのサニタイズ

```sh
gws modelarmor +sanitize-response
```

### テンプレートの作成

```sh
gws modelarmor +create-template
```

### Model Armor テンプレートをデフォルト設定する

```sh
export GOOGLE_WORKSPACE_CLI_SANITIZE_TEMPLATE="projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
export GOOGLE_WORKSPACE_CLI_SANITIZE_MODE=warn
```

`GOOGLE_WORKSPACE_CLI_SANITIZE_MODE` は `warn`（警告のみ）または `block`（ブロック）を指定できる。

---

## GCP プロジェクト ID の上書き

```sh
export GOOGLE_WORKSPACE_CLI_PROJECT_ID=my-gcp-project
```
