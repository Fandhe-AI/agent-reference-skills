# Direct2D built-in effects (CLSID_D2D1* catalog)

The set of built-in Direct2D effects, by category, with the CLSID used in `ID2D1DeviceContext::CreateEffect`.

## Signature / Usage

```cpp
ComPtr<ID2D1Effect> gaussianBlurEffect;
DX::ThrowIfFailed(m_d2dContext->CreateEffect(CLSID_D2D1GaussianBlur, &gaussianBlurEffect));
DX::ThrowIfFailed(gaussianBlurEffect->SetValue(D2D1_GAUSSIANBLUR_PROP_STANDARD_DEVIATION, 6.0f));
```

## Options / Props

| Category | Effect (CLSID) |
|----------|----------------|
| Color | 3D lookup table (CLSID_D2D1LookupTable3D); Color management (CLSID_D2D1ColorManagement); Color matrix (CLSID_D2D1ColorMatrix); Discrete transfer (CLSID_D2D1DiscreteTransfer); DPI compensation (CLSID_D2D1DpiCompensation); Gamma transfer (CLSID_D2D1GammaTransfer); HDR tone map (CLSID_D2D1HdrToneMap); Hue to RGB (CLSID_D2D1HueToRgb); Hue rotation (CLSID_D2D1HueRotation); Linear transfer (CLSID_D2D1LinearTransfer); Opacity metadata (CLSID_D2D1OpacityMetadata); Premultiply (CLSID_D2D1Premultiply); RGB to Hue (CLSID_D2D1RgbToHue); Saturation (CLSID_D2D1Saturation); Table transfer (CLSID_D2D1TableTransfer); Tint (CLSID_D2D1Tint); Unpremultiply (CLSID_D2D1UnPremultiply); White level adjustment (CLSID_D2D1WhiteLevelAdjustment); YCbCr (CLSID_D2D1YCbCr) |
| Composition | Alpha mask (CLSID_D2D1AlphaMask); Arithmetic composite (CLSID_D2D1ArithmeticComposite); Blend (CLSID_D2D1Blend); Composite (CLSID_D2D1Composite); Cross fade (CLSID_D2D1CrossFade) |
| Filter | Convolve matrix (CLSID_D2D1ConvolveMatrix); Directional blur (CLSID_D2D1DirectionalBlur); Edge detection (CLSID_D2D1EdgeDetection); Gaussian blur (CLSID_D2D1GaussianBlur); Morphology (CLSID_D2D1Morphology) |
| Lighting and Stylizing | Displacement map (CLSID_D2D1DisplacementMap); Distant-diffuse (CLSID_D2D1DistantDiffuse); Distant-specular (CLSID_D2D1DistantSpecular); Emboss (CLSID_D2D1Emboss); Point-diffuse (CLSID_D2D1PointDiffuse); Point-specular (CLSID_D2D1PointSpecular); Posterize (CLSID_D2D1Posterize); Shadow (CLSID_D2D1Shadow); Spot-diffuse (CLSID_D2D1SpotDiffuse); Spot-specular (CLSID_D2D1SpotSpecular) |
| Photo | Brightness (CLSID_D2D1Brightness); Contrast (CLSID_D2D1Contrast); Exposure (CLSID_D2D1Exposure); Grayscale (CLSID_D2D1Grayscale); Highlights and shadows (CLSID_D2D1HighlightsShadows); Histogram (CLSID_D2D1Histogram); Invert (CLSID_D2D1Invert); Sepia (CLSID_D2D1Sepia); Sharpen (CLSID_D2D1Sharpen); Straighten (CLSID_D2D1Straighten); Temperature and tint (CLSID_D2D1TemperatureTint); Vignette (CLSID_D2D1Vignette) |
| Source | Bitmap source (CLSID_D2D1BitmapSource); Flood (CLSID_D2D1Flood); Turbulence (CLSID_D2D1Turbulence) |
| Transform | 2D affine transform (CLSID_D2D12DAffineTransform); 3D transform (CLSID_D2D13DTransform); 3D perspective transform (CLSID_D2D13DPerspectiveTransform); Atlas (CLSID_D2D1Atlas); Border (CLSID_D2D1Border); Crop (CLSID_D2D1Crop); Scale (CLSID_D2D1Scale); Tile (CLSID_D2D1Tile) |
| Transparency | Chroma-key (CLSID_D2D1ChromaKey); Luminance to alpha (CLSID_D2D1LuminanceToAlpha); Opacity (CLSID_D2D1Opacity) |

Requirements:

| Requirement | Value |
|-------------|-------|
| Minimum supported client / server | Windows 8 and Platform Update for Windows 7 [desktop apps / Windows Store apps] |
| Header | d2d1effects.h |
| Library | d2d1.lib, dxguid.lib |

## Notes

- The Requirements table is reproduced as-is from the catalog page and applies to the original (Windows 8) effect set; effects added later (e.g. Alpha mask, Cross fade, Tint, HDR tone map, White level adjustment, YCbCr) are declared in d2d1effects_1.h / d2d1effects_2.h and require newer Windows versions. Check each effect's own page for its minimum OS and header.
- This page lists the CLSIDs only; per-effect property enumerations (e.g. `D2D1_GAUSSIANBLUR_PROP_STANDARD_DEVIATION`) are documented on each effect's own page and are not reproduced here.
- Built-in effects support effect shader linking, and some may emit colors outside [0, 1]; see the precision page for `ClampOutput` handling.
- The effects overview page also names the categories "Filtering", "Composition and Blending", "Transparency", "Color", "Lighting and Stylizing", "Transforming and Scaling" and "Sources"; the headings above follow this catalog page.
- Source: https://learn.microsoft.com/en-us/windows/win32/direct2d/built-in-effects (commit `ca8274d`).

## Related

- [Effects overview](./effects-overview.md)
- [Custom effects](./custom-effects.md)
- [Effect shader linking](./effect-shader-linking.md)
- [Precision and clipping in effect graphs](./effect-precision-and-clipping.md)
- [ID2D1Effect](./id2d1effect.md)
