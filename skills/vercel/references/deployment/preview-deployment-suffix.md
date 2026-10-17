# Preview Deployment Suffix

Replaces the default `vercel.app` suffix of preview deployment URLs with a custom domain of your choice. Available on Enterprise and Pro plans.

## Signature / Usage

DNS records to use an external DNS provider for a suffix of `preview.example.com` (added in the provider's `example.com` zone):

```text
Type   Name                      Value
NS     _acme-challenge.preview   ns1.vercel-dns.com.
NS     _acme-challenge.preview   ns2.vercel-dns.com.
CNAME  *.preview                 cname.vercel-dns-0.com.
```

## Enabling

1. Dashboard **Settings** > **Billing** > **Add-Ons**: set **Preview Deployment Suffix** to **Enabled** (included and enabled by default on Enterprise).
2. Team **Settings** > **General** > **Preview Deployment Suffix**: enter the custom domain and **Save**.

## Disabling

Set the add-on toggle to **Disabled** under **Billing** > **Add-Ons**. The next preview deployment reverts to the default `vercel.app` suffix.

## Notes

- The custom domain must be available and active within the team, and use Vercel nameservers or delegate certificate validation to Vercel.
- External DNS: if the domain is attached to a project and **Settings > Domains** recommends a different CNAME target, use that project-specific value. Some providers require full names such as `_acme-challenge.preview.example.com`. On the team **Domains** page, select the apex domain and choose **Enable Vercel DNS** (activates the Vercel zone without changing registrar nameservers), then save the suffix and confirm a new preview URL resolves with a valid certificate.
- Delegating `_acme-challenge` to Vercel can prevent other hosting providers from issuing certificates needing the same challenge name; keep the delegation in place for renewals.
- Broken Preview Deployment Suffix error: ensure the domain is active (not deleted), available within the team, and backed by an active wildcard certificate. Adding the domain to a project in the same team (with a single `index.html` at the root) satisfies these.
- Pricing: see the plan add-ons documentation.
- Source: https://vercel.com/docs/deployments/preview-deployment-suffix

## Related

- [generated-urls.md](./generated-urls.md)
- [environments.md](./environments.md)
