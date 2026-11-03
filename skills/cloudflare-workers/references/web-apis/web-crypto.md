---
source: https://developers.cloudflare.com/workers/runtime-apis/web-crypto/
---

# Web Crypto

The Web Crypto API provides low-level functions for common cryptographic tasks. The Workers runtime implements the full surface of this API, with some differences in supported algorithms. It is implemented through the `SubtleCrypto` interface, accessible via the global `crypto.subtle` binding.

## Signature / Usage

```js
const myText = new TextEncoder().encode('Hello world!');

const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
  myText // The data you want to hash as an ArrayBuffer
);

console.log(new Uint8Array(myDigest));
```

`crypto.DigestStream(algorithm)` (non-standard extension; a `WritableStream` that does not retain data and generates a hash digest when the data flow ends). `algorithm` is a string | object in an algorithm-specific format.

```js
export default {
  async fetch(req) {
    // Fetch from origin
    const res = await fetch(req);

    // We need to read the body twice so we `tee` it (get two instances)
    const [bodyOne, bodyTwo] = res.body.tee();
    // Make a new response so we can set the headers (responses from `fetch` are immutable)
    const newRes = new Response(bodyOne, res);
    // Create a SHA-256 digest stream and pipe the body into it
    const digestStream = new crypto.DigestStream("SHA-256");
    bodyTwo.pipeTo(digestStream);
    // Get the final result
    const digest = await digestStream.digest;
    // Turn it into a hex string
    const hexString = [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    // Set a header with the SHA-256 hash and return the response
    newRes.headers.set("x-content-digest", `SHA-256=${hexString}`);
    return newRes;
  }
}
```

`generateKey` example:

```js
let keyPair = await crypto.subtle.generateKey(
  {
    name: 'AES-GCM',
    length: 256,
  },
  true,
  ['encrypt', 'decrypt']
);
```

## Options / Props

### `crypto` methods

| Name | Returns | Description |
|------|---------|-------------|
| `crypto.randomUUID()` | string | Generates a new random (version 4) UUID as defined in RFC 4122. |
| `crypto.getRandomValues(buffer)` | ArrayBufferView | Fills the passed `ArrayBufferView` with cryptographically sound random values and returns the `buffer`. `buffer` must be an Int8Array \| Uint8Array \| Uint8ClampedArray \| Int16Array \| Uint16Array \| Int32Array \| Uint32Array \| BigInt64Array \| BigUint64Array. |

### `crypto.subtle` methods

Algorithm parameters use algorithm-specific formats documented on MDN.

| Method | Returns | Parameters / Description |
|--------|---------|--------------------------|
| `encrypt(algorithm, key, data)` | Promise\<ArrayBuffer> | `algorithm` object; `key` CryptoKey; `data` BufferSource. Fulfills with the encrypted data. |
| `decrypt(algorithm, key, data)` | Promise\<ArrayBuffer> | `algorithm` object; `key` CryptoKey; `data` BufferSource. Fulfills with the clear data. |
| `sign(algorithm, key, data)` | Promise\<ArrayBuffer> | `algorithm` string \| object; `key` CryptoKey; `data` BufferSource. Fulfills with the signature. |
| `verify(algorithm, key, signature, data)` | Promise\<boolean> | `algorithm` string \| object; `key` CryptoKey; `signature` BufferSource; `data` BufferSource. Whether the signature matches. |
| `digest(algorithm, data)` | Promise\<ArrayBuffer> | `algorithm` string \| object; `data` BufferSource. |
| `generateKey(algorithm, extractable, keyUsages)` | Promise\<CryptoKey> \| Promise\<CryptoKeyPair> | `algorithm` object; `extractable` bool; `keyUsages` Array of strings. CryptoKey for symmetric algorithms, CryptoKeyPair for asymmetric. |
| `deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages)` | Promise\<CryptoKey> | `algorithm` object; `baseKey` CryptoKey; `derivedKeyAlgorithm` object (algorithm the derived key will be used for); `extractable` bool; `keyUsages` Array. |
| `deriveBits(algorithm, baseKey, length)` | Promise\<ArrayBuffer> | `algorithm` object; `baseKey` CryptoKey; `length` int (length of the bit string to derive). Like `deriveKey()` but returns an `ArrayBuffer`; `deriveKey()` is essentially `deriveBits()` followed by `importKey()`. |
| `importKey(format, keyData, algorithm, extractable, keyUsages)` | Promise\<CryptoKey> | `format` string; `keyData` BufferSource, or JsonWebKey when `format` is `"jwk"`; `algorithm` object; `extractable` bool; `keyUsages` Array. Transforms an external portable key into a `CryptoKey`. |
| `exportKey(format, key)` | Promise\<ArrayBuffer \| JsonWebKey> | `format` string; `key` CryptoKey. Transforms a `CryptoKey` into a portable format, if `extractable`. Fulfills with a JsonWebKey object when `format` is `"jwk"`, otherwise an ArrayBuffer. |
| `wrapKey(format, key, wrappingKey, wrapAlgo)` | Promise\<ArrayBuffer> | `format` string; `key` CryptoKey; `wrappingKey` CryptoKey; `wrapAlgo` object. Exports the key then encrypts it with another key. |
| `unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgo, unwrappedKeyAlgo, extractable, keyUsages)` | Promise\<CryptoKey> | `format` string; `wrappedKey` BufferSource (the bytes produced by `wrapKey()`); `unwrappingKey` CryptoKey; `unwrapAlgo` object; `unwrappedKeyAlgo` object; `extractable` bool; `keyUsages` Array. Transforms a key wrapped by `wrapKey()` back into a `CryptoKey`. |
| `timingSafeEqual(a, b)` | bool | `a`, `b`: ArrayBuffer \| TypedArray. Compares two buffers resistant to timing attacks. Non-standard extension. |

