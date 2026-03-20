# Command Settings

Source: https://lefthook.dev/configuration

フックで実行されるコマンドの設定。各コマンドには名前と関連する run オプションがある。

## Commands

Source: https://lefthook.dev/configuration/Commands

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      run: yarn lint
      glob: "*.js"
```

### 利用可能なコマンドオプション

- `run` - コマンド実行文字列
- `skip` / `only` - 条件付き実行制御
- `tags` - カテゴリ分けタグ
- `glob` - ファイルパターンマッチング
- `files` - ファイル指定コマンド
- `file_types` - ファイルタイプフィルタリング
- `env` - 環境変数
- `root` - 作業ディレクトリ
- `exclude` - 除外パターン
- `fail_text` - カスタム失敗メッセージ
- `stage_fixed` - 修正ファイルの自動ステージング
- `interactive` - 対話モード
- `use_stdin` - 標準入力処理
- `priority` - 実行優先順位

---

## name

Source: https://lefthook.dev/configuration/name

- **型:** String

ジョブにラベルを付与し、サマリー出力に表示する。同じ名前のジョブはローカル設定や extends 設定からマージされる。

```yaml
# lefthook.yml

pre-commit:
  jobs:
    - name: lint and fix
      run: yarn run eslint --fix {staged_files}
```

---

## run

Source: https://lefthook.dev/configuration/run

- **型:** String (必須)

`sh` シェルを使用して実行する実際のコマンドを指定する。

### 利用可能なテンプレート

- `{files}` - `files` コマンドの結果
- `{staged_files}` - コミット用にステージされたファイル
- `{push_files}` - コミット済み未プッシュのファイル
- `{all_files}` - git 追跡のすべてのファイル
- `{cmd}` - `lefthook.yml` のコマンドの省略形
- `{0}` - すべての git フック引数のスペース結合文字列
- `{1}`, `{2}`, `{3}` - 個別の git フック引数（番号付き）
- `{lefthook_job_name}` - 現在のジョブ/コマンド/スクリプト名

> コマンドラインの長さにはシステムごとに制限がある。ファイルリストが長い場合、lefthook はファイルリストを分割して複数のコマンドを順次実行する。

### 基本コマンド

```yaml
pre-commit:
  commands:
    lint:
      run: yarn lint
```

### ステージファイルの使用

```yaml
pre-commit:
  commands:
    eslint:
      glob: "*.{js,ts,jsx,tsx}"
      run: yarn eslint {staged_files}
```

### ファイルフィルタリング

```yaml
pre-commit:
  commands:
    govet:
      files: git ls-files -m
      glob: "*.go"
      run: go vet -- {files}
```

### Git 引数の使用

```yaml
commit-msg:
  commands:
    multiple-sign-off:
      run: 'test $(grep -c "^Signed-off-by: " {1}) -lt 2'
```

### クォート付きファイル

```yaml
pre-commit:
  commands:
    lint:
      glob: "*.js"
      run: yarn eslint "{staged_files}"
```

### マルチラインスクリプト

```yaml
pre-commit:
  jobs:
    - name: a whole script in a run
      run: |
        for file in $(ls .); do
          yarn lint $file
        done
```

---

## args

Source: https://lefthook.dev/configuration/args

- **型:** String
- **追加バージョン:** lefthook 2.0.5

スクリプトに引数を渡す、または `lefthook-local.yml` でコマンドの引数を上書きする。`run` オプションと同じテンプレート変数をサポートする。

> **注意:** `args` を指定すると Git が渡す引数は省略される。`args` を省略するか `args: "{0}"` を設定すると同じ結果になる。

```yaml
# lefthook.yml

pre-commit:
  jobs:
    - script: check-python-files.sh
      runner: bash
      args: "{staged_files}"
      glob: "*.py"

    - run: yarn lint
      args: "{staged_files}"
      glob:
        - "*.ts"
        - "*.js"
```

---

## group

Source: https://lefthook.dev/configuration/group

複数のジョブをまとめて、ユニットとしての実行方法を定義する。

### サブオプション

- `parallel`: グループ内のすべてのジョブを同時実行
- `piped`: ジョブを順次実行
- `jobs`: グループに含まれるジョブ

### 継承プロパティ

`env`、`root`、`glob`、`exclude` がグループに定義されると、ジョブレベルで上書きされない限り、すべての配下ジョブに伝播する。

### 並列実行グループ

```yaml
pre-commit:
  jobs:
    - group:
        parallel: true
        jobs:
          - run: echo 1
          - run: echo 2
          - run: echo 3
