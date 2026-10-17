---
source: https://v2.tauri.app/start/frontend/
---

# Frontend Configuration

Tauri is frontend agnostic and supports most frontend frameworks out of the box; some frameworks need extra configuration to integrate.

## Signature / Usage

Frameworks with recommended configurations:

- JavaScript: Next.js, Nuxt, Qwik, SvelteKit, Vite (recommended)
- Rust: Leptos, Trunk

For most projects the page recommends Vite for SPA frameworks such as React, Vue, Svelte, and Solid, and for plain JavaScript or TypeScript projects. The other JavaScript guides cover meta-frameworks, which are typically designed for SSR and need special configuration.

## Configuration Checklist

Conceptually Tauri acts as a static web host: provide a folder containing a mix of HTML, CSS, JavaScript and possibly WASM to be served to the webview.

- Use static site generation (SSG), single-page applications (SPA), or classic multi-page apps (MPA). Tauri does not natively support server based alternatives (such as SSR).
- For mobile development, a development server of some kind is necessary that can host the frontend on your internal IP.
- Use a proper client-server relationship between your app and your API's (no hybrid solutions with SSR).

## Notes

- If a framework is not listed it may work with no additional configuration, or may not have been documented yet.
- Tauri-side integration settings only; the frameworks themselves are covered by vite, nextjs-app and tanstack-start skills.

## Related

- [Vite](./frontend-vite.md)
- [Next.js](./frontend-nextjs.md)
- [Nuxt](./frontend-nuxt.md)
- [SvelteKit](./frontend-sveltekit.md)
- [Qwik](./frontend-qwik.md)
- [Leptos](./frontend-leptos.md)
- [Trunk](./frontend-trunk.md)
