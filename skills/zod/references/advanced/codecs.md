# Codecs

Bidirectional transformations with encode and decode for safe data serialization and deserialization.

## Codec Fundamentals

Codecs are schemas that support bidirectional transformations:

- **Forward (decode):** `Input -> Output` -- the standard parsing direction
- **Backward (encode):** `Output -> Input` -- the reverse direction

This makes codecs ideal for converting between serialized formats (strings, bytes) and rich runtime types (Date, URL, BigInt).

## Type Safety: `.parse()` vs `.decode()` vs `.encode()`

```typescript
import * as z from "zod";

const codec = z.iso.datetime({ offset: true }).pipe(z.date());

// .parse() — accepts Input, returns Output (same as always)
codec.parse("2024-01-01T00:00:00Z");
// => Date object

// .decode() — accepts Input, returns Output (same as .parse() for codecs)
codec.decode("2024-01-01T00:00:00Z");
// => Date object

// .encode() — accepts Output, returns Input (reverse direction)
codec.encode(new Date("2024-01-01T00:00:00Z"));
// => "2024-01-01T00:00:00.000Z"
```

## Async Variants

Codecs support async operations for schemas with async refinements or transforms:

```typescript
// Safe decode (returns result object instead of throwing)
const result = codec.safeDecode(input);
// => { success: true, data: output } | { success: false, error: ZodError }

// Async decode
await codec.decodeAsync(input);

// Safe async decode
await codec.safeDecodeAsync(input);

// Async encode
await codec.encodeAsync(output);
```

## Encoding Mechanics

### Pipes

When encoding, pipes are traversed in reverse order. The output schema validates first, then the transform is reversed:

```typescript
const myCodec = z
  .string()
  .transform((val) => val.length)
  .pipe(z.number());

myCodec.decode("hello"); // => 5
// forward: string -> transform(length) -> number

myCodec.encode(5);
// reverse: number -> (reverse transform not possible for arbitrary transforms)
```

### Refinements

Refinements are applied during encoding. The schema validates the output value, then the encoded input value is validated against input refinements.

### Two-Pass Validation

Encoding performs two-pass validation:
1. Validate the output value against the output schema
2. Run the reverse transform
3. Validate the resulting input value against the input schema

### Mutating Transforms

Transforms that lose information (like `.transform(val => val.length)`) cannot be reversed. Only use codecs with transforms that have a clear inverse.

## Special Cases

### Defaults and Prefaults (Forward-Only)

`z.default()` and `z.prefault()` only apply in the forward (decode) direction. During encoding, they are skipped:

```typescript
const schema = z.string().default("fallback");

schema.decode(undefined); // => "fallback"
schema.encode("hello");   // => "hello"
```

### Catch (Forward-Only)

`z.catch()` only applies in the forward direction. During encoding, catch handlers are not invoked:

```typescript
const schema = z.string().catch("fallback");

schema.decode(123);      // => "fallback"
schema.encode("hello");  // => "hello"
```

### `z.stringbool()`

`z.stringbool()` is a built-in codec that converts `"true"`/`"false"` strings to booleans:

```typescript
const schema = z.stringbool();

schema.decode("true");  // => true
schema.decode("false"); // => false
schema.encode(true);    // => "true"
schema.encode(false);   // => "false"
```

### Unidirectional Transforms

Schemas using `.transform()` without `.pipe()` are unidirectional -- they support `.parse()` and `.decode()` but not `.encode()`. Calling `.encode()` on a unidirectional transform will throw an error.

## Built-in Codecs

Zod provides 16 built-in codecs for common conversions:

### String to Number

```typescript
z.stringToNumber();
// decode: "42" -> 42
// encode: 42 -> "42"

z.stringToInt();
// decode: "42" -> 42 (must be integer)
// encode: 42 -> "42"
```

### String to BigInt

```typescript
z.stringToBigInt();
// decode: "9007199254740993" -> 9007199254740993n
// encode: 9007199254740993n -> "9007199254740993"
```

### Number to BigInt

```typescript
z.numberToBigInt();
// decode: 42 -> 42n
// encode: 42n -> 42
```

### Date Codecs

```typescript
z.isoDatetimeToDate();
// decode: "2024-01-01T00:00:00Z" -> Date
// encode: Date -> "2024-01-01T00:00:00.000Z"

z.epochSecondsToDate();
// decode: 1704067200 -> Date
// encode: Date -> 1704067200

z.epochMillisToDate();
// decode: 1704067200000 -> Date
// encode: Date -> 1704067200000
```

### JSON Codec

```typescript
z.json();
// decode: '{"key":"value"}' -> { key: "value" }
// encode: { key: "value" } -> '{"key":"value"}'
```

### Byte Codecs

```typescript
z.utf8ToBytes();
// decode: "hello" -> Uint8Array
// encode: Uint8Array -> "hello"

z.bytesToUtf8();
// decode: Uint8Array -> "hello"
// encode: "hello" -> Uint8Array

z.base64ToBytes();
// decode: "aGVsbG8=" -> Uint8Array
// encode: Uint8Array -> "aGVsbG8="

z.base64urlToBytes();
// decode: "aGVsbG8" -> Uint8Array (URL-safe base64)
// encode: Uint8Array -> "aGVsbG8"

z.hexToBytes();
// decode: "68656c6c6f" -> Uint8Array
// encode: Uint8Array -> "68656c6c6f"
```

### URL Codecs

```typescript
z.stringToURL();
// decode: "https://example.com" -> URL
// encode: URL -> "https://example.com"

z.stringToHttpURL();
// decode: "https://example.com" -> URL (only http/https)
// encode: URL -> "https://example.com"
```

### URI Component Codec

```typescript
z.uriComponent();
// decode: "hello%20world" -> "hello world"
// encode: "hello world" -> "hello%20world"
```

## Related

- [Metadata and Registries](./metadata.md)
- [JSON Schema](./json-schema.md)
- [Defining Schemas](../api/README.md)
