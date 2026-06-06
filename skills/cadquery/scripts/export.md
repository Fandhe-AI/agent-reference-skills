# Export

CadQuery モデルを各種ファイル形式にエクスポートするコード例。

## STL へのエクスポート

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)
result.export("/path/to/file/mesh.stl")
```

## STL — メッシュ品質を指定してエクスポート

```python
result.export(
    "/path/to/file/mesh.stl",
    tolerance=0.001,
    angularTolerance=0.05,
)
```

`tolerance` は線形偏差（小さいほど細かいメッシュ）、`angularTolerance` は角度偏差（ラジアン）。

## STEP へのエクスポート

```python
import cadquery as cq

box = cq.Workplane().box(10, 10, 10)

# 拡張子 .step から形式を自動推定
box.export("/path/to/file/box.step")

# 拡張子 .stp の場合は明示的に指定
box.export("/path/to/file/box.stp", cq.exporters.ExportTypes.STEP)

# オプションつき
box.export("/path/to/file/box.step", opt={"write_pcurves": False})
```

## SVG へのエクスポート

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)

# 基本
result.export("/path/to/file/box.svg")

# カスタムオプションつき
result.export(
    "/path/to/file/box_custom.svg",
    opt={
        "width": 300,
        "height": 300,
        "marginLeft": 10,
        "marginTop": 10,
        "showAxes": False,
        "projectionDir": (0.5, 0.5, 0.5),
        "strokeWidth": 0.25,
        "strokeColor": (255, 0, 0),
        "hiddenColor": (0, 0, 255),
        "showHidden": True,
    },
)
```

## AMF へのエクスポート

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)
result.export("/path/to/file/mesh.amf", tolerance=0.01, angularTolerance=0.1)
```

## 3MF へのエクスポート

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)
result.export("/path/to/file/mesh.3mf", tolerance=0.01, angularTolerance=0.1)
```

## アセンブリを STEP へエクスポート

```python
import cadquery as cq

assy = cq.Assembly()
body = cq.Workplane().box(10, 10, 10)
assy.add(body, color=cq.Color(1, 0, 0), name="body")
pin = cq.Workplane().center(2, 2).cylinder(radius=2, height=20)
assy.add(pin, color=cq.Color(0, 1, 0), name="pin")

assy.export("out.step")
```

## アセンブリを fused モードでエクスポート

```python
assy.export("out.stp", "STEP", mode="fused")
assy.export("out_glue.step", mode="fused", glue=True, write_pcurves=False)
```

すべての形状を 1 つのコンパウンドに結合してエクスポートする。

## アセンブリを glTF / GLB へエクスポート

```python
import cadquery as cq

assy = cq.Assembly()
body = cq.Workplane().box(10, 10, 10)
assy.add(body, color=cq.Color(1, 0, 0), name="body")

# テキスト JSON
assy.export("out.gltf")

# バイナリ
assy.export("out.glb")
```
