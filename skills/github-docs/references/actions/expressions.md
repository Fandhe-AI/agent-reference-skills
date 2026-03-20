# GitHub Actions -- 式と関数

ワークフローで使用できる式、演算子、組み込み関数のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/evaluate-expressions-in-workflows-and-actions

---

## 式の構文

式は `${{ }}` で囲んで使用する。

```yaml
env:
  MY_VAR: ${{ github.ref }}

steps:
  - if: ${{ github.ref == 'refs/heads/main' }}
    run: echo "On main branch"
```

`if` キーでは `${{ }}` を省略できる:

```yaml
  - if: github.ref == 'refs/heads/main'
```

---

## リテラルとデータ型

| 型 | 説明 | 例 |
|---|---|---|
| boolean | `true` または `false` | `true` |
| null | `null` | `null` |
| number | JSON 互換の数値形式（10進数、16進数、指数） | `42`, `0xFF`, `1.5e3` |
| string | シングルクォートで囲む。シングルクォートのエスケープは `''` | `'hello'`, `'it''s'` |

---

## 演算子

| 演算子 | 説明 |
|---|---|
| `( )` | 論理グループ化 |
| `[ ]` | インデックス/配列アクセス |
| `.` | プロパティ参照 |
| `!` | 論理 NOT |
| `<` | より小さい |
| `<=` | 以下 |
| `>` | より大きい |
| `>=` | 以上 |
| `==` | 等しい |
| `!=` | 等しくない |
| `&&` | 論理 AND |
| `\|\|` | 論理 OR |

### 重要な動作

- 文字列比較は大文字小文字を区別しない
- 型が異なる場合、自動的に数値に変換して比較する（緩い等価性）
- 配列やオブジェクトは参照でのみ比較

---

## 型変換ルール

比較時に型が一致しない場合、以下のルールで数値に変換される:

| 型 | 変換結果 |
|---|---|
| null | `0` |
| boolean | `true` -> `1`, `false` -> `0` |
| string | JSON 数値としてパース、失敗時は `NaN`。空文字列は `0` |
| 配列/オブジェクト | `NaN` |

### Falsy 値

以下の値は条件式で `false` に評価される: `false`, `0`, `-0`, `""`, `''`, `null`

---

## 組み込み関数

### 文字列関数

#### `contains(search, item)`

`search` が `item` を含む場合 `true` を返す。文字列（部分文字列チェック）と配列（要素チェック）の両方で動作する。大文字小文字を区別しない。

```yaml
if: contains('Hello world', 'llo')          # true
if: contains(github.event.issue.labels.*.name, 'bug')
```

#### `startsWith(searchString, searchValue)`

`searchString` が `searchValue` で始まる場合 `true` を返す。大文字小文字を区別しない。

```yaml
if: startsWith(github.ref, 'refs/tags/')
```

#### `endsWith(searchString, searchValue)`

`searchString` が `searchValue` で終わる場合 `true` を返す。大文字小文字を区別しない。

```yaml
if: endsWith(github.repository, '-api')
```

#### `format(string, replaceValue0, replaceValue1, ..., replaceValueN)`

`{N}` プレースホルダーを対応する値に置換する。リテラルの波括弧は `{{` でエスケープする。

```yaml
${{ format('Hello {0} {1}', 'Mona', 'Octocat') }}
# 結果: 'Hello Mona Octocat'

${{ format('{{Key}}: {0}', 'value') }}
# 結果: '{Key}: value'
```

#### `join(array, optionalSeparator)`

配列の要素を文字列に連結する。デフォルトのセパレータはカンマ。

```yaml
${{ join(github.event.issue.labels.*.name, ', ') }}
# 結果: 'bug, help wanted'
```

### データ変換関数

#### `toJSON(value)`

値の整形済み JSON 表現を返す。デバッグに有用。

```yaml
- run: echo '${{ toJSON(github.event) }}'
```

#### `fromJSON(value)`

JSON 文字列をネイティブオブジェクト、配列、またはデータ型にパースする。ジョブ間で JSON マトリクスを渡したり、環境変数を適切な型に変換するのに使用。

```yaml
# 動的マトリクスの生成
strategy:
  matrix: ${{ fromJSON(needs.setup.outputs.matrix) }}

# 環境変数の型変換
env:
  IS_ENABLED: ${{ fromJSON('true') }}  # boolean として扱われる
```

#### `hashFiles(path)`

グロブパターンに一致するファイルの SHA-256 ハッシュを計算する。パスは `GITHUB_WORKSPACE` からの相対パス。複数パターンをカンマ区切りで指定可能。

```yaml
# 単一パターン
${{ hashFiles('**/package-lock.json') }}

# 複数パターン
${{ hashFiles('**/package-lock.json', '**/Gemfile.lock') }}

# 除外パターン
${{ hashFiles('/lib/**/*.rb', '!/lib/foo/*.rb') }}
```

一致するファイルがない場合は空文字列を返す。

### 条件関数

#### `case(pred1, val1, pred2, val2, ..., default)`

述語を順番に評価し、最初に `true` になった述語に対応する値を返す。一致しない場合はデフォルト値を返す。

```yaml
${{ case(github.ref == 'refs/heads/main', 'production', 'development') }}
```

---

## ステータスチェック関数

`if` 条件で使用する。これらの関数を使うとデフォルトの `success()` チェックが上書きされる。

#### `success()`

前の全ステップが成功した場合に `true` を返す。

```yaml
if: success()
```

#### `always()`

ステップを常に実行し、キャンセルされても `true` を返す。

```yaml
if: always()
```

注意: クリティカルなタスクには `always()` の代わりに `!cancelled()` を使用することが推奨される。

#### `cancelled()`

ワークフローがキャンセルされた場合に `true` を返す。

```yaml
if: cancelled()
```

#### `failure()`

ジョブの前のステップのいずれかが失敗した場合に `true` を返す。

```yaml
if: failure()
# 特定のステップの失敗を検出
if: failure() && steps.deploy.conclusion == 'failure'
```

---

## オブジェクトフィルタ

`*` 構文でコレクションから全一致アイテムを選択する。

```yaml
# 配列フィルタ: 全要素の name プロパティを抽出
github.event.issue.labels.*.name

# オブジェクトフィルタ: 全オブジェクトの特定プロパティを取得
vegetables.*.ediblePortions
```

結果は配列として返される。オブジェクトフィルタの順序は保証されない。

---

## 一般的な式パターン

```yaml
# ブランチ名によるフィルタリング
if: github.ref == 'refs/heads/main'
if: startsWith(github.ref, 'refs/tags/v')

# イベントタイプによるフィルタリング
if: github.event_name == 'push'
if: github.event_name == 'pull_request'

# ラベルの存在チェック
if: contains(github.event.pull_request.labels.*.name, 'deploy')

# 複合条件
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
if: "!cancelled()"

# アクターによるフィルタリング
if: github.actor == 'dependabot[bot]'

# 変更ファイルの検出（別ステップの出力を利用）
if: steps.changes.outputs.src == 'true'
```
