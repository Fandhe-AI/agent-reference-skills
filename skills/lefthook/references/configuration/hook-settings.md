# Hook Settings

Source: https://lefthook.dev/configuration

Git フック（commands、scripts、skip ルールなど）の設定を含む。任意の Git フックまたはカスタムフック（例: `test`）を指定できる。

## Hook

Source: https://lefthook.dev/configuration/Hook

### 基本例

```yaml
# lefthook.yml

# Git フック
pre-commit:
  jobs:
    - run: yarn lint {staged_files} --fix
      stage_fixed: true

# カスタムフック
check-docs:
  jobs:
    - run: yarn check-docs
    - run: typos
```

### 主要プロパティ

| プロパティ | 型 | 説明 |
|-----------|------|------|
| `parallel` | boolean | タスクの並列実行を有効化 |
| `piped` | boolean | タスクを順次実行（失敗時停止） |
| `follow` | boolean | 実行中のコマンドの STDOUT を追跡 |
| `files` | string | グローバルファイルフィルタリング |
| `fail_on_changes` | string | 変更検出時の失敗制御 |
| `fail_on_changes_diff` | boolean | diff 出力の制御 |
| `exclude_tags` | array | タグによるジョブ除外 |
| `exclude` | array | glob パターンによるファイル除外 |
| `only` | array | 特定条件でのみ実行 |
| `skip` | array | 特定条件でスキップ |
| `setup` | array | ジョブ実行前のセットアップ |
| `jobs` | array | ジョブ定義 |
| `commands` | object | コマンド設定 |
| `scripts` | object | スクリプト設定 |

---

## parallel

Source: https://lefthook.dev/configuration/parallel

- **型:** Boolean
- **デフォルト:** `false`

デフォルトでは lefthook はコマンドとスクリプトを順次実行する。`true` に設定すると並列実行が有効になる。

```yaml
# lefthook.yml

pre-commit:
  parallel: true
  commands:
    lint:
      run: yarn lint
    test:
      run: yarn test
```

---

## piped

Source: https://lefthook.dev/configuration/piped

- **型:** Boolean
- **デフォルト:** `false`

コマンドやスクリプトのいずれかが失敗した場合に実行を停止する。後続のステップが前のステップの成功に依存する順次操作に有用。

> **注意:** `piped: true` と `parallel: true` の両方を設定するとエラーになる。これらは相互排他的。

```yaml
# lefthook.yml

database:
  piped: true
  commands:
    1_create:
      run: rake db:create
    2_migrate:
      run: rake db:migrate
    3_seed:
      run: rake db:seed
```

---

## follow

Source: https://lefthook.dev/configuration/follow

- **型:** Boolean
- **デフォルト:** `false`

実行中のコマンドとスクリプトの STDOUT を追跡する。

```yaml
# lefthook.yml

pre-push:
  follow: true
  commands:
    backend-tests:
      run: bundle exec rspec
    frontend-tests:
      run: yarn test
```

> `parallel` オプションと併用すると出力フォーマットが不明確になる可能性があるため、両方の同時有効化は避けること。

---

## files (Hook-Level)

Source: https://lefthook.dev/configuration/files-global

- **型:** String (シェルコマンド)

`{files}` テンプレートで参照されるファイルまたはディレクトリのリストを返すカスタムシェルコマンドを定義する。`sh` シェルで実行される。コマンドが空の結果を返すと、関連コマンドの実行はスキップされる。

```yaml
pre-commit:
  files: git diff --name-only master
  commands:
    lint:
      run: yarn lint {files}
```

---

## fail_on_changes

Source: https://lefthook.dev/configuration/fail_on_changes

- **型:** String
- **デフォルト:** `never`

フック実行中に git 追跡ファイルが変更された場合の lefthook の終了方法を制御する。

### 指定可能な値

- `never`: ファイルが変更されても非ゼロステータスで終了しない（デフォルト）
- `always`: ファイルが変更された場合に常に非ゼロステータスで終了
- `ci`: `CI` 環境変数が設定されている場合のみ失敗で終了。`stage_fixed` と併用してローカル開発をスムーズに、CI を厳格に
- `non-ci`: `CI` 環境変数がない場合のみ失敗で終了

```yaml
# lefthook.yml

pre-commit:
  parallel: true
  fail_on_changes: "always"
  commands:
    lint:
      run: yarn lint
    test:
      run: yarn test
```

---

## fail_on_changes_diff

Source: https://lefthook.dev/configuration/fail_on_changes_diff

- **型:** Boolean
- **デフォルト:** CI 環境では自動的に diff を出力、それ以外では非表示

`fail_on_changes` オプションが発動した際に検出された変更の diff を出力するかどうかを制御する。

```yaml
# lefthook.yml

pre-commit:
  parallel: true
  fail_on_changes: "always"
  fail_on_changes_diff: true
  commands:
    lint:
      run: yarn lint
    test:
      run: yarn test
```

- `true`: すべての環境で diff 出力を有効化
- `false`: CI パイプラインでも diff 出力を抑制

---

## exclude_tags

Source: https://lefthook.dev/configuration/exclude_tags

- **型:** Array of strings / String

除外したいタグまたはコマンド名。`LEFTHOOK_EXCLUDE` 環境変数で上書き可能。

```yaml
# lefthook.yml

pre-commit:
  exclude_tags: frontend
  commands:
    lint:
      tags: frontend
      run: yarn lint
    test:
      tags: frontend
      run: yarn test
    check-syntax:
      tags: documentation
      run: yarn check-syntax
```

### 複数タグの例

```yaml
# lefthook.yml

pre-push:
  commands:
    packages-audit:
      tags:
        - frontend
        - security
      run: yarn audit
    gems-audit:
      tags:
        - backend
        - security
      run: bundle audit
```

