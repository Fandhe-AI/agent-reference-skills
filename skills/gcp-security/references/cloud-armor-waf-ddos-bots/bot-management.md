---
source: https://docs.cloud.google.com/armor/docs/bot-management
---

# Bot management overview

Cloud Armor integrates with reCAPTCHA to evaluate and act on requests from automated clients: manual challenge (redirect to a reCAPTCHA challenge page), enforcement of reCAPTCHA token scores (frictionless assessment), a 302 redirect action, and request decoration with custom headers. Cloud Armor deciphers the encrypted reCAPTCHA token inline at the edge of Google's network, with no extra request to the reCAPTCHA service.

## Signature / Usage

### Match expression for a manual challenge

The source describes a rule with the advanced match expression below and a `redirect` action of type `GOOGLE_RECAPTCHA` for the login page `/login.html`.

```text
request.path.matches("/login.html")
```

## Options / Props

### Rate limiting keys for reCAPTCHA resources

| Resource | `enforce_on_key` | `enforce_on_key_name` |
|----------|------------------|-----------------------|
| Exemption cookie | `HTTP-COOKIE` | `recaptcha-ca-e` |
| Action-token | `HTTP-HEADER` | `X-Recaptcha-Token` |
| Session-token | `HTTP-COOKIE` | `recaptcha-ca-t` |

### Capabilities

| Capability | Detail |
|------------|--------|
| Manual challenge | Rule redirects to reCAPTCHA assessment; passing users get an exemption cookie. Websites only (not mobile) |
| Frictionless assessment | Rules evaluate token score and attributes; action-tokens work on websites, iOS and Android; session-tokens only on websites |
| Redirect (302) | Serves an HTTP 302 to a configured URL |
| Decorate request | Adds custom headers with static values; must be added to an existing `allow` action |

## Notes

- Mobile applications support only reCAPTCHA action-tokens (no manual challenge page, no session-tokens).
- Create your own reCAPTCHA WAF site key and associate it with the security policy for manual challenges; otherwise a Google-managed site key is used and you cannot see its reCAPTCHA metrics. To prevent token theft, associate your own reCAPTCHA keys with the rule that evaluates tokens; Cloud Armor treats a token with an unknown key as invalid.
- Custom headers: if the header name matches one of the load balancer's custom headers (global external or classic Application Load Balancer), the load balancer overwrites the value. If the name already exists in the request (including standard HTTP headers), the original value is overwritten by the rule's value.
- Rate limiting: with no rate limiting rule, Cloud Armor imposes no limit on uses of each exemption cookie, action-token or session-token. For action-tokens the source recommends a low threshold (for example `1`) and a high interval (for example 30 minutes, the validity of an action-token), derived from your traffic statistics.
- Example rule sets from the source: manual challenge only (rule 1 allow with a valid exemption cookie under the use threshold, rule 2 redirect to reCAPTCHA); action-token only (rule 1 allow when score is above `0.8` and use count is under the threshold, rule 2 deny); action-token plus challenge (allow above `0.8`; redirect to reCAPTCHA above `0.5` unless a valid exemption cookie is attached; final rule deny).
- Deprecated: the gcloud 593.0.0 help marks `--action=redirect-to-recaptcha` "(DEPRECATED) ... This flag choice is deprecated. Use --action=redirect and --redirect-type=google-recaptcha instead."
- gcloud: the redirect action, reCAPTCHA site key, and header flags of `gcloud compute security-policies rules create` are `--action=redirect`, `--redirect-type=google-recaptcha`, `--recaptcha-action-site-keys`, `--recaptcha-session-site-keys`, and `--request-headers-to-add` (gcloud 593.0.0 help; https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules/create). The full flag list is in the `gcp-compute` skill. Configuration steps are on https://docs.cloud.google.com/armor/docs/configure-bot-management.
- reCAPTCHA product setup (`gcp-ai-apis`, planned) is outside this page.
- Source: https://docs.cloud.google.com/armor/docs/bot-management (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rate-limiting-overview.md](./rate-limiting-overview.md)
- [configure-waf.md](./configure-waf.md)
