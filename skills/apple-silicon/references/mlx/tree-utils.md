# Tree Utils

`mlx.utils` provides functions for walking the nested `dict`/`list`/`tuple` trees that MLX uses to represent model parameters and optimizer state, without writing manual recursive traversal.

## Signature / Usage

```python
from mlx.utils import tree_flatten, tree_unflatten, tree_map, tree_reduce

flat = tree_flatten(model.parameters())     # [("in_proj.weight", array(...)), ...]
tree = tree_unflatten(flat)                 # reconstructs the nested dict/list structure

fp16_params = tree_map(lambda p: p.astype(mx.float16), model.parameters())

total_params = tree_reduce(lambda acc, p: acc + p.size, model.parameters(), initializer=0)
```

## Options / Props

| Function | Description |
| --- | --- |
| `tree_flatten(tree)` | Converts a nested dict/list/tuple tree into a flat list of `(path, value)` pairs |
| `tree_unflatten(flat)` | Reconstructs the original nested tree from its flattened form |
| `tree_map(fn, tree)` | Applies `fn` to every leaf, returning a new tree of the same shape |
| `tree_map_with_path(fn, tree)` | Like `tree_map`, but `fn` also receives each leaf's path |
| `tree_reduce(fn, tree, initializer=None, is_leaf=None)` | Aggregates all leaves with a reduction function |
| `tree_merge(tree_a, tree_b, merge_fn=None)` | Combines two trees, resolving overlaps with `merge_fn` if given |

## Notes

- `tree_flatten`/`tree_unflatten` are what `Module.save_weights`/`load_weights` and safetensors-based optimizer-state checkpointing (see saving-loading.md, optimizers.md) use under the hood to turn a parameter tree into a flat name→array mapping and back.
- These utilities accept subclasses of `dict`/`list`/`tuple` as well as the built-ins, so custom container types used inside a model still traverse correctly.

## Related

- [nn.Module](./nn-module.md)
- [Optimizers](./optimizers.md)
- [Saving and Loading](./saving-loading.md)