```yaml
# lefthook-local.yml

pre-push:
  exclude_tags:
    - frontend
```

> ローカル限定の除外は `lefthook-local.yml` で指定することを推奨。

---

## exclude

Source: https://lefthook.dev/configuration/exclude

- **型:** Array of strings (glob パターン)

ファイルテンプレートで除外するファイルの glob パターンリストを設定する。`glob_matcher` 設定の影響を受ける。

`run` オプションにファイルテンプレートなしで `exclude` を指定した場合、lefthook は pre-commit フックでは `{staged_files}`、pre-push フックでは `{push_files}` を自動チェックし、フィルタ後にファイルが残らなければコマンドをスキップする。

### Job レベルの除外

```yaml
pre-commit:
  jobs:
    - name: lint
      glob: "*.rb"
      exclude:
        - config/routes.rb
        - config/application.rb
        - config/initializers/*.rb
        - spec/rails_helper.rb
      run: bundle exec rubocop --force-exclusion -- {staged_files}
```

### Hook レベルの除外

```yaml
pre-commit:
  exclude:
    - "*/application.rb"
  jobs:
    - name: lint
      run: bundle exec rubocop
```

---

## only

Source: https://lefthook.dev/configuration/only

- **型:** Array / String

特定条件下でのみコマンド、スクリプト、またはフック全体の実行を強制する。`skip` の逆で、同じ条件値を受け入れる。

> **注意:** `skip` と `only` の両方の条件が存在する場合、`skip` が優先される。

### ブランチ指定実行

```yaml
pre-commit:
  only:
    - ref: dev/*
  commands:
    lint:
      run: yarn lint
    test:
      run: yarn test
```

### rebase 時の条件付きコマンド選択

```yaml
pre-commit:
  commands:
    lint:
      skip: rebase
      run: yarn lint
    test:
      skip: rebase
      run: yarn test
    lint-on-rebase:
      only: rebase
      run: yarn lint-quickly
```

---

## skip

Source: https://lefthook.dev/configuration/skip

- **型:** Boolean / Array / String

さまざまな git 状態、ブランチ名、またはカスタムコマンド評価に基づいて条件付きでコマンドやスクリプトの実行を防止する。

### 指定可能な値

- `rebase` - rebase 中にスキップ
- `merge` - merge 中にスキップ
- `merge-commit` - 現在の HEAD コミットがマージコミットの場合にスキップ
- `ref: <branch>` - 指定ブランチでスキップ（glob パターンサポート）
- `run: <command>` - コマンドが正常終了（リターンコード 0）した場合にスキップ

### 無条件スキップ

```yaml
pre-commit:
  commands:
    lint:
      skip: true
      run: yarn lint
```

### merge または rebase 中のスキップ

```yaml
pre-commit:
  commands:
    lint:
      skip:
        - merge
        - rebase
      run: yarn lint
```

### マージコミットでのスキップ

```yaml
pre-push:
  commands:
    lint:
      skip: merge-commit
      run: yarn lint
```

### ブランチパターンによるフック全体のスキップ

```yaml
pre-commit:
  skip:
    - ref: main
  commands:
    lint:
      run: yarn lint
    test:
      run: yarn test
```

### コマンド実行に基づくスキップ

```yaml
pre-commit:
  skip:
    - run: test "${NO_HOOK}" -eq 1
  commands:
    lint:
      run: yarn lint
```

### 条件付きスキップの複合例

```yaml
prepare-commit-msg:
  skip:
    - merge
    - rebase
  commands:
    aiautocommit:
      interactive: true
      run: aiautocommit commit --output-file "{1}"
      env:
        LOG_LEVEL: info
      skip:
        - run: "! which aiautocommit"
```

> フックレベルと個別コマンド/スクリプトレベルの両方で適用可能。

---

## setup

Source: https://lefthook.dev/configuration/setup

- **型:** Array
- **追加バージョン:** lefthook 2.1.2

ジョブの実行前に実行する命令のリスト。テンプレートと Git 引数をサポートする。

設定のマージ時（`lefthook-local.yml` や `extends`）、setup 命令はリストの先頭に追加される。

```yaml
# lefthook.yml

pre-commit:
  setup:
    - run: |
        if ! command -v golangci-lint >/dev/null 2>&1; then
          go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.10.1
        fi
  jobs:
    - run: golangci-lint -- {staged_files}
      glob: "*.go"
```

---

## jobs

Source: https://lefthook.dev/configuration/jobs

- **型:** Array
- **追加バージョン:** lefthook 1.10.0

タスクを定義する柔軟な方法。コマンドとスクリプトの両方をサポートし、グループ化による高度なフロー制御が可能。

### 基本使用法

```yaml
pre-commit:
  jobs:
    - run: yarn lint
    - run: yarn test
```

### 名前付き vs 名前なしジョブ

- 名前付きジョブは `extends` 設定やローカル設定間でマージされる
- 名前なしジョブは定義順に追加される

### グループ

- グループは他のジョブを含むことができる
- グループ内で parallel または piped 実行をサポート
- `glob`、`root`、`exclude` オプションはネストされたジョブを含むグループ内のすべてのジョブに適用される

### 高度な例

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: migrate
      root: backend/
      glob: "db/migrations/*"
      group:
        piped: true
        jobs:
          - run: bundle install
          - run: rails db:migrate
    - run: yarn lint --fix {staged_files}
      root: frontend/
      stage_fixed: true
    - run: bundle exec rubocop
      root: backend/
    - run: golangci-lint
      root: proxy/
    - script: verify.sh
      runner: bash
```
