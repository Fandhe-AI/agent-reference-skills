---
source: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation
---

# Service Account Impersonation and Client Libraries

With impersonation you start from an authenticated principal and request short-lived credentials for a service account. Client libraries pick up a local ADC file created through impersonation automatically; the source shows no Node.js or Python code for impersonating from code.

## Signature / Usage

### Local ADC file created by impersonation

Client libraries that support impersonation (Node.js and Python among them) use the resulting ADC file with no code changes, the same way as an ADC file created with user credentials.

```bash
gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL
```

## Notes

- Local ADC files created by using impersonation are supported in C#, Go, Java, Node.js and Python. Not all authentication libraries support them; see "Error returned for local credentials from service account impersonation" in the ADC troubleshooting documentation.
- Required: the Service Account Credentials API (`iamcredentials.googleapis.com`) enabled in the project, and the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`, containing `iam.serviceAccounts.getAccessToken`) on the service account. Grant it even in a project you created.
- Impersonation is more secure than a service account key, which is a persistent high-risk credential if exposed. Service account keys are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- For production or a non-access-token credential, generate and manage short-lived credentials yourself (IAM "Create short-lived credentials for a service account" documentation). The source includes no client-library code for this.
- The `Impersonated` credentials classes of the Node.js (`google-auth-library`) and Python (`google-auth`) libraries are covered by the `nodejs-auth` and `python-auth` categories of this skill, not by this page.
- Dropped: the gcloud CLI sections (`--impersonate-service-account`, `auth/impersonate_service_account`) and the other language lists. For gcloud-side ADC setup, see the `gcp-foundation` skill; for gcloud commands, see `gcp-cli`.
- This is the Google Cloud client library, distinct from the `google-genai` Gemini SDK (the `google-gemini-api` skill).
- Source: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation (retrieved 2026-11-16; CC BY 4.0)

## Related

- [client-libraries.md](./client-libraries.md)
- [api-keys-use.md](./api-keys-use.md)
