# GPU acceleration in WSL - FAQ (TensorFlow-DirectML)

FAQ covering device placement, multi-GPU selection, and memory/troubleshooting behavior for TensorFlow running on the DirectML device.

## Signature / Usage

```python
import tensorflow as tf

tf.debugging.set_log_device_placement(True)
tf.enable_eager_execution()

# Explicitly place tensors on the DirectML device
with tf.device('/DML:0'):
    a = tf.constant([1.0, 2.0, 3.0])
    b = tf.constant([4.0, 5.0, 6.0])
c = tf.add(a, b)
print(c)
```

## Options / Props

| Question | Answer |
|----------|--------|
| How do I enable DirectML acceleration? | Enabled by default when a DirectX 12 GPU is available; use `tf.debugging.set_log_device_placement(True)` to confirm placement. |
| How do I control device placement? | Use `tf.device()`; device string is `'GPU'` for the TensorFlow-DirectML-Plugin, or `'DML'` for TensorFlow-DirectML 1.15. |
| I have multiple GPUs — how do I select one? | Process-wide via the `DML_VISIBLE_DEVICES` environment variable (comma-separated adapter indices); per-session via `tf.GPUOptions.visible_device_list`. |
| Why is shared GPU memory usage high? | Normal — DirectML uses shared GPU memory as a staging area for upload/readback; dedicated GPU memory (VRAM) is always preferred when available. |
| Why doesn't DirectML use all dedicated GPU memory upfront? | Unlike CUDA, DirectML allocates on demand rather than reserving upfront; control with the `TF_FORCE_GPU_ALLOW_GROWTH` environment variable. |
| Seeing `DXGI_ERROR_DEVICE_REMOVED` / `DEVICE_HUNG`? | See the `tensorflow-directml` GitHub wiki's GPU-timeout troubleshooting page. |
| Getting device assignment / node colocation errors? | Usually an operator (or operator + data type combination) unsupported by the DirectML device; see the `tensorflow-directml` Roadmap (operators) wiki page for supported ops. |

## Notes

- Setting `DML_VISIBLE_DEVICES="-1"` disables DirectML acceleration entirely, falling back to CPU.
- `DML_VISIBLE_DEVICES` also supports reordering devices (e.g. `"1,0"`), not just filtering.

## Related

- [DirectML Plugin for TensorFlow 2](./tensorflow-directml.md)
- [GPU-accelerated ML training](./gpu-accelerated-training.md)
