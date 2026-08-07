# WebNN Tutorial

Step-by-step tutorial building a GPU-accelerated, in-browser image classification app using the WebNN API via ONNX Runtime Web and the MobileNetV2 model.

## Signature / Usage

```js
// Configure WebNN as the ONNX Runtime Web execution provider:
const options = {
  executionProviders: [{ name: "webnn", deviceType: "gpu", powerPreference: "default" }],
  freeDimensionOverrides: { "batch": 1, "channels": 3, "height": 224, "width": 224 }
};
modelSession = await ort.InferenceSession.create("./mobilenetv2-10.onnx", options);
```

## Options / Props

| Step | Description |
|---|---|
| Requirements & set-up | Edge Dev/Beta with `about:flags` "WebNN API" enabled, VS Code with Live Server extension. |
| Step 1: Initialize the web app | Boilerplate `index.html`, `main.js`, an `images/` folder, the `mobilenetv2-10.onnx` model from the ONNX Model Zoo, and `imagenetClasses.js`. |
| Step 2: Add UI elements and parent function | Button/image markup, `ort.webgpu.min.js` script include, and a `classifyImage()` entry point. |
| Step 3: Pre-process data | `getImageTensorFromPath` / `loadImagefromPath` (via Jimp) / `imageDataToTensor` convert an image into an ONNX Runtime `Tensor`. |
| Step 4: Call ONNX Runtime Web | `ort.InferenceSession.create` with `executionProviders: [{ name: "webnn", deviceType, powerPreference }]` and `freeDimensionOverrides`, then `session.run(feeds)`. |
| Step 5: Post-process data | `softmax` normalizes outputs to probabilities; `imagenetClassesTopK` returns the top-K predicted classes. |

## Notes

- The WebNN API is a W3C Candidate Recommendation still in early developer preview; some functionality is limited (see the WebNN implementation-status page).
- `deviceType` accepts `"gpu"`, `"npu"`, or `"cpu"`; enabling WebNN in ONNX Runtime Web only requires specifying the `webnn` execution provider.
- The `freeDimensionOverrides` keys must match the model's actual input dimension names (e.g. some models only need `{"batch_size": 1}`).
- Complete tutorial code is available on the WebNN Developer Preview GitHub repo.

## Related

- [WebNN Overview](./webnn-overview.md)
- [ONNX Runtime DirectML execution provider](./onnxruntime-directml.md)
