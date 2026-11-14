---
source: https://docs.cloud.google.com/docs/authentication/api-keys-best-practices
---

# Best practices for managing API keys

Publicly exposing API keys can lead to unexpected charges or unauthorized access to your data. Keep keys secure during storage and transmission.

## Signature / Usage

Pass the key in a header rather than a query parameter:

```
curl -X POST \
    -H "X-goog-api-key: API_KEY" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"
```

Practices:

- **Add API key restrictions**: limit how a key can be used to reduce the impact of a compromise.
- **Avoid query parameters** for the key: the key ends up in the URL and can be stolen through URL scans. Use the `x-goog-api-key` HTTP header or a client library.
- **Delete unneeded keys**: keep only keys in active use to minimize attack surface.
- **Don't include keys in client code or commit them to repositories**: hardcoded or repository-stored keys can be intercepted. The client should pass requests to the server, which adds the credential and issues the request.
- **Don't use authorization keys in production**: they are designed to accelerate the initial developer experience. For most APIs plan to migrate to IAM policies and short-lived service account credentials with least privilege. Reasons: keys are sent alongside requests (more likely to be exposed or logged); they are bearer credentials (a stolen authorization key authenticates as that service account); and they obscure the end user's identity in audit logs.
- **Implement strong monitoring and logging** (Cloud Monitoring, Cloud Logging) to alert on unauthorized usage.
- **Isolate API keys**: give each team member their own key per application for access control, audit trail, and reduced blast radius.
- **Rotate keys periodically**: create new keys, update applications, delete the old keys.
- **Consider a more secure method** of authorizing access (see authentication methods).

## Notes

- Exception for authorization keys in production: the Gemini API, because it doesn't create resources in Google Cloud projects. When moving a Gemini API project to production, make sure the service account the authorization key is bound to isn't granted any IAM roles. Gemini API key usage itself is covered by the `google-gemini-api` skill.
- Source: https://docs.cloud.google.com/docs/authentication/api-keys-best-practices (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-api-keys.md](./manage-api-keys.md)
- [use-api-keys.md](./use-api-keys.md)
- [../overview/authentication-overview.md](../overview/authentication-overview.md)
