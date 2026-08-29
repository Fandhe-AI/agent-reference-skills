---
source: https://fastify.dev/docs/latest/Guides/Prototype-Poisoning/
---

# Prototype Poisoning

Target: Fastify v5.12.1. Background on the JavaScript prototype-poisoning vulnerability class (`__proto__` key injection via `JSON.parse()` followed by shallow-copy operations like `Object.assign()`), and why any framework that parses external JSON is potentially at risk.

## Signature / Usage

```js
// The vulnerable pattern: JSON.parse() itself is safe, but a later
// shallow-copy operation can leak `__proto__` into a real prototype.
const text = '{"b": 5, "__proto__": { "c": 6 }}'
const a = JSON.parse(text)          // a.__proto__ is just an own property here, harmless
const x = Object.assign({}, a)      // x's actual prototype is now poisoned
x.c // => 6 (leaked via the prototype chain)
```

## Notes

- Root cause: `JSON.parse()` can produce an object with an own property literally named `__proto__`; that property is inert until something like `Object.assign()`, a shallow clone, or a naive merge copies it in a way that JavaScript interprets as a real prototype assignment
- The original hapi/joi incident (2020) was exploitable only when application code performed such a copy on a raw parsed payload *before* validation — validation libraries typically ignore the prototype chain and only check an object's own properties, so poisoned data could sneak through undetected
- A safe scan approach: first `JSON.parse()` normally (fast path unaffected); only if the raw text contains the literal string `"__proto__"` do an explicit flat (non-recursive) scan/strip of that key — recursive scanning is itself a DoS risk (stack exhaustion on deeply nested attacker-supplied JSON)
- Any code that uses `JSON.parse()` on external input and later merges/copies the resulting object is potentially at risk, regardless of framework
- This guide is historical/background material (reprint of Eran Hammer's account of the hapi/joi vulnerability); it documents the vulnerability class rather than a Fastify-specific API or configuration option

## Related

- [../validation-serialization/schema-basics.md](../validation-serialization/schema-basics.md)
