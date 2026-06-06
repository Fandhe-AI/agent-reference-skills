# CLI

ergogen CLI の実行コマンド集。

## 設定ファイルの処理（グローバルインストール版）

```sh
ergogen <config_file> -o output_folder
```

`<config_file>` には YAML・JSON・JS・ZIP・EKB ファイルまたはディレクトリを指定する。
`-o` を省略すると、カレントディレクトリ内の `output/` に出力される。

## 設定ファイルの処理（開発ビルド版）

```sh
node src/cli.js <config_file> -o output_folder
```

`git clone` でセットアップした開発ビルドを使用する場合のコマンド。

## SVG 出力を含めて処理

```sh
ergogen <config_file> -o output_folder --svg
```

`--svg` / `--generate-svg` フラグでアウトライン等の SVG ファイルを追加出力する。

## デバッグモードで実行

```sh
ergogen <config_file> -o output_folder --debug
```

詳細なデバッグ情報を出力する。

## 出力ディレクトリをクリーンしてから処理

```sh
ergogen <config_file> -o output_folder --clean
```

> **警告**: `--clean` は出力ディレクトリの既存ファイルを削除してから処理を行う。上書き・削除は不可逆なので、重要なファイルがある場合はバックアップすること。

## ヘルプの表示

```sh
ergogen --help
```

利用可能なすべてのオプションを確認できる。

## オプション一覧

| フラグ | エイリアス | デフォルト | 説明 |
|--------|------------|------------|------|
| `<config_file>` | — | （必須） | 処理する設定ファイルまたはディレクトリ |
| `--output <dir>` | `-o` | `output` | 出力フォルダー |
| `--debug` | `-d` | `false` | デバッグモード |
| `--clean` | — | `false` | 処理前に出力ディレクトリを削除 |
| `--svg` | `--generate-svg` | `false` | SVG 出力を生成 |
