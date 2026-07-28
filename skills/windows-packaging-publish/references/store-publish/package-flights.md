# Package Flights

Distributing specific packages to a limited group of testers (a "flight group") without disrupting the Store listing or packages seen by regular customers.

## Signature / Usage

On the App overview page (after an initial submission is published), click **New package flight**, name it, assign at least one flight group (a known user group), then add packages and **Submit to the Store**. Flight submissions go through the same certification process as regular submissions.

## Options / Props

| Concept | Behavior |
|---|---|
| Flight group | A known user group (email-based); only members receive flighted packages |
| Non-flighted submission rank | Always lowest (#1) — customers not in any flight group only get this |
| Multiple flights | Ranked; a customer in multiple flight groups gets the highest-ranked flight's packages |
| Gradual rollout within a flight | Optional percentage-based rollout to the flight group, adjustable/haltable anytime |
| WACK relaxation | Some Windows App Certification Kit failures pass "with notes" for flighting only; must be fixed before general release |
| Promoting flight packages | Non-flighted submission's Packages page can copy packages from a flight without re-uploading |

## Notes

- Desktop devices in a flight group get updates automatically; Xbox devices in a flight group must check for updates manually.
- Device family availability is always governed by the non-flighted submission, regardless of which packages a flight provides.
- Ratings/reviews from flight-only customers are visible to the developer but not shown publicly until the app is generally available.
- Deleting a flight can take up to 30 minutes to take effect; affected customers get updated to the highest available non-flighted version.

## Related

- [Upload App Packages](./upload-app-packages.md)
- [Gradual Package Rollout](./gradual-package-rollout.md)
- [Visibility Options](./visibility-options.md)
