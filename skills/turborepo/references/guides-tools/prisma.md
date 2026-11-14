# Prisma

Configure the DB client as a shared internal package inside the monorepo.

## Usage

Quick start:

```bash
npx create-turbo@latest -e with-prisma
```

Key integration points:

- Initializing the Prisma Client
- Structuring following the Internal Package pattern
- Migrations (`prisma migrate`)
- Local development workflow
- Production deployment strategy

See the official Prisma guide for details: https://www.prisma.io/docs/guides/deployment/turborepo

## Notes

- Official docs (v2.11.11) link the Prisma guide at `/docs/guides/deployment/turborepo`; v2.11.8 docs linked `/docs/guides/turborepo`.
- Source: https://turborepo.dev/docs/guides/tools/prisma (vercel/turborepo tag v2.11.11, fetched 2026-11-14).
