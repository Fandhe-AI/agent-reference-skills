---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/
---

# url

`node:url` domain conversion helpers: `domainToASCII` and `domainToUnicode`.

## Signature / Usage

```js
import { domainToASCII } from "node:url";

console.log(domainToASCII("español.com"));
// Prints xn--espaol-zwa.com
console.log(domainToASCII("中文.com"));
// Prints xn--fiq228c.com
console.log(domainToASCII("xn--iñvalid.com"));
// Prints an empty string
```

```js
import { domainToUnicode } from "node:url";

console.log(domainToUnicode("xn--espaol-zwa.com"));
// Prints español.com
console.log(domainToUnicode("xn--fiq228c.com"));
// Prints 中文.com
console.log(domainToUnicode("xn--iñvalid.com"));
// Prints an empty string
```

## Notes

- `domainToASCII` returns the Punycode ASCII serialization of the domain; an invalid domain returns the empty string.
- `domainToUnicode` returns the Unicode serialization of the domain (inverse of `domainToASCII()`); an invalid domain returns the empty string.

## Related

- [path](./path.md)
