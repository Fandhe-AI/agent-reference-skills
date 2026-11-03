---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/
---

# Version metadata

The version metadata binding exposes the Worker version ID, version tag and creation timestamp inside the runtime, for use in events sent to Workers Analytics Engine or third-party analytics.

## Signature / Usage

```jsonc
{
	"version_metadata": {
		"binding": "CF_VERSION_METADATA"
	}
}
```

```js
export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag, timestamp: versionTimestamp } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag, versionTimestamp],
      //...
    });
    //...
  },
};
```

```ts
interface Environment {
  CF_VERSION_METADATA: WorkerVersionMetadata;
  WAE: AnalyticsEngineDataset;
}

export default {
  async fetch(request, env, ctx) {
    const { id: versionId, tag: versionTag } = env.CF_VERSION_METADATA;
    env.WAE.writeDataPoint({
      indexes: [versionId],
      blobs: [versionTag],
      //...
    });
    //...
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| id | — | Worker version ID. |
| tag | — | Worker version tag. |
| timestamp | — | When the version was created. |

## Notes

- Versions are described at https://developers.cloudflare.com/workers/versions-and-deployments/#versions.
- The official TypeScript example declares `interface Environment` but uses `ExportedHandler<Env>`; the names do not match, so declare the interface as `Env` when copying.
- Analytics Engine: https://developers.cloudflare.com/analytics/analytics-engine/

## Related

- [bindings-overview.md](./bindings-overview.md)
- [analytics-sql.md](./analytics-sql.md)
