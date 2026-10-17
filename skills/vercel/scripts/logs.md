# Logs

ランタイムログ・CDN リクエストレコードの表示・フィルタリング（Vercel CLI v64.0.0 以降）

`vercel logs` はランタイムログ、`vercel logs requests` は CDN リクエストレコードを表示する。デフォルトはリンク中プロジェクトの直近 30 分の最新 100 件（production / preview / カスタム環境を横断）。遡れる期間やフィルタ可能なフィールドはプランに依存する。

## 直近のランタイムログを表示

```sh
vercel logs
```

## CDN リクエストレコードの表示

5xx ステータスのリクエストレコード。

```sh
vercel logs requests --query 'httpStatus >= 500'
```

HTTP ステータスコードで絞り込み。

```sh
vercel logs requests --query 'httpStatus:500'
```

```sh
vercel logs requests --query 'httpStatus >= 500 AND httpStatus < 600'
```

POST かつキャッシュミスのリクエスト。

```sh
vercel logs requests --query 'requestMethod:POST AND cacheResult:MISS'
```

## ログのフィルタリング（--query）

`-q, --query` は Vercel 対応の KQL（Kibana Query Language）サブセットで絞り込む。クエリ全体を単一引用符で囲み、空白や KQL 予約文字を含む値は二重引用符で囲む。

エラーレベルのランタイムログで `timeout` を含むもの。

```sh
vercel logs runtime --query 'level:error AND timeout'
```

全文検索（ランタイムログではベアワードが message を大文字小文字無視で検索）。

```sh
vercel logs --query "timeout"
```

ソース種別で絞り込み。

```sh
vercel logs --query 'source:function'
```

リクエスト ID で絞り込み（30 分より古い場合は `--since` で窓を広げる）。`<request-id>` は実際のリクエスト ID に置き換える。

```sh
vercel logs --query 'requestId:"<request-id>"'
```

指定できるフィールドの確認。

```sh
vercel logs runtime --help
vercel logs requests --help
```

Production 環境のログを表示。

```sh
vercel logs --environment production
```

## 時間範囲の指定

過去 1 時間のログを表示（相対期間・ISO 8601・`now` が指定可能）。

```sh
vercel logs --since 1h
```

ISO 8601 形式で開始と終了を指定。

```sh
vercel logs --since 2026-01-15T10:00:00Z --until 2026-01-15T11:00:00Z
```

```sh
vercel logs --since 2h --until 1h
```

## 表示件数とページネーション

最大 500 件を表示（デフォルト 100 件、最大 10,000 件）。

```sh
vercel logs --limit 500
```

前回のクエリの続きを取得（`--project` / `--deployment` / `--environment` / `--query` / `--since` / `--until` との併用は不可）。

```sh
vercel logs --next <cursor>
```

## JSON 形式で出力

1 行 1 JSON オブジェクト（`-F json` でも同じ）。各レコードは `{"type":"log"|"request","data":<event>}` で、最終行は `summary`。

```sh
vercel logs --json
```

jq でパイプ処理。

```sh
vercel logs runtime --query 'level:error' --json | jq 'select(.type == "log") | .data'
```

## 特定プロジェクト・デプロイメントのログを表示

```sh
vercel logs --project my-app
```

`<deployment-id>` は実際のデプロイメント ID に置き換える。

```sh
vercel logs --deployment <deployment-id>
```

## よく使う組み合わせ例

Production のランタイムエラー（過去 1 時間）。

```sh
vercel logs runtime --environment production --query 'level:error' --since 1h
```

## 削除・変更されたオプション

`--follow` は非推奨。警告を出し、ストリーミングせずクエリ結果を返す（ライブストリーミングは行われない）。以下は削除済みで、指定すると使用法エラーとなり置き換え先が表示される。

| 旧オプション | 置き換え |
| --- | --- |
| `--search <text>` | `--query 'timeout'` |
| `--level error` | `--query 'level:error'` |
| `--source serverless` | `--query 'source:function'` |
| `--source static` | `vercel logs requests`（静的・CDN トラフィック） |
| `--status-code 500` | `vercel logs requests --query 'httpStatus:500'` |
| `--status-code 5xx` | `vercel logs requests --query 'httpStatus >= 500 AND httpStatus < 600'` |
| `--request-id <id>` | `--query 'requestId:"<id>"'` |
| `--branch <name>` | 非対応。削除する |
| `--expand` | 削除（ランタイムメッセージは既定で全文表示） |
| `--no-follow`, `--no-branch` | 削除 |
| 位置引数・`-d`（デプロイメント） | `--deployment`（`-d` は常に `--debug`） |
| `-j` | `--json` または `-F json` |
