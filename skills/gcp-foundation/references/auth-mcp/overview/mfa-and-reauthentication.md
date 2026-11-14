---
source: https://docs.cloud.google.com/docs/authentication/mfa-requirement
---

# 2-step verification requirement and reauthentication

Google Cloud is phasing in a requirement that all customers enable 2-step verification (2SV, multifactor authentication) for user accounts, and requires reauthentication in some scenarios.

## Signature / Usage

### 2SV requirement

- A Google Account with 2SV already enabled needs no action (check the Security tab of Google Account settings, "How you sign in to Google"). Accounts with passkeys must still enable 2SV.
- With a third-party IdP for SSO, the IdP's 2SV satisfies the requirement.
- Interfaces requiring 2SV: Google Cloud console and Firebase console. Not affected: Google Workspace (separate requirement), YouTube, applications and workloads running on Google Cloud (including IAP-secured apps; the control plane is affected, not the data plane). The gcloud CLI has no requirement, but once 2SV is enabled it becomes part of the sign-in flow.

| Account type | Requirement start date |
|---|---|
| Personal Google Accounts | On or after May 12, 2025 |
| Enterprise Cloud Identity accounts (not using SSO), organizations created before August 3, 2026 | On or after October 20, 2026 |
| Enterprise Cloud Identity accounts (not using SSO), organizations created on or after August 3, 2026 | 30 days after the organization creation date |
| Enterprise accounts using federated authentication (Workspace SSO, Cloud Identity SSO, Workforce Identity Federation) | To be announced |
| Reseller accounts (end users of the reseller are not affected) | On or after April 28, 2025 |

Reminders: email at least 90 days before and console reminders from 90 days before (resellers: at least 60 days). Accounts added after enforcement get no reminders and are prompted to enable 2SV.

Additional factors for Google Accounts: authenticator apps, backup codes (single use, store securely), Google Prompts, physical security keys, SMS codes (phone number must be associated with the account). Workspace admins can deploy 2-step verification for their users, which Google Cloud recognizes.

### Enterprise Cloud Identity (non-SSO) features

Monitor conformance with Logs Explorer (conformance logs began August 1, 2026; needs Logs Viewer `roles/logging.viewer` at the organization level). Query:

```
jsonPayload.@type="type.googleapis.com/google.identity.mfaforall.LogEntry"
```

Expanded query:

```
jsonPayload.@type="type.googleapis.com/google.identity.mfaforall.LogEntry"
jsonPayload.enforcementState="ENFORCEMENT_STATE_UPCOMING_ENFORCEMENT"
jsonPayload.userEmail: "PRINCIPAL_IDENTIFIER"
jsonPayload.mfaEligibility: "MFA_ELIGIBILITY_ELIGIBLE"
```

Example conformance log entry:

```
{
  insertId: "00000000"
  jsonPayload: {
    @type: "type.googleapis.com/google.identity.mfaforall.LogEntry"
    enforcementState: "ENFORCEMENT_STATE_UPCOMING_ENFORCEMENT"
    mfaEligibility: "MFA_ELIGIBILITY_ELIGIBLE"
    userEmail: "PRINCIPAL_IDENTIFIER"
  }
  logName: "organizations/ORGANIZATION_ID/logs/mfaforall.googleapis.com%2Fmfa_conformance_check"
  receiveTimestamp: "2026-06-02T21:52:21.150677295Z"
  resource: {
    labels: {
      location: "global"
      resource_container: "organizations/ORGANIZATION_ID"
    }
    type: "mfaforall.googleapis.com/Location"
  }
  severity: "INFO"
  timestamp: "2026-06-02T21:52:20.838Z"
}
```

| Field | Values |
|---|---|
| `userEmail` | Principal identifier (email) of the monitored account. |
| `mfaEligibility` | `MFA_ELIGIBILITY_ELIGIBLE` (eligible); `MFA_ELIGIBILITY_INELIGIBLE` (blocked from enrolling by Workspace policy); `MFA_ELIGIBILITY_UNSPECIFIED` (unknown, returned for third-party IdP SSO). |
| `enforcementState` | `ENFORCEMENT_STATE_UPCOMING_ENFORCEMENT` (in reminder window, action required); `ENFORCEMENT_STATE_ENFORCED` (2SV required); `ENFORCEMENT_STATE_MFA_COMPLIANT`; `ENFORCEMENT_STATE_NO_ENFORCEMENT_ORG_OPTED_OUT`; `ENFORCEMENT_STATE_NO_ENFORCEMENT_SSO_USER`. |

Extend the deadline: organizations created before August 3, 2026 can enable a one-time 90-day extension in the console (Organization Administrator `roles/resourcemanager.organizationAdmin`; Organizations page, click **Extend by 90 days**). Opt out (not recommended): same role, disable **Enforce 2SV** on the Organizations page; it only bypasses the requirement, and opting back in has a minimum 30-day grace period.

### Reauthentication

- Google Workspace session configuration: admins set maximum session length and whether reauthentication is required; local ADC files expire with the session and are refreshed by running `gcloud auth application-default login` again.
- IAP can require reauthentication after a period.
- Refresh tokens can expire (session length or other reasons); authenticate again.
- Sensitive actions (billing assignment changes; IAM allow policy changes at organization, folder, or project level) require reauthentication, rolling out across accounts and expected complete in 2026. You must re-enter your password or complete MFA if the action is initiated in the Google Cloud console, you haven't reauthenticated in the last 15 minutes, and your account is managed by Google. Accounts federated through Workforce Identity Federation are not required to reauthenticate. It is enabled by default; to apply for an exception, contact support with your reason.

```
gcloud auth application-default login
```

## Notes

- Dates in the 2SV timeline are as published on the fetched page (retrieved 2026-11-14) and may change.
- Source: https://docs.cloud.google.com/docs/authentication/mfa-requirement
- Source: https://docs.cloud.google.com/docs/authentication/reauthentication
- Retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0.

## Related

- [authentication-overview.md](./authentication-overview.md)
- [../adc/set-up-adc.md](../adc/set-up-adc.md)
