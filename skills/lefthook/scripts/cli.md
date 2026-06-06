# cli

Lefthook の CLI コマンド一覧。Git hooks の初期化・実行・管理・検証に使用する。

## Git hooks の初期化

```sh
lefthook install
```

`lefthook.yml` が存在しない場合は空のファイルを作成し、設定されたフックを `.git/hooks/` にインストールする。

## 特定フックのみインストール

```sh
lefthook install pre-commit pre-push
```

## Git hooks のアンインストール

```sh
lefthook uninstall
```

> **警告**: `.git/hooks/` ディレクトリ内の lefthook が管理するフックをすべて削除する。実行後、lefthook が管理する Git hooks は動作しなくなる。

## フックの手動実行

```sh
lefthook run <hook-name>
```

例:

```sh
lefthook run pre-commit
lefthook run pre-push
```

## 特定ジョブのみ実行

```sh
lefthook run pre-commit --job lint --job format
```

## タグを指定して実行

```sh
lefthook run pre-commit --tag checks
```

## ステージ済みファイルを全ファイルで上書きして実行

```sh
lefthook run pre-commit --all-files
```

## 特定ファイルを指定して実行

```sh
lefthook run pre-commit --file src/index.ts --file src/app.ts
```

## フックディレクトリの作成付きでフックを追加

```sh
lefthook add pre-push --dirs
```

`.git/hooks/pre-push/` ディレクトリを作成する。スクリプトを設定に追加する前に使用することを推奨。

## 設定のバリデーション

```sh
lefthook validate
```

JSON スキーマを使用して `lefthook.yml` の正当性をチェックする。

## マージ済み設定の表示

```sh
lefthook dump
```

`lefthook.yml`・リモート設定・`lefthook-local.yml` 等すべての設定をマージした最終設定を表示する。デバッグに有用。

## フックインストール状態の確認

```sh
lefthook check-install
```

フックがインストール済みかつ同期されている場合は終了コード `0`、そうでない場合は `1` を返す。

## バイナリの自動更新

```sh
lefthook self-update
```

GitHub の最新リリースに更新する。ソースビルドまたは GitHub Releases から直接インストールした場合のみ使用可能。パッケージマネージャー経由でインストールした場合は各パッケージマネージャーの更新コマンドを使用すること。
