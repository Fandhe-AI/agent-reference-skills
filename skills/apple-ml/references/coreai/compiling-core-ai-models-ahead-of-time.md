# Compiling Core AI models ahead of time

Reduce on-device specialization time by compiling Core AI models at build time with the `coreai-build` command-line tool.

## Signature / Usage

```sh
% xcodebuild -downloadComponent MetalToolchain
% xcrun coreai-build compile MyModel.aimodel --platform iOS --min-deployment-version 27.0 --output compiled/
```

At runtime, pick the asset matching the device architecture:

```swift
let arch = AIModel.deviceArchitectureName
let assetName = "MyModel.\(arch).aimodelc"
```

## Options / Props

| Option | Description |
|--------|-------------|
| `--platform` | Target platform (example: `iOS`) |
| `--min-deployment-version` | Minimum OS version; each compiled `.aimodelc` works on any OS version at or above it |
| `--output` | Output directory |
| `--preferred-compute` | Overrides the default compute unit selection. Run `coreai-build compile --help` for available values and other options |

## Notes

- Ahead-of-time compilation moves the most expensive part of specialization (model compilation) to the build machine. It converts a `.aimodel` into `.aimodelc` assets, one per device architecture, named `MyModel.<arch>.aimodelc` where `<arch>` is the value of `AIModel.deviceArchitectureName` at runtime.
- Supported only for devices that support Apple Intelligence: iPhone or iPad with A17 Pro or later, Mac with M1 or later, Apple Vision Pro with M2 or later. Not supported on tvOS and watchOS.
- Requires the Metal Toolchain on your Mac (install via Xcode > Settings > Components > Other Components, or the `xcodebuild` command above).
- Each device needs only its own architecture's variant, so host the compiled assets remotely and download the matching one at runtime; the Background Assets framework can manage downloads, installs, and updates.
- Load with `AIModel(contentsOf:options:)`, the same API as for `.aimodel`; use default options or options matching the compute units used at compile time.
- The compiled asset still requires some on-device specialization; how much remains depends on the model and the compute units used.
- Source: https://developer.apple.com/documentation/coreai/compiling-core-ai-models-ahead-of-time

## Related

- [Integrating on-device AI models](./integrating-on-device-ai-models.md)
- [Managing model specialization and caching](./managing-model-specialization-and-caching.md)
- [AIModel](./aimodel.md)
