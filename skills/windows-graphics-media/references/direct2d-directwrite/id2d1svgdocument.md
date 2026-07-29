# ID2D1SvgDocument

Represents an SVG document loaded into Direct2D, exposing its element tree (`GetRoot`/`SetRoot`), viewport size, and helpers for building/serializing SVG content (`CreatePaint`, `CreatePathData`, `CreatePointCollection`, `CreateStrokeDashArray`, `Serialize`, `Deserialize`, `FindElementById`).

## Signature / Usage

```cpp
ID2D1SvgDocument* pSvgDocument = nullptr;
hr = pDeviceContext5->CreateSvgDocument(
    pSvgFileStream,               // IStream* with the SVG XML, or nullptr for an empty document
    D2D1::SizeF(480, 480),        // initial viewport size
    &pSvgDocument
    );

pDeviceContext5->BeginDraw();
pDeviceContext5->DrawSvgDocument(pSvgDocument);
hr = pDeviceContext5->EndDraw();
```

## Options / Props

| Method | Description |
|------|-------------|
| GetRoot / SetRoot | Gets/sets the root `ID2D1SvgElement` of the document tree. |
| GetViewportSize / SetViewportSize | Gets/sets the size of the initial SVG viewport. |
| FindElementById | Gets the SVG element with the specified `id` attribute. |
| Serialize | Serializes an element and its subtree to UTF-8-encoded XML. |
| Deserialize | Deserializes a single-root XML subtree from a stream (not inserted into the document tree automatically). |
| CreatePaint | Creates an `ID2D1SvgPaint` for use with `fill`/`stroke` properties. |
| CreatePathData | Creates path data for a `path` element's `d` attribute. |
| CreatePointCollection | Creates a points object for a `polygon`/`polyline` element. |
| CreateStrokeDashArray | Creates a dash-array object for the `stroke-dasharray` property. |

## Notes

- Namespace: Win32 COM (d2d1svg.h). Inherits from ID2D1Resource. Created via `ID2D1DeviceContext5::CreateSvgDocument` and rendered with `ID2D1DeviceContext5::DrawSvgDocument`; both members require D2D1_3 (Windows 10 Creators Update / DeviceContext5).
- First-class SVG rendering support, added in Direct2D 1.3; independent of the effect/image pipeline used by [ID2D1CommandList](./id2d1commandlist.md).

## Related

- [ID2D1DeviceContext](./id2d1devicecontext.md)
- [ID2D1Device](./id2d1device.md)
