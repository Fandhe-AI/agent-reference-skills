---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/validate-request-signature
---

# Validate an approved request signature

Each approved Access Approval request is signed with an asymmetric key (Google-owned and managed, or a customer-provided Cloud KMS key). Validating the signature confirms the serialized approved request bytestring; to finish validating the approval, deserialize the message and compare it with the approved request.

## Signature / Usage

### Request signed with a Google-owned and managed key

On the approved request's **Request details** page, copy the **Google-managed public key**, **Signature**, and **Serialized Approval Request** values into Cloud Shell, then verify. Replace the upper-case placeholders with the copied field contents.

```bash
echo GOOGLE_MANAGED_PUBLIC_KEY > ./public_key
```

```bash
echo SIGNATURE > ./signature.txt
```

```bash
base64 ./signature.txt -d > ./decoded_signature
```

```bash
echo SERIALIZED_APPROVAL_REQUEST > ./serialized_approval_request.txt
```

```bash
base64 ./serialized_approval_request.txt -d > ./decoded_serialized_approval_request
```

```bash
openssl dgst \
    -sha256 \
    -verify ./public_key \
    -signature ./decoded_signature \
    ./decoded_serialized_approval_request
```

A valid signature prints `Verified OK`.

### Request signed with a customer-provided key

Save the signature and serialized request the same way (`signature.txt`, `decoded_signature`, `serialized_approval_request.txt`, `decoded_serialized_approval_request`). Under **Customer-managed key**, note the key resource identifier, retrieve its public key from Cloud KMS in PEM format and save it as `./public_key`, then run the same `openssl dgst` command:

```bash
openssl dgst \
    -sha256 \
    -verify ./public_key \
    -signature ./decoded_signature \
    ./decoded_serialized_approval_request
```

## Options / Props

### Required role

| Role | Grant to | Scope |
|---|---|---|
| Cloud KMS CryptoKey Signer/Verifier (`roles/cloudkms.signerVerifier`) | The Access Approval service account for your resource, not your user account | On the key, key ring, or key project |

## Notes

- Granting the role to the wrong principal (for example, your user account) might cause permission errors.
- The commands are written for Cloud Shell, as in the source.
- The source also shows Console steps for copying the fields.
- Retrieving the customer-managed key's public key is documented in the Cloud KMS guide `https://docs.cloud.google.com/kms/docs/retrieve-public-key` (see the `gcp-security` skill).
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/validate-request-signature (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [approve-requests.md](./approve-requests.md)
- [review-approve-access-requests-google-keys.md](./review-approve-access-requests-google-keys.md)
