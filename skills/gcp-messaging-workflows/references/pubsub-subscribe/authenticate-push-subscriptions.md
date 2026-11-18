---
source: https://docs.cloud.google.com/pubsub/docs/authenticate-push-subscriptions
---

# Authenticate Push Requests

If a push subscription uses authentication, Pub/Sub signs an OpenID Connect JWT and sends it in the `Authorization` header of each push request. Receivers must validate the signature and the claims (audience, service account email, `email_verified`) before trusting the message.

## Signature / Usage

### JWT format

The JWT is an OpenID Connect JWT with a header, claim set and signature, encoded as a base64 string with period delimiters and sent as `Authorization: Bearer <JWT>`. Decoded, the header and claim set look like this:

```text
{"alg":"RS256","kid":"7d680d8c70d44e947133cbd499ebc1a61c3d5abc","typ":"JWT"}

{
   "aud":"https://example.com",
   "azp":"113774264463038321964",
   "email":"gae-gcp@appspot.gserviceaccount.com",
   "sub":"113774264463038321964",
   "email_verified":true,
   "exp":1550185935,
   "iat":1550182335,
   "iss":"https://accounts.google.com"
  }
```

Tokens attached to requests sent to push endpoints may be up to an hour old.

### Configure Pub/Sub for push authentication

Set the push auth service account on the subscription and grant `roles/iam.serviceAccountTokenCreator` to the Pub/Sub service agent `service-{PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com`.

Adapted (not in the official docs): the source's `(create|update|modify-push-config)` alternation is not a runnable command and the role was granted on the whole project. The block uses `create` (with its required `--topic`), quotes the variables, and grants the role on the push auth service account only (the source allows the role on that service account or any ancestor).

