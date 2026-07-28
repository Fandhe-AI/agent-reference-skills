# Gradual Package Rollout

Distributing an update's packages to only a percentage of existing customers first, to validate stability before full release.

## Signature / Usage

On the **Packages** page of an updated submission, check **Roll out update gradually after this submission is published** and set a percentage. Adjust the percentage from the app's Overview page any time, then **Finalize package rollout** (distribute to everyone) or **Halt package rollout** (stop distributing the new packages) before creating a new submission.

## Options / Props

| Setting | Behavior |
|---|---|
| Rollout percentage | Random selection of existing customers on supported OS versions (Windows.Desktop build 10586+, Xbox) |
| Finalize | Distributes newest packages to all customers, including those on unsupported OS versions |
| Halt | Stops further distribution of the new packages; customers who already received them are not rolled back |
| New submission | Blocked until the current rollout is finalized or halted |

## Notes

- Rollout differs from package flights: rollout targets a random percentage of existing customers, while flights target specific, named customer groups.
- Rollout and flights can be combined (gradual rollout within a flight group).
- Store listing content always reflects the latest submission for all customers — only package delivery is affected by rollout percentage.

## Related

- [Package Flights](./package-flights.md)
- [Upload App Packages](./upload-app-packages.md)
