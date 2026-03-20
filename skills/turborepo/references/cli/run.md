# turbo run

```bash
turbo run <task> [options]
```

## 主要オプション

### フィルタリング

| オプション | 説明 |
|---|---|
| `--filter <pattern>` / `-F` | 実行対象パッケージを絞り込む |
| `--affected` | 変更があったパッケージのみ実行 |
| `--only` | 依存タスクを実行せず指定タスクのみ |

### キャッシュ制御

| オプション | デフォルト | 説明 |
|---|---|---|
| `--cache` | `local:rw,remote:rw` | キャッシュの読み書きモード |
| `--force` | — | キャッシュを無視して再実行 |
| `--cache-dir` | `.turbo/cache` | キャッシュディレクトリ |

### 実行制御

| オプション | デフォルト | 説明 |
|---|---|---|
| `--concurrency` | `10` | 最大同時実行数 |
| `--continue` | `never` | エラー時の動作（`never`/`dependencies-successful`/`always`） |
| `--env-mode` | `strict` | 環境変数のアクセス制御 |

### 出力・デバッグ

| オプション | 説明 |
|---|---|
| `--dry` / `--dry-run` | 実行せずにタスク計画を表示 |
| `--graph` | タスクグラフを可視化（`dot`/`svg`/`html`/`mermaid`） |
| `--output-logs` | ログ出力レベル |
| `--summarize` | 実行メタデータを JSON で出力 |
| `--profile` | パフォーマンストレースを生成 |

## フィルタ構文

### パッケージ名

```bash
turbo run build --filter=ui
turbo run build --filter=@acme/ui
```

### ディレクトリ

```bash
turbo run build --filter=./apps/*
```

### Git ベース

```bash
turbo run build --filter=[HEAD^1]
turbo run build --filter=[origin/main]
```

### マイクロシンタックス演算子

| 演算子 | 意味 |
|---|---|
| `!` | 除外 |
| `...pkg` | pkg の依存元（上流）を含む |
| `pkg...` | pkg の依存先（下流）を含む |
| `^` | `...` 使用時に対象自身を除外 |

## よく使う組み合わせ

```bash
turbo run build --affected                         # 変更パッケージのみ
turbo run build --dry=json                         # ドライラン
turbo run test --continue=always                   # エラーでも続行
turbo run build --cache=local:r,remote:rw          # ローカル読み込みのみ
turbo run test --filter=...@acme/ui                # 依存元すべて
turbo run web#lint                                 # 特定タスク
```
