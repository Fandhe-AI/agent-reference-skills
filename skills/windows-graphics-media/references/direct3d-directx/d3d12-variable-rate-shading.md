# Variable-rate shading (VRS): RSSetShadingRate, RSSetShadingRateImage, D3D12_SHADING_RATE, SV_ShadingRate

Variable-rate shading (coarse pixel shading) lets a group of pixels be shaded as one unit, with the result broadcast to all samples in the group. The rate can vary per draw, per primitive, and (Tier 2) per screen-space image tile.

## Signature / Usage

```cpp
// Query Tier 1 capability (source sample; exact match).
D3D12_FEATURE_DATA_D3D12_OPTIONS6 options;
return
    SUCCEEDED(m_device->CheckFeatureSupport(
        D3D12_FEATURE_D3D12_OPTIONS6,
        &options,
        sizeof(options))) &&
    options.ShadingRateTier == D3D12_VARIABLE_SHADING_RATE_TIER_1;

// Compose a coarse shading rate from two axis rates.
#define D3D12_MAKE_COARSE_SHADING_RATE(x,y) ((x) << 2 | (y))
D3D12_MAKE_COARSE_SHADING_RATE(
    D3D12_AXIS_SHADING_RATE_2X,
    D3D12_AXIS_SHADING_RATE_1X)

// Set the screen-space shading rate image (Tier 2).
m_commandList->RSSetShadingRateImage(screenSpaceImage);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ID3D12GraphicsCommandList5::RSSetShadingRate | method | Sets the base `D3D12_SHADING_RATE` and an optional array of `D3D12_SHADING_RATE_COMBINER` values. Available on all tiers. |
| ID3D12GraphicsCommandList5::RSSetShadingRateImage | method | Sets the screen-space shading rate image (Tier 2+). `null` means 1x1 contribution. |
| D3D12_SHADING_RATE / D3D12_AXIS_SHADING_RATE | enums | Rates decompose into two axes in logarithmic space; `D3D12_AXIS_SHADING_RATE_2X` = 1, `_4X` = 2. `d3d12.h` provides `D3D12_GET_COARSE_SHADING_RATE_X_AXIS(x) ((x) >> 2)` and `D3D12_GET_COARSE_SHADING_RATE_Y_AXIS(y) ((y) & 3)`. |
| D3D12_FEATURE_DATA_D3D12_OPTIONS6 | struct | `ShadingRateTier` (`D3D12_VARIABLE_SHADING_RATE_TIER`), `AdditionalShadingRatesSupported`, `SupportsPerVertexShadingRateWithMultipleViewports`, `ShadingRateImageTileSize`, `BackgroundProcessingSupported`. |
| AdditionalShadingRatesSupported | BOOL | 2x4, 4x2, 4x4 supported for single-sampled rendering; 2x4 for 2x MSAA. 1x1, 1x2, 2x1, 2x2 are supported on all tiers. |
| ShadingRateImageTileSize | UINT | Tile size (square); 0 if Tier 2 is unsupported, else 8, 16, or 32. |
| Combiners | list | Passthrough (C=A), Override (C=B), Higher quality (min), Lower quality (max), Apply cost B relative to A (`min(maxRate, A+B)`). Default {PASSTHROUGH, PASSTHROUGH}. |
| D3D12_RESOURCE_STATE_SHADING_RATE_SOURCE | resource state | Read-only state required for a resource used as the screen-space image. |
| SV_ShadingRate | HLSL semantic (SM 6.4) | Per-primitive output from VS/GS, and PS input giving the selected rate (uint, `D3D12_SHADING_RATE` values; 1x1 when VRS unused). |

## Notes

- Tier 1: per-draw rate only, uniform within the render target. Tier 2: per-draw plus per-provoking-vertex (`SV_ShadingRate`) plus screen-space image combined via combiners; requested rate guaranteed delivered; `SV_ShadingRate` PS input supported.
- The source's capability sample compares `ShadingRateTier == D3D12_VARIABLE_SHADING_RATE_TIER_1`; Tier 2 also supports the Tier 1 (per-draw) features, so to test for at-least-Tier-1 support use `>= D3D12_VARIABLE_SHADING_RATE_TIER_1`, and gate the screen-space image / `SV_ShadingRate` features on `>= D3D12_VARIABLE_SHADING_RATE_TIER_2`.
- The source's Tier 2 summary says the image tile size is 16x16 or smaller, but its `ShadingRateImageTileSize` description also lists 32; always size the image and compute tile coordinates from the queried `D3D12_FEATURE_DATA_D3D12_OPTIONS6::ShadingRateImageTileSize`.
- Screen-space image: `DXGI_FORMAT_R8_UINT`, TEXTURE2D, one mip, no array, sample count 1/quality 0, layout UNKNOWN, no cross-adapter, heap not UPLOAD/READBACK. Allowed flags: NONE, ALLOW_UNORDERED_ACCESS, DENY_SHADER_RESOURCE. Dimensions: `{ ceil(rtWidth / VRSTileSize), ceil(rtHeight / VRSTileSize) }`; reading beyond extents yields 1x1. A resource set as shading rate source cannot be read/written by any shader stage.
- Defaults: all sources 1x1. `ClearState` resets the pipeline-state rate and the image selection.
- A PS using `SV_ShadingRate` fails to compile if it also uses sample-based execution (`SV_SampleIndex`, sample interpolation). Depth, stencil, and coverage are always computed at full sample resolution.
- Tier 1 disables coarse shading when SampleMask is not full, when pull-model intrinsics (`EvaluateAttributeSnapped`) are used, or when `SV_Coverage` is declared. On Tier 2 `EvaluateAttributeSnapped` and `SV_Coverage` are allowed. Coarse shading cannot write more than 16 samples at a time. Target-independent rasterization (TIR) is not supported with coarse pixel shading.
- Coarse pixel shading changes screen-space derivatives (2x2 doubles gradients) and selects less detailed mips. `SetSamplePositions` sets sample positions for fine pixels. `discard` discards coarse pixels. Conservative rasterization is usable (fine pixels within coarse pixels get full coverage).
- VRS APIs can be called on bundles and within render passes.
- The source page uses images for the MSAA/coarse-pixel support table and coverage-bit tables; see the official page for them.
- Namespace: Win32 COM (`d3d12.h`). Distinct from per-vendor or other-API VRS features.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct3d12/vrs (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [D3D12 render passes](./d3d12-render-passes.md)
- [D3D12 command lists and bundles](./d3d12-command-lists-bundles.md)
- [D3D12 enhanced barriers](./d3d12-enhanced-barriers.md)
- [HLSL shader compilation](./hlsl-shader-compilation.md)
