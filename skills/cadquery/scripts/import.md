# Import

外部ファイルを CadQuery に読み込むコード例。

## STEP ファイルのインポート

```python
import cadquery as cq

result = cq.importers.importStep("/path/to/file.stp")
```

戻り値は `Workplane`。そのままチェーンして CadQuery 操作を続けられる。STEP インポートでは parametric feature データは復元されず、静的な B-Rep ソリッドとなる。

## DXF ファイルのインポート

```python
import cadquery as cq

result = cq.importers.importDXF("/path/to/file.dxf")
```

## DXF インポート後に押し出し（エクストルード）

```python
import cadquery as cq

result = (
    cq.importers.importDXF("/path/to/file.dxf")
    .wires()
    .toPending()
    .extrude(10)
)
```

DXF インポートで得られるのはエッジ群。`.wires().toPending()` でワイヤーに変換してから `extrude()` などの操作に使う。

## DXF インポート — レイヤーを指定

```python
import cadquery as cq

# 特定レイヤーだけ読み込む（大文字小文字を区別しない）
result = cq.importers.importDXF("/path/to/file.dxf", include=["layer1", "layer2"])

# 特定レイヤーを除外
result = cq.importers.importDXF("/path/to/file.dxf", exclude=["ignore_layer"])
```

`include` と `exclude` は同時に指定できない。
