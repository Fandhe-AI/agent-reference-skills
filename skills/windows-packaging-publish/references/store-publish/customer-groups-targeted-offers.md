# Engage with Customers: Customer Groups and Targeted Offers

Partner Center "Engage" features: known user customer groups (used for package flights, private audiences and campaigns) and targeted offers for UWP apps with add-ons.

## Signature / Usage

Create a known user group:

```text
Partner Center -> Engage -> Customer groups -> My customer groups -> Create new group
  -> Group name; keep "Known user group" selected
  -> enter email addresses (1 to 10,000; separated by spaces, commas, semicolons or line breaks, or "Import .csv")
  -> Save
```

Create and send a targeted offer:

```text
Engage -> Targeted offers -> Create new offer (on an available offer)
  -> choose the product (app) -> select the add-on to associate -> Save
```

## Options / Props

| Item | Detail |
|---|---|
| Known user group | Members identified by the email address of their Microsoft account |
| Group size | At least 1, at most 10,000 email addresses |
| Typical uses | Package flights, private audience distribution, targeted notifications / offers |
| Edit membership | Add/remove addresses in the field, or **Export .csv** then **Import .csv** for larger changes |
| Targeted offer prerequisite | UWP app that includes add-ons |
| Engage section features | Targeted offers, request ratings and reviews, respond to reviews, engagement analytics (Reviews report, REST API) |

## Notes

- A known user group can't be removed or renamed after creation; membership can be edited any time. Membership changes may take up to 30 minutes; no new submission is needed for new members to access flights / private audience.
- When using known user groups with package flighting, obtain necessary consent from the people added and make sure they understand they will receive packages different from the non-flighted submission.
- Targeted offers need three steps: create the offer in Partner Center, implement the in-app offer experience with the Microsoft Store targeted offers API (see Store services), and submit the app so it is published with that experience.
- The same offer type can be created more than once for an app if different add-ons are selected; one add-on can be associated with more than one offer type. Conversions per offer are viewable on the Targeted offers page. **Delete** removes an offer.
- Offer content must comply with the Store Content Policies. If a signed-in customer hands the device to someone else, that person may see offers targeted at the original customer.
- Responses to reviews can be submitted in the dashboard or via REST API.
- Sources: https://learn.microsoft.com/en-us/windows/apps/publish/engage-with-your-customers, last updated 2022-10-30 (ms.date); https://learn.microsoft.com/en-us/windows/apps/publish/create-customer-groups, last updated 2022-10-30 (ms.date); https://learn.microsoft.com/en-us/windows/apps/publish/use-targeted-offers-to-maximize-engagement-and-conversions, last updated 2022-10-30 (ms.date).

## Related

- [Package Flights](./package-flights.md)
- [Visibility Options](./visibility-options.md)
- [Beta Testing and Targeted Distribution](./beta-testing-targeted-distribution.md)
- [Ratings and Reviews Report](./ratings-reviews-report.md)
