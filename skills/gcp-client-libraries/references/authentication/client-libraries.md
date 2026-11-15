---
source: https://docs.cloud.google.com/docs/authentication/client-libraries
---

# Authenticating with Client Libraries (ADC, External Credentials, Quota Project)

Client libraries find credentials through Application Default Credentials (ADC) when the client is created, so application code does not authenticate explicitly or manage tokens. This page covers the Node.js and Python side: implicit ADC, validating credential configurations that come from an external source, and setting the quota project from client options or an environment variable.

## Signature / Usage

### Implicit ADC (Node.js)

The client is created without credentials; the library finds them through ADC.

```javascript
/**
 * TODO(developer):
 *  1. Uncomment and replace these variables before running the sample.
 *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
 *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
 *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
 */
// const projectId = 'YOUR_PROJECT_ID';

const {Storage} = require('@google-cloud/storage');

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();
```

### Implicit ADC (Python)

```python

from google.cloud import storage


def authenticate_implicit_with_adc(project_id: str = "your-google-cloud-project-id") -> None:
    """
    When interacting with Google Cloud Client libraries, the library can auto-detect the
    credentials to use.

    // TODO(Developer):
    //  1. Before running this sample,
    //  set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
    //  2. Replace the project variable.
    //  3. Make sure that the user account or service account that you are using
    //  has the required permissions. For this sample, you must have "storage.buckets.list".
    Args:
        project_id: The project id of your Google Cloud project.
    """

    # This snippet demonstrates how to list buckets.
    # *NOTE*: Replace the client created below with the client required for your application.
    # Note that the credentials are not specified when constructing the client.
    # Hence, the client library will look for credentials using ADC.
    storage_client = storage.Client(project=project_id)
    buckets = storage_client.list_buckets()
    print("Buckets:")
    for bucket in buckets:
        print(bucket.name)
    print("Listed all storage buckets.")
```

### Validate credential configurations from an external source

If your application accepts only service account keys, use a credential loader specific to service account keys. It parses only the fields present for service account keys.

Adapted (not in the official docs): JWT.fromJSON is an instance method returning void in google-auth-library 11.3.4, so the client is constructed first and then populated; the `JWT` import was added.

```javascript
const {JWT} = require('google-auth-library');
const keys = JSON.parse(json_input);
const authClient = new JWT();
authClient.fromJSON(keys);
```

```python
cred = service_account.Credentials.from_service_account_info(json_data)
```

If you cannot use a type-specific loader, confirm that the `type` field is `service_account`; for any other value, do not use the service account key.

### Quota project

Set the quota project through client options when you create the client. The source gives no Node.js or Python code for this and defers to each library's documentation. The only client-side name it states is the environment variable below.

## Options / Props

### Fields to validate for non-service-account credential configurations

If your application accepts any credential type besides a service account key (ADC credential files, Workload Identity Federation credential files, Workforce Identity Federation login configuration files), validate these fields when present. If any field does not conform to the expected value, do not use the credential.

| Field | Purpose | Expected value |
|---|---|---|
| `service_account_impersonation_url` | Endpoint used to generate an access token for the impersonated service account. | `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/service account email:generateAccessToken` |
| `token_url` | Endpoint where an external token is exchanged for a federated access token. | `https://sts.googleapis.com/v1/token` |
| `credential_source.file` | File the library reads an external token from, then sends to `token_url`. | The path for a file containing an external token. You should recognize this path. |
| `credential_source.url` | Endpoint that returns an external token. | A well-known endpoint provided by your cloud provider, or an endpoint you explicitly set up to provide tokens. |
| `credential_source.executable.command` | Run when `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` is `1`. | An executable file or command that returns an external token. You should recognize it and validate that it is safe. |
| `credential_source.aws.url` | Retrieves an AWS security token. | `http://169.254.169.254/latest/meta-data/iam/security-credentials` or `http://[fd00:ec2::254]/latest/meta-data/iam/security-credentials` |
| `credential_source.aws.region_url` | Retrieves the active AWS region. | `http://169.254.169.254/latest/meta-data/placement/availability-zone` or `http://[fd00:ec2::254]/latest/meta-data/placement/availability-zone` |
| `credential_source.aws.imdsv2_session_token_url` | Retrieves the AWS session token. | `http://169.254.169.254/latest/api/token` or `http://[fd00:ec2::254]/latest/api/token` |

### Quota project

| Setting | Node.js | Python |
|---|---|---|
| Environment variable | `GOOGLE_CLOUD_QUOTA_PROJECT` | `GOOGLE_CLOUD_QUOTA_PROJECT` |

Precedence when several are set: programmatic (client options), then environment variable, then the credentials used to authenticate. The principal must have the required permission on the quota project (`roles/serviceusage.serviceUsageConsumer`, which contains `serviceusage.services.use`; not needed for a project you created). If none yields a quota project, the request fails.

## Notes

- Applies to the Google Cloud client libraries for Node.js (`@google-cloud/*`) and Python (`google-cloud-*`); the page's Go / Java / PHP / Ruby / C# / C++ tabs are dropped. The page has no Rust section.
- For gcloud-side ADC setup (user credentials, impersonation, attached service accounts), see the `gcp-foundation` skill.
- Quota project: merged here from the `set-quota-project` page, whose "Client library" section has no code. Not repeated here: the gcloud `billing/quota_project` property and `--billing-project`, the REST `x-goog-user-project` header, and `quotaUser`.
- Quota precedence if nothing is specified: API key project, gcloud CLI shared project (not all APIs fall back on it), service account project (including by impersonation), then the workforce pool user project.
- Do not log or print credentials or tokens. The page's samples only print bucket names.
- Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Fragments: the two "Validate" blocks (undefined `json_input`, `service_account`, `json_data`) and the Node.js ADC block, which uses an undeclared `projectId` (its declaration is commented out in the source).
- The final `authenticateImplicitWithAdc();` call in the Node.js ADC block does not handle the returned promise; append `.catch(console.error)` when running it.
- Corrected from the official docs: the original reads `const authClient = JWT.fromJSON(keys);`; in google-auth-library 11.3.4 `fromJSON` is an instance method of `JWT` returning `void` (`jwtclient.d.ts`: `fromJSON(json: JWTInput): void;`, constructor `constructor(options?: JWTOptions);`).
- This is the Google Cloud client library, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill) and from `googleapis` (the Node.js Google API Client Library for REST discovery APIs).
- Source: https://docs.cloud.google.com/docs/authentication/client-libraries (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/docs/quotas/set-quota-project (retrieved 2026-11-16; CC BY 4.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/jwtclient.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [api-keys-use.md](./api-keys-use.md)
- [use-service-account-impersonation.md](./use-service-account-impersonation.md)
