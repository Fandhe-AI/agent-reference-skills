---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Plugins Methods

Methods for registering plugins and inspecting the plugin tree/prefix on a Fastify instance.

## Signature / Usage

```js
fastify.register(function (instance, opts, done) {
  instance.get('/foo', (request, reply) => {
    reply.send({ prefix: instance.prefix })
  })
  done()
}, { prefix: '/v1' })

fastify.ready(() => {
  console.log(fastify.printPlugins())
})
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `register` | `.register(plugin, opts)` | Extends Fastify with a plugin (routes, decorators, etc.). See `Plugins.md` (plugins scope). |
| `prefix` | `.prefix` | The full path prefix applied to routes registered in the current (encapsulated) context. |
| `pluginName` | `.pluginName` | Name of the current plugin; root is `'fastify'`. Resolution order: `fastify-plugin` metadata name, `Symbol.for('fastify.display-name')`, `module.exports` filename, function declaration name, or fallback to first two lines of the plugin source. |
| `hasPlugin` | `.hasPlugin(name)` | Returns `true`/`false` whether a plugin with that metadata name has been registered. |
| `printPlugins` | `.printPlugins()` | Prints the internal avvio plugin tree (useful for require-order debugging); call inside/after `ready`. |

## Notes

- With nested plugins wrapped by `fastify-plugin`, no new encapsulation scope is created, so `pluginName` instead reports the full boot chain, e.g. `fastify -> plugin-A -> plugin-B`.

## Related

- [Instance Decorators](./instance-decorators.md)
- [Instance Routing](./instance-routing.md)
