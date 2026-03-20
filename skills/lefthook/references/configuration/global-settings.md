# Global Settings

Source: https://lefthook.dev/configuration

Lefthook のグローバル設定オプション。プロジェクト全体の動作を制御する設定項目をまとめている。

## Config File Names

Lefthook は複数の設定ファイル形式と命名規則をサポートする。

### YAML Format
- `lefthook.yml` / `lefthook.yaml`
- `.lefthook.yml` / `.lefthook.yaml`
- `.config/lefthook.yml` / `.config/lefthook.yaml`

### TOML Format
- `lefthook.toml` / `.lefthook.toml` / `.config/lefthook.toml`

### JSON / JSONC Format
- `lefthook.json` / `.lefthook.json` / `.config/lefthook.json`
- `lefthook.jsonc` / `.lefthook.jsonc` / `.config/lefthook.jsonc`

プロジェクト内に複数の設定ファイルがある場合、どれが使われるか不定となるため、1つのフォーマットのみ使用すること。

### Local Configuration

Lefthook は `lefthook-local`（任意のサポート形式）という追加設定ファイルを自動的にマージする。`-local` ファイルはメイン設定と同じ命名規則（ドット有無）に従う必要がある。`-local` ファイルは単独でも使用可能。

### Merge Order

設定の優先順位（低 → 高）:

1. `lefthook.yml` - メイン設定ファイル
2. `extends` - extends オプションの設定
3. `remotes` - remotes オプションの設定
4. `lefthook-local.yml` - ローカル設定ファイル

---

## assert_lefthook_installed

Source: https://lefthook.dev/configuration/assert_lefthook_installed

- **型:** Boolean
- **デフォルト:** `false`

`true` に設定すると、`lefthook` 実行ファイルが見つからない場合にステータスコード 1 で終了する。`$PATH`、`node_modules/`、Ruby gem インストールなど複数の場所を検索する。

```yaml
# lefthook.yml

assert_lefthook_installed: true
```

---

## colors

Source: https://lefthook.dev/configuration/colors

- **型:** Boolean / String (`auto`) / Object
- **デフォルト:** `auto`

Lefthook のカラー出力を有効/無効にする。`--colors` オプションで上書き可能。カスタムカラーコードも指定できる。

### 無効化

```yaml
# lefthook.yml

colors: false
```

### カスタムカラーコード

```yaml
# lefthook.yml

colors:
  cyan: 14
  gray: 244
  green: '#32CD32'
  red: '#FF1493'
  yellow: '#F0E68C'
```

### 環境変数

- `NO_COLOR=true` - Lefthook とすべてのサブコマンドでカラー出力を無効化
- `CLICOLOR_FORCE=true` - Lefthook とすべてのサブコマンドでカラー出力を強制

---

## extends

Source: https://lefthook.dev/configuration/extends

- **型:** Array of strings (ファイルパス)

追加の YAML ファイルから設定をマージして拡張する。`lefthook.yml`、`lefthook-local.yml`、リモート設定それぞれで個別に使用可能。アスタリスクによる glob パターンをサポートする。

```yaml
# lefthook.yml

extends:
  - /home/user/work/lefthook-extend.yml
  - /home/user/work/lefthook-extend-2.yml
  - lefthook-extends/file.yml
  - ../extend.yml
  - projects/*/specific-lefthook-config.yml
```

---

## min_version

Source: https://lefthook.dev/configuration/min_version

- **型:** String (セマンティックバージョニング)

lefthook バイナリの最小バージョン要件を指定する。設定で特定バージョン以降の機能を使用する場合に有用。

```yaml
# lefthook.yml

min_version: 1.1.3
```

---

## no_auto_install

Source: https://lefthook.dev/configuration/no_auto_install

- **型:** Boolean
- **デフォルト:** `false`

デフォルトでは lefthook は設定変更を検知すると `lefthook run` 実行時にフックを自動インストール・更新する。`true` に設定するとこの自動動作を無効化する。`--no-auto-install` フラグでも制御可能。

```yaml
# lefthook.yml

no_auto_install: true

pre-commit:
  commands:
    lint:
      run: npm run lint
```

---

## no_tty

Source: https://lefthook.dev/configuration/no_tty

- **型:** Boolean
- **デフォルト:** `false`

スピナーなどの対話的な視覚要素を非表示にする。CI/CD パイプラインなど非対話環境で有用。`--no-tty` フラグでも制御可能。

```yaml
# lefthook.yml

no_tty: true
```

---

## output

Source: https://lefthook.dev/configuration/output

- **型:** Array of strings / Boolean
- **デフォルト:** すべて有効

