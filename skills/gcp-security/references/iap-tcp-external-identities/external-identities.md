---
source: https://docs.cloud.google.com/iap/docs/external-identities
---

# External identities

By default IAP uses Google identities and IAM. By using Identity Platform instead, IAP can authenticate users from external identity providers (email/password, OAuth such as Google, Facebook, Twitter, GitHub and Microsoft, SAML, OIDC, phone number, custom, anonymous), which helps when migrating users to Google accounts is impractical. This page merges the concept overview and the enablement guide.

## Signature / Usage

### Enable IAP on a resource first

The console steps below toggle IAP on a service; the equivalent CLI for an App Engine app is the following. Then use the console to switch the resource to external identities.

```bash
gcloud iap web enable --resource-type=app-engine \
    --oauth2-client-id=CLIENT_ID --oauth2-client-secret=SECRET
```

### Configure IAP to use Identity Platform (console)

1. Enable and configure Identity Platform in the same project as IAP (using different projects is not supported). Enable multi-tenancy only if you must isolate resources; enable providers.
2. IAP page, **Applications** tab, locate the service, toggle IAP **On**, then in the side panel click **Start** under **Use external identities for authorization** and confirm.
3. In the Identity Platform side panel choose to build your own sign-in page or have IAP create one (fastest; minor customization via JSON; hosted on Cloud Run). For your own UI enter an **Authentication URL** (IAP redirects unauthenticated requests there; the API key is optional and the console appends your default key if omitted).
4. Select **project providers** or **tenants**, check the providers or tenants to enable (**Configure providers** edits them), then **Save**.

### Identity Platform fields in an IAP settings file

The `gcloud iap settings set` help shows `accessSettings.gcipSettings` with the Identity Platform tenant IDs and login page URI linked to the IAP resource:

```yaml
accessSettings :
  oauthSettings:
    loginHint: test_hint
  gcipSettings:
    tenantIds:
    - tenant1-p9puj
    - tenant2-y8rxc
    loginPageUri: https://test.com/?apiKey=abcd_efgh
  corsSettings:
    allowHttpOptions: true
applicationSettings:
  csmSettings:
    rctokenAud: test_aud
```

### Switch back to Google identities

IAP page, select the resource, open the Identity Platform information panel, select **Use IAM to manage this resource**. This clears the authentication URL and associated project and tenants.

## Options / Props

### Tenant structures

| Structure | When to use |
|-----------|-------------|
| No tenants | You do not need to isolate resources. Identity Platform stores and authenticates users per project, so no extra configuration is needed |
| One tenant per resource | Non-tenant Identity Platform tokens are valid project-wide, so a user could authenticate to one IAP resource and use the token on another service in the project, which is a security risk. Give each IAP resource its own tenant; tenant-scoped tokens are valid only for that tenant and a user is asked to authenticate again for another tenant |
| Multiple tenants per resource | One IAP resource can have several tenants; choose the tenant by, for example, prompting for email and matching the domain, or listing tenants. Users can belong to several tenants with varying access |

### Provider and feature limits

| Item | Limit |
|------|-------|
| Phone number and anonymous authentication | Not supported with multi-tenancy |
| Passwordless sign-in with an email link | Not supported with IAP |
| IAM authorization | Cannot be used with external identities; the JWT IAP generates carries the claims from the Identity Platform ID token and the application can filter access on them |

## Notes

- The Identity Platform REST API (`identitytoolkit`) is in the `gcp-foundation` skill.
- `GcipSettings` in the IAP Discovery document: `tenantIds` are the Identity Platform tenant IDs linked to the IAP resource, and `loginPageUri` is the login page URI associated with those tenants. The tenant IDs, hint, audience and `apiKey` in the help example are sample values.
- Identity Platform multi-tenancy was designed for B2B scenarios (an agent offering a service to tenants, each possibly with its own identity providers; sessions and data are scoped per tenant).
- IAP is a building block of Chrome Enterprise Premium.
- Domain restricted sharing: if the project is subject to the domain restricted sharing organization policy constraint, public Cloud Run services cannot be created by default; use tags and a conditional policy to exempt specific services.
- The source also links to hosting an authentication UI on Cloud Run, FirebaseUI, and a custom authentication UI.
- The sign-in step is authentication; do not treat it as access control beyond the IAP policy. Verify the IAP signed header as described in the IAP signed headers documentation.
- The CLI snippet embeds the OAuth client secret on the command line, so it lands in shell history and process lists; do not print it in shared terminals or CI logs.
- Source: https://docs.cloud.google.com/iap/docs/external-identities (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iap/docs/enable-external-identities (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/iap/web/enable (gcloud 593.0.0 help; the enable command).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/iap/settings/set (gcloud 593.0.0 help; the YAML example).

## Related

- [use-workforce-identity-federation.md](./use-workforce-identity-federation.md)
- [faq.md](./faq.md)
