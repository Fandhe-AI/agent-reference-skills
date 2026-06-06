# Library

フットプリント・シンボルライブラリの変換・アップグレード・エクスポート。

## フットプリントを SVG にエクスポート

```sh
kicad-cli fp export svg --output ./svg/ MyFootprintLibrary.pretty
```

ライブラリ内の全フットプリントを SVG に変換する。

## フットプリントを SVG にエクスポート（単一フットプリント指定）

```sh
kicad-cli fp export svg --output ./svg/ --footprint R_0603 MyFootprintLibrary.pretty
```

## フットプリントライブラリのアップグレード

```sh
kicad-cli fp upgrade --output ./upgraded/ legacy_library.mod
```

> **警告**: `--output` を省略すると元ファイルを上書きする。実行前にバックアップを取ること。

## フットプリントライブラリのアップグレード（強制再保存）

```sh
kicad-cli fp upgrade --force MyFootprintLibrary.pretty
```

> **警告**: `--force` を付けると既に最新フォーマットのライブラリも上書きする。

対応する入力フォーマット: KiCad `.pretty` (`.kicad_mod`)、Legacy KiCad pre-5.0 (`.mod`, `.emp`)、Altium (`.PcbLib`, `.IntLib`)、CADSTAR (`.cpa`)、EAGLE XML (`.lbr`)、EasyEDA/JLCEDA (`.json`, `.elibz`, `.epro`, `.zip`)、GEDA/PCB (`.fp`)

## シンボルを SVG にエクスポート

```sh
kicad-cli sym export svg --output ./svg/ MySymbolLibrary.kicad_sym
```

## シンボルを SVG にエクスポート（単一シンボル指定）

```sh
kicad-cli sym export svg --output ./svg/ --symbol R MySymbolLibrary.kicad_sym
```

## シンボルを KiCad ネイティブ形式にエクスポート

```sh
kicad-cli sym export kicad_sym --output output.kicad_sym input.kicad_sym
```

## シンボルライブラリのアップグレード

```sh
kicad-cli sym upgrade --output ./upgraded/ legacy_library.lib
```

> **警告**: `--output` を省略すると元ファイルを上書きする。実行前にバックアップを取ること。

対応する入力フォーマット: KiCad `.kicad_sym`、Legacy KiCad pre-5.0 (`.lib`, `.dcm`)、Altium (`.IntLib`)、EAGLE XML (`.lbr`)、EasyEDA/JLCEDA (`.json`, `.elibz`, `.epro`, `.zip`)
