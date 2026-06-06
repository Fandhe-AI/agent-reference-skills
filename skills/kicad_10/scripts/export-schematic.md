# Export Schematic

スキーマティックファイルから BOM・ネットリスト・各種フォーマットを出力する。

## BOM (部品表) の出力

```sh
kicad-cli sch export bom --output bom.csv schematic.kicad_sch
```

## BOM の出力（フィールド指定）

```sh
kicad-cli sch export bom --output bom.csv --fields "Reference,Value,Footprint,Quantity" schematic.kicad_sch
```

## BOM の出力（グループ化・DNP 除外）

```sh
kicad-cli sch export bom --output bom.csv --group-by Value --exclude-dnp schematic.kicad_sch
```

## ネットリストの出力（KiCad S 式）

```sh
kicad-cli sch export netlist --output netlist.net schematic.kicad_sch
```

## ネットリストの出力（KiCad XML）

```sh
kicad-cli sch export netlist --output netlist.xml --format kicadxml schematic.kicad_sch
```

## ネットリストの出力（Spice）

```sh
kicad-cli sch export netlist --output netlist.spice --format spice schematic.kicad_sch
```

`--format` に指定可能な値: `kicadsexpr`, `kicadxml`, `cadstar`, `orcadpcb2`, `spice`, `spicemodel`, `pads`, `allegro`

## PDF の出力

```sh
kicad-cli sch export pdf --output schematic.pdf schematic.kicad_sch
```

## PDF の出力（白黒・プロパティポップアップ除外）

```sh
kicad-cli sch export pdf --output schematic.pdf --black-and-white --exclude-property-popups schematic.kicad_sch
```

## SVG の出力（全シート）

```sh
kicad-cli sch export svg --output ./svg/ schematic.kicad_sch
```

シートごとに 1 ファイル生成する。

## SVG の出力（特定シートのみ）

```sh
kicad-cli sch export svg --output ./svg/ --pages 1,2 schematic.kicad_sch
```

## DXF の出力

```sh
kicad-cli sch export dxf --output ./dxf/ schematic.kicad_sch
```

## PostScript の出力

```sh
kicad-cli sch export ps --output ./ps/ schematic.kicad_sch
```

## スキーマティックファイルのフォーマットアップグレード

```sh
kicad-cli sch upgrade old_schematic.kicad_sch
```

> **警告**: アップグレードしたファイルは旧バージョンの KiCad で開けなくなる。実行前にバックアップを取ること。
