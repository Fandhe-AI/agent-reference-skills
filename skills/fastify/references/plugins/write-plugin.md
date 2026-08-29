---
source: https://fastify.dev/docs/latest/Guides/Write-Plugin/
---

# How to write a good plugin

Guide describing what characterizes a quality Fastify plugin, aimed at people writing plugins for the Fastify ecosystem. Target version: v5.12.1.

## Signature / Usage

Fastify recommends reading [the hitchhiker's guide to plugins](./plugins-guide.md) to discover the APIs available for building a plugin.

```js
module.exports = function (fastify, opts, done) {
  fastify.decorate('utility', function () {})
  done()
}
```

## Notes

- Documentation is required before a plugin is accepted into the ecosystem list; lack of documentation makes a plugin harder to adopt.
- Plugins may use any license; the Fastify team recommends the MIT license.
- Always include an example file in the plugin repository.
- A plugin **must** be thoroughly tested; a plugin without tests is not accepted into the ecosystem list. Fastify's own suite uses `node:test`, but any testing library is acceptable.
- A code linter is recommended (`standard` requires no configuration).
- Continuous Integration (CircleCI, GitHub Actions) and Dependabot are recommended but not mandatory for open-source plugins.
- Real-world examples referenced by the guide: `@fastify/view`, `@fastify/mongodb`, `@fastify/multipart`, `@fastify/helmet`.

## Related

- [plugins-guide](./plugins-guide.md)
- [plugins](./plugins.md)
