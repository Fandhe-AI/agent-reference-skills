---
source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/overview
---

# Overview of Key Access Justifications

Key Access Justifications (KAJ) directs Google systems to generate access justification codes for each cryptographic operation involving enrolled Cloud KMS keys, and lets you set a policy on keys to view, approve, or deny key access requests by justification code. It works with Access Approval and Access Transparency to give control over and context for administrative requests to Customer Data.

## Signature / Usage

A key's KAJ policy is the `keyAccessJustificationsPolicy` field of the Cloud KMS `CryptoKey`.

Key metadata response with a KAJ policy:

```json
{
  "purpose": "ENCRYPT_DECRYPT",
  "versionTemplate": {
    "protectionLevel": "HSM",
    "algorithm": "GOOGLE_SYMMETRIC_ENCRYPTION"
  },
  "keyAccessJustificationsPolicy": {
    "allowedAccessReasons": [
      "CUSTOMER_INITIATED_ACCESS",
      "GOOGLE_INITIATED_SYSTEM_OPERATION"
    ]
  }
}
```

## Options / Props

### Features by Assured Workloads control package

| Control package type | Key Access Justifications feature |
|---|---|
| Select regional control packages | Key Access Transparency: logs justification codes in your Cloud KMS audit logs. |
| Select regional, regulatory, or sovereign control packages | Set a policy on keys to approve or deny key access requests by justification code. Some regional data boundaries provide this in addition to Key Access Transparency. |
| Select sovereign control packages | With a supported external key management partner, configure KAJ policies outside Google Cloud, enforced exclusively by the external key manager rather than Cloud KMS. |

### Reasons Google may use your keys

| Reason | Detail |
|---|---|
| Back up your data | Access to keys to back up data for disaster recovery. |
| Resolve a support request | Decrypting data to fulfil the contractual support obligation. |
| Manage and troubleshoot systems | Technical debugging for complex support requests or investigations; remediating storage failure or data corruption. |
| Ensure data integrity and compliance, protect against fraud and abuse | Safety and security of data and accounts; compliance with the Terms of Service; investigating complaints or abusive activity; verifying regulatory compliance such as anti-money laundering. |
| Maintain system reliability | Investigating that a suspected outage does not affect you; backup and recovery from outages or failures. |

### Exclusions

| Scope | Detail |
|---|---|
| Applies only to | Operations on encrypted data (see each service's documentation for fields encrypted by a customer-managed key), and the transition from data-at-rest to data-in-use. |
| Exempted Compute Engine and Persistent Disk features when used with CMEK | Local SSDs; automatic restart; machine image operations. |

## Notes

- Features by Assured Workloads control package: The control package also determines the available key types: Cloud EKM keys, Cloud HSM keys, Cloud KMS software keys.
- KAJ can only be used with Assured Workloads and is enabled by default when you create an Assured Workloads folder configured for a control package that includes it.
- After key projects are enrolled you immediately receive justifications for new keys; for previously existing keys, within 24 hours. This covers service-based access (for supported services) and direct API access.
- With external key managers, enabling can take up to 24 hours after folder creation; do not reject key access requests in production during this time. There is no delay for non-external Cloud KMS keys.
- With Access Approval using a custom signing key, KAJ also applies to processing signed approval requests: a request can be processed only if its justification is permitted by the key's KAJ policy. Customer Data accesses from an approved signed request appear in Access Transparency logs linked to the approval.
- Data is encrypted at rest with a key stored outside the service holding the data (Cloud KMS with CMEK, or your external key manager with Cloud EKM); services request decryption from the key manager when they need to use the data.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/configure-kaj (the `cryptoKeys.get` response example).
- Justification codes are on the official page `https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/justification-codes`.
- Source: https://docs.cloud.google.com/assured-workloads/key-access-justifications/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-kaj.md](./configure-kaj.md)
- [set-default-policy.md](./set-default-policy.md)
- [access-approval-overview.md](./access-approval-overview.md)
- [access-transparency-overview.md](./access-transparency-overview.md)
- Cloud KMS, Cloud HSM, Cloud EKM: see the `gcp-security` skill.
