# cli

Biome CLI のコアコマンド一覧。フォーマット・リント・チェックの実行に使用する。

## バージョン確認

```sh
biome --version
```

## バージョンとデーモン情報の表示

```sh
biome version
```

CLI のバージョンと、接続中のデーモンサーバーの情報を表示して終了する。

## Biome 自体のアップグレード（スタンドアロンバイナリ）

```sh
biome upgrade
```

インストール方法に応じて最新の stable へ更新する（スタンドアロンはその場で更新、Homebrew は `brew upgrade biome` を実行）。npm 経由でインストールした Biome は更新できないため、パッケージマネージャーで `@biomejs/biome` を更新する。

## フォーマットの実行（ドライラン）

```sh
biome format .
```

変更はファイルに書き込まれない。

## フォーマットの実行（書き込み）

```sh
biome format --write .
```

> **警告**: ファイルを上書きする。VCS（git 等）で管理されていない変更は復元できない。

## フォーマットの実行（特定ファイル）

```sh
biome format --write src/index.ts src/app.ts
```

## リントの実行

```sh
biome lint .
```

## リントの実行（安全な自動修正）

```sh
biome lint --write .
```

## リントの実行（unsafe 修正を含む）

```sh
biome lint --write --unsafe .
```

> **警告**: unsafe 修正はコードの挙動を変える可能性がある。

## リント違反をコメントで抑制

```sh
biome lint --suppress .
```

違反箇所に抑制コメントを挿入する。

## リント違反の抑制（理由付き）

```sh
biome lint --suppress --reason="legacy code" .
```

`--reason` は `--suppress` が必須。

## チェックの実行（フォーマット + リント + アシスト）

```sh
biome check .
```

## チェックの実行（安全な自動修正）

```sh
biome check --write .
```

## チェックの実行（unsafe 修正を含む）

```sh
biome check --write --unsafe .
```

> **警告**: unsafe 修正はコードの挙動を変える可能性がある。

## 特定のグループ・ルール・ドメイン・アクション・プラグインのみ実行

```sh
biome check --only=suspicious .
biome check --only=correctness/noUnusedVariables .
biome check --only=plugin .
```

書式は `--only=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>`。複数指定可。`plugin` はアナライザープラグインのみを実行する。`biome lint` では ACTION を除いた `--only=<GROUP|RULE|DOMAIN|PLUGIN>`。

## 特定のグループ・ルール・ドメイン・アクション・プラグインをスキップ

```sh
biome check --skip=suspicious .
biome check --skip=correctness/noUnusedVariables --skip=plugin .
```

書式は `--skip=<GROUP|RULE|DOMAIN|ACTION|PLUGIN>`。`--only` より優先される。

## ファイル変更の監視

```sh
biome check --watch
```

初回実行後、対象パスを監視し、以降に変更されたファイルを再処理する。`lint` / `format` でも使用可。

## 簡潔なレポーター出力

```sh
biome check --reporter=concise
```

診断を 1 行 1 件で表示する（フォーマッター診断はまとめて表示）。

## ルールごとの実行時間の計測

```sh
biome check --profile-rules
```

各ルールの実行時間を報告する（意味モデル構築等の準備時間は除く）。`lint` でも使用可。

## ステージング済みファイルのみチェック

```sh
biome check --staged
```

## 変更ファイルのみチェック

```sh
biome check --changed
```

デフォルトブランチ比較で変更されたファイルのみを対象とする。VCS 統合が有効である必要がある。

## 特定ブランチとの差分でチェック

```sh
biome check --changed --since=main
```

`--since=REF` は `--changed` の比較基準を `vcs.defaultBranch` から上書きする（`--changed` が必須）。`lint` / `format` / `ci` でも使用可。

## Grit パターン検索（実験的機能）

```sh
biome search '<pattern>' .
```

## ログのクリーンアップ

```sh
biome clean
```

デーモンが出力したログを削除する。
