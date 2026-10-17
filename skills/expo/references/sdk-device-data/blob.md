---
source: https://docs.expo.dev/versions/v58.0.0/sdk/blob/
---

# Blob

`expo-blob` provides a web standards-compliant `Blob` implementation for React Native. It is more reliable than the implementation exported from `react-native`, which has limitations with `slice()` and other Web API features.

## Signature / Usage

```sh
npx expo install expo-blob
```

```typescript
import { Blob } from 'expo-blob';

// Create a blob from text
const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' });

console.log(textBlob.size); // 13 (bytes)
console.log(textBlob.type); // "text/plain"

console.log(await textBlob.text()); // "Hello, World!"
const bytes = await textBlob.bytes(); // Uint8Array
const arrayBuffer = await textBlob.arrayBuffer(); // ArrayBuffer

// Slice
const slice = textBlob.slice(0, 5);
console.log(await slice.text()); // "Hello"
const htmlSlice = textBlob.slice(0, 5, 'text/html');
console.log(htmlSlice.type); // "text/html"

// Stream
const reader = textBlob.stream().getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log('Chunk:', value);
}
```

Mixed content (strings and binary parts):

```typescript
const mixedBlob = new Blob(['Text content', new Uint8Array([65, 66, 67]), 'More text'], {
  type: 'text/plain',
});
```

## Options / Props

`Blob` properties (read only; Android, iOS, Web):

| Name | Type | Description |
| --- | --- | --- |
| size | `number` | The size of the `Blob` in bytes. |
| type | `string` | The MIME type of the `Blob`, or the empty string if the type cannot be determined. |

`Blob` methods (Android, iOS, Web):

| Name | Returns | Description |
| --- | --- | --- |
| `arrayBuffer()` | `Promise<ArrayBuffer>` | The `Blob`'s binary data as an `ArrayBuffer`. |
| `bytes()` | `Promise<Uint8Array<ArrayBufferLike>>` | The `Blob`'s binary data as a `Uint8Array`. |
| `slice(start?, end?, contentType?)` | `Blob` | New `Blob` containing the data in the specified byte range of the source `Blob`. |
| `stream()` | `ReadableStream` | A `ReadableStream` of the `Blob`'s data. |
| `text()` | `Promise<string>` | The entire contents of the `Blob` as a UTF-8 string. |

`slice` parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| start (optional) | `number` | Starting byte index (inclusive), a signed 32 bit integer (up to 2^31 - 1). |
| end (optional) | `number` | Ending byte index (exclusive), a signed 32 bit integer (up to 2^31 - 1). |
| contentType (optional) | `string` | MIME type of the new `Blob`. Defaults to an empty string. |

`BlobPart` (union): `string` | `ArrayBuffer` | `ArrayBufferView` | `Blob`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- `stream()`: the current implementation loads the entire `Blob` into memory before streaming.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-blob

## Related

- [FileSystem](./filesystem.md)
