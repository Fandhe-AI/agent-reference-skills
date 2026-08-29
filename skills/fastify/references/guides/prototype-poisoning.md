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
- The upstream guide's historical mitigation (used by the `bourne` module during the hapi/joi incident) was: `JSON.parse()` normally, then only if the raw text contains the literal string `"__proto__"` do an explicit flat (non-recursive) scan/strip of that key.
  **Warning: do not treat this as a safe or recommended defense today.** A raw-text substring check like this is bypassable — e.g. the JSON key `_\u005fproto\u005f_` parses to the same `__proto__` property without the literal substring `"__proto__"` appearing anywhere in the raw text — and it only protects the single parse step; it cannot detect poisoning introduced later by a nested `Object.assign()`/spread/merge performed by application or dependency code after parsing. Do not build custom raw-text pre-processing as your defense
- **Fastify's actual, current mitigation** operates at the JSON-parsing layer via [secure-json-parse](https://github.com/fastify/secure-json-parse) (not a raw-text scan). Two factory options, both `'error'` by default, reject rather than merely strip poisoned input: `onProtoPoisoning` controls the action taken when a parsed JSON object contains `__proto__`, and `onConstructorPoisoning` controls the action taken when it contains `constructor`; both accept `'error'` / `'remove'` / `'ignore'`. See [../server/factory-options.md](../server/factory-options.md) for the full option reference
- Beyond the parser options, prefer merge operations that cannot write onto a prototype — e.g. build target objects with `Object.create(null)`, or use a deepmerge implementation that explicitly guards against `__proto__`/`constructor`/`prototype` keys — instead of `Object.assign()`/naive spreads on untrusted data
- Any code that uses `JSON.parse()` on external input and later merges/copies the resulting object is potentially at risk, regardless of framework
- This guide is historical/background material (reprint of Eran Hammer's account of the hapi/joi vulnerability); it documents the vulnerability class rather than a Fastify-specific API or configuration option — for Fastify's own defenses, see the `onProtoPoisoning`/`onConstructorPoisoning` notes above

## Related

- [../validation-serialization/schema-basics.md](../validation-serialization/schema-basics.md)
- [../server/factory-options.md](../server/factory-options.md)
