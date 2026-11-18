---
source: https://docs.cloud.google.com/kms/docs/single-tenant-hsm
---

# Single-tenant Cloud HSM overview

Single-tenant Cloud HSM provides a dedicated cluster of HSM partitions for your exclusive use, with the same redundancy and availability as multi-tenant Cloud HSM. The cluster is spread across multiple HSMs in multiple zones of the selected region, and each partition is cryptographically isolated. Instance administrators control the instance through quorum approval using asymmetric control keys that you create outside Google Cloud. Once configured, Cloud KMS administrators create single-tenant keys (protection level `HSM_SINGLE_TENANT`) and developers use them like any other Cloud HSM key, with no code changes. Using it incurs costs; see Cloud KMS pricing (https://docs.cloud.google.com/kms/pricing).

## Signature / Usage

Creating an instance with a total approver count of 3:

```bash
gcloud kms single-tenant-hsm create --location=us-central1 \
    --total-approver-count=3
```

### Quorum-based authentication

Operations that need quorum authentication go through three stages:

1. **Proposal**: an instance administrator proposes an operation (for example registering a new control key). The proposal creates an immutable snapshot of the current state. Proposals expire after 24 hours and can be canceled at any time until the approved operation is initiated.
2. **Approval**: the required number of administrators sign challenges with their unique control key; an instance administrator uploads enough signed challenges to approve the proposal (valid challenges and unexpired proposal).
3. **Execution**: after approval and before expiry, the proposed operation can be run.

Before creating an instance you create the asymmetric control keys outside Cloud KMS and define how many approvals are required (for example, 3 of 5 administrators).

## Options / Props

### Instance operations

| Operation | Quorum required | Notes |
|-----------|-----------------|-------|
| Create instance | Yes (quorum must be set up) | Single region |
| Get instance information | No | Metadata and configuration |
| Disable / enable instance | Yes | Disabling revokes Google's access to the partitions; keys in a disabled instance are unavailable. Enabling resets `disableDate` to 730 days from the enable operation |
| Refresh instance | Yes | Must be refreshed every 730 days or less; resets `disableDate` to 730 days from the refresh. Instances not refreshed before `disableDate` are automatically disabled |
| Delete instance | Yes | Permanently destroys all keys created in the instance; irreversible |
| Rotate admin control keys | Yes | Rotates the 2FA control key of a quorum member |
| Create `CryptoKey` with single-tenant HSM protection level | No | |
| Cryptographic operations | No | Same as other Cloud KMS keys |

### Best practices

| Practice | Detail |
|----------|--------|
| Project liens | Use project liens (https://docs.cloud.google.com/resource-manager/docs/project-liens) on projects with active instances; deleting such a project makes the keys unrecoverable |
| Physical tokens | Hold private 2FA keys on physical tokens stored securely; if a quorum of keys is lost Google can't restore access, and the instance eventually disables |
| Backup keys | Register at least one spare 2FA key beyond the quorum members' keys |
| Separation of duties | Proposal, approval and execution need separate IAM roles; spread them over at least two individuals |
| Distribution of keys | No individual should hold enough private keys for a quorum |
| Refresh schedule | Monitor `disableDate` and propose the refresh early enough to be approved and executed before it |

## Notes

- Key portability: you can manage your own trusted wrapping keys on single-tenant instances to export keys or import pre-wrapped keys (interoperability between cloud providers and Google Cloud regions).
- Deleting an instance is irreversible and crypto-shreds all data encrypted with its keys; try operations on a disposable instance first. Google can't prevent or reverse the deletion.
- If an instance is not refreshed on time it is disabled and its keys are unavailable until you propose, approve and execute an operation to re-enable it.
- If one individual holds all the required IAM permissions and enough private 2FA keys for a quorum, that person can single-handedly propose, approve and execute permanent deletion of the instance.
- Source: https://docs.cloud.google.com/kms/docs/single-tenant-hsm (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/single-tenant-hsm/create (gcloud 593.0.0 help).

## Related

- [attest-key.md](./attest-key.md)
- [key-import.md](./key-import.md)
- [bare-metal-hsm.md](./bare-metal-hsm.md)
