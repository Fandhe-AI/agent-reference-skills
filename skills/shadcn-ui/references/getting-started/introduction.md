---
source: https://ui.shadcn.com/docs
---

# Introduction

shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. It is not a component library; it is how you build your component library.

## Signature / Usage

```bash
npx shadcn@latest add button
```

The CLI copies the component source into your project (for example `components/ui/button.tsx`), so you edit the code directly instead of wrapping a package.

## Notes

- Principles: Open Code (the top layer of component code is open for modification), Composition (common composable interface), Distribution (flat-file schema and CLI), Beautiful Defaults, AI-Ready.
- Distribution: a **Schema** (flat-file structure defining components, dependencies and properties) and a **CLI** (distribute and install components across projects with cross-framework support).
- Pulling upstream fixes: the core of your app receives fixes by updating dependencies such as `@base-ui/react` or `input-otp`; the topmost layer closest to your design system is not coupled with the library and stays open for modification.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Installation](./installation.md)
- [Manual Installation](./manual.md)