### Supported algorithms

Workers implements all operations of the WebCrypto standard. Operations marked (Y) are believed to be fully supported.

| Algorithm | sign / verify | encrypt / decrypt | digest | deriveBits / deriveKey | generateKey | wrapKey / unwrapKey | exportKey | importKey |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RSASSA PKCS1 v1.5 | Y | | | | Y | | Y | Y |
| RSA PSS | Y | | | | Y | | Y | Y |
| RSA OAEP | | Y | | | Y | Y | Y | Y |
| ECDSA | Y | | | | Y | | Y | Y |
| ECDH | | | | Y | Y | | Y | Y |
| Ed25519 (1) | Y | | | | Y | | Y | Y |
| X25519 (1) | | | | Y | Y | | Y | Y |
| NODE ED25519 (2) | Y | | | | Y | | Y | Y |
| AES CTR | | Y | | | Y | Y | Y | Y |
| AES CBC | | Y | | | Y | Y | Y | Y |
| AES GCM | | Y | | | Y | Y | Y | Y |
| AES KW | | | | | Y | Y | Y | Y |
| HMAC | Y | | | | Y | | Y | Y |
| SHA 1 / SHA 256 / SHA 384 / SHA 512 | | | Y | | | | | |
| MD5 (3) | | | Y | | | | | |
| HKDF | | | | Y | | | | Y |
| PBKDF2 | | | | Y | | | | Y |

Footnotes:

1. Algorithms as specified in the Secure Curves API.
2. Legacy non-standard EdDSA is supported for the Ed25519 curve in addition to the Secure Curves version. Use `NODE-ED25519` as the algorithm and `namedCurve` parameters. Unlike NodeJS, Cloudflare will not support raw import of private keys. The implementation may change over time; Cloudflare will strive to maintain backward compatibility and compatibility with NodeJS's behavior.
3. MD5 is not part of the WebCrypto standard but is supported for legacy systems that require MD5. MD5 is weak; do not rely upon it for security.

Modern algorithms (enabled by the `webcrypto_modern_algorithms` compatibility flag, a subset of the evolving "Modern Algorithms in the Web Cryptography API" draft):

| Algorithm | sign / verify | encapsulateKey / encapsulateBits / decapsulateKey / decapsulateBits | generateKey | exportKey | importKey |
| --- | --- | --- | --- | --- | --- |
| ML-DSA-44, ML-DSA-65, ML-DSA-87 | Y | | Y | Y | Y |
| ML-KEM-768, ML-KEM-1024 | | Y | Y | Y | Y |
| ML-KEM-512 | | not implemented | not implemented | not implemented | not implemented |

The flag also adds `getPublicKey()` and `SubtleCrypto.supports()`, and supports JSON Web Keys (JWKs) with the `AKP` key type. Workers does not implement other algorithms from the draft; the API may change as the draft evolves.

## Notes

- Corrected from the official docs: the official table types `importKey` `keyData` as ArrayBuffer and `exportKey` as `Promise<ArrayBuffer>`; per the Web Crypto standard `"jwk"` format uses a JsonWebKey object for both.
- Corrected from the official docs: the official table types the second `unwrapKey` argument as a `CryptoKey` named `key`; per the Web Crypto standard it is `wrappedKey: BufferSource` (the bytes returned by `wrapKey()`), and the `CryptoKey` is the third argument `unwrappingKey`.
- Corrected from the official docs: the official table renders the `exportKey` and `getRandomValues` parameter lists with run-together names (`formatstring`, `keyCryptoKey`, `bufferArrayBufferView`); restored to `exportKey(format, key)` and `getRandomValues(buffer)`.
- Corrected from the official docs: `sign`/`verify`/`digest` are listed with `ArrayBuffer` data (and signature); the standard accepts any BufferSource (ArrayBuffer or views).
- `getRandomValues` returns the same array that was passed in (typed as the argument's type), and `crypto.getRandomValues` throws a `QuotaExceededError` if more than 65536 bytes are requested per call (standard behaviour).
- Web Crypto operations are significantly faster than pure-JavaScript implementations; use them for CPU-intensive cryptography.
- The Web Crypto API differs significantly from the Node.js Crypto API. To use Node.js Crypto code, enable the `nodejs_compat` compatibility flag.

## Related

- [Encoding](./encoding.md)
- [Streams](./streams.md)
- [Web standards](./web-standards.md)
