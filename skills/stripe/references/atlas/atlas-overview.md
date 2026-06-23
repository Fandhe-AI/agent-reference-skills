# Stripe Atlas

Service for incorporating a Delaware C Corporation or LLC from anywhere in the world, typically within 2 business days. Includes EIN acquisition, founder equity setup, Section 83(b) election filing, and legal documents prepared in collaboration with Cooley LLP.

## Signature / Usage

```
Signup: https://dashboard.stripe.com/register/atlas
Cost:   $500 USD (includes state fees + Year 1 registered agent)
Renewal: $100 USD/year (registered agent)
```

## Options / Props

### Company Types

| Type | Best For | Tax Treatment |
|------|----------|---------------|
| Delaware C Corporation | VC-backed startups, equity grants | C-corp federal taxes; early losses offset future taxes |
| Delaware LLC | Solo founders, no VC funding | Pass-through taxation (more complex with multiple / non-US founders) |
| Delaware C Corp Subsidiary | Existing company establishing US entity | Parent company receives stock post-formation |

### Incorporation Process

| Step | Duration | Notes |
|------|----------|-------|
| Company formation | 1–2 business days | Atlas files with Delaware; issues founder shares |
| EIN application (with SSN) | 1–2 business days | Atlas files Form SS-4 + Form 8821 with IRS |
| EIN application (without SSN) | 15–25 business days | No SSN/ITIN required at time of application |
| Payment activation | 1–2 business days after incorporation | $2,500 Stripe credit; available before EIN |

### Documents Generated (C Corporation)

| Document | Purpose |
|----------|---------|
| Certificate of Incorporation | Filed with Delaware; establishes company |
| Bylaws | Governance procedures and officer roles |
| Initial Board Resolution | Approves stock issuance; acts as first board meeting |
| Restricted Stock Purchase Agreement & Vesting Schedule | Defines founder stock purchase at $0.00001/share |
| Section 83(b) Election | Tax election filed with IRS at stock issuance |
| Employee Confidentiality & IP Assignment Agreement | Assigns pre/post-formation IP to company |
| Form SS-4 / Form 8821 | IRS EIN request and Atlas authorization to contact IRS |

### Documents Generated (LLC)

| Document | Purpose |
|----------|---------|
| Certificate of Formation | Delaware LLC filing |
| Operating Agreement | Ownership, roles, decision procedures |
| Confidentiality & IP Assignment Agreement | IP assignment |
| Form SS-4 / Form 8821 | IRS EIN request |

### Required Information at Signup

| Field | Notes |
|-------|-------|
| Company name | Atlas verifies Delaware availability |
| Company type | C Corp, LLC, or subsidiary |
| Founder government ID name, email, date of birth | Per founder |
| SSN or ITIN | For EIN and 83(b) filing; can be omitted for non-US founders |
| Home address | Verification and 83(b) election |
| US phone number | EIN application only |
| Business address | IRS sends EIN confirmation here |

## Notes

- **Section 83(b) Election**: Required for C Corp founders; Atlas files automatically. LLC founders are exempt. Non-US founders who will never be US taxpayers gain no benefit from filing.
- **Tax timing**: Incorporating before December 31 triggers Delaware franchise tax for that full year (no proration). Consider January 1 to defer by one year.
- **Delaware franchise tax (C Corp)**: Due March 1 annually; calculated by authorized shares or assumed par value capital method. Companies with >5,000 shares often pay less using the assumed par value method.
- **Delaware LLC annual tax**: Flat $300 USD, due June 1 annually.
- **Indian founders**: Must establish an Indian LLP first before creating a US subsidiary; subject to RBI ODI (Overseas Direct Investment) regulations including Form FC, Form A2, and UIN acquisition. Share certificates must be submitted to AD Bank within 6 months of transfer.
- **Post-incorporation banking**: Mercury, Brex, and Rho are available before EIN receipt. Novo requires SSN and post-EIN. Stripe Treasury is also available directly from the dashboard.
- **SAFEs**: Atlas supports Y Combinator post-money SAFE with valuation cap. Requires board approval; C Corp only.
- Atlas does not provide legal, tax, or accounting advice.

## Related

- [atlas-company-types.md](./atlas-company-types.md)
- [atlas-83b-election.md](./atlas-83b-election.md)
- [atlas-post-incorporation.md](./atlas-post-incorporation.md)