```bash
# Configure the push subscription
gcloud pubsub subscriptions create "${SUBSCRIPTION}" \
 --topic="${TOPIC}" \
 --push-endpoint="${PUSH_ENDPOINT_URI}" \
 --push-auth-service-account="${SERVICE_ACCOUNT_EMAIL}" \
 --push-auth-token-audience="${OPTIONAL_AUDIENCE_OVERRIDE}"

# Your service agent
# `service-{PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com` needs to have the
# `iam.serviceAccountTokenCreator` role.
PUBSUB_SERVICE_ACCOUNT="service-${PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com"
gcloud iam service-accounts add-iam-policy-binding "${SERVICE_ACCOUNT_EMAIL}" \
 --member="serviceAccount:${PUBSUB_SERVICE_ACCOUNT}" \
 --role='roles/iam.serviceAccountTokenCreator'
```

`update` accepts the same `--push-auth-*` flags; `modify-push-config` takes the subscription as a positional argument and requires `--push-endpoint`.

### Validate tokens: protocol check

Validation means checking token integrity with signature validation and ensuring the `email` and `aud` claims match the values in the push subscription configuration. The `tokeninfo` endpoint shows the claims of a token:

```text
GET https://oauth2.googleapis.com/tokeninfo?id_token={BEARER_TOKEN}
```

Response:

```text
200 OK
```

Adapted (not in the official docs): the `email` claim uses `{YOUR_PROJECT_ID}` instead of `{YOUR_PROJECT_NAME}`, because service account emails contain the project ID.

```json
{
    "alg": "RS256",
    "aud": "example.com",
    "azp": "104176025330667568672",
    "email": "{SERVICE_ACCOUNT_NAME}@{YOUR_PROJECT_ID}.iam.gserviceaccount.com",
    "email_verified": "true",
    "exp": "1555463097",
    "iat": "1555459497",
    "iss": "https://accounts.google.com",
    "kid": "3782d3f0bc89008d9d2c01730f765cfb19d3b70e",
    "sub": "104176025330667568672",
    "typ": "JWT"
}
```

### Validate tokens: Node.js receiver

Adapted (not in the official docs): the source only carries a comment asking you to check `email` and `email_verified` after the signature and audience check. The handler now rejects the request unless `claim.email` equals the push service account (read from `PUSH_SERVICE_ACCOUNT_EMAIL`, so an unset value rejects everything) and `claim.email_verified` is `true`.

```javascript
const PUSH_SERVICE_ACCOUNT_EMAIL = process.env.PUSH_SERVICE_ACCOUNT_EMAIL;

app.post('/pubsub/authenticated-push', jsonBodyParser, async (req, res) => {
  // Verify that the request originates from the application.
  if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
    res.status(400).send('Invalid request');
    return;
  }

  // Verify that the push request originates from Cloud Pub/Sub.
  try {
    // Get the Cloud Pub/Sub-generated JWT in the "Authorization" header.
    const bearer = req.header('Authorization');
    const [, token] = bearer.match(/Bearer (.*)/);
    tokens.push(token);

    // Verify and decode the JWT.
    // Note: For high volume push requests, it would save some network
    // overhead if you verify the tokens offline by decoding them using
    // Google's Public Cert; caching already seen tokens works best when
    // a large volume of messages have prompted a single push server to
    // handle them, in which case they would all share the same token for
    // a limited time window.
    const ticket = await authClient.verifyIdToken({
      idToken: token,
      audience: 'example.com',
    });

    const claim = ticket.getPayload();

    // IMPORTANT: you should validate claim details not covered
    // by signature and audience verification above, including:
    //   - Ensure that `claim.email` is equal to the expected service
    //     account set up in the push subscription settings.
    //   - Ensure that `claim.email_verified` is set to true.
    if (
      claim.email !== PUSH_SERVICE_ACCOUNT_EMAIL ||
      claim.email_verified !== true
    ) {
      res.status(400).send('Unexpected email identity');
      return;
    }

    claims.push(claim);
  } catch (e) {
    res.status(400).send('Invalid token');
    return;
  }

  // The message is a unicode string encoded in base64.
  const message = Buffer.from(req.body.message.data, 'base64').toString(
    'utf-8'
  );

  messages.push(message);

  res.status(200).send();
});
```

### Validate tokens: Python receiver

Adapted (not in the official docs): after `verify_oauth2_token` (signature, `aud`, `exp`), the handler now rejects the request unless `claim["email"]` equals the push service account (from `PUSH_SERVICE_ACCOUNT_EMAIL`; unset rejects everything) and `claim["email_verified"]` is true.

```python
PUSH_SERVICE_ACCOUNT_EMAIL = os.environ.get("PUSH_SERVICE_ACCOUNT_EMAIL")

@app.route("/push-handlers/receive_messages", methods=["POST"])
def receive_messages_handler():
    # Verify that the request originates from the application.
    if request.args.get("token", "") != current_app.config["PUBSUB_VERIFICATION_TOKEN"]:
        return "Invalid request", 400

    # Verify that the push request originates from Cloud Pub/Sub.
    try:
        # Get the Cloud Pub/Sub-generated JWT in the "Authorization" header.
        bearer_token = request.headers.get("Authorization")
        token = bearer_token.split(" ")[1]
        TOKENS.append(token)

        # Verify and decode the JWT. `verify_oauth2_token` verifies
        # the JWT signature, the `aud` claim, and the `exp` claim.
        # Note: For high volume push requests, it would save some network
        # overhead if you verify the tokens offline by downloading Google's
        # Public Cert and decode them using the `google.auth.jwt` module;
        # caching already seen tokens works best when a large volume of
        # messages have prompted a single push server to handle them, in which
        # case they would all share the same token for a limited time window.
        claim = id_token.verify_oauth2_token(
            token, requests.Request(), audience="example.com"
        )

        # IMPORTANT: you should validate claim details not covered by signature
        # and audience verification above, including:
        #   - Ensure that `claim["email"]` is equal to the expected service
        #     account set up in the push subscription settings.
        #   - Ensure that `claim["email_verified"]` is set to true.
        if (
            claim.get("email") != PUSH_SERVICE_ACCOUNT_EMAIL
            or claim.get("email_verified") is not True
        ):
            return "Unexpected email identity", 400

        CLAIMS.append(claim)
    except Exception as e:
        return f"Invalid token: {e}\n", 400

    envelope = json.loads(request.data.decode("utf-8"))
    payload = base64.b64decode(envelope["message"]["data"])
    MESSAGES.append(payload)
    # Returning any 2xx status indicates successful receipt of the message.
    return "OK", 200
```

## Options / Props

### Roles and permissions

| Item | Detail |
|------|--------|
| `iam.serviceAccounts.actAs` | Required for the principal that creates, updates or modifies the push config, on the push auth service account (for example via `roles/iam.serviceAccountUser`). Missing it yields `permission denied` / `not authorized` |
| `iam.serviceAccounts.getOpenIdToken` or `roles/iam.serviceAccountTokenCreator` | Required for the Pub/Sub service agent `service-${PROJECT_NUMBER}@gcp-sa-pubsub.iam.gserviceaccount.com` (the signing service account), on the push auth service account or any ancestor resource such as the project |
| `roles/run.invoker` | Cloud Run: push auth service account bound to the Cloud Run service it invokes |
| `roles/cloudfunctions.invoker` | Cloud Run functions HTTP triggers invoked with Pub/Sub push requests |
| IAP-secured Web App User | App Engine secured with IAP: grant the push auth service account this role on the App Engine application |

### Claims to verify at the receiver

| Claim | Check |
|-------|-------|
| Signature / `iss` | Token integrity via signature validation; issuer `https://accounts.google.com` |
| `aud` | Matches the audience configured on the push subscription |
| `email` | Equals the push auth service account set in the subscription |
| `email_verified` | `true` |
| `exp` | Not expired (tokens may be up to an hour old) |

## Notes

- Firewall: a subscriber behind a firewall can't receive push requests (you might get `403 permission denied`); to receive them, turn off the firewall and verify the JWT.
- Audience: `--push-auth-token-audience` defaults to the push endpoint when not specified (gcloud 593.0.0 help). If an authenticated push subscription targets an App Engine app secured with Identity-Aware Proxy, provide the IAP Client ID (`IAP-App-Engine-app` Client ID on the Credentials page) as the audience; the IAP JWT header is `x-goog-iap-jwt-assertion` and must be validated accordingly. The Node.js and Python samples verify the audience `example.com`: pass the same value as `OPTIONAL_AUDIENCE_OVERRIDE` in the gcloud block, or replace `example.com` with the audience set on the subscription (the push endpoint URL when no audience is set).
- Two mechanisms make the claims meaningful: the caller of CreateSubscription / UpdateSubscription / ModifyPushConfig needs `iam.serviceAccounts.actAs` on the push auth service account, and access to the signing certificates is tightly controlled (Pub/Sub calls an internal Google service as the service agent).
- Adapted from the official docs: the gcloud block originally read `gcloud pubsub subscriptions (create|update|modify-push-config) ${SUBSCRIPTION} ...` and `gcloud projects add-iam-policy-binding ${PROJECT_ID} --member="serviceAccount:${PUBSUB_SERVICE_ACCOUNT}" --role='roles/iam.serviceAccountTokenCreator'` (project-wide grant).
- Corrected from the official docs: the Node.js and Python receivers only contained the comment "Ensure that `claim.email` is equal to the expected service account ... Ensure that `claim.email_verified` is set to true" without enforcing it; the C#, Java and Ruby samples have the same gap, while the Go sample enforces both checks.
- Corrected from the official docs: the `tokeninfo` response showed `"email": "{SERVICE_ACCOUNT_NAME}@{YOUR_PROJECT_NAME}.iam.gserviceaccount.com"`; the other Pub/Sub and Workflows pages write service account emails as `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`.
- The samples also compare a `token` query parameter to `PUBSUB_VERIFICATION_TOKEN` (an environment variable described in the App Engine "Writing and responding to Pub/Sub messages" guide); this is an extra shared secret, not a replacement for JWT validation.
- Cloud Run and App Engine functions authenticate HTTP calls from Pub/Sub by verifying the Pub/Sub-generated tokens; the only configuration needed is granting the IAM roles to the caller account. For Cloud Run functions Pub/Sub triggers, roles are auto-configured. In first-generation App Engine runtimes, push requests to `/_ah/push-handlers/.*` in the same project were authorized as admin users; this ACL is no longer supported in second-generation runtimes, so grant IAM roles to the push auth service account.
- The `tokeninfo` request puts the token in a URL; use it for inspection only and verify tokens in code with a Google auth library.
- The source also shows Console, C#, Go, Java and Ruby receivers and the encoded example JWT.
- Source: https://docs.cloud.google.com/pubsub/docs/authenticate-push-subscriptions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-push-subscription.md](./create-push-subscription.md)
- [push.md](./push.md)
