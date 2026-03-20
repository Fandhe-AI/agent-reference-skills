# GitHub Actions -- キャッシュ

依存関係キャッシュによるワークフロー高速化のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows

---

## 概要

`actions/cache` を使用して依存関係やビルド出力をキャッシュし、ワークフローの実行時間を短縮する。

---

## 基本的な使用方法

```yaml
steps:
  - uses: actions/checkout@v4

  - uses: actions/cache@v4
    with:
      path: ~/.npm
      key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-npm-

  - run: npm ci
```

---

## 入力パラメータ

| パラメータ | 必須 | 説明 |
|---|---|---|
| `key` | はい | キャッシュの保存/復元に使用するキー。最大 512 文字 |
| `path` | はい | キャッシュ対象のパス（ファイル/ディレクトリ）。グロブパターン対応。絶対パスまたは相対パス |
| `restore-keys` | いいえ | `key` が完全一致しない場合の代替キー（改行区切り、具体的なものから順に記載） |
| `enableCrossOsArchive` | いいえ | クロス OS でのキャッシュ復元を許可。デフォルト: `false` |

---

## 出力パラメータ

| パラメータ | 説明 |
|---|---|
| `cache-hit` | `key` に完全一致するキャッシュが見つかった場合 `true` |

```yaml
- uses: actions/cache@v4
  id: cache-deps
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

- if: steps.cache-deps.outputs.cache-hit != 'true'
  run: npm ci
```

---

## キャッシュキーの設計

### 動的キー（ハッシュベース）

依存関係ファイルのハッシュを使用して、変更時に自動的に新しいキャッシュを作成する。

```yaml
key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
```

### restore-keys パターン

最も具体的なものから最も一般的なものの順に記載する:

```yaml
restore-keys: |
  ${{ runner.os }}-npm-feature-${{ hashFiles('**/package-lock.json') }}
  ${{ runner.os }}-npm-feature-
  ${{ runner.os }}-npm-
```

---

## キャッシュの動作

### キャッシュヒット（完全一致）

提供された `key` に完全一致するキャッシュが見つかった場合:
- 指定された `path` にファイルが復元される
- `cache-hit` 出力が `true` になる

### キャッシュミス

`key` に完全一致するキャッシュがない場合:
1. `restore-keys` を順番に検索し、プレフィックス一致するキャッシュを探す
2. 部分一致が見つかった場合、最新のキャッシュを復元する
3. ジョブが正常に完了した場合、新しいキャッシュが自動的に作成される

---

## キャッシュスコープ（ブランチベース）

ワークフローは以下のブランチのキャッシュを復元できる:

- **現在のブランチ**
- **デフォルトブランチ（main）**
- **ベースブランチ**（PR の場合）
- **フォークリポジトリのベースブランチ**

### 制限

- 子ブランチや兄弟ブランチのキャッシュにはアクセスできない
- 異なるタグ名のキャッシュにはアクセスできない
- マージ ref で作成された PR キャッシュは再実行時のみ復元可能

---

## サイズ制限と退避ポリシー

| 項目 | 制限 |
|---|---|
| リポジトリごとのキャッシュサイズ | デフォルト 10 GB（管理者が調整可能） |
| キャッシュエントリ数 | 制限なし |
| 未アクセスのキャッシュの有効期間 | 7 日間 |
| アップロードレート | 200 回/分/リポジトリ |
| ダウンロードレート | 1,500 回/分/リポジトリ |

### 退避ポリシー

ストレージ制限に達した場合、最終アクセス日が古い順にキャッシュが削除される。

---

## 言語別のキャッシュ例

### Node.js (npm)

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

### Node.js (yarn)

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.cache/yarn
      node_modules
    key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
```

### Python (pip)

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
```

### Ruby (Bundler)

```yaml
- uses: actions/cache@v4
  with:
    path: vendor/bundle
    key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
```

### Go

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/go/pkg/mod
      ~/.cache/go-build
    key: ${{ runner.os }}-go-${{ hashFiles('**/go.sum') }}
```

---

## setup-* アクションによる簡易キャッシュ

多くの `setup-*` アクションには組み込みのキャッシュ機能がある:

```yaml
# Node.js
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # npm, yarn, pnpm に対応

# Python
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
    cache: 'pip'

# Go
- uses: actions/setup-go@v5
  with:
    go-version: '1.22'
    cache: true
```

---

## ベストプラクティス

1. **機密情報を含めない**: キャッシュパスにアクセストークンやログイン情報を保存しない
2. **ハッシュベースのキーを使用**: 依存関係ファイルのハッシュでキーを構成し、変更時に自動更新
3. **restore-keys を活用**: 部分一致によるフォールバックで、完全に新しいキャッシュの構築を回避
4. **cache-hit を利用**: キャッシュヒット時にインストールステップをスキップして時間を節約
5. **setup-* アクションを優先**: 言語固有の `setup-*` アクションの組み込みキャッシュが最も簡単
6. **キャッシュ使用量を監視**: ストレージ制限に近づいたら不要なキャッシュを削除
