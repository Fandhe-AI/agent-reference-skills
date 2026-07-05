# Deploying

Deploy a Next.js application as a Node.js server, Docker container, static export, or via a platform adapter.

## Signature / Usage

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

```bash
npm run build
npm run start
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Node.js server | deployment option | Full feature support; any provider that runs Node.js |
| Docker container | deployment option | Full feature support; works with Kubernetes or any Docker-capable host |
| Static export (`output: 'export'`) | deployment option | Limited feature support; serves static HTML/CSS/JS from any static host |
| Adapters | deployment option | Platform-specific build/deploy customization via the Deployment Adapter API; verified adapters (Vercel, Bun) run the full compatibility test suite |

## Notes

- Static export does not support Next.js features that require a server (see the static exports guide for the unsupported list)
- Docker is recommended for production; for local development on Mac/Windows, prefer `next dev` over Docker for performance
- Cloudflare and Netlify currently offer their own (non-adapter-API) Next.js integrations while verified adapters are in progress

## Related

- [proxy](./proxy.md)
- [upgrading](./upgrading.md)
