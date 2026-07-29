# Remove an App or Add-on

Making an app or add-on unavailable in Partner Center — the supported way to delist a product from the Microsoft Store without deleting it.

## Signature / Usage

**Remove an app**: Partner Center → **Apps** → select the app → on the App overview page, scroll to the **Store Presence** card → **Modify availability** → **Make product unavailable** → **Apply**.

**Remove an add-on**: Partner Center → **Apps** → select the app → **Manage add-ons** → select the add-on → **Make product unavailable** (top-right corner) → confirm.

To relist, repeat the same steps and choose **Make product available** (app) or select the add-on and choose to offer it again (add-on), then **Apply**/confirm.

## Options / Props

| Action | Effect |
|---|---|
| Make app unavailable | New customers can no longer discover or acquire the app from the Store; existing customers who already installed it can keep using it, and the app is not automatically uninstalled |
| Make app available | Restores Store discoverability and acquisition; same steps as removal, reversed |
| Make add-on unavailable | New customers can no longer acquire the add-on; existing customers retain access — subscription add-ons continue until the end of the current billing term (no auto-renewal, canceled at term end) |
| Make add-on available | Restores add-on acquisition; same steps as removal, reversed |

## Notes

- Making an app unavailable does **not** by itself disable add-on acquisition — add-on availability can be tied to renewal independent of the parent app. To fully block new add-on acquisition, remove the add-on explicitly.
- Removal/relisting is fully reversible at any time and does not require a new submission.
- The add-on removal steps are the same regardless of the parent app's product type (MSIX, MSI/EXE, PWA).

## Related

- [Add-on (In-App Product) Submission](./add-on-submission.md)
- [Create App Submission](./create-app-submission.md)
- [Publish an App Update](./publish-app-update.md)
