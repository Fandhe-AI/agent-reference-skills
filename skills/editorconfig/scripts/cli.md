# CLI

editorconfig コアコマンドおよび editorconfig-checker の CLI 操作。

## Signature / Usage

### ファイルのプロパティ取得（editorconfig-core-js）

```sh
editorconfig [OPTIONS] FILEPATH1 [FILEPATH2 FILEPATH3 ...]
```

stdin からパスを読み込む場合はハイフン `-` を指定する。

### 単一ファイルのプロパティ取得

```sh
editorconfig /path/to/file.js
```

単一パスの場合は `key=value` 形式で出力される。複数パスの場合は各ファイルの前に `[パス]` 行が付く。

### 設定に寄与したファイルの表示（editorconfig-core-js）

```sh
editorconfig --files /path/to/file.js
```

### バージョン表示（editorconfig-core-js）

```sh
editorconfig --version
```

### ヘルプ表示（editorconfig-core-js）

```sh
editorconfig --help
```

### 代替設定ファイルを指定してプロパティ取得

```sh
editorconfig -f /path/to/.editorconfig /path/to/file.js
```

### unset のプロパティを除外して取得（editorconfig-core-js）

```sh
editorconfig --unset /path/to/file.js
```

### 互換性バージョン指定（editorconfig-core-js）

```sh
editorconfig -b 0.9.0 /path/to/file.js
```

開発者がバージョン互換性テストに使用する。

### Python Core でのプロパティ取得

```sh
editorconfig.py /path/to/file.md
```

`editorconfig-python-core` をインストールすると `editorconfig.py` コマンドがパスに追加される。

## Notes

- 取得日: 2026-11-14。editorconfig-core-js v4.0.0（`63b38ab`）の README と `src/cli.ts`、editorconfig-checker v4.0.2 の README に基づく。
- 複数パスを渡すと、各ファイルの前に `[<path>]` 行が出力される（`src/cli.ts`）。`-f` は設定ファイル名（既定 `.editorconfig`）の指定で、editorconfig-checker の `-f`（出力形式）とは別物。
- `--unset` は最終値が `unset` のプロパティを出力から取り除く（`src/cli.ts` のオプション定義。v4.0.0 の README の usage には未掲載）。
- `editorconfig.py` コマンドは editorconfig-core-py の README にコマンド名の記載がなく、公式未確認。
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/README.md （取得日 2026-11-14）
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/src/cli.ts （取得日 2026-11-14）
- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md （取得日 2026-11-14）
- Source: https://github.com/editorconfig/editorconfig-core-py/blob/v0.17.1/README.rst （取得日 2026-11-14）

## Related

- [install](./install.md) — コアのインストール
- [validate](./validate.md) — editorconfig-checker の検証
