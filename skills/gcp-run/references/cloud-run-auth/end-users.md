---
source: https://docs.cloud.google.com/run/docs/authenticating/end-users
---

# Authenticate end users

Restrict a Cloud Run service to allowed users. End users (who register their own accounts) are authenticated with Identity Platform or Firebase Authentication; internal users in your organization are authenticated with Identity-Aware Proxy (IAP).

## Signature / Usage

### End users with Identity Platform or Firebase Authentication

The public web or mobile app handles sign-in and then makes authenticated API calls to the Cloud Run service. The service itself must verify ID tokens in its own code, because the service is deployed publicly (the public app can itself run on a public Cloud Run service).

1. Add code to your Cloud Run service to verify ID tokens (Firebase Admin SDK: https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk).
2. Deploy the service publicly (see the command below).
3. Set up Identity Platform in your project.
4. In the web or mobile app, get an ID token with the Firebase Auth client library (Android `GetTokenResult().getToken()`, iOS `User.getIDTokenResult(completion:)`, Web `firebase.User.getIdToken()`) and send it in an `Authorization: Bearer ID_TOKEN` header.

Snippet taken from https://docs.cloud.google.com/run/docs/authenticating/public (public-access deploy; this page only says to deploy publicly):

```bash
gcloud run deploy SERVICE_NAME --no-invoker-iam-check
```

### Internal users with IAP

Use Identity-Aware Proxy for internal users; see "Configure Identity-Aware Proxy for Cloud Run" (https://docs.cloud.google.com/run/docs/securing/identity-aware-proxy-cloud-run).

## Options / Props

| User type | Mechanism |
|---|---|
| End users (email/password, phone, social providers such as Google, Facebook, GitHub, or custom) | Identity Platform or Firebase Authentication |
| Internal users (explicitly granted by an administrator) | Identity-Aware Proxy |
| User profile data | Firebase Admin SDK network request to retrieve user data, or a Google API Client Library |
| Preflighted CORS requests with authenticated services | Prefer IAP over IAM authentication so IAP can allow unauthenticated `OPTIONS` requests |

## Notes

- Making the service public (`--no-invoker-iam-check`) makes it publicly accessible at the network/IAM level; use only for intentionally public content, with the application verifying every ID token. The source only says "Deploy your Cloud Run service publicly"; IAP is the source's mechanism for internal users.
- Cloud Run does not help share sessions between instances and does not guarantee session affinity to a specific instance.
- Even when IAP allows the `OPTIONS` preflight request, the application code deployed to Cloud Run must still handle the CORS preflight and the following actual request by sending the appropriate CORS headers.
- Programmatic authentication to an IAP-secured service with OAuth 2.0: https://docs.cloud.google.com/iap/docs/authentication-howto
- End-to-end tutorial: https://docs.cloud.google.com/run/docs/tutorials/identity-platform
- `gcloud run deploy SERVICE_NAME --no-invoker-iam-check` (verbatim) has no `--image`; the deploy command defaults to source deployment (of the current directory) when neither `--image` nor `--source` is supplied (https://docs.cloud.google.com/run/docs/deploying-source-code). Add `--image IMAGE_URL` to deploy an existing image.
- Source: https://docs.cloud.google.com/run/docs/authenticating/end-users (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/authenticating/public

## Related

- [public.md](./public.md)
- [service-to-service.md](./service-to-service.md)
- [developers.md](./developers.md)
