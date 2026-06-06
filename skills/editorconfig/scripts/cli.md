# CLI

editorconfig コアコマンドおよび editorconfig-checker の CLI 操作。

## ファイルのプロパティ取得（editorconfig-core-js）

```sh
editorconfig [OPTIONS] FILEPATH1 [FILEPATH2 FILEPATH3 ...]
```

stdin からパスを読み込む場合はハイフン `-` を指定する。

## 単一ファイルのプロパティ取得

```sh
editorconfig /path/to/file.js
```

単一パスの場合は `key=value` 形式で出力される。複数パスの場合は INI 形式で出力される。

## 設定に寄与したファイルの表示（editorconfig-core-js）

```sh
editorconfig --files /path/to/file.js
```

## バージョン表示（editorconfig-core-js）

```sh
editorconfig --version
```

## ヘルプ表示（editorconfig-core-js）

```sh
editorconfig --help
```

## 代替設定ファイルを指定してプロパティ取得

```sh
editorconfig -f /path/to/.editorconfig /path/to/file.js
```

## 互換性バージョン指定（editorconfig-core-js）

```sh
editorconfig -b 0.9.0 /path/to/file.js
```

開発者がバージョン互換性テストに使用する。

## Python Core でのプロパティ取得

```sh
editorconfig.py /path/to/file.md
```

`editorconfig-python-core` をインストールすると `editorconfig.py` コマンドがパスに追加される。
