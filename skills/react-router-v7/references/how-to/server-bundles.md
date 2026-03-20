# Server Bundles

Split the server build into multiple bundles, each handling a subset of routes. Designed for hosting providers that need to route requests to different serverless functions per route group.

**Available in:** Framework mode only. This is an advanced feature intended for hosting provider integrations.

## 実装方法

1. Add a `serverBundles` function to `react-router.config.ts`
2. Return a bundle ID string based on the route `branch` array
3. Use `buildEnd` to inspect the build manifest and implement a routing layer
4. Deploy a custom routing layer that directs requests to the correct bundle

## コード例

```ts
// react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  serverBundles: ({ branch }) => {
    const isAuthenticated = branch.some((route) =>
      route.id.split("/").includes("_authenticated"),
    );
    return isAuthenticated ? "authenticated" : "unauthenticated";
  },

  buildEnd: async ({ buildManifest }) => {
    // buildManifest.serverBundles — bundle id → { id, file }
    // buildManifest.routeIdToServerBundleId — route id → bundle id
    // buildManifest.routes — full route manifest
    console.log(buildManifest);
  },
} satisfies Config;
```

## 注意点

- `serverBundles` is called for each addressable route (pathless layout routes are excluded)
- The bundle ID string is used as a directory name in the server build output
- A custom routing layer in front of the app is required to direct requests to the correct bundle
- Most applications do not need this feature

## 関連

- [./presets.md](./presets.md)
- [./pre-rendering.md](./pre-rendering.md)
