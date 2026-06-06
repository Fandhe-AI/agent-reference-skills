# Deploy: DigitalOcean

Deploying Inngest functions on DigitalOcean Functions, App Platform, or Droplets.

## Signature / Usage

```bash
# DigitalOcean marketplace → Add-Ons → Inngest
# After creating the add-on, retrieve keys from the Add-Ons section of the dashboard
INNGEST_EVENT_KEY=<from-do-inngest-dashboard>
INNGEST_SIGNING_KEY=<from-do-inngest-dashboard>
```

## Notes

- Three DigitalOcean platforms are supported: Functions, App Platform, and Droplets
- For new Inngest accounts: add the Inngest Add-On via the DigitalOcean marketplace — DigitalOcean will create an Inngest account automatically, then retrieve credentials from the Add-Ons dashboard section
- For existing Inngest accounts: skip the marketplace integration and sync a new app directly in Inngest Cloud using your existing credentials
- After configuring environment variables, install the language-specific SDK (TypeScript, Python, or Go) and sync your application through the Inngest dashboard

## Related

- [Signing Keys](./signing-keys.md)
- [Event Keys](./event-keys.md)
- [Deploy: Render](./deploy-render.md)
