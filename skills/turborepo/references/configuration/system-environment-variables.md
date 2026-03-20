# システム環境変数

## 設定系

| 変数名 | 説明 |
|---|---|
| `TURBO_API` | Remote Cache サービスのベース URL |
| `TURBO_BINARY_PATH` | turbo バイナリの場所を手動指定 |
| `TURBO_CACHE` | キャッシュの読み書き権限を制御 |
| `TURBO_CACHE_DIR` | キャッシュ保存ディレクトリ |
| `FORCE_COLOR` | ターミナルログに強制的に色を表示 |

## CI / プラットフォーム系

| 変数名 | 説明 |
|---|---|
| `TURBO_CI_VENDOR_ENV_KEY` | Framework Inference から除外する環境変数プレフィックス |
| `TURBO_PLATFORM_ENV` | CI 環境で設定された環境変数キーの CSV |
| `TURBO_PLATFORM_ENV_DISABLED` | プラットフォーム設定の照合を無効化 |

## キャッシュ・パフォーマンス系

| 変数名 | 説明 |
|---|---|
| `TURBO_FORCE` | キャッシュをバイパスしてタスクを再実行 |
| `TURBO_REMOTE_ONLY` | ローカルキャッシュを無視 |
| `TURBO_REMOTE_CACHE_READ_ONLY` | Remote Cache の読み取りのみ許可 |
| `TURBO_REMOTE_CACHE_SIGNATURE_KEY` | アーティファクトの署名キー |
| `TURBO_REMOTE_CACHE_TIMEOUT` | ダウンロードタイムアウト（秒） |
| `TURBO_REMOTE_CACHE_UPLOAD_TIMEOUT` | アップロードタイムアウト（秒） |
| `TURBO_PREFLIGHT` | プリフライトリクエストを有効化 |

## 認証系

| 変数名 | 説明 |
|---|---|
| `TURBO_TOKEN` | Remote Cache アクセスのベアラートークン |
| `TURBO_TEAM` | アカウント/チームのスラッグ |
| `TURBO_TEAMID` | アカウント ID |
| `TURBO_LOGIN` | Remote Cache サービスのログイン URL |

## ログ・UI 系

| 変数名 | 説明 |
|---|---|
| `TURBO_LOG_ORDER` | `grouped` / `default` |
| `TURBO_UI` | TUI の有効/無効 |
| `TURBO_RUN_SUMMARY` | Run Summary レポート生成 |
| `TURBO_CONCURRENCY` | 並列実行数 |

## ソース管理系

| 変数名 | 説明 |
|---|---|
| `TURBO_SCM_BASE` | `--affected` のベースリファレンス |
| `TURBO_SCM_HEAD` | `--affected` のヘッドリファレンス |

## タスク実行時に自動提供される変数

| 変数名 | 説明 |
|---|---|
| `TURBO_HASH` | 現在実行中のタスクのハッシュ値 |
| `TURBO_IS_TUI` | TUI 使用時に `true` |
| `TURBO_IS_MFE` | microfrontends.json 使用時にポートがセット |

## その他

| 変数名 | 説明 |
|---|---|
| `TURBO_DANGEROUSLY_DISABLE_PACKAGE_MANAGER_CHECK` | packageManager 検証を無効化 |
| `TURBO_DOWNLOAD_LOCAL_ENABLED` | 正しいローカルバージョンのインストールを許可 |
| `TURBO_GLOBAL_WARNING_DISABLED` | ローカルバージョン未検出時の警告を抑制 |
| `TURBO_NO_UPDATE_NOTIFIER` | 更新通知を非表示 |
| `TURBO_TELEMETRY_MESSAGE_DISABLED` | テレメトリ通知を抑制 |
| `TURBO_SSO_LOGIN_CALLBACK_PORT` | SSO コールバックポート（デフォルト: 9789） |
