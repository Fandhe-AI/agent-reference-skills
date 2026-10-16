# Exporting Functions

MLX can export a function (its compute graph) to a `.mlxfn` file and import it in another front-end, for example Python to C++.

## Signature / Usage

```python
import mlx.core as mx

def fun(x, y):
    return x + y

x = mx.array(1.0)
y = mx.array(1.0)
mx.export_function("add.mlxfn", fun, x, y)

add_fun = mx.import_function("add.mlxfn")
out, = add_fun(mx.array(1.0), mx.array(2.0))   # array(3, dtype=float32)
```

Signatures (from `python/src/export.cpp`):

```python
def export_function(file_or_callback: str | Callable, fun: Callable, *args, shapeless: bool = False, metadata: str | None = None, **kwargs) -> None
def import_function(file: str, return_metadata: bool = False) -> Callable | tuple[Callable, str]
mx.exporter(file, fun, *, shapeless=False, metadata=None)   # context manager (FunctionExporter)
mx.export_to_dot(file, *args, **kwargs)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| file_or_callback | str or Callable | File path to export to, or a callback that receives graph nodes |
| fun | Callable | Function taking zero or more arrays and returning one or more arrays |
| *args / **kwargs | array | Example inputs; only shapes and dtypes matter |
| shapeless | bool | Allow inputs with variable shapes. Default `False` |
| metadata | str | String saved alongside the function (for example JSON config). File export only |
| return_metadata | bool | `import_function`: also return the metadata string |
| export_to_dot file | str or file-like | Destination of the DOT graph; `**kwargs` give names to arrays |

Callback `args` dictionary has a `type` field:

| type | Meaning |
| --- | --- |
| `"inputs"` | Ordered positional inputs to the exported function |
| `"keyword_inputs"` | Keyword inputs to the exported function |
| `"outputs"` | Ordered outputs of the exported function |
| `"constants"` | Any graph constants |
| `"primitive"` | An inner graph node representing an operation |

## Notes

- This is an experimental API likely to change; functions exported with older MLX versions may not be compatible with future versions.
- Imported functions always return a tuple of arrays. Calling with different input shapes or dtypes than exported raises, unless exported with `shapeless=True` (use carefully, same caveats as shapeless compilation). If keyword arguments were used at export time, the same keywords must be used when calling.
- Saving metadata (documented in 0.32.4):

  ```python
  import json
  mx.export_function("add.mlxfn", fun, x, y, metadata=json.dumps({"version": 1}))
  imported_fun, metadata = mx.import_function("add.mlxfn", return_metadata=True)
  ```

  Passing `metadata` with a callback raises `ValueError`.
- Exporting a `Module`: evaluate its parameters first (`mx.eval(model.parameters())`), otherwise the exported graph includes the random initialization. To export without parameters, pass them as inputs to the wrapper.
- Multiple traces of one function go into one file via `with mx.exporter("fun.mlxfn", fun) as exporter: exporter(mx.array(1.0))`, so constant data is saved once.
- `grad`, `vmap` and `compile` work on imported functions. In C++: `auto fun = mx::import_function("fun.mlxfn");`.
- `export_to_dot` writes the unevaluated graph of the given output arrays for visualization.
- Source: https://ml-explore.github.io/mlx/build/html/usage/export.html and https://ml-explore.github.io/mlx/build/html/python/export.html (pinned sources: https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/usage/export.rst, https://github.com/ml-explore/mlx/blob/v0.32.4/docs/src/python/export.rst)

## Related

- [Compilation](./compilation.md)
- [Function Transforms](./function-transforms.md)
- [Saving and Loading](./saving-loading.md)
