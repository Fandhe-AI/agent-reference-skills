# Syncing an Inngest App

Registering or re-registering your Inngest app with Inngest Cloud after deployment so the platform knows the current function configurations.

## Signature / Usage

```bash
# Programmatic sync via REST API (for CI/CD pipelines)
curl -X PUT https://api.inngest.com/v1/apps/sync \
  -H "Authorization: Bearer $INNGEST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app.example.com/api/inngest"}'
```

## Notes

- Three sync methods are available:
  1. **Manual**: navigate to Apps in Inngest Cloud, click "Sync App" or "Sync New App", paste the serve endpoint URL
  2. **Automatic integration**: Vercel and Netlify integrations sync automatically on every deploy
  3. **Programmatic via REST API**: suitable for CI/CD pipelines and platforms without a native integration
- Re-sync is required after every deploy that adds, removes, or modifies function configurations
- The Vercel integration auto-syncs using `INNGEST_SERVE_ORIGIN`; other platforms need manual or API-based sync

## Related

- [Deploy: Vercel](./deploy-vercel.md)
- [Deploy: Netlify](./deploy-netlify.md)
- [API Keys](./api-keys.md)
- [Connect (Workers)](./connect.md)
