# Script Settings

Source: https://lefthook.dev/configuration

`<source_dir>/<hook-name>/` ディレクトリに配置される独自の実行可能スクリプトの設定。スクリプトはプロジェクトルートから実行される。

## Scripts

Source: https://lefthook.dev/configuration/Scripts

### セットアップ手順

1. `lefthook add -d <hook-name>` を実行
2. `.lefthook/<hook-name>/your-script.sh` でスクリプトファイルを編集
3. `lefthook.yml` で設定

### 設定プロパティ

| プロパティ | 型 | 説明 |
|-----------|------|------|
| `runner` | String | スクリプトのインタプリタまたはコマンドエグゼキュータ |
| `args` | String | スクリプトランナーに渡す引数 |
| `skip` | Conditional | 条件に基づくスクリプト実行のスキップ |
| `only` | Conditional | 条件を満たす場合のみスクリプトを実行 |
| `tags` | Array | 選択的実行のためのタグ |
| `env` | Object | スクリプトで利用可能な環境変数 |
| `fail_text` | String | スクリプト失敗時のカスタムメッセージ |
| `stage_fixed` | Boolean | 成功後に変更ファイルを自動ステージ |
| `interactive` | Boolean | 対話的入力を許可 |
| `use_stdin` | Boolean | stdin をスクリプトに渡す |

### 設定例

```yaml
# lefthook.yml

commit-msg:
  scripts:
    "template_checker":
      runner: bash
```

### コミットメッセージバリデータの例

```bash
# .lefthook/commit-msg/template_checker

INPUT_FILE=$1
START_LINE=`head -n1 $INPUT_FILE`
PATTERN="^(TICKET)-[[:digit:]]+: "
if ! [[ "$START_LINE" =~ $PATTERN ]]; then
  echo "Bad commit message, see example: TICKET-123: some text"
  exit 1
fi
```

```yaml
commit-msg:
  scripts:
    "template_checker":
      runner: bash
```

---

## script

Source: https://lefthook.dev/configuration/script

- **型:** String (ファイル名)

lefthook ジョブ内で実行するスクリプトファイル名を指定する。ルールは `scripts` と同じ。

```yaml
# lefthook.yml

pre-commit:
  jobs:
    - script: linter.sh
      runner: bash
```

```bash
# .lefthook/pre-commit/linter.sh

echo "Everything is OK"
```

> `runner` オプションはスクリプトのインタプリタを定義するため、`script` と併せて指定する必要がある。

---

## runner

Source: https://lefthook.dev/configuration/runner

- **型:** String

スクリプトファイルを実行するコマンドを指定する。`<runner> <path-to-script>` の形式で呼び出される。

```yaml
# lefthook.yml

pre-commit:
  scripts:
    "lint.js":
      runner: node
    "check.go":
      runner: go run
```

- 同じフック内で異なるスクリプトに異なるランナーを使用可能
- 一般的なランナー: `node`, `ruby`, `python`, `bash`, `sh`, `go run`
- ランナーコマンドは実行時にシステムの PATH で利用可能である必要がある
