# Adapters API Reference

Reference for the two `NextAdapter` interface methods: `modifyConfig` and `onBuildComplete`.

## Signature / Usage

```typescript
async modifyConfig(
  config: NextConfigComplete,
  context: { phase: string; nextVersion: string }
): Promise<NextConfigComplete>

async onBuildComplete(context: {
  routing: RoutingInfo
  outputs: AdapterOutputs
  projectDir: string
  repoRoot: string
  distDir: string
  config: NextConfigComplete
  nextVersion: string
  buildId: string
}): Promise<void>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| config | NextConfigComplete | The complete Next.js configuration object (`modifyConfig`). |
| context.phase | string | Current build phase (`modifyConfig`). |
| context.nextVersion | string | Version of Next.js being used. |
| context.routing | object | Routing phases/metadata: `beforeMiddleware`, `beforeFiles`, `afterFiles`, `dynamicRoutes`, `onMatch`, `fallback`, `shouldNormalizeNextData`, `rsc`. |
| context.outputs | AdapterOutputs | Build outputs organized by type. |
| context.projectDir | string | Absolute path to the Next.js project directory. |
| context.repoRoot | string | Absolute path to the detected repository root. |
| context.distDir | string | Absolute path to the build output directory. |
| context.config | NextConfigComplete | Final config with `modifyConfig` applied. |
| context.buildId | string | Unique identifier for the current build. |

## Notes

- `modifyConfig` runs for any CLI command that loads `next.config.js`.
- `onBuildComplete` runs once after the build process completes.

## Related

- [Creating an Adapter](./adapters-creating-an-adapter.md)
- [Output Types](./adapters-output-types.md)
- [Routing Information](./adapters-routing-information.md)
