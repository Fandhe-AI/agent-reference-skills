---
source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst
---

# External Accounts: Custom Subject Token and AWS Suppliers

For workload identity federation, the subject token can come from your own Python supplier class instead of a file, URL or executable: a `SubjectTokenSupplier` returns an OIDC or SAML subject token, and an `AwsSecurityCredentialsSupplier` returns AWS security credentials. The library exchanges the result for a Google Cloud access token.

## Signature / Usage

### Custom supplier: OIDC or SAML

Implement `google.auth.identity_pool.SubjectTokenSupplier` and pass it to `identity_pool.Credentials`. The supplier must return a valid OIDC or SAML 2.0 subject token, exchanged for a Google Cloud access token. On failure it should raise `google.auth.exceptions.RefreshError` and indicate via `retryable` whether retrieval can be retried. Each call receives a `google.auth.external_account.SupplierContext` (requested audience and subject token type) and the `google.auth.transport.requests.Request` from the refresh call, usable for HTTP requests.

Adapted (not in the official docs): the subject token type is `urn:ietf:params:oauth:token-type:jwt`; the official example passes `urn:ietf:params:aws:token-type:jwt`, which is not one of the token types the same guide allows.

```python
from google.auth import exceptions
from google.auth import identity_pool

class CustomSubjectTokenSupplier(identity_pool.SubjectTokenSupplier):

    def get_subject_token(self, context, request):
        audience = context.audience
        subject_token_type = context.subject_token_type
        try:
            # Attempt to return the valid subject token of the requested type for the requested audience.
        except Exception as e:
            # If token retrieval fails, raise a refresh error, setting retryable to true if the client should
            # attempt to retrieve the subject token again.
            raise exceptions.RefreshError(e, retryable=True)

supplier = CustomSubjectTokenSupplier()

credentials = identity_pool.Credentials(
    AUDIENCE, # Set GCP Audience.
    "urn:ietf:params:oauth:token-type:jwt", # Set subject token type.
    subject_token_supplier=supplier, # Set supplier.
    scopes=SCOPES # Set desired scopes.
)
```

### Custom supplier: AWS

Implement `google.auth.aws.AwsSecurityCredentialsSupplier` and pass it to `aws.Credentials`.

```python
from google.auth import aws
from google.auth import exceptions

class CustomAwsSecurityCredentialsSupplier(aws.AwsSecurityCredentialsSupplier):

    def get_aws_security_credentials(self, context, request):
        audience = context.audience
        try:
            # Return valid AWS security credentials. These credentials are not cached by
            # the google credential, so caching should be implemented in the supplier.
            return aws.AwsSecurityCredentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY, SESSION_TOKEN)
        except Exception as e:
            # If credentials retrieval fails, raise a refresh error, setting retryable to true if the client should
            # attempt to retrieve the subject token again.
            raise exceptions.RefreshError(e, retryable=True)

    def get_aws_region(self, context, request):
        # Return active AWS region.

supplier = CustomAwsSecurityCredentialsSupplier()

credentials = aws.Credentials(
    AUDIENCE, # Set GCP Audience.
    "urn:ietf:params:aws:token-type:aws4_request", # Set AWS subject token type.
    aws_security_credentials_supplier=supplier, # Set supplier.
    scopes=SCOPES # Set desired scopes.
)
```

## Options / Props

Abstract methods (from the class docstrings in `identity_pool.py` and `aws.py`):

| Class | Method | Returns |
|-------|--------|---------|
| `identity_pool.SubjectTokenSupplier` | `get_subject_token(context, request)` | `str`: the requested subject token |
| `aws.AwsSecurityCredentialsSupplier` | `get_aws_security_credentials(context, request)` | `AwsSecurityCredentials` |
| `aws.AwsSecurityCredentialsSupplier` | `get_aws_region(context, request)` | `str`: the AWS region |

`external_account.SupplierContext` attributes: `subject_token_type` (the requested subject token type) and `audience` (the requested audience for the subject token). Allowed subject token types for OIDC / SAML are listed in [external-account-executable.md](./external-account-executable.md).

## Notes

- Supplier audience: `//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID`. The audience, impersonation URL and other builder fields can also be found by generating a credential configuration file with gcloud.
- Corrected from the official docs: the guide writes this audience as `///iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID` (three slashes). From a comment in the function body of `Credentials._build_regional_access_boundary_lookup_url` in `google/auth/external_account.py` (not in a docstring): "Audience format: //iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID"; the body of `Credentials.project_number` likewise comments "STS audience pattern: //iam.googleapis.com/projects/$PROJECT_NUMBER/locations/...".
- Corrected from the official docs: the supplier example passed `"urn:ietf:params:aws:token-type:jwt", # Set subject token type.`; the guide's token type list allows only `urn:ietf:params:oauth:token-type:jwt`, `urn:ietf:params:oauth:token-type:id_token` and `urn:ietf:params:oauth:token-type:saml2`.
- Neither supplier's result is cached by the Google credential; implement caching in the supplier (docstrings of `SubjectTokenSupplier` and `AwsSecurityCredentialsSupplier`).
- Fragments (syntactically incomplete): the `try:` body containing only comments, the empty `get_aws_region` body, and the undefined `AUDIENCE`, `SCOPES`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `SESSION_TOKEN` are placeholders in the official example, not runnable code. Read AWS keys from a secret source, never literals.
- Security: the library does not validate `token_url`, `token_info_url` or `service_account_impersonation_url`; see [external-account-wif.md](./external-account-wif.md).
- Source inconsistency: the official prose names `google.auth.identity_pool.Credential` and `google.auth.aws.Credential`; the examples (and the module classes) use `Credentials`.
- Applies to google-auth 2.62.2 (PyPI); Python `>=3.10`.
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/docs/user-guide.rst (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/external_account.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/identity_pool.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)
- Source: https://github.com/googleapis/google-cloud-python/blob/google-auth-v2.62.2/packages/google-auth/google/auth/aws.py (retrieved 2026-11-16; pinned at tag google-auth-v2.62.2)

## Related

- [external-account-executable.md](./external-account-executable.md)
- [external-account-wif.md](./external-account-wif.md)
- [workforce-identity-federation.md](./workforce-identity-federation.md)
