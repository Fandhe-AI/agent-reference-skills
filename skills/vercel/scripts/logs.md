# Logs

ランタイムログの表示・フィルタリング・ストリーミング

## 直近のリクエストログを表示（デフォルト: 過去 24 時間）

```sh
vercel logs
```

## ライブログのストリーミング（最大 5 分間）

```sh
vercel logs --follow
```

特定デプロイメントのライブログをストリーミング。

```sh
vercel logs --follow --deployment dpl_xxxxx
```

## ログのフィルタリング

エラーレベルのログのみ表示。

```sh
vercel logs --level error
```

複数レベルを指定（`error`, `warning`, `info`, `fatal` が有効）。

```sh
vercel logs --level error --level warning
```

Production 環境のログを表示。

```sh
vercel logs --environment production
```

HTTP ステータスコードで絞り込み。

```sh
vercel logs --status-code 500
vercel logs --status-code 5xx
```

ソース種別で絞り込み（`serverless`, `edge-function`, `edge-middleware`, `static`）。

```sh
vercel logs --source edge-function --source serverless
```

全文検索。

```sh
vercel logs --query "timeout"
```

リクエスト ID で絞り込み。

```sh
vercel logs --request-id req_xxxxx
```

## 時間範囲の指定

過去 1 時間のログを表示。

```sh
vercel logs --since 1h
```

ISO 8601 形式で時間範囲を指定。

```sh
vercel logs --since 2026-01-15T10:00:00Z
```

開始と終了の両方を指定。

```sh
vercel logs --since 2h --until 1h
```

## 表示件数の指定

最大 50 件を表示（デフォルトは 100 件）。

```sh
vercel logs --limit 50
```

## JSON 形式で出力

```sh
vercel logs --json
```

jq でパイプ処理。

```sh
vercel logs --json | jq 'select(.level == "error")'
vercel logs --query "timeout" --json | jq '.message'
```

## 全メッセージを折り返さず表示

```sh
vercel logs --expand
```

## 特定プロジェクトのログを表示

```sh
vercel logs --project my-app
```

## 特定デプロイメントのログを表示

```sh
vercel logs --deployment dpl_xxxxx
```

## 特定ブランチのログを表示

```sh
vercel logs --branch feature-x
```

## よく使う組み合わせ例

過去 1 時間のエラーログ。

```sh
vercel logs --level error --since 1h
```

Production の 500 エラーを JSON で出力。

```sh
vercel logs --environment production --status-code 500 --json
```

全メッセージを 20 件表示。

```sh
vercel logs --expand --limit 20
```
