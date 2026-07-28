# Gradual Package Rollout

Lets a Microsoft Store submission roll out updated packages to only a percentage of existing customers at first, so you can monitor the update before making it broadly available.

## Signature / Usage

On the **Packages** page of an updated submission in Partner Center: check **Roll out update gradually after this submission is published**, then set the starting percentage (e.g. `5`).

## Options / Props

| Action | Effect |
| --- | --- |
| Set rollout percentage | Only that percentage of existing customers (on Windows.Desktop build 10586+ / Xbox) receive the new packages on update. |
| Adjust after publish | Drag the rollout selector on the app's Overview page and select **Update** to change the live percentage. |
| Finalize package rollout | Distributes the newest packages to all customers; required before a new submission can be created. |
| Halt package rollout | Stops distributing the latest packages; customers who already got them keep them (no rollback); older packages continue for everyone else. |

## Notes

- Package flights (distributing to specific, selected customer groups) can be combined with gradual rollout for one of the flight groups.
- All customers see the latest submission's Store listing details immediately — only package delivery is gated by the rollout percentage.
- Customers on OS versions that don't support package flights always get the latest finalized packages, regardless of rollout percentage.

## Related

- [Choose a distribution path](./choose-distribution-path.md)
