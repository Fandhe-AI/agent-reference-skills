---
source: https://vite.dev/guide/api-plugin#authoring-a-plugin
---

# Authoring a Plugin / Conventions

Vite plugins extend Rolldown's plugin interface with a few extra Vite-specific options, so a plugin written once works for both dev and build. Reading Rolldown's plugin documentation first is recommended.

## Signature / Usage

```js
// Plugin = factory function returning the plugin object (common convention)
export default function myPlugin(options) {
  return {
    name: 'my-plugin', // required, will show up in warnings and errors
  }
}
```

### Conventions

Compatible Rolldown plugins (no Vite-specific hooks):

- Clear name with `rolldown-plugin-` prefix.
- Include `rolldown-plugin` and `vite-plugin` keywords in package.json `keywords`.

Vite-only plugins:

- Clear name with `vite-plugin-` prefix.
- Include the `vite-plugin` keyword in package.json `keywords`.
- Include a section in the plugin docs detailing why it is a Vite only plugin (for example, it uses Vite specific plugin hooks).

Framework-specific plugins include the framework in the prefix:

- `vite-plugin-vue-` for Vue plugins
- `vite-plugin-react-` for React plugins
- `vite-plugin-svelte-` for Svelte plugins

## Notes

- Plugins can be inlined in `vite.config.js`; no separate package is needed.
- Check the Features guide and existing community plugins (compatible Rollup plugins, Vite specific plugins) before creating a new plugin.
- `vite-plugin-inspect` is suggested for learning, debugging, or authoring plugins; after installing, visit `localhost:5173/__inspect/` to inspect modules and the transformation stack.
- Distinct from other skills' "plugin" concepts: this page covers Vite/Rolldown build plugins, not fastify encapsulated plugins, storybook addons, or hono middleware (see the fastify, storybook, and hono skills).

## Related

- [Plugins Config](./plugins-config.md)
- [Rolldown Plugin Compatibility](./rolldown-compatibility.md)
- [Virtual Modules / Transforms](./virtual-modules-transforms.md)
