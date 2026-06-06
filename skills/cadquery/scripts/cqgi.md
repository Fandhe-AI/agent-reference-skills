# CQGI

CadQuery Gateway Interface (CQGI) を使ったスクリプト実行・自動化のコード例。

## スクリプトの解析と実行

```python
from cadquery import cqgi

user_script = open("my_model.py").read()
build_result = cqgi.parse(user_script).build()
```

## パラメータをオーバーライドして実行

```python
from cadquery import cqgi

user_script = open("my_model.py").read()
build_result = cqgi.parse(user_script).build(
    build_parameters={"height": 5.0, "width": 10.0},
    build_options={}
)
```

スクリプト内のトップレベル定数名と一致するキーを渡す。存在しないキーは `InvalidParameterError` を送出する。

## スクリプトが持つパラメータの確認

```python
from cadquery import cqgi

model = cqgi.parse(open("my_model.py").read())
parameters = model.metadata.parameters  # dict: name -> InputParameter
```

## ビルド結果の確認

```python
from cadquery import cqgi

build_result = cqgi.parse(open("my_model.py").read()).build()

if build_result.success:
    shape = build_result.first_result.shape
else:
    print(f"BUILD FAILED: {build_result.exception}")
```

## STL への一括エクスポート（バッチ自動化）

```python
import cadquery.cqgi as cqgi
import cadquery as cq

model = cqgi.parse(open("example.py").read())
build_result = model.build()

if build_result.success:
    for i, result in enumerate(build_result.results):
        cq.exporters.export(result.shape, f"example_output{i}.stl")
else:
    print(f"BUILD FAILED: {build_result.exception}")
```

スクリプトが `show_object()` を呼び出していることが前提。`show_object()` が一度も呼ばれない場合は `NoOutputError` が送出される。

## CQGI 準拠スクリプトの書き方（スクリプト側）

```python
import cadquery as cq

# トップレベル定数がオーバーライド可能なパラメータになる
height = 10.0
width = 20.0

result = cq.Workplane("XY").box(width, width, height)

# 結果を実行環境に返す（必須）
show_object(result)
```

関数内のローカル変数はオーバーライド対象外。`show_object()` を少なくとも 1 回呼び出すこと。
