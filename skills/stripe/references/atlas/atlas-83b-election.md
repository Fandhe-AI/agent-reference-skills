# Section 83(b) Election

IRS tax election that allows founders to pay income tax on restricted stock at the time of grant (at low/zero spread) rather than at each vesting event. Atlas files this automatically for C Corporation founders.

## Notes

- **C Corp founders**: Atlas auto-files the 83(b) election; no manual action required.
- **LLC founders**: Not required — Atlas LLC stock is not subject to vesting.
- **Deadline**: Must be filed within 30 days of stock grant. Atlas handles this timing automatically.
- **US Tax ID requirement**: IRS requires an SSN or ITIN. If neither is available at incorporation, Atlas notifies the IRS that the founder is a non-US taxpayer and intends to obtain an ITIN upon becoming a US taxpayer.

### Non-US founders

- Official guidance for founders outside the US: if you file US tax returns, startup lawyers recommend the election because it might save future US taxes; if you might become a US taxpayer later, it matters, since skipping it could lead to additional US tax liability when stock vests.
- If you are not a US taxpayer and don't plan to become one, the election is unnecessary because it only affects US tax liability.
- The IRS requires a US TIN (SSN or ITIN) at filing. With neither at incorporation, Stripe informs the IRS that you are a non-US taxpayer who intends to apply for an ITIN after becoming a US taxpayer. Consult a tax advisor on whether and when to get an ITIN.
- Atlas files 83(b) elections for all C-corp founders; LLC founders don't need to file because equity in an LLC created with Atlas doesn't vest. Stripe Atlas doesn't provide tax or legal advice.

### Impact by Residency

| Situation | Filing Recommended? | Reason |
|-----------|--------------------|----|
| Current US taxpayer | Yes | Avoids ordinary income tax at each vesting event |
| Non-US founder who may become US taxpayer | Yes | Avoids additional US tax liability when stock vests |
| Non-US founder who will never be US taxpayer | No | Filing has no benefit |

### Tax Treatment Comparison

| Scenario | Tax at Grant | Tax at Vesting |
|----------|-------------|----------------|
| With 83(b) | Ordinary income on spread at grant (typically $0) | None |
| Without 83(b) | None | Ordinary income on FMV minus purchase price at each vest |

After the election, appreciation from grant date onward is taxed as capital gains (long-term if held >1 year from grant).

## Related

- [atlas-overview.md](./atlas-overview.md)
- [atlas-company-types.md](./atlas-company-types.md)
