# Beta Testing and Targeted Distribution

Options in Partner Center for letting testers use an app before (or instead of) a public release.

## Signature / Usage

Hide the app and use promotional codes:

```text
Pricing and availability -> Visibility -> Discoverability
  -> "Make this product available but not discoverable in the Store"
  -> choose "Stop acquisition"
After certification: generate promotional codes and give them to testers.
To go public: new submission -> "Make this product available and discoverable in the Store".
```

Direct link only:

```text
Pricing and availability -> Visibility -> Discoverability
  -> "Make this product available but not discoverable in the Store"
  -> choose "Direct link only"
After publish: distribute the URL from the Product identity page. App price must be Free for no-cost downloads.
```

## Options / Props

| Method | Listing hidden from others? | Tester requirements |
|---|---|---|
| Private audience | Yes, completely (even with direct link) | Windows 10 1607+ (including Xbox); signed in with the Microsoft account of the provided email; only if not already published to a public audience |
| Package flights | n/a (app already published) | Windows.Desktop build 10586+ or Xbox One |
| Hide + promotional codes (Stop acquisition) | No; anyone with the direct link can see the listing | Windows 10 or 11; need a promo code or prior ownership |
| Direct link only | Not discoverable by search/browse | Windows 10 or 11 (not Windows 8.x) |

## Notes

- Access can't be revoked after a tester downloads the app; they keep using it and receive later updates.
- Analytics (usage, health, ratings and reviews) cover testers too.
- Add-ons: give testers promotional codes or set the add-on price to Free during testing (create a new add-on submission to change the price before public release). Each add-on can be purchased only once per Microsoft account.
- A new submission with new packages updates testers after certification, and only they get it unless audience or group membership changes.
- Promotional codes: up to 1600 redemptions for a single app in a six month period.
- If confidentiality is critical, use Private audience instead of hiding plus promotional codes.
- Package flights can pull packages into the non-flighted submission once ready for everyone.

## Related

- [Package Flights](./package-flights.md)
- [Visibility Options](./visibility-options.md)
- [Customer Groups and Targeted Offers](./customer-groups-targeted-offers.md)
