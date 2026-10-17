---
source: https://docs.flutter.dev/perf/antialiasing
---

# Impeller anti-aliasing

How Impeller performs anti-aliasing: multisample anti-aliasing (MSAA) and signed distance fields (SDFs).

## Signature / Usage

Enable SDFs on iOS by adding a field to the project's `Info.plist`:

```xml
  <key>FLTEnableSDFs</key>
  <true/>
```

## Techniques

### Multisample anti-aliasing (MSAA)

MSAA is a global anti-aliasing technique that operates on the whole contents of the screen. It is an optimization over rendering the whole screen at a larger scale and shrinking it down (SSAA). Instead of doing the fragment operation for each sub-sample, the calculation for the pixel is duplicated across the sub-samples where a bounds check happens. This limits smoothing to edges. Mobile phone GPUs have special hardware to optimize this process (tiled rendering). It comes in varying degrees of how many samples to consider.

On desktop and mobile 4x MSAA is used for all rendering calls.

### Signed distance fields (SDFs)

Typically, hardware accelerated computer graphics define a series of points and edges (a mesh) and shaders. Instead, SDF renders shapes in the fragment shader program as signed distance fields. Since the shape is defined in the fragment shader the edges can be smoothed at the fragment level instead of relying on the rasterization of a mesh.

On desktop, rendering with SDFs is enabled by default. On mobile platforms, SDFs are an option that defaults to false.

This technique is prioritized on desktop because SDF rendering puts more demand on the GPU and Flutter supports older mobile phones. Also, the physical pixel sizes on desktop computers are typically bigger than those of mobile phones, so any imperfection will be more evident there.

Comparison of the three modes: No AA, MSAA 4x, MSAA 4x + SDF (images on the official page).

## Working with anti-aliasing

### SDFs with the FragmentShader API

Standard primitive shapes in Flutter are drawn by default with SDFs. If a Flutter developer wants to define their own custom graphics with SDFs they can do so with the FragmentShader API. Using `drawPath()` is sufficient for most use cases without resorting to high quality SDF rendering. Not all drawn paths are guaranteed to result in SDF rendering though.

An example of rendering SDFs with the FragmentShader API can be found at the `simple_sdf` sample (`https://github.com/flutter/samples/tree/main/simple_sdf`).

### Enabling SDFs on iOS

SDFs can be enabled on iOS by adding the `FLTEnableSDFs` field to the `Info.plist` for the project (see snippet above).

## Notes

- Distance line: this page is about the anti-aliasing techniques of Flutter's own Impeller engine. Metal / GPU compute APIs belong to apple-graphics and apple-silicon.

## Related

- [Impeller rendering engine](./impeller.md)
