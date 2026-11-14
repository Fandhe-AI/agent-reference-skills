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

- Based on the editorconfig-core-js v4.0.0 (`63b38ab`) README and `src/cli.ts`, and the editorconfig-checker v4.0.2 README, fetched 2026-11-14.
- With several paths, a `[<path>]` line precedes each file's output (`src/cli.ts`). `-f` selects the config file name (default `.editorconfig`) and is unrelated to editorconfig-checker's `-f` (output format).
- `--unset` removes properties whose final value is `unset` from the output (option defined in `src/cli.ts`; not listed in the v4.0.0 README usage).
- The `editorconfig.py` command name is not stated in the editorconfig-core-py README (not confirmed upstream).
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/README.md (fetched 2026-11-14)
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/src/cli.ts (fetched 2026-11-14)
- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md (fetched 2026-11-14)
- Source: https://github.com/editorconfig/editorconfig-core-py/blob/v0.17.1/README.rst (fetched 2026-11-14)

## Related

- [install](./install.md) — Installing the cores
- [validate](./validate.md) — Validating with editorconfig-checker
