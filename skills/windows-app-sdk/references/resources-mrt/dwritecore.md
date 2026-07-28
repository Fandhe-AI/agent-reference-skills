# DWriteCore

DWriteCore is the Windows App SDK implementation of DirectWrite, the DirectX API for high-quality, device-independent text layout and rendering. It provides font enumeration, shaping, low-level glyph rendering, and text-layout functionality that runs down to Windows 10 version 1809, independent of the OS's built-in DirectWrite version.

## Signature / Usage

```cpp
// pch.h
#include <dwrite_core.h>   // instead of dwrite_3.h

// Create a factory
winrt::com_ptr<::IDWriteFactory7> spFactory;
winrt::check_hresult(
  ::DWriteCoreCreateFactory(
    DWRITE_FACTORY_TYPE_ISOLATED2,   // new: restricted factory type
    __uuidof(spFactory),
    reinterpret_cast<IUnknown**>(spFactory.put())
  )
);
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `DWriteCoreCreateFactory` | free function | Creates the DWriteCore factory object; functionally equivalent to `DWriteCreateFactory`, renamed to avoid ambiguity with system DirectWrite. |
| `DWRITE_FACTORY_TYPE_ISOLATED2` | enum value (`DWRITE_FACTORY_TYPE`) | New in DWriteCore: a restricted factory that doesn't interact with any cross-process or persistent font cache, and whose system font collection includes only well-known fonts. |
| `IDWriteBitmapRenderTarget2` / `GetBitmapData` | interface / method | New in DWriteCore: retrieves raw pixel data (`DWRITE_BITMAP_DATA_BGRA32`) from a bitmap render target without going through GDI, enabling cross-platform pixel access. |
| `IDWriteGlyphRunAnalysis`, `IDWriteBitmapRenderTarget`, `IDWriteTextLayout`, `IDWriteTextAnalyzer` / `IDWriteTextAnalyzer1` | interfaces | Core DirectWrite interfaces DWriteCore implements for low-level rendering, text layout, underline/strikethrough, vertical text, and shaping. |

## Notes

- Package: `Microsoft.ProjectReunion.DWrite` NuGet package (Windows App SDK), header `dwrite_core.h`, lib `DWriteCore.lib`. Distinct from the platform DirectWrite headers (`dwrite_3.h` / `DWrite.lib`) and unrelated to any UI framework text controls (WinUI 3 `TextBlock`, etc.).
- Porting from DirectWrite requires minimal changes: reference the Windows App SDK package, include `dwrite_core.h` instead of `dwrite_3.h`, link `DWriteCore.lib` instead of `DWrite.lib`, and call `DWriteCoreCreateFactory` instead of `DWriteCreateFactory`.
- DWriteCore does **not** currently interoperate with Direct2D — an `IDWriteTextLayout` created via DWriteCore passed to `ID2D1RenderTarget::DrawTextLayout` will fail.
- `IDWriteGdiInterop::CreateFontFaceFromHdc` returns `E_NOTIMPL` on non-Windows platforms since there is no GDI `HDC` there.
- Current feature set: font enumeration, font API, shaping, low-level rendering (via `IDWriteGlyphRunAnalysis` / `IDWriteBitmapRenderTarget`), basic text layout, color fonts, underline/strikethrough, and vertical text.

## Related

- [resources.pri and MakePri](./resources-pri-makepri.md)
