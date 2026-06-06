# Deploy: Render

Deploying Inngest functions on Render for both production and branch preview environments.

## Signature / Usage

```bash
# Production environment variables on Render service
INNGEST_SIGNING_KEY=<production-signing-key>
INNGEST_EVENT_KEY=<production-event-key>

# Preview environment variables (per preview service)
INNGEST_SIGNING_KEY=<branch-signing-key>
INNGEST_EVENT_KEY=<branch-event-key>
INNGEST_ENV=$RENDER_GIT_BRANCH
```

## Notes

- Deploy your web application (Next.js, Express, FastAPI, etc.) to Render first, then configure Inngest credentials
- After each deploy that includes function changes, sync your app with Inngest manually via the dashboard or automate via the Inngest REST API in a CI/CD pipeline
- For preview environments: enable Render's service previews or preview environments feature, create branch environment keys in Inngest, and set `INNGEST_ENV` using `RENDER_GIT_BRANCH`
- Each preview deploy is a separate Render service, so environment variables must be set per service

## Related

- [Environments](./environments.md)
- [Signing Keys](./signing-keys.md)
- [Deploy: Vercel](./deploy-vercel.md)
