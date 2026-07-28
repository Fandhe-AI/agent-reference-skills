# Pricing and Availability

Configures how much an app costs, whether it offers a free trial, and how/when/where it is available to customers, as part of an app submission.

## Signature / Usage

Sections on this page: **Markets**, **Visibility** (Discoverability, Audience), **Schedule**, **Pricing** (base price, scheduled price changes), **Free trial**, **Sale pricing**, **Organizational licensing**.

## Options / Props

| Field | Default | Notes |
|---|---|---|
| Markets | All possible markets (240+ countries/regions) | Can be restricted to specific markets |
| Discoverability | Available and discoverable in the Store | Alternative: available but not discoverable (direct link only) |
| Schedule | Release as soon as possible; stop acquisition never | Precise release scheduling configurable |
| Base price | Required (Free or a price tier) | Can schedule price changes; customizable per market |
| Free trial | No free trial | Options: **Time-limited** (1/7/15/30 days) or **Unlimited** |
| Trial start/end dates | Starts at publish, never ends | Configurable per market, UTC or local time |
| Sale pricing | None | Schedule a temporary reduced price |
| Organizational licensing | Enabled by default | Controls volume purchase by organizations |

## Notes

- Time-limited trials are not shown to customers on Windows 10 build 10.0.10586 or earlier.
- For unlimited trials, feature limiting must be implemented in app code — the Store does not enforce a cutoff.
- The **Publish date** option previously on this page has moved to the Submission options page's "Publishing hold options" section.
- Subscription add-ons (recurring billing) are configured separately as an add-on product, not on this page — see the Add-ons submission flow (`publish-your-app/add-on/`).

## Related

- [Create App Submission](./create-app-submission.md)
- [Market Selection](./market-selection.md)
- [Visibility Options](./visibility-options.md)
