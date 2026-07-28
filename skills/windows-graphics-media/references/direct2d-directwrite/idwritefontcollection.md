# IDWriteFontCollection

Encapsulates a set of fonts, such as the fonts installed on the system or the fonts in a particular directory. Used to discover available font families and fonts, and to obtain metadata about them.

## Signature / Usage

```cpp
IDWriteFontCollection* pFontCollection = nullptr;
hr = pDWriteFactory->GetSystemFontCollection(&pFontCollection);

UINT32 familyCount = pFontCollection->GetFontFamilyCount();
for (UINT32 i = 0; i < familyCount; ++i)
{
    IDWriteFontFamily* pFontFamily = nullptr;
    hr = pFontCollection->GetFontFamily(i, &pFontFamily);
}
```

## Options / Props

| Method | Description |
|------|-------------|
| GetFontFamilyCount | Gets the number of font families in the collection. |
| GetFontFamily | Creates an IDWriteFontFamily object given a zero-based index. |
| FindFamilyName | Finds the font family with the specified family name. |
| GetFontFromFontFace | Gets the font object corresponding to the same physical font as a given font face. |

## Notes

- Namespace: Win32 COM (dwrite.h). Obtained via [IDWriteFactory::GetSystemFontCollection](./idwritefactory.md) for the system fonts, or via `CreateCustomFontCollection` for a custom set.
- [IDWriteTextFormat](./idwritetextformat.md) and [IDWriteTextLayout](./idwritetextlayout.md) use the system font collection by default but can use a custom one instead (`SetFontCollection`).

## Related

- [IDWriteFactory](./idwritefactory.md)
- [IDWriteTextFormat](./idwritetextformat.md)
