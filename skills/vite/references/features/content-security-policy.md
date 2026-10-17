---
source: https://vite.dev/guide/features#content-security-policy-csp
---

# Content Security Policy (CSP)

Deploying a CSP requires certain directives or configs because of Vite's internals.

## Signature / Usage

When `html.cspNonce` is set, Vite injects this meta tag:

```html
<meta property="csp-nonce" nonce="PLACEHOLDER" />
```

## Notes

- `'nonce-{RANDOM}'`: when `html.cspNonce` is set, Vite adds a nonce attribute with the specified value to any `<script>` and `<style>` tags, as well as `<link>` tags for stylesheets and module preloading. It also injects a meta tag `<meta property="csp-nonce" nonce="PLACEHOLDER" />`. The nonce of the meta tag with `property="csp-nonce"` is used by Vite whenever necessary during dev and after build.
- Replace the placeholder with a unique value for each request; otherwise a resource's policy can easily be bypassed.
- `data:`: during build Vite inlines small assets as data URIs. Allow `data:` for related directives (e.g. `img-src`, `font-src`), or disable inlining with `build.assetsInlineLimit: 0`.
- Do not allow `data:` for `script-src`; it allows injection of arbitrary scripts.

## Related

- [html options](../config-shared/html-options.md)
- [build.assetsInlineLimit](../config-build/build-assets-inline-limit.md)
