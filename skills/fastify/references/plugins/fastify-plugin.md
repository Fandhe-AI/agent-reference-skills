---
source: https://fastify.dev/docs/latest/Reference/Plugins/
---

# fastify-plugin

`fastify-plugin` (`fp`) is a separate, official npm package used to tell Fastify not to create a new encapsulation scope when registering a plugin, and to declare metadata about the plugin (name, supported Fastify version range, expected decorators, and dependencies). Target Fastify version: v5.12.1.

## Signature / Usage

```js
const fp = require('fastify-plugin')

module.exports = fp(function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}, { fastify: '5.x' })
```

Passing only a semver string instead of an options object checks the Fastify version only:

```js
module.exports = fp(function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}, '0.x')
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `fastify` | string | Semver range of the Fastify versions the plugin supports. |
| `name` | string | Name used by Fastify to validate the dependency graph and ensure no name collisions occur. Referenced by other plugins' `dependencies`. |
| `decorators` | object | `{ fastify: string[], reply: string[], request: string[] }` — checks that the listed decorators are present in the dependency graph before the plugin loads. |
| `dependencies` | string[] | List of plugin `name`s that must already be registered in the dependency graph. |
| `encapsulate` | boolean | When `true`, keeps the plugin encapsulated (does not break encapsulation) while still validating `name` / `decorators` / `dependencies`. Default: `false` (encapsulation is broken). |

Example combining metadata:

```js
const fp = require('fastify-plugin')

function plugin (fastify, opts, done) {
  fastify.decorate('util', function () {})
  done()
}

module.exports = fp(plugin, {
  name: 'my-encapsulated-plugin',
  fastify: '5.x',
  decorators: {
    fastify: ['plugin1', 'plugin2'],
    reply: ['compress']
  },
  dependencies: ['plugin1-name', 'plugin2-name'],
  encapsulate: true
})
```

## Notes

- `fastify-plugin` is distributed as a separate package (`fastify/fastify-plugin` on GitHub, `fastify-plugin` on npm), not part of the `fastify` core package itself.
- By default, wrapping a plugin with `fp` breaks encapsulation (the plugin's decorators/hooks/routes become visible to the parent scope). Set `encapsulate: true` to keep encapsulation while still validating `name` / `decorators` / `dependencies`.
- If a listed dependency or decorator is not satisfied, `fp` throws before the server instance boots, not during runtime.

## Related

- [plugins](./plugins.md)
- [encapsulation](./encapsulation.md)
- [decorators](./decorators.md)
