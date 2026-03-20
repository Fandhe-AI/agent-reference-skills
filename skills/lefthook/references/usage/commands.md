# CLI コマンド

Source: https://lefthook.dev/usage/commands/

Lefthook の CLI コマンド一覧。

## lefthook install

Source: https://lefthook.dev/usage/commands/install

`lefthook install` コマンドは Git hooks の設定システムを初期化する。`lefthook.yml` 設定ファイルがまだ存在しない場合は空のファイルを作成し、設定されたフックを Git hooks ディレクトリにインストールする。

### 使い方

```
lefthook install [<hook-1> <hook-2> ...]
```

### 特定のフックのインストール

フック名を引数として指定することで、特定のフックのみをインストールできる:

```
lefthook install <hook-1> <hook-2> ...
```

### 注意事項

- **設定の永続性**: `lefthook.yml` を変更した後にフックを再インストールする必要はない。設定ファイルは Git hook が実行されるたびに自動的に読み込まれる。
- **自動インストール**: NPM パッケージ `lefthook` を使用するプロジェクトでは、postinstall スクリプトによりフックが自動的にインストールされる。その他のプロジェクトでは、リポジトリをクローンした後にこのコマンドを実行する。

## lefthook uninstall

Source: https://lefthook.dev/usage/commands/uninstall

`lefthook uninstall` コマンドは lefthook によってインストールされた Git hooks をすべて削除する。

### 使い方

```
lefthook uninstall
```

### 説明

リポジトリ内で lefthook が `.git/hooks` ディレクトリに設定したフック構成をクリーンアップする。

### 注意事項

- lefthook を通じてインストールされたフックのみを対象とする
- このコマンド実行後、lefthook が管理する Git hooks は実行されなくなる
- lefthook の設定ファイルには影響しない。Git リポジトリからインストール済みフックのみを削除する

## lefthook run

Source: https://lefthook.dev/usage/commands/run

指定されたフックに設定されたコマンドとスクリプトを実行する。インストール済みの Git hooks は暗黙的に `lefthook run` を呼び出す。

### 使い方

```
lefthook run <hook_name> [options]
```

### 設定例

```yaml
# lefthook.yml

pre-commit:
  jobs:
    - name: lint
      run: yarn lint --fix {staged_files}

test:
  jobs:
    - name: test
      run: yarn test
```

### 実行例

```bash
# まずフックをインストール
$ lefthook install

# 特定のフックを実行
$ lefthook run test                    # 'yarn test' を実行
$ lefthook run pre-commit              # 設定された pre-commit フックを実行

# 自動実行
$ git commit                           # pre-commit フックが自動的に実行される
```

### オプション

#### ジョブ選択

`--job` フラグで実行するジョブを指定する（複数指定可）:

```bash
$ lefthook run pre-commit --job lints --job pretty --tag checks
```

#### ファイル指定

`{staged_files}` のようなファイルテンプレートをカスタムファイルリストで上書きする:

```bash
# すべてのファイルを使用
$ lefthook run pre-commit --all-files

# 個別のファイルを指定
$ lefthook run pre-commit --file file1.js --file file2.js
```

**注意:** 両方のオプションが指定された場合、`--all-files` は無視され、明示的に指定されたファイルが優先される。

## lefthook add

Source: https://lefthook.dev/usage/commands/add

`lefthook add` コマンドは指定された Git hook をインストールする。`--dirs` フラグを使用すると、必要なディレクトリ構造（`.git/hooks/<hook name>/`）が存在しない場合に作成する。

### 使い方

```
lefthook add <hook-name> [OPTIONS]
```

### オプション

- `--dirs` -- ディレクトリ `.git/hooks/<hook name>/` が存在しない場合に作成する。スクリプトを設定に追加する前に使用することを推奨。

### 例

フックをディレクトリ作成付きでインストール:

```bash
$ lefthook add pre-push --dirs
```

`lefthook.yml` でフックを設定:

```yaml
pre-push:
  jobs:
    - script: "audit.sh"
      runner: bash
```

スクリプトファイルを編集:

```bash
$ vim .lefthook/pre-push/audit.sh
```

設定後、`git push` を実行すると pre-push フックが実行され、指定された bash スクリプトが実行される。

### 注意事項

フックのインストールは Git リポジトリのフックシステムと統合される。フックの動作とコマンドの設定は `lefthook.yml` ファイルで行い、スクリプトは通常 `.lefthook/` ディレクトリ構造に保存する。

## lefthook validate

Source: https://lefthook.dev/usage/commands/validate

`lefthook validate` コマンドは lefthook の設定の正当性をチェックする。

### 使い方

```
lefthook validate
```

### 説明

lefthook の GitHub リポジトリから取得した JSON スキーマを使用して、設定ファイルに対してバリデーションチェックを実行する。

### 関連コマンド

- **`lefthook dump`**: 完全なバリデーション済み設定を表示する
- **`lefthook install`**: 設定のバリデーション後に Git hooks をインストールする
- **`lefthook check-install`**: フックのインストール状態を確認する

## lefthook dump

Source: https://lefthook.dev/usage/commands/dump

`lefthook dump` コマンドは、すべてのセカンダリ設定をマージした後の完全な設定を表示する。

### 使い方

```
lefthook dump
```

### 説明

lefthook が実際に使用する設定を表示する。設定は以下の複数のソースから構成される場合がある:

- プライマリ設定ファイル（`lefthook.yml`）
- リモート設定
- 拡張設定
- ローカルオーバーライド（`lefthook-local.yml`）

### 注意事項

このコマンドはデバッグや検証に有用で、すべての設定ソースが結合・処理された後の最終的なマージ済み設定を確認できる。

## lefthook check-install

Source: https://lefthook.dev/usage/commands/check-install

`lefthook check-install` コマンドは Git hooks がインストールされ、同期されているかどうかを確認する。

### 使い方

```
lefthook check-install
```

### 戻り値

- `0` -- フックがインストールされ、同期されている
- `1` -- フックがインストールされていないか、同期が必要

### 注意事項

CI/CD パイプラインや自動化スクリプトで、フックのセットアップがプロジェクトの設定と一致していることを確認するのに有用。

## lefthook self-update

Source: https://lefthook.dev/usage/commands/self-update

`lefthook self-update` コマンドはバイナリを GitHub 上の最新リリースに更新する。

### 使い方

```
lefthook self-update
```

### 利用条件

このコマンドは以下の方法で lefthook をインストールした場合にのみ使用可能:

- ソースコードからインストール
- GitHub Releases からバイナリを直接ダウンロード

パッケージマネージャー（npm, Ruby gem, Homebrew など）でインストールした場合は、そのパッケージマネージャーの更新メカニズムを使用すること。
