# FAQs

Frequently asked questions about Hono and how to resolve them.

## Is there an official Renovate config for Hono?

The Hono team does not maintain an official [Renovate](https://github.com/renovatebot/renovate) configuration. Use the third-party `renovate-config-hono` instead by extending it in `renovate.json`:

```json
// renovate.json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "github>shinGangan/renovate-config-hono"
  ]
}
```

## Notes

- See the `shinGangan/renovate-config-hono` GitHub repository for further details on the third-party config.

## Related

- [others.md](./others.md)
