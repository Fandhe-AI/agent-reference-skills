# Instrumentation (Experimental)

OpenTelemetry ベースの分散トレーシングで Better Auth の認証操作を監視・デバッグする。エンドポイント・フック・DB 操作・プラグインライフサイクルイベントのトレースを提供する。

**注意**: この機能は実験的で、API とスパン構造は今後変更される可能性がある。

## セットアップ

Node.js アプリには OpenTelemetry の公式セットアップガイドに従い、以下の 2 コンポーネントを設定する:

1. **TracerProvider** — スパン作成を管理する中心コンポーネント
2. **SpanExporter** — トレースデータの収集・エクスポートを担う

## 対応スパンタイプ

### エンドポイントスパン

HTTP 操作をキャプチャ。以下の属性を含む:

| 属性 | 説明 |
|---|---|
| `http.route` | ルートテンプレート（低カーディナリティ） |
| `http.response.status_code` | HTTP ステータスコード |
| `better_auth.context` | 実行元（user またはプラグイン固有） |

リクエストハンドラー・before/after フック・プラグインミドルウェアをトラッキング。

### DB スパン

アダプター操作（create, read, update, delete）を計測。以下の属性を含む:

| 属性 | 説明 |
|---|---|
| `db.operation.name` | DB 操作タイプ |
| `better_auth.context` | コレクション識別子 |

ミューテーション操作の before/after フックも計測。

## Related

- [options.md](./options.md)
- [telemetry.md](./telemetry.md)
