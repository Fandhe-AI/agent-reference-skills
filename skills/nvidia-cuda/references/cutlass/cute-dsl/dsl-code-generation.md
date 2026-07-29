# DSL Code Generation

## Signature / Usage

```python
@cute.jit(preprocessor=False)   # tracing mode: fast, but flattened loops / lost branches
def fast_fn(...): ...

@cute.jit(preprocessor=True)    # default preprocessor mode: AST rewrite captures all control flow
def full_fn(...): ...

def meta_stage_example(x):
    print(x)          # meta-stage: runs on host CPU at compile time, prints a proxy
    cute.printf("{}", x)  # object-stage: runs on GPU at kernel execution, prints the real value
```

## Options / Props

| Stage | Description |
| --- | --- |
| Pre-Staging (Python AST) | Rewrites the decorated function before execution, inserting callbacks around control-flow constructs |
| Meta-Stage (Python interpreter) | Rewritten function executes with proxy arguments; callbacks emit structured IR; tensor ops are traced; compile-time constants partially evaluated |
| Object-Stage (compiler backend) | IR is lowered/optimized then translated to PTX/SASS |
| `preprocess=False` (tracing mode) | Faster compilation but flattens loops and loses branches |
| `preprocess=True` (preprocessor mode, default) | AST rewrite captures full control flow before arithmetic tracing |

## Notes

- Your Python source runs twice, in two different contexts: meta-stage (host CPU, compile time — use `print()`) and object-stage (GPU, kernel execution — use `cute.printf()`).

## Related

- [DSL Introduction](./dsl-introduction.md)
- [DSL Control Flow](./dsl-control-flow.md)
- [Debugging](./debugging.md)
