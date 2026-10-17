---
source: https://vite.dev/guide/api-environment-frameworks#environment-agnostic-code
---

# Environment Agnostic Code

Most code receives the current `environment` instance through its context, so accessing `server.environments` directly should be rare.

## Signature / Usage

```ts
  transform(code, id) {
    console.log(this.environment.config.resolve.conditions)
  }
```

## Notes

- Inside plugin hooks the environment is exposed as part of the `PluginContext`, accessible with `this.environment`.
- The code example above is from the Environment API for Plugins page, which explains how to build environment-aware plugins; the Frameworks page itself only states the guidance.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Per-environment Hooks](./per-environment-hooks.md)
- [DevEnvironment class](./dev-environment-class.md)
