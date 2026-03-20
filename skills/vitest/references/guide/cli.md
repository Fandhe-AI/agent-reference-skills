# CLI コマンド

## コマンド

| Command | Description |
|---------|-------------|
| `vitest` | デフォルト: dev では watch モード、CI では run モード |
| `vitest run` | ウォッチなしで単一実行 |
| `vitest watch` | ウォッチモードで実行（エイリアス: `vitest dev`） |
| `vitest bench` | ベンチマークテストのみ実行 |
| `vitest related <files>` | 指定ソースファイルに関連するテストのみ実行 |
| `vitest list` | マッチするテスト一覧を出力 |
| `vitest init <name>` | プロジェクト設定のセットアップ |
| `vitest typecheck` | 型テストの実行 |

ファイル名で絞り込み可能: `vitest foobar`
行番号指定（v3+）: `vitest basic/foo.test.ts:10`

## 主要フラグ

| Flag | Description |
|------|-------------|
| `--run` | ウォッチモードを無効化 |
| `--reporter <name>` | レポーター指定（`default`, `verbose`, `dot`, `json` 等） |
| `--coverage.enabled` | カバレッジ収集を有効化 |
| `--ui` | UI を有効化 |
| `-u` / `--update` | スナップショットを更新 |
| `--changed` | 変更されたファイルに関連するテストのみ実行 |
| `--bail <n>` | n 個のテスト失敗で実行を停止 |
| `--passWithNoTests` | テストなしでも成功終了 |
| `--globals` | API をグローバルに注入 |
| `--environment <name>` | 実行環境を指定（デフォルト: `node`） |
| `-t` / `--testNamePattern <pattern>` | パターンにマッチするテストのみ実行 |
| `-w` / `--watch` | ウォッチモードを有効化 |

## よくある使用例

```bash
# 単一実行（CI 向け）
vitest run

# カバレッジ付き実行
vitest run --coverage.enabled

# スナップショット更新
vitest run -u

# 特定テストのみ
vitest run -t "should handle errors"

# 変更ファイルに関連するテストのみ
vitest run --changed

# lint-staged 連携
vitest related src/utils.ts --run
```

## ウォッチモードのキーボードショートカット

| Key | Action |
|-----|--------|
| `a` | 全テストを再実行 |
| `f` | 失敗テストのみ再実行 |
| `u` | スナップショットを更新 |
| `p` | ファイル名でフィルタ |
| `t` | テスト名でフィルタ |
| `q` | 終了 |

## 関連

- [設定](./config.md)
- [カバレッジ](./coverage.md)
- [スナップショット](./snapshot.md)
