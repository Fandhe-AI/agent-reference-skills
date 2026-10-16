# Direct2D effects overview (effect graph, applying effects to primitives)

Direct2D effects apply high quality, GPU-accelerated image processing (built on Direct3D 11) to an image or a set of images. Effects take zero or more input images, expose properties, and produce a single output image; they can be chained into an effect graph.

## Signature / Usage

```cpp
// Apply an effect to an image (ID2D1DeviceContext + WIC bitmap source assumed to exist)
ComPtr<ID2D1Effect> bitmapSourceEffect;
DX::ThrowIfFailed(m_d2dContext->CreateEffect(CLSID_D2D1BitmapSource, &bitmapSourceEffect));
DX::ThrowIfFailed(bitmapSourceEffect->SetValue(D2D1_BITMAPSOURCE_PROP_WIC_BITMAP_SOURCE, m_wicBitmapSource.Get()));

ComPtr<ID2D1Effect> gaussianBlurEffect;
DX::ThrowIfFailed(m_d2dContext->CreateEffect(CLSID_D2D1GaussianBlur, &gaussianBlurEffect));
gaussianBlurEffect->SetInputEffect(0, bitmapSourceEffect.Get());
DX::ThrowIfFailed(gaussianBlurEffect->SetValue(D2D1_GAUSSIANBLUR_PROP_STANDARD_DEVIATION, 6.0f));

m_d2dContext->BeginDraw();
m_d2dContext->Clear(D2D1::ColorF(D2D1::ColorF::CornflowerBlue));
m_d2dContext->DrawImage(gaussianBlurEffect.Get());
HRESULT hr = m_d2dContext->EndDraw();
```

Building an effect graph (shadow, 2D transform, composite):

```cpp
shadowEffect->SetInput(0, bitmap.Get());
affineTransformEffect->SetInputEffect(0, shadowEffect.Get());
affineTransformEffect->SetValue(D2D1_2DAFFINETRANSFORM_PROP_TRANSFORM_MATRIX,
                                D2D1::Matrix3x2F::Translation(20, 20));
compositeEffect->SetInputEffect(0, affineTransformEffect.Get());
compositeEffect->SetInput(1, bitmap.Get());

m_d2dContext->BeginDraw();
m_d2dContext->DrawImage(compositeEffect.Get());
m_d2dContext->EndDraw();
```

## Options / Props

Built-in effect categories (full list in [built-in-effects.md](./built-in-effects.md)): Filtering, Composition and Blending, Transparency, Color, Lighting and Stylizing, Transforming and Scaling, Sources.

| Topic | Description |
|-------|-------------|
| Effect shader linking | Combines multiple effect graph rendering passes into a single pass. |
| Custom effects | Write your own effects using standard HLSL. |
| Precision and numerical clipping | Controlling numerical precision in effect graphs. |
| Applying effects to primitives | Apply effect graphs to Direct2D / DirectWrite primitives rendered to an intermediate surface. |

## Notes

- Each effect creates an internal transform graph of individual transforms; a transform houses the shaders run per output pixel (pixel shaders, vertex shaders, the GPU blend stage, compute shaders). Built-in and custom effects work the same way.
- Effects can be applied to any bitmap: WIC images, Direct2D primitives, DirectWrite text, or Direct3D scenes.
- Effects take `ID2D1Image` inputs. `ID2D1Bitmap` derives from `ID2D1Image`; use `ID2D1Effect::GetOutput` to get an effect's output as an `ID2D1Image`, or `SetInputEffect`, which converts the output for you.
- `DrawImage` must be called between `BeginDraw` and `EndDraw` like other Direct2D render operations.
- Spatial transform effects offer nearest neighbor, linear, cubic, multi-sample linear, anisotropic, and high quality cubic modes. Anisotropic mode generates mipmaps when scaling; set the `Cached` property to true on the effects that feed the transform so mipmaps are not regenerated every time for sufficiently small images.
- Composite (`CLSID_D2D1Composite`) and arithmetic composite (`CLSID_D2D1ArithmeticComposite`) effects have multiple inputs; specify the correct input index for each image. The blend effect offers GPU-accelerated blend modes.
- Custom effects are connected the same way after registration with `ID2D1Factory1::RegisterEffectFromString`; CLSIDs for built-in effects are defined in d2d1effects.h.
- Applying effects to primitives (how-to): render the primitives to an intermediate surface, then use it as `SetInput` of the graph. The sample graph is Gaussian Blur -> Point Specular Lighting -> Composite (`D2D1_COMPOSITE_MODE_SOURCE_IN`) -> Arithmetic Composite (coefficients `D2D1::Vector4F(0.0f, 1.0f, 1.0f, 0.0f)`). The Gaussian blur blurs all channels including alpha; point specular lighting uses the input alpha as a height map.

```cpp
// From "How to Apply Effects to Primitives": connect the graph
gaussianBlurEffect->SetInput(0, m_inputImage.Get());
specularLightingEffect->SetInputEffect(0, gaussianBlurEffect.Get());
compositeEffect->SetInput(0, m_inputImage.Get());
compositeEffect->SetInputEffect(1, specularLightingEffect.Get());
m_arithmeticCompositeEffect->SetInput(0, m_inputImage.Get());
m_arithmeticCompositeEffect->SetInputEffect(1, compositeEffect.Get());
```

- The official step 2 snippet refers to m_bitmapSourceEffect; unified to the local bitmapSourceEffect here.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct2d/effects-overview and https://learn.microsoft.com/en-us/windows/win32/direct2d/how-to-apply-effects-to-primitives (learn.microsoft.com win32 docs at commit `ca8274d`).

## Related

- [ID2D1Effect](./id2d1effect.md)
- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [Built-in effects](./built-in-effects.md)
- [Custom effects](./custom-effects.md)
- [Effect shader linking](./effect-shader-linking.md)
- [Precision and clipping in effect graphs](./effect-precision-and-clipping.md)
