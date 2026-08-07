# Guide: Next.js Setup

Scaffold a Next.js app inside an Upstash Box and open it in the browser through a public URL, without using an agent — the box provides a full Linux environment with Node.js pre-installed.

## Signature / Usage

```typescript
import { Box } from "@upstash/box"

const box = await Box.create({ runtime: "node" })

await box.exec.command("npx --yes create-next-app@latest my-next-app --yes")

// start dev server in the background
await box.exec.command("cd my-next-app && nohup npm run dev > dev.log 2>&1 &")

const publicUrl = await box.getPublicURL(3000)
console.log(publicUrl.url)
// -> https://<box-id>-3000.preview.box.upstash.com
```

```python
box = Box.create(runtime="node")

box.exec.command("npx --yes create-next-app@latest my-next-app --yes")
box.exec.command("cd my-next-app && nohup npm run dev > dev.log 2>&1 &")

public_url = box.get_public_url(3000)
print(public_url.url)
```

## Notes

- Commands run from the box's home directory (`/workspace/home`), where the app was created
- Next.js blocks cross-origin dev resources by default; add the public host to `allowedDevOrigins` in `next.config.ts` for hot reloading to work over the public URL
- `getPublicURL(port)` exposes a running server's port; see the Public URLs guide (`overall/preview`, not covered in this skill's scope) for authentication options

## Related

- [Quickstart](./quickstart.md)
- [Guides: Remote Development](./guides-remote-development.md)
