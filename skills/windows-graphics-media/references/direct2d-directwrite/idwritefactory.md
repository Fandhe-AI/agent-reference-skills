# IDWriteFactory

Used to create all subsequent DirectWrite objects. This is the root factory interface for all DirectWrite objects.

## Signature / Usage

```cpp
IDWriteFactory* pDWriteFactory = nullptr;
hr = DWriteCreateFactory(
    DWRITE_FACTORY_TYPE_SHARED,
    __uuidof(IDWriteFactory),
    reinterpret_cast<IUnknown**>(&pDWriteFactory)
    );
```

## Options / Props

| Method | Description |
|------|-------------|
| CreateTextFormat | Creates an [IDWriteTextFormat](./idwritetextformat.md) used for text layout. |
| CreateTextLayout | Takes a string, text format, and constraints and produces an [IDWriteTextLayout](./idwritetextlayout.md). |
| CreateGdiCompatibleTextLayout | Produces a text layout formatted for a particular display resolution/measuring mode. |
| GetSystemFontCollection | Gets an [IDWriteFontCollection](./idwritefontcollection.md) representing the set of installed fonts. |
| CreateCustomFontCollection | Creates a font collection using a custom font collection loader. |
| CreateFontFace | Creates an object representing a font face. |
| CreateRenderingParams / CreateMonitorRenderingParams / CreateCustomRenderingParams | Creates text rendering parameter objects. |
| CreateTextAnalyzer | Returns an interface for performing text analysis (script/bidi/line-breaking). |
| GetGdiInterop | Creates an object for interoperability with GDI. |
| RegisterFontFileLoader / RegisterFontCollectionLoader | Registers custom font file/collection loaders. |

## Notes

- Namespace: Win32 COM (dwrite.h). Created via `DWriteCreateFactory`. Distinct from [DWriteCore's DWriteCoreCreateFactory](./dwritecore.md), the Windows App SDK equivalent.
- `DWRITE_FACTORY_TYPE_SHARED` is recommended for most apps (shared state, less memory); `DWRITE_FACTORY_TYPE_ISOLATED` gives a separate state.

## Related

- [IDWriteTextFormat](./idwritetextformat.md)
- [IDWriteTextLayout](./idwritetextlayout.md)
- [IDWriteFontCollection](./idwritefontcollection.md)
- [DWriteCore](./dwritecore.md)
