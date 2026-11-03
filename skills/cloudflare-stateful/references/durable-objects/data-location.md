---
source: https://developers.cloudflare.com/durable-objects/reference/data-location/
---

# Data location

Control where Durable Objects run and store data: restrict to a jurisdiction (hard constraint) or provide a location hint (best effort).

## Signature / Usage

```js
const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");
const euId = euSubnamespace.newUniqueId();
```

Adapted (not in the official docs): the official snippet calls `euId1.equal(euId2)`; the method is `equals`. See Notes.

```js
const euId1 = env.MY_DURABLE_OBJECT.idFromName("my-name");
const euId2 = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("my-name");
console.assert(!euId1.equals(euId2), "This should always be true");
```

```js
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: "enam" });
```

## Options / Props

### Jurisdictions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `eu` | jurisdiction | — | The European Union |
| `us` | jurisdiction | — | The United States |
| `fedramp` | jurisdiction | — | FedRAMP-Moderate data centers |

### Location hints (`locationHint`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `wnam` | hint | — | Western North America |
| `enam` | hint | — | Eastern North America |
| `sam` | hint | — | South America (spawns in a nearby supported location, e.g. Eastern North America) |
| `weur` | hint | — | Western Europe |
| `eeur` | hint | — | Eastern Europe |
| `apac` | hint | — | Asia-Pacific |
| `apac-ne` | hint | — | Northeast Asia-Pacific; narrower sub-region within `apac` |
| `apac-se` | hint | — | Southeast Asia-Pacific; narrower sub-region within `apac` |
| `oc` | hint | — | Oceania |
| `afr` | hint | — | Africa (spawns in a nearby supported location) |
| `me` | hint | — | Middle East (spawns in a nearby supported location) |

## Notes

- Corrected from the official docs: `euId1.equal(euId2)` is not a method; `equals` is used.
- Jurisdictions only control where the object runs and persists data; Workers anywhere can still access it. Consider Regional Services (https://developers.cloudflare.com/data-localization/regional-services/) to control the regions that respond to requests. A `DurableObjectId` is logged outside the jurisdiction for billing and debugging.
- The same name can map to different IDs in different jurisdictions. An error occurs if the namespace's jurisdiction and the ID's jurisdiction differ; no error if the namespace has none.
- Recommended: create a restricted namespace with `jurisdiction("eu")`; `newUniqueId({ jurisdiction: "eu" })` also works but is not recommended.
- `ctx.id.jurisdiction` is readable inside the object, preserved across `toString()`/`idFromString()`, and available in alarm handlers for alarms scheduled on 2026-03-15 or later.
- Location hints: objects do not currently change location after creation (dynamic relocation is planned). By default an object is created near the initial `get()`. Only the first `get()` for an object respects the hint, and hints are best effort (the data center minimizes latency from the hinted location). Pre-creating objects before first real traffic can hurt latency.
- Live locations: https://where.durableobjects.live/

## Related

- [DurableObjectNamespace](./namespace.md)
- [DurableObjectId](./id.md)
- [Rules of Durable Objects](./rules-of-durable-objects.md)
