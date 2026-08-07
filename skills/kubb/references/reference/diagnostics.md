# Diagnostics

ビルド失敗時に Kubb が表示する診断メッセージの仕様。安定したコード、メッセージ、ドキュメント該当箇所、推奨される修正方法を含む。

## メッセージ形式

```text
[KUBB_REF_NOT_FOUND]: Could not find a definition for #/components/schemas/Pet.
at: #/components/schemas/Pet
fix: Add the schema under components.schemas, or fix the $ref.
```

## Severity（深刻度）

| Severity | 色 | 効果 |
|----------|-----|------|
| error | red | 非ゼロ終了コードで実行を中断 |
| warning | yellow | 実行は継続し警告として報告 |
| info | blue | 助言的、非ブロッキング |

## 診断コード一覧

### Input Issues

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_INPUT_NOT_FOUND` | error | input に指定したファイルが読み込めない |
| `KUBB_INPUT_REQUIRED` | error | adapter に入力ソースが設定されていない |

### Configuration Problems

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_PLUGIN_NOT_FOUND` | error | 必須プラグインが見つからない |
| `KUBB_ADAPTER_REQUIRED` | error | アクションに adapter が必要だが未設定 |
| `KUBB_PATH_TRAVERSAL` | error | 解決したパスが出力ディレクトリの外に出る |
| `KUBB_CLEAN_ROOT` | error | `output.clean` がプロジェクトルートを削除してしまう |
| `KUBB_INVALID_PLUGIN_OPTIONS` | error | 実行不能なプラグイン設定 |

### OpenAPI Schema Issues

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_REF_NOT_FOUND` | error | ドキュメント内の `$ref` が解決できない |
| `KUBB_INVALID_SERVER_VARIABLE` | error | server variable が enum 制約に違反 |
| `KUBB_UNSUPPORTED_FORMAT` | warning | 型マッピングを持たないスキーマフォーマット |
| `KUBB_DEPRECATED` | info | 参照先のスキーマ・operation が deprecated |

### Plugin Reports

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_PLUGIN_FAILED` | error | プラグインが throw、または error を報告 |
| `KUBB_PLUGIN_WARNING` | warning | 致命的でないプラグイン警告 |
| `KUBB_PLUGIN_INFO` | info | プラグインの情報メッセージ |

### Output Pipeline

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_FORMAT_FAILED` | error | フォーマッター処理の失敗 |
| `KUBB_LINT_FAILED` | error | リンター処理の失敗 |
| `KUBB_POST_GENERATE_FAILED` | error | post-generate コマンドが非ゼロ終了 |

### Other / Metadata

| コード | Severity | 説明 |
|--------|----------|------|
| `KUBB_UNKNOWN` | error | 未分類のエラー |
| `KUBB_PERFORMANCE` | info | プラグインの実行時間（非ブロッキング） |
| `KUBB_UPDATE_AVAILABLE` | info | 新しいバージョンが利用可能（非ブロッキング） |

## マシン可読出力

```bash
kubb generate --reporter json
```

構造化された JSON 配列を stdout に出力し、CI/CD 連携をターミナル出力のスクレイピングなしで可能にする。各設定ごとに1つのレポートオブジェクトが生成され、プラグイン統計、エラー数、ファイル生成メトリクス、タイミングデータ、ドキュメント参照 URL 付きの詳細な診断情報を含む。

## Notes

- プラグイン開発者が独自の診断エラーを構築するための `Diagnostics` 名前空間（`Diagnostics.Error`、`Diagnostics.hasError` 等）は Kit API 側のトピック（[kit-api.md](./kit-api.md)）で扱う。本ページはビルド時に発生しうる診断コードの一覧

## Related

- [kit-api](./kit-api.md)
