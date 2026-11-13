---
source: https://opencode.ai/docs/config/#experimental
---

# Config: Experimental

All experimental settings live under the `experimental` key.

## Signature / Usage

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "experimental": {
    "todo": true,
    "subagent_depth": 2,
    "background_compaction": true,
    "image_generate": { "model": "openai/gpt-image-2" },
    "location_idle_timeout": "4 hours",
  },
}
```

### Todos

Set `todo` to `true` to give agents a `todowrite` tool for tracking multi-step work. Defaults to `false`.

### Subagent depth

`subagent_depth` sets how deeply subagents can start their own subagents. Defaults to `1`, so a subagent cannot
start another subagent.

### Background compaction

Set `background_compaction` to `true` to write the compaction summary in the background before it is needed, so
automatic compaction doesn't pause the session. Defaults to `false`. See
[Compaction](https://opencode.ai/docs/compaction/#background-compaction) for how it works.

```jsonc
{
  "experimental": {
    "background_compaction": true,
  },
}
```

### Image generation

`image_generate` sets the default model for the [`experimental_image_generate`](https://opencode.ai/docs/tools/#image-generate) tool, as
`providerID/modelID`, optionally with `#variant`. When that model isn't available or can't handle a request, OpenCode
picks another image model automatically.

```jsonc
{
  "experimental": {
    "image_generate": {
      "model": "openai/gpt-image-2",
    },
  },
}
```

### Location idle timeout

`location_idle_timeout` controls how long a project location can go without session activity before OpenCode unloads
its services. It takes a duration such as `"2 hours"` and defaults to `"60 minutes"`. Running sessions and background
jobs keep a location loaded. Set it to `false` to never unload idle locations. Project config can override the global
value.

```jsonc
{
  "experimental": {
    "location_idle_timeout": false,
  },
}
```

### Deprecated policies

`experimental.policies` is deprecated. Use top-level [`policies`](https://opencode.ai/docs/policies/) instead. The old key still works and
merges into `policies`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `todo` | boolean | Gives agents a `todowrite` tool; default `false` |
| `subagent_depth` | — | Nesting depth for subagents; default `1` |
| `background_compaction` | boolean | Write compaction summary in background; default `false` |
| `image_generate` | object | Default model for `experimental_image_generate` |
| `location_idle_timeout` | duration or `false` | Idle unload timeout; default `"60 minutes"` |

## Notes

- Experimental settings may change, break, or be removed in any release without notice. Don't rely on them for stable workflows.

## Related

- [config-compaction-warming.md](./config-compaction-warming.md)
- [config-access-control.md](./config-access-control.md)
