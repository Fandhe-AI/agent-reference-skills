---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Loading Order of Plugins

Fastify recommends a consistent, predictable load order so that every scope has access to the properties declared before it.

## Signature / Usage

```text
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
```

If a plugin should apply only to a subset of routes, replicate the same structure within an encapsulated service:

```text
└── plugins (from the Fastify ecosystem)
└── your plugins (your custom plugins)
└── decorators
└── hooks
└── your services
    │
    └──  service A
    │     └── plugins (from the Fastify ecosystem)
    │     └── your plugins (your custom plugins)
    │     └── decorators
    │     └── hooks
    │     └── your services
    │
    └──  service B
          └── plugins (from the Fastify ecosystem)
          └── your plugins (your custom plugins)
          └── decorators
          └── hooks
          └── your services
```

## Notes

- This ordering relies on Fastify's encapsulation model, which lets an application be built as a tree of independent services.

## Related

- [first-plugin.md](./first-plugin.md)
