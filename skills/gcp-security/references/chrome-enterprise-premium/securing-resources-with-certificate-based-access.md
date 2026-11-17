---
source: https://docs.cloud.google.com/access-context-manager/docs/securing-resources-with-certificate-based-access
---

# Context-Aware Access with mTLS overview

Context-Aware Access with mTLS, also known as certificate-based access (CBA), requires verified X.509 certificates for access to Google Cloud resources. Both the user credentials and the original device certificate must be present before access is granted. The certificate is validated through a mutual TLS handshake, which requires the client to prove possession of the private key.

## Signature / Usage

### Access level expressions for CBA

A CBA access level is a custom access level whose condition checks the client certificate. Examples from the web applications CBA guide; the first is for a trust config (your own or a Google-issued CA), the second for a Google-issued self-signed certificate deployed by Endpoint Verification:

```text
certIsPkiAttested(origin, ["TLS_POLICY_FULL_RESOURCE_PATH1", "TLS_POLICY_FULL_RESOURCE_PATH2", ...]) == true
```

```text
certificateBindingState(origin, device) == CertificateBindingState.CERT_MATCHES_EXISTING_DEVICE
```

## Notes

- Why: relying only on credentials such as bearer tokens is risky because they can be exposed by user error or stolen and replayed. A device certificate adds a second factor that protects against stolen credentials from untrusted devices (for example cookie theft).
- Benefits: protects all Google Cloud API requests regardless of access point (on-premises or Google networks; web browsers or desktop apps); works with VPC Service Controls service perimeters and with user groups; automated CBA support in common libraries and tools such as the gcloud CLI.
- Snippet taken from https://docs.cloud.google.com/access-context-manager/docs/enable-cba-web-apps
- Source: https://docs.cloud.google.com/access-context-manager/docs/securing-resources-with-certificate-based-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-cba.md](./set-up-cba.md)
- [enable-cba-web-apps.md](./enable-cba-web-apps.md)