```

### 継承設定付きグループ

```yaml
pre-commit:
  jobs:
    - env:
        E1: hello
      glob:
        - "*.md"
      exclude:
        - "README.md"
      root: "subdir/"
      group:
        parallel: true
        jobs:
          - run: echo $E1
          - run: echo $E1
            env:
              E1: bonjour
```

### マージ用名前付きグループ

```yaml
pre-commit:
  jobs:
    - name: a name of a group
      group:
        jobs:
          - name: lint
            run: yarn lint
          - name: test
            run: yarn test
```

> グループのマージを有効にするには、個々のジョブだけでなくグループジョブ自体に `name` を割り当てること。

---

## tags

Source: https://lefthook.dev/configuration/tags

- **型:** Array of strings

コマンドとスクリプトにタグを指定する。`exclude_tags` による選択的除外に有用。

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      tags:
        - frontend
        - js
      run: yarn lint
    test:
      tags:
        - backend
        - ruby
      run: bundle exec rspec
```

---

## glob

Source: https://lefthook.dev/configuration/glob

- **型:** String / Array of strings

コマンドのファイルをフィルタリングする。`run` オプションでファイルテンプレートを使用するか、カスタム `files` コマンドを提供する場合にのみ適用される。

### 単一 glob パターン

```yaml
pre-commit:
  jobs:
    - name: lint
      run: yarn eslint {staged_files}
      glob: "*.{js,ts,jsx,tsx}"
```

### 複数 glob パターン（v1.10.10+）

```yaml
pre-commit:
  jobs:
    - run: yarn lint {staged_files}
      glob:
        - "*.ts"
        - "*.js"
```

### ファイルテンプレートなしでの使用

```yaml
pre-commit:
  jobs:
    - name: lint
      run: npm run lint
      glob: "*.js"
```

> - glob は実際の git リポジトリルートから計算される（`root` 設定は無視）
> - デフォルトでは `**` は 1 つ以上のディレクトリにマッチ。ルートレベルも含めるには `glob_matcher: doublestar` を使用
> - `run` にファイルテンプレートなしで `glob` を指定すると、pre-commit では `{staged_files}`、pre-push では `{push_files}` を自動チェック

---

## files

Source: https://lefthook.dev/configuration/files

- **型:** String (シェルコマンド)

`{files}` テンプレートで参照されるファイルまたはディレクトリを返すカスタムコマンド。ジョブレベルの `files` はフックレベルの `files` を上書きする。出力が空の場合、ジョブの実行はスキップされる。

```yaml
# lefthook.yml

pre-push:
  commands:
    stylelint:
      tags:
        - frontend
        - style
      files: git diff --name-only master
      glob: "*.js"
      run: yarn stylelint {files}
```

```yaml
# lefthook.yml

pre-push:
  commands:
    rubocop:
      tags: backend
      glob: "**/*.rb"
      files: node ./lefthook-scripts/ls-files.js
      run: bundle exec rubocop --force-exclusion --parallel -- {files}
```

---

## file_types

Source: https://lefthook.dev/configuration/file_types

- **型:** String / Array of strings

`run` テンプレート内のファイルをファイルタイプでフィルタリングする。

### サポートされるファイルタイプ

| ファイルタイプ | 説明 |
|--------------|------|
| `text` | テキストを含むファイル（シンボリックリンクは非追跡） |
| `binary` | 非テキストバイトを含むファイル |
| `executable` | 実行ビットが設定されたファイル |
| `not executable` | 実行ビットなしのファイル |
| `symlink` | シンボリックリンク |
| `not symlink` | 非シンボリックリンクファイル |
| `text/html` | HTML ファイル |
| `text/xml` | XML ファイル |
| `text/javascript` | JavaScript ファイル |
| `text/x-php` | PHP ファイル |
| `text/x-lua` | Lua ファイル |
| `text/x-perl` | Perl ファイル |
| `text/x-python` | Python ファイル |
| `text/x-shellscript` | シェルスクリプト |
| `text/x-sh` | シェルスクリプト |
| `application/json` | JSON ファイル |

### ロジックルール

- **AND ロジック:** `text`, `binary`, `executable`, `not executable`, `symlink`, `not symlink`
- **OR ロジック:** MIME タイプ

```yaml
pre-commit:
  commands:
    lint-code:
      run: yarn lint {staged_files}
      file_types: text
    check-hex-codes:
      run: yarn check-hex {staged_files}
      file_types: binary
```

```yaml
pre-commit:
  jobs:
    - run: typos -w -- {staged_files}
      file_types:
        - text/x-perl
        - text/x-python
        - text/x-php
        - text/x-lua
        - text/x-sh
```

---

## env

