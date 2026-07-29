# MLX Unified Memory Across CPU and GPU Streams

Run the same array through CPU and GPU streams without moving or copying it, and let MLX's scheduler insert dependencies automatically when one stream's output feeds another.

```python
import mlx.core as mx

# On Apple silicon's unified memory, `a` and `b` are not tied to a
# device at creation time — no host-to-device copy is needed later.
a = mx.random.normal((100,))
b = mx.random.normal((100,))

# The device is chosen per operation, not per array. Both add calls
# below can run in parallel since neither depends on the other's output.
mx.add(a, b, stream=mx.cpu)
mx.add(a, b, stream=mx.gpu)

# c depends on b (computed on the CPU stream); MLX inserts a
# cross-stream dependency automatically so d only starts once c is
# ready — no manual synchronization call is required.
c = mx.add(a, b, stream=mx.cpu)
d = mx.add(a, c, stream=mx.gpu)


def fun(a, b, d1, d2):
    # Dense matmul: a good fit for the GPU stream.
    x = mx.matmul(a, b, stream=d1)
    for _ in range(500):
        # Many tiny ops: a better fit for the CPU stream, where the
        # GPU's per-dispatch overhead would otherwise dominate.
        b = mx.exp(b, stream=d2)
    return x, b


# Matmul-shaped inputs: (4096, 512) @ (512, 4).
mm_a = mx.random.uniform(shape=(4096, 512))
mm_b = mx.random.uniform(shape=(512, 4))

x, mm_b = fun(mm_a, mm_b, d1=mx.gpu, d2=mx.cpu)
mx.eval(x, mm_b)
```

## Notes

- MLX is Apple's open-source array framework (ml-explore), not Core ML; Core ML / Create ML / Vision are covered by the separate apple-ml skill.
- Unlike CUDA's managed/unified memory, which still migrates pages between physically separate host and device memories, Apple silicon's unified memory means `a` and `b` above are one physical allocation from the start — MLX's `stream=` argument only chooses which compute unit runs an operation, not where the data lives.
- Splitting `fun` across `d1=mx.gpu` (dense matmul) and `d2=mx.cpu` (500 small ops) measured at roughly 1.4 ms versus 2.8 ms fully on the GPU on an M1 Max, per the source doc.
- Derived from the official MLX documentation source `docs/src/usage/unified_memory.rst` at tag v0.32.0 (MIT License).
