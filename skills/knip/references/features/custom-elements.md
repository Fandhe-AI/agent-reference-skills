# Custom Elements

Source: https://knip.dev/features/custom-elements

## Overview

Knip automatically recognizes custom element class registrations under tag names, preventing false "unused export" reports for web component classes.

## Native Registration

The web standard `customElements.define()` credits the registered class. Supported registration patterns:

- Direct global registry: `customElements.define('my-el', MyEl)`
- Prefixed access: `window.customElements.define(...)`, `globalThis.customElements.define(...)`
- Local `CustomElementRegistry` instances
- Shadow root scoped registries
- Self-registration via static blocks

## Framework Support

Framework-specific decorators and methods are recognized automatically when the framework is listed as a project dependency.

| Framework | Decorator / Method | Import Source |
|-----------|-------------------|---------------|
| Lit | `@customElement('tag')` | `lit/decorators` |
| FAST | `@customElement` or `.define()` | `@microsoft/fast-element` |
| Stencil | `@Component({ tag })` | `@stencil/core` |
| Catalyst | `@controller` | `@github/catalyst` |

**Note:** Framework decorators are only recognized when imported from the official framework source. Locally-defined or differently-sourced decorators are ignored.

## Configuration

No additional configuration is needed. Recognition is automatic when the framework appears in project dependencies.

## Related

- [Plugins](../explanations/plugins.md)
- [Entry Files](../explanations/entry-files.md)
