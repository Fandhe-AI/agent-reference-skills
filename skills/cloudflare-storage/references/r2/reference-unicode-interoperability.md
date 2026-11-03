---
source: https://developers.cloudflare.com/r2/reference/unicode-interoperability/
---

# Unicode interoperability

R2 NFC-normalizes object key names by default so Unicode-equivalent names refer to the same object.

## Signature / Usage

```txt
chcp 65001   # Windows console: run before using command-line tools if object names look wrong
```

## Notes

- Because of NFC normalization, canonically equivalent but byte-different key names (e.g. precomposed vs decomposed accented characters) are the same object in R2 but different objects in other storage providers.
- R2 preserves the encoding for display: listing returns the last encoding uploaded.
- Platform differences: Windows and macOS filenames are case-insensitive while R2 and Linux are not; Windows console Unicode support can be error-prone; Linux allows distinct Unicode-equivalent filenames, which all point to the same R2 object.
- To bypass Unicode equivalence and use byte-oriented keys, contact your Cloudflare account team.

## Related

- [S3 API extensions](./s3-extensions.md)
- [Objects](./objects-overview.md)
