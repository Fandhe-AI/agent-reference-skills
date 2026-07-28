# Developer Account (Partner Center)

Opening a Microsoft Store developer account in Partner Center, the first prerequisite for publishing apps.

## Signature / Usage

Two account types:

- **Individual account** — for independent developers, hobbyists, or those distributing apps not related to a business/trade/profession. Requires MSA sign-in and identity verification (government ID + selfie).
- **Company account** — for businesses, organizations, freelancers acting in a professional capacity. Requires business verification (DUNS number or official business documents) and employment verification (work email matching the organization's domain).

Entry point: `https://storedeveloper.microsoft.com` → "Get started" → choose account type → sign in with MSA (individual) or MSA/Microsoft Entra ID work account (company) → complete verification → land on Partner Center "Apps & Games overview" page.

## Options / Props

| Account type | Verification | Sign-in | Fee |
|---|---|---|---|
| Individual | Government ID + selfie | Personal Microsoft account (MSA) only | None |
| Company | DUNS number or business documents, plus work-domain email | MSA or Microsoft Entra ID work account | None |

## Notes

- No registration fees for either account type via the new onboarding flow.
- Changing an account from Individual to Company is **not** supported; a new Company account must be created.
- Company account onboarding via Entra ID is **tenant-wide**: all users in the tenant are marked as having an active developer account, but only the completing user gets Owner permissions by default; other users need roles assigned via Partner Center → Account settings → User management.
- Manual document review for company verification can take 2-5 business days; up to three verification appeals are allowed per verification type.
- After account creation, propagation across Partner Center can take up to 30 minutes before app submission becomes available.

## Related

- [Reserve App Name](./reserve-app-name.md)
- [Create App Submission](./create-app-submission.md)
