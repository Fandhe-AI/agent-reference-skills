# Atlas Company Types

Two entity types available through Stripe Atlas: Delaware C Corporation and Delaware LLC. Choice affects equity grants, investor eligibility, and tax treatment.

## Options / Props

| Feature | C Corporation | LLC |
|---------|---------------|-----|
| Equity grants to employees/advisors | Yes | No |
| Institutional VC investment | Yes | Typically not |
| Tax treatment | C-corp (double taxation) | Pass-through by default |
| 83(b) election required | Yes (Atlas files automatically) | No |
| Annual Delaware tax | Franchise tax (due March 1) | $300 flat (due June 1) |
| Complexity with multiple / non-US founders | Lower | Higher |

## Notes

- **C Corporation** is the standard choice for startups planning to raise venture capital or grant employee equity (options, restricted stock).
- **LLC** is simpler for solo founders or small businesses with no VC plans. Tax complexity increases significantly with multiple founders or non-US founders.
- **Subsidiary formation**: If creating a US subsidiary of an existing foreign entity, the parent company receives stock after formation. Atlas provides customizable standard templates.
- Incorporating before December 31 triggers the full year's Delaware state tax with no proration. Delaying to January 1 defers the first annual tax by one year.

## Related

- [atlas-overview.md](./atlas-overview.md)
- [atlas-83b-election.md](./atlas-83b-election.md)
