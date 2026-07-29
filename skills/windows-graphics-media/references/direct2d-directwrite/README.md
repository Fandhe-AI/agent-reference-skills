# Direct2D & DirectWrite

| Name | Description | Path |
| --- | --- | --- |
| D2D1CreateFactory | Creates an ID2D1Factory/ID2D1Factory1 instance. | [d2d1createfactory.md](./d2d1createfactory.md) |
| Direct2D and Direct3D interoperability | Drawing Direct2D content onto Direct3D surfaces (and vice versa) via DXGI. | [direct2d-direct3d-interop.md](./direct2d-direct3d-interop.md) |
| DWRITE_TEXT_METRICS | Overall metrics of a formatted text layout. | [dwrite-text-metrics.md](./dwrite-text-metrics.md) |
| DWriteCore | Windows App SDK implementation of DirectWrite (DWriteCoreCreateFactory). | [dwritecore.md](./dwritecore.md) |
| ID2D1Bitmap1 | Bitmap surface usable as a device context target or source, with color context. | [id2d1bitmap1.md](./id2d1bitmap1.md) |
| ID2D1BitmapBrush | Paints an area with a bitmap. Like all brushes it defines an infinite plane of content; since bitmaps are finite, the brush relies on horizontal and vertical extend modes to determine how the plane is filled beyond the bitmap bounds (tiling, clamping, or mirroring). | [id2d1bitmapbrush.md](./id2d1bitmapbrush.md) |
| ID2D1CommandList | Represents a sequence of Direct2D drawing commands that can be recorded once and replayed with full vector fidelity. Bitmaps, effects, and geometries are stored as references while brushes are stored by value, so all resource creation/destruction happens outside the command list itself. | [id2d1commandlist.md](./id2d1commandlist.md) |
| ID2D1Device | Resource domain from which device contexts are created. | [id2d1device.md](./id2d1device.md) |
| ID2D1DeviceContext | Render target extension for effects, DXGI-surface bitmaps, and image drawing. | [id2d1devicecontext.md](./id2d1devicecontext.md) |
| ID2D1Effect | Image-processing construct with inputs/output for building effect graphs. | [id2d1effect.md](./id2d1effect.md) |
| ID2D1Factory | Creates Direct2D resources (render targets, geometries, drawing state blocks). | [id2d1factory.md](./id2d1factory.md) |
| ID2D1Factory1 | Extends ID2D1Factory with device creation and effect registration. | [id2d1factory1.md](./id2d1factory1.md) |
| ID2D1Geometry | Base geometry resource: bounds, hit-testing, combine/simplify/outline/tessellate. | [id2d1geometry.md](./id2d1geometry.md) |
| ID2D1GeometrySink | Sink used to build a path geometry's figures and segments. | [id2d1geometrysink.md](./id2d1geometrysink.md) |
| ID2D1Layer | Represents the backing store required to render a layer — an offscreen buffer used with `PushLayer`/`PopLayer` to apply an opacity, opacity-mask brush, or geometric mask to a group of drawing operations. `PushAxisAlignedClip`/`PopAxisAlignedClip` provide a lighter-weight, layer-free alternative for simple rectangular clipping. | [id2d1layer.md](./id2d1layer.md) |
| ID2D1LinearGradientBrush | Paints an area with a linear gradient. | [id2d1lineargradientbrush.md](./id2d1lineargradientbrush.md) |
| ID2D1PathGeometry | Complex shape composed of arcs, curves, and lines, populated via a geometry sink. | [id2d1pathgeometry.md](./id2d1pathgeometry.md) |
| ID2D1RadialGradientBrush | Paints an area with a radial gradient defined by an ellipse (center, x-radius, y-radius) and a gradient origin offset, mapping gradient stop position 0.0 to the origin and 1.0 to the ellipse boundary. | [id2d1radialgradientbrush.md](./id2d1radialgradientbrush.md) |
| ID2D1RenderTarget | Base drawing surface interface: BeginDraw/EndDraw, Clear, Draw*/Fill*, SetTransform. | [id2d1rendertarget.md](./id2d1rendertarget.md) |
| ID2D1SolidColorBrush | Paints an area with a solid color. | [id2d1solidcolorbrush.md](./id2d1solidcolorbrush.md) |
| ID2D1StrokeStyle | Describes caps, miter limit, line join, and dash pattern for a stroke. | [id2d1strokestyle.md](./id2d1strokestyle.md) |
| ID2D1SvgDocument | Represents an SVG document loaded into Direct2D, exposing its element tree (`GetRoot`/`SetRoot`), viewport size, and helpers for building/serializing SVG content (`CreatePaint`, `CreatePathData`, `CreatePointCollection`, `CreateStrokeDashArray`, `Serialize`, `Deserialize`, `FindElementById`). | [id2d1svgdocument.md](./id2d1svgdocument.md) |
| IDWriteFactory | Root factory interface for all DirectWrite objects. | [idwritefactory.md](./idwritefactory.md) |
| IDWriteFontCollection | A set of fonts (e.g. system fonts) with family/metadata enumeration. | [idwritefontcollection.md](./idwritefontcollection.md) |
| IDWriteFontFace / IDWriteFontFile | `IDWriteFontFace` exposes low-level, glyph-level font data — metrics, glyph outlines, and glyph indices — for a single physical font face, as distinct from `IDWriteFontCollection` (family/font enumeration) and `IDWriteTextLayout` (formatted text). `IDWriteFontFile` represents the underlying font file(s) backing a face and is used to check whether a file is a supported font type. | [idwritefontface.md](./idwritefontface.md) |
| IDWriteTextFormat | Font and paragraph properties used to format text (single format). | [idwritetextformat.md](./idwritetextformat.md) |
| IDWriteTextLayout | Fully analyzed and formatted block of text; supports per-range formatting and hit-testing. | [idwritetextlayout.md](./idwritetextlayout.md) |
| Windows Imaging Component (WIC) interop | Decoding/converting images with WIC for use as Direct2D bitmaps. | [wic-interop.md](./wic-interop.md) |
