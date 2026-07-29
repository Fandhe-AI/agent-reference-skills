# WebNN Overview

The Web Neural Network (WebNN) API is an emerging web standard that lets web apps and frameworks accelerate deep neural networks with GPUs, CPUs, or NPUs; on Windows it leverages the DirectML API to access native hardware capabilities and optimize model execution.

## Signature / Usage

```text
Web app / framework
  -> WebNN API (in-browser)
  -> DirectML (on Windows)
  -> GPU / NPU hardware
```

For Windows, the recommended framework-level entry point is ONNX Runtime Web, which gives a deployment experience consistent with using DirectML and ONNX Runtime natively.

## Options / Props

| Hardware | Browser requirement | Windows version | ONNX Runtime Web version | Driver |
|----------|---------------------|------------------|---------------------------|--------|
| GPU (preview) | Recent Chromium browser (Microsoft Edge Beta recommended) | Windows 11, version 21H2+ | 1.18+ | Latest vendor driver |
| NPU (preview) | Recent Chromium browser (Microsoft Edge Canary recommended); launch with `msedge.exe --disable_webnn_for_npu=0` | Windows 11, version 21H2+ | 1.18+ | Intel driver 32.0.100.2381+ |

## Notes

- The WebNN API is still in progress; GPU and NPU support are in preview and should not be used in production.
- Benefits over sending data to cloud inference: performance (best available hardware/software optimizations via DirectML), low latency (in-browser inference for real-time video/audio scenarios), privacy (data stays on-device), offline availability, and no server cost.
- GPU preview supports models such as Stable Diffusion Turbo/1.5, Whisper-base, MobileNetv2, Segment Anything, ResNet, EfficientNet, SqueezeNet, and custom models with sufficient operator coverage (check the WebNN operator status page).
- NPU preview (on Intel Core Ultra / AI Boost NPU) supports Whisper-base, MobileNetV2, ResNet, EfficientNet.
- WebNN currently best supports Windows; support for other operating systems is in progress.
- Debugging: errors surface through the W3C WebNN spec's DOM exception model; `about://gpu` logs can also help.

## Related

- [DirectML Overview](./directml-overview.md)
- [ONNX Runtime DirectML execution provider](./onnxruntime-directml.md)
- [DirectML Programming Guide](./programming-guide.md)
