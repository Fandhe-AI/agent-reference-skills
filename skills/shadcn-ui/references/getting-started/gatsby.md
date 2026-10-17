---
source: https://ui.shadcn.com/docs/installation/gatsby
---

# Gatsby

Install and configure shadcn/ui for Gatsby.

## Signature / Usage

```bash
npm init gatsby
npx shadcn@latest init
npx shadcn@latest add button
```

`gatsby-node.ts` (so the app can resolve paths):

```ts
import * as path from "path"

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  })
}
```

## Notes

- This guide is for Gatsby with Tailwind CSS v3. For new projects, the docs recommend one of the other frameworks that support Tailwind CSS v4.
- In `create-gatsby` choose TypeScript and Tailwind CSS as the styling system.
- Add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` to `compilerOptions` in `tsconfig.json`.

## Related

- [Tailwind v4](./tailwind-v4.md)
- [Installation](./installation.md)