Lefthook のコンソール出力の詳細度を管理する。

### 指定可能な値

- `meta` - lefthook バージョンを表示
- `summary` - サマリーブロック（成功・失敗のステップ）を表示
- `empty_summary` - 実行ステップがない場合にサマリー見出しを表示
- `success` - 成功したステップを表示
- `failure` - 失敗したステップを表示
- `execution` - 実行ログを表示
- `execution_out` - 実行出力を表示
- `execution_info` - `EXECUTE > ...` ログを表示
- `skips` - 「skip」メッセージ（ファイル不一致など）を表示

```yaml
# lefthook.yml

output:
  - meta
  - summary
  - empty_summary
  - success
  - failure
  - execution
  - execution_out
  - execution_info
  - skips
```

### 環境変数による上書き

```bash
LEFTHOOK_OUTPUT="meta,success,summary" lefthook run pre-commit
```

エラー以外のすべての出力を無効にするには `output: false` を設定する。

---

## rc

Source: https://lefthook.dev/configuration/rc

- **型:** String (ファイルパス)

非シェルプログラムからアクセスできない環境変数を設定するシェルスクリプトファイルを指定する。GUI アプリケーション（VSCode など）から git フックを実行する場合や、rbenv/nvm 等でカスタマイズされた PATH に依存する場合に有用。

### 設定例

```yaml
rc: ~/.lefthookrc
```

```yaml
rc: '"${XDG_CONFIG_HOME:-$HOME/.config}/lefthookrc"'
```

### RC ファイルの内容例

```bash
# nvm を使用する場合
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

```bash
# fnm を使用する場合
export FNM_DIR="$HOME/.fnm"
[ -s "$FNM_DIR/fnm.sh" ] && \. "$FNM_DIR/fnm.sh"
```

```bash
# 直接 PATH を変更
PATH=$PATH:$HOME/.nvm/versions/node/v15.14.0/bin
```

> **注意:** `rc` オプション設定後は git フックの再インストールが必要: `lefthook install -f`

---

## skip_lfs

Source: https://lefthook.dev/configuration/skip_lfs

- **型:** Boolean
- **デフォルト:** `false`

システムに LFS が存在しても LFS フックの実行をスキップする。

```yaml
# lefthook.yml

skip_lfs: true

pre-push:
  commands:
    test:
      run: yarn test
```

---

## glob_matcher

Source: https://lefthook.dev/configuration/glob_matcher

- **型:** String (enum)
- **デフォルト:** `gobwas`
- **許可値:** `gobwas`, `doublestar`

lefthook がファイルフィルタリングに使用する glob パターンマッチングエンジンを選択する。

### 動作の違い

**gobwas（デフォルト）:**
- `**/*.js` は `folder/file.js`、`a/b/c/file.js` にマッチ
- `**/*.js` はルートレベルの `file.js` にマッチ**しない**

**doublestar:**
- `**/*.js` は `file.js`、`folder/file.js`、`a/b/c/file.js` にマッチ
- 標準的な glob 実装と一致

```yaml
# lefthook.yml

glob_matcher: doublestar

pre-commit:
  jobs:
    - name: lint
      run: yarn eslint {staged_files}
      glob: "**/*.{js,ts}"
```

> この設定はグローバルで、すべての `glob` と `exclude` パターンに適用される。

---

## templates

Source: https://lefthook.dev/configuration/templates

- **型:** Object (キーと値のペア)
- **追加バージョン:** lefthook 1.10.8

`run` 値のテンプレートに対するカスタム置換を提供する。コマンドのラッパー（Docker、依存関係マネージャーなど）で冗長性を削減するのに有用。

```yaml
# lefthook.yml
templates:
  dip:

pre-commit:
  jobs:
    - run: {dip} bundle exec rubocop -- {staged_files}
```

```yaml
# lefthook-local.yml
templates:
  dip: dip
```

### 冗長性の削減

```yaml
templates:
  wrapper: docker-compose run --rm -v $(pwd):/app service

pre-commit:
  jobs:
    - run: {wrapper} yarn format
    - run: {wrapper} yarn lint
    - run: {wrapper} yarn test
```

> `lefthook.yml` で定義したテンプレートは `lefthook-local.yml` で上書き可能。

---

## install_non_git_hooks

Source: https://lefthook.dev/configuration/install_non_git_hooks

- **型:** Boolean
- **追加バージョン:** lefthook 2.0.17

非 Git フックを `.git/hooks` にインストールする。git-flow などのツールとの統合に有用。

```yaml
# lefthook.yml

install_non_git_hooks: true
```
