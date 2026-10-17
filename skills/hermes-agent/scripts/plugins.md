# Plugins

プラグインのインストール・管理・有効化・無効化。

## 対話式プラグイン切り替えUI

```bash
hermes plugins
```

一般プラグインの有効化・無効化と、Memory Provider / Context Engine の選択を 1 画面で行う。

## Plugin Catalog の検索

```bash
hermes plugins search [term]
hermes plugins search [term] --json
```

catalog は人手レビュー済みのプラグイン一覧。`term` を省略すると全件を表示する。6 時間キャッシュされ、オフライン時は同梱コピーを使う。catalog 掲載は審査済みを意味するが、コード監査済みではない。

## Plugin Catalog からのインストール

```bash
hermes plugins install <name>
```

catalog 名はレビュー済みの 40 桁 commit SHA に解決され、宣言された capability が表示される。例: Honcho は catalog 経由で `hermes plugins install honcho`。

## プラグインのインストール（Git URL または owner/repo）

```bash
hermes plugins install <git-url>
hermes plugins install <owner/repo>
hermes plugins install <identifier> --force
hermes plugins install <identifier> --ref <commit-sha>
```

生 URL は未レビューのカスタムソースとして扱われる。`--ref` は完全な SHA を pin する。

> **警告**: `--allow-removed` は catalog の削除済みリスト（ブロックリスト）を回避する危険なオプション。使用しない。

## インストール済みプラグインの更新

```bash
hermes plugins update <name>
```

## プラグインの削除

```bash
hermes plugins remove <name>
hermes plugins rm <name>
hermes plugins uninstall <name>
```

> **警告**: 削除したプラグインのデータは復元できない。

## プラグインの有効化・無効化

```bash
hermes plugins enable <name>
hermes plugins disable <name>
```

インストールと有効化は別操作。

## インストール済みプラグインの一覧

```bash
hermes plugins list
hermes plugins ls
```

## プラグインの検証

```bash
hermes plugins doctor [path-or-id]
hermes plugins doctor [path-or-id] --ci
```

`--ci` はエラー時に終了コード 1 を返す。

## ツール設定の表示・対話式設定

```bash
hermes tools
hermes tools --summary
```

## メモリプロバイダーの設定

```bash
hermes memory setup
hermes memory status
hermes memory off
```

## Honcho メモリ統合の管理

```bash
hermes plugins install honcho
hermes memory setup
hermes honcho status
hermes honcho enable
hermes honcho disable
hermes honcho mode hybrid
```

Honcho は catalog plugin 化されており（v0.22.0〜）、`hermes plugins install honcho` 後、かつ `memory.provider` が honcho でアクティブな場合のみ `hermes honcho ...` が登録される。非アクティブなプロバイダーのサブコマンドは公開されない。従来の `hermes honcho setup` は `hermes memory setup` へリダイレクトされる。
