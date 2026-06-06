# cli

Biome CLI のコアコマンド一覧。フォーマット・リント・チェックの実行に使用する。

## バージョン確認

```sh
biome --version
```

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
biome lint --suppress --reason "legacy code" .
```

## チェックの実行（フォーマット + リント + インポート整理）

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

## 特定ルール・ドメインのみ実行

```sh
biome check --only=lint/suspicious .
```

## 特定ルール・ドメインをスキップ

```sh
biome check --skip=lint/style .
```

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
biome check --changed --since=next
```

## Grit パターン検索（実験的機能）

```sh
biome search '<pattern>' .
```

## ログのクリーンアップ

```sh
biome clean
```

デーモンが出力したログを削除する。
