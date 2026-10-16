# DataUtils

Utility functions for data: conversion between half precision (FP16) and single precision (FP32) floats.

## Signature / Usage

```js
DataUtils.fromHalfFloat( val : number ) : number // FP16 -> FP32
DataUtils.toHalfFloat( val : number ) : number   // FP32 -> FP16
```

## Methods

| Name | Parameters | Returns |
|------|------------|---------|
| `fromHalfFloat` | `val` : a half precision floating point value | The FP32 value |
| `toHalfFloat` | `val` : a single precision floating point value | The FP16 value |

## Notes

- Source: https://threejs.org/docs/pages/DataUtils.html (three.js r186, `src/extras/DataUtils.js`)

## Related

- [ImageUtils](./ImageUtils.md)
- [TextureUtils](./TextureUtils.md)
