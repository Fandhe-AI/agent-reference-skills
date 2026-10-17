---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/default-generated-file
---

# DefaultGeneratedFile

A concrete implementation of the `GeneratedFile` interface that provides lazy conversion between base64 and Uint8Array formats.

## Signature / Usage

```ts
import { DefaultGeneratedFile } from 'ai';

const file = new DefaultGeneratedFile({
  data: uint8ArrayData,
  mediaType: 'image/png',
});

console.log(file.base64); // Automatically converted to base64
console.log(file.uint8Array); // Original Uint8Array
```

## Options / Props

Constructor parameters:

| Name | Type | Description |
| --- | --- | --- |
| data | `string \| Uint8Array` | The file data as either a base64 encoded string or Uint8Array. |
| mediaType | `string` | The IANA media type of the file. |

Properties:

| Name | Type | Description |
| --- | --- | --- |
| base64 | `string` | File as a base64 encoded string. Lazily converted from Uint8Array if needed. |
| uint8Array | `Uint8Array` | File as a Uint8Array. Lazily converted from base64 if needed. |
| mediaType | `string` | The IANA media type of the file. |

## Related

- [generateText](./generate-text.md)
