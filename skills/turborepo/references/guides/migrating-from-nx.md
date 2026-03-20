# Nx からの移行

## 移行の動機

- エコシステム標準への準拠（JS パッケージマネージャーのワークスペースをそのまま活用）
- 設定量の削減（約15行 vs 40行以上）

## 移行手順

1. `.gitignore` に `.turbo` を追加
2. ワークスペース定義を作成
3. 各アプリに `package.json` を追加
4. Nx プラグインを設定から削除
5. `packageManager` フィールドを指定
6. パッケージマネージャーの install を実行
7. Turborepo をインストール
8. `turbo.json` を作成
9. `turbo build` で動作確認
10. リモートキャッシュを有効化

## 設定対応表

| Nx | Turborepo |
|---|---|
| `sharedGlobals` | `globalDependencies` |
| `cacheDirectory` | `cacheDir` |
| `inputs` | `tasks[task].inputs` |
| `outputs` | `tasks[task].outputs` |

## CLI 対応表

| Nx | Turborepo |
|---|---|
| `nx run` | `turbo run` |
| `nx run-many` | `turbo run` |
| `--projects` | `--filter` |
| `--parallel` | `--concurrency` |

## 段階的移行

タスク単位・パッケージ単位で1つずつ移行する。移行中は Nx と Turborepo を並行して使用可能。
