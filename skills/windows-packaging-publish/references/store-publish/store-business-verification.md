# Know Your Business Customer / EU Digital Services Act Verification (Company Accounts)

Business verification required of company-account developers classified as a "Trader" under the EU Digital Services Act: a DUNS ID or recognized business documents, plus customer contact information.

## Signature / Usage

```text
Partner Center -> Configuration -> Account Settings -> Legal Info -> Developer tab
  -> expand Contact Info -> Update
  -> "Additional Information for Verification": enter DUNS ID (recommended) or Upload document (select type, upload file)
  -> "Contact Information for Customers": fill all required fields -> Save
Status: same page, "EU Digital Service Act compliance status" field.
```

## Options / Props

| Item | Detail |
|---|---|
| Trader | Any natural or legal person acting in relation to their trade, company, business or profession (EU DSA definition) |
| DUNS ID | 9-digit Data Universal Number System ID created through Dun & Bradstreet; no-cost option exists; fastest verification |
| Primary documentation | Formation documents (articles of incorporation, partnership deed); certificate of incorporation or registration |
| Secondary documentation | Needed if the primary document is older than 12 months and active status can't be confirmed: current lease/tenancy; financial institution or utility letter; government/state registry record (site/link displayed); latest stock exchange or tax filing; commercial register extract (site/link displayed); latest tax certificate; DUNS certification |
| Document validity | Issued within the past 12 months; if it has an expiry date, valid at least two more months after submission |
| Vetting status | Based on 5 factors; any failure shows Rejected and blocks publishing; use **Fix now** to supply more info |
| Verification types | Business Verification (BV) and Domain Verification (DV) |

## Notes

- Deadline: all partners had to provide DUNS IDs or supporting documents by February 17, 2025; those who haven't are blocked from editing new or existing apps.
- All product detail pages carry the disclaimer: "This seller has certified that it will only offer products or services that comply with all applicable laws."
- Uploaded documents go through review (OneVet) and take significantly longer than a valid DUNS ID.
- Save button greyed out usually means a formatting error: zip codes must include spaces where needed; website URLs must start with `https://`; the primary contact (seller contact) email must not be generic or a group alias (OTP sent; plus addressing such as abc+xyz@m.com not allowed); verify a changed primary email with **Verify email**; new customer-contact addresses may need **Validate address**. Edge browser is recommended.
- If the DUNS sections or contact info are not visible: confirm the Owner or Manager role and that the account is enrolled in the Windows or Xbox programs (Account Settings > Programs > Registered).
- The **Vetting status** field covers all checks (some unrelated to the DSA); the DSA compliance status field covers only the checks in this article.
- DV: no generic emails on the account (individual's work email); provide domain registration/renewal invoice listing the entity/contact name and domain as on the account, or update domain info to match documents already provided. Account details (domain, email domain, entity name, address) must match the documents.
- A phone number, physical address and email are required for customer contact; P.O. boxes, voicemail numbers, auto-reply email aliases and registered agent addresses are accepted. With different regional contacts, choose the one best able to handle international requests.
- Account recovery or other issues: contact developer support.
- Verifiable Credentials (VC) Vetting Service has its own FAQ and support links in the source page.
- Source: https://learn.microsoft.com/en-us/windows/apps/publish/store-business-verification-reqs, last updated 2025-02-27 (ms.date).

## Related

- [Developer Account](./developer-account.md)
- [Partner Center Roles and Custom Permissions](./partner-center-roles-permissions.md)
- [Store Policies](./store-policies.md)