Source: https://lefthook.dev/configuration/env

- **型:** Object (キーと値のペア)

コマンドまたはスクリプトの環境変数を指定する。

```yaml
# lefthook.yml

pre-commit:
  commands:
    test:
      env:
        RAILS_ENV: test
      run: bundle exec rspec
```

### PATH の拡張

GUI アプリケーション経由で lefthook を実行する場合、シェル設定の PATH 変更が利用できないことがある。

```yaml
# lefthook-local.yml

pre-commit:
  commands:
    test:
      env:
        PATH: $PATH:/home/me/path/to/yarn
```

---

## root

Source: https://lefthook.dev/configuration/root

- **型:** String (ディレクトリパス)

コマンド実行の現在の作業ディレクトリ（CWD）を変更する。`npm` や `yarn` など、設定ファイルがリポジトリルートと異なるディレクトリにある場合に有用。

`pre-push`、`pre-commit` フック、カスタム `files` コマンドでは、`root` オプションはファイルパスをフィルタリングする。

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      root: "client/"
      glob: "*.{js,ts}"
      run: yarn eslint --fix {staged_files} && git add {staged_files}
```

> **重要:** glob はリポジトリのルートから計算される。`root` ディレクトリからではない。

---

## fail_text

Source: https://lefthook.dev/configuration/fail_text

- **型:** String

コマンドまたはスクリプトが失敗した際に表示するカスタムエラーメッセージ。

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      run: yarn lint
      fail_text: Add node executable to $PATH
```

出力例:

```
$ git commit -m 'fix: Some bug'

Lefthook v1.1.3
RUNNING HOOK: pre-commit

  EXECUTE > lint

SUMMARY: (done in 0.01 seconds)
  lint: Add node executable to $PATH env
```

---

## stage_fixed

Source: https://lefthook.dev/configuration/stage_fixed

- **型:** Boolean
- **デフォルト:** `false`
- **スコープ:** `pre-commit` フック専用

コマンドまたはスクリプトの実行後にファイルを自動的に `git add` でステージする。

- `files` オプションが指定されたコマンドの場合、そのコマンドがステージング対象ファイルを取得
- `files` オプションなしのスクリプトとコマンドでは、`{staged_files}` テンプレートが対象ファイルを決定
- `glob` と `exclude` のフィルタが適用される

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      run: npm run lint --fix {staged_files}
      stage_fixed: true
```

---

## interactive

Source: https://lefthook.dev/configuration/interactive

- **型:** Boolean
- **デフォルト:** `false`

コマンドまたはスクリプトを対話モードで実行し、CLI からの入力を受け付ける。

- すべての `interactive` コマンド/スクリプトは非対話のものの後に実行される（`piped` 有効時を除く）
- Lefthook は `/dev/tty` を開いて stdin として使用する
- `no_tty` オプションが設定されている場合、`interactive` は無視される

> CLI からの入力なしで stdin をコマンドに渡す必要がある場合は `use_stdin` を使用すること。

```yaml
# lefthook.yml

pre-commit:
  commands:
    format:
      interactive: true
      run: yarn format --interactive
```

---

## use_stdin

Source: https://lefthook.dev/configuration/use_stdin

- **型:** Boolean
- **デフォルト:** `false`

OS からの stdin をコマンド/スクリプトに渡す。`pre-push` フックなど、stdin からデータを行ごとに読み取るフックに有用。

> 複数のコマンド/スクリプトで `use_stdin: true` を設定した場合、入力データを受け取るのは 1 つだけで、他は何も受け取らない。

```yaml
pre-push:
  scripts:
    "do-the-magic.sh":
      runner: bash
      use_stdin: true
```

```bash
# .lefthook/pre-push/do-the-magic.sh

remote="$1"
url="$2"

while read local_ref local_oid remote_ref remote_oid; do
  # ...
done
```

---

## priority

Source: https://lefthook.dev/configuration/priority

- **型:** Number
- **デフォルト:** `0`

順次ステップの実行順序を制御する。`parallel: false` または `piped: true` が設定されている場合にのみ有効。

値 `0` は `+Infinity` として扱われ、`priority: 0` またはこの設定なしのコマンド/スクリプトは最後に実行される。

```yaml
# lefthook.yml

post-checkout:
  piped: true
  commands:
    db-create:
      priority: 1
      run: rails db:create
    db-migrate:
      priority: 2
      run: rails db:migrate
    db-seed:
      priority: 3
      run: rails db:seed

  scripts:
    "check-spelling.sh":
      runner: bash
      priority: 1
    "check-grammar.rb":
      runner: ruby
      priority: 2
```
