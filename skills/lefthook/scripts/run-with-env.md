# run-with-env

環境変数を使った Lefthook の動作制御コマンド。

## フック実行をスキップして git commit

```sh
LEFTHOOK=0 git commit -am "skip hooks"
```

## CI 環境でフックを有効化してインストール

```sh
LEFTHOOK=1 npm install
LEFTHOOK=1 yarn install
LEFTHOOK=1 pnpm install
```

多くの CI システムは `CI=true` を自動設定し postinstall によるフックインストールを抑制する。`LEFTHOOK=1` で強制的にインストールできる。

## CI 環境でフックインストールを明示的に抑制

```sh
CI=true npm install
CI=true yarn install
CI=true pnpm install
```

## verbose モードで実行

```sh
LEFTHOOK_VERBOSE=1 lefthook run pre-commit
```

フック実行フローの詳細ログを出力する。デバッグに有用。

## サマリーのみ出力して実行

```sh
LEFTHOOK_OUTPUT=summary lefthook run pre-commit
```

## 出力を完全に抑制して実行

```sh
LEFTHOOK_OUTPUT=false lefthook run pre-commit
```

## タグ・コマンド名を指定してスキップ

```sh
LEFTHOOK_EXCLUDE=ruby,security,lint git commit -am "skip specific checks"
```

指定したタグまたはコマンド名のフックを一時的にスキップする。

## カスタム設定ファイルを指定して実行

```sh
LEFTHOOK_CONFIG=~/global_lefthook.yml lefthook run pre-commit
```

## カラー出力を強制有効化

```sh
CLICOLOR_FORCE=true lefthook run pre-commit
```

## カラー出力を無効化

```sh
NO_COLOR=true lefthook run pre-commit
```
