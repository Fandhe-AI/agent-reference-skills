---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#accessing-resources-from-aws-using-a-custom-aws-security-credentials-supplier
---

# External account custom suppliers (AWS, OIDC, SAML 2.0)

When the external credentials cannot be retrieved by the methods the library supports natively, pass a custom supplier when you construct the external account client: an `AwsSecurityCredentialsSupplier` for an `AwsClient`, or a `SubjectTokenSupplier` for an `IdentityPoolClient`. The supplier must return valid, unexpired credentials or tokens when the GCP credential calls it. The client does not cache what the supplier returns, so implement caching in the supplier to prevent multiple requests for the same resources.

## Signature / Usage

### Custom AWS security credentials supplier

Requirements: a workload identity pool, AWS added as an identity provider in the pool (the Google organization policy must allow federation from AWS), and permission to impersonate a service account granted to the external identity. Use this for AWS environments other than EC2, such as ECS, EKS or Fargate. Replace `$PROJECT_NUMBER`, `$WORKLOAD_POOL_ID`, `$PROVIDER_ID` and `$EMAIL`.

```ts
import { AwsClient, AwsSecurityCredentials, AwsSecurityCredentialsSupplier, ExternalAccountSupplierContext } from 'google-auth-library';
import { fromNodeProviderChain } from '@aws-sdk/credential-providers';
import { Storage } from '@google-cloud/storage';

class AwsSupplier implements AwsSecurityCredentialsSupplier {
  private readonly region: string

  constructor(region: string) {
    this.region = region;
  }

  async getAwsRegion(context: ExternalAccountSupplierContext): Promise<string> {
    // Return the AWS region i.e. "us-east-2".
    return this.region
  }

  async getAwsSecurityCredentials(
    context: ExternalAccountSupplierContext
  ): Promise<AwsSecurityCredentials> {
    // Retrieve the AWS credentails.
    const awsCredentialsProvider = fromNodeProviderChain();
    const awsCredentials = await awsCredentialsProvider();

    // Parse the AWS credentials into a AWS security credentials instance and
    // return them.
    const awsSecurityCredentials = {
      accessKeyId: awsCredentials.accessKeyId,
      secretAccessKey: awsCredentials.secretAccessKey,
      token: awsCredentials.sessionToken
    }
    return awsSecurityCredentials;
  }
}

const clientOptions = {
  audience: '//iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$WORKLOAD_POOL_ID/providers/$PROVIDER_ID', // Set the GCP audience.
  subject_token_type: 'urn:ietf:params:aws:token-type:aws4_request', // Set the subject token type.
  aws_security_credentials_supplier: new AwsSupplier("AWS_REGION"), // Set the custom supplier.
  service_account_impersonation_url: 'https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/$EMAIL:generateAccessToken', // Set the service account impersonation url.
}

// Create a new Auth client and use it to create service client, i.e. storage.
const authClient = new AwsClient(clientOptions);
const storage = new Storage({ authClient });
```

### Custom subject token supplier (OIDC or SAML 2.0, workload identity)

For OIDC or SAML 2.0 tokens the library cannot fetch natively. Replace `$PROJECT_NUMBER`, `$WORKLOAD_POOL_ID` and `$PROVIDER_ID`. The workforce variant (workforce pool audience) is in `workforce-identity-federation.md`.

Adapted (not in the official docs): the README ended with `new CustomSupplier(clientOptions)`, which constructs the supplier rather than a client; it now constructs an `IdentityPoolClient`, as the surrounding text describes.

```ts
class CustomSupplier implements SubjectTokenSupplier {
  async getSubjectToken(
    context: ExternalAccountSupplierContext
  ): Promise<string> {
    const audience = context.audience;
    const subjectTokenType = context.subjectTokenType;
    // Return a valid subject token for the requested audience and subject token type.
  }
}

const clientOptions = {
  audience: '//iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$WORKLOAD_POOL_ID/providers/$PROVIDER_ID', // Set the GCP audience.
  subject_token_type: 'urn:ietf:params:oauth:token-type:id_token', // Set the subject token type.
  subject_token_supplier: new CustomSupplier() // Set the custom supplier.
}

const client = new IdentityPoolClient(clientOptions);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `aws_security_credentials_supplier` | `AwsSecurityCredentialsSupplier` | `AwsClientOptions`. Called to retrieve the AWS region and AWS security credentials. Either this or a valid credential source must be specified. |
| `getAwsRegion(context)` | `Promise<string>` | `AwsSecurityCredentialsSupplier`. Gets the active AWS region. |
| `getAwsSecurityCredentials(context)` | `Promise<AwsSecurityCredentials>` | `AwsSecurityCredentialsSupplier`. Gets valid AWS security credentials (`accessKeyId`, `secretAccessKey`, optional `token`); not cached by the calling `AwsClient`. |
| `subject_token_supplier` | `SubjectTokenSupplier` | `IdentityPoolClientOptions`. Called to retrieve the subject token to exchange for a GCP access token. Either this or a valid credential source should be specified. |
| `getSubjectToken(context)` | `Promise<string>` | `SubjectTokenSupplier`. Gets a valid subject token; not cached by the calling `IdentityPoolClient`. |
| `ExternalAccountSupplierContext` | interface | `audience` (requested external account audience), `subjectTokenType` (for example `urn:ietf:params:oauth:token-type:jwt`, `urn:ietf:params:aws:token-type:aws4_request`, `urn:ietf:params:oauth:token-type:saml2`, `urn:ietf:params:oauth:token-type:id_token`) and `transporter` (the `Gaxios` instance to use for requests). |
| `audience` | string | `//iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$WORKLOAD_POOL_ID/providers/$PROVIDER_ID`. |

The values for audience, service account impersonation URL and any other builder field can also be found by generating a credential configuration file with `gcloud iam workload-identity-pools create-cred-config` (see `workload-identity-federation.md`).

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`. `AwsClient`, `AwsSecurityCredentials`, `AwsSecurityCredentialsSupplier`, `ExternalAccountSupplierContext`, `IdentityPoolClient`, `IdentityPoolClientOptions` and `SubjectTokenSupplier` are exported from the package index.
- Using ADC with AWS workloads is currently supported only on EC2 (README); a custom supplier covers other AWS environments such as ECS, EKS and Fargate.
- Corrected from the official docs: original line `const client = new CustomSupplier(clientOptions);` (README "Accessing resources from an OIDC or SAML2.0 identity provider using a custom supplier"; it constructs the supplier, not an auth client).
- Fragments: the OIDC / SAML block has no imports and `getSubjectToken` has no return statement; the AWS block needs the `$` placeholders replaced and `@aws-sdk/credential-providers` installed.
- The `getAwsSecurityCredentials` return value contains AWS secret credentials; do not log it.
- The README's sample links (`customCredentialSupplierAwsWorkload.js` and others) point to unpinned `main` and are not reproduced.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#accessing-resources-from-aws-using-a-custom-aws-security-credentials-supplier (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#accessing-resources-from-an-oidc-or-saml20-identity-provider-using-a-custom-supplier (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/awsclient.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/identitypoolclient.ts (pinned at tag google-auth-library-v11.3.4)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/baseexternalclient.ts (pinned at tag google-auth-library-v11.3.4)

## Related

- [workload-identity-federation.md](./workload-identity-federation.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
- [adc-googleauth.md](./adc-googleauth.md)
