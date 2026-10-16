# Precision and numerical clipping in effect graphs

Direct2D may render parts of an effect graph through intermediate Direct3D textures with limited range and precision. This page covers how to force clamping and how to control intermediate-texture precision.

## Signature / Usage

Set the precision of all intermediates through the rendering controls:

```cpp
if (Context->IsBufferPrecisionSupported(D2D1_BUFFER_PRECISION_32BPC_FLOAT))
{
  D2D1_RENDERING_CONTROLS renderingControls = {};
  Context->GetRenderingControls(&renderingControls);

  renderingControls.bufferPrecision = D2D1_BUFFER_PRECISION_32BPC_FLOAT;
  Context->SetRenderingControls(&renderingControls);
}
```

Set minimum precision on a single effect:

```cpp
if (Context->IsBufferPrecisionSupported(D2D1_BUFFER_PRECISION_32BPC_FLOAT))
{
  hr = Effect->SetValue(D2D1_PROPERTY_PRECISION, D2D1_BUFFER_PRECISION_32BPC_FLOAT);
}
```

Inside an effect implementation:

```cpp
if (EffectContext->IsBufferPrecisionSupported(D2D1_BUFFER_PRECISION_32BPC_FLOAT))
{
  hr = RenderInfo->SetOutputBuffer(D2D1_BUFFER_PRECISION_32BPC_FLOAT, D2D1_CHANNEL_DEPTH_4);
}
```

## Options / Props

Precision selection, in order of the page:

| Mechanism | Scope |
|-----------|-------|
| `ID2D1DeviceContext::SetRenderingControls` (`bufferPrecision`) | All intermediate textures, unless precision is set on effects / transforms. |
| Inputs and render target | Used when no rendering-controls precision or manual precision is set. Input precision propagates downstream; at merging branches the greatest input precision is used. Bitmaps use their pixel format; `ID2D1ImageSource` uses the WIC pixel format of its source. With no inputs, or with an `ID2D1CommandList`, the current render target bitmap decides. |
| `D2D1_PROPERTY_PRECISION` on an effect | Minimum precision at that effect; propagates to downstream effects unless they set their own. Advanced scenarios only. |
| `ID2D1RenderInfo` output buffer in a transform | Does not affect downstream transform nodes. |

Built-in effects with a `ClampOutput` property: Color Matrix, Arithmetic Composite, Convolve, Transfer effects. Set `ClampOutput` to TRUE for consistent results regardless of shader linking (clamping occurs in unpremultiplied space).

Other built-in effects that may output colors beyond [0, 1] in unpremultiplied space: Transforming and Scaling effects (Interpolation Mode Cubic / High Quality Cubic), Lighting effects, Edge detection (Overlay Edges TRUE), Exposure, Composite (Mode Plus), Temperature and Tint, Sepia, Saturation.

## Notes

- Direct2D makes no guarantee if or where intermediate textures are used; this varies by GPU capability and Windows version. In Windows 10, Direct2D uses fewer intermediates due to shader linking, so default-settings results may differ from earlier Windows releases (mainly for graphs where linking is possible and effects emit extended-range colors).
- Linking restrictions: an effect is not linked with consumers of its output if it feeds multiple effects; an effect is not linked with its input effect if it samples the input at a different logical position than its output (a Color Matrix effect may link with its input, a Convolution effect will not).
- To force clamping on effects without `ClampOutput`, insert a Color Matrix effect with `ClampOutput` TRUE and the default (pass-through) `ColorMatrix`.
- Check support with `ID2D1DeviceContext::IsBufferPrecisionSupported` before using high precision. Using a WARP Direct3D device guarantees all buffer precisions regardless of the GPU; recommended e.g. when applying effects to a photo while saving, and on feature level 9.X GPUs.
- Requested precision is a minimum; Direct2D may use higher, and when sharing intermediates it uses the maximum precision requested.
- The source prose says the effect-implementation call is `ID2D1RenderInfo::SetOutputPrecision`, while its code sample calls `RenderInfo->SetOutputBuffer(precision, channelDepth)`; the sample code is reproduced above.
- The source sample calls this on a variable named `Device`; the method exists only on `ID2D1DeviceContext` (and `ID2D1EffectContext`), not on `ID2D1Device`, so the sample above uses the device context.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct2d/precision-and-clipping-in-effect-graphs (commit `ca8274d`).

## Related

- [Effects overview](./effects-overview.md)
- [Effect shader linking](./effect-shader-linking.md)
- [Custom effects](./custom-effects.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1CommandList](./id2d1commandlist.md)
