# Background Inference entitlement

An entitlement that lets a background task run inference on the Neural Engine. Key: `com.apple.developer.background-tasks.continued-processing.inference`.

## Signature / Usage

```xml
<key>com.apple.developer.background-tasks.continued-processing.inference</key>
<true/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `com.apple.developer.background-tasks.continued-processing.inference` | Boolean | Default `NO` |

## Notes

- iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Works with `BGContinuedProcessingTask`, letting critical inference work finish on the Neural Engine even when the app moves to the background before the task completes.
- The system also requires the entitlement for any Neural Engine access while the app is in the background, whether or not it runs a continued background task. Inference may use Core AI, Core ML, or Metal Performance Shaders Graph.
- Sibling entitlement for GPU: `com.apple.developer.background-tasks.continued-processing.gpu` (Background GPU Access).
- Source: https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.background-tasks.continued-processing.inference

## Related

- [InferenceFunction](./inferencefunction.md)
