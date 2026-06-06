# turbo.json 設定

## グローバル設定

| キー | デフォルト | 説明 |
|---|---|---|
| `extends` | — | ルート `turbo.json` から拡張（パッケージ固有設定用） |
| `globalDependencies` | `[]` | 全タスクのハッシュに含めるファイルのグロブ |
| `globalEnv` | `[]` | 全タスクのハッシュに影響する環境変数 |
| `globalPassThroughEnv` | `[]` | 全タスクで利用可能にする環境変数（ハッシュ影響なし） |
| `ui` | `"stream"` | `"tui"` または `"stream"` |
| `cacheDir` | `".turbo/cache"` | キャッシュ保存場所 |
| `cacheMaxAge` | `"0"` | キャッシュ最大保持期間（例: `"7d"`, `"24h"`） |
| `cacheMaxSize` | `"0"` | キャッシュ最大サイズ（例: `"10GB"`, `"500MB"`） |
| `envMode` | `"strict"` | `"strict"` または `"loose"` |
| `concurrency` | `"10"` | 並列実行の最大タスク数 |
| `noUpdateNotifier` | `false` | アップデート通知を無効化 |
| `dangerouslyDisablePackageManagerCheck` | `false` | `packageManager` 検証を無効化 |
| `futureFlags` | — | 将来デフォルト化される実験的機能を有効化 |
| `tags` | — | Boundaries で使用するパッケージタグ（パッケージ設定のみ） |
| `global` | — | グローバルオプションの名前空間（`globalConfiguration` フラグ必須） |
| `remoteCache` | — | Remote Cache 設定 |
| `experimentalObservability` | — | OpenTelemetry メトリクス出力設定 |
| `boundaries` | — | `turbo boundaries` コマンドのルール設定 |
| `tasks` | — | タスク定義 |

## futureFlags

| フラグ | デフォルト | 説明 |
|---|---|---|
| `errorsOnlyShowHash` | `false` | `outputLogs: "errors-only"` 時にタスクハッシュを表示 |
| `longerSignatureKey` | `false` | Remote Cache 署名キーを 32 バイト以上に制限 |
| `affectedUsingTaskInputs` | `false` | `--affected` でタスクレベルの `inputs` を使用 |
| `watchUsingTaskInputs` | `false` | `turbo watch` でタスクの `inputs` グロブでフィルタリング |
| `pruneIncludesGlobalFiles` | `false` | `turbo prune` 出力に `globalDependencies` ファイルを含める |
| `filterUsingTasks` | `false` | `--filter` をパッケージでなくタスクレベルで解決 |
| `globalConfiguration` | `false` | グローバルオプションを `global` 名前空間に移動 |

## タスク定義（tasks 配下）

| キー | デフォルト | 説明 |
|---|---|---|
| `dependsOn` | `[]` | タスクの実行依存関係 |
| `inputs` | ソース管理対象全ファイル | ハッシュ対象ファイルのグロブ |
| `outputs` | `[]` | キャッシュするファイル |
| `cache` | `true` | キャッシュの有効/無効 |
| `env` | `[]` | タスクのハッシュに影響する環境変数 |
| `passThroughEnv` | `[]` | 実行時のみ利用可能な環境変数 |
| `persistent` | `false` | 長時間実行プロセスに指定 |
| `interactive` | `false` | stdin 入力を有効にする |
| `interruptible` | `false` | `turbo watch` 時の再起動許可 |
| `outputLogs` | `"full"` | `"full"` / `"hash-only"` / `"new-only"` / `"errors-only"` / `"none"` |
| `with` | `[]` | 並行実行するタスクを指定 |
| `extends` | `true` | 継承チェーンから設定を引き継ぐ（タスクレベル） |
| `description` | `""` | タスクの説明（情報表示のみ） |

## inputs の特殊値

- `$TURBO_DEFAULT$`: デフォルト挙動を維持しつつ追加・除外
- `$TURBO_ROOT$`: リポジトリルートからの相対パス
- `$TURBO_EXTENDS$`: 継承した値に追記

## 完成例

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "globalDependencies": [".env"],
  "globalEnv": ["NODE_ENV"],
  "globalPassThroughEnv": ["CI"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "package.json", "tsconfig.json"],
      "outputs": ["dist/**"],
      "env": ["MY_API_URL"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**", "test/**"]
    },
    "lint": {},
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    }
  }
}
```
