# 環境変数

Source: https://lefthook.dev/usage/envs/

Lefthook の動作を制御する環境変数。

## LEFTHOOK

Source: https://lefthook.dev/usage/envs/LEFTHOOK

`LEFTHOOK` 環境変数は、git コマンド実行時に lefthook を実行するかどうかを制御する。

### 値

- `0` または `false` -- lefthook の実行を無効化
- `1` または `true` -- lefthook の実行を有効化（CI 環境で有用）

### 使用例

単一のコマンドでフック実行をスキップ:

```bash
LEFTHOOK=0 git commit -am "Lefthook skipped"
```

CI 環境で lefthook を有効化:

```bash
LEFTHOOK=1 npm install
LEFTHOOK=1 yarn install
LEFTHOOK=1 pnpm install
```

### 注意事項

一時的にフックのバリデーションをバイパスする場合や、自動的な CI 検出により無効化される可能性がある CI パイプラインでフックの実行を保証する場合に有用。

## LEFTHOOK_VERBOSE

Source: https://lefthook.dev/usage/envs/LEFTHOOK_VERBOSE

`LEFTHOOK_VERBOSE` 環境変数は Lefthook 実行時の詳細出力を有効にする。

### 値

- `1` -- verbose モードを有効化
- `true` -- verbose モードを有効化

### 使用例

```bash
LEFTHOOK_VERBOSE=1 lefthook run pre-commit
```

### 注意事項

フックの設定のデバッグやフック実行フローの理解に有用。Lefthook がフック実行時に何を行っているかの詳細情報を確認できる。

## LEFTHOOK_OUTPUT

Source: https://lefthook.dev/usage/envs/LEFTHOOK_OUTPUT

`LEFTHOOK_OUTPUT` 環境変数は、フック実行時に出力される情報を制御する。出力の詳細度をカスタマイズしたり、エラー以外のメッセージを無効にしたりできる。

### 使い方

出力値のリストを設定:

```bash
LEFTHOOK_OUTPUT={list of output values}
```

エラー以外のすべての出力を無効化:

```bash
LEFTHOOK_OUTPUT=false
```

### 使用例

```bash
$ LEFTHOOK_OUTPUT=summary lefthook run pre-commit
summary: (done in 0.52 seconds)
✔️  lint
```

### 関連設定

利用可能な出力値と設定オプションの詳細については、[`output`](../../../configuration/output) 設定ドキュメントを参照。

## LEFTHOOK_CONFIG

Source: https://lefthook.dev/usage/envs/LEFTHOOK_CONFIG

`LEFTHOOK_CONFIG` 環境変数はメインの lefthook 設定ファイルの場所をオーバーライドする。

### 使い方

```bash
LEFTHOOK_CONFIG=~/global_lefthook.yml
```

### 注意事項

- この変数でメイン設定をオーバーライドしても、他の設定ソースの読み込みは妨げられない
- ローカル設定、extends で指定された設定、リモート設定は引き続き処理される
- ホームディレクトリパス（`~`）の使用例が示されているが、任意の有効なファイルパスが使用可能

### ユースケース

複数のプロジェクトにわたってグローバルな lefthook 設定を維持しつつ、ローカル設定や extends によるプロジェクト固有のオーバーライドを許可する場合に有用。

## LEFTHOOK_EXCLUDE

Source: https://lefthook.dev/usage/envs/LEFTHOOK_EXCLUDE

`LEFTHOOK_EXCLUDE` 環境変数は、タグまたはコマンド名に基づいて特定のコマンドやスクリプトを git hook 実行時にスキップする。

### 構文

```bash
LEFTHOOK_EXCLUDE={list of tags or command names to be excluded}
```

### 使用例

```bash
LEFTHOOK_EXCLUDE=ruby,security,lint git commit -am "Skip some tag checks"
```

この例では、`ruby`、`security`、`lint` のタグが付いたフック（またはそれらの名前を持つコマンド）がコミット操作時の実行から除外される。

### 注意事項

- 設定ファイルを変更せずに一時的に特定のチェックをバイパスする場合に有用
- 除外は変数が設定された単一のコマンド呼び出しにのみ適用される
- タグベースとコマンド名ベースの両方の除外がサポートされている

### 関連設定

静的な設定ファイルによる同様の機能については、[`exclude_tags`](../../../configuration/exclude_tags) 設定オプションを参照。

## CLICOLOR_FORCE

Source: https://lefthook.dev/usage/envs/CLICOLOR_FORCE

`CLICOLOR_FORCE` 環境変数は lefthook とそのすべてのサブコマンドでカラー出力を有効にする。

### 値

- `true` -- カラー出力を有効化

### 使用例

```bash
CLICOLOR_FORCE=true
```

### 注意事項

ターミナル環境が通常カラーをサポートしないかどうかに関係なく、lefthook がカラー出力を表示するよう強制する。CI/CD パイプラインやカラーサポートが自動検出されない可能性のある自動化環境で有用。

## NO_COLOR

Source: https://lefthook.dev/usage/envs/NO_COLOR

`NO_COLOR` 環境変数は lefthook とそのすべてのサブコマンドでカラー出力を無効にする。

### 値

- `true` -- カラー出力を無効化

### 使用例

```bash
NO_COLOR=true
```

### 注意事項

`NO_COLOR=true` が設定されると、lefthook は自身の操作およびフック実行時に呼び出すすべてのサブコマンドでカラー出力を抑制する。

## CI

Source: https://lefthook.dev/usage/envs/CI

`CI` 環境変数は Lefthook の NPM パッケージにおける CI 環境でのフックインストール動作を制御する。

### 説明

`CI=true` が設定されている場合、Lefthook は NPM の postinstall スクリプト実行時に Git hooks の自動インストールを抑制する。CI/CD パイプラインでは通常フックのインストールが不要なため、これが有用。

### デフォルトの動作

ほとんどの CI システムは自動的に `CI=true` を設定する。CI プラットフォームが設定しない場合は、不要なフックインストールを防ぐために手動で設定する必要がある。

### 使用例

```bash
CI=true npm install
CI=true yarn install
CI=true pnpm install
```

### オーバーライド

`CI=true` が設定されている場合でもフックをインストールする必要がある場合は、以下で動作をオーバーライドできる:

```bash
LEFTHOOK=1
```

または

```bash
LEFTHOOK=true
```

これにより、CI 環境がアクティブであっても postinstall スクリプト中のフックインストールが実行される。
