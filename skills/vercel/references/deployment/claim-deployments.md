# Claim Deployments

Claim Deployments lets a user take ownership of a deployment by transferring it to their Vercel account via a shareable claim URL. Particularly useful for AI-generated deployments and for moving projects between accounts with different owners.

## Signature / Usage

```text
https://vercel.com/claim-deployment?code=xxx&returnUrl=https://xxx
```

Flow for an automated AI-generated deployment:

1. Upload files: `POST /v2/files`.
2. Create the deployment with the Vercel CLI, or via the API (`POST /v2/files` then `POST /deployments`).
3. Initiate a transfer request: `POST /projects/:idOrName/transfer-request`. Returns a `code` valid for 24 hours.
4. Generate the claim URL (above) and share it with the user.
5. The user opens the URL and selects a team to transfer the deployment to.
6. After **Transfer** is clicked, `PUT /projects/transfer-request/:code` completes the transfer (not needed when using the Claim Deployments URL).

## Important endpoints

| Purpose | Endpoint |
|---------|----------|
| Claim Deployments URL | `https://vercel.com/claim-deployment?[...]` |
| Initiate project transfer request | `POST /projects/:idOrName/transfer-request` |
| Complete project transfer | `PUT /projects/transfer-request/:code` (not needed with the Claim Deployments URL) |

## Notes

- In the claim URL, `xxx` values are placeholders (verbatim from the official docs): `code` is the transfer-request code returned by step 3, and `returnUrl` is the URL to return to after the claim.
- Associated resources from Neon, Supabase, and Prisma (Marketplace) are transferred with the claimed deployment and keep their connection to the project.
- When transferring a project between two teams owned by the same user, the Project Transfer flow is recommended instead of Claim Deployments.
- Use cases: team restructuring, migrating personal projects to a company account.
- Templates: `https://github.com/vercel/claim-deployments-demo` (demo: `https://claim-deployments-demo.vercel.app`).
- Source: https://vercel.com/docs/deployments/claim-deployments

## Related

- [managing-deployments.md](./managing-deployments.md)
- [overview.md](./overview.md)
