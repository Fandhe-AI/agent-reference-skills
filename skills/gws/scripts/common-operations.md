# Common Operations

Gmail / Drive / Calendar / Sheets の頻出コマンド集。

## スキーマの確認（Discovery）

```sh
gws schema drive.files.list
```

`<service>.<resource>.<method>` 形式でリクエスト・レスポンスのスキーマを確認する。

## サービスヘルプの表示

```sh
gws gmail --help
gws drive --help
gws calendar --help
gws sheets --help
```

---

## Gmail

### メール送信

```sh
gws gmail +send --to alice@example.com --subject "Hello" --body "Hi there"
```

### 返信

```sh
gws gmail +reply --message-id MESSAGE_ID --body "Thanks!"
```

### 全員返信

```sh
gws gmail +reply-all
```

### 転送

```sh
gws gmail +forward
```

### 未読受信トレイのトリアージ（送信者・件名・日付の一覧表示）

```sh
gws gmail +triage
```

### 受信メールのストリーミング監視

```sh
gws gmail +watch
```

### メッセージ一覧の取得

```sh
gws gmail users messages list --params '{"maxResults": 10}'
```

### Model Armor によるレスポンスサニタイズを有効にしてメッセージ取得

```sh
gws gmail users messages get --params '{"userId": "me", "id": "MESSAGE_ID"}' \
  --sanitize "projects/PROJECT_ID/locations/LOCATION/templates/TEMPLATE_ID"
```

---

## Drive

### ファイル一覧の取得

```sh
gws drive files list --params '{"pageSize": 5}'
```

### ファイルの全件取得（ページネーション）

```sh
gws drive files list --params '{"pageSize": 100}' --page-all
```

### ページ数の上限を指定して取得

```sh
gws drive files list --page-all --page-limit 5
```

### ページ間の待機時間を指定して取得

```sh
gws drive files list --page-all --page-delay 500
```

### ファイルのアップロード（ヘルパー）

```sh
gws drive +upload ./report.pdf --name "Q1 Report"
```

### ファイルの作成（API 直接呼び出し）

```sh
gws drive files create --json '{"name": "report.pdf"}' --upload ./report.pdf
```

### NDJSON 出力をパイプで処理

```sh
# --page-all emits NDJSON: one line per page, each line a full response object
# jq processes each line independently (no -s/--slurp needed), extracting items from every page
gws drive files list --params '{"pageSize": 100}' --page-all | jq -c '.files[]'
```

---

## Calendar

### 今後の予定を一覧表示

```sh
gws calendar +agenda
```

### タイムゾーンを指定して本日の予定を表示

```sh
gws calendar +agenda --today --timezone America/New_York
```

`--tz` は `--timezone` の省略形として使用できる。

### イベントの作成

```sh
gws calendar +insert
```

---

## Sheets

### スプレッドシートの値を読み取る

```sh
gws sheets +read
```

### スプレッドシートに行を追記する

```sh
gws sheets +append --spreadsheet SPREADSHEET_ID --values "Alice,95"
```

### 値の範囲取得（API 直接呼び出し）

```sh
gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "SPREADSHEET_ID", "range": "Sheet1!A1:C10"}'
```

### 値の追記（API 直接呼び出し）

```sh
gws sheets spreadsheets values append \
  --params '{"spreadsheetId": "SPREADSHEET_ID", "range": "Sheet1!A1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Name", "Score"], ["Alice", 95]]}'
```

### スプレッドシートの作成

```sh
gws sheets spreadsheets create --json '{"properties": {"title": "Q1 Budget"}}'
```

---

## Chat

### メッセージの送信

```sh
gws chat +send
```

### メッセージ送信のドライラン

```sh
gws chat spaces messages create \
  --params '{"parent": "spaces/SPACE_ID"}' \
  --json '{"text": "Deploy complete."}' \
  --dry-run
```

`--dry-run` を付けるとリクエスト内容を確認できるが、実際には送信されない。

---

## Docs

### ドキュメントへのテキスト追記

```sh
gws docs +write
```

---

## 共通フラグ一覧

| フラグ | 説明 |
| --- | --- |
| `--dry-run` | リクエストをプレビューするが実行しない |
| `--json '...'` | JSON 形式のリクエストボディを指定する |
| `--params '...'` | JSON 形式のリクエストパラメーターを指定する |
| `--upload <path>` | マルチパートアップロードのファイルパスを指定する |
| `--page-all` | 全ページを自動取得し NDJSON で出力する |
| `--page-limit <N>` | 取得する最大ページ数（デフォルト: 10） |
| `--page-delay <ms>` | ページ間の待機時間ミリ秒（デフォルト: 100） |
| `--timezone` / `--tz` | 時刻を扱うヘルパーのタイムゾーンを上書きする |
| `--today` | 本日の結果に絞り込む |
| `--sanitize <template>` | Model Armor テンプレートでレスポンスをスキャンする |
