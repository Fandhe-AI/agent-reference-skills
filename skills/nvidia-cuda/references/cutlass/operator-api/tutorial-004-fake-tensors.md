# Tutorial 004: Fake Tensors

## Signature / Usage

```python
# fake operands: describe shape/dtype without allocating backing memory
A_fake  = torch.empty(128, 512, dtype=torch.float16, device="meta")   # conceptual FakeTensor
B_fake  = torch.empty(512, 256, dtype=torch.float16, device="meta")
out_fake = torch.empty(128, 256, dtype=torch.float16, device="meta")

args_fake = ops.GemmArguments(A_fake, B_fake, out_fake, accumulator_type=torch.float32)
operators = ops.get_operators(args_fake, target_sm=target_sm)
compiled_artifact = operators[0].compile(args_fake)

# execute the fake-tensor-compiled artifact against real tensors
operators[0].run(args_real, compiled_artifact)
```

## Options / Props

| Item | Description |
| --- | --- |
| Fake tensor (e.g. PyTorch `FakeTensor`) | Describes a tensor's properties (shape, dtype) without allocating backing GPU memory |
| Workflow | Same `GemmArguments` → `get_operators` → `compile` pipeline as with real tensors |
| Compiled artifact reuse | An artifact compiled against fake tensors can `run()` against real tensors of matching shape/dtype |

## Notes

- Separating compilation (kernel discovery/optimization) from execution reduces memory overhead during the discovery phase, since no real GPU buffers are needed until `run()`.

## Related

- [Tutorial 000: GEMM](./tutorial-000-gemm.md)
- [Tutorial 003: Host Latency Best Practices](./tutorial-003-host-latency-best-practices.md)
