# DWriteCore

DWriteCore is the Windows App SDK implementation of DirectWrite, providing access to all current DirectWrite features (device-independent text layout, hardware-accelerated text, multi-format text, wide language support) down to Windows 10 version 1809, independent of the OS's built-in DirectWrite version.

## Signature / Usage

```cpp
// Call DWriteCoreCreateFactory instead of DWriteCreateFactory.
IDWriteFactory7* pDWriteFactory = nullptr;
hr = DWriteCoreCreateFactory(
    DWRITE_FACTORY_TYPE_SHARED,
    __uuidof(IDWriteFactory7),
    reinterpret_cast<IUnknown**>(&pDWriteFactory)
    );
```

## Options / Props

| API | Description |
|------|-------------|
| DWriteCoreCreateFactory | Windows App SDK equivalent of [DWriteCreateFactory](./idwritefactory.md); returns an IDWriteFactory7. |

## Notes

- Namespace: Windows App SDK (`Microsoft.Graphics.DirectX` packaging; nano-COM API using IUnknown-derived interfaces, not the COM runtime).
- Use DWriteCore instead of the OS DirectWrite when you need the newest DirectWrite APIs regardless of the customer's Windows version; runs on Windows 10 1809+.
- Once created, `IDWriteFactory7` from DWriteCore is used the same way as [IDWriteFactory](./idwritefactory.md) (CreateTextFormat, CreateTextLayout, etc.).

## Related

- [IDWriteFactory](./idwritefactory.md)
