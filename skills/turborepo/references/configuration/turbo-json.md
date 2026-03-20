# turbo.json 設定

## グローバル設定

| キー | デフォルト | 説明 |
|---|---|---|
| `globalDependencies` | `[]` | 全タスクのハッシュに含めるファイルのグロブ |
| `globalEnv` | `[]` | 全タスクのハッシュに影響する環境変数 |
| `globalPassThroughEnv` | `[]` | 全タスクで利用可能にする環境変数（ハッシュ影響なし） |
| `ui` | `"stream"` | `"tui"` または `"stream"` |
| `cacheDir` | `".turbo/cache"` | キャッシュ保存場所 |
| `envMode` | `"strict"` | `"strict"` または `"loose"` |
| `concurrency` | `"10"` | 並列実行の最大タスク数 |
| `noUpdateNotifier` | `false` | アップデート通知を無効化 |

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
