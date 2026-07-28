# ID2D1Effect

Represents a basic image-processing construct in Direct2D. An effect takes zero or more input images and produces one output image; inputs/outputs are lazily evaluated, allowing arbitrary effect graphs.

## Signature / Usage

```cpp
ID2D1Effect* pEffect = nullptr;
hr = pContext->CreateEffect(CLSID_D2D1GaussianBlur, &pEffect);
pEffect->SetInput(0, pBitmap);
pEffect->SetValue(D2D1_GAUSSIANBLUR_PROP_STANDARD_DEVIATION, 5.0f);

pContext->BeginDraw();
pContext->DrawImage(pEffect);
hr = pContext->EndDraw();
```

## Options / Props

| Method | Description |
|------|-------------|
| SetInput / GetInput | Sets/gets an input image by index. |
| SetInputCount | Changes the number of inputs to the effect. |
| SetInputEffect | Sets an input effect by index, chaining effect output into this effect's input. |
| GetOutput | Gets the output image from the effect (an ID2D1Image usable with DrawImage). |
| GetInputCount | Gets the number of inputs to the effect. |

## Notes

- Namespace: Win32 COM (d2d1_1.h). Inherits from ID2D1Properties (property get/set via `SetValue`/`GetValue`). Created via [ID2D1DeviceContext::CreateEffect](./id2d1devicecontext.md).
- Built-in effects use predefined CLSIDs (e.g. `CLSID_D2D1GaussianBlur`); custom effects can be registered via [ID2D1Factory1](./id2d1factory1.md).
- Draw an effect's output with [ID2D1DeviceContext::DrawImage](./id2d1devicecontext.md).

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1Factory1](./id2d1factory1.md)
