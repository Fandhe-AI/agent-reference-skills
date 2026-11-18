---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/configure-remote-authentication
---

# Configure authentication to remote repository upstreams

Lets a remote repository pull and cache packages from an external registry with your account credentials: store a personal access token in Secret Manager, let the Artifact Registry service agent read the secret version, and attach the secret to the remote repository.

## Signature / Usage

### Preset upstream sources

Preset upstreams have their own guides: Docker Hub, Maven Central, the npm registry and the Python Package Index (PyPI). The steps below apply to user-defined upstream sources.

### 1. Save your access token in a secret

Create an access token in the private registry, create a secret in Secret Manager, and save the token as a secret version.

### 2. Grant the Artifact Registry service agent access to the secret

The service agent identifier is:

```text
service-PROJECT-NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com
```

`PROJECT-NUMBER` is the project number of the Google Cloud project where Artifact Registry is running. Grant it the Secret Manager Secret Accessor role on the secret:

Adapted (not in the official docs): removed the `$ ` prompt prefix and renamed the lower-case placeholders `secret-id` and `member` to `SECRET_ID` and `MEMBER` so the command can be copied.

```bash
gcloud secrets add-iam-policy-binding SECRET_ID \
    --member="MEMBER" \
    --role="roles/secretmanager.secretAccessor"
```

`MEMBER` is an IAM member such as a user, group, or service account (here: `serviceAccount:` followed by the service agent identifier above).

Adapted (not in the official docs): the Node.js sample's `require` and constructor were reduced to link text in the source; restored to the `@google-cloud/secret-manager` package and `SecretManagerServiceClient` (the package name and class as the `gcp-client-libraries` skill shows them; the source's link URL points to the `secret-manager` Node.js reference).

```javascript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const name = 'projects/my-project/secrets/my-secret';
// const member = 'user:you@example.com';
//
// NOTE: Each member must be prefixed with its type. See the IAM documentation
// for more information: https://cloud.google.com/iam/docs/overview.

// Imports the Secret Manager library
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

// Instantiates a client
const client = new SecretManagerServiceClient();

async function grantAccess() {
  // Get the current IAM policy.
  const [policy] = await client.getIamPolicy({
    resource: name,
  });

  // Add the user with accessor permissions to the bindings list.
  policy.bindings.push({
    role: 'roles/secretmanager.secretAccessor',
    members: [member],
  });

  // Save the updated IAM policy.
  await client.setIamPolicy({
    resource: name,
    policy: policy,
  });

  console.log(`Updated IAM policy for ${name}`);
}

grantAccess();
```

Python equivalent:

Adapted (not in the official docs): removed the return annotation `-> iam_policy_pb2.SetIamPolicyRequest`, because `iam_policy_pb2` is never imported in the sample and the annotation raises `NameError` when the function is defined.

```python
def iam_grant_access(
    project_id: str, secret_id: str, member: str
):
    """
    Grant the given member access to a secret.
    """

    # Import the Secret Manager client library.
    from google.cloud import secretmanager

    # Create the Secret Manager client.
    client = secretmanager.SecretManagerServiceClient()

    # Build the resource name of the secret.
    name = client.secret_path(project_id, secret_id)

    # Get the current IAM policy.
    policy = client.get_iam_policy(request={"resource": name})

    # Add the given member with access permissions.
    policy.bindings.add(role="roles/secretmanager.secretAccessor", members=[member])

    # Update the IAM Policy.
    new_policy = client.set_iam_policy(request={"resource": name, "policy": policy})

    # Print data about the secret.
    print(f"Updated IAM policy on {secret_id}")
```

### 3. Add upstream credentials to your remote repository

```bash
gcloud artifacts repositories update REPOSITORY \
    --project=PROJECT_ID \
    --location=LOCATION \
    --remote-username=USERNAME \
    --remote-password-secret-version=projects/SECRET_PROJECT_ID/secrets/SECRET_ID/versions/SECRET_VERSION
```

The credentials are used the next time the remote repository requests an artifact from the upstream source.

## Options / Props

### Required roles (on the project)

| Role | ID |
|---|---|
| Artifact Registry Admin | `roles/artifactregistry.admin` |
| Secret Manager Admin | `roles/secretmanager.admin` |

### Placeholders

| Name | Description |
|---|---|
| `REPOSITORY` | Name of the remote repository |
| `PROJECT_ID` | Your Google Cloud project ID |
| `LOCATION` | Regional or multi-regional location; can be omitted if a default is set; list with `gcloud artifacts locations list` |
| `USERNAME` | Your upstream source username |
| `SECRET_PROJECT_ID` | Project ID of the project in which the secret was created |
| `SECRET_ID` | Name of the secret |
| `SECRET_VERSION` | Secret version holding the access token |

## Notes

- The secret holds a long-lived upstream credential. Never put the token in a repository config, command line or `cloudbuild.yaml`; reference the secret version only.
- Grant the Secret Accessor role on the individual secret (as shown), not on the whole project. Binding the service agent only to this one secret limits its reach.
- Adapted from the official docs: the gcloud command was shown as `$ gcloud secrets add-iam-policy-binding secret-id --member="member" ...`. The Node.js sample showed `require('https://docs.cloud.google.com/nodejs/docs/reference/secret-manager/latest/overview.html')` and `new https://docs.cloud.google.com/nodejs/docs/reference/secret-manager/latest/overview.html()` (link text substituted for identifiers).
- The source also shows a REST `setIamPolicy` curl call that replaces the entire IAM policy of the secret (no etag, existing bindings lost); it is omitted because it overwrites policy. Use the gcloud or client-library forms above, which read-modify-write.
- A remote repository's authentication mode can be changed from unauthenticated to authenticated, but not back (see `remote-repo.md`).
- Adapted from the official docs: the Python sample's return annotation `-> iam_policy_pb2.SetIamPolicyRequest` (undefined name) is removed.
- The source also shows Console and the C#, Go, Java, PHP and Ruby samples. Client libraries need Application Default Credentials set up first.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/configure-remote-authentication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [remote-repo.md](./remote-repo.md)
- [remote-overview.md](./remote-overview.md)
