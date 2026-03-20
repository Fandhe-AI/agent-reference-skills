# Presets

Presets package React Router configuration so that tools and hosting providers can configure the router on behalf of users. A preset can set config options and validate that they haven't been overridden.

**Available in:** Framework mode only.

## 実装方法

1. Create a function that returns a `Preset` object with `name`, `reactRouterConfig`, and optionally `reactRouterConfigResolved`
2. Publish the preset to npm for reuse
3. Import it and add to the `presets` array in `react-router.config.ts`

## コード例

```ts
// my-preset.ts
import type { Preset } from "@react-router/dev/config";

export function myCoolPreset(): Preset {
  return {
    name: "my-cool-preset",
    reactRouterConfig: () => ({
      serverBundles: ({ branch }) => {
        const isAuth = branch.some((r) =>
          r.id.split("/").includes("_authenticated"),
        );
        return isAuth ? "authenticated" : "unauthenticated";
      },
    }),
    reactRouterConfigResolved: ({ reactRouterConfig }) => {
      // Throw if the user overrode a required config
    },
  };
}
```

```ts
// react-router.config.ts
import { myCoolPreset } from "react-router-preset-cool";

export default {
  presets: [myCoolPreset()],
} satisfies Config;
```

## 注意点

- Configs are merged in definition order; user-specified config always takes final precedence
- Only use `reactRouterConfigResolved` when overriding would cause a hard error
- Designed to be published to npm, not written inline in user projects

## 関連

- [./server-bundles.md](./server-bundles.md)
