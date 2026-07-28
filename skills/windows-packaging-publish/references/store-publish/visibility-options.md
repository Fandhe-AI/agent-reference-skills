# Visibility Options

Controls whether and how an app can be discovered and acquired in the Microsoft Store, via **Audience** and **Discoverability** settings on the Pricing and availability page.

## Signature / Usage

- **Audience**: **Public audience** (default, visible to everyone) or **Private audience** (visible/available only to specified known user groups, commonly used for beta testing).
- **Discoverability**: **Make this product available and discoverable in the Store** (default) or **Make this product available but not discoverable in the Store** (accessible only via direct link), which additionally requires choosing **Direct link only** or **Stop acquisition** (download only via prior ownership or a promotional code).

## Options / Props

| Setting | Values | Notes |
|---|---|---|
| Audience | Public / Private | Once **Public audience** is chosen for a submission, a later submission cannot switch back to **Private audience** |
| Private audience group | Known user group (email-based) | Members must sign in with the associated Microsoft account, Windows 10 version 1607+ |
| Discoverability | Available & discoverable / Available but not discoverable | Not-discoverable still allows access via direct link unless Stop acquisition is set |
| Acquisition (when not discoverable) | Direct link only / Stop acquisition | Stop acquisition requires prior ownership or a promotional code |

## Notes

- Private audience is the correct mechanism for controlled beta testing/internal validation — making an app "not discoverable" does **not** prevent someone with the direct URL from installing it.
- Package flights can be used to distribute different package updates to subsets of a private audience.
- **Make app unavailable** on the app overview page overrides visibility settings entirely and removes the app from the Store within a few hours.

## Related

- [Pricing and Availability](./pricing-and-availability.md)
- [Market Selection](./market-selection.md)
- [Package Flights](./package-flights.md)
