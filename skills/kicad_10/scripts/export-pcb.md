# Export PCB

PCB ファイルから製造データ・3D モデル・各種フォーマットを出力する。

## Gerber ファイルの出力（全レイヤー）

```sh
kicad-cli pcb export gerbers --output ./gerbers/ board.kicad_pcb
```

レイヤーごとに 1 ファイル生成する。出力先ディレクトリが存在しない場合は事前に作成する。

## Gerber ファイルの出力（特定レイヤー指定）

```sh
kicad-cli pcb export gerbers --output ./gerbers/ --layers F.Cu,B.Cu,F.SilkS,B.SilkS,F.Mask,B.Mask,Edge.Cuts board.kicad_pcb
```

## Gerber ファイルの出力（ボードプロット設定を使用）

```sh
kicad-cli pcb export gerbers --board-plot-params --output ./gerbers/ board.kicad_pcb
```

## ドリルファイルの出力

```sh
kicad-cli pcb export drill --output ./gerbers/ board.kicad_pcb
```

デフォルトは Excellon 形式で出力する。

## ドリルファイルの出力（Gerber 形式）

```sh
kicad-cli pcb export drill --format gerber --output ./gerbers/ board.kicad_pcb
```

## ドリルマップファイルの同時生成

```sh
kicad-cli pcb export drill --generate-map --map-format pdf --output ./gerbers/ board.kicad_pcb
```

## ピック＆プレース位置ファイルの出力

```sh
kicad-cli pcb export pos --output pos.csv --format csv --side both board.kicad_pcb
```

## ピック＆プレースファイルの出力（SMD 部品のみ・DNP 除外）

```sh
kicad-cli pcb export pos --output pos.csv --format csv --side both --smd-only --exclude-dnp board.kicad_pcb
```

## IPC-2581 フォーマットの出力

```sh
kicad-cli pcb export ipc2581 --output board.xml board.kicad_pcb
```

## ODB++ フォーマットの出力

```sh
kicad-cli pcb export odb --output ./odb/ board.kicad_pcb
```

## IPC-D-356 ネットリストの出力

```sh
kicad-cli pcb export ipcd356 --output netlist.d356 board.kicad_pcb
```

## STEP 3D モデルの出力

```sh
kicad-cli pcb export step --output board.step board.kicad_pcb
```

## STEP 3D モデルの出力（ボードのみ・部品モデルなし）

```sh
kicad-cli pcb export step --board-only --output board.step board.kicad_pcb
```

## STEP 3D モデルの出力（DNP 部品除外）

```sh
kicad-cli pcb export step --no-dnp --output board.step board.kicad_pcb
```

## GLB (binary glTF) 3D モデルの出力

```sh
kicad-cli pcb export glb --output board.glb board.kicad_pcb
```

## VRML 3D モデルの出力

```sh
kicad-cli pcb export vrml --output board.wrl board.kicad_pcb
```

## STL メッシュの出力

```sh
kicad-cli pcb export stl --output board.stl board.kicad_pcb
```

## BREP (OCCT) 3D モデルの出力

```sh
kicad-cli pcb export brep --output board.brep board.kicad_pcb
```

## PDF の出力（全レイヤー・マルチページ）

```sh
kicad-cli pcb export pdf --output board.pdf --mode-multipage --layers F.Cu,B.Cu,F.SilkS,B.SilkS board.kicad_pcb
```

## SVG の出力

```sh
kicad-cli pcb export svg --output ./svg/ --layers F.Cu,B.Cu board.kicad_pcb
```

## DXF の出力

```sh
kicad-cli pcb export dxf --output ./dxf/ --layers F.Cu,B.Cu board.kicad_pcb
```

## GenCAD の出力

```sh
kicad-cli pcb export gencad --output board.cad board.kicad_pcb
```

## レイトレーシング画像のレンダリング

```sh
kicad-cli pcb render --output board.png --side top --quality high board.kicad_pcb
```

## レンダリング（解像度指定）

```sh
kicad-cli pcb render --output board.png --width 3840 --height 2160 --side top board.kicad_pcb
```

## 非 KiCad PCB ファイルのインポート

```sh
kicad-cli pcb import --output board.kicad_pcb --format altium design.PcbDoc
```

`--format` に指定可能な値: `auto`, `pads`, `altium`, `eagle`, `cadstar`, `fabmaster`, `pcad`, `solidworks`

## PCB ファイルのフォーマットアップグレード

```sh
kicad-cli pcb upgrade old_board.kicad_pcb
```

> **警告**: アップグレードしたファイルは旧バージョンの KiCad で開けなくなる。実行前にバックアップを取ること。
